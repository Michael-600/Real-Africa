import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../lib/authContext";
import {
  storeReferralAttribution,
  trackReferralConversion,
} from "../lib/referrals";
import { supabase } from "../lib/supabase";

import GetMentoredPage from "./get-mentored";
import Technology from "./categories/technology";
import LoadingSpinner from "../components/LoadingSpinner";

// Simple error boundary so a broken community app does not render a blank screen
class CommunityErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Keep this lightweight: log for debugging, but show a friendly fallback UI
    console.error("Community app crashed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8">
          <h2 className="text-xl font-semibold">This community page ran into an error</h2>
          <p className="text-zinc-600 mt-2">
            Please refresh the page. If it keeps happening, the community app for this
            page likely has a bug.
          </p>
          <pre className="mt-4 text-xs whitespace-pre-wrap text-zinc-500">
            {String(this.state.error || "")}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Community registry
 * Each entry represents a community-backed page
 * Add new communities here ONLY
 */
const COMMUNITY_REGISTRY = {
  "get-mentored": {
    id: "entrepreneurship",
    name: "The Real Africa Entrepreneurship Community",
    description:
      "A community built to learn, discuss, and grow together with like-minded builders.",
    longDescription:
      "Weekly mentorship, founder interviews, and private discussions focused on execution, growth, and real-world systems. Join to access live calls, resources, and curated learning tracks.",
    members: 100,
    price: "Free",
    image: "/assets/entrepreneurship.jpg",
    videoUrl: "https://www.youtube.com/embed/LXb3EKWsInQ",
    highlights: [
      "Weekly live calls with founders",
      "Private community discussions",
      "Curated learning modules",
    ],
    component: GetMentoredPage,
  },
  technology: {
    id: "technology",
    name: "Technology Builders Community",
    description:
      "Connect with builders shipping real products and sharing actionable lessons.",
    longDescription:
      "Product engineering deep-dives, code walkthroughs, and community Q&A to help you ship faster and smarter.",
    members: 82,
    price: "Free",
    image: "/assets/technology-community.png",
    videoUrl: "https://www.youtube.com/embed/LXb3EKWsInQ",
    highlights: [
      "Hands-on project breakdowns",
      "Peer feedback sessions",
      "Practical systems for building",
    ],
    component: Technology,
  },
  music: {
    id: "music",
    name: "Music Creators Community",
    description:
      "A creative hub for artists, producers, and storytellers.",
    longDescription:
      "Workshops, feedback circles, and collaborations to help you release consistently and grow your audience.",
    members: 56,
    price: "$20/month",
    image: "/assets/music-community.png",
    videoUrl: "https://www.youtube.com/embed/LXb3EKWsInQ",
    highlights: [
      "Weekly feedback sessions",
      "Collaboration opportunities",
      "Release strategy templates",
    ],
    component: null,
  },
};

/**
 * CommunityPage
 * Resolves /communities/:slug to a registered community
 */
export default function CommunityPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [hasEntered, setHasEntered] = React.useState(false);
  const [isJoined, setIsJoined] = React.useState(false);

  const registryEntry = COMMUNITY_REGISTRY[slug];
  const [community, setCommunity] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [joinLoading, setJoinLoading] = React.useState(false);
  const [joinSuccess, setJoinSuccess] = React.useState(false);

  const [showRequestForm, setShowRequestForm] = React.useState(false);
  const [requestForm, setRequestForm] = React.useState({ name: "", email: "", reason: "" });
  const [requestLoading, setRequestLoading] = React.useState(false);
  const [requestSuccess, setRequestSuccess] = React.useState(false);
  const [requestError, setRequestError] = React.useState("");

  const handleRequestSubmit = async () => {
    setRequestError("");
    if (!requestForm.name || !requestForm.email) {
      setRequestError("Name and email are required.");
      return;
    }
    setRequestLoading(true);
    const { error: insertError } = await supabase
      .from("community_join_requests")
      .insert({
        community_slug: slug,
        community_name: community?.name || slug,
        full_name: requestForm.name,
        email: requestForm.email,
        reason: requestForm.reason || null,
        user_id: user?.id || null,
      });
    if (insertError) {
      console.error("Join request error:", insertError);
      setRequestError("Something went wrong. Please try again.");
    } else {
      setRequestSuccess(true);
    }
    setRequestLoading(false);
  };

  const LAUNCH_DATE = new Date("2026-04-15T00:00:00").getTime();
  const [countdown, setCountdown] = React.useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  React.useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, LAUNCH_DATE - now);
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    let mounted = true;
    const loadCommunity = async () => {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from("communities")
          .select("*, community_memberships(count)")
          .eq("slug", slug)
          .maybeSingle();

        if (fetchError) throw fetchError;
        if (mounted && data) {
          const liveCount = data.community_memberships?.[0]?.count;
          setCommunity({
            ...data,
            members_count:
              typeof liveCount === "number" ? liveCount : data.members_count ?? 0,
          });
        } else if (mounted) {
          setCommunity(null);
        }
      } catch (err) {
        console.error("Failed to load community:", err);
        if (mounted) setError("Community details are unavailable.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadCommunity();
    return () => { mounted = false; };
  }, [slug]);

  const CommunityComponent = registryEntry?.component || null;

  React.useEffect(() => {
    if (!user || !community?.id) {
      setIsJoined(false);
      return;
    }
    let mounted = true;
    const checkMembership = async () => {
      const { data } = await supabase
        .from("community_memberships")
        .select("id")
        .eq("community_id", community.id)
        .eq("user_id", user.id)
        .maybeSingle();
      if (mounted) setIsJoined(Boolean(data));
    };
    checkMembership();
    return () => { mounted = false; };
  }, [user, community?.id]);

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("ref");
    if (code) {
      storeReferralAttribution(code, slug);
    }
  }, [location.search, slug]);

  const hasCommunityApp = Boolean(CommunityComponent);

  if (loading) {
    return <LoadingSpinner message="Loading community..." />;
  }

  if (error || !community) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold">Community not found</h2>
        <p className="text-zinc-600 mt-2">
          {error || "This community does not exist or is not yet available."}
        </p>
      </div>
    );
  }

  if (hasEntered && user && isJoined && hasCommunityApp) {
    return (
      <CommunityErrorBoundary>
        <CommunityComponent skipMembershipCheck={true} communitySlug={slug} />
      </CommunityErrorBoundary>
    );
  }

  return (
    <div className="community-landing-page">
      <div className="community-landing-hero">
        <img src={community.image_url || "/assets/entrepreneurship.jpg"} alt={community.name} />
      </div>

      <div className="community-landing-body">
        <div className="community-landing-main">
          <span className="community-landing__pill">Community</span>
          <h1>{community.name}</h1>
          <p className="community-landing__description">
            {community.description}
          </p>
          {community.long_description && (
            <p className="community-landing__long">
              {community.long_description}
            </p>
          )}

          {Array.isArray(community.highlights) && community.highlights.length > 0 && (
            <ul className="community-landing__highlights">
              {community.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="community-landing-side">
          <div className="community-landing__meta">
            <span>{Number(community.members_count || 0).toLocaleString()} members</span>
            <span>•</span>
            <strong>{community.price || "Free"}</strong>
          </div>

          {/* Countdown Timer */}
          <div className="launch-countdown">
            <p className="launch-countdown__label">Launching in</p>
            <div className="launch-countdown__grid">
              {[
                { value: countdown.days, label: "Days" },
                { value: countdown.hours, label: "Hrs" },
                { value: countdown.minutes, label: "Min" },
                { value: countdown.seconds, label: "Sec" },
              ].map((unit) => (
                <div key={unit.label} className="launch-countdown__unit">
                  <span className="launch-countdown__value">{String(unit.value).padStart(2, "0")}</span>
                  <span className="launch-countdown__unitlabel">{unit.label}</span>
                </div>
              ))}
            </div>
            <p className="launch-countdown__date">April 15, 2026</p>
          </div>

          {/* Request to Join */}
          {requestSuccess ? (
            <div style={{ textAlign: "center", padding: "12px 0" }}>
              <p style={{ color: "#16a34a", fontWeight: 700, fontSize: 16, marginBottom: 6 }}>
                Request submitted!
              </p>
              <p style={{ color: "#64748b", fontSize: 13 }}>
                We'll notify you when the community opens.
              </p>
            </div>
          ) : !showRequestForm ? (
            <button
              className="community-landing__cta"
              onClick={() => {
                setShowRequestForm(true);
                if (user) {
                  setRequestForm((f) => ({ ...f, email: user.email || "" }));
                }
              }}
            >
              Request to Join Group
            </button>
          ) : (
            <div className="request-form">
              {requestError && (
                <p style={{ color: "#b91c1c", fontSize: 13, marginBottom: 8 }}>{requestError}</p>
              )}
              <input
                className="request-form__input"
                placeholder="Your full name"
                value={requestForm.name}
                onChange={(e) => setRequestForm({ ...requestForm, name: e.target.value })}
              />
              <input
                className="request-form__input"
                placeholder="Email address"
                type="email"
                value={requestForm.email}
                onChange={(e) => setRequestForm({ ...requestForm, email: e.target.value })}
              />
              <textarea
                className="request-form__input"
                placeholder="Why do you want to join? (optional)"
                rows={3}
                value={requestForm.reason}
                onChange={(e) => setRequestForm({ ...requestForm, reason: e.target.value })}
              />
              <button
                className="community-landing__cta"
                onClick={handleRequestSubmit}
                disabled={requestLoading}
              >
                {requestLoading ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="community-landing-media">
        <div className="community-landing-video">
          {community.video_url ? (
            <iframe
              src={community.video_url}
              title={`${community.name} intro video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>
              Video coming soon.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}