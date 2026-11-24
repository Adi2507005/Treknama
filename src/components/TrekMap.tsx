
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
    name: "Jobra",
    position: [32.207, 77.282] as [number, number],
    description: "Common starting area for the Hampta Pass trek.",
  },
  {
    name: "Chika",
    position: [32.228, 77.307] as [number, number],
    description: "A popular early campsite along the route.",
  },
  {
    name: "Balu Ka Ghera",
    position: [32.290, 77.330] as [number, number],
    description: "High-altitude campsite before the pass.",
  },
  {
    name: "Hampta Pass",
    position: [32.315, 77.373] as [number, number],
    description: "The mountain pass connecting the Kullu and Lahaul valleys.",
  },
  {
    name: "Shea Goru",
    position: [32.326, 77.405] as [number, number],
    description: "A campsite on the Lahaul side of the pass.",
  },
  {
    name: "Chhatru",
    position: [32.325, 77.383] as [number, number],
    description: "The usual endpoint of the trekking route, from where trekkers continue towards Manali by road.",
  },
];

const routePositions = checkpoints.map(
  (checkpoint) => checkpoint.position
);

function createMarkerIcon(index: number) {
  return L.divIcon({
    className: "",
    html: `<div style="
      width:30px;
      height:30px;
      border-radius:50%;
      background:#245b43;
      color:white;
      border:2px solid white;
      display:flex;
      align-items:center;
      justify-content:center;
      font-weight:700;
      font-size:12px;
      box-shadow:0 2px 8px rgba(0,0,0,.3);
    ">${index + 1}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

function FitRoute() {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(routePositions, { padding: [35, 35] });
  }, [map]);

  return null;
}

export default function TrekMap() {

  return (
    <section className="mt-12 overflow-hidden rounded-3xl border border-forest/10 bg-white shadow-sm">
      <div className="p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Explore the route
        </p>

        <h2 className="mt-2 font-display text-3xl text-forest">
          Hampta Pass Trail Map
        </h2>

        <p className="mt-2 text-sm leading-6 text-muted">
          Explore all six important checkpoints along the Hampta Pass route.
          Select a marker to learn more about each location.
        </p>
      </div>

      <div className="relative h-[420px] w-full bg-cream">
        
          <MapContainer
            center={[32.29, 77.34]}
            zoom={12}
            scrollWheelZoom={true}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <FitRoute />

            <Polyline
              positions={routePositions}
              pathOptions={{
                color: "#245b43",
                weight: 5,
                opacity: 0.85,
              }}
            />

            {checkpoints.map((checkpoint, index) => (
              <Marker
                key={checkpoint.name}
                position={checkpoint.position}
                icon={createMarkerIcon(index)}
              >
                <Popup>
                  <strong>
                    {index + 1}. {checkpoint.name}
                  </strong>
                  <br />
                  {checkpoint.description}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        
      </div>

      <div className="p-6 sm:p-8">
        <h3 className="font-display text-xl text-forest">
          Route checkpoints
        </h3>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {checkpoints.map((checkpoint, index) => (
            <div
              key={checkpoint.name}
              className="flex items-start gap-3 rounded-xl border border-forest/10 p-4"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest text-sm font-bold text-white">
                {index + 1}
              </span>

              <div>
                <p className="font-semibold text-charcoal">
                  {checkpoint.name}
                </p>

                <p className="mt-1 text-xs leading-5 text-muted">
                  {checkpoint.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-5 text-xs leading-5 text-muted">
          Map checkpoints and connecting line are illustrative planning
          data, not a surveyed hiking track or navigation guidance.
          The Chhatru marker uses an approximate reference location.
          Verify the actual route with a qualified local guide before
          trekking.
        </p>
      </div>
    </section>
  );
}
