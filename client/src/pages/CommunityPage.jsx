import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../lib/authContext";

import GetMentoredPage from "./get-mentored";
import Technology from "./categories/technology";

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
  const { user } = useAuth();
  const [hasEntered, setHasEntered] = React.useState(false);

  const community = COMMUNITY_REGISTRY[slug];

  if (!community) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold">Community not found</h2>
        <p className="text-zinc-600 mt-2">
          This community does not exist or is not yet available.
        </p>
      </div>
    );
  }

  const CommunityComponent = community.component;

  const joined =
    JSON.parse(localStorage.getItem("joined_communities") || "[]");
  const isJoined = joined.includes(community.id);

  const hasCommunityApp = Boolean(community.component);

  if (hasEntered && user && isJoined && hasCommunityApp) {
    return <CommunityComponent />;
  }

  return (
    <div className="community-landing-page">
      <div className="community-landing-hero">
        <img src={community.image} alt={community.name} />
      </div>

      <div className="community-landing-body">
        <div className="community-landing-main">
          <span className="community-landing__pill">Community</span>
          <h1>{community.name}</h1>
          <p className="community-landing__description">
            {community.description}
          </p>
          <p className="community-landing__long">
            {community.longDescription}
          </p>

          {community.highlights?.length > 0 && (
            <ul className="community-landing__highlights">
              {community.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="community-landing-side">
          <div className="community-landing__meta">
            <span>{community.members} members</span>
            <span>•</span>
            <strong>{community.price}</strong>
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

          {user && !isJoined && (
            <button
              className="community-landing__cta"
              onClick={() => {
                const updated = Array.from(new Set([...joined, community.id]));
                localStorage.setItem(
                  "joined_communities",
                  JSON.stringify(updated)
                );
              }}
            >
              Join community
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
          <iframe
            src={community.videoUrl}
            title={`${community.name} intro video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}