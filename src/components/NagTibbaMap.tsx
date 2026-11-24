
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
    name: "Pantwari Village",
    position: [30.6255, 78.1035] as [number, number],
    elevation: 1350,
    distance: 0,
    description: "The starting village and trailhead for the Nag Tibba trek.",
  },
  {
    name: "Goat Village",
    position: [30.6320, 78.1110] as [number, number],
    elevation: 1800,
    distance: 2,
    description: "A mountain settlement along the initial forest trail.",
  },
  {
    name: "Nag Tibba Base Camp",
    position: [30.6470, 78.1160] as [number, number],
    elevation: 2600,
    distance: 5,
    description: "The campsite below the Nag Tibba summit.",
  },
  {
    name: "Nag Tibba Summit",
    position: [30.6570, 78.1210] as [number, number],
    elevation: 3022,
    distance: 7,
    description: "The summit ridge offering views of the Himalayan ranges.",
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

export default function NagTibbaMap() {
  return (
    <section className="my-10">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-wider text-forest">
          Explore the route
        </p>

        <h2 className="mt-2 font-display text-3xl text-forest">
          Nag Tibba Trek Map
        </h2>

        <p className="mt-2 text-gray-600">
          Explore the classic route from Pantwari village to Nag Tibba summit.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200">
        <MapContainer
          center={[30.642, 78.113]}
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
          Coordinates, elevations and distances are approximate
          illustrative reference values. The connecting line is
          schematic, not a surveyed hiking trail or navigation
          guidance. Verify the actual route with a qualified local guide.
        </p>
      </div>
    </section>
  );
}
