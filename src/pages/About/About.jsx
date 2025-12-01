import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./About.css";

// Fix Leaflet icon
const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function About() {
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowMap(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="about-container">
      {/* Title */}
      <h1 className="about-title">About Me</h1>

      {/* DESCRIPTION BOX */}
      <div className="about-card">
        <p>
          Halo! Saya <b>Dary Dimas Wijaya</b>, seorang pengembang web yang
          memiliki ketertarikan besar pada teknologi, pemrograman, dan
          geospasial. Saya menikmati proses membangun sesuatu dari nol, terutama
          ketika bisa menggabungkan kreativitas dengan logika. Minat saya
          meliputi:
        </p>

        <ul>
          <li>Frontend development (React, UI/UX, animasi)</li>
          <li>Geospatial mapping (Leaflet, GIS basics)</li>
          <li>Game mini berbasis browser</li>
          <li>Eksplorasi desain bertema neon & vaporwave</li>
        </ul>

        <p>
          Tujuan saya adalah terus berkembang sebagai developer, menciptakan
          pengalaman yang interaktif, estetik, dan tentunya bermanfaat.
        </p>
      </div>

      {/* MY LOCATION */}
      <h2 className="about-loc-title">My Location</h2>

      <div className={`about-map-wrapper ${showMap ? "fade-in" : ""}`}>
        <MapContainer
          center={[-7.508756, 109.922435]}
          zoom={12}
          scrollWheelZoom={true}
          className="about-map"
        >
          <TileLayer
            attribution="© OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={[-7.508756, 109.922435]} icon={defaultIcon}>
            <Popup>Lokasi saya</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default About;
