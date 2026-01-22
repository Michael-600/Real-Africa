import React from "react";
import { useParams } from "react-router-dom";

import GetMentoredPage from "./get-mentored";
import Technology from "./categories/technology";

/**
 * Community registry
 * Each entry represents a community-backed page
 * Add new communities here ONLY
 */
const COMMUNITY_REGISTRY = {
  "get-mentored": {
    component: GetMentoredPage,
  },
  technology: {
    component: Technology,
  },
};

/**
 * CommunityPage
 * Resolves /communities/:slug to a registered community
 */
export default function CommunityPage() {
  const { slug } = useParams();

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
  return <CommunityComponent />;
}