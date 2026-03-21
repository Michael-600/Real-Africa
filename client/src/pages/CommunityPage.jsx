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
    image: "/assets/entrepreneurship.jpg",
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
    price: "Free",
    image: "/assets/entrepreneurship.jpg",
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

  React.useEffect(() => {
    let mounted = true;
    const loadCommunity = async () => {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from("communities")
          .select("*")
          .eq("slug", slug)
          .maybeSingle();

        if (fetchError) throw fetchError;
        if (mounted) setCommunity(data || null);
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
    return (
      <div className="community-landing-page">
        <div style={{ textAlign: "center", padding: "80px 20px", color: "#64748b" }}>
          Loading community...
        </div>
      </div>
    );
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

          {!user && (
            <button
              className="community-landing__cta"
              onClick={() =>
                navigate("/auth", { state: { from: `/communities/${slug}` } })
              }
            >
              Sign in to join
            </button>
          )}

          {joinSuccess && (
            <p
              className="community-landing__success"
              style={{ color: "#16a34a", fontWeight: 600, marginBottom: 8 }}
              role="status"
            >
              You've joined successfully!
            </p>
          )}
          {user && !isJoined && (
            <button
              className="community-landing__cta"
              disabled={joinLoading}
              onClick={async (e) => {
                e.preventDefault();
                setJoinLoading(true);
                setJoinSuccess(false);
                console.log("[Join] Click -> firing insert", { communityId: community.id, userId: user.id });
                const { data, error: joinError } = await supabase
                  .from("community_memberships")
                  .insert({
                    community_id: community.id,
                    user_id: user.id,
                  })
                  .select();
                if (joinError) {
                  setJoinLoading(false);
                  if (joinError.code === "23505") {
                    console.log("[Join] Already a member (duplicate), treating as success");
                    setIsJoined(true);
                    setJoinSuccess(true);
                    return;
                  }
                  console.error("[Join] Supabase error:", joinError);
                  return;
                }
                console.log("[Join] Success:", data);
                setIsJoined(true);
                setJoinSuccess(true);
                const newCount = (community.members_count || 0) + 1;
                setCommunity((prev) => (prev ? { ...prev, members_count: newCount } : prev));
                const { error: updateErr } = await supabase
                  .from("communities")
                  .update({ members_count: newCount })
                  .eq("id", community.id);
                if (updateErr) console.error("[Join] Failed to update members_count:", updateErr);
                setJoinLoading(false);
                setTimeout(() => setJoinSuccess(false), 4000);
                try {
                  await trackReferralConversion("join_community", slug);
                } catch (err) {
                  if (err?.name !== "AbortError") {
                    console.error("Referral tracking failed:", err);
                  }
                }
              }}
            >
              {joinLoading ? "Joining…" : "Join community"}
            </button>
          )}

          {user && isJoined && hasCommunityApp && (
            <button
              className="community-landing__cta"
              onClick={() => setHasEntered(true)}
            >
              Enter community
            </button>
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