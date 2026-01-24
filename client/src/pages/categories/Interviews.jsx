import React from 'react';
import { useSearchParams } from "react-router-dom";
import PageLayout from "../../components/Layout/PageLayout";

export default function Interviews() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const PAGE_SIZE = 3;

  const interviews = [
    {
      category: "Startup",
      title: "The Story Behind Africa’s First AI-Powered HR Tool",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: "https://placehold.co/490x318",
    },
    {
      category: "Business",
      title: "Women in Tech: A Ugandan Engineer’s Journey to Global Leadership",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: "https://placehold.co/490x318",
    },
    {
      category: "Startup",
      title: "What Investors Really Want: A VC Reveals What Gets Funded in Africa",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: "https://placehold.co/490x318",
    },
    {
      category: "Technology",
      title: "Coding with Constraints: How African Developers Innovate Differently",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: "https://placehold.co/490x318",
    },
    {
      category: "Economy",
      title: "Beyond Borders: The Pan-African CTO Building Across 5 Countries",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: "https://placehold.co/490x318",
    },
  ];

  const totalPages = Math.ceil(interviews.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const visibleInterviews = interviews.slice(start, start + PAGE_SIZE);

  const safePage = Math.min(Math.max(page, 1), totalPages);

  if (safePage !== page) {
    setSearchParams({ page: safePage.toString() });
  }

  const handlePageChange = (newPage) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSearchParams({ page: newPage.toString() });
  };

  return (
    <PageLayout>
      <section className="interviews">
        <div className="interviews-container">
          <div className="interviews-bg" />

          <img
            className="interviews-image"
            src="/assets/nduati.png"
            alt="Featured interview"
          />

          <button className="interviews-cta">
            Go to video
          </button>

          <p className="interviews-description">
            We explore the link between environment, culture, and scalable innovation
            through African urban design.
          </p>

          <div className="interviews-meta">
            <span className="meta-muted">By </span>
            <span className="meta-author">Raydon M.</span>
            <span className="meta-muted"> &nbsp;|&nbsp; Dec 9, 2025</span>
          </div>

          <h2 className="interviews-title">
            If you don't trust yourself take a job.
          </h2>

          <div className="interviews-label">Featured Post</div>

        </div>
      </section>

      {/* ================= All Interviews Header ================= */}
      <section className="all-interviews-header">
        <div className="all-interviews-header-inner">
          <h2>All interviews</h2>
          <div className="divider" />
        </div>
      </section>

      {/* ================= Interviews List ================= */}
      <section className="interviews-list" aria-label="Interview list">
        {visibleInterviews.map((item) => (
          <article key={item.title} className="interview-row">
            <div className="interview-media">
              <img src={item.image} alt="" />
              <div className="play-indicator" />
            </div>
            <div className="interview-content">
              <span className="category">{item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </section>

      {/* ================= Pagination ================= */}
      <div className="pagination" role="navigation" aria-label="Pagination">
        <button
          className="prev"
          disabled={safePage <= 1}
          onClick={() => handlePageChange(safePage - 1)}
          aria-disabled={safePage <= 1}
        >
          ← Prev
        </button>

        <span className="page-indicator" aria-live="polite">
          Page {safePage} of {totalPages}
        </span>

        <button
          className="next"
          disabled={safePage >= totalPages}
          onClick={() => handlePageChange(safePage + 1)}
          aria-disabled={safePage >= totalPages}
        >
          Next →
        </button>
      </div>
    </PageLayout>
  );
}
