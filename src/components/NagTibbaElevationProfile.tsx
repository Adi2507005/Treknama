
"use client";

import { useState } from "react";

const checkpoints = [
  {
    name: "Pantwari Village",
    distance: 0,
    elevation: 1350,
    description: "The starting village and trailhead for the Nag Tibba trek.",
  },
  {
    name: "Goat Village",
    distance: 2,
    elevation: 1800,
    description: "A mountain settlement along the forest trail.",
  },
  {
    name: "Nag Tibba Base Camp",
    distance: 5,
    elevation: 2600,
    description: "A forest clearing below the Nag Tibba summit.",
  },
  {
    name: "Nag Tibba Summit",
    distance: 7,
    elevation: 3022,
    description: "The summit ridge offering panoramic Himalayan views.",
  },
];

export default function NagTibbaElevationProfile() {
  const [selected, setSelected] = useState(3);

  const point = checkpoints[selected];

  const chartWidth = 700;
  const chartHeight = 250;
  const left = 65;
  const right = 25;
  const top = 30;
  const bottom = 48;

  const minElevation = 1000;
  const maxElevation = 3500;

  const x = (distance: number) =>
    left + (distance / 7) * (chartWidth - left - right);

  const y = (elevation: number) =>
    top +
    ((maxElevation - elevation) / (maxElevation - minElevation)) *
      (chartHeight - top - bottom);

  const chartPoints = checkpoints.map((item) => ({
    x: x(item.distance),
    y: y(item.elevation),
  }));

  const forestPath = chartPoints
    .map((p, index) => {
      if (index === 0) {
        return `M ${p.x} ${p.y}`;
      }

      const previous = chartPoints[index - 1];
      const middleX = (previous.x + p.x) / 2;

      return `C ${middleX} ${previous.y}, ${middleX} ${p.y}, ${p.x} ${p.y}`;
    })
    .join(" ");

  const forestArea = [
    forestPath,
    `L ${chartPoints[3].x} ${chartHeight - bottom}`,
    `L ${chartPoints[0].x} ${chartHeight - bottom}`,
    "Z",
  ].join(" ");

  return (
    <section className="my-10">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-wider text-forest">
          Through the forest to the summit
        </p>

        <h2 className="mt-2 font-display text-3xl text-forest">
          Nag Tibba Forest Trail Profile
        </h2>

        <p className="mt-2 text-gray-600">
          Follow the gradual forest ascent towards the Nag Tibba summit.
        </p>
      </div>

      <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-stone-50 p-4">
            <p className="text-xs text-gray-500">Starting elevation</p>
            <p className="mt-1 text-xl font-bold text-forest">1,350 m</p>
          </div>

          <div className="rounded-xl bg-stone-50 p-4">
            <p className="text-xs text-gray-500">Summit elevation</p>
            <p className="mt-1 text-xl font-bold text-forest">3,022 m</p>
          </div>

          <div className="col-span-2 rounded-xl bg-stone-50 p-4 sm:col-span-1">
            <p className="text-xs text-gray-500">Illustrative one-way distance</p>
            <p className="mt-1 text-xl font-bold text-forest">7 km</p>
          </div>
        </div>

        <div className="mt-7 overflow-x-auto">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full min-w-[520px]"
            role="img"
            aria-label="Illustrative Nag Tibba forest trail elevation profile"
          >
            <defs>
              <linearGradient
                id="nagTibbaForestGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#245b43" stopOpacity="0.28" />
                <stop offset="55%" stopColor="#638b62" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#245b43" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {[1000, 1500, 2000, 2500, 3000, 3500].map((elevation) => (
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
              d={forestArea}
              fill="url(#nagTibbaForestGradient)"
            />

            <path
              d={forestPath}
              fill="none"
              stroke="#527b50"
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
                dur="2.6s"
                fill="freeze"
              />
            </path>

            {chartPoints.map((p, index) => (
              <g
                key={checkpoints[index].name}
                onClick={() => setSelected(index)}
                style={{ cursor: "pointer" }}
              >
                <line
                  x1={p.x}
                  y1={p.y + 10}
                  x2={p.x}
                  y2={chartHeight - bottom}
                  stroke="#527b50"
                  strokeOpacity="0.35"
                  strokeDasharray="3 5"
                />

                <circle
                  cx={p.x}
                  cy={p.y}
                  r={selected === index ? 10 : 6}
                  fill={selected === index ? "#d49b53" : "#527b50"}
                  stroke="white"
                  strokeWidth="3"
                >
                  <animate
                    attributeName="r"
                    values="3;7;6"
                    dur="0.8s"
                    begin={`${0.4 + index * 0.45}s`}
                    fill="freeze"
                  />
                </circle>

                <text
                  x={p.x}
                  y={chartHeight - 15}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#4b5563"
                >
                  {checkpoints[index].distance} km
                </text>
              </g>
            ))}

            <text
              x={chartPoints[3].x - 8}
              y={chartPoints[3].y - 19}
              textAnchor="end"
              fontSize="12"
              fontWeight="bold"
              fill="#b77932"
            >
              SUMMIT
            </text>
          </svg>
        </div>

        <p className="mt-2 text-center text-xs text-gray-500">
          Select a forest trail checkpoint to explore its elevation.
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
            Selected trail checkpoint
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
