import React from "react";
import { FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";

const MeetTheTeam = () => {
  const team = [
    {
      name: "Raydon Muregi",
      role: "Co-Founder",
      image: "/assets/raydon.jpeg",
      socials: {
        linkedin: "https://www.linkedin.com/",
        twitter: "https://twitter.com/",
        instagram: "https://www.instagram.com/"
      }
    },
    {
      name: "Michael Hayford",
      role: "Co-Founder",
      featured: true,
      image: "/assets/michael.png",
      socials: {
        linkedin: "#",
        twitter: "#",
        instagram: "#"
      }
    },
    {
      name: "Dr. Benedicta",
      role: "Content Strategy",
      image: "/assets/benedicta.png",
      socials: {
        linkedin: "#",
        twitter: "#",
        instagram: "#"
      }
    },
    {
      name: "Anne Mokua",
      role: "Executive Assistant",
      image: "/assets/anne.jpeg",
      socials: {
        linkedin: "#",
        twitter: "#",
        instagram: "#"
      }
    },
  ];

  return (
    <section className="team">
      <h2 className="team__title">Meet the Team</h2>

      <div className="team__grid">
        {team.map((member, index) => (
          <div
            key={index}
            className={`team-card ${member.featured ? "team-card--featured" : ""}`}
          >
            <img
              src={member.image}
              alt={member.name}
              className="team-card__avatar"
            />

            <h3 className="team-card__name">{member.name}</h3>
            <p className="team-card__role">{member.role}</p>
            <div className="team-card__socials">
              {member.socials?.linkedin && (
                <a
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn />
                </a>
              )}

              {member.socials?.twitter && (
                <a
                  href={member.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </a>
              )}

              {member.socials?.instagram && (
                <a
                  href={member.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MeetTheTeam;