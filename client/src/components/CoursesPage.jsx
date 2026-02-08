// pages/CoursesPage.jsx
import React, { useMemo, useState } from "react";
import CourseCard from "../components/CourseCard";
import UpgradeModal from "../components/UpgradeModal";
import { placeholderCourses, canAccessCourse, courseProgress } from "../data/placeholderCourses";
import "./courses.css";

export default function CoursesPage() {
  // Example: user tier from auth/profile
  const user_tier_level = 2;

  // Track completion (Set of lesson IDs per course).
  // Real app: store per-course/per-user in DB.
  const [completedByCourse, setCompletedByCourse] = useState(() => ({
    c1: new Set(["l1"]), // watched 1 lesson in course c1
    c2: new Set([]),
    c3: new Set([]),
  }));

  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [upgradeCourse, setUpgradeCourse] = useState(null);

  const onOpenUpgrade = (course) => {
    setUpgradeCourse(course);
    setUpgradeOpen(true);
  };

  const onOpenCourse = (course) => {
    // Replace with navigate(`/courses/${course.id}`) in a real app
    alert(`Open course player: ${course.title}`);
  };

  const coursesSorted = useMemo(() => {
    return [...placeholderCourses].sort((a, b) => a.tier_level - b.tier_level);
  }, []);

  return (
    <div className="coursesPage">
      <header className="coursesPage__header">
        <h1 className="coursesPage__title">Courses</h1>
        <p className="coursesPage__sub">
          Your current tier: <strong>{user_tier_level}</strong>. Locked courses are previewable.
        </p>
      </header>

      <section className="coursesGrid">
        {coursesSorted.map((course) => {
          const isLocked = !canAccessCourse(course.tier_level, user_tier_level);
          const completedSet = completedByCourse[course.id] ?? new Set();
          const prog = courseProgress(course, completedSet);

          return (
            <CourseCard
              key={course.id}
              course={course}
              userTierLevel={user_tier_level}
              isLocked={isLocked}
              progressPercent={isLocked ? 0 : prog.percent}
              nextLessonTitle={isLocked ? null : prog.nextLesson?.title}
              onOpenCourse={onOpenCourse}
              onOpenUpgrade={onOpenUpgrade}
            />
          );
        })}
      </section>

      <UpgradeModal
        open={upgradeOpen}
        onClose={() => setUpgradeOpen(false)}
        onUpgrade={() => {
          // Replace with your payment/upgrade flow
          alert(`Upgrade flow (required tier: ${upgradeCourse?.tier_level})`);
          setUpgradeOpen(false);
        }}
        requiredTier={upgradeCourse?.tier_level}
        courseTitle={upgradeCourse?.title}
        unlockList={[
          "Full lesson library + video player",
          "Progress tracking + completion",
          "Downloads and future updates",
        ]}
      />
    </div>
  );
}