import React from 'react';

if (typeof window !== "undefined") {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.setAttribute(
    "data-theme",
    prefersDark ? "dark" : "light"
  );
}

function FeaturedPosts() {
  const posts = [
    {
      author: "Raydon Muregi",
      date: "August 1, 2025",
      title: "Climate Innovation on a Global Stage: Why Uzoma Bailey Ayogu is a Forbes 30 Under 30 Trailblazer.",
      highlight: true,
    },
    {
      author: "Raydon Muregi",
      date: "Jan 2, 2026",
      title: "From Curiosity to Inclusion: How Elly Savatia is Engineering a More Accessible Africa.",
      highlight: false,
    },
    {
      author: "Raydon Muregi",
      date: "December 9, 2025",
      title: "The Art of the Scale: Lessons in Leadership and Resilience from Peter Nduati.",
      highlight: true,
    },
    {
      author: "Anne Mokua",
      date: "Sep 2o, 2025",
      title: "Navigating Borders: How Dr. G. O. Ouma is Using AI to Simplify Global Mobility.",
      highlight: false,
    },
    {
      author: "Raydon Muregi",
      date: "June 10, 2025",
      title: "You Are a Brand: Nancy Muthoni on the Currencies of Credibility and Excellence.",
      highlight: false,
    },
    {
      author: "Michael Hayford",
      date: "Dec 19, 2024",
      title: "Data-Driven Success: How Oze is Helping 97% of Small Businesses Thrive Across Africa.",
      highlight: false,
    },
    {
      author: "Raydon Muregi",
      date: "May 19, 2024",
      title: "Building with Faith: How Isaac Nyangolo is Using Tech to Heal African Education Systems.",
      highlight: true,
    },
  ];

  return (
    <section
      className="featured-posts-section"
      style={{
        padding: "clamp(64px, 8vw, 120px) clamp(16px, 6vw, 64px)",
        background: "var(--bg)",
        color: "var(--text-primary)",
        boxSizing: "border-box",
        fontFamily: "Space Grotesk, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 36px)",
            fontFamily: "inherit",
            fontWeight: 700,
            color: "var(--text-primary)",
          }}
        >
          All Posts
        </h2>

        <span
          style={{
            fontSize: 16,
            fontFamily: "inherit",
            color: "var(--accent)",
            cursor: "pointer",
          }}
        >
          View All
        </span>
      </div>

      <div className="featured-posts-wrapper">
        {/* Layout */}
        <div
          className="featured-posts-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gap: "40px",
            position: "relative",
          }}
        >
          {/* Featured */}
          <div
            className="featured-post-main"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <img
              src="/assets/nduati.png"
              alt="Featured"
              style={{
                width: "100%",
                aspectRatio: "16 / 9",
                objectFit: "cover",
                borderRadius: 12,
              }}
            />

            <div
              style={{
                fontFamily: "inherit",
                fontSize: 14,
                color: "var(--text-secondary)",
              }}
            >
              By <span style={{ color: "var(--accent)" }}>Michael H</span> | May 02, 2025
            </div>

            <h3
              style={{
                fontFamily: "inherit",
                fontSize: "clamp(22px, 3vw, 28px)",
                fontWeight: 700,
                lineHeight: "1.4",
                color: "var(--text-primary)",
              }}
            >
              If you don't trust yourself take a job!
            </h3>

            <p
              style={{
                fontFamily: "inherit",
                fontSize: 16,
                lineHeight: "1.7",
                color: "var(--text-secondary)",
                maxWidth: 600,
              }}
            >
              Peter Nduati talks about the harsh realities of the day to day entrepreneur.
            </p>

            <a
              href="http://localhost:5173/interviews"
              style={{ textDecoration: "none", alignSelf: "flex-start", width: "100%", maxWidth: 280 }}
            >
              <button
                style={{
                  padding: "14px 40px",
                  background: "#FCD34D",
                  borderRadius: 50,
                  border: "1px solid #1f2937",
                  fontFamily: "inherit",
                  fontSize: 18,
                  fontWeight: 700,
                  cursor: "pointer",
                  color: "#1f2937",
                  boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.15)",
                  width: "100%",
                }}
              >
                Read More &gt;
              </button>
            </a>
          </div>

          {/* List */}
          <div
            className="featured-posts-list"
            data-list
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              width: "100%",
              maxHeight: 520,
              overflowY: "auto",
              paddingRight: 8,
            }}
          >
            {posts.map((post, i) => (
              <div
                key={i}
                className="featured-post-card"
                style={{
                  padding: "20px 24px",
                  borderRadius: 20,
                  border: "1px solid var(--border-subtle)",
                  background: post.highlight
                    ? "var(--highlight-bg)"
                    : "var(--surface-1)",
                }}
              >
                <div
                  style={{
                    fontFamily: "inherit",
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    marginBottom: 8,
                  }}
                >
                  By <span style={{ color: "var(--accent)" }}>{post.author}</span> | {post.date}
                </div>

                <h4
                  style={{
                    fontFamily: "inherit",
                    fontSize: 20,
                    fontWeight: 700,
                    lineHeight: "1.5",
                    color: "var(--text-primary)",
                  }}
                >
                  {post.title}
                </h4>
              </div>
            ))}
            <div
              aria-hidden
              style={{
                position: "sticky",
                bottom: 0,
                height: 80,
                background: "linear-gradient(to bottom, rgba(0,0,0,0), var(--bg))",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </div>

      {/* Mobile stacking */}
      <style>
        {`
          :root {
            /* Light mode surfaces */
            --bg: #ffffff;
            --surface-1: #ffffff;
            --surface-2: #fbf6ea;
            --border-subtle: #e5e7eb;

            /* Light mode text */
            --text-primary: #232536;
            --text-secondary: #4c4c4c;
            --text-muted: #6d6e76;

            /* Brand */
            --accent: #592ea9;
            --highlight-bg: #fbf6ea;
          }

          [data-theme="dark"] {
            /* Dark mode surfaces (no pure black) */
            --bg: #121212;
            --surface-1: #18181b;
            --surface-2: #1f1f23;
            --border-subtle: #2a2a2f;

            /* Dark mode text (no pure white) */
            --text-primary: #eaeaf0;
            --text-secondary: #b3b3c2;
            --text-muted: #8b8b9a;

            /* Brand */
            --accent: #a78bfa;
            --highlight-bg: rgba(167, 139, 250, 0.12);
          }

          @media (min-width: 901px) {
            .featured-posts-grid {
              display: grid;
            }
            .featured-posts-list::-webkit-scrollbar {
              width: 6px;
            }
            .featured-posts-list::-webkit-scrollbar-thumb {
              background: var(--border-subtle);
              border-radius: 8px;
            }
          }

          @media (max-width: 900px) {
            .featured-posts-grid {
              display: flex;
              flex-direction: column;
              gap: 48px;
            }

            .featured-post-main {
              order: 1;
            }

            .featured-posts-list {
              order: 2;
              display: flex;
              flex-direction: column;
              gap: 20px;
              width: 100%;
              max-height: none;
              overflow: visible;
            }

            .featured-post-card {
              width: 100%;
              padding: 20px;
            }

            .featured-post-card h4 {
              font-size: 18px;
              line-height: 1.45;
            }
          }
        `}
      </style> 
    </section>
  );
}

export default FeaturedPosts;