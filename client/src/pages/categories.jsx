import React from "react";

const Categories = () => {
  return (
    <div className="categories-page">
      {/* HERO */}
      <div className="categories-hero">
        <div className="hero-bg" />

        <div className="hero-description">
          Discover curated job opportunities, freelance roles, and career paths
          across Africa and beyond.
        </div>

        <div className="hero-breadcrumb">
          Home &gt; Opportunities
        </div>

        <div className="hero-title">
          Opportunities
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="categories-layout categories-layout-right">
        <div className="categories-main">
          <h2 className="section-title">Our Featured Jobs</h2>

          <div className="jobs-grid">
            {[
              {
                title: "Software Engineer",
                type: "Part Time",
                location: "South Africa",
                category: "Developer",
              },
              {
                title: "Product Designer",
                type: "Part Time",
                location: "Kenya",
                category: "Designer",
              },
              {
                title: "UI / UX Designer",
                type: "Part Time",
                location: "Nigeria",
                category: "Designer",
              },
              {
                title: "Product Manager",
                type: "Full Time",
                location: "Ghana",
                category: "Marketing",
              },
              {
                title: "Recruiting Coordinator",
                type: "Part Time",
                location: "Tanzania",
                category: "Customer Service",
              },
              {
                title: "Customer Support",
                type: "Part Time",
                location: "Morocco",
                category: "Support",
              },
            ].map((job, idx) => (
              <div key={idx} className="job-card">
                <div className="job-tags">
                  <span>{job.type}</span>
                  <span>{job.location}</span>
                </div>

                <div>
                  <h3 className="job-title">{job.title}</h3>
                  <p className="job-category">{job.category}</p>
                </div>

                <div className="job-salary">$2,000 – $5,000 / Monthly</div>

                <button className="apply-btn">Apply Now</button>
              </div>
            ))}
          </div>
        </div>
        {/* SIDEBAR */}
        <aside className="categories-sidebar">
          <h2>Categories</h2>

          {["Opportunities", "Interviews", "Featured", "Technology"].map(
            (item, i) => (
              <div
                key={i}
                className={
                  item === "Opportunities"
                    ? "sidebar-item active"
                    : "sidebar-item"
                }
              >
                {item}
              </div>
            )
          )}

          <h3>All Tags</h3>

          <div className="tags">
            {[
              "Business",
              "Experience",
              "Technology",
              "Screen",
              "Marketing",
              "Life",
            ].map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Categories;
