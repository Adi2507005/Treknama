
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
    name: "Lukla",
    position: [27.6878, 86.7314] as [number, number],
    elevation: 2860,
    distance: 0,
    description: "The starting point of the classic Everest Base Camp trek.",
  },
  {
    name: "Phakding",
    position: [27.7615, 86.7130] as [number, number],
    elevation: 2610,
    distance: 8,
    description: "A Sherpa settlement along the Dudh Koshi river.",
  },
  {
    name: "Namche Bazaar",
    position: [27.8069, 86.7140] as [number, number],
    elevation: 3440,
    distance: 14,
    description: "The main Sherpa trading town and an important acclimatization stop.",
  },
  {
    name: "Tengboche",
    position: [27.8360, 86.7630] as [number, number],
    elevation: 3860,
    distance: 21,
    description: "Home to the famous Tengboche monastery and mountain views.",
  },
  {
    name: "Dingboche",
    position: [27.8910, 86.8320] as [number, number],
    elevation: 4410,
    distance: 31,
    description: "A high-altitude village used for acclimatization.",
  },
  {
    name: "Lobuche",
    position: [27.9570, 86.8100] as [number, number],
    elevation: 4910,
    distance: 43,
    description: "A settlement near the Khumbu Glacier.",
  },
  {
    name: "Gorak Shep",
    position: [27.9820, 86.8280] as [number, number],
    elevation: 5164,
    distance: 47,
    description: "The last major settlement before Everest Base Camp.",
  },
  {
    name: "Everest Base Camp",
    position: [28.0026, 86.8528] as [number, number],
    elevation: 5364,
    distance: 50,
    description: "The iconic base camp beneath Mount Everest.",
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

export default function EverestBaseCampMap() {
  return (
    <section className="my-10">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-wider text-forest">
          Explore the route
        </p>

        <h2 className="mt-2 font-display text-3xl text-forest">
          Everest Base Camp Trek Map
        </h2>

        <p className="mt-2 text-gray-600">
          Explore the classic route from Lukla to Everest Base Camp.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200">
        <MapContainer
          center={[27.84, 86.78]}
          zoom={11}
          scrollWheelZoom={true}
          doubleClickZoom={true}
          keyboard={true}
          className="h-[460px] w-full"
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
              className="flex min-h-[110px] items-start gap-4 rounded-2xl border border-stone-200 p-5"
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
          reference values. The connecting line is schematic and
          is not a surveyed hiking trail or navigation route.
          Actual trekking distances depend on the route taken.
          Follow qualified local guides and current trail information.
        </p>
      </div>
    </section>
  );
}
