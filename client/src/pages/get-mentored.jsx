 import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { supabase } from '../lib/supabase'
import { useAuth } from "../lib/authContext";
import NextLiveCallCard from "../components/NextLiveCallCard";


/**
 * MOCK ACCESS LEVEL
 * 1 = 5-figure
 * 2 = 6-figure
 * ...
 * 7 = 11+ figure
 */
// userTierLevel is now stored in state (see component below)

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

// ---------------------------------
// COURSES EXPERIENCE (NEW ROUTES)
// /courses and /courses/:courseId
// ---------------------------------

const PINK = "#ff2aa6";

function ProgressBar({ percent = 0, disabled = false }) {
  const clamped = Math.max(0, Math.min(100, Number(percent) || 0));
  return (
    <div className={`course-progress ${disabled ? "is-disabled" : ""}`}>
      <div className="course-progress-track">
        <div
          className="course-progress-fill"
          style={{ width: `${disabled ? 0 : clamped}%` }}
        />
      </div>
      <div className="course-progress-meta">
        <span>{disabled ? "Preview" : `${clamped}% complete`}</span>
      </div>
    </div>
  );
}

function UpgradeModal({ open, requiredTier, onClose, onUpgrade }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold">Upgrade to unlock this course</h3>
        <p className="text-sm text-zinc-600 mt-2">
          This course requires <strong>{requiredTier?.name || `Tier ${requiredTier?.level ?? ""}`}</strong>.
        </p>

        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium">What you’ll unlock:</p>
          <ul className="text-sm text-zinc-600 list-disc list-inside">
            <li>Full lesson library</li>
            <li>Progress tracking</li>
            <li>Resources and notes</li>
          </ul>
        </div>

        <div className="modal-actions mt-6">
          <button className="secondary" onClick={onClose}>Not now</button>
          <button className="primary" onClick={onUpgrade}>
            Upgrade{requiredTier?.price ? ` (${requiredTier.price})` : ""}
          </button>
        </div>
      </div>
    </div>
  );
}

function getInitialsForInstructor(name) {
  const str = String(name || "").trim();
  if (!str) return "IN";
  const parts = str.split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] || "I";
  const last = (parts.length > 1 ? parts[parts.length - 1]?.[0] : "N") || "N";
  return (first + last).toUpperCase();
}

function flattenLessons(course) {
  const out = [];
  (course?.modules || []).forEach((m) => {
    (m?.videos || []).forEach((v) => {
      out.push({
        ...v,
        moduleId: m.id,
        moduleTitle: m.title,
      });
    });
  });
  return out;
}

function computeCourseProgress(course, completedMap) {
  const lessons = flattenLessons(course);
  const total = lessons.length;
  const watched = lessons.reduce((acc, l) => acc + (completedMap?.[l.id] ? 1 : 0), 0);
  const percent = total === 0 ? 0 : Math.round((watched / total) * 100);
  const next = lessons.find((l) => !completedMap?.[l.id]) || null;
  return { lessons, total, watched, percent, next };
}

