import React from 'react';
import { useState } from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import GetFeatured from "../get-featured";

export default function MainLayout({ children }) {
  const [featuredOpen, setFeaturedOpen] = useState(false);

  return (
    <>
      <Navbar onGetFeatured={() => setFeaturedOpen(true)} />

      {children}

      <Footer />

      {featuredOpen && (
        <GetFeatured onClose={() => setFeaturedOpen(false)} />
      )}
    </>
  );
}