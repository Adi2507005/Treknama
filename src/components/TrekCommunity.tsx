
"use client";

import { useState } from "react";

type TrekCommunityProps = {
  trekName: string;
};

type CommunityReview = {
  rating: number;
  experience: string;
  condition: string;
};

const ratingLabels = [
  "Poor",
  "Disappointing",
  "Average",
  "Great",
  "Amazing",
];

export default function TrekCommunity({
  trekName,
}: TrekCommunityProps) {
  const [visitStatus, setVisitStatus] = useState<
    "visited" | "want-to-visit" | "not-yet" | ""
  >("");

  const [rating, setRating] = useState(0);
  const [experience, setExperience] = useState("");
  const [condition, setCondition] = useState("Good");
  const [photos, setPhotos] = useState<string[]>([]);
  const [submittedReview, setSubmittedReview] =
    useState<CommunityReview | null>(null);

  const handlePhotoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files ?? []);
    const remaining = Math.max(0, 4 - photos.length);
    const selected = files.slice(0, remaining);

    const previews = selected.map((file) =>
      URL.createObjectURL(file)
    );

    setPhotos((previous) => [...previous, ...previews]);
    event.target.value = "";
  };

  const removePhoto = (index: number) => {
    URL.revokeObjectURL(photos[index]);
    setPhotos((previous) =>
      previous.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (visitStatus !== "visited") {
      alert("Please mark that you have visited this trek before submitting a review.");
      return;
    }

    if (rating === 0) {
      alert("Please select a rating from 1 to 5 stars.");
      return;
    }

    if (!experience.trim()) {
      alert("Please write a short trekking experience.");
      return;
    }

    setSubmittedReview({
      rating,
      experience: experience.trim(),
      condition,
    });

    setExperience("");
    setRating(0);
    setCondition("Good");
    setPhotos([]);
  };

  return (
    <section
      id="trek-community"
      className="mx-auto mt-12 max-w-3xl rounded-3xl border border-[#e7e3d8] bg-white p-5 shadow-sm md:p-8"
    >
      <div className="mb-7">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-700">
          Treknama Community
        </p>

        <h2 className="mt-2 text-2xl font-bold text-[#263b2c] md:text-3xl">
          Have you been here?
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          Visited {trekName}? Share your experience, photos and
          trail updates to help fellow trekkers.
        </p>
      </div>

      {/* Visit status */}
      <div className="rounded-2xl bg-[#f3f6ef] p-5">
        <h3 className="font-semibold text-[#263b2c]">
          Have you completed {trekName}?
        </h3>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <button
            type="button"
            onClick={() => setVisitStatus("visited")}
            className={`rounded-xl border p-3 text-sm font-semibold transition ${
              visitStatus === "visited"
                ? "border-green-700 bg-green-700 text-white"
                : "border-gray-200 bg-white text-[#263b2c] hover:border-green-600"
            }`}
          >
            ✓ I've been!
          </button>

          <button
            type="button"
            onClick={() => setVisitStatus("want-to-visit")}
            className={`rounded-xl border p-3 text-sm font-semibold transition ${
              visitStatus === "want-to-visit"
                ? "border-green-700 bg-green-700 text-white"
                : "border-gray-200 bg-white text-[#263b2c] hover:border-green-600"
            }`}
          >
            ♡ Want to go
          </button>

          <button
            type="button"
            onClick={() => setVisitStatus("not-yet")}
            className={`rounded-xl border p-3 text-sm font-semibold transition ${
              visitStatus === "not-yet"
                ? "border-green-700 bg-green-700 text-white"
                : "border-gray-200 bg-white text-[#263b2c] hover:border-green-600"
            }`}
          >
            Not yet
          </button>
        </div>

        {visitStatus === "visited" && (
          <p className="mt-3 text-xs text-green-800">
            Great! You can now share your trek experience below.
          </p>
        )}
      </div>

      {/* Review form */}
      {visitStatus === "visited" && (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Rating */}
          <div>
            <h3 className="font-semibold text-[#263b2c]">
              Rate this trek
            </h3>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              {ratingLabels.map((label, index) => {
                const value = index + 1;

                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    aria-label={`Rate ${value} out of 5`}
                    aria-pressed={rating === value}
                    className={`text-3xl transition ${
                      value <= rating
                        ? "text-amber-400"
                        : "text-gray-300 hover:text-amber-300"
                    }`}
                  >
                    ★
                  </button>
                );
              })}

              {rating > 0 && (
                <span className="ml-2 text-sm font-medium text-[#263b2c]">
                  {ratingLabels[rating - 1]}
                </span>
              )}
            </div>
          </div>

          {/* Experience */}
          <div>
            <label
              htmlFor="trek-experience"
              className="font-semibold text-[#263b2c]"
            >
              Share your experience
            </label>

            <textarea
              id="trek-experience"
              value={experience}
              onChange={(event) => setExperience(event.target.value)}
              placeholder={`Tell others about your ${trekName} experience...`}
              rows={4}
              maxLength={1000}
              className="mt-3 w-full rounded-xl border border-gray-200 p-4 text-sm outline-none transition focus:border-green-700"
            />

            <p className="mt-1 text-right text-xs text-gray-400">
              {experience.length}/1000
            </p>
          </div>

          {/* Trail conditions */}
          <div>
            <label
              htmlFor="trail-condition"
              className="font-semibold text-[#263b2c]"
            >
              How were the trail conditions?
            </label>

            <select
              id="trail-condition"
              value={condition}
              onChange={(event) => setCondition(event.target.value)}
              className="mt-3 w-full rounded-xl border border-gray-200 bg-white p-3 text-sm outline-none focus:border-green-700"
            >
              <option>Good</option>
              <option>Moderate</option>
              <option>Difficult</option>
              <option>Snow-covered</option>
              <option>Rain-affected</option>
              <option>Blocked or damaged</option>
            </select>
          </div>

          {/* Photo upload */}
          <div>
            <p className="font-semibold text-[#263b2c]">
              Share your trekking photos
            </p>

            <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 p-5 text-sm text-gray-600 transition hover:border-green-700 hover:bg-[#f8faf6]">
              <span className="text-xl">📷</span>
              Add photos (up to 4)
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoChange}
                disabled={photos.length >= 4}
                className="sr-only"
              />
            </label>

            {photos.length > 0 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {photos.map((photo, index) => (
                  <div key={photo} className="relative">
                    <img
                      src={photo}
                      alt={`Trek photo ${index + 1}`}
                      className="h-20 w-full rounded-lg object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      aria-label="Remove photo"
                      className="absolute -right-2 -top-2 rounded-full bg-red-600 px-2 py-1 text-xs text-white"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#285b3b] px-5 py-4 font-semibold text-white transition hover:bg-[#1e472e]"
          >
            Share your experience →
          </button>

          <p className="text-center text-xs leading-5 text-gray-400">
            Your submission is currently a local demonstration.
            Reviews and photos are not permanently stored or shared
            with other visitors.
          </p>
        </form>
      )}

      {/* Local demonstration submission */}
      {submittedReview && (
        <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5">
          <p className="font-semibold text-green-800">
            Your review was added to this session!
          </p>

          <p className="mt-2 text-amber-500">
            {"★".repeat(submittedReview.rating)}
            {"☆".repeat(5 - submittedReview.rating)}
          </p>

          <p className="mt-2 text-sm text-gray-700">
            {submittedReview.experience}
          </p>

          <p className="mt-2 text-xs text-gray-500">
            Trail condition: {submittedReview.condition}
          </p>
        </div>
      )}
    </section>
  );
}
