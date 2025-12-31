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
    price: "Free seats",
  },
  {
    level: 2,
    name: "6‑Figure Entrepreneurs",
    description: "Operators refining systems, sales, and predictable income.",
    price: "Ksh.100 / month",
  },
  {
    level: 3,
    name: "7‑Figure Entrepreneurs",
    description: "Founders scaling teams, processes, and sustainable growth.",
    price: "Ksh.300 / month",
  },
  {
    level: 4,
    name: "8‑Figure Entrepreneurs",
    description: "Leaders managing complexity, leverage, and market positioning.",
    price: "Ksh.500 / month",
  },
  {
    level: 5,
    name: "9‑Figure Entrepreneurs",
    description: "Strategic thinkers operating at regional or global scale.",
    price: "Ksh.1000 / month",
  },
  {
    level: 6,
    name: "10‑Figure Entrepreneurs",
    description: "Institutional-level builders shaping industries.",
    price: "Ksh.5000 / month",
  },
  {
    level: 7,
    name: "11+ Figure Entrepreneurs",
    description: "Elite access to world‑class operators and capital allocators.",
    price: "Ksh. 10,000 / month",
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
    <div className="get-mentored-page">
      <main className="get-mentored-container">
        {/* HERO */}
        <section className="get-mentored-hero">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Mentorship from builders who have done it before
          </h1>
          <p className="text-zinc-600 text-lg">
            Join live mentorship calls with experienced entrepreneurs at different
            stages of scale. No noise. No courses. Just real conversations.
          </p>
        </section>

        {/* NEXT LIVE CALL */}
        <section>
          <div
            className={`live-call ${!hasCallAccess ? "locked" : ""}`}
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
              className={hasCallAccess ? "enabled" : "disabled"}
            >
              Join Live Call
            </button>
          </div>
        </section>

        {/* TIERS */}
        <section className="tiers">
          <h2 className="text-2xl font-semibold">Mentorship Tiers</h2>

          <div className="tier-grid">
            {tiers.map(tier => {
              const isActive = tier.level === userTierLevel;
              const isAccessible = tier.level <= userTierLevel;
              const isLocked = tier.level > userTierLevel;

              return (
                <div
                  key={tier.level}
                  className={`tier-card ${isActive ? "active" : ""} ${isLocked ? "locked" : ""}`}
                >
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">{tier.name}</h3>
                    <p className="text-zinc-600 text-sm">{tier.description}</p>
                    <p className="price">{tier.price}</p>

                    <p className="status">
                      {isActive && "✓ Your current tier"}
                      {isAccessible && !isActive && "Included in your access"}
                      {isLocked && "Locked — upgrade required"}
                    </p>
                  </div>

                  <div className="mt-6">
                    {isActive && (
                      <button
                        disabled
                        className="secondary"
                      >
                        ✓ Current Tier
                      </button>
                    )}

                    {!isActive && isAccessible && (
                      <button className="primary">
                        Join Mentorship
                      </button>
                    )}

                    {isLocked && (
                      <button
                        disabled
                        className="disabled"
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