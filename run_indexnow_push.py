"""
IndexNow + Bing Sitemap Push for vardhinivastu.in
Uses LOCAL sitemap.xml + existing indexnow.key
Submits all 338 URLs to Bing/IndexNow (Yandex, Naver also pick up)
"""

import json
import time
import urllib.request
import urllib.parse
import urllib.error
import xml.etree.ElementTree as ET
from datetime import datetime, timezone

SITE_URL          = "https://vardhinivastu.in"
KEY               = "36ca48259eefd063a6730cbc716d9e17"
KEY_LOCATION      = f"{SITE_URL}/{KEY}.txt"
LOCAL_SITEMAP     = r"C:\Users\raghu\Documents\Vardhini Vastu Rebuild website\sitemap.xml"
INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow"
BING_PING_BASE    = "https://www.bing.com/ping?sitemap="
LIVE_SITEMAP_URL  = f"{SITE_URL}/sitemap.xml"

# ── 1. Load URLs from local sitemap ─────────────────────────────────────────
print("=" * 60)
print(" IndexNow Push - vardhinivastu.in")
print("=" * 60)
print(f"\nReading local sitemap: {LOCAL_SITEMAP}")

tree = ET.parse(LOCAL_SITEMAP)
ns   = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
urls = [loc.text.strip() for loc in tree.findall(".//sm:loc", ns)]
urls = list(dict.fromkeys(urls))  # deduplicate
print(f"Found {len(urls)} unique URLs")

# ── 2. Verify key file is live ───────────────────────────────────────────────
print(f"\nVerifying key file at {KEY_LOCATION} ...")
try:
    with urllib.request.urlopen(KEY_LOCATION, timeout=10) as r:
        body = r.read().decode().strip()
    if body == KEY:
        print("  Key file verified OK")
    else:
        print(f"  WARNING: Key mismatch — got: {body[:50]}")
        print("  Continuing anyway...")
except Exception as e:
    print(f"  WARNING: Could not verify key file: {e}")
    print("  Continuing with submission anyway...")

# ── 3. Ping Bing sitemap endpoint ────────────────────────────────────────────
print(f"\nPinging Bing sitemap endpoint...")
ping_url = BING_PING_BASE + urllib.parse.quote(LIVE_SITEMAP_URL, safe="")
try:
    with urllib.request.urlopen(ping_url, timeout=10) as r:
        print(f"  Bing ping -> HTTP {r.status} OK")
except urllib.error.HTTPError as e:
    print(f"  Bing ping -> HTTP {e.code}")
except Exception as e:
    print(f"  Bing ping -> {e}")

# ── 4. Submit to IndexNow in batches of 500 ──────────────────────────────────
print(f"\nSubmitting {len(urls)} URLs to IndexNow (api.indexnow.org)...")
BATCH = 500
submitted = 0
failed    = 0

for start in range(0, len(urls), BATCH):
    chunk   = urls[start:start + BATCH]
    end_idx = start + len(chunk)
    payload = json.dumps({
        "host":        SITE_URL.replace("https://", ""),
        "key":         KEY,
        "keyLocation": KEY_LOCATION,
        "urlList":     chunk
    }).encode("utf-8")

    req = urllib.request.Request(
        INDEXNOW_ENDPOINT,
        data=payload,
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST"
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            code = r.status
        if code in (200, 202):
            submitted += len(chunk)
            print(f"  [BATCH {start+1}-{end_idx}] -> HTTP {code} ACCEPTED")
        else:
            failed += len(chunk)
            print(f"  [BATCH {start+1}-{end_idx}] -> HTTP {code} UNEXPECTED")
    except urllib.error.HTTPError as e:
        body = e.read().decode(errors="replace")[:300]
        failed += len(chunk)
        print(f"  [BATCH {start+1}-{end_idx}] -> HTTP {e.code}: {body}")
    except Exception as e:
        failed += len(chunk)
        print(f"  [BATCH {start+1}-{end_idx}] -> ERROR: {e}")
    time.sleep(1)

# ── 5. Also submit to Bing IndexNow endpoint directly ───────────────────────
print(f"\nAlso submitting to Bing IndexNow endpoint...")
BING_INDEXNOW = "https://www.bing.com/indexnow"
for start in range(0, len(urls), BATCH):
    chunk   = urls[start:start + BATCH]
    end_idx = start + len(chunk)
    payload = json.dumps({
        "host":        SITE_URL.replace("https://", ""),
        "key":         KEY,
        "keyLocation": KEY_LOCATION,
        "urlList":     chunk
    }).encode("utf-8")
    req = urllib.request.Request(
        BING_INDEXNOW,
        data=payload,
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST"
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            code = r.status
        print(f"  [Bing {start+1}-{end_idx}] -> HTTP {code} ACCEPTED")
    except urllib.error.HTTPError as e:
        body = e.read().decode(errors="replace")[:200]
        print(f"  [Bing {start+1}-{end_idx}] -> HTTP {e.code}: {body}")
    except Exception as e:
        print(f"  [Bing {start+1}-{end_idx}] -> ERROR: {e}")
    time.sleep(1)

# ── 6. Summary ───────────────────────────────────────────────────────────────
print(f"\n{'=' * 60}")
print(f" INDEXNOW PUSH COMPLETE")
print(f"{'=' * 60}")
print(f" Submitted  : {submitted}")
print(f" Failed     : {failed}")
print(f" Timestamp  : {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}")
print(f" Key        : {KEY}")
print(f" Key URL    : {KEY_LOCATION}")
print(f" Engines    : Bing, Yandex, Naver (via IndexNow)")
print(f"{'=' * 60}")
print(f"\nNext step: Submit sitemap in Google Search Console:")
print(f"  https://search.google.com/search-console/sitemaps")
print(f"  Sitemap URL: {LIVE_SITEMAP_URL}")
