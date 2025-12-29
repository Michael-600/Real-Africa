import React from "react";

const MeetTheTeam = () => {
  const team = [
    {
      name: "Raydon Muregi",
      role: "Co-Founder",
      image: "/assets/raydon.jpeg",
    },
    {
      name: "Michael Hayford",
      role: "Co-Founder",
      featured: true,
      image: "/assets/michael.png",
    },
    {
      name: "Dr. Benedicta",
      role: "Content Strategy",
      image: "/assets/benedicta.png",
    },
    {
      name: "Anne Mokua",
      role: "Executive Assistant",
      image: "/assets/anne.jpeg",
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
              <a href="#" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.07c.67-1.27 2.3-2.6 4.73-2.6 5.06 0 6 3.33 6 7.67V24h-5v-7.5c0-1.8-.03-4.1-2.5-4.1s-2.9 1.95-2.9 4V24h-5V8z" fill="currentColor"/>
                </svg>
              </a>

              <a href="#" aria-label="Twitter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 4.56c-.88.39-1.83.65-2.83.77a4.93 4.93 0 002.16-2.72 9.86 9.86 0 01-3.13 1.2A4.92 4.92 0 0016.62 3c-2.72 0-4.92 2.24-4.92 5 0 .39.04.77.13 1.13C7.69 8.94 4.07 6.97 1.64 3.99a5.02 5.02 0 00-.66 2.51c0 1.73.87 3.26 2.2 4.15a4.9 4.9 0 01-2.23-.63v.06c0 2.42 1.68 4.44 3.92 4.9a4.93 4.93 0 01-2.22.09c.63 1.98 2.44 3.42 4.6 3.46A9.87 9.87 0 010 21.54a13.9 13.9 0 007.55 2.21c9.05 0 14-7.63 14-14.24 0-.22 0-.43-.02-.64A10.1 10.1 0 0024 4.56z" fill="currentColor"/>
                </svg>
              </a>

              <a href="#" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.06 1.97.25 2.43.42a4.92 4.92 0 011.78 1.03 4.92 4.92 0 011.03 1.78c.17.46.36 1.26.42 2.43.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.06 1.17-.25 1.97-.42 2.43a4.92 4.92 0 01-1.03 1.78 4.92 4.92 0 01-1.78 1.03c-.46.17-1.26.36-2.43.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.06-1.97-.25-2.43-.42a4.92 4.92 0 01-1.78-1.03 4.92 4.92 0 01-1.03-1.78c-.17-.46-.36-1.26-.42-2.43C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.06-1.17.25-1.97.42-2.43a4.92 4.92 0 011.03-1.78 4.92 4.92 0 011.78-1.03c.46-.17 1.26-.36 2.43-.42C8.42 2.17 8.8 2.16 12 2.16zm0 3.68a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zm0 10.16a4 4 0 110-8 4 4 0 010 8zm6.4-10.88a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MeetTheTeam;