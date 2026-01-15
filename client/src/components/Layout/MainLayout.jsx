import React from 'react';
import { useState } from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import GetFeatured from "../get-featured";
import ScrollToTop from '../ScrollToTop';


const MainLayout = ({ children }) => {
  const [featuredOpen, setFeaturedOpen] = useState(false);

  return (
    <>
      {/* Forces scroll reset on every route change */}
     
      <ScrollToTop />
      <Navbar onGetFeatured={() => setFeaturedOpen(true)} />

      <main className="app-content">
        {children}
      </main>

      {featuredOpen && (
        <GetFeatured onClose={() => setFeaturedOpen(false)} />
      )}
    </>
  );
};

export default MainLayout;