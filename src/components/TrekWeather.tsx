
"use client";

import { useEffect, useState } from "react";

type TrekWeatherProps = {
  latitude: number;
  longitude: number;
  location: string;
};

type WeatherData = {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
    time: string;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
  };
};

function getWeatherDescription(code: number) {
  if (code === 0) return "Clear sky";
  if ([1, 2].includes(code)) return "Partly cloudy";
  if (code === 3) return "Overcast";
  if ([45, 48].includes(code)) return "Foggy";
  if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "Rain";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snow";
  if ([95, 96, 99].includes(code)) return "Thunderstorm";
  return "Weather conditions unavailable";
}

function getWeatherIcon(code: number) {
  if (code === 0) return "☀️";
  if ([1, 2].includes(code)) return "🌤️";
  if (code === 3) return "☁️";
  if ([45, 48].includes(code)) return "🌫️";
  if ([51, 53, 55, 56, 57].includes(code)) return "🌦️";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "🌧️";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "❄️";
  if ([95, 96, 99].includes(code)) return "⛈️";
  return "🌥️";
}

export default function TrekWeather({
  latitude,
  longitude,
  location,
}: TrekWeatherProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchWeather() {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams({
          latitude: String(latitude),
          longitude: String(longitude),
          current:
            "temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m",
          daily:
            "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
          forecast_days: "3",
          timezone: "auto",
        });

        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?${params.toString()}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Weather service is temporarily unavailable.");
        }

        const data: WeatherData = await response.json();

        if (!data.current || !data.daily?.time?.length) {
          throw new Error("Weather information is currently unavailable.");
        }

        setWeather(data);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load weather information."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchWeather();

    return () => controller.abort();
  }, [latitude, longitude]);

  return (
    <section className="my-10 rounded-3xl border border-[#e6e3d8] bg-white p-5 shadow-sm md:p-8">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-green-700">
          Live Weather
        </p>
        <h2 className="mt-2 text-2xl font-bold text-[#263b2c]">
          Weather at {location}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Current conditions and a 3-day forecast
        </p>
      </div>

      {loading && (
        <div className="py-10 text-center text-gray-500">
          Loading live weather...
        </div>
      )}

      {error && (
        <div className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
          {error}
          <p className="mt-1">
            Please check your internet connection and try again.
          </p>
        </div>
      )}

      {weather && !loading && (
        <>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl bg-[#f3f6ef] p-6">
              <p className="text-sm text-gray-600">Current conditions</p>
              <div className="mt-3 flex items-center gap-4">
                <span className="text-5xl">
                  {getWeatherIcon(weather.current.weather_code)}
                </span>
                <div>
                  <p className="text-4xl font-bold text-[#263b2c]">
                    {Math.round(weather.current.temperature_2m)}°C
                  </p>
                  <p className="text-sm text-gray-600">
                    {getWeatherDescription(weather.current.weather_code)}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Feels like {Math.round(weather.current.apparent_temperature)}°C
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">Humidity</p>
                <p className="mt-2 text-xl font-bold text-[#263b2c]">
                  {weather.current.relative_humidity_2m}%
                </p>
              </div>
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">Wind speed</p>
                <p className="mt-2 text-xl font-bold text-[#263b2c]">
                  {weather.current.wind_speed_10m} km/h
                </p>
              </div>
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">Precipitation</p>
                <p className="mt-2 text-xl font-bold text-[#263b2c]">
                  {weather.current.precipitation} mm
                </p>
              </div>
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">Rain probability</p>
                <p className="mt-2 text-xl font-bold text-[#263b2c]">
                  {weather.daily.precipitation_probability_max[0] ?? "—"}%
                </p>
              </div>
            </div>
          </div>

          <h3 className="mb-4 mt-8 font-semibold text-[#263b2c]">
            Upcoming forecast
          </h3>

          <div className="grid gap-3 sm:grid-cols-3">
            {weather.daily.time.map((date, index) => (
              <div
                key={date}
                className="rounded-xl border border-gray-100 p-4 text-center"
              >
                <p className="text-sm font-medium text-gray-600">
                  {index === 0
                    ? "Today"
                    : new Date(`${date}T12:00:00`).toLocaleDateString(
                        "en-US",
                        { weekday: "short" }
                      )}
                </p>
                <p className="my-3 text-3xl">
                  {getWeatherIcon(weather.daily.weather_code[index])}
                </p>
                <p className="text-sm text-gray-600">
                  {getWeatherDescription(weather.daily.weather_code[index])}
                </p>
                <p className="mt-2 font-bold text-[#263b2c]">
                  {Math.round(weather.daily.temperature_2m_max[index])}° /
                  {Math.round(weather.daily.temperature_2m_min[index])}°
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Rain:{" "}
                  {weather.daily.precipitation_probability_max[index] ?? "—"}%
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs leading-relaxed text-gray-500">
            Weather data provided by Open-Meteo. Forecasts are model-based
            estimates for the selected coordinates and may not reflect
            conditions at every point along a mountain trail. Check local
            forecasts and official advisories before trekking.
          </p>
        </>
      )}
    </section>
  );
}
