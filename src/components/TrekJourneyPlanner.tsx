
"use client";

import { useState } from "react";

type TrekJourneyPlannerProps = {
  trekName: string;
  startPoint: string;
  travelNote: string;
};

export default function TrekJourneyPlanner({
  trekName,
  startPoint,
  travelNote,
}: TrekJourneyPlannerProps) {
  const [origin, setOrigin] = useState("");
  const [currentCoordinates, setCurrentCoordinates] = useState("");
  const [locationMessage, setLocationMessage] = useState("");
  const [gettingLocation, setGettingLocation] = useState(false);

  function useCurrentLocation() {
    if (!navigator.geolocation) {
      setLocationMessage("Location services are not supported by this browser.");
      return;
    }

    setGettingLocation(true);
    setLocationMessage("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coordinates = `${position.coords.latitude},${position.coords.longitude}`;
        setCurrentCoordinates(coordinates);
        setOrigin("My current location");
        setGettingLocation(false);
        setLocationMessage("Your current location is ready for directions.");
      },
      () => {
        setGettingLocation(false);
        setLocationMessage(
          "Location permission was unavailable. Please enter your starting city manually."
        );
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
      }
    );
  }

  function openDirections() {
    const startingLocation = currentCoordinates || origin.trim();

    if (!startingLocation) {
      setLocationMessage("Please enter your starting location first.");
      return;
    }

    const mapsUrl = new URL("https://www.google.com/maps/dir/");
    mapsUrl.searchParams.set("api", "1");
    mapsUrl.searchParams.set("origin", startingLocation);
    mapsUrl.searchParams.set("destination", startPoint);
    mapsUrl.searchParams.set("travelmode", "driving");

    window.open(mapsUrl.toString(), "_blank", "noopener,noreferrer");
  }

  function handleOriginChange(value: string) {
    setOrigin(value);
    setCurrentCoordinates("");
    setLocationMessage("");
  }

  return (
    <section className="mx-auto my-12 max-w-5xl rounded-3xl border border-[#e6e3d8] bg-white p-5 shadow-sm md:p-8">
      <div className="mb-7">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-700">
          Treknama Travel Assistant
        </p>

        <h2 className="mt-2 text-2xl font-bold text-[#263b2c] md:text-3xl">
          Plan your journey
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          Find your way to the starting point of {trekName}.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label
            htmlFor="journey-origin"
            className="mb-2 block text-sm font-semibold text-[#263b2c]"
          >
            Your starting location
          </label>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2">
              📍
            </span>

            <input
              id="journey-origin"
              type="text"
              value={origin}
              onChange={(event) => handleOriginChange(event.target.value)}
              placeholder="Enter city, area or location"
              className="w-full rounded-xl border border-gray-200 py-4 pl-11 pr-4 text-sm outline-none transition focus:border-green-700"
            />
          </div>

          <button
            type="button"
            onClick={useCurrentLocation}
            disabled={gettingLocation}
            className="mt-3 text-sm font-semibold text-green-800 hover:underline disabled:opacity-50"
          >
            {gettingLocation
              ? "Finding your location..."
              : "◎ Use my current location"}
          </button>

          {locationMessage && (
            <p className="mt-2 text-xs text-gray-500" aria-live="polite">
              {locationMessage}
            </p>
          )}
        </div>

        <div>
          <p className="mb-2 block text-sm font-semibold text-[#263b2c]">
            Trek starting point
          </p>

          <div className="flex min-h-[54px] items-center gap-3 rounded-xl bg-[#f3f6ef] px-4 py-3">
            <span className="text-xl">🏔️</span>
            <div>
              <p className="font-semibold text-[#263b2c]">
                {startPoint}
              </p>
              <p className="text-xs text-gray-500">
                {trekName} trailhead
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-7 rounded-2xl bg-[#f3f6ef] p-5">
        <h3 className="font-semibold text-[#263b2c]">
          Transportation guidance
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          {travelNote}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {["Road travel", "Public transport", "Private taxi"].map((mode) => (
            <span
              key={mode}
              className="rounded-full border border-[#dce5d7] bg-white px-3 py-2 text-xs font-medium text-[#365b3e]"
            >
              {mode}
            </span>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={openDirections}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#285b3b] px-5 py-4 font-semibold text-white transition hover:bg-[#1e472e]"
      >
        Get directions on Google Maps
        <span>↗</span>
      </button>

      <p className="mt-4 text-center text-xs leading-5 text-gray-500">
        Directions open in Google Maps. Travel routes and estimated times
        are provided by Google Maps and may change. Public transport,
        permits and local transfers should be verified separately before
        travelling.
      </p>
    </section>
  );
}
