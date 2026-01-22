import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";


export default function Communities() {
    const communities = [
      {
        id: "entrepreneurship",
        name: "The Real Africa Entrepreneurship Community",
        members: 100,
        price: "Free",
        image: "/assets/entrepreneurship.jpg",
        slug: "get-mentored",
      },
      {
        id: "technology",
        name: "Technology Builders Community",
        members: 82,
        price: "Free",
        image: "/assets/entrepreneurship.jpg",
        slug: "technology",
      },
      {
        id: "music",
        name: "Music Creators Community",
        members: 56,
        price: "Free",
        image: "/assets/entrepreneurship.jpg",
        slug: null,
      },
    ];
    const navigate = useNavigate();
    const [joiningId, setJoiningId] = React.useState(null);
    return (
      <div className="discover-page">
        {/* Top Nav */}
        <header className="discover-nav">
          <div className="nav-inner">
            <div className="logo">Communities Powered by The Real Africa</div>
          </div>
        </header>
  
        {/* Hero */}
        <section className="discover-hero">
          <h1>Get Mentored</h1>
          
  
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search for anything"
            />
          </div>
        </section>
  
        {/* Categories */}
        <section className="categories">
          {[
            "All",
            "🎨 Hobbies",
            "🎸 Music",
            "💰 Money",
            "🙏 Spirituality",
            "💻 Tech",
            "🥕 Health",
            "⚽ Sports",
            "📚 Self-improvement",
            "❤️ Relationships",
          ].map((c, i) => (
            <button
              key={c}
              className={`pill ${i === 0 ? "active" : ""}`}
            >
              {c}
            </button>
          ))}
        </section>
  
        {/* Grid */}
        <section className="grid-wrap">
          <div className="community-grid">
            {communities.map((community, index) => {
              const joined =
                JSON.parse(localStorage.getItem("joined_communities") || "[]");

              const isJoined = joined.includes(community.id);

              return (
              <div
                key={community.id}
                className="community-card"
                onClick={() => {
                  if (community.slug) {
                    navigate(`/communities/${community.slug}`);
                  }
                }}
              >
                <div className="card-image">
                  <img
                    src={community.image}
                    alt="Community cover"
                    className="card-img"
                  />
                  <span className="rank">#{index + 1}</span>
                </div>

                <div className="card-body">
                  <h3>{community.name}</h3>
                  <p>
                    A community built to learn, discuss, and grow
                    together with like-minded people.
                  </p>
                  {community.slug && !isJoined && (
                    <button
                      className="join-community-btn"
                      disabled={joiningId === community.id}
                      onClick={(e) => {
                        e.stopPropagation();

                        setJoiningId(community.id);

                        const joined =
                          JSON.parse(localStorage.getItem("joined_communities") || "[]");

                        if (!joined.includes(community.id)) {
                          joined.push(community.id);
                          localStorage.setItem(
                            "joined_communities",
                            JSON.stringify(joined)
                          );
                        }

                        setTimeout(() => {
                          setJoiningId(null);
                        }, 600);
                      }}
                    >
                      {joiningId === community.id ? "Joining…" : "Join community"}
                    </button>
                  )}
                  {isJoined && (
                    <span className="joined-badge">✓ Joined</span>
                  )}
                  <div className="card-meta">
                    <span>{community.members} Members</span>
                    <span>•</span>
                    <strong>{community.price}</strong>
                  </div>
                </div>
              </div>
            )})}
          </div>
        </section>

        <style>{`
          .join-community-btn {
            margin-top: 12px;
            padding: 10px 14px;
            border-radius: 8px;
            background: #111827;
            color: #ffffff;
            border: none;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
          }

          .join-community-btn:hover {
            background: #000000;
          }
        `}</style>
      </div>
    );
  }