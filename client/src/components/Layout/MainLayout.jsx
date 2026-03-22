import React, { useState, useEffect, useRef } from 'react';
import Navbar from "../navbar";
import Footer from "../footer";
import GetFeatured from "../get-featured";
import ScrollToTop from '../ScrollToTop';


const ScrollDownButton = () => {
  const [visible, setVisible] = useState(true);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        className={`scroll-indicator${visible ? "" : " hidden"}`}
        onClick={() => window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" })}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
          }
        }}
      >
        <span>Scroll down</span>
        <div className="arrow"></div>
      </div>
      <div
        ref={sentinelRef}
        style={{ height: 1, width: "100%", pointerEvents: "none" }}
      />
    </>
  );
};


const MainLayout = ({ children }) => {
  const [featuredOpen, setFeaturedOpen] = useState(false);

  return (
    <>
      <ScrollToTop />
      <Navbar onGetFeatured={() => setFeaturedOpen(true)} />

      <main className="app-content">
        {children}
      </main>

      <ScrollDownButton />

      {featuredOpen && (
        <GetFeatured onClose={() => setFeaturedOpen(false)} />
      )}
    </>
  );
};

export default MainLayout;