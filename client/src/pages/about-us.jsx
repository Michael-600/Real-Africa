import React from 'react';
import PageLayout from "../components/Layout/PageLayout";
import AboutMission from "../components/about_mission";
import MeetTheTeam from "../components/meet_the_team";
import Member from "../components/member";

export default function AboutUs() {
  return (
    <PageLayout>
      {/* ================= ABOUT HERO ================= */}
      <section className="about-hero">
        <div className="about-hero-inner container">
          <div className="about-hero-card">
            <div className="about-hero-left">
              <span className="about-eyebrow">ABOUT US</span>
              <h1>
                We tell the real stories behind Africa’s booming tech and business
                scenes.
              </h1>
            </div>

            <div className="about-hero-right">
              <p>
                We spotlight founders, creatives, and innovators who are
                building the future from African soil — sharing their journeys,
                lessons, and the systems that drive real progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS BANNER ================= */}
      <section className="about-stats container">
        <div className="stats-overlay">
          <div className="stat">
            <h3>15+</h3>
            <p>Interviews Published</p>
          </div>
          <div className="stat">
            <h3>110K+</h3>
            <p>Views on socials</p>
          </div>
          <div className="stat">
            <h3>2K+</h3>
            <p>Total followers</p>
          </div>
          <div className="stat">
            <h3>100+</h3>
            <p>Members</p>
          </div>
        </div>

        <img
          src="/assets/tycoons.png"
          alt="Africa tech storytelling"
        />

        <div className="stats-bars">
          <span className="bar-purple" />
          <span className="bar-yellow" />
        </div>
      </section>

      {/* ================= MISSION ================= */}
      <AboutMission />

      {/* ================= WHY WE STARTED ================= */}
      <section className="about-why container centered">
        <h2>Why we started this company</h2>
        <h3>
          Africa's growth story is often told by outsiders. We wanted to change
          that.
        </h3>
        <p>
          We noticed a gap between the incredible work happening across African
          tech and business ecosystems and the stories being told about them.
          The Real Africa was built to bridge that gap — to give founders,
          innovators, and communities a platform that celebrates progress,
          shares actionable knowledge, and connects people who are building
          the future together.
        </p>
      </section>

      {/* ================= TEAM ================= */}
      <div className="section-divider" />
     <MeetTheTeam/>

      {/* ================= MEMBERS ================= */}
      <div className="section-divider" />
     
    </PageLayout>
  );
}