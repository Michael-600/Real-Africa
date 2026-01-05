 
import React, { useState } from "react";
import AccountMenu from "../components/AccountMenu";

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
  speaker: {
    name: "Raydon Muregi",
    role: "6‑Figure Kenyan Founder",
    photo: "/assets/raydon.jpeg",
    links: {
      linkedin: "https://www.linkedin.com/in/johnmwangi",
      website: "https://johnmwangi.com",
      portfolio: "https://johnmwangi.com/work",
    },
  },
};

// -----------------------------
// TIER-SPECIFIC CURRICULUM
// -----------------------------
const tierCurricula = {
  1: [
    {
      module: "Foundations & Discipline",
      description: "Execution basics and personal leverage.",
      videos: [
        { title: "Picking Problems Worth Solving" },
        { title: "Daily Execution Systems" },
        { title: "Avoiding Shiny Object Syndrome" },
      ],
    },
  ],
  2: [
    {
      module: "Systems & Sales",
      description: "Repeatability and predictable revenue.",
      videos: [
        { title: "Turning Actions into Systems" },
        { title: "Sales as a Repeatable Process" },
        { title: "Understanding Unit Economics" },
      ],
    },
  ],
  3: [
    {
      module: "Scaling Operations",
      description: "Managing complexity without breaking.",
      videos: [
        { title: "Hiring Operators vs Doers" },
        { title: "Founder to Manager Transition" },
        { title: "Metrics That Actually Matter" },
      ],
    },
  ],
  4: [
    {
      module: "Strategic Leverage",
      description: "Durability and leadership at scale.",
      videos: [
        { title: "Delegating Outcomes, Not Tasks" },
        { title: "Culture as a Scaling Tool" },
        { title: "Managing Operational Risk" },
      ],
    },
  ],
  5: [
    {
      module: "Strategic Dominance",
      description: "Executive thinking and expansion.",
      videos: [
        { title: "Portfolio Thinking" },
        { title: "M&A: Build vs Buy" },
        { title: "Executive Alignment" },
      ],
    },
  ],
  6: [
    {
      module: "Institutional Scale",
      description: "Capital, governance, and longevity.",
      videos: [
        { title: "Capital Allocation Decisions" },
        { title: "Founder Succession Planning" },
        { title: "Institutional Risk Management" },
      ],
    },
  ],
  7: [
    {
      module: "Legacy & Stewardship",
      description: "Industry-shaping and long-term impact.",
      videos: [
        { title: "Stewardship vs Control" },
        { title: "Shaping Entire Ecosystems" },
        { title: "Building Beyond Yourself" },
      ],
    },
  ],
};

