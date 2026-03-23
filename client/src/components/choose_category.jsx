import React from "react";
import { useNavigate } from "react-router-dom";

if (typeof window !== "undefined") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute(
      "data-theme",
      prefersDark ? "dark" : "light"
    );
}

const ChooseCategory = () => {
  const navigate = useNavigate();

  const goToCategory = (path) => {
    // Clear any focused element to prevent browser auto-scroll
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    // Ensure page starts from top
    window.scrollTo(0, 0);

    navigate(`/${path}`);
  };

  return (
    <section className="choose-category">
      <h2 className="choose-category__title">Choose A Category</h2>

      <div className="choose-category__grid">
        {/* Interviews */}
        <div
          className="category-card"
          onClick={() => goToCategory("interviews")}
        >
          <div className="category-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 18.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Z"/>
              <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
              <path d="M12 8v-2M12 18v-2M8 12H6M18 12h-2"/>
            </svg>
          </div>
          <h3 className="category-card__title">Interviews</h3>
          <p className="category-card__desc">
          Candid stories of grit and ingenuity in Africa.
          </p>
        </div>

        {/* Featured CEOs */}
        <div
          className="category-card category-card--featured"
          onClick={() => goToCategory("featured-ceos")}
        >
          <div className="category-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="10" cy="7" r="4"/>
              <path d="M17 11l2 2 4-4"/>
            </svg>
          </div>
          <h3 className="category-card__title">Featured CEOs</h3>
          <p className="category-card__desc">
          Profiles of the visionary leaders we've interviewed.
          </p>
        </div>

        {/* Opportunities */}
        <div
          className="category-card"
          onClick={() => goToCategory("opportunities")}
        >
          <div className="category-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <h3 className="category-card__title">Opportunities</h3>
          <p className="category-card__desc">
          Connecting you to funding and high impact roles.
          </p>
        </div>

        {/* Articles */}
        <div
          className="category-card"
          onClick={() => goToCategory("articles")}
        >
          <div className="category-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/>
              <line x1="6" y1="8" x2="18" y2="8"/>
              <line x1="6" y1="12" x2="14" y2="12"/>
              <line x1="6" y1="16" x2="10" y2="16"/>
            </svg>
          </div>
          <h3 className="category-card__title">Articles</h3>
          <p className="category-card__desc">
            In-depth stories on founders and innovators across Africa.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ChooseCategory;