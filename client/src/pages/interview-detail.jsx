import React from "react";
import { useParams } from "react-router-dom";
import { interviews } from "../data/interviews";

const InterviewSelect = () => {
  const { slug } = useParams();
  const interview = interviews.find((item) => item.slug === slug);
  console.log("slug:", slug);
  console.log("available slugs:", interviews.map(i => i.slug));

  if (!interview) {
    return (
      <main className="interview-page">
        <h1>Interview not found</h1>
        <p>The interview you are looking for does not exist.</p>
      </main>
    );
  }

  return (
    <main className="interview-detail">
      {/* Header */}
      <header className="interview-header">
        <div className="interview-header-grid">
          {/* Left: Author meta */}
          <div className="interview-meta">
            <span className="interview-author">{interview.author}</span>
            <span className="interview-date">Posted on {interview.date}</span>
          </div>

          {/* Center: Title */}
          <div className="interview-title-wrap">
            <h1 className="interview-title">{interview.title}</h1>
          </div>

          {/* Right: Summary */}
          <div className="interview-summary-wrap">
            <p className="interview-summary">{interview.summary}</p>
          </div>
        </div>
      </header>

      {/* Contained Hero Image */}
      <div className="interview-hero">
        <img src={interview.heroImage} alt={interview.title} />
      </div>

      {/* Article Body */}
      <article className="interview-body">
        {interview.body
          .trim()
          .split("\\n\\n")
          .map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
      </article>
    </main>
  );
};

export default InterviewSelect;
