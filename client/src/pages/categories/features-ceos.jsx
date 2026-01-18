import React from "react";
import { useNavigate } from "react-router-dom";

const CEOs = [
  {
    id: "olutosin",
    name: "Olutosin Obafemi.",
    title: "Managing Director",
    company: "Nitax technologies Limited",
    description:
      "Building Africa’s communication, healthcare and technology solutions.",
    image: "/assets/tosin.png",
    country: "Nigeria",
    flag: "🇳🇬",
    linkedin: "https://linkedin.com",
    website: "https://example.com",
  },
  {
    id: "Isaac",
    name: "Isaac Nyang'olo",
    title: "CEO",
    company: "Zeraki",
    description:
      "Scaling cross-border fintech infrastructure across emerging markets.",
    image: "/assets/isaac-nyangolo.png",
    country: "Kenya",
    flag: "🇰🇪",
    linkedin: "https://linkedin.com",
    website: "https://example.com",
  },
  {
    id: "Peter Nduati Consulting",
    name: "Peter Nduati",
    title: "Founder & ex-CEO",
    company: "Resolution Insurance",
    description:
      "Transforming primary healthcare access using data and mobile-first systems.",
    image: "/assets/peter-nduati.png",
    country: "Kenya",
    flag: "🇰🇪",
    linkedin: "https://linkedin.com",
    website: "https://example.com",
  },
];

const FeaturedCEOs = () => {
  const navigate = useNavigate();

  const openInterview = (id) => {
    navigate(`/interviews/${id}`);
  };

  return (
    <main className="featured-ceos-page">
      <header className="featured-ceos-header">
        <h1>Featured CEOs</h1>
        <p>
          Conversations with founders and executives building Africa’s most
          impactful companies.
        </p>
      </header>

      <section className="ceo-grid">
        {CEOs.map((ceo) => (
          <div
            key={ceo.id}
            className="ceo-card"
            onClick={() => openInterview(ceo.id)}
          >
            <div className="ceo-image-wrapper">
              <img src={ceo.image} alt={ceo.name} />
              <span className="ceo-flag" title={ceo.country}>
                {ceo.flag}
              </span>
            </div>

            <div className="ceo-card-body">
              <h3>{ceo.name}</h3>
              <p className="ceo-role">
                {ceo.title}, {ceo.company}
              </p>
              <p className="ceo-description">{ceo.description}</p>

              <div
                className="ceo-links"
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  href={ceo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ceo-linkedin"
                >
                  LinkedIn
                </a>

                <a
                  href={ceo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ceo-website"
                >
                  Company Website
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default FeaturedCEOs;
