"""
IndexNow bulk submitter for vardhinivastu.in
Submits all sitemap URLs to Bing/IndexNow (Google picks up via Bing syndication).
Also pings Google's sitemap endpoint directly.

Usage:
  py push_indexing.py                  # auto-generate key + submit all URLs
  py push_indexing.py --key abc123     # use existing IndexNow key
  py push_indexing.py --dry-run        # list URLs without submitting
  py push_indexing.py --batch 500      # limit URLs per run (default: all)

Setup (one-time, handled automatically):
  1. Script generates a random key (or you pass --key)
  2. Uploads key file to vardhinivastu.in/<key>.txt via WordPress REST API
     (set WP_USER / WP_PASS env vars, or script prompts)
  3. Submits all URLs — no Google Search Console ownership needed

Engines supported: Bing, Yandex, Naver (all via IndexNow)
Google: pinged via sitemap ping endpoint (no auth needed)
"""

import argparse
import json
import os
import secrets
import time
import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
from datetime import datetime, timezone

SITE_URL    = "https://vardhinivastu.in"
SITEMAP_URLS = [
    f"{SITE_URL}/page-sitemap.xml",
    f"{SITE_URL}/post-sitemap.xml",
]

INDEXNOW_ENDPOINT = "https://www.bing.com/indexnow"
# Google sitemap ping deprecated June 2023; Bing ping still works
BING_PING = "https://www.bing.com/ping?sitemap="


# ── helpers ──────────────────────────────────────────────────────────────────

def fetch_urls_from_sitemap(sitemap_url):
    """Parse sitemap XML and return list of page URLs."""
    try:
        with urllib.request.urlopen(sitemap_url, timeout=15) as r:
            tree = ET.parse(r)
        ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        return [loc.text.strip() for loc in tree.findall(".//sm:loc", ns)]
    except Exception as e:
        print(f"  ✗ Could not fetch {sitemap_url}: {e}")
        return []


