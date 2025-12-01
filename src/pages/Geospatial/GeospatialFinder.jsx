import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import SearchBox from "./SearchBox";
import "./Geospatial.css";

// FIX ikon Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// COMPONENT untuk melakukan smooth zoom
function FlyToLocation({ location }) {
  const map = useMap();

  if (location) {
    map.flyTo([location.lat, location.lon], 15, {
      duration: 2, // durasi animasi
      easeLinearity: 0.25,
    });
  }

  return null;
}

function GeospatialFinder() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div className="geo-container">
      <h1 className="geo-title">Geospatial Finder</h1>

      <SearchBox onSelect={setSelectedLocation} />

      <div className="geo-map-wrapper">
        <MapContainer
          center={[-6.2, 106.816666]}
          zoom={12}
          scrollWheelZoom={true}
          className="geo-map"
        >
          <TileLayer
            attribution="© OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* otomatis zoom ketika lokasi dipilih */}
          <FlyToLocation location={selectedLocation} />

          {selectedLocation && (
            <Marker position={[selectedLocation.lat, selectedLocation.lon]}>
              <Popup>
                <b>{selectedLocation.display_name}</b> <br />
                Lat: {selectedLocation.lat} <br />
                Lon: {selectedLocation.lon}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      {selectedLocation && (
        <div className="geo-coordinates">
          <h3>📍 Hasil Koordinat</h3>
          <p>
            <b>Nama Lokasi:</b> {selectedLocation.display_name}
          </p>
          <p>
            <b>Latitude:</b> {selectedLocation.lat}
          </p>
          <p>
            <b>Longitude:</b> {selectedLocation.lon}
          </p>
        </div>
      )}
    </div>
  );
}

export default GeospatialFinder;
