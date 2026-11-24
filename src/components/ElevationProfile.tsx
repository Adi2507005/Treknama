
"use client";

import { useState } from "react";

const checkpoints = [
  { name: "Jobra", altitude: 2780, distance: 0, description: "Trek starting point" },
  { name: "Chika", altitude: 3050, distance: 4.5, description: "Early campsite" },
  { name: "Balu Ka Ghera", altitude: 3600, distance: 10.5, description: "High-altitude campsite" },
  { name: "Hampta Pass", altitude: 4270, distance: 15.5, description: "Highest point of the trek" },
  { name: "Shea Goru", altitude: 3750, distance: 20.5, description: "Campsite on the Lahaul side" },
  { name: "Chhatru", altitude: 3320, distance: 26, description: "Usual trekking endpoint" },
];

const chart = {
  left: 75,
  right: 850,
  top: 35,
  bottom: 245,
};

function getX(distance: number) {
  return chart.left + (distance / 26) * (chart.right - chart.left);
}

function getY(altitude: number) {
  return chart.bottom - ((altitude - 2700) / 1800) * (chart.bottom - chart.top);
}

const points = checkpoints.map((checkpoint) => ({
  ...checkpoint,
  x: getX(checkpoint.distance),
  y: getY(checkpoint.altitude),
}));

const linePath = points
  .map((point, index) =>
    `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`
  )
  .join(" ");

const areaPath =
  `${linePath} L ${chart.right} ${chart.bottom} L ${chart.left} ${chart.bottom} Z`;

const altitudeTicks = [2750, 3000, 3250, 3500, 3750, 4000, 4250, 4500];
const distanceTicks = [0, 4.5, 10.5, 15.5, 20.5, 26];

export default function ElevationProfile() {
  const [selectedIndex, setSelectedIndex] = useState(3);

  const selected = checkpoints[selectedIndex];

  return (
    <section className="mt-10 rounded-3xl border border-forest/10 bg-white p-5 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Understand the climb
          </p>
          <h2 className="mt-2 font-display text-3xl text-forest">
            Elevation Profile
          </h2>
          <p className="mt-2 text-sm text-muted">
            Explore approximate altitude changes along the Hampta Pass trek.
          </p>
        </div>

        <span className="rounded-full bg-forest/10 px-3 py-1.5 text-xs font-semibold text-forest">
          Hampta Pass Trek
        </span>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-xl bg-cream p-4">
          <p className="text-xs text-muted">Starting altitude</p>
          <p className="mt-1 text-xl font-bold text-forest">2,780 m</p>
        </div>
        <div className="rounded-xl bg-cream p-4">
          <p className="text-xs text-muted">Highest point</p>
          <p className="mt-1 text-xl font-bold text-forest">4,270 m</p>
        </div>
        <div className="rounded-xl bg-cream p-4">
          <p className="text-xs text-muted">Approx. elevation gain</p>
          <p className="mt-1 text-xl font-bold text-forest">1,490 m</p>
        </div>
        <div className="rounded-xl bg-cream p-4">
          <p className="text-xs text-muted">Approx. distance</p>
          <p className="mt-1 text-xl font-bold text-forest">26 km</p>
        </div>
      </div>

      <div className="mt-8 overflow-x-auto">
        <svg
          viewBox="0 0 900 310"
          role="img"
          aria-label="Illustrative elevation profile showing six Hampta Pass trek checkpoints"
          className="w-full min-w-[620px]"
        >
          <defs>
            <linearGradient id="elevation-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b8b61" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3b8b61" stopOpacity="0.04" />
            </linearGradient>
          </defs>

          {altitudeTicks.map((altitude) => {
            const y = getY(altitude);

            return (
              <g key={altitude}>
                <line
                  x1={chart.left}
                  y1={y}
                  x2={chart.right}
                  y2={y}
                  stroke="#dfe5dc"
                  strokeDasharray="4 5"
                />
                <text
                  x={chart.left - 12}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="11"
                  fill="#64756a"
                >
                  {altitude.toLocaleString("en-IN")} m
                </text>
              </g>
            );
          })}

          <path d={areaPath} fill="url(#elevation-fill)" />

          <path
            d={linePath}
            fill="none"
            stroke="#176044"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {points.map((point, index) => (
            <g
              key={point.name}
              onClick={() => setSelectedIndex(index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelectedIndex(index);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`${point.name}, ${point.altitude} metres`}
              className="cursor-pointer"
            >
              <line
                x1={point.x}
                y1={point.y}
                x2={point.x}
                y2={chart.bottom}
                stroke="#b7c7ba"
                strokeDasharray="3 5"
              />
              <circle
                cx={point.x}
                cy={point.y}
                r={selectedIndex === index ? 9 : 6}
                fill={selectedIndex === index ? "#c28c50" : "#176044"}
                stroke="white"
                strokeWidth="3"
              />
              <text
                x={point.x}
                y={chart.bottom + 22}
                textAnchor="middle"
                fontSize="11"
                fill="#46564c"
              >
                {point.distance} km
              </text>
            </g>
          ))}

          <text
            x="460"
            y="300"
            textAnchor="middle"
            fontSize="12"
            fill="#46564c"
          >
            Distance along trek (km)
          </text>

          <text
            transform="translate(17 145) rotate(-90)"
            textAnchor="middle"
            fontSize="12"
            fill="#46564c"
          >
            Altitude (metres)
          </text>
        </svg>
      </div>

      <div className="mt-5 rounded-2xl bg-cream p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-gold">
          Selected checkpoint
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl text-forest">
              {selected.name}
            </h3>
            <p className="mt-1 text-sm text-muted">
              {selected.description}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-forest">
              {selected.altitude.toLocaleString("en-IN")} m
            </p>
            <p className="text-xs text-muted">
              {selected.distance} km from starting point
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-3 text-sm font-semibold text-charcoal">
          Explore checkpoints
        </p>
        <div className="flex flex-wrap gap-2">
          {checkpoints.map((checkpoint, index) => (
            <button
              key={checkpoint.name}
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-pressed={selectedIndex === index}
              className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${
                selectedIndex === index
                  ? "border-forest bg-forest text-white"
                  : "border-forest/20 text-forest hover:bg-forest/5"
              }`}
            >
              {checkpoint.name}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 rounded-xl border border-forest/10 bg-forest/5 p-4 text-xs leading-5 text-muted">
        Note: All altitude, distance and elevation figures in this demonstration
        are approximate illustrative planning values, not verified GPS
        measurements or a surveyed trail profile. Confirm actual route
        conditions and elevations with a qualified local trek operator.
      </p>
    </section>
  );
}
