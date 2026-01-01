import yaml
import requests
import time
import sys
import re
from pathlib import Path
from urllib.parse import unquote_plus  # Added for cleaning titles

FILE_PATH = Path(__file__).parent.parent/'_data/journal_map.yml'
USER_AGENT = "VishalGattaniPortfolio/1.0 (vishalgattani09@gmail.com)"

def extract_google_maps_data(url):
    """
    Resolves the URL and extracts:
    1. Latitude/Longitude (prioritizing !3d/!4d pins)
    2. Location Title (from /place/Name...)
    """
    lat, lng, title = None, None, None

    try:
        # 1. Follow the redirect to get the 'real' URL
        session = requests.Session()
        session.headers.update({'User-Agent': USER_AGENT})
        resp = session.head(url, allow_redirects=True, timeout=10)
        final_url = resp.url

        # 2. Extract Title from URL structure: .../place/The+Name+Here/...
        match_title = re.search(r'place/([^/]+)/', final_url)
        if match_title:
            # unquote_plus replaces '+' with spaces and fixes % encoded chars
            title = unquote_plus(match_title.group(1))

        # 3. Extract Coordinates

        # PRIORITY 1: !3d and !4d (The "Pin" Location)
        match_data = re.search(r'!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)', final_url)
        if match_data:
            lat, lng = float(match_data.group(1)), float(match_data.group(2))

        # PRIORITY 2: @lat,lng (The "Viewport" Location - Fallback)
        if lat is None or lng is None:
            match_at = re.search(r'@(-?\d+\.\d+),(-?\d+\.\d+)', final_url)
            if match_at:
                lat, lng = float(match_at.group(1)), float(match_at.group(2))

    except Exception as e:
        print(f"    [x] URL Parsing Error: {e}")

    return lat, lng, title

def main():
    print(f"--- Starting Geocoder & Title Fetcher ---")
    print(f"Reading {FILE_PATH}...")

    try:
        with open(FILE_PATH, 'r') as f:
            entries = yaml.safe_load(f) or []
    except FileNotFoundError:
        print(f"Error: Could not find {FILE_PATH}")
        return

    updated_count = 0

    for i, entry in enumerate(entries):
        # Check if we are missing critical data
        missing_coords = (entry.get('lat') is None or entry.get('lng') is None)
        missing_title = (entry.get('title') is None or entry['title'] == '')

        if missing_coords or missing_title:

            # Use existing title for log, or placeholder if we are about to find it
            current_display_title = entry.get('title', 'Unknown Entry')
            # print(f"[{i+1}/{len(entries)}] Processing: {current_display_title}...", end=" ", flush=True)

            if entry.get('url'):
                found_lat, found_lng, found_title = extract_google_maps_data(entry['url'])

                entry_updated = False

                # Update Coordinates if missing
                if missing_coords and found_lat and found_lng:
                    entry['lat'] = found_lat
                    entry['lng'] = found_lng
                    entry_updated = True

                # Update Title if missing
                if missing_title and found_title:
                    entry['title'] = found_title
                    entry_updated = True

                if entry_updated:
                    print("✅ Updated")
                    updated_count += 1
                    time.sleep(1) # Be polite to API
                else:
                    print("⚠️ Could not extract missing data")
            else:
                print("❌ No URL provided")

    # Write changes back to file
    if updated_count > 0:
        with open(FILE_PATH, 'w') as f:
            yaml.dump(entries, f, sort_keys=False, default_flow_style=False, allow_unicode=True)
        print(f"\n🎉 Success! Updated {updated_count} entries.")
    else:
        print("\n✨ All entries are up to date.")

if __name__ == "__main__":
    main()