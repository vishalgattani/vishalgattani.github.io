---
title: "Colorado Rockies — Map Features Demo"
date: 2024-08-10
trip_type: road
description: "A demo trip showing every marker type available — pins, emojis, numbered stops, labels, polygons, areas, and freeform routes."
tags: [Demo, Colorado, Hiking]

# `stops` is the overview map at the top of the page.
# It also drives the OSRM route line — only pin/circle/numbered/emoji/label
# types are used as routing waypoints. Everything else (polygon, circle_area,
# freeform) is drawn as an overlay on top.
stops:
  - label: "Denver, CO"
    lat: 39.7392
    lng: -104.9903

  - label: "Boulder, CO"
    lat: 40.0150
    lng: -105.2705
    type: numbered
    number: 1
    note: "Pearl Street Mall, Chautauqua Park"

  - label: "Estes Park"
    lat: 40.3775
    lng: -105.5224
    type: emoji
    icon: "🦌"
    note: "Elk everywhere. Seriously."

  - label: "Bear Lake Trailhead"
    lat: 40.3120
    lng: -105.6456
    type: circle
    color: "#28a745"
    note: "Arrive before 7am or the parking lot is full"

  - label: "Rocky Mountain National Park"
    lat: 40.4000
    lng: -105.6800
    type: label

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

  - label: "Campsite (~500m radius)"
    lat: 40.3760
    lng: -105.6200
    type: circle_area
    radius: 500
    color: "#fd7e14"
    note: "Moraine Park Campground"

  - label: "Emerald Lake Trail"
    lat: 40.3120
    lng: -105.6456
    type: freeform
    color: "#dc3545"
    coords:
      - [40.3120, -105.6456]
      - [40.3098, -105.6489]
      - [40.3082, -105.6521]
      - [40.3065, -105.6554]
      - [40.3055, -105.6592]

# Section maps: name them anything + _stops.
# day1_stops, day2_stops, morning_stops, hike_stops — all work the same way.
# Use {% include trips/map-section.html id="day1" stops=page.day1_stops type="road" %}
# The `id` must be unique within the page (it becomes the HTML element ID).
day1_stops:
  - label: "Denver — start"
    lat: 39.7392
    lng: -104.9903
    type: numbered
    number: 1
  - label: "Boulder"
    lat: 40.0150
    lng: -105.2705
    type: numbered
    number: 2
    note: "Lunch at Chautauqua"
  - label: "Estes Park"
    lat: 40.3775
    lng: -105.5224
    type: numbered
    number: 3
    note: "Check in, elk walk at dusk"

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
  - label: "Milner Pass — Continental Divide"
    lat: 40.4203
    lng: -105.8125
    type: numbered
    number: 3
---

## Overview

This is a **demo trip** — every marker type and section map convention is shown here. See the blog post [How to Add a Trip](/blog/how-to-add-a-trip) for the full reference.

---

## Marker types at a glance

| Type | When to use |
|------|-------------|
| `pin` (default) | Main stops, towns |
| `numbered` | Ordered itinerary steps |
| `emoji` | Restaurants 🍔, summits 🏔️, wildlife 🦌 |
| `circle` | Photo spots, minor waypoints |
| `label` | Region names, floating text — no pin |
| `polygon` | Park boundaries, neighborhoods |
| `circle_area` | Campsite, "stayed near here" with radius |
| `freeform` | Hikes, bike routes, ferries |

---

## Day 1 — Denver → Boulder → Estes Park

{% include trips/map-section.html id="day1" stops=page.day1_stops type="road" %}

Drive up US-36 from Denver to Boulder, grab lunch on Pearl Street, then follow Canyon Boulevard into the mountains. Estes Park is about 45 minutes from Boulder.

## Day 2 — Trail Ridge Road

{% include trips/map-section.html id="day2" stops=page.day2_stops type="road" %}

The road closes roughly October to late May. Check [nps.gov/romo](https://www.nps.gov/romo) before going.