def upload_key_file_via_wp(key, wp_user, wp_pass):
    """
    Upload <key>.txt to the WordPress media library so it's accessible at
    https://vardhinivastu.in/<key>.txt  (IndexNow key file requirement).
    Uses the WordPress REST API /wp-json/wp/v2/media endpoint.
    """
    import base64, io
    filename = f"{key}.txt"
    content  = key.encode()
    creds    = base64.b64encode(f"{wp_user}:{wp_pass}".encode()).decode()
    req = urllib.request.Request(
        f"{SITE_URL}/wp-json/wp/v2/media",
        data=content,
        headers={
            "Authorization": f"Basic {creds}",
            "Content-Disposition": f'attachment; filename="{filename}"',
            "Content-Type": "text/plain",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            resp = json.loads(r.read())
        return resp.get("source_url", "")
    except Exception as e:
        return f"ERROR: {e}"


def verify_key_file(key):
    """Check that https://vardhinivastu.in/<key>.txt returns the key."""
    url = f"{SITE_URL}/{key}.txt"
    try:
        with urllib.request.urlopen(url, timeout=10) as r:
            body = r.read().decode().strip()
        return body == key
    except Exception:
        return False


def ping_sitemap(engine, ping_base):
    """Ping a search engine's sitemap endpoint."""
    for sitemap in SITEMAP_URLS:
        url = ping_base + urllib.parse.quote(sitemap, safe="")
        try:
            with urllib.request.urlopen(url, timeout=10) as r:
                code = r.status
            print(f"  {engine} ping -> HTTP {code}  ({sitemap})")
        except urllib.error.HTTPError as e:
            print(f"  {engine} ping -> HTTP {e.code}  ({sitemap})")
        except Exception as e:
            print(f"  {engine} ping -> ERROR: {e}")


def submit_indexnow_batch(urls, key, batch_size=500):
    """Submit URLs to IndexNow in batches of up to 10,000 (we use 500)."""
    submitted = 0
    failed    = 0
    for start in range(0, len(urls), batch_size):
        chunk = urls[start:start + batch_size]
        payload = json.dumps({
            "host":    SITE_URL.replace("https://", ""),
            "key":     key,
            "keyLocation": f"{SITE_URL}/{key}.txt",
            "urlList": chunk,
        }).encode()
        req = urllib.request.Request(
            INDEXNOW_ENDPOINT,
            data=payload,
            headers={"Content-Type": "application/json; charset=utf-8"},
            method="POST",
        )
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                code = r.status
            if code in (200, 202):
                submitted += len(chunk)
                print(f"  OK  [{start+1}-{start+len(chunk)}] -> HTTP {code}")
            else:
                failed += len(chunk)
                print(f"  FAIL[{start+1}-{start+len(chunk)}] -> HTTP {code}")
        except urllib.error.HTTPError as e:
            body = e.read().decode(errors="replace")[:200]
            failed += len(chunk)
            print(f"  FAIL[{start+1}-{start+len(chunk)}] -> HTTP {e.code}: {body}")
        except Exception as e:
            failed += len(chunk)
            print(f"  FAIL[{start+1}-{start+len(chunk)}] -> {e}")
        time.sleep(0.5)
    return submitted, failed


# ── main ─────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--key",     default="", help="Existing IndexNow key (omit to auto-generate)")
    parser.add_argument("--batch",   type=int, default=0,  help="Max URLs to submit (0 = all)")
    parser.add_argument("--dry-run", action="store_true",  help="List URLs without submitting")
    parser.add_argument("--skip-upload", action="store_true",
                        help="Skip key-file upload (use if file already on server)")
    args = parser.parse_args()

    # ── 1. Resolve key ──────────────────────────────────────────────────────
    key_file = os.path.join(os.path.dirname(__file__), "indexnow.key")
    if args.key:
        key = args.key
    elif os.path.exists(key_file):
        key = open(key_file).read().strip()
        print(f"Using saved key: {key}")
    else:
        key = secrets.token_hex(16)          # 32-char hex key
        open(key_file, "w").write(key)
        print(f"Generated new key: {key}  (saved to indexnow.key)")

    # ── 2. Ensure key file is live on server ────────────────────────────────
    if not args.skip_upload:
        if verify_key_file(key):
            print(f"Key file already verified at {SITE_URL}/{key}.txt")
        else:
            print(f"Key file not found — uploading via WordPress REST API...")
            wp_user = os.environ.get("WP_USER") or input("WordPress username: ")
            wp_pass = os.environ.get("WP_PASS") or input("WordPress app password: ")
            result = upload_key_file_via_wp(key, wp_user, wp_pass)
            if "ERROR" in str(result):
                print(f"  ✗ Upload failed: {result}")
                print(f"  -> Manually create {SITE_URL}/{key}.txt containing just: {key}")
                print("  -> Then re-run with --skip-upload")
                return
            print(f"  Uploaded -> {result}")
            # verify
            if verify_key_file(key):
                print(f"  ✓ Verified at {SITE_URL}/{key}.txt")
            else:
                print(f"  ✗ Could not verify key file — check that the file is publicly accessible")
                print(f"  -> You can still continue if you know it's there: re-run with --skip-upload")
                return

    # ── 3. Collect URLs from sitemaps ───────────────────────────────────────
    all_urls = []
    for sitemap in SITEMAP_URLS:
        print(f"Fetching {sitemap}...")
        urls = fetch_urls_from_sitemap(sitemap)
        print(f"  Found {len(urls)} URLs")
        all_urls.extend(urls)

    all_urls = list(dict.fromkeys(all_urls))   # deduplicate, preserve order
    total    = len(all_urls)
    limit    = args.batch if args.batch > 0 else total
    subset   = all_urls[:limit]

    print(f"\nTotal unique URLs : {total}")
    print(f"Submitting        : {len(subset)}\n")

    if args.dry_run:
        for u in subset:
            print(f"  [DRY RUN] {u}")
        return

    # ── 4. Ping Bing sitemap (Google ping deprecated June 2023) ─────────────
    print("Pinging Bing sitemap endpoint...")
    ping_sitemap("Bing", BING_PING)
    print()

    # ── 5. Submit to IndexNow (Bing/Yandex/Naver) ───────────────────────────
    print("Submitting to IndexNow...")
    submitted, failed = submit_indexnow_batch(subset, key)

    # ── 6. Summary ───────────────────────────────────────────────────────────
    print(f"\n{'='*60}")
    print(f"Submitted  : {submitted}")
    print(f"Failed     : {failed}")
    print(f"Timestamp  : {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}")
    print(f"\nKey file   : {SITE_URL}/{key}.txt")
    print(f"Engines    : Bing, Yandex, Naver (all via IndexNow)")

    if total > limit:
        remaining = all_urls[limit:]
        with open("remaining_urls.txt", "w") as f:
            f.write("\n".join(remaining))
        print(f"\nRemaining {len(remaining)} URLs saved to remaining_urls.txt")


if __name__ == "__main__":
    main()