function CourseCardV2({ course, instructorName, userTierLevel, tiers, onOpenPlayer, onOpenUpgrade, completedMap }) {
  const tierLevel = course?.tier_level ?? 0;
  const isLocked = tierLevel > (userTierLevel ?? 0);
  const requiredTier = tiers.find((t) => t.level === tierLevel) || { level: tierLevel, name: `Tier ${tierLevel}`, price: "" };

  const progress = computeCourseProgress(course, completedMap);
  const headline = course?.description || "Comprehensive course for undergrads.";
  const nextTitle = isLocked ? "Preview only" : (progress.next?.title || (progress.total === 0 ? "No lessons yet" : "All done"));

  return (
    <div className={`course-card ${isLocked ? "is-locked" : ""}`}>
      <div className="course-hero">
        <div className="course-hero-left">
          <p className="course-hero-headline">{headline}</p>
        </div>
        <div className="course-hero-right">
          <div className="course-instructor-thumb" aria-label="Instructor thumbnail">
            {getInitialsForInstructor(instructorName)}
          </div>
        </div>
      </div>

      <div className="course-body">
        <div className="course-title-row">
          <h3 className="course-title">
            {course?.title || "Untitled course"}
            {isLocked ? <span className="course-lock">🔒</span> : null}
          </h3>
          <span className="course-tier">Tier {tierLevel}</span>
        </div>

        <p className="course-meta">Course • By {instructorName}</p>

        <p className="course-next">
          Next lesson: <strong>{nextTitle}</strong>
        </p>

        <ProgressBar percent={progress.percent} disabled={isLocked} />
      </div>

      <div className="course-cta-wrap">
        <button
          className={`course-cta ${isLocked ? "is-outline" : ""}`}
          onClick={() => {
            if (isLocked) return onOpenUpgrade(requiredTier);
            onOpenPlayer(course.id);
          }}
          style={{
            background: isLocked ? "white" : PINK,
            color: isLocked ? PINK : "white",
            border: isLocked ? `1px solid ${PINK}` : "1px solid transparent",
          }}
        >
          {isLocked ? "🔒 Upgrade to Unlock" : "View content"}
        </button>
      </div>
    </div>
  );
}

