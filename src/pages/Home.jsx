import Navbar from "../components/navbar"
import Hero from "../components/hero";
import AboutMission from "../components/about_mission";
import ChooseCategory from "../components/choose_category";
import FeaturedPosts from "../components/featured_posts";
import SpecialPost from "../components/special_post";
import MeetTheTeam from "../components/meet_the_team";
import Testimonials from "../components/testimonials";
import Member from "../components/Member";
import Footer from "../components/footer"

function Home() {
  return (
    <>
      < Navbar />
      <Hero />
      <FeaturedPosts />
      <ChooseCategory />
      <AboutMission />
      <SpecialPost />
      <MeetTheTeam />
      <Testimonials />
      <Member />
      < Footer />

    </>
  );
}

export default Home;