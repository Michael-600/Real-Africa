// components/LessonListItem.jsx
import React from "react";
import "./courses.css";

export default function LessonListItem({
  lesson,
  isActive,
  isCompleted,
  onSelect,
}) {
  return (
    <button
      className={`lli ${isActive ? "lli--active" : ""}`}
      onClick={onSelect}
      aria-label={`Lesson: ${lesson.title}`}
    >
      <div className="lli__left">
        <span className={`lli__dot ${isCompleted ? "lli__dot--done" : ""}`} aria-hidden="true" />
        <span className="lli__title">{lesson.title}</span>
      </div>

      <div className="lli__right">
        {isCompleted ? <span className="lli__badge">Done</span> : <span className="lli__badge lli__badge--muted">Up next</span>}
      </div>
    </button>
  );
}