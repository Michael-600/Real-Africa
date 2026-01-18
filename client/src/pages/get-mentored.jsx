 
import React, { useState, useEffect } from "react";
import { supabase } from '../lib/supabase'
import AccountMenu from "../components/AccountMenu";
import NextLiveCallCard from "../components/NextLiveCallCard";
import { signUp } from '../lib/auth'
import { signIn } from '../lib/auth'


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
  // User state - replace hardcoded value
  const [currentUser, setCurrentUser] = useState(null)
  const [userTierLevel, setUserTierLevel] = useState(1) // Default to tier 1
  
  const hasCallAccess = nextLiveCall.tierRequired <= userTierLevel;
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);
  const [showTierDropdown, setShowTierDropdown] = useState(false);
  const [showCourses, setShowCourses] = useState(true);
  // Track which tiers are expanded (for preview)
  const [expandedTiers, setExpandedTiers] = useState(new Set([userTierLevel]));

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

  const [courses, setCourses] = useState([])
  const [coursesLoading, setCoursesLoading] = useState(true)
  const [coursesError, setCoursesError] = useState(null)
  useEffect(() => {
    async function loadCourses() {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          id,
          title,
          description,
          tier_level,
          modules (
            id,
            title,
            description,
            order_index,
            videos (
              id,
              title,
              youtube_url,
              order_index
            )
          )
        `)
        .order('tier_level')
        .order('order_index', { foreignTable: 'modules' })
        .order('order_index', { foreignTable: 'modules.videos' })

      if (error) {
        console.error('Error loading courses:', error)
        setCoursesError(error)
      } else {
        setCourses(data || [])
      }

      setCoursesLoading(false)
    }

    loadCourses()
  }, [])
  
  // Test Supabase connection
  useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabase.from('users').select('*').limit(1)
      if (error) {
        console.error('Supabase error:', error)
      } else {
        console.log('✅ Database connected! Users:', data)
      }
    }
    testConnection()
  }, [])

    // Check if user is logged in and fetch their tier
  useEffect(() => {
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        console.log('✅ User is logged in:', user.email)
        setCurrentUser(user)
        
        // Fetch user's tier from database
        const { data: userData, error } = await supabase
          .from('users')
          .select('tier_level')
          .eq('email', user.email)
          .single()
        
        if (error) {
          console.error('Error fetching user tier:', error)
          // If user doesn't exist in users table, create them
          const { data: newUser } = await supabase
            .from('users')
            .insert([{ email: user.email, name: user.user_metadata?.name || 'User', tier_level: 1 }])
            .select()
            .single()
          
          if (newUser) {
            setUserTierLevel(newUser.tier_level)
            console.log('✅ Created user in database with tier:', newUser.tier_level)
          }
        } else if (userData) {
          setUserTierLevel(userData.tier_level)
          console.log('✅ User tier loaded from database:', userData.tier_level)
        }
      } else {
        console.log('No user logged in')
        setCurrentUser(null)
        setUserTierLevel(1) // Reset to default
      }
    }
    checkUser()
  }, [])

  // Function to create a new user
  async function createUser(email, name, tierLevel = 1) {
    const { data, error } = await supabase
      .from('users')
      .insert([
        { email, name, tier_level: tierLevel }
      ])
      .select()
    
    if (error) {
      console.error('Error creating user:', error)
      return null
    } else {
      console.log('✅ User created:', data)
      return data[0]
    }
  }

  const effectiveTierLevel = previewTierLevel;

  // Helper to get courses for a tier from database
  const getCoursesForTier = (tierLevel) =>
    courses.filter(c => c.tier_level === tierLevel)

  // Helper: Extract YouTube ID from a URL
  function getYoutubeId(url) {
    const match = url?.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/
    )
    return match ? match[1] : null
  }

  // Progress helpers (global, single source of truth)
  const completedKeys = Object.keys(completedLessons);
  // For now, there are no lessons/videos in db courses (Phase 1)
  const allLessonKeys = [];
  const currentLessonKey = undefined;

  if (coursesLoading) {
    return <div className="p-8 text-zinc-500">Loading courses…</div>
  }

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
                        // Toggle expansion for locked tiers to show preview
                        if (isLocked) {
                          const newExpanded = new Set(expandedTiers);
                          if (newExpanded.has(tier.level)) {
                            newExpanded.delete(tier.level);
                          } else {
                            newExpanded.add(tier.level);
                          }
                          setExpandedTiers(newExpanded);
                          return;
                        }
                        // For unlocked tiers, set as active tier
                        setPreviewTierLevel(tier.level);
                        setShowCourses(true);
                        // Also track expansion
                        const newExpanded = new Set(expandedTiers);
                        if (newExpanded.has(tier.level)) {
                          newExpanded.delete(tier.level);
                        } else {
                          newExpanded.add(tier.level);
                        }
                        setExpandedTiers(newExpanded);
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

                      <span className="caret">
                        {expandedTiers.has(tier.level) ? "▴" : "▾"}
                      </span>
                    </div>
                    {/* Show lessons for current tier or preview for locked tiers when expanded */}
                    {expandedTiers.has(tier.level) && (
                      <div className="space-y-2 mt-4">
                        {/* Only show progress bar for current tier */}
                        {tier.level === effectiveTierLevel && (
                          <>
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
                          </>
                        )}

                        <div className={`class-modules scrollable ${isLocked ? "locked-tier-preview" : ""}`}>
                          <div className="progress-rail">
                          {/* Use DB courses for this tier */}
                          {getCoursesForTier(tier.level).map((course) => {
                            const moduleIsLocked = isLocked;
                            return (
                              <div
                                key={course.id}
                                className={`class-module ${moduleIsLocked ? "locked has-tooltip" : ""} ${isLocked ? "locked-preview" : ""}`}
                                data-tooltip={moduleIsLocked ? "Upgrade to unlock this module" : undefined}
                                onClick={() => {
                                  if (moduleIsLocked) {
                                    setSelectedUpgradeTier(tier);
                                    setShowUpgradePrompt(true);
                                  }
                                }}
                                style={{
                                  opacity: moduleIsLocked ? 0.85 : 1,
                                  cursor: moduleIsLocked ? "pointer" : "default",
                                }}
                              >
                                <h3 className="text-lg font-medium">{course.title}</h3>
                                <p className="text-sm text-zinc-500">{course.description}</p>
                                {/* Render modules and videos */}
                                {course.modules?.map(module => (
                                  <div key={module.id} className="mt-3 pl-3 border-l">
                                    <p className="text-sm font-medium">{module.title}</p>
                                    <p className="text-xs text-zinc-500">{module.description}</p>

                                    <ul className="mt-2 space-y-1">
                                      {module.videos?.map(video => (
                                        <li
                                          key={video.id}
                                          className="video-item clickable"
                                          onClick={() =>
                                            setActiveLesson({
                                              id: video.id,
                                              title: video.title,
                                              url: video.youtube_url
                                            })
                                          }
                                        >
                                          ▶ {video.title}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                                {moduleIsLocked && (
                                  <p className="text-xs text-zinc-500 mt-2">
                                    🔒 Upgrade to unlock this module
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