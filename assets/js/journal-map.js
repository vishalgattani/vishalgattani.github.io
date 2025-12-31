document.addEventListener("DOMContentLoaded", () => {
    // 1. Check if the map container exists
    if (!document.getElementById("map")) return;

    console.log("Map script loaded. Processing entries..."); // Debugging line

    // 2. Initialize map (Start centered on World)
    const map = L.map("map").setView([20, 0], 2);

    // 3. Add OpenStreetMap tiles
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // 4. Define "Base" class for custom icons
    // This inherits from L.Icon so we don't have to repeat size settings
    const CustomIcon = L.Icon.extend({
        options: {
            iconSize:     [32, 32], // Standard square size for Flaticon
            iconAnchor:   [16, 32], // Tip of the pin (Bottom Center)
            popupAnchor:  [0, -32]  // Where the popup opens relative to the pin
        }
    });

    // 5. Access Global Data
    const entries = window.journalEntries || [];
    const bounds = L.latLngBounds();
    let hasMarkers = false;

    // 6. Loop through entries
    entries.forEach(entry => {
        if (entry.lat && entry.lng) {

            // --- A. Handle Custom Icons ---
            let markerOptions = {};
            if (entry.icon) {
                // Creates a new icon instance using your CustomIcon class
                console.log(`Adding custom icon: ${entry.icon}`); // Debugging line
                markerOptions.icon = new CustomIcon({
                    iconUrl: `/assets/images/markers/${entry.icon}.png`
                });
            }

            // --- B. Handle Optional Fields (Date & Entry) ---
            // Fixes "undefined" error: Checks if data exists before creating HTML
            const dateHtml = entry.date ? `<p><strong>${entry.date}</strong></p>` : '';
            const entryHtml = entry.entry ? `<p>${entry.entry}</p>` : '';

            // --- C. Create Marker ---
            const marker = L.marker([entry.lat, entry.lng], markerOptions).addTo(map);

            // --- D. Bind Popup ---
            marker.bindPopup(`
                <div style="min-width: 200px">
                    <h3>${entry.title}</h3>
                    ${dateHtml}
                    ${entryHtml}
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

    // 7. Fit bounds
    if (hasMarkers) {
        map.fitBounds(bounds, { padding: [50, 50] });
    }
});