

import React from "react";

/**
 * MOCK ACCESS LEVEL
 * 1 = 5-figure
 * 2 = 6-figure
 * ...
 * 7 = 11+ figure
 */
const userTierLevel = 3; // mock: user has access up to 7‑Figure mentors

// -----------------------------
// MOCK DATA
// -----------------------------
const tiers = [
  {
    level: 1,
    name: "5‑Figure Entrepreneurs",
    description: "Early-stage builders learning execution, discipline, and consistency.",
    price: "$29 / month",
  },
  {
    level: 2,
    name: "6‑Figure Entrepreneurs",
    description: "Operators refining systems, sales, and predictable income.",
    price: "$59 / month",
  },
  {
    level: 3,
    name: "7‑Figure Entrepreneurs",
    description: "Founders scaling teams, processes, and sustainable growth.",
    price: "$99 / month",
  },
  {
    level: 4,
    name: "8‑Figure Entrepreneurs",
    description: "Leaders managing complexity, leverage, and market positioning.",
    price: "$199 / month",
  },
  {
    level: 5,
    name: "9‑Figure Entrepreneurs",
    description: "Strategic thinkers operating at regional or global scale.",
    price: "$399 / month",
  },
  {
    level: 6,
    name: "10‑Figure Entrepreneurs",
    description: "Institutional-level builders shaping industries.",
    price: "$699 / month",
  },
  {
    level: 7,
    name: "11+ Figure Entrepreneurs",
    description: "Elite access to world‑class operators and capital allocators.",
    price: "$999 / month",
  },
];

const nextLiveCall = {
  title: "Building Systems That Scale",
  datetime: "Jan 12, 2026 · 7:00 PM EAT",
  tierRequired: 3, // requires 7‑figure tier or above
};

// -----------------------------
// PAGE
// -----------------------------
export default function GetMentoredPage() {
  const hasCallAccess = nextLiveCall.tierRequired <= userTierLevel;

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <main className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        {/* HERO */}
        <section className="max-w-3xl space-y-4">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Mentorship from builders who have done it before
          </h1>
          <p className="text-zinc-600 text-lg">
            Join live mentorship calls with experienced entrepreneurs at different
            stages of scale. No noise. No courses. Just real conversations.
          </p>
        </section>

        {/* NEXT LIVE CALL */}
        <section className="sticky top-4 z-10">
          <div
            className={`rounded-2xl border p-6 bg-white flex flex-col md:flex-row md:items-center md:justify-between gap-6 transition
              ${!hasCallAccess ? "opacity-60 grayscale" : "border-zinc-300"}`}
          >
            <div className="space-y-1">
              <p className="text-sm text-zinc-500">Next Live Call</p>
              <h2 className="text-xl font-medium">{nextLiveCall.title}</h2>
              <p className="text-zinc-600">{nextLiveCall.datetime}</p>
              <p className="text-sm text-zinc-500">
                Mentor Tier: {tiers.find(t => t.level === nextLiveCall.tierRequired)?.name}
              </p>
            </div>

            <button
              disabled={!hasCallAccess}
              className={`px-5 py-3 rounded-lg text-sm font-medium transition
                ${hasCallAccess
                  ? "bg-zinc-900 text-white hover:bg-zinc-800"
                  : "bg-zinc-300 text-zinc-500 cursor-not-allowed"}`}
            >
              Join Live Call
            </button>
          </div>
        </section>

        {/* TIERS */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Mentorship Tiers</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tiers.map(tier => {
              const isActive = tier.level === userTierLevel;
              const isAccessible = tier.level <= userTierLevel;
              const isLocked = tier.level > userTierLevel;

              return (
                <div
                  key={tier.level}
                  className={`rounded-2xl border bg-white p-6 flex flex-col justify-between transition
                    ${isLocked ? "opacity-50 grayscale" : ""}
                    ${isActive ? "border-zinc-900" : "border-zinc-200"}`}
                >
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">{tier.name}</h3>
                    <p className="text-zinc-600 text-sm">{tier.description}</p>
                    <p className="text-sm font-medium">{tier.price}</p>

                    <p className="text-xs text-zinc-500">
                      {isActive && "✓ Your current tier"}
                      {isAccessible && !isActive && "Included in your access"}
                      {isLocked && "Locked — upgrade required"}
                    </p>
                  </div>

                  <div className="mt-6">
                    {isActive && (
                      <button
                        disabled
                        className="w-full py-2 rounded-lg text-sm font-medium bg-zinc-200 text-zinc-700"
                      >
                        ✓ Current Tier
                      </button>
                    )}

                    {!isActive && isAccessible && (
                      <button className="w-full py-2 rounded-lg text-sm font-medium bg-zinc-900 text-white">
                        Join Mentorship
                      </button>
                    )}

                    {isLocked && (
                      <button
                        disabled
                        className="w-full py-2 rounded-lg text-sm font-medium bg-zinc-300 text-zinc-500 cursor-not-allowed"
                      >
                        Upgrade Tier
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}