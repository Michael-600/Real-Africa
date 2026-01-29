import React from "react";

if (typeof window !== "undefined") {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.setAttribute(
    "data-theme",
    prefersDark ? "dark" : "light"
  );
}

const AboutMission = () => {
  return (
    <section className="about-mission">
      <div className="about-mission__container">
        {/* Accent bars */}
        <div className="about-mission__accent about-mission__accent--left" />
        <div className="about-mission__accent about-mission__accent--right" />

        <div className="about-mission__grid">
          {/* About */}
          <div className="about-mission__block">
            <p className="about-mission__eyebrow">About Us</p>

            <h2 className="about-mission__headline">
            Africa is often portrayed in a light that overlooks its technological & entrepreneurial advancements.
            The Real Africa seeks to rewrite this narrative by bringing technology in Africa into the global spotlight.
            </h2>

            <p className="about-mission__body">
              Through interviews, videos, and digital content, we challenge
              global misconceptions and spotlight the people building Africa’s
              future.
            </p>

            <a href="#" className="about-mission__cta">Read More →</a>
          </div>

          {/* Mission */}
          <div className="about-mission__block">
            <p className="about-mission__eyebrow">Our Mission</p>

            <h3 className="about-mission__subheadline">
              To showcase African tech talent and business ingenuity.
            </h3>

            <p className="about-mission__body">
              We create content that educates, connects, and inspires — putting
              African entrepreneurs and innovators at the forefront of global
              conversations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMission;