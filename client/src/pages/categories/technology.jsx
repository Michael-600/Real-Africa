import React, { useState } from "react";
import AccountMenu from "../../components/AccountMenu";
import Opportunities from "./opportunities";
import { useAuth } from "../../lib/authContext";

// -----------------------------
// TECHNOLOGY SUBSCRIPTION MODEL
// -----------------------------
const hasTechSubscription = true; // mock: unlocked for now
const TECH_SUBSCRIPTION_PRICE = "Ksh. 50 / month";

// -----------------------------
// UPCOMING WEBINARS
// -----------------------------
const upcomingWebinars = [
  {
    title: "Modern Frontend Architecture in React",
    datetime: "Jan 18, 2026 · 7:00 PM EAT",
    track: "Frontend",
    tierRequired: 1,
    link: "https://www.youtube.com/watch?v=2Ji-clqUYnA",
    speaker: {
      name: "Senior Frontend Engineer",
      role: "React / Next.js",
      avatar: "https://placehold.co/80x80",
    },
  },
  {
    title: "Designing Scalable Backend Systems",
    datetime: "Jan 22, 2026 · 7:00 PM EAT",
    track: "Backend",
    tierRequired: 3,
    link: "https://www.youtube.com/watch?v=VwVg9jCtqaU",
    speaker: {
      name: "Backend Architect",
      role: "Node, Go, Postgres",
      avatar: "https://placehold.co/80x80",
    },
  },
];



// -----------------------------
// TECHNOLOGY TRACKS
// -----------------------------
const techTracks = [
  {
    key: "frontend",
    title: "Frontend",
    description: "React, Next.js, UI architecture, performance, and accessibility.",
    courses: [
      { title: "Component Architecture in React" },
      { title: "Advanced State Management" },
      { title: "Frontend Performance Optimization" },
    ],
  },
  {
    key: "backend",
    title: "Backend",
    description: "APIs, databases, scaling, and backend architecture.",
    courses: [
      { title: "REST vs GraphQL vs gRPC" },
      { title: "Designing for Scale" },
      { title: "Database Indexing & Performance" },
    ],
  },
  {
    key: "ai",
    title: "AI",
    description: "Applied AI, LLMs, agents, and real-world use cases.",
    courses: [
      { title: "Intro to LLMs" },
      { title: "Building AI Agents" },
      { title: "Prompt Engineering for Production" },
    ],
  },
  {
    key: "dsa",
    title: "Data Structures & Algorithms",
    description: "Problem-solving, interviews, and core CS foundations.",
    courses: [
      { title: "Arrays, Strings, and Hashing" },
      { title: "Trees and Graphs" },
      { title: "Dynamic Programming Patterns" },
    ],
  },
];

// -----------------------------
// PAGE
// -----------------------------
export default function TechnologyPage() {
  const { profile } = useAuth();
  const userTier = profile?.tier_level ?? 0;
  // Referrals and invite modal
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);
  const [referrals, setReferrals] = useState(1);
  const hasFreeMonth = referrals >= 3;

  // Upgrade prompt modal for subscription
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);

  // Coming Soon notify modal
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifySent, setNotifySent] = useState(false);

  // Tooltip state for locked courses
  const [tooltipCourse, setTooltipCourse] = useState(null);

  return (
    <div className="get-mentored-page">
      {/* GLOBAL ACCOUNT MENU (FIXED TOP RIGHT) */}
      <div className="account-menu-fixed">
        <AccountMenu
          user={{ name: "Raydon Muregi", initials: "RM" }}
        />
      </div>
      <main className="get-mentored-container">
        {/* TOP ACTION BAR */}
        <div className="get-mentored-top-bar">
          <div className="invite-info">
            <div className="invite-text">
              <p className="invite-title">Refer friends</p>
              <p className="invite-subtext">
                Invite 3 friends to earn a free month.
              </p>
              <p className="invite-counter">
                Referrals: <strong>{referrals}</strong>/3
                {hasFreeMonth && (
                  <span className="invite-unlocked"> · Free month unlocked</span>
                )}
              </p>
            </div>
            <button
              className="primary invite-top-button"
              onClick={() => setShowInviteModal(true)}
            >
              Invite a Friend
            </button>
          </div>
        </div>
        
        {/* HERO */}
        <section className="get-mentored-hero">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Technology
          </h1>
          <p className="text-zinc-600 text-lg">
            Learn frontend, backend, AI, and DSA from engineers building real systems.
          </p>
        </section>

        {/* UPCOMING WEBINARS */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">Upcoming Webinars</h2>
          <div className="webinars-list space-y-4">
            {upcomingWebinars.map((webinar, idx) => {
              const hasAccess = userTier >= webinar.tierRequired;
              return (
              <div key={idx} className={`webinar-card ${hasAccess ? "" : "locked"}`}>
                <div className="webinar-info">
                  <img
                    src={webinar.speaker.avatar}
                    alt={webinar.speaker.name}
                    className="webinar-speaker-avatar"
                  />
                  <div className="space-y-1">
                    <h3 className="text-xl font-medium">{webinar.title}</h3>
                    <p className="text-zinc-600">{webinar.datetime}</p>
                    <div className="flex items-center gap-2 text-sm text-zinc-500">
                      <span className="font-semibold">{webinar.track}</span>
                      <span>·</span>
                      <span>
                        {webinar.speaker.name} ({webinar.speaker.role})
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  className={`primary mt-3 ${!hasAccess ? "disabled" : ""}`}
                  disabled={!hasAccess}
                  onClick={() => {
                    if (!hasAccess) {
                      setShowUpgradePrompt(true);
                    } else {
                      window.open(webinar.link, "_blank", "noopener,noreferrer");
                    }
                  }}
                >
                  {!hasAccess
                    ? `Upgrade to Tier ${webinar.tierRequired}+`
                    : "Join Webinar"}
                </button>
              </div>
            )})}
          </div>
        </section>
        
        {/* TECHNOLOGY STACKS */}
        <section className="tech-stacks-section mt-12">
          <h2 className="text-2xl font-semibold mb-6">Technology Stacks</h2>

          <div className="tech-stacks">
            {techTracks.map((track) => (
              <div key={track.key} className="tech-track-card">
                {/* Track Header */}
                <div className="tech-track-header">
                  <h3 className="tech-track-title">{track.title}</h3>
                  <p className="tech-track-desc">{track.description}</p>
                  <span className="tech-track-progress">
                    0/{track.courses.length} lessons completed
                  </span>
                </div>

                {/* Inner lesson cards */}
                <div className="tech-lessons">
                  {track.courses.map((course, idx) => (
                    <div
                      key={idx}
                      className={`tech-lesson ${idx === 0 ? "current" : ""}`}
                    >
                      <span className="lesson-title">
                        {course.title}
                        {idx === 0 && (
                          <em className="current-indicator"> ← you are here</em>
                        )}
                      </span>

                      <a
                        href="https://youtube.com"
                        target="_blank"
                        rel="noreferrer"
                        className="watch-btn"
                      >
                        Watch
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* UPGRADE PROMPT MODAL */}
      {showUpgradePrompt && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 className="text-lg font-semibold">
              Subscribe to Technology
            </h3>
            <p className="text-sm text-zinc-600 mt-2">
              Unlock webinars and advanced technology content for Ksh. 50 per month.
            </p>
            <div className="modal-actions mt-6">
              <button
                className="secondary"
                onClick={() => setShowUpgradePrompt(false)}
              >
                Not now
              </button>
              <button
                className="primary"
                onClick={() => {
                  alert("Subscription flow coming soon.");
                }}
              >
                Subscribe ({TECH_SUBSCRIPTION_PRICE})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INVITE MODAL */}
      {showInviteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 className="text-lg font-semibold">Invite a Friend</h3>
            {!inviteSent ? (
              <p className="text-sm text-zinc-600">
                Enter your friend's email. They get 20% off their first month — you do too.
              </p>
            ) : (
              <p className="text-sm text-emerald-600">
                ✅ Invite sent! Thanks for helping grow the community.
              </p>
            )}

            <input
              type="email"
              placeholder="friend@email.com"
              className="modal-input"
              disabled={inviteSent}
            />

            <div className="modal-actions">
              <button
                className="secondary"
                onClick={() => {
                  setShowInviteModal(false);
                  setInviteSent(false);
                }}
              >
                {inviteSent ? "Close" : "Cancel"}
              </button>
              {!inviteSent && (
                <button
                  className="primary"
                  onClick={() => {
                    setInviteSent(true);
                    setReferrals(r => Math.min(r + 1, 3));
                  }}
                >
                  Send Invite
                </button>
              )}

            </div>
          </div>
        </div>
      )}
      <div className="coming-soon-wrapper">
  <div className="coming-soon-content">
    <Opportunities />
  </div>

      <div className="coming-soon-overlay">
        <button
          className="coming-soon-pill"
          onClick={() => setShowNotifyModal(true)}
        >
          Coming Soon · Get Notified
        </button>
      </div>
</div>
      {/* Notify Me Modal */}
      {showNotifyModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 className="text-lg font-semibold">
              Get notified when Opportunities launch
            </h3>

            {!notifySent ? (
              <p className="text-sm text-zinc-600 mt-2">
                Enter your email and we’ll notify you as soon as opportunities go live.
              </p>
            ) : (
              <p className="text-sm text-emerald-600 mt-2">
                ✅ You’re on the list. We’ll be in touch soon.
              </p>
            )}

            <input
              type="email"
              placeholder="you@email.com"
              className="modal-input mt-4"
              value={notifyEmail}
              onChange={(e) => setNotifyEmail(e.target.value)}
              disabled={notifySent}
            />

            <div className="modal-actions mt-6">
              <button
                className="secondary"
                onClick={() => {
                  setShowNotifyModal(false);
                  setNotifySent(false);
                  setNotifyEmail("");
                }}
              >
                {notifySent ? "Close" : "Cancel"}
              </button>

              {!notifySent && (
                <button
                  className="primary"
                  onClick={() => {
                    if (!notifyEmail) return;
                    // hook API / Supabase / email service here later
                    setNotifySent(true);
                  }}
                >
                  Notify Me
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}