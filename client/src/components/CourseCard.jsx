// components/CourseCard.jsx
import React from "react";
import ProgressBar from "./ProgressBar";
import "./courses.css";

export default function CourseCard({
  course,
  userTierLevel,
  progressPercent,
  nextLessonTitle,
  isLocked,
  onOpenCourse,     // unlocked action
  onOpenUpgrade,    // locked action
}) {
  const handleClick = () => {
    if (isLocked) onOpenUpgrade?.(course);
    else onOpenCourse?.(course);
  };

  return (
    <article
      className={`cc ${isLocked ? "cc--locked" : ""}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
      aria-label={isLocked ? `Locked course: ${course.title}` : `Open course: ${course.title}`}
      title={isLocked ? "Preview available – upgrade to unlock" : undefined}
    >
      {/* HERO */}
      <div className="cc__hero">
        <div className="cc__heroLeft">
          <p className="cc__headline">{course.heroHeadline}</p>
          <div className="cc__tierRow">
            <span className="cc__tierBadge">Tier {course.tier_level}</span>
            {isLocked ? (
              <span className="cc__lockPill" aria-label="Locked">
                🔒 Locked
              </span>
            ) : (
              <span className="cc__accessPill" aria-label="Unlocked">
                ✓ Unlocked
              </span>
            )}
          </div>
        </div>

        <div className="cc__heroRight">
          <img
            className="cc__avatar"
            src={course.instructor.avatarUrl}
            alt={`${course.instructor.name} portrait`}
            onError={(e) => {
              // simple fallback (optional)
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="cc__pinkAccent" aria-hidden="true" />
          <div className="cc__pinkAccent2" aria-hidden="true" />
        </div>
      </div>

      {/* DETAILS */}
      <div className="cc__details">
        <h3 className="cc__title">
          {course.title} {isLocked ? <span className="cc__lockIcon">🔒</span> : null}
        </h3>

        <p className="cc__meta">Course • By <strong>{course.instructor.name}</strong></p>

        <p className="cc__next">
          Next lesson:{" "}
          <strong>{isLocked ? "Preview only" : (nextLessonTitle || "All done")}</strong>
        </p>

        <ProgressBar value={progressPercent} disabled={isLocked} />
      </div>

      {/* CTA */}
      <div className="cc__cta">
        <button
          className={`btn ${isLocked ? "btn--outline" : "btn--primary"} btn--full`}
          onClick={(e) => {
            e.stopPropagation(); // keep “card click” behavior deterministic
            handleClick();
          }}
        >
          {isLocked ? "🔒 Upgrade to Unlock" : "View content"}
        </button>

        {/* Small helper text (optional, but feels premium) */}
        <p className="cc__footnote">
          Your tier: <strong>{userTierLevel}</strong>
        </p>
      </div>
    </article>
  );
}