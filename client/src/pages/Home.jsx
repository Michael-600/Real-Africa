import React from 'react'
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Hero from "../components/hero";
import AboutMission from "../components/about_mission";
import ChooseCategory from "../components/choose_category";
import FeaturedPosts from "../components/featured_posts";
import SpecialPost from "../components/special_post";
import MeetTheTeam from "../components/meet_the_team";
import Testimonials from "../components/testimonials";
import Member from "../components/member";
import Footer from "../components/footer"
import Logo from "../../assets/logo.png";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);

      // allow exit animation to finish
      setTimeout(() => {
        setIsLoading(false);
      }, 400);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className={`home-loading dark ${isExiting ? "exit" : ""}`}>
        <div className="loader-brand">
          <img
            src={Logo}
            alt="The Real Africa"
            className="loading-logo small"
          />

          <div className="loading-text">
            <span className="loading-text-base">The Real Africa</span>
            <span className="loading-text-progress">The Real Africa</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`home-content ${!isLoading ? "visible" : ""}`}>
      <Hero />
      <FeaturedPosts />
      <ChooseCategory />
      <AboutMission />
      <SpecialPost />
      <MeetTheTeam />
      <Testimonials />
      <Member />
      <Footer />
    </div>
  );
}

export default Home;