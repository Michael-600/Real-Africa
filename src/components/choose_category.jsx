import React from "react";

if (typeof window !== "undefined") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute(
      "data-theme",
      prefersDark ? "dark" : "light"
    );
}

const ChooseCategory = () => {
  return (
    <section className="choose-category">
      <h2 className="choose-category__title">Choose A Category</h2>

      <div className="choose-category__grid">
        {/* Interviews */}
        <div className="category-card">
          <div className="category-card__icon" />
          <h3 className="category-card__title">Interviews</h3>
          <p className="category-card__desc">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
          </p>
        </div>

        {/* Featured CEOs */}
        <div className="category-card category-card--featured">
          <div className="category-card__icon" />
          <h3 className="category-card__title">Featured CEOs</h3>
          <p className="category-card__desc">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
          </p>
        </div>

        {/* Opportunities */}
        <div className="category-card">
          <div className="category-card__icon" />
          <h3 className="category-card__title">Opportunities</h3>
          <p className="category-card__desc">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
          </p>
        </div>

        {/* Technology */}
        <div className="category-card">
          <div className="category-card__icon" />
          <h3 className="category-card__title">Technology</h3>
          <p className="category-card__desc">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ChooseCategory;