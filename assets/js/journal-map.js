document.addEventListener("DOMContentLoaded", async () => {
    // 1. Initialize map
    const map = L.map("map").setView([20, 0], 2);

    // 2. Add OpenStreetMap tiles
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // 3. Create a LatLngBounds object to track all markers
    const bounds = L.latLngBounds();

    // 4. Add markers from journal entries
    for (const entry of journalEntries) {
      if (!entry.location) continue;

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(entry.location)}`
        );
        const results = await response.json();
        if (!results.length) continue;

        const lat = parseFloat(results[0].lat);
        const lon = parseFloat(results[0].lon);

        const marker = L.marker([lat, lon]).addTo(map);

        marker.bindPopup(`
          <h3>${entry.title}</h3>
          <p><strong>${entry.date}</strong></p>
          <p>${entry.entry}</p>
          <p>
            <a href="${entry.maps_url}" target="_blank">
              Open in Google Maps
            </a>
          </p>
        `);

        // 5. Extend bounds to include this marker
        bounds.extend([lat, lon]);

      } catch (e) {
        console.warn("Failed to geocode:", entry.location);
      }
    }

    // 6. Fit map to bounds of all markers
    if (!bounds.isEmpty()) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  });
