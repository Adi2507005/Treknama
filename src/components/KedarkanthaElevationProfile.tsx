
"use client";

import { useState } from "react";

const checkpoints = [
  {
    name: "Sankri",
    distance: 0,
    elevation: 1950,
    description: "The base village and starting point of the Kedarkantha trek.",
  },
  {
    name: "Juda Ka Talab",
    distance: 4,
    elevation: 2773,
    description: "A scenic high-altitude lake surrounded by pine forests.",
  },
  {
    name: "Kedarkantha Base Camp",
    distance: 7,
    elevation: 3429,
    description: "The campsite below the summit, surrounded by mountain views.",
  },
  {
    name: "Kedarkantha Summit",
    distance: 10,
    elevation: 3810,
    description: "The summit offers panoramic views of the Himalayan ranges.",
  },
];

export default function KedarkanthaElevationProfile() {
  const [selected, setSelected] = useState(3);

  const point = checkpoints[selected];

  const chartWidth = 700;
  const chartHeight = 230;
  const left = 65;
  const right = 25;
  const top = 25;
  const bottom = 45;

  const minElevation = 1500;
  const maxElevation = 4000;

  const x = (distance: number) =>
    left + (distance / 10) * (chartWidth - left - right);

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
    `${x(10)},${chartHeight - bottom}`,
  ].join(" ");

  return (
    <section className="my-10">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-wider text-forest">
          Understand the ascent
        </p>

        <h2 className="mt-2 font-display text-3xl text-forest">
          Kedarkantha Elevation Profile
        </h2>

        <p className="mt-2 text-gray-600">
          Explore the approximate elevation gain from Sankri to the summit.
        </p>
      </div>

      <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-stone-50 p-4">
            <p className="text-xs text-gray-500">Starting elevation</p>
            <p className="mt-1 text-xl font-bold text-forest">1,950 m</p>
          </div>

          <div className="rounded-xl bg-stone-50 p-4">
            <p className="text-xs text-gray-500">Highest elevation</p>
            <p className="mt-1 text-xl font-bold text-forest">3,810 m</p>
          </div>

          <div className="col-span-2 rounded-xl bg-stone-50 p-4 sm:col-span-1">
            <p className="text-xs text-gray-500">Illustrative one-way distance</p>
            <p className="mt-1 text-xl font-bold text-forest">10 km</p>
          </div>
        </div>

        <div className="mt-7 w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full min-w-[520px]"
            role="img"
            aria-label="Illustrative Kedarkantha trek elevation profile"
          >
            {[1500, 2000, 2500, 3000, 3500, 4000].map((elevation) => (
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
                  fontSize="11"
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
                  y={chartHeight - 15}
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
          Actual route distances and elevations may vary.
        </p>
      </div>
    </section>
  );
}
