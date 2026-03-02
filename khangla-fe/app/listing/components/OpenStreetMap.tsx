"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons path for Leaflet in Next.js
// (Leaflet expects images from a CDN; we replace with data URLs or keep defaults)
// If markers don't show, you can provide custom icons here.
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon as any;

interface Props {
  position: [number, number];
  address?: string;
  height?: number;
  zoom?: number;
}

export default function OpenStreetMap({ position, address, height = 250, zoom = 15 }: Props) {
  // Ensure Leaflet styles are applied on client
  useEffect(() => {
    // no-op; just to confirm client side
  }, []);

  return (
    <div className="w-full" style={{ height }}>
      <MapContainer center={position} zoom={zoom} scrollWheelZoom={false} style={{ height: "100%", width: "100%", borderRadius: 12 }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          {address && <Popup>{address}</Popup>}
        </Marker>
      </MapContainer>
    </div>
  );
}
