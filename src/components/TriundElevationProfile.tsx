
"use client";

import { useState } from "react";

const checkpoints = [
  {
    name: "Dharamkot",
    distance: 0,
    elevation: 2100,
    description: "Starting point of the Triund trek.",
  },
  {
    name: "Gallu Devi Temple",
    distance: 2,
    elevation: 2200,
    description: "Temple and trail access point along the initial climb.",
  },
  {
    name: "Magic View Café",
    distance: 5,
    elevation: 2450,
    description: "A popular resting point along the Triund trail.",
  },
  {
    name: "Triund",
    distance: 9,
    elevation: 2850,
    description: "The scenic ridge with panoramic Dhauladhar mountain views.",
  },
];

export default function TriundElevationProfile() {
  const [selected, setSelected] = useState(3);

  const point = checkpoints[selected];

  const chartWidth = 700;
  const chartHeight = 230;
  const left = 55;
  const right = 25;
  const top = 25;
  const bottom = 45;

  const minElevation = 2000;
  const maxElevation = 3000;

  const x = (distance: number) =>
    left + (distance / 9) * (chartWidth - left - right);

  const y = (elevation: number) =>
    top +
    ((maxElevation - elevation) / (maxElevation - minElevation)) *
      (chartHeight - top - bottom);

  const chartPoints = checkpoints.map((item) => ({
    x: x(item.distance),
    y: y(item.elevation),
  }));

  const smoothPath = chartPoints
    .map((point, index) => {
      if (index === 0) {
        return `M ${point.x} ${point.y}`;
      }

      const previous = chartPoints[index - 1];
      const middleX = (previous.x + point.x) / 2;

      return `C ${middleX} ${previous.y}, ${middleX} ${point.y}, ${point.x} ${point.y}`;
    })
    .join(" ");

  const areaPath = [
    smoothPath,
    `L ${chartPoints[chartPoints.length - 1].x} ${chartHeight - bottom}`,
    `L ${chartPoints[0].x} ${chartHeight - bottom}`,
    "Z",
  ].join(" ");

  return (
    <section className="my-10">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-wider text-forest">
          Understand the ascent
        </p>

        <h2 className="mt-2 font-display text-3xl text-forest">
          Triund Elevation Profile
        </h2>

        <p className="mt-2 text-gray-600">
          Explore the approximate elevation gain along the trek.
        </p>
      </div>

      <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-stone-50 p-4">
            <p className="text-xs text-gray-500">Starting elevation</p>
            <p className="mt-1 text-xl font-bold text-forest">2,100 m</p>
          </div>

          <div className="rounded-xl bg-stone-50 p-4">
            <p className="text-xs text-gray-500">Highest elevation</p>
            <p className="mt-1 text-xl font-bold text-forest">2,850 m</p>
          </div>

          <div className="col-span-2 rounded-xl bg-stone-50 p-4 sm:col-span-1">
            <p className="text-xs text-gray-500">Approx. one-way distance</p>
            <p className="mt-1 text-xl font-bold text-forest">9 km</p>
          </div>
        </div>

        <div className="mt-7 w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full min-w-[520px]"
            role="img"
            aria-label="Illustrative Triund trek elevation profile"
          >
            <defs>
              <linearGradient
                id="triundElevationGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#245b43" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#245b43" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {[2000, 2250, 2500, 2750, 3000].map((elevation) => (
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

            <path
              d={areaPath}
              fill="url(#triundElevationGradient)"
            />

            <path
              d={smoothPath}
              fill="none"
              stroke="#245b43"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset="1"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="1"
                to="0"
                dur="2s"
                fill="freeze"
              />
            </path>

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
                >
                  <animate
                    attributeName="r"
                    values="3;6;6"
                    dur="0.7s"
                    begin={`${0.4 + index * 0.35}s`}
                    fill="freeze"
                  />
                </circle>

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
              className={`rounded-xl border p-4 text-left transition-all duration-300 ${
                selected === index
                  ? "border-forest bg-forest/5 shadow-sm"
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
          Actual trail distances and elevations may vary.
        </p>
      </div>
    </section>
  );
}
