import React from 'react'

import { useParams } from "react-router-dom";
import GetMentoredPage from "./get-mentored";

export default function CommunityPage() {
  const { slug } = useParams();

  if (slug === "get-mentored") {
    return <GetMentoredPage />;
  }

  return (
    <div style={{ padding: 32 }}>
      Community not found
    </div>
  );
}