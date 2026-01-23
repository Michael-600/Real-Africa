import React from 'react';
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/authContext";


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
        slug: "music",
      },
    ];
    const navigate = useNavigate();
    const { user } = useAuth();
    return (
      <div className="discover-page">
        {/* Top Nav */}
        <header className="discover-nav">
          <div className="nav-inner">
            <div className="logo">Communities Powered by The Real Africa</div>
            <button
              className="community-auth-btn"
              onClick={() => {
                if (user) {
                  supabase.auth.signOut();
                } else {
                  navigate("/auth");
                }
              }}
            >
              {user ? "Log out" : "Log in"}
            </button>
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
                  {community.slug && (
                    <button
                      className="join-community-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/communities/${community.slug}`);
                      }}
                    >
                      Learn more
                    </button>
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