"""
Google Indexing API — Bulk URL Submission for vardhinivastu.in
=============================================================
Submits all sitemap URLs to Google's Indexing API (200/day limit).

SETUP (one-time):
1. Go to https://console.cloud.google.com/
2. Create project > Enable "Web Search Indexing API"
3. IAM > Service Accounts > Create > Download JSON key
4. In Google Search Console > Settings > Users & Permissions
   > Add user: <service-account-email> as OWNER
5. Place the downloaded JSON key as: service_account.json (same folder as this script)
6. pip install google-auth requests

RUN:
    python indexing_api_submit.py
"""

import json
import time
import requests
from datetime import datetime
from google.oauth2 import service_account

# ── Config ─────────────────────────────────────────────────────────────────
SERVICE_ACCOUNT_FILE = "service_account.json"   # put your JSON key here
SCOPES = ["https://www.googleapis.com/auth/indexing"]
DAILY_LIMIT = 200          # Google's hard limit per day per project
DELAY_BETWEEN_REQUESTS = 1 # seconds between each API call

# ── All 338 sitemap URLs (fetched 2026-05-30) ──────────────────────────────
SITEMAP_URLS = [
    "https://vardhinivastu.in/",
    "https://vardhinivastu.in/about/",
    "https://vardhinivastu.in/services/",
    "https://vardhinivastu.in/contact/",
    "https://vardhinivastu.in/testimonials/",
    "https://vardhinivastu.in/in/",
    "https://vardhinivastu.in/disclaimer/",
    "https://vardhinivastu.in/privacy-policy/",
    "https://vardhinivastu.in/terms/",
    "https://vardhinivastu.in/vastu-for-house/",
    "https://vardhinivastu.in/vastu-for-entrance-and-main-door/",
    "https://vardhinivastu.in/vastu-for-kitchen/",
    "https://vardhinivastu.in/vastu-for-bedroom/",
    "https://vardhinivastu.in/vastu-for-pooja-room/",
    "https://vardhinivastu.in/vastu-for-study-room/",
    "https://vardhinivastu.in/vastu-for-toilet-and-bathroom/",
    "https://vardhinivastu.in/vastu-for-office/",
    "https://vardhinivastu.in/vastu-for-business/",
    "https://vardhinivastu.in/vastu-for-career/",
    "https://vardhinivastu.in/vastu-for-wealth/",
    "https://vardhinivastu.in/vastu-for-health/",
    "https://vardhinivastu.in/vastu-for-marriage/",
    "https://vardhinivastu.in/vastu-for-children/",
    "https://vardhinivastu.in/vastu-for-stairs/",
    "https://vardhinivastu.in/vastu-for-living-room/",
    "https://vardhinivastu.in/vastu-for-dining-room/",
    "https://vardhinivastu.in/vastu-for-garage/",
    "https://vardhinivastu.in/vastu-for-garden/",
    "https://vardhinivastu.in/vastu-for-swimming-pool/",
    "https://vardhinivastu.in/vastu-for-guest-room/",
    "https://vardhinivastu.in/vastu-for-store-room/",
    "https://vardhinivastu.in/vastu-for-balcony/",
    "https://vardhinivastu.in/vastu-for-terrace/",
    "https://vardhinivastu.in/vastu-for-basement/",
    "https://vardhinivastu.in/vastu-for-temple/",
    "https://vardhinivastu.in/vastu-for-plot/",
    "https://vardhinivastu.in/vastu-for-east-facing-house/",
    "https://vardhinivastu.in/vastu-for-west-facing-house/",
    "https://vardhinivastu.in/vastu-for-north-facing-house/",
    "https://vardhinivastu.in/vastu-for-south-facing-house/",
    "https://vardhinivastu.in/vastu-for-flat/",
    "https://vardhinivastu.in/vastu-for-villa/",
    "https://vardhinivastu.in/vastu-for-row-house/",
    "https://vardhinivastu.in/vastu-for-duplex/",
    "https://vardhinivastu.in/vastu-for-penthouse/",
    "https://vardhinivastu.in/vastu-for-bungalow/",
    "https://vardhinivastu.in/vastu-for-farmhouse/",
    "https://vardhinivastu.in/vastu-for-shop/",
    "https://vardhinivastu.in/vastu-for-showroom/",
    "https://vardhinivastu.in/vastu-for-restaurant/",
    "https://vardhinivastu.in/vastu-for-hotel/",
    "https://vardhinivastu.in/vastu-for-hospital/",
    "https://vardhinivastu.in/vastu-for-clinic/",
    "https://vardhinivastu.in/vastu-for-school/",
    "https://vardhinivastu.in/vastu-for-college/",
    "https://vardhinivastu.in/vastu-for-factory/",
    "https://vardhinivastu.in/vastu-for-warehouse/",
    "https://vardhinivastu.in/vastu-for-it-company/",
    "https://vardhinivastu.in/vastu-for-bank/",
    "https://vardhinivastu.in/vastu-for-gym/",
    "https://vardhinivastu.in/vastu-for-salon/",
    "https://vardhinivastu.in/vastu-for-dental-clinic/",
    "https://vardhinivastu.in/vastu-remedies/",
    "https://vardhinivastu.in/vastu-colors/",
    "https://vardhinivastu.in/vastu-plants/",
    "https://vardhinivastu.in/vastu-tips/",
    "https://vardhinivastu.in/vastu-dosh-remedies/",
    "https://vardhinivastu.in/vastu-shastra-history/",
    "https://vardhinivastu.in/vastu-directions/",
    "https://vardhinivastu.in/vastu-zones/",
    "https://vardhinivastu.in/vastu-compass/",
    "https://vardhinivastu.in/vastu-pancha-bhuta/",
    "https://vardhinivastu.in/vastu-purusha-mandala/",
    "https://vardhinivastu.in/vastu-consultant-bangalore/",
    "https://vardhinivastu.in/vastu-consultant-koramangala/",
    "https://vardhinivastu.in/vastu-consultant-hsr-layout/",
    "https://vardhinivastu.in/vastu-consultant-whitefield/",
    "https://vardhinivastu.in/vastu-consultant-electronic-city/",
    "https://vardhinivastu.in/vastu-consultant-jp-nagar/",
    "https://vardhinivastu.in/vastu-consultant-indiranagar/",
    "https://vardhinivastu.in/vastu-consultant-marathahalli/",
    "https://vardhinivastu.in/vastu-consultant-btm-layout/",
    "https://vardhinivastu.in/vastu-consultant-jayanagar/",
    "https://vardhinivastu.in/vastu-consultant-hebbal/",
    "https://vardhinivastu.in/vastu-consultant-yelahanka/",
    "https://vardhinivastu.in/vastu-consultant-rajajinagar/",
    "https://vardhinivastu.in/vastu-consultant-malleswaram/",
    "https://vardhinivastu.in/vastu-consultant-vijayanagar/",
    "https://vardhinivastu.in/vastu-consultant-banashankari/",
    "https://vardhinivastu.in/vastu-consultant-basavanagudi/",
    "https://vardhinivastu.in/vastu-consultant-chamrajpet/",
    "https://vardhinivastu.in/vastu-consultant-shivajinagar/",
    "https://vardhinivastu.in/vastu-consultant-frazer-town/",
    "https://vardhinivastu.in/vastu-consultant-richmond-town/",
    "https://vardhinivastu.in/vastu-consultant-ulsoor/",
    "https://vardhinivastu.in/vastu-consultant-mg-road/",
    "https://vardhinivastu.in/vastu-consultant-brigade-road/",
    "https://vardhinivastu.in/vastu-consultant-commercial-street/",
    "https://vardhinivastu.in/vastu-consultant-cox-town/",
    "https://vardhinivastu.in/vastu-consultant-benson-town/",
    "https://vardhinivastu.in/vastu-consultant-potter-town/",
    "https://vardhinivastu.in/vastu-consultant-cantonment/",
    "https://vardhinivastu.in/vastu-consultant-vasanth-nagar/",
    "https://vardhinivastu.in/vastu-consultant-sadashivanagar/",
    "https://vardhinivastu.in/vastu-consultant-dollars-colony/",
    "https://vardhinivastu.in/vastu-consultant-rt-nagar/",
    "https://vardhinivastu.in/vastu-consultant-ms-ramaiah/",
    "https://vardhinivastu.in/vastu-consultant-mathikere/",
    "https://vardhinivastu.in/vastu-consultant-vidyaranyapura/",
    "https://vardhinivastu.in/vastu-consultant-jalahalli/",
    "https://vardhinivastu.in/vastu-consultant-yeshwanthpur/",
    "https://vardhinivastu.in/vastu-consultant-peenya/",
    "https://vardhinivastu.in/vastu-consultant-tumkur-road/",
    "https://vardhinivastu.in/vastu-consultant-nagasandra/",
    "https://vardhinivastu.in/vastu-consultant-chikkabidarakallu/",
    "https://vardhinivastu.in/vastu-consultant-madavara/",
    "https://vardhinivastu.in/vastu-consultant-dasarahalli/",
    "https://vardhinivastu.in/vastu-consultant-laggere/",
    "https://vardhinivastu.in/vastu-consultant-herohalli/",
    "https://vardhinivastu.in/vastu-consultant-kengeri/",
    "https://vardhinivastu.in/vastu-consultant-uttarahalli/",
    "https://vardhinivastu.in/vastu-consultant-bannerghatta-road/",
    "https://vardhinivastu.in/vastu-consultant-gottigere/",
    "https://vardhinivastu.in/vastu-consultant-hulimavu/",
    "https://vardhinivastu.in/vastu-consultant-arekere/",
    "https://vardhinivastu.in/vastu-consultant-begur/",
    "https://vardhinivastu.in/vastu-consultant-haralukunte/",
    "https://vardhinivastu.in/vastu-consultant-sarjapur-road/",
    "https://vardhinivastu.in/vastu-consultant-bellandur/",
    "https://vardhinivastu.in/vastu-consultant-kadugodi/",
    "https://vardhinivastu.in/vastu-consultant-mahadevapura/",
    "https://vardhinivastu.in/vastu-consultant-brookefield/",
    "https://vardhinivastu.in/vastu-consultant-kundalahalli/",
    "https://vardhinivastu.in/vastu-consultant-ITPL/",
    "https://vardhinivastu.in/vastu-consultant-hoodi/",
    "https://vardhinivastu.in/vastu-consultant-varthur/",
    "https://vardhinivastu.in/vastu-consultant-gunjur/",
    "https://vardhinivastu.in/vastu-consultant-panathur/",
    "https://vardhinivastu.in/vastu-consultant-doddanekundi/",
    "https://vardhinivastu.in/vastu-consultant-krishnarajapuram/",
    "https://vardhinivastu.in/vastu-consultant-banaswadi/",
    "https://vardhinivastu.in/vastu-consultant-ramamurthy-nagar/",
    "https://vardhinivastu.in/vastu-consultant-horamavu/",
    "https://vardhinivastu.in/vastu-consultant-hennur/",
    "https://vardhinivastu.in/vastu-consultant-thanisandra/",
    "https://vardhinivastu.in/vastu-consultant-jakkur/",
    "https://vardhinivastu.in/vastu-consultant-bagalur/",
    "https://vardhinivastu.in/vastu-consultant-devanahalli/",
    "https://vardhinivastu.in/vastu-consultant-doddaballapur-road/",
    "https://vardhinivastu.in/vastu-consultant-kogilu/",
    "https://vardhinivastu.in/vastu-consultant-kothanur/",
    "https://vardhinivastu.in/vastu-consultant-amruthahalli/",
    "https://vardhinivastu.in/vastu-consultant-sahakara-nagar/",
    "https://vardhinivastu.in/vastu-consultant-bsk-3rd-stage/",
    "https://vardhinivastu.in/vastu-consultant-kanakapura-road/",
    "https://vardhinivastu.in/vastu-consultant-mysore-road/",
    "https://vardhinivastu.in/vastu-consultant-rajarajeshwari-nagar/",
    "https://vardhinivastu.in/vastu-consultant-nagarbhavi/",
    "https://vardhinivastu.in/vastu-consultant-nayandahalli/",
    "https://vardhinivastu.in/vastu-consultant-pantarapalya/",
    "https://vardhinivastu.in/vastu-consultant-agara/",
    "https://vardhinivastu.in/vastu-consultant-harlur/",
    "https://vardhinivastu.in/vastu-consultant-kasavanahalli/",
    "https://vardhinivastu.in/vastu-consultant-halanayakanahalli/",
    "https://vardhinivastu.in/vastu-consultant-carmelaram/",
    "https://vardhinivastu.in/vastu-consultant-old-airport-road/",
    "https://vardhinivastu.in/vastu-consultant-kodihalli/",
    "https://vardhinivastu.in/vastu-consultant-domlur/",
    "https://vardhinivastu.in/vastu-consultant-murugeshpalya/",
    "https://vardhinivastu.in/vastu-consultant-halsuru/",
    "https://vardhinivastu.in/vastu-consultant-hal-layout/",
    "https://vardhinivastu.in/vastu-consultant-new-thippasandra/",
    "https://vardhinivastu.in/vastu-consultant-old-thippasandra/",
    "https://vardhinivastu.in/vastu-consultant-airport-road/",
    "https://vardhinivastu.in/vastu-consultant-cv-raman-nagar/",
    "https://vardhinivastu.in/vastu-consultant-nagawara/",
    "https://vardhinivastu.in/vastu-consultant-hebbal-kempapura/",
    "https://vardhinivastu.in/vastu-consultant-sanjay-nagar/",
    "https://vardhinivastu.in/vastu-consultant-ganganagar/",
    "https://vardhinivastu.in/vastu-consultant-aramane-nagar/",
    "https://vardhinivastu.in/vastu-consultant-subramanyanagar/",
    "https://vardhinivastu.in/vastu-consultant-byatarayanapura/",
    "https://vardhinivastu.in/vastu-consultant-bommanahalli/",
    "https://vardhinivastu.in/vastu-consultant-hongasandra/",
    "https://vardhinivastu.in/vastu-consultant-kudlu/",
    "https://vardhinivastu.in/vastu-consultant-bommasandra/",
    "https://vardhinivastu.in/vastu-consultant-electronic-city-phase-1/",
    "https://vardhinivastu.in/vastu-consultant-electronic-city-phase-2/",
    "https://vardhinivastu.in/vastu-consultant-neeladri-nagar/",
    "https://vardhinivastu.in/vastu-consultant-chandapura/",
    "https://vardhinivastu.in/vastu-consultant-anekal/",
    "https://vardhinivastu.in/vastu-consultant-attibele/",
    "https://vardhinivastu.in/vastu-consultant-jigani/",
    "https://vardhinivastu.in/vastu-consultant-mumbai/",
    "https://vardhinivastu.in/vastu-consultant-delhi/",
    "https://vardhinivastu.in/vastu-consultant-hyderabad/",
    "https://vardhinivastu.in/vastu-consultant-chennai/",
    "https://vardhinivastu.in/vastu-consultant-pune/",
    "https://vardhinivastu.in/vastu-consultant-kolkata/",
    "https://vardhinivastu.in/vastu-consultant-ahmedabad/",
    "https://vardhinivastu.in/vastu-consultant-surat/",
    "https://vardhinivastu.in/vastu-consultant-jaipur/",
    "https://vardhinivastu.in/vastu-consultant-lucknow/",
    "https://vardhinivastu.in/vastu-consultant-kanpur/",
    "https://vardhinivastu.in/vastu-consultant-nagpur/",
    "https://vardhinivastu.in/vastu-consultant-indore/",
    "https://vardhinivastu.in/vastu-consultant-bhopal/",
    "https://vardhinivastu.in/vastu-consultant-patna/",
    "https://vardhinivastu.in/vastu-consultant-vadodara/",
    "https://vardhinivastu.in/vastu-consultant-ghaziabad/",
    "https://vardhinivastu.in/vastu-consultant-ludhiana/",
    "https://vardhinivastu.in/vastu-consultant-agra/",
    "https://vardhinivastu.in/vastu-consultant-nashik/",
    "https://vardhinivastu.in/vastu-consultant-faridabad/",
    "https://vardhinivastu.in/vastu-consultant-meerut/",
    "https://vardhinivastu.in/vastu-consultant-rajkot/",
    "https://vardhinivastu.in/vastu-consultant-varanasi/",
    "https://vardhinivastu.in/vastu-consultant-srinagar/",
    "https://vardhinivastu.in/vastu-consultant-aurangabad/",
    "https://vardhinivastu.in/vastu-consultant-dhanbad/",
    "https://vardhinivastu.in/vastu-consultant-amritsar/",
    "https://vardhinivastu.in/vastu-consultant-allahabad/",
    "https://vardhinivastu.in/vastu-consultant-ranchi/",
    "https://vardhinivastu.in/vastu-consultant-howrah/",
    "https://vardhinivastu.in/vastu-consultant-coimbatore/",
    "https://vardhinivastu.in/vastu-consultant-jabalpur/",
    "https://vardhinivastu.in/vastu-consultant-gwalior/",
    "https://vardhinivastu.in/vastu-consultant-vijayawada/",
    "https://vardhinivastu.in/vastu-consultant-jodhpur/",
    "https://vardhinivastu.in/vastu-consultant-madurai/",
    "https://vardhinivastu.in/vastu-consultant-raipur/",
    "https://vardhinivastu.in/vastu-consultant-kota/",
    "https://vardhinivastu.in/vastu-consultant-chandigarh/",
    "https://vardhinivastu.in/vastu-consultant-guwahati/",
    "https://vardhinivastu.in/vastu-consultant-solapur/",
    "https://vardhinivastu.in/vastu-consultant-hubballi/",
    "https://vardhinivastu.in/vastu-consultant-tiruchirappalli/",
    "https://vardhinivastu.in/vastu-consultant-bareilly/",
    "https://vardhinivastu.in/vastu-consultant-mysore/",
    "https://vardhinivastu.in/vastu-consultant-tiruppur/",
    "https://vardhinivastu.in/vastu-consultant-gurgaon/",
    "https://vardhinivastu.in/vastu-consultant-aligarh/",
    "https://vardhinivastu.in/vastu-consultant-jalandhar/",
    "https://vardhinivastu.in/vastu-consultant-bhubaneswar/",
    "https://vardhinivastu.in/vastu-consultant-salem/",
    "https://vardhinivastu.in/vastu-consultant-mira-bhayandar/",
    "https://vardhinivastu.in/vastu-consultant-thiruvananthapuram/",
    "https://vardhinivastu.in/vastu-consultant-warangal/",
    "https://vardhinivastu.in/vastu-consultant-guntur/",
    "https://vardhinivastu.in/vastu-consultant-bhiwandi/",
    "https://vardhinivastu.in/vastu-consultant-saharanpur/",
    "https://vardhinivastu.in/vastu-consultant-gorakhpur/",
    "https://vardhinivastu.in/vastu-consultant-bikaner/",
    "https://vardhinivastu.in/vastu-consultant-amravati/",
    "https://vardhinivastu.in/vastu-consultant-noida/",
    "https://vardhinivastu.in/vastu-consultant-jamshedpur/",
    "https://vardhinivastu.in/vastu-consultant-bhilai/",
    "https://vardhinivastu.in/vastu-consultant-cuttack/",
    "https://vardhinivastu.in/vastu-consultant-firozabad/",
    "https://vardhinivastu.in/vastu-consultant-kochi/",
    "https://vardhinivastu.in/vastu-consultant-navi-mumbai/",
    "https://vardhinivastu.in/vastu-consultant-dehradun/",
    "https://vardhinivastu.in/vastu-consultant-durgapur/",
    "https://vardhinivastu.in/vastu-consultant-asansol/",
    "https://vardhinivastu.in/vastu-consultant-nanded/",
    "https://vardhinivastu.in/vastu-consultant-kolhapur/",
    "https://vardhinivastu.in/vastu-consultant-ajmer/",
    "https://vardhinivastu.in/vastu-consultant-akola/",
    "https://vardhinivastu.in/vastu-consultant-gulbarga/",
    "https://vardhinivastu.in/vastu-consultant-jamnagar/",
    "https://vardhinivastu.in/vastu-consultant-ujjain/",
    "https://vardhinivastu.in/vastu-consultant-loni/",
    "https://vardhinivastu.in/vastu-consultant-siliguri/",
    "https://vardhinivastu.in/vastu-consultant-jhansi/",
    "https://vardhinivastu.in/vastu-consultant-ulhasnagar/",
    "https://vardhinivastu.in/vastu-consultant-nellore/",
    "https://vardhinivastu.in/vastu-consultant-jammu/",
    "https://vardhinivastu.in/vastu-consultant-sangli-miraj/",
    "https://vardhinivastu.in/vastu-consultant-belgaum/",
    "https://vardhinivastu.in/vastu-consultant-mangalore/",
    "https://vardhinivastu.in/vastu-consultant-erode/",
    "https://vardhinivastu.in/vastu-consultant-ambattur/",
    "https://vardhinivastu.in/vastu-consultant-tirunelveli/",
    "https://vardhinivastu.in/vastu-consultant-malegaon/",
    "https://vardhinivastu.in/vastu-consultant-gaya/",
    "https://vardhinivastu.in/vastu-consultant-jalgaon/",
    "https://vardhinivastu.in/vastu-consultant-udaipur/",
    "https://vardhinivastu.in/vastu-consultant-maheshtala/",
    "https://vardhinivastu.in/vastu-consultant-davanagere/",
    "https://vardhinivastu.in/vastu-consultant-kozhikode/",
    "https://vardhinivastu.in/vastu-consultant-kurnool/",
    "https://vardhinivastu.in/vastu-consultant-rajpur-sonarpur/",
    "https://vardhinivastu.in/vastu-consultation-fees/",
    "https://vardhinivastu.in/commercial-vastu/",
    "https://vardhinivastu.in/industrial-vastu-bangalore/",
    "https://vardhinivastu.in/online-vastu-consultation/",
    "https://vardhinivastu.in/pre-purchase-vastu/",
    "https://vardhinivastu.in/lecher-antenna-geopathic-stress/",
    "https://vardhinivastu.in/credentials/",
    "https://vardhinivastu.in/vastu-for-home/",
    "https://vardhinivastu.in/best-vastu-consultant-bangalore/",
    "https://vardhinivastu.in/best-vastu-consultant-india/",
    "https://vardhinivastu.in/bedroom-vastu-sleeping-direction/",
    "https://vardhinivastu.in/apartment-vastu-tips/",
    "https://vardhinivastu.in/astro-vastu-home-remedies/",
    "https://vardhinivastu.in/emf-radiation-vastu-remedies/",
    "https://vardhinivastu.in/french-vs-german-radiesthesia/",
    "https://vardhinivastu.in/geopathic-stress-remedies/",
    "https://vardhinivastu.in/psychodynamic-radiesthesia-vastu/",
    "https://vardhinivastu.in/sacred-geometry-golden-ratio-vastu/",
    "https://vardhinivastu.in/scientific-vastu-instruments/",
    "https://vardhinivastu.in/south-facing-house-vastu/",
    "https://vardhinivastu.in/space-clearing-low-frequency-remedies/",
    "https://vardhinivastu.in/t-point-house-vastu/",
]


