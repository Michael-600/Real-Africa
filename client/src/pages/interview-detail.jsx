import React from "react";
import { useParams } from "react-router-dom";
import { interviews } from "../data/interviews";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

class MarkdownErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error("Markdown render error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="interview-body" style={{ whiteSpace: "pre-line" }}>
          {typeof this.props.fallbackText === "string" ? this.props.fallbackText : ""}
        </div>
      );
    }

    return this.props.children;
  }
}

const InterviewSelect = () => {
  const { slug } = useParams();
  const interview = interviews.find((item) => item.slug === slug);

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
      <MarkdownErrorBoundary fallbackText={interview.body}>
        <article className="interview-body">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => <h1>{children}</h1>,
              h2: ({ children }) => <h2>{children}</h2>,
              h3: ({ children }) => <h3>{children}</h3>,
              p: ({ children }) => <p>{children}</p>,
              ul: ({ children }) => <ul>{children}</ul>,
              ol: ({ children }) => <ol>{children}</ol>,
              li: ({ children }) => <li>{children}</li>,
              br: () => <br />,
            }}
          >
            {typeof interview.body === "string" ? interview.body : ""}
          </ReactMarkdown>
        </article>
      </MarkdownErrorBoundary>
    </main>
  );
};

export default InterviewSelect;
