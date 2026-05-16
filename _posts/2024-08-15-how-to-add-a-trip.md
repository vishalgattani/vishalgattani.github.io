---
title: How to Add a Trip
tags: [Site, Documentation, Maps]
style: fill
color: secondary
description: A complete reference for writing trip markdown files — frontmatter fields, all marker types, section maps, and naming conventions.
---

Every trip lives as a single markdown file in `_trips/`. The filename becomes the URL: `_trips/2024-09-my-road-trip.md` → `/trips/2024-09-my-road-trip`.

---

## File naming

```
_trips/YYYY-MM-description.md
```

Examples:
```
_trips/2024-07-colorado.md
_trips/2024-09-college-park-to-waitsfield.md
_trips/2025-03-tokyo.md
```

---

## Frontmatter — top-level fields

```yaml
---
title: "College Park, MD → Waitsfield, VT"
date: 2024-09-14
trip_type: road          # road | flight | place
description: "One-liner shown on the card."
tags: [Road Trip, East Coast, Fall Foliage]
---
```

| Field | Required | Values |
|-------|----------|--------|
| `title` | yes | Free text. Use `→` for A-to-B trips. |
| `date` | yes | `YYYY-MM-DD` |
| `trip_type` | yes | `road` · `flight` · `place` |
| `description` | recommended | Shown on the card and in SEO tags |
| `tags` | optional | Array of strings |

---

## The `stops` array — overview map

`stops` drives the **top-of-page map**. For `road` trips it also provides the waypoints for the OSRM route line.

```yaml
stops:
  - label: "College Park, MD"
    lat: 38.9807
    lng: -76.9369

  - label: "Waitsfield, VT"
    lat: 44.1906
    lng: -72.8317
```

Every stop has `lat`, `lng`, and an optional `type`. When `type` is omitted it defaults to `pin`.

### Stop types

#### `pin` — dropped marker (default)

```yaml
- label: "Denver, CO"
  lat: 39.7392
  lng: -104.9903
```

#### `numbered` — pin with a number badge

```yaml
- label: "Boulder"
  lat: 40.0150
  lng: -105.2705
  type: numbered
  number: 1
  note: "Lunch on Pearl Street"
```

#### `emoji` — any emoji as the icon

```yaml
- label: "Estes Park"
  lat: 40.3775
  lng: -105.5224
  type: emoji
  icon: "🦌"
  note: "Elk everywhere"
```

#### `circle` — flat filled dot

Good for photo spots and minor waypoints that don't need a full pin.

```yaml
- label: "Bear Lake Trailhead"
  lat: 40.3120
  lng: -105.6456
  type: circle
  color: "#28a745"
  note: "Arrive before 7am"
```

#### `label` — floating text, no pin

Use for region names or area annotations.

```yaml
- label: "Rocky Mountain National Park"
  lat: 40.4000
  lng: -105.6800
  type: label
```

#### `polygon` — shaded region

```yaml
- label: "RMNP Boundary"
  lat: 40.35
  lng: -105.65
  type: polygon
  color: "#6f42c1"
  coords:
    - [40.27, -105.75]
    - [40.27, -105.55]
    - [40.50, -105.55]
    - [40.50, -105.75]
```

`lat`/`lng` on a polygon stop are ignored for routing — they're only used to set the popup anchor if you click the shape.

#### `circle_area` — radius bubble

```yaml
- label: "Moraine Park Campground"
  lat: 40.3760
  lng: -105.6200
  type: circle_area
  radius: 500            # metres
  color: "#fd7e14"
  note: "Site 14B"
```

#### `freeform` — arbitrary polyline

For hikes, bike routes, ferries, ski runs — anything that isn't a road route.

```yaml
- label: "Emerald Lake Trail"
  lat: 40.3120
  lng: -105.6456
  type: freeform
  color: "#dc3545"
  dashed: false          # true for dotted line
  coords:
    - [40.3120, -105.6456]
    - [40.3082, -105.6521]
    - [40.3055, -105.6592]
```

### Shared optional fields

Any stop type accepts:

| Field | Effect |
|-------|--------|
| `note` | Second line of text in the popup when the marker is clicked |
| `color` | Hex color — overrides the default blue `#007bff` |

---

## Section maps inside the markdown body

The top-of-page `stops` map is the **overview**. To show a focused map for a specific day or leg, define a named stops array in frontmatter and drop an include in the body.

### Naming convention

Name the array `<anything>_stops`. Common patterns:

```yaml
day1_stops: [...]
day2_stops: [...]
morning_stops: [...]
hike_stops: [...]
flight_stops: [...]
```

There is no special meaning to `day1` vs `day2` — the names are just HTML element IDs. The only rules are: **end in `_stops`** (by convention) and **be unique within the file**.

### Frontmatter

```yaml
day1_stops:
  - label: "Denver"
    lat: 39.7392
    lng: -104.9903
    type: numbered
    number: 1
  - label: "Boulder"
    lat: 40.0150
    lng: -105.2705
    type: numbered
    number: 2

day2_stops:
  - label: "Trail Ridge Road"
    lat: 40.3960
    lng: -105.6070
    type: emoji
    icon: "🏔️"
  - label: "Milner Pass"
    lat: 40.4203
    lng: -105.8125
    type: numbered
    number: 2
```

### Include in markdown body

```liquid
{% raw %}{% include trips/map-section.html id="day1" stops=page.day1_stops type="road" %}{% endraw %}
```

| Parameter | Required | Notes |
|-----------|----------|-------|
| `id` | yes | Must match the prefix of your `_stops` key — used as the HTML element ID. Must be unique on the page. |
| `stops` | yes | `page.<name>_stops` |
| `type` | optional | `road` (default) · `flight` · `place` |

---

## Full minimal example

```yaml
---
title: "San Francisco → Portland"
date: 2025-03-15
trip_type: road
description: "PCH the whole way up."
tags: [Road Trip, West Coast]

stops:
  - label: "San Francisco, CA"
    lat: 37.7749
    lng: -122.4194
  - label: "Portland, OR"
    lat: 45.5051
    lng: -122.6750

day1_stops:
  - { label: "San Francisco", lat: 37.7749, lng: -122.4194, type: numbered, number: 1 }
  - { label: "Santa Cruz", lat: 36.9741, lng: -122.0308, type: emoji, icon: "🏄" }
  - { label: "Monterey", lat: 36.6002, lng: -121.8947, type: numbered, number: 3 }
---

## Day 1 — SF to Monterey

{% raw %}{% include trips/map-section.html id="day1" stops=page.day1_stops type="road" %}{% endraw %}

Took PCH the whole way. 17-Mile Drive is worth the $12 toll.
```

---

## Live demo

The trip [Colorado Rockies — Map Features Demo](/trips/2024-08-rockies-demo) exercises every marker type and section map in one file. Read the source at [`_trips/2024-08-rockies-demo.md`](https://github.com/vishalgattani/vishalgattani.github.io/blob/feat/site-improvements/_trips/2024-08-rockies-demo.md).
