
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
    name: "Sankri",
    position: [31.0771, 78.1849] as [number, number],
    elevation: 1950,
    distance: 0,
    description: "Base village and starting point of the Kedarkantha trek.",
  },
  {
    name: "Juda Ka Talab",
    position: [31.0518, 78.1788] as [number, number],
    elevation: 2773,
    distance: 4,
    description: "A beautiful high-altitude lake surrounded by pine forests.",
  },
  {
    name: "Kedarkantha Base Camp",
    position: [31.0409, 78.1751] as [number, number],
    elevation: 3429,
    distance: 7,
    description: "High-altitude meadow below the Kedarkantha summit.",
  },
  {
    name: "Kedarkantha Summit",
    position: [31.0225, 78.1719] as [number, number],
    elevation: 3810,
    distance: 10,
    description: "The highest point of the trek with panoramic Himalayan views.",
  },
];

const routePositions = checkpoints.map((point) => point.position);

function FitRoute() {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(L.latLngBounds(routePositions), {
      padding: [40, 40],
    });
  }, [map]);

  return null;
}

function createNumberIcon(number: number) {
  return L.divIcon({
    className: "",
    html: `<div style="
      background:#245b43;
      color:white;
      width:34px;
      height:34px;
      border-radius:50%;
      display:flex;
      align-items:center;
      justify-content:center;
      font-weight:700;
      border:3px solid white;
      box-shadow:0 2px 8px rgba(0,0,0,0.3);
    ">${number}</div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });
}

export default function KedarkanthaMap() {
  return (
    <section className="my-10">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-wider text-forest">
          Explore the route
        </p>

        <h2 className="mt-2 font-display text-3xl text-forest">
          Kedarkantha Trek Map
        </h2>

        <p className="mt-2 text-gray-600">
          Explore the classic route from Sankri village to the summit.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200">
        <MapContainer
          center={[31.05, 78.18]}
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
                Elevation: {point.elevation.toLocaleString("en-IN")} m
                <br />
                Distance: {point.distance} km
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

                <p className="mt-2 text-sm font-medium text-forest">
                  {point.elevation.toLocaleString("en-IN")} m · {point.distance} km
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-7 text-sm leading-6 text-gray-600">
          Route coordinates, elevations and distances are approximate
          reference values. The connecting line is schematic, not a
          surveyed hiking trail or navigation guidance. Actual routes
          may vary by trekking operator and season. Follow a qualified
          local guide and current route information.
        </p>
      </div>
    </section>
  );
}