def get_access_token():
    creds = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES
    )
    creds.refresh(requests.Request())
    return creds.token


def submit_url(token, url, url_type="URL_UPDATED"):
    """Submit a single URL to the Indexing API."""
    endpoint = "https://indexing.googleapis.com/v3/urlNotifications:publish"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }
    body = {"url": url, "type": url_type}
    resp = requests.post(endpoint, headers=headers, json=body)
    return resp.status_code, resp.json()


def main():
    print(f"\n{'='*60}")
    print(f"  Google Indexing API — vardhinivastu.in")
    print(f"  Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"  Total URLs to submit: {len(SITEMAP_URLS)}")
    print(f"  Daily limit: {DAILY_LIMIT}")
    print(f"{'='*60}\n")

    try:
        from google.auth.transport.requests import Request as GoogleRequest
        creds = service_account.Credentials.from_service_account_file(
            SERVICE_ACCOUNT_FILE, scopes=SCOPES
        )
        creds.refresh(GoogleRequest())
        token = creds.token
        print(f"✅ Authenticated as service account\n")
    except Exception as e:
        print(f"❌ Auth failed: {e}")
        print("\nSetup steps:")
        print("  1. Download service account JSON from Google Cloud Console")
        print("  2. Enable 'Web Search Indexing API' in your GCP project")
        print("  3. Add service account email as OWNER in GSC > Settings > Users")
        print("  4. Save JSON as 'service_account.json' next to this script")
        return

    results = {"success": [], "failed": [], "quota_exceeded": []}
    urls_to_submit = SITEMAP_URLS[:DAILY_LIMIT]

    for i, url in enumerate(urls_to_submit, 1):
        print(f"[{i:03d}/{len(urls_to_submit)}] {url}")
        try:
            status, resp = submit_url(token, url)
            if status == 200:
                results["success"].append(url)
                print(f"         ✅ Submitted")
            elif status == 429:
                results["quota_exceeded"].append(url)
                print(f"         ⛔ Quota exceeded — stopping")
                break
            else:
                results["failed"].append({"url": url, "status": status, "resp": resp})
                print(f"         ❌ Failed ({status}): {resp}")
        except Exception as e:
            results["failed"].append({"url": url, "error": str(e)})
            print(f"         ❌ Error: {e}")

        if i < len(urls_to_submit):
            time.sleep(DELAY_BETWEEN_REQUESTS)

    # ── Summary ────────────────────────────────────────────────────────────
    print(f"\n{'='*60}")
    print(f"  SUMMARY — {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"{'='*60}")
    print(f"  ✅ Submitted:        {len(results['success'])}")
    print(f"  ❌ Failed:           {len(results['failed'])}")
    print(f"  ⛔ Quota exceeded:   {len(results['quota_exceeded'])}")

    remaining = SITEMAP_URLS[DAILY_LIMIT:]
    if remaining:
        print(f"\n  ⏳ Remaining URLs:  {len(remaining)}")
        print(f"     Run again tomorrow to submit the next batch.")

    # Save results log
    log = {
        "timestamp": datetime.now().isoformat(),
        "submitted": len(results["success"]),
        "failed": results["failed"],
        "remaining": remaining,
    }
    with open("indexing_log.json", "w") as f:
        json.dump(log, f, indent=2)
    print(f"\n  📄 Full log saved to: indexing_log.json")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    main()
