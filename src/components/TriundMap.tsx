
"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


 
const checkpoints = [
    {
      name: "Dharamkot",
      position: [32.248883, 76.325431] as [number, number],
      description: "Starting area for the Triund trek",
    },
    {
      name: "Gallu Devi Temple",
      position: [32.2549, 76.3262] as [number, number],
      description: "Temple and trail access point",
    },
    {
      name: "Magic View Café",
      position: [32.2595, 76.3425] as [number, number],
      description: "Popular resting point along the Triund trail",
    },
    {
      name: "Triund Campsite",
      position: [32.26169, 76.35437] as [number, number],
      description: "The scenic Triund ridge and campsite",
    },
  ];
  

const routePositions = checkpoints.map((point) => point.position);

function FitRoute() {
  const map = useMap();

  useEffect(() => {
    const bounds = L.latLngBounds(routePositions);
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [map]);

  return null;
}

function createNumberIcon(number: number) {
  return L.divIcon({
    className: "",
    html: `<div style="
      background:#245b43;
      color:white;
      width:32px;
      height:32px;
      border-radius:50%;
      display:flex;
      align-items:center;
      justify-content:center;
      font-weight:700;
      border:3px solid white;
      box-shadow:0 2px 8px rgba(0,0,0,0.3);
    ">${number}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
}

export default function TriundMap() {
  return (
    <section className="my-10">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-wider text-forest">
          Explore the route
        </p>
        <h2 className="mt-2 text-3xl font-bold text-forest">
          Triund Trek Map
        </h2>
        <p className="mt-2 text-gray-600">
          Explore the route from Dharamkot towards the Triund ridge.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200">
        <MapContainer
          center={[32.255, 76.34]}
          zoom={13}
          scrollWheelZoom={true}
  doubleClickZoom={true}
  keyboard={true}
          className="h-[420px] w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <FitRoute />

          <Polyline
            positions={routePositions}
            pathOptions={{
              color: "#245b43",
              weight: 5,
              opacity: 0.85,
              dashArray: "8 8",
            }}
          />

          {checkpoints.map((point, index) => (
            <Marker
              key={point.name}
              position={point.position}
              icon={createNumberIcon(index + 1)}
            >
              <Popup>
                <strong>{point.name}</strong>
                <br />
                {point.description}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="mt-6 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
  <h2 className="mb-7 font-display text-2xl text-forest">
    Route checkpoints
  </h2>

  <div className="grid gap-4 sm:grid-cols-2">
    {checkpoints.map((point, index) => (
      <div
        key={point.name}
        className="flex min-h-[100px] items-start gap-4 rounded-2xl border border-stone-200 p-5"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest text-lg font-bold text-white">
          {index + 1}
        </span>

        <div>
          <h3 className="font-bold text-gray-900">
            {point.name}
          </h3>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            {point.description}
          </p>
        </div>
      </div>
    ))}
  </div>

  <p className="mt-7 text-sm leading-6 text-gray-600">
    Map checkpoints and connecting line are illustrative planning
    data, not a surveyed hiking track or navigation guidance.
    Coordinates are approximate reference points. Verify the
    actual route with a qualified local guide before trekking.
  </p>
</div>

    </section>
  );
}
