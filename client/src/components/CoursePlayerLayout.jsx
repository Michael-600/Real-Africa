// components/CoursePlayerLayout.jsx
import React, { useMemo } from "react";
import LessonListItem from "./LessonListItem";
import "./courses.css";

function getYoutubeId(url) {
  const match = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
  return match ? match[1] : null;
}

export default function CoursePlayerLayout({
  course,
  completedLessonIds,
  activeLessonId,
  onSelectLesson,
  onCompleteAndContinue,
}) {
  const lessons = course?.lessons ?? [];

  const progress = useMemo(() => {
    const total = lessons.length;
    const watched = lessons.reduce((acc, l) => acc + (completedLessonIds.has(l.id) ? 1 : 0), 0);
    const percent = total === 0 ? 0 : Math.round((watched / total) * 100);
    return { total, watched, percent };
  }, [lessons, completedLessonIds]);

  const activeLesson =
    lessons.find((l) => l.id === activeLessonId) || lessons[0] || null;

  const youtubeId = getYoutubeId(activeLesson?.videoUrl);

  return (
    <div className="cp">
      {/* Sidebar */}
      <aside className="cp__sidebar">
        <div className="cp__courseInfo">
          <h2 className="cp__courseTitle">{course.title}</h2>
          <p className="cp__courseMeta">By <strong>{course.instructor.name}</strong></p>

          <div className="cp__progressBox">
            <p className="cp__progressText">
              <strong>{progress.percent}%</strong> complete
            </p>
            <div className="cp__progressTrack" aria-hidden="true">
              <div className="cp__progressFill" style={{ width: `${progress.percent}%` }} />
            </div>
            <p className="cp__progressSub">
              {progress.watched}/{progress.total} lessons completed
            </p>
          </div>
        </div>

        <div className="cp__lessonList">
          <p className="cp__sectionTitle">Lessons</p>
          {lessons.map((lesson) => (
            <LessonListItem
              key={lesson.id}
              lesson={lesson}
              isActive={lesson.id === activeLesson?.id}
              isCompleted={completedLessonIds.has(lesson.id)}
              onSelect={() => onSelectLesson?.(lesson.id)}
            />
          ))}
        </div>
      </aside>

      {/* Main */}
      <main className="cp__main">
        <div className="cp__mainHeader">
          <h1 className="cp__lessonTitle">{activeLesson?.title || "No lesson selected"}</h1>
        </div>

        <div className="cp__player">
          {youtubeId ? (
            <iframe
              className="cp__iframe"
              src={`https://www.youtube.com/embed/${youtubeId}`}
              allowFullScreen
              title={activeLesson?.title || "Lesson video"}
            />
          ) : (
            <div className="cp__noVideo">
              Video unavailable (placeholder).
            </div>
          )}
        </div>

        <button
          className="btn btn--primary btn--pill"
          onClick={onCompleteAndContinue}
          disabled={!activeLesson}
        >
          Complete and Continue
        </button>
      </main>
    </div>
  );
}