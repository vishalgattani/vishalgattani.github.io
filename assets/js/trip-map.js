/* trip-map.js — renders a Leaflet map from a stops array + trip_type.
 *
 * Stop types:
 *   pin           — default dropped marker (default when type is omitted)
 *   circle        — flat filled dot, good for photo spots / waypoints
 *   numbered      — pin with a number badge (requires `number` field)
 *   emoji         — custom emoji icon (requires `icon` field, e.g. "🍔")
 *   polygon       — shaded area (requires `coords` array of [lat,lng] pairs)
 *   circle_area   — radius around a point (requires `radius` in metres)
 *   label         — permanent text label with no marker (requires `label`)
 *   freeform      — polyline drawn through `coords` array (hike, bike, ferry)
 *
 * Any stop with a `note` field gets a richer popup body.
 * Any stop with a `color` field overrides the default #007bff blue.
 */

window.TripMap = {

  render: function (mapId, stops, tripType, opts) {
    opts = opts || {};
    var interactive = opts.interactive !== false;
    var height = opts.height || '400px';

    var el = document.getElementById(mapId);
    if (!el) return;
    el.style.height = height;

    var mapOpts = interactive ? {} : {
      dragging: false, zoomControl: false, scrollWheelZoom: false,
      doubleClickZoom: false, keyboard: false, tap: false, attributionControl: false
    };
    var map = L.map(mapId, mapOpts);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: interactive
        ? '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        : '',
      maxZoom: 18
    }).addTo(map);

    if (!stops || stops.length === 0) return;

    var pinStops = stops.filter(function (s) {
      return !s.type || s.type === 'pin' || s.type === 'circle' ||
             s.type === 'numbered' || s.type === 'emoji' || s.type === 'label';
    });
    var latlngs = pinStops.map(function (s) { return [s.lat, s.lng]; });
    if (latlngs.length === 0) latlngs = [[stops[0].lat, stops[0].lng]];

    // --- draw each stop ---
    stops.forEach(function (s, i) {
      var color = s.color || '#007bff';
      var type = s.type || 'pin';
      var popup = TripMap._popupHtml(s);

      if (type === 'pin') {
        L.marker([s.lat, s.lng]).addTo(map).bindPopup(popup);

      } else if (type === 'circle') {
        L.circleMarker([s.lat, s.lng], {
          radius: 8, color: '#fff', fillColor: color, fillOpacity: 0.9, weight: 2
        }).addTo(map).bindPopup(popup);

      } else if (type === 'numbered') {
        var num = s.number || (i + 1);
        var icon = L.divIcon({
          className: '',
          html: '<div style="background:' + color + ';color:#fff;border-radius:50%;' +
                'width:28px;height:28px;line-height:28px;text-align:center;' +
                'font-weight:bold;font-size:13px;border:2px solid #fff;' +
                'box-shadow:0 1px 4px rgba(0,0,0,.4)">' + num + '</div>',
          iconSize: [28, 28], iconAnchor: [14, 14], popupAnchor: [0, -16]
        });
        L.marker([s.lat, s.lng], { icon: icon }).addTo(map).bindPopup(popup);

      } else if (type === 'emoji') {
        var icon = L.divIcon({
          className: '',
          html: '<div style="font-size:24px;line-height:1;filter:drop-shadow(0 1px 2px rgba(0,0,0,.5))">'
                + (s.icon || '📍') + '</div>',
          iconSize: [28, 28], iconAnchor: [14, 14], popupAnchor: [0, -16]
        });
        L.marker([s.lat, s.lng], { icon: icon }).addTo(map).bindPopup(popup);

      } else if (type === 'label') {
        var icon = L.divIcon({
          className: '',
          html: '<div style="background:rgba(255,255,255,0.85);border:1px solid #ccc;' +
                'border-radius:4px;padding:2px 6px;font-size:12px;white-space:nowrap;' +
                'box-shadow:0 1px 3px rgba(0,0,0,.2)">' + (s.label || '') + '</div>',
          iconAnchor: [0, 10], popupAnchor: [0, -10]
        });
        L.marker([s.lat, s.lng], { icon: icon }).addTo(map);

      } else if (type === 'polygon') {
        if (s.coords && s.coords.length) {
          L.polygon(s.coords, {
            color: color, fillColor: color, fillOpacity: 0.15, weight: 2
          }).addTo(map).bindPopup(popup);
        }

      } else if (type === 'circle_area') {
        L.circle([s.lat, s.lng], {
          radius: s.radius || 1000,
          color: color, fillColor: color, fillOpacity: 0.15, weight: 2
        }).addTo(map).bindPopup(popup);

      } else if (type === 'freeform') {
        if (s.coords && s.coords.length) {
          L.polyline(s.coords, {
            color: s.color || '#28a745', weight: 3, opacity: 0.85,
            dashArray: s.dashed ? '6 4' : null
          }).addTo(map).bindPopup(popup);
        }
      }
    });

    // --- draw route / fit bounds ---
    if (latlngs.length === 1) {
      map.setView(latlngs[0], 10);

    } else if (tripType === 'road') {
      map.fitBounds(L.latLngBounds(latlngs).pad(0.2));
      var coords = latlngs.map(function (ll) { return ll[1] + ',' + ll[0]; }).join(';');
      fetch('https://router.project-osrm.org/route/v1/driving/' + coords + '?overview=full&geometries=geojson')
        .then(function (r) { return r.json(); })
        .then(function (data) {
          var route = (data.routes && data.routes[0])
            ? data.routes[0].geometry.coordinates.map(function (c) { return [c[1], c[0]]; })
            : latlngs;
          L.polyline(route, { color: '#007bff', weight: 4, opacity: 0.85 }).addTo(map);
          map.fitBounds(L.latLngBounds(route).pad(0.1));
        })
        .catch(function () {
          L.polyline(latlngs, { color: '#007bff', weight: 4, opacity: 0.85 }).addTo(map);
        });

    } else if (tripType === 'flight') {
      var arc = TripMap._greatCircleArc(latlngs[0], latlngs[latlngs.length - 1]);
      L.polyline(arc, { color: '#007bff', weight: 3, opacity: 0.85, dashArray: '8 8' }).addTo(map);
      map.fitBounds(L.latLngBounds(latlngs).pad(0.3));

    } else {
      map.fitBounds(L.latLngBounds(latlngs).pad(0.2));
    }
  },

  _popupHtml: function (s) {
    var html = s.label ? '<strong>' + s.label + '</strong>' : '';
    if (s.note) html += (html ? '<br>' : '') + '<span style="font-size:0.9em">' + s.note + '</span>';
    return html || '&nbsp;';
  },

  _greatCircleArc: function (from, to) {
    var R2D = 180 / Math.PI, D2R = Math.PI / 180;
    var p1 = { lat: from[0] * D2R, lng: from[1] * D2R };
    var p2 = { lat: to[0] * D2R, lng: to[1] * D2R };
    var d = 2 * Math.asin(Math.sqrt(
      Math.pow(Math.sin((p2.lat - p1.lat) / 2), 2) +
      Math.cos(p1.lat) * Math.cos(p2.lat) * Math.pow(Math.sin((p2.lng - p1.lng) / 2), 2)
    ));
    var pts = [];
    for (var i = 0; i <= 80; i++) {
      var f = i / 80;
      if (d === 0) { pts.push(from); continue; }
      var A = Math.sin((1 - f) * d) / Math.sin(d), B = Math.sin(f * d) / Math.sin(d);
      var x = A * Math.cos(p1.lat) * Math.cos(p1.lng) + B * Math.cos(p2.lat) * Math.cos(p2.lng);
      var y = A * Math.cos(p1.lat) * Math.sin(p1.lng) + B * Math.cos(p2.lat) * Math.sin(p2.lng);
      var z = A * Math.sin(p1.lat) + B * Math.sin(p2.lat);
      pts.push([Math.atan2(z, Math.sqrt(x * x + y * y)) * R2D, Math.atan2(y, x) * R2D]);
    }
    return pts;
  }
};
