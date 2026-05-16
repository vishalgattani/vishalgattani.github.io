---
title: "Colorado Rockies — Map Features Demo"
date: 2024-08-10
trip_type: road
description: "A demo trip showing every marker type available — pins, emojis, numbered stops, labels, polygons, areas, and freeform routes."
tags: [Demo, Colorado, Hiking]

# --- top-of-page overview map ---
# Only pin/circle/numbered/emoji/label stops are used to compute the OSRM route.
# polygon, circle_area, and freeform stops are drawn as overlays on top.
stops:
  # plain dropped pin (default when type is omitted)
  - label: "Denver, CO"
    lat: 39.7392
    lng: -104.9903

  # numbered stop — great for ordered itineraries
  - label: "Boulder, CO"
    lat: 40.0150
    lng: -105.2705
    type: numbered
    number: 1
    note: "Pearl Street Mall, Chautauqua Park"

  # emoji marker — use any emoji as the icon
  - label: "Estes Park"
    lat: 40.3775
    lng: -105.5224
    type: emoji
    icon: "🦌"
    note: "Elk everywhere. Seriously."

  # circle dot — good for photo spots or minor waypoints
  - label: "Bear Lake Trailhead"
    lat: 40.3120
    lng: -105.6456
    type: circle
    color: "#28a745"
    note: "Arrive before 7am or the parking lot is full"

  # permanent text label — no pin, just a floating name
  - label: "Rocky Mountain National Park"
    lat: 40.4000
    lng: -105.6800
    type: label

  # shaded polygon — highlight a region
  - label: "RMNP Boundary (approximate)"
    lat: 40.3500
    lng: -105.6500
    type: polygon
    color: "#6f42c1"
    coords:
      - [40.27, -105.75]
      - [40.27, -105.55]
      - [40.50, -105.55]
      - [40.50, -105.75]

  # radius circle — "stayed within X metres of here"
  - label: "Campsite (~500m radius)"
    lat: 40.3760
    lng: -105.6200
    type: circle_area
    radius: 500
    color: "#fd7e14"
    note: "Moraine Park Campground"

  # freeform polyline — hike, bike path, ferry, anything non-road
  - label: "Emerald Lake Trail"
    lat: 40.3120
    lng: -105.6456
    type: freeform
    color: "#dc3545"
    dashed: false
    coords:
      - [40.3120, -105.6456]
      - [40.3098, -105.6489]
      - [40.3082, -105.6521]
      - [40.3065, -105.6554]
      - [40.3055, -105.6592]

# --- section map used inside the markdown body ---
day2_stops:
  - label: "Trail Ridge Road start"
    lat: 40.3960
    lng: -105.6070
    type: numbered
    number: 1
  - label: "Alpine Visitor Center (11,796 ft)"
    lat: 40.4575
    lng: -105.7131
    type: emoji
    icon: "🏔️"
    note: "Highest paved road in the US"
  - label: "Milner Pass"
    lat: 40.4203
    lng: -105.8125
    type: numbered
    number: 3
    note: "Continental Divide"
---

## Overview

This is a **demo trip** — every marker type you can use in a trip markdown is shown on the map above and in the Day 2 section below. Use this as a reference when writing your own trips.

---

## Marker types at a glance

| Type | What it looks like | When to use |
|------|-------------------|-------------|
| `pin` (default) | Standard blue Leaflet marker | Main stops, towns |
| `numbered` | Colored circle with a number | Ordered itinerary steps |
| `emoji` | Any emoji as an icon | Restaurants 🍔, summits 🏔️, wildlife 🦌 |
| `circle` | Small filled dot | Photo spots, minor waypoints |
| `label` | Floating text, no pin | Region names, area labels |
| `polygon` | Shaded outline | Park boundaries, neighborhoods |
| `circle_area` | Radius bubble | Campsite, "stayed near here" |
| `freeform` | Arbitrary polyline | Hikes, bike routes, ferries |

All types support a `note` field — it shows as a second line inside the popup when you click the marker.  
All types support a `color` field to override the default blue.

---

## Day 2 — Trail Ridge Road

The highest continuous paved road in the US. Drive it west to east for the best light in the morning.

{% include trips/map-section.html id="day2" stops=page.day2_stops type="road" %}

The road closes from roughly October to late May depending on snowpack. Check [nps.gov/romo](https://www.nps.gov/romo) before going.
