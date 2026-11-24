
"use client";

import { useState } from "react";

const checkpoints = [
  {
    name: "Lukla",
    distance: 0,
    elevation: 2860,
    description: "The starting point of the classic Everest Base Camp trek.",
  },
  {
    name: "Phakding",
    distance: 8,
    elevation: 2610,
    description: "A Sherpa settlement along the Dudh Koshi river.",
  },
  {
    name: "Namche Bazaar",
    distance: 14,
    elevation: 3440,
    description: "An important trading town and acclimatization stop.",
  },
  {
    name: "Tengboche",
    distance: 21,
    elevation: 3860,
    description: "Home to the famous Tengboche monastery.",
  },
  {
    name: "Dingboche",
    distance: 31,
    elevation: 4410,
    description: "A high-altitude village with acclimatization opportunities.",
  },
  {
    name: "Lobuche",
    distance: 43,
    elevation: 4910,
    description: "A settlement near the Khumbu Glacier.",
  },
  {
    name: "Gorak Shep",
    distance: 47,
    elevation: 5164,
    description: "The last major settlement before Everest Base Camp.",
  },
  {
    name: "Everest Base Camp",
    distance: 50,
    elevation: 5364,
    description: "The iconic base camp beneath Mount Everest.",
  },
];

export default function EverestBaseCampElevationProfile() {
  const [selected, setSelected] = useState(7);

  const point = checkpoints[selected];

  const chartWidth = 900;
  const chartHeight = 280;
  const left = 70;
  const right = 30;
  const top = 25;
  const bottom = 50;

  const minElevation = 2000;
  const maxElevation = 6000;

  const x = (distance: number) =>
    left + (distance / 50) * (chartWidth - left - right);

  const y = (elevation: number) =>
    top +
    ((maxElevation - elevation) / (maxElevation - minElevation)) *
      (chartHeight - top - bottom);

  const linePoints = checkpoints
    .map((item) => `${x(item.distance)},${y(item.elevation)}`)
    .join(" ");

  const areaPoints = [
    `${x(0)},${chartHeight - bottom}`,
    ...checkpoints.map(
      (item) => `${x(item.distance)},${y(item.elevation)}`
    ),
    `${x(50)},${chartHeight - bottom}`,
  ].join(" ");

  return (
    <section className="my-10">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-wider text-forest">
          Understand the ascent
        </p>

        <h2 className="mt-2 font-display text-3xl text-forest">
          Everest Base Camp Elevation Profile
        </h2>

        <p className="mt-2 text-gray-600">
          Explore the approximate altitude changes along the classic EBC route.
        </p>
      </div>

      <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-8">

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-stone-50 p-4">
            <p className="text-xs text-gray-500">Starting elevation</p>
            <p className="mt-1 text-xl font-bold text-forest">2,860 m</p>
          </div>

          <div className="rounded-xl bg-stone-50 p-4">
            <p className="text-xs text-gray-500">Highest elevation</p>
            <p className="mt-1 text-xl font-bold text-forest">5,364 m</p>
          </div>

          <div className="col-span-2 rounded-xl bg-stone-50 p-4 sm:col-span-1">
            <p className="text-xs text-gray-500">Illustrative route distance</p>
            <p className="mt-1 text-xl font-bold text-forest">50 km</p>
          </div>
        </div>

        <div className="mt-7 w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full min-w-[650px]"
            role="img"
            aria-label="Illustrative Everest Base Camp elevation profile"
          >
            {[2000, 3000, 4000, 5000, 6000].map((elevation) => (
              <g key={elevation}>
                <line
                  x1={left}
                  y1={y(elevation)}
                  x2={chartWidth - right}
                  y2={y(elevation)}
                  stroke="#e5e7eb"
                  strokeDasharray="4 5"
                />

                <text
                  x={left - 10}
                  y={y(elevation) + 4}
                  textAnchor="end"
                  fontSize="12"
                  fill="#6b7280"
                >
                  {elevation}m
                </text>
              </g>
            ))}

            <polygon
              points={areaPoints}
              fill="#245b43"
              opacity="0.12"
            />

            <polyline
              points={linePoints}
              fill="none"
              stroke="#245b43"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {checkpoints.map((item, index) => (
              <g
                key={item.name}
                onClick={() => setSelected(index)}
                style={{ cursor: "pointer" }}
              >
                <circle
                  cx={x(item.distance)}
                  cy={y(item.elevation)}
                  r={selected === index ? 9 : 6}
                  fill={selected === index ? "#d49b53" : "#245b43"}
                  stroke="white"
                  strokeWidth="3"
                />

                <text
                  x={x(item.distance)}
                  y={chartHeight - 17}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#4b5563"
                >
                  {item.distance} km
                </text>
              </g>
            ))}
          </svg>
        </div>

        <p className="mt-2 text-center text-xs text-gray-500">
          Select a checkpoint below to explore its elevation.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {checkpoints.map((item, index) => (
            <button
              type="button"
              key={item.name}
              onClick={() => setSelected(index)}
              className={`rounded-xl border p-4 text-left transition ${
                selected === index
                  ? "border-forest bg-forest/5"
                  : "border-stone-200 hover:border-forest/50"
              }`}
            >
              <span className="text-xs font-semibold text-forest">
                CHECKPOINT {index + 1}
              </span>

              <h3 className="mt-1 font-bold text-gray-900">
                {item.name}
              </h3>

              <p className="mt-1 text-sm text-gray-600">
                {item.elevation.toLocaleString("en-IN")} m · {item.distance} km
              </p>
            </button>
          ))}
        </div>

        <div className="mt-5 rounded-2xl bg-stone-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-forest">
            Selected checkpoint
          </p>

          <h3 className="mt-2 text-xl font-bold text-gray-900">
            {point.name}
          </h3>

          <p className="mt-2 text-sm text-gray-600">
            {point.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-8">
            <div>
              <p className="text-xs text-gray-500">Elevation</p>
              <p className="font-bold text-forest">
                {point.elevation.toLocaleString("en-IN")} m
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Distance</p>
              <p className="font-bold text-forest">
                {point.distance} km
              </p>
            </div>
          </div>
        </div>

        <p className="mt-5 text-xs leading-5 text-gray-500">
          Elevation and distance values are approximate illustrative
          references, not verified GPS or surveyed measurements.
          The route includes acclimatization days and additional
          excursions, which are not represented by this simplified
          elevation graph. Actual distances and elevations may vary.
        </p>
      </div>
    </section>
  );
}