function ProgramCard({
  title,
  description,
  imageSrc,
  isLocked,
  progressPercent,
  expanded,
  onToggle,
  children,
}) {
  return (
    <div
      className={`program-card ${isLocked ? "locked-preview" : ""}`}
      style={{ opacity: isLocked ? 0.85 : 1 }}
    >
      <img src={imageSrc} alt={title} className="program-card-image" />

      <div className="program-card-body">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-sm text-zinc-500">{description}</p>

        <div className="progress-bar mt-3">
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${isLocked ? 0 : progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-zinc-500 mt-1">
            <span>{isLocked ? "0%" : `${progressPercent}%`}</span>
          </div>
        </div>

        <button
          className={`watch-link mt-4 ${isLocked ? "locked-button" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
        >
          {isLocked ? "🔒 Upgrade to Unlock" : expanded ? "Hide Modules" : "Open Program"}
        </button>

        {!isLocked && expanded && (
          <div className="mt-4 space-y-3">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
function CourseCard({
  module,
  completedLessons,
  totalLessons,
  isLocked,
  onClick,
}) {
  const progressPercent = isLocked
    ? 0
    : Math.round((completedLessons / totalLessons) * 100);

  return (
    <div
      className={`class-module clickable ${
        isLocked ? "locked-preview" : ""
      }`}
      style={{
        opacity: isLocked ? 0.85 : 1,
        cursor: "pointer",
      }}
      title={isLocked ? "Preview available – upgrade to unlock" : undefined}
      onClick={onClick}
    >
      <h3 className="text-lg font-medium">{module.module}</h3>
      <p className="text-sm text-zinc-500">{module.description}</p>

      {/* Progress bar */}
      <div className="progress-bar mt-3">
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-xs text-zinc-500 mt-1">
          {completedLessons}/{totalLessons} lessons completed
        </p>
      </div>

      {/* Action button */}
      <button
        className={`watch-link mt-4 ${
          isLocked ? "locked-button" : ""
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        {isLocked ? "🔒 Upgrade to Unlock" : "Watch"}
      </button>
    </div>
  );
}
// -----------------------------
// PAGE
// -----------------------------
export default function GetMentoredPage() {
  const hasCallAccess = nextLiveCall.tierRequired <= userTierLevel;
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);
  const [showTierDropdown, setShowTierDropdown] = useState(false);
  const [showCourses, setShowCourses] = useState(true);

  // Upgrade prompt state
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const [selectedUpgradeTier, setSelectedUpgradeTier] = useState(null);

  // Tier preview (allows users to preview higher tiers)
  const [previewTierLevel, setPreviewTierLevel] = useState(userTierLevel);

  // Lesson modal
  const [activeLesson, setActiveLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState({});

  // Progress + referrals (mock)
  const [lessonsWatched, setLessonsWatched] = useState(2);
  const totalLessonsThisWeek = 5;

  const [referrals, setReferrals] = useState(1); // mock referrals
  const unlockedBonusModules = referrals >= 1;
  const hasFreeMonth = referrals >= 3;

  // LIVE CALL REMINDER MODAL state
  const [showCallReminder, setShowCallReminder] = useState(false);

  // Mentor Request Modal state
  const [showMentorRequest, setShowMentorRequest] = useState(false);

  const effectiveTierLevel = previewTierLevel;

  const curriculum = tierCurricula[effectiveTierLevel] || [];
  // Helper to get a tier's curriculum for preview
  const getTierPreview = (tierLevel) => tierCurricula[tierLevel] || [];

  // Progress helpers (global, single source of truth)
  const completedKeys = Object.keys(completedLessons);
  // Flatten curriculum to ordered lesson keys
  const allLessonKeys = curriculum.flatMap(module =>
    module.videos.map((_, idx) => `${module.module}-${idx}`)
  );
  // First incomplete lesson is the current one
  const currentLessonKey = allLessonKeys.find(
    key => !completedLessons[key]
  );

  return (
    <div className="get-mentored-page">
      {/* GLOBAL ACCOUNT MENU (FIXED TOP RIGHT) */}
      <div className="account-menu-fixed">
        <AccountMenu
          user={{ name: "Raydon Muregi", initials: "RM" }}
          userTierLevel={userTierLevel}
          tiers={tiers}
          onUpgrade={(tier) => {
            setSelectedUpgradeTier(tier);
            setShowUpgradePrompt(true);
          }}
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
          <div className="tier-indicator mb-3">
            <span className="tier-pill">
              Your Mentor Tier:{" "}
              <strong>
                {tiers.find(t => t.level === userTierLevel)?.name}
              </strong>
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Mentorship from builders who have done it before
          </h1>
          <p className="text-zinc-600 text-lg">
            Join live mentorship calls with experienced entrepreneurs at different
            stages of scale. No noise. No courses. Just real conversations.
          </p>
        </section>

        {/* TIER DROPDOWN (STICKY) */}
        <section className="tier-dropdown sticky">
          <button
            className="tier-dropdown-trigger"
            onClick={() => setShowTierDropdown(!showTierDropdown)}
          >
            <span>
              Viewing Tier: {tiers.find(t => t.level === effectiveTierLevel)?.name}
            </span>
            <span className="caret">▾</span>
          </button>

          {showTierDropdown && (
            <div className="tier-dropdown-menu">
              {tiers.map(tier => {
                const isActive = tier.level === effectiveTierLevel;
                const isLocked = tier.level > userTierLevel;

                return (
                  <div
                    key={tier.level}
                    className={`tier-dropdown-item ${isActive ? "active" : ""} ${isLocked ? "locked" : ""}`}
                    onClick={() => {
                      if (isLocked) {
                        setSelectedUpgradeTier(tier);
                        setShowUpgradePrompt(true);
                        setShowTierDropdown(false);
                        return;
                      }

                      setPreviewTierLevel(tier.level);
                      setShowTierDropdown(false);
                    }}
                  >
                    <div>
                      <p className="font-medium">{tier.name}</p>
                      <p className="text-xs text-zinc-500">{tier.description}</p>
                    </div>
                    <span className="price">{tier.price}</span>
                  </div>
                );
              })}
            </div>
          )}
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
              {nextLiveCall.speaker && (
                <div className="speaker-row speaker-highlight mt-3">
                  <img
                    src={nextLiveCall.speaker.photo}
                    alt={nextLiveCall.speaker.name}
                    className="speaker-avatar speaker-avatar-lg"
                  />
                  <div className="speaker-info">
                    <p className="speaker-name text-lg font-semibold">
                      {nextLiveCall.speaker.name}
                    </p>
                    <p className="speaker-role text-sm font-medium text-zinc-600">
                      {nextLiveCall.speaker.role}
                    </p>
                    <div className="speaker-links">
                      {nextLiveCall.speaker.links.linkedin && (
                        <a href={nextLiveCall.speaker.links.linkedin} target="_blank" rel="noreferrer">
                          LinkedIn
                        </a>
                      )}
                      {nextLiveCall.speaker.links.website && (
                        <a href={nextLiveCall.speaker.links.website} target="_blank" rel="noreferrer">
                          Website
                        </a>
                      )}
                      {nextLiveCall.speaker.links.portfolio && (
                        <a href={nextLiveCall.speaker.links.portfolio} target="_blank" rel="noreferrer">
                          Portfolio
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              disabled={!hasCallAccess}
              className={hasCallAccess ? "enabled" : "disabled"}
              onClick={() => {
                if (!hasCallAccess) return;
                setShowCallReminder(true);
              }}
            >
              Join Live Call
            </button>
            <button
              className="secondary mt-2"
              onClick={() => setShowMentorRequest(true)}
            >
              Request to Become a Mentor
            </button>
          </div>
        </section>

        <section className="class-section scroll-container">
          {/* Current tier access indicator */}
          <p className="text-sm text-zinc-500">
            You currently have access up to{" "}
            <strong>{tiers.find(t => t.level === userTierLevel)?.name}</strong>
          </p>
          <div className="space-y-4">
            {tiers.map(tier => {
                const isCurrentTier = tier.level === effectiveTierLevel;
                const isLocked = tier.level > userTierLevel;
                const hasAccess = tier.level <= userTierLevel;

                return (
                  <div key={tier.level}>
                    <div
                      className={`courses-card clickable ${isLocked ? "locked" : ""}`}
                      onClick={() => {
                        if (isLocked) {
                          setSelectedUpgradeTier(tier);
                          setShowUpgradePrompt(true);
                          return;
                        }
                        setPreviewTierLevel(tier.level);
                        setShowCourses(true);
                      }}
                    >
                      <div>
                        <h2 className="text-2xl font-semibold">
                          Explore {tier.name} Courses
                        </h2>
                        <p className="text-sm text-zinc-600">
                          {isCurrentTier
                            ? "Courses available at your current mentor access level."
                            : "Preview what becomes available at this tier."}
                        </p>
                      </div>

                      {!hasAccess ? (
                        <span className="lock-indicator">🔒</span>
                      ) : (
                        <span className="caret">
                          {showCourses && tier.level === effectiveTierLevel ? "▴" : "▾"}
                        </span>
                      )}
                    </div>
                    {showCourses && tier.level === effectiveTierLevel && (
                      <div className="space-y-2 mt-4">
                        <div className="progress-bar">
                          <p className="text-sm text-zinc-600">
                            You watched {lessonsWatched}/{totalLessonsThisWeek} lessons this week
                          </p>
                          <div className="progress-track">
                            <div
                              className="progress-fill"
                              style={{ width: `${(lessonsWatched / totalLessonsThisWeek) * 100}%` }}
                            />
                          </div>
                        </div>
                        <p className="text-zinc-600">
                          Curated YouTube lessons structured into a clear learning path.
                        </p>

                        <div className="class-modules scrollable">
                          <div className="progress-rail">
                          {curriculum.map((module, idx) => {
                            const isLocked =
                              module.module.includes("Scale") &&
                              effectiveTierLevel < 4 &&
                              !unlockedBonusModules;

                            return (
                              <div
                                key={idx}
                                className={`class-module ${isLocked ? "locked has-tooltip" : ""}`}
                                data-tooltip={isLocked ? "Upgrade to unlock this module" : undefined}
                                onClick={() => {
                                  if (isLocked) {
                                    setSelectedUpgradeTier(
                                      tiers.find(t => t.level > userTierLevel)
                                    );
                                    setShowUpgradePrompt(true);
                                  }
                                }}
                              >
                                <h3 className="text-lg font-medium">{module.module}</h3>
                                <p className="text-sm text-zinc-500">{module.description}</p>
                                <p className="text-xs text-zinc-500 mt-1">
                                  {Object.keys(completedLessons).filter(k => k.startsWith(module.module)).length}
                                  /{module.videos.length} lessons completed
                                </p>

                                <ul className="video-list">
                                  {module.videos.map((video, vIdx) => {
                                    const lessonKey = `${module.module}-${vIdx}`;
                                    const isDone = completedLessons[lessonKey];
                                    const isCurrent = lessonKey === currentLessonKey;
                                    return (
                                      <li
                                        key={vIdx}
                                        className={`video-item clickable ${isDone ? "done" : ""} ${isCurrent ? "current" : ""}`}
                                        onClick={() => {
                                          if (!hasAccess) {
                                            setSelectedUpgradeTier(tier);
                                            setShowUpgradePrompt(true);
                                            return;
                                          }
                                          setActiveLesson({ ...video, key: lessonKey });
                                        }}
                                      >
                                        <span>
                                          {video.title}
                                          {isDone && <span className="done-indicator"> ✓</span>}
                                          {isCurrent && <span className="current-indicator"> ← you are here</span>}
                                        </span>
                                        <button
                                          className={`watch-link ${!hasAccess ? "disabled" : ""}`}
                                          disabled={!hasAccess}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            if (!hasAccess) {
                                              setSelectedUpgradeTier(tier);
                                              setShowUpgradePrompt(true);
                                              return;
                                            }
                                            setActiveLesson({ ...video, key: lessonKey });
                                          }}
                                        >
                                          {hasAccess ? "Watch" : "Locked"}
                                        </button>
                                      </li>
                                    );
                                  })}
                                </ul>

                                {isLocked && (
                                  <p className="text-xs text-zinc-500 mt-2">
                                    🔒 Unlock via higher tier or invite a friend
                                  </p>
                                )}
                              </div>
                            );
                          })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </section>

      </main>

      {/* UPGRADE PROMPT MODAL */}
      {showUpgradePrompt && selectedUpgradeTier && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 className="text-lg font-semibold">
              Upgrade to {selectedUpgradeTier.name}
            </h3>
            <p className="text-sm text-zinc-600 mt-2">
              Unlock advanced entrepreneurship courses, live calls, and mentorship
              designed for operators at this stage.
            </p>

            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium">
                What you’ll unlock:
              </p>
              <ul className="text-sm text-zinc-600 list-disc list-inside">
                {getTierPreview(selectedUpgradeTier.level).map((module, idx) => (
                  <li key={idx}>{module.module}</li>
                ))}
              </ul>
            </div>

            <div className="modal-actions mt-6">
              <button
                className="secondary"
                onClick={() => {
                  setShowUpgradePrompt(false);
                  setSelectedUpgradeTier(null);
                }}
              >
                Not now
              </button>
              <button
                className="primary"
                onClick={() => {
                  // placeholder for payment / upgrade flow
                  alert(`Upgrade flow for ${selectedUpgradeTier.name}`);
                }}
              >
                Upgrade ({selectedUpgradeTier.price})
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

      {/* LESSON MODAL */}
      {activeLesson && (
        <div className="modal-overlay">
          <div className="modal large">
            <h3 className="text-lg font-semibold">{activeLesson.title}</h3>

            <div className="video-frame">
              <iframe
                src={`https://www.youtube.com/embed/${activeLesson.url?.split("v=")[1]}`}
                allowFullScreen
                title={activeLesson.title}
              />
            </div>

            <button
              className="primary mt-4"
              onClick={() => {
                setCompletedLessons(prev => ({
                  ...prev,
                  [activeLesson.key]: true,
                }));
                setLessonsWatched(l => Math.min(l + 1, totalLessonsThisWeek));
                setActiveLesson(null);
              }}
            >
              Mark as watched
            </button>
          </div>
        </div>
      )}
      {/* LIVE CALL REMINDER MODAL */}
      {showCallReminder && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 className="text-lg font-semibold">
              Live Session Not Started Yet
            </h3>

            <p className="text-sm text-zinc-600 mt-2">
              This live call will begin on{" "}
              <strong>{nextLiveCall.datetime}</strong>.
              Please come back at the scheduled time.
            </p>

            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium">Add to your calendar:</p>
              <div className="flex gap-3">
                <a
                  href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                    nextLiveCall.title
                  )}&details=${encodeURIComponent(
                    "Live mentorship session"
                  )}&dates=20260112T160000Z/20260112T170000Z`}
                  target="_blank"
                  rel="noreferrer"
                  className="secondary"
                >
                  Google Calendar
                </a>
                <a
                  href="/calendar/live-call.ics"
                  className="secondary"
                >
                  iCal / Outlook
                </a>
              </div>
            </div>

            <div className="modal-actions mt-6">
              <button
                className="primary"
                onClick={() => setShowCallReminder(false)}
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MENTOR REQUEST MODAL */}
      {showMentorRequest && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 className="text-lg font-semibold">
              Request to Become a Mentor
            </h3>

            <p className="text-sm text-zinc-600 mt-2">
              We host experienced operators in our live sessions. If you’ve built,
              scaled, or operated a meaningful business and would like to mentor
              others, apply below.
            </p>

            <div className="mt-4 space-y-3">
              <input
                type="text"
                placeholder="Full name"
                className="modal-input"
              />

              <input
                type="email"
                placeholder="Email address"
                className="modal-input"
              />

              <p className="text-xs text-zinc-500">
                This helps us match mentors to the right audience. Please select honestly.
              </p>
              <select className="modal-input">
                <option value="">Select your tier (based on annual revenue)</option>
                <option value="4">4‑Figure Entrepreneur ($1k+)</option>
                <option value="5">5‑Figure Entrepreneur ($10k+)</option>
                <option value="6">6‑Figure Entrepreneur ($100k+)</option>
                <option value="7">7‑Figure Entrepreneur ($1M+)</option>
                <option value="8">8‑Figure Entrepreneur ($10M+)</option>
                <option value="9">9‑Figure Entrepreneur ($100M+)</option>
                <option value="10">10‑Figure Entrepreneur ($1B+)</option>
                <option value="11">11‑Figure Entrepreneur ($10B+)</option>
              </select>

              <input
                type="text"
                placeholder="Company / Product (optional)"
                className="modal-input"
              />

              <input
                type="url"
                placeholder="LinkedIn / Website / Portfolio"
                className="modal-input"
              />

              <textarea
                rows={4}
                placeholder="Briefly describe your experience and what you could share with members"
                className="modal-textarea"
              />
            </div>

            <div className="modal-actions mt-6">
              <button
                className="secondary"
                onClick={() => setShowMentorRequest(false)}
              >
                Cancel
              </button>

              <button
                className="primary"
                onClick={() => {
                  alert("Mentor request submitted. We’ll be in touch.");
                  setShowMentorRequest(false);
                }}
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}