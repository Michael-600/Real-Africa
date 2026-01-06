import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();

  // Coming Soon notify modal
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifySent, setNotifySent] = useState(false);

  const goToCategory = (slug) => {
    navigate(`/category/${slug}`);
  };
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
      <div className="categories-layout categories-layout-right coming-soon-wrapper">
        <div className="categories-main coming-soon-content">
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

          {[
            { label: "Opportunities", slug: "opportunities" },
            { label: "Interviews", slug: "interviews" },
            { label: "Featured", slug: "featured-ceos" },
            { label: "Technology", slug: "technology" },
          ].map((item, i) => (
            <div
              key={i}
              onClick={() => goToCategory(item.slug)}
              className={
                item.slug === "opportunities"
                  ? "sidebar-item active"
                  : "sidebar-item"
              }
            >
              {item.label}
            </div>
          ))}

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
        <div className="coming-soon-overlay">
          <button
            className="coming-soon-pill"
            onClick={() => setShowNotifyModal(true)}
          >
            Coming Soon · Get Notified
          </button>
        </div>
      </div>
      {showNotifyModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 className="text-lg font-semibold">
              Get notified when Opportunities launch
            </h3>

            {!notifySent ? (
              <p className="text-sm text-zinc-600 mt-2">
                Enter your email and we’ll notify you as soon as opportunities go live.
              </p>
            ) : (
              <p className="text-sm text-emerald-600 mt-2">
                ✅ You’re on the list. We’ll be in touch soon.
              </p>
            )}

            <input
              type="email"
              placeholder="you@email.com"
              className="modal-input mt-4"
              value={notifyEmail}
              onChange={(e) => setNotifyEmail(e.target.value)}
              disabled={notifySent}
            />

            <div className="modal-actions mt-6">
              <button
                className="secondary"
                onClick={() => {
                  setShowNotifyModal(false);
                  setNotifySent(false);
                  setNotifyEmail("");
                }}
              >
                {notifySent ? "Close" : "Cancel"}
              </button>

              {!notifySent && (
                <button
                  className="primary"
                  onClick={() => {
                    if (!notifyEmail) return;
                    // hook Supabase / email service here later
                    setNotifySent(true);
                  }}
                >
                  Notify Me
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
