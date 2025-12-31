"""
Script: Journal Map Geocoder
Author: Vishal Gattani
Date: December 31, 2025

Description:
    This script automates the process of finding latitude and longitude coordinates
    for journal entries in '_data/journal_map.yml'.

    1. Extracts coordinates directly from Google Maps URLs (handling redirects).

    It adheres to API usage policies by including a User-Agent and enforcing
    rate limits (sleep timers) to prevent IP bans.
"""

import yaml
import requests
import time
import sys
import re
from pathlib import Path

FILE_PATH = Path(__file__).parent.parent/'_data/journal_map.yml'
USER_AGENT = "VishalGattaniPortfolio/1.0 (vishalgattani09@gmail.com)"

def extract_coords_from_url(url):
    """Extract lat/lng from a Google Maps URL by following redirects"""
    try:
        # 1. Follow the redirect to get the 'real' URL
        session = requests.Session()
        session.headers.update({'User-Agent': USER_AGENT})
        resp = session.head(url, allow_redirects=True, timeout=10)
        final_url = resp.url

        # 2. Regex Patterns to find coordinates in the resolved URL

        # Pattern A: @lat,lng (Standard Browser URL)
        # e.g. .../place/Name/@40.6892,-74.0445,17z/...
        match_at = re.search(r'@(-?\d+\.\d+),(-?\d+\.\d+)', final_url)
        if match_at:
            return float(match_at.group(1)), float(match_at.group(2))

        # Pattern B: !3d and !4d (Embed/Share URLs)
        # e.g. ...!3d40.6892!4d-74.0445...
        match_data = re.search(r'!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)', final_url)
        if match_data:
            return float(match_data.group(1)), float(match_data.group(2))

        # Pattern C: q=lat,lng (Search Query)
        # e.g. ...?q=40.6892,-74.0445
        match_q = re.search(r'q=(-?\d+\.\d+),(-?\d+\.\d+)', final_url)
        if match_q:
            return float(match_q.group(1)), float(match_q.group(2))

    except Exception as e:
        print(f"    [x] URL Parsing Error: {e}")

    return None, None

def main():
    print(f"--- Starting Geocoder ---")
    print(f"Reading {FILE_PATH}...")

    try:
        with open(FILE_PATH, 'r') as f:
            entries = yaml.safe_load(f) or []
    except FileNotFoundError:
        print(f"Error: Could not find {FILE_PATH}")
        return

    updated_count = 0

    for i, entry in enumerate(entries):
        # We only process entries that are MISSING lat or lng
        if (entry.get('lat') is None or entry.get('lng') is None):

            title = entry.get('title', 'Unknown Entry')
            print(f"[{i+1}/{len(entries)}] Processing: {title}...", end=" ", flush=True)

            lat, lng = None, None

            # STRATEGY 1: Try Google Maps URL first (Most Accurate)
            if entry.get('maps_url'):
                lat, lng = extract_coords_from_url(entry['maps_url'])
                if lat and lng:
                    print(f"✅ Found via URL -> ({lat:.4f}, {lng:.4f})")
                    # Sleep for 1s to be polite to Google
                    time.sleep(1)
            else:
                raise RuntimeError(f"No URL found for entry: {entry}")

            if not lat and not lng:
                raise RuntimeError("Unable to find coordinates.")

            # Save data if found
            if lat and lng:
                entry['lat'] = lat
                entry['lng'] = lng
                updated_count += 1

    # Write changes back to file
    if updated_count > 0:
        with open(FILE_PATH, 'w') as f:
            yaml.dump(entries, f, sort_keys=False, default_flow_style=False, allow_unicode=True)
        print(f"🎉 Success! Updated {updated_count} entries.")
    else:
        print("✨ All entries are up to date.")

if __name__ == "__main__":
    main()