export function CoursesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, loading } = useAuth();

  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [coursesError, setCoursesError] = useState(null);

  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [upgradeTier, setUpgradeTier] = useState(null);

  // course progress stored per user in localStorage
  const completedKey = `course_completed_${profile?.id || "anon"}`;
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(completedKey) || "{}") || {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    if (!profile?.id) return;
    try {
      localStorage.setItem(completedKey, JSON.stringify(completedLessons));
    } catch {}
  }, [completedLessons, completedKey, profile?.id]);

  useEffect(() => {
    let cancelled = false;

    async function loadCourses() {
      try {
        setCoursesLoading(true);
        const { data, error } = await supabase
          .from("courses")
          .select(`
            id,
            title,
            description,
            tier_level,
            instructor_name,
            modules (
              id,
              title,
              description,
              videos (
                id,
                title,
                youtube_url
              )
            )
          `);
        if (error) throw error;
        if (!cancelled) setCourses(data || []);
      } catch (err) {
        console.error("Failed to load courses:", err);
        if (!cancelled) setCoursesError(err);
      } finally {
        if (!cancelled) setCoursesLoading(false);
      }
    }

    loadCourses();
    return () => { cancelled = true; };
  }, []);

  // If redirected back here with a required tier, open the upgrade prompt automatically.
  useEffect(() => {
    const stateTier = location?.state?.upgradeTier || null;
    if (stateTier) {
      setUpgradeTier(stateTier);
      setUpgradeOpen(true);
      // clear state so refresh doesn't re-open
      navigate("/courses", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div className="p-8 text-zinc-500">Loading…</div>;
  if (!profile) return <div className="p-8 text-red-500">Please sign in to view courses.</div>;
  if (coursesLoading) return <div className="p-8 text-zinc-500">Loading courses…</div>;

  const userTierLevel = profile?.tier_level ?? 0;
  const sorted = (courses || []).slice().sort((a, b) => (a?.tier_level ?? 0) - (b?.tier_level ?? 0));

  return (
    <div className="courses-page">
      <div className="courses-header">
        <h1>Courses</h1>
        <p>Pick a course and keep your progress synced.</p>
      </div>

      {coursesError ? (
        <div className="p-6 bg-white rounded-xl shadow">Failed to load courses.</div>
      ) : null}

      <div className="courses-grid">
        {sorted.map((course) => (
          <CourseCardV2
            key={course.id}
            course={course}
            instructorName={course?.instructor_name || "Real Africa"}
            userTierLevel={userTierLevel}
            tiers={tiers}
            completedMap={completedLessons?.[course.id] || {}}
            onOpenPlayer={(courseId) => navigate(`/courses/${courseId}`)}
            onOpenUpgrade={(requiredTier) => {
              setUpgradeTier(requiredTier);
              setUpgradeOpen(true);
            }}
          />
        ))}
      </div>

      <UpgradeModal
        open={upgradeOpen}
        requiredTier={upgradeTier}
        onClose={() => {
          setUpgradeOpen(false);
          setUpgradeTier(null);
        }}
        onUpgrade={() => {
          alert(`Upgrade flow for ${upgradeTier?.name || "selected tier"}`);
        }}
      />
    </div>
  );
}

export function CoursePlayerPage() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { profile, loading } = useAuth();

  const [course, setCourse] = useState(null);
  const [courseLoading, setCourseLoading] = useState(true);

  const [activeLessonId, setActiveLessonId] = useState(null);

  const completedKey = `course_completed_${profile?.id || "anon"}`;
  const [completedAll, setCompletedAll] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(completedKey) || "{}") || {};
    } catch {
      return {};
    }
  });

  const completedForCourse = completedAll?.[courseId] || {};

  useEffect(() => {
    if (!profile?.id) return;
    try {
      localStorage.setItem(completedKey, JSON.stringify(completedAll));
    } catch {}
  }, [completedAll, completedKey, profile?.id]);

  useEffect(() => {
    let cancelled = false;

    async function loadCourse() {
      try {
        setCourseLoading(true);
        const { data, error } = await supabase
          .from("courses")
          .select(`
            id,
            title,
            description,
            tier_level,
            instructor_name,
            modules (
              id,
              title,
              description,
              videos (
                id,
                title,
                youtube_url
              )
            )
          `)
          .eq("id", courseId)
          .single();

        if (error) throw error;
        if (!cancelled) setCourse(data || null);
      } catch (err) {
        console.error("Failed to load course:", err);
        if (!cancelled) setCourse(null);
      } finally {
        if (!cancelled) setCourseLoading(false);
      }
    }

    if (courseId) loadCourse();
    return () => { cancelled = true; };
  }, [courseId]);

  if (loading) return <div className="p-8 text-zinc-500">Loading…</div>;
  if (!profile) return <div className="p-8 text-red-500">Please sign in to view courses.</div>;
  if (courseLoading) return <div className="p-8 text-zinc-500">Loading course…</div>;

  if (!course) {
    return (
      <div className="p-8">
        <p className="text-zinc-600">Course not found.</p>
        <button className="primary mt-4" onClick={() => navigate("/courses")}>Back to courses</button>
      </div>
    );
  }

  const userTierLevel = profile?.tier_level ?? 0;
  const isLocked = (course?.tier_level ?? 0) > userTierLevel;

  if (isLocked) {
    const required = tiers.find((t) => t.level === (course?.tier_level ?? 0)) || { level: course?.tier_level ?? 0, name: `Tier ${course?.tier_level ?? 0}`, price: "" };
    navigate("/courses", { state: { upgradeTier: required }, replace: true });
    return null;
  }

  const progress = computeCourseProgress(course, completedForCourse);

  // set a default lesson (first incomplete, else first)
  const currentLesson = (() => {
    const found = progress.lessons.find((l) => l.id === activeLessonId) || null;
    if (found) return found;
    const firstIncomplete = progress.lessons.find((l) => !completedForCourse?.[l.id]) || null;
    return firstIncomplete || progress.lessons[0] || null;
  })();

  const currentIndex = currentLesson ? progress.lessons.findIndex((l) => l.id === currentLesson.id) : -1;
  const prevLesson = currentIndex > 0 ? progress.lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex >= 0 ? (progress.lessons[currentIndex + 1] || null) : null;

  const markCompleteAndContinue = () => {
    if (!currentLesson) return;
    setCompletedAll((prev) => {
      const copy = { ...(prev || {}) };
      const perCourse = { ...(copy[courseId] || {}) };
      perCourse[currentLesson.id] = true;
      copy[courseId] = perCourse;
      return copy;
    });

    if (nextLesson) {
      setActiveLessonId(nextLesson.id);
    }
  };

  return (
    <div className="course-player-page">
      <div className="course-player-layout">
        <aside className="course-sidebar">
          <div className="course-sidebar-top">
            <p className="course-sidebar-title">{course.title}</p>
            <p className="course-sidebar-progress">{progress.percent}% complete</p>
            <div className="course-sidebar-bar">
              <div className="course-sidebar-bar-fill" style={{ width: `${progress.percent}%`, background: PINK }} />
            </div>
          </div>

          <div className="course-lessons">
            {(course.modules || []).map((m) => (
              <div key={m.id} className="course-module">
                <p className="course-module-title">{m.title}</p>
                <div className="course-module-lessons">
                  {(m.videos || []).map((v) => {
                    const isDone = !!completedForCourse?.[v.id];
                    const isActive = currentLesson?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        className={`lesson-item ${isActive ? "is-active" : ""}`}
                        onClick={() => setActiveLessonId(v.id)}
                      >
                        <span className="lesson-left">
                          {isDone ? "✓" : "•"}
                        </span>
                        <span className="lesson-title">{v.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main className="course-main">
          <div className="course-main-header">
            <div>
              <p className="course-main-kicker">Course • By {course?.instructor_name || "Real Africa"}</p>
              <h2 className="course-main-title">{currentLesson?.title || "Select a lesson"}</h2>
            </div>

            <div className="course-main-actions">
              <button
                className="secondary"
                disabled={!prevLesson}
                onClick={() => prevLesson && setActiveLessonId(prevLesson.id)}
              >
                Previous lesson
              </button>
              <button
                className="course-pink"
                onClick={markCompleteAndContinue}
                disabled={!currentLesson}
              >
                Complete and Continue
              </button>
            </div>
          </div>

          <div className="course-video">
            {currentLesson?.youtube_url ? (
              <iframe
                src={`https://www.youtube.com/embed/${(currentLesson.youtube_url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/) || [])[1] || ""}`}
                allowFullScreen
                title={currentLesson.title}
              />
            ) : (
              <div className="course-video-placeholder">No video URL for this lesson yet.</div>
            )}
          </div>

          <div className="course-notes">
            <h3>Notes & resources</h3>
            <p>
              Add lesson notes, PDFs, links, and resources here. This section can be generated per lesson later.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}


// -----------------------------
// PAGE
// -----------------------------
export default function GetMentoredPage() {
  // -----------------------------
  // ALL HOOKS FIRST
  // -----------------------------
  const navigate = useNavigate();
  // Remove hasMockCommunity state and effect.

  const { profile, loading } = useAuth();


  // Prevent duplicate guard logic runs (React Strict Mode can double-run effects in dev)
  const authResolvedOnce = useRef(false);

  // TEMPORARY community membership check
  // Replace this with real membership data when available
  let joined = [];
  try {
    joined = JSON.parse(localStorage.getItem("joined_communities") || "[]");
    if (!Array.isArray(joined)) joined = [];
  } catch (e) {
    joined = [];
  }

  const isInCommunity =
    joined.length > 0 ||
    (profile?.communities && profile.communities.length > 0);

  // Enforce: must be in a community before accessing mentorship

  useEffect(() => {
    if (loading) return;
    if (!profile) return;
    if (authResolvedOnce.current) return;

    if (!isInCommunity) {
      authResolvedOnce.current = true;
      navigate("/communities", { state: { from: "mentored" } });
    }
  }, [loading, profile, isInCommunity, navigate]);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);
  const [showTierDropdown, setShowTierDropdown] = useState(false);
  const [showCourses, setShowCourses] = useState(true);
  const [expandedTiers, setExpandedTiers] = useState(new Set());

  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const [selectedUpgradeTier, setSelectedUpgradeTier] = useState(null);

  const [previewTierLevel, setPreviewTierLevel] = useState(null);

  const [activeLesson, setActiveLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState({});
  const [openCourseId, setOpenCourseId] = useState(null);

  const [lessonsWatched, setLessonsWatched] = useState(2);
  const totalLessonsThisWeek = 5;

  const [referrals, setReferrals] = useState(1);

  const [showCallReminder, setShowCallReminder] = useState(false);
  const [showMentorRequest, setShowMentorRequest] = useState(false);

  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [coursesError, setCoursesError] = useState(null);
  
  useEffect(() => {
    let cancelled = false;
  
    async function loadCourses() {
      try {
        setCoursesLoading(true);
  
        const { data, error } = await supabase
          .from("courses")
          .select(`
            id,
            title,
            description,
            tier_level,
            modules (
              id,
              title,
              description,
              videos (
                id,
                title,
                youtube_url
              )
            )
          `);
  
        if (error) throw error;
        if (!cancelled) setCourses(data || []);
      } catch (err) {
        console.error("Failed to load courses:", err);
        if (!cancelled) setCoursesError(err);
      } finally {
        if (!cancelled) setCoursesLoading(false);
      }
    }
  
    loadCourses();
    return () => { cancelled = true };
  }, []);
  

  console.log("RENDER", {
    loading,
    profileExists: !!profile,
    coursesLoading,
    tier: profile?.tier_level,
  });

  console.log("GUARD CHECK", {
    loading,
    profile,
    coursesLoading,
  });

  if (loading) {
    return <div>Loading session…</div>;
  }
  
  if (!profile) {
    return (
      <div className="p-8 text-red-500">
        Profile not loaded. Please refresh or re-login.
      </div>
    );
  }

  if (coursesLoading) {
    return <div className="p-8 text-zinc-500">Loading courses…</div>;
  }

  if (!loading && profile && !isInCommunity) {
    return (
      <div className="mentorship-gate">
        <div className="mentorship-gate-card">
          <h2>Join a community to continue</h2>
          <p>
            Mentorship is available only to members of a community.
            Join a community to unlock this feature.
          </p>
          <button
            onClick={() =>
              navigate("/communities", { state: { from: "mentored" } })
            }
          >
            Browse communities
          </button>
        </div>
      </div>
    );
  }

  const effectiveTierLevel =
    previewTierLevel ?? profile.tier_level;

  const hasCallAccess =
    nextLiveCall.tierRequired <= profile.tier_level;

  // Helper to get courses for a tier from database
  const getCoursesForTier = (tierLevel) =>
    courses
      .filter((c) => (c?.tier_level ?? 0) <= tierLevel)
      .sort((a, b) => (a.tier_level ?? 0) - (b.tier_level ?? 0));

  // Helper: Extract YouTube ID from a URL
  function getYoutubeId(url) {
    const match = url?.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/
    )
    return match ? match[1] : null
  }

  function flattenCourseVideos(course) {
    const videos = [];
    (course?.modules || []).forEach((m) => {
      (m?.videos || []).forEach((v) => videos.push(v));
    });
    return videos;
  }
  
  function getCourseProgress(course, completedLessonsMap) {
    const videos = flattenCourseVideos(course);
    const total = videos.length;
  
    const watched = videos.reduce(
      (acc, v) => acc + (completedLessonsMap?.[v.id] ? 1 : 0),
      0
    );
  
    const percent = total === 0 ? 0 : Math.round((watched / total) * 100);
    const next = videos.find((v) => !completedLessonsMap?.[v.id]) || null;
  
    return { total, watched, percent, next };
  }

  function getInitials(text) {
    const str = String(text || "").trim();
    if (!str) return "C";
    const parts = str.split(/\s+/).filter(Boolean);
    const first = parts[0]?.[0] || "C";
    const last = (parts.length > 1 ? parts[parts.length - 1]?.[0] : "") || "";
    return (first + last).toUpperCase();
  }

  // Progress helpers (global, single source of truth)
  const completedKeys = Object.keys(completedLessons);
  // For now, there are no lessons/videos in db courses (Phase 1)
  const allLessonKeys = [];
  const currentLessonKey = undefined;
  const hasFreeMonth = referrals >= 3;
  // Show ALL courses (locked courses remain visible and previewable)
  const coursesSorted = (courses || [])
  .slice()
  .sort((a, b) => (a?.tier_level ?? 0) - (b?.tier_level ?? 0));
  
  return (
    <div className="get-mentored-page">
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
                {tiers.find(t => t.level === profile.tier_level)?.name}
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
          {/* Test button - remove this later 
          <button
            className="primary mt-4"
            onClick={() => {
              const randomId = Math.random().toString(36).substring(7)
              createUser(`test-${randomId}@example.com`, `Test User ${randomId}`, 3)
            }}
          >
            Test: Create User
          </button>*/}
                    {/* Test auth button - remove this later
                    <button
            className="primary mt-4"
            onClick={async () => {
              const randomId = Math.random().toString(36).substring(7)
              const result = await signUp(
                `test-${randomId}@gmail.com`,
                'password123',
                `Test User ${randomId}`
              )
              if (result.error) {
                console.error('Sign up failed:', result.error)
              } else {
                console.log('✅ User signed up!', result.data)
              }
            }}
          >
            Test: Sign Up
          </button>*/}
                    {/* Test sign in button - remove this later
                    <button
            className="primary mt-4 ml-2"
            onClick={async () => {
              // Use an email from a user you already created
              const result = await signIn('test-h6wat@gmail.com', 'password123')
              if (result.error) {
                console.error('Sign in failed:', result.error)
              } else {
                console.log('✅ User signed in!', result.data.user.email)
              }
            }}
          >
            Test: Sign In
          </button> */}
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
                const isLocked = tier.level > profile.tier_level;

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

        <NextLiveCallCard
            nextLiveCall={nextLiveCall}
            tiers={tiers}
            hasCallAccess={hasCallAccess}
            onJoinCall={() => {
              if (!hasCallAccess) return;
              setShowCallReminder(true);
            }}
            onRequestMentor={() => setShowMentorRequest(true)}
          />

<section className="class-section scroll-container">
  <p className="text-sm text-zinc-500">
    You currently have access up to{" "}
    <strong>{tiers.find(t => t.level === profile.tier_level)?.name}</strong> ·
    Locked courses are previewable.
  </p>

  {coursesSorted.length === 0 ? (
    <div className="p-8 text-zinc-500">No courses found yet.</div>
  ) : (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 16,
        marginTop: 16,
      }}
    >
      {coursesSorted.map((course) => {
        const tierLevel = course?.tier_level ?? 0;
        const isLocked = tierLevel > (profile?.tier_level ?? 0);
        const requiredTier = tiers.find((t) => t.level === tierLevel) || null;

        const progress = getCourseProgress(course, completedLessons);
        const percent = isLocked ? 0 : progress.percent;
        const nextTitle = isLocked
          ? "Preview only"
          : (progress.next?.title ||
              (progress.total === 0 ? "No lessons yet" : "All done"));

        

        const openUpgrade = () => {
          setSelectedUpgradeTier(
            requiredTier || { level: tierLevel, name: `Tier ${tierLevel}`, price: "" }
          );
          setShowUpgradePrompt(true);
        };

        return (
          <div
            key={course.id}
            onClick={() => (isLocked ? openUpgrade() : navigate(`/courses/${course.id}`))}
            style={{
              background: "white",
              borderRadius: 20,
              boxShadow: "0 12px 30px rgba(15,23,42,0.10)",
              border: "1px solid rgba(15,23,42,0.10)",
              overflow: "hidden",
              cursor: "pointer",
              opacity: isLocked ? 0.88 : 1,
              display: "flex",
              flexDirection: "column",
              minHeight: 340,
            }}
            title={isLocked ? "Preview available – upgrade to unlock" : undefined}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                isLocked ? openUpgrade() : navigate(`/courses/${course.id}`);
              }
            }}
          >
            {/* HERO */}
            <div
              style={{
                padding: 18,
                display: "grid",
                gridTemplateColumns: "1.2fr 0.8fr",
                gap: 12,
                background:
                  "radial-gradient(900px 220px at 0% 0%, rgba(250, 204, 21, 0.18), transparent 60%), white",
              }}
            >
              <div>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 800, lineHeight: 1.25 }}>
                  {course?.description || "Comprehensive course for undergrads."}
                </p>

                <div style={{ display: "flex", gap: 10, marginTop: 10, alignItems: "center" }}>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      padding: "6px 10px",
                      borderRadius: 999,
                      background: "rgba(15,23,42,0.04)",
                      border: "1px solid rgba(15,23,42,0.10)",
                    }}
                  >
                    Tier {tierLevel}
                  </span>

                  {isLocked ? (
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        padding: "6px 10px",
                        borderRadius: 999,
                        background: "rgba(250, 204, 21, 0.18)",
                        color: "#a16207",
                        border: "1px solid rgba(250, 204, 21, 0.35)",
                      }}
                    >
                      🔒 Locked
                    </span>
                  ) : (
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        padding: "6px 10px",
                        borderRadius: 999,
                        background: "rgba(34,197,94,0.10)",
                        color: "#16a34a",
                        border: "1px solid rgba(34,197,94,0.25)",
                      }}
                    >
                      ✓ Unlocked
                    </span>
                  )}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", position: "relative" }}>
                <div
                  style={{
                    width: 74,
                    height: 74,
                    borderRadius: 18,
                    background: "rgba(250, 204, 21, 0.18)",
                    border: "1px solid rgba(250, 204, 21, 0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    color: "#0f172a",
                    boxShadow: "0 12px 22px rgba(15,23,42,0.12)",
                    userSelect: "none",
                  }}
                >
                  {getInitials(course?.title)}
                </div>

                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    right: -26,
                    top: -18,
                    width: 90,
                    height: 90,
                    borderRadius: 999,
                    background: "rgba(250, 204, 21, 0.18)",
                  }}
                />
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    right: 12,
                    bottom: -30,
                    width: 70,
                    height: 70,
                    borderRadius: 999,
                    background: "rgba(250, 204, 21, 0.18)",
                  }}
                />
              </div>
            </div>

            {/* DETAILS */}
            <div style={{ padding: "16px 18px 10px", flex: 1 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, letterSpacing: "-0.01em" }}>
                {course?.title || "Untitled course"} {isLocked ? <span style={{ fontSize: 14 }}>🔒</span> : null}
              </h3>

              <p style={{ margin: "8px 0 10px", color: "#64748b", fontSize: 13 }}>
                Course • Tier {tierLevel}
              </p>

              <p style={{ margin: "0 0 10px", fontSize: 13, color: "#334155" }}>
                Next lesson: <strong>{nextTitle}</strong>
              </p>

              <div style={{ marginTop: 10 }}>
                <div
                  style={{
                    height: 10,
                    borderRadius: 999,
                    background: "rgba(15,23,42,0.10)",
                    overflow: "hidden",
                  }}
                >
                <div
                  style={{
                    height: "100%",
                    width: `${percent}%`,
                    borderRadius: 999,
                    background: "#facc15",
                    transition: "width 160ms ease",
                  }}
                />
                </div>
                <p style={{ margin: "8px 0 0", fontSize: 12, color: "#64748b" }}>
                  {isLocked ? "Preview" : `${percent}% complete`}
                </p>
              </div>
            </div>

            {/* CTA */}
            <div
              style={{
                padding: "12px 18px 18px",
                borderTop: "1px solid rgba(15,23,42,0.06)",
              }}
            >
              <button
                style={{
                  width: "100%",
                  borderRadius: 14,
                  padding: "12px 14px",
                  fontWeight: 800,
                  background: isLocked ? "white" : "#18181b",
                  color: isLocked ? "#a16207" : "white",
                  border: isLocked ? "1px solid rgba(250, 204, 21, 0.55)" : "1px solid transparent",
                  boxShadow: isLocked ? "none" : "0 10px 22px rgba(24,24,27,0.25)",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  isLocked ? openUpgrade() : navigate(`/courses/${course.id}`);
                }}
              >
                {isLocked ? "🔒 Upgrade to Unlock" : "View content"}
              </button>

              {/* Inline content (unlocked only) */}
              
            </div>
          </div>
        );
      })}
    </div>
  )}
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
                {getCoursesForTier(selectedUpgradeTier.level).map((course) => (
                  <li key={course.id}>{course.title}</li>
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
                src={`https://www.youtube.com/embed/${getYoutubeId(activeLesson.url)}`}
                allowFullScreen
                title={activeLesson.title}
              />
            </div>

            <button
              className="primary mt-4"
              onClick={() => {
                setCompletedLessons(prev => ({
                  ...prev,
                  [activeLesson.id]: true,
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