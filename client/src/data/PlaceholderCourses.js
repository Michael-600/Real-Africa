// data/placeholderCourses.js
export const placeholderCourses = [
    {
      id: "c1",
      tier_level: 1,
      heroHeadline: "Comprehensive course for undergrads.",
      title: "Foundations of Execution",
      instructor: { name: "Raydon Muregi", avatarUrl: "/assets/raydon.jpeg" },
      lessons: [
        { id: "l1", title: "Picking Problems Worth Solving", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
        { id: "l2", title: "Daily Execution Systems", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
        { id: "l3", title: "Avoiding Shiny Object Syndrome", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
      ],
    },
    {
      id: "c2",
      tier_level: 3,
      heroHeadline: "Systems that turn chaos into predictable revenue.",
      title: "Scaling Operations",
      instructor: { name: "Amina Owiti", avatarUrl: "/assets/instructor-2.jpg" },
      lessons: [
        { id: "l1", title: "Hiring Operators vs Doers", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
        { id: "l2", title: "Founder to Manager Transition", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
        { id: "l3", title: "Metrics That Actually Matter", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
        { id: "l4", title: "Weekly Operating Cadence", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
      ],
    },
    {
      id: "c3",
      tier_level: 5,
      heroHeadline: "Premium playbooks for executive-level strategy.",
      title: "Strategic Dominance",
      instructor: { name: "Derek Mensah", avatarUrl: "/assets/instructor-3.jpg" },
      lessons: [
        { id: "l1", title: "Portfolio Thinking", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
        { id: "l2", title: "M&A: Build vs Buy", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
      ],
    },
  ];
  
  export function canAccessCourse(courseTierLevel, userTierLevel) {
    return Number(courseTierLevel) <= Number(userTierLevel);
  }
  
  export function courseProgress(course, completedLessonIds = new Set()) {
    const total = course?.lessons?.length ?? 0;
    const watched = course?.lessons?.reduce((acc, l) => acc + (completedLessonIds.has(l.id) ? 1 : 0), 0) ?? 0;
    const percent = total === 0 ? 0 : Math.round((watched / total) * 100);
    const nextLesson = course?.lessons?.find((l) => !completedLessonIds.has(l.id)) ?? null;
    return { total, watched, percent, nextLesson };
  }
  