import React from 'react';
import { useNavigate } from "react-router-dom";

export default function Communities() {
    const cards = [1, 2, 3, 4, 5, 6];
    const navigate = useNavigate();
  
    return (
      <div className="discover-page">
        {/* Top Nav */}
        <header className="discover-nav">
          <div className="nav-inner">
            <div className="logo">Communities Powered by The Real Africa</div>
            <button className="login-btn">Log in</button>
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
            {cards.map((i) => (
              <div
              key={i}
              className="community-card"
              onClick={() => {
                if (i === 1) {
                  navigate("/communities/get-mentored");
                }
              }}
            >
                <div className="card-image">
                  <span className="rank">#{i}</span>
                </div>
  
                <div className="card-body">
                  <h3>The Real Africa Community</h3>
                  <p>
                    A community built to learn, discuss, and grow
                    together with like-minded people.
                  </p>
  
                  <div className="card-meta">
                    <span>12.3k Members</span>
                    <span>•</span>
                    <strong>Free</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }