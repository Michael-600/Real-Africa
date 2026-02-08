import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";


export default function Communities() {
    const [communities, setCommunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const formatMembers = (count) =>
      Number.isFinite(count) && count > 0 ? count.toLocaleString() : "—";
    const navigate = useNavigate();

    useEffect(() => {
      let mounted = true;
      const diagnoseCommunitiesFetch = async () => {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseAnonKey) {
          return "Supabase env vars missing. Check `client/.env`.";
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        try {
          const response = await fetch(
            `${supabaseUrl}/rest/v1/communities?select=id&limit=1`,
            {
              headers: {
                apikey: supabaseAnonKey,
                Authorization: `Bearer ${supabaseAnonKey}`,
              },
              signal: controller.signal,
            }
          );

          if (!response.ok) {
            return `Supabase REST returned ${response.status}. Check RLS policies for public reads on communities.`;
          }

          return null;
        } catch (err) {
          if (err?.name === "AbortError") {
            return "Supabase REST request timed out. Check network or blockers.";
          }
          return "Supabase REST request failed. Check network or project URL.";
        } finally {
          clearTimeout(timeoutId);
        }
      };

      const loadCommunities = async () => {
        try {
          setLoading(true);
          const { data, error: fetchError } = await supabase
            .from("communities")
            .select("*")
            .order("created_at", { ascending: true });

          if (fetchError) throw fetchError;
          if (mounted) setCommunities(data || []);
        } catch (err) {
          console.error("Failed to load communities:", err);
          const diagnostic = await diagnoseCommunitiesFetch();
          if (mounted) {
            setError(diagnostic || "Unable to load communities right now.");
          }
        } finally {
          if (mounted) setLoading(false);
        }
      };

      loadCommunities();
      return () => { mounted = false; };
    }, []);
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
          {loading && (
            <p style={{ textAlign: "center", color: "#64748b" }}>
              Loading communities...
            </p>
          )}
          {error && (
            <p style={{ textAlign: "center", color: "#b91c1c" }}>
              {error}
            </p>
          )}
          {!loading && !error && communities.length === 0 && (
            <p style={{ textAlign: "center", color: "#64748b" }}>
              No communities found yet. If you just added them, confirm your
              Supabase RLS policy allows public reads on <strong>communities</strong>.
            </p>
          )}
          <div className="community-grid">
            {communities.map((community) => {
              const isComingSoon =
                Boolean(community.is_coming_soon) ||
                community.is_active === false;
              return (
              <div
                key={community.id}
                className={`community-card ${isComingSoon ? "community-card--soon" : ""}`}
                onClick={() => {
                  if (community.slug && !isComingSoon) {
                    navigate(`/communities/${community.slug}`);
                  }
                }}
              >
                <div className="card-image">
                  <img
                    src={community.image_url || "/assets/entrepreneurship.jpg"}
                    alt="Community cover"
                    className="card-img"
                  />
                </div>

                <div className="card-body">
                  <h3>{community.name}</h3>
                  <p>
                    {community.description || "A community built to learn, discuss, and grow together with like-minded people."}
                  </p>
                  {isComingSoon ? (
                    <span className="community-soon">Coming soon</span>
                  ) : (
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
                    <span>{formatMembers(community.members_count)} Members</span>
                    <span>•</span>
                    <strong>{community.price || "Free"}</strong>
                  </div>
                </div>
              </div>
            )})}
          </div>
        </section>
        <section className="community-waitlist">
          <h2>Want your own community?</h2>
          <p>Request access to launch a community with The Real Africa.</p>
          <button
            className="community-waitlist-btn"
            onClick={() => alert("Waitlist request coming soon.")}
          >
            Request to join the waitlist
          </button>
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

          .community-card--soon {
            opacity: 0.6;
            filter: grayscale(1);
            pointer-events: none;
          }

          .community-soon {
            display: inline-block;
            margin-top: 12px;
            padding: 8px 12px;
            border-radius: 999px;
            background: #f1f5f9;
            color: #475569;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          .community-waitlist {
            margin: 56px auto 40px;
            text-align: center;
          }

          .community-waitlist h2 {
            font-size: 1.75rem;
            margin-bottom: 10px;
          }

          .community-waitlist p {
            color: #64748b;
            margin-bottom: 18px;
          }

          .community-waitlist-btn {
            padding: 12px 20px;
            border-radius: 999px;
            border: 1px solid #111827;
            background: #ffffff;
            color: #111827;
            font-weight: 600;
            cursor: pointer;
          }

          .community-waitlist-btn:hover {
            background: #111827;
            color: #ffffff;
          }
        `}</style>
      </div>
    );
  }