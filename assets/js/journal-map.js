document.addEventListener("DOMContentLoaded", () => {
    // 1. Check if the map container exists to avoid errors on other pages
    if (!document.getElementById("map")) return;

    // 2. Initialize map (Start centered on World)
    const map = L.map("map").setView([20, 0], 2);

    // 3. Add OpenStreetMap tiles
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // 4. Access the global variable we defined in the HTML
    const entries = window.journalEntries || [];
    const bounds = L.latLngBounds();
    let hasMarkers = false;

    // 5. Loop through entries and add markers
    entries.forEach(entry => {
        // Only map entries that have lat/lng defined
        if (entry.lat && entry.lng) {
            const marker = L.marker([entry.lat, entry.lng]).addTo(map);

            marker.bindPopup(`
                <div style="min-width: 200px">
                    <h3>${entry.title}</h3>
                    <p><strong>${entry.date}</strong></p>
                    <p>${entry.entry}</p>
                    <p>
                        <a href="${entry.maps_url}" target="_blank">
                            Open in Google Maps
                        </a>
                    </p>
                </div>
            `);

            bounds.extend([entry.lat, entry.lng]);
            hasMarkers = true;
        }
    });

    // 6. Fit map to bounds (Zoom in to show all markers)
    if (hasMarkers) {
        map.fitBounds(bounds, { padding: [50, 50] });
    }
});