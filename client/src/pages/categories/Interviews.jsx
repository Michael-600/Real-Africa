import React, { useState } from "react";

const videoInterviews = [
  {
    id: "1",
    title: "Building Systems That Scale in East Africa",
    guest: "Peter Nduati",
    role: "Serial Entrepreneur & Business Strategist",
    date: "August 1, 2025",
    duration: "42 min",
    thumbnail: "/assets/nduati.png",
    videoUrl: null,
    comingSoon: true,
  },
  {
    id: "2",
    title: "Climate Innovation From Palm Waste to Biochar",
    guest: "Uzoma Bailey Ayogu",
    role: "Co-founder, Releaf Earth (YC W19)",
    date: "July 15, 2025",
    duration: "38 min",
    thumbnail: "/assets/uzoma.png",
    videoUrl: null,
    comingSoon: true,
  },
  {
    id: "3",
    title: "Engineering Inclusion Across African Tech",
    guest: "Elly Savatia",
    role: "Tech Advocate & Engineer",
    date: "June 22, 2025",
    duration: "35 min",
    thumbnail: "/assets/Elly-Savatia.jpg",
    videoUrl: null,
    comingSoon: true,
  },
];

export default function Interviews() {
  const [notifyEmail, setNotifyEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNotify = (e) => {
    e.preventDefault();
    if (notifyEmail.trim()) {
      setSubmitted(true);
      setNotifyEmail("");
    }
  };

  return (
    <section className="video-interviews">
      <style>{`
        .video-interviews {
          min-height: 100vh;
          background: #0f0f14;
          color: #ffffff;
          font-family: 'Space Grotesk', sans-serif;
          padding: clamp(40px, 6vw, 80px) clamp(16px, 4vw, 64px);
        }

        .vi-header {
          max-width: 720px;
          margin: 0 auto 56px;
          text-align: center;
        }

        .vi-header h1 {
          font-size: clamp(30px, 4.5vw, 48px);
          font-weight: 700;
          margin-bottom: 16px;
          background: linear-gradient(135deg, #ffffff 0%, #c9922a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .vi-header p {
          font-size: clamp(15px, 1.8vw, 17px);
          line-height: 1.7;
          color: #9ca3af;
        }

        .vi-grid {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .vi-card {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 0;
          background: #1a1a24;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.06);
          transition: border-color 0.25s ease, transform 0.25s ease;
        }

        .vi-card:hover {
          border-color: rgba(201, 146, 42, 0.3);
          transform: translateY(-2px);
        }

        .vi-card__thumb {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 200px;
          overflow: hidden;
        }

        .vi-card__thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .vi-card:hover .vi-card__thumb img {
          transform: scale(1.05);
        }

        .vi-card__play {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(201, 146, 42, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .vi-card:hover .vi-card__play {
          transform: translate(-50%, -50%) scale(1.1);
          background: #c9922a;
        }

        .vi-card__play svg {
          width: 22px;
          height: 22px;
          color: #ffffff;
          margin-left: 2px;
        }

        .vi-card__coming {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          color: #c9922a;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 6px;
        }

        .vi-card__body {
          padding: 28px 32px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .vi-card__meta {
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .vi-card__duration {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #c9922a;
          font-weight: 500;
        }

        .vi-card__duration svg {
          width: 13px;
          height: 13px;
        }

        .vi-card__title {
          font-size: 22px;
          font-weight: 700;
          line-height: 1.35;
          color: #ffffff;
          margin-bottom: 12px;
        }

        .vi-card__guest {
          font-size: 15px;
          color: #d1d5db;
        }

        .vi-card__guest strong {
          color: #c9922a;
          font-weight: 600;
        }

        .vi-card__guest-role {
          font-size: 13px;
          color: #6b7280;
          margin-top: 4px;
        }

        /* Notify section */
        .vi-notify {
          max-width: 560px;
          margin: 64px auto 0;
          text-align: center;
          padding: 40px 32px;
          background: #1a1a24;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .vi-notify h3 {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 8px;
          color: #ffffff;
        }

        .vi-notify p {
          font-size: 14px;
          color: #9ca3af;
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .vi-notify form {
          display: flex;
          gap: 10px;
          justify-content: center;
        }

        .vi-notify input {
          flex: 1;
          max-width: 300px;
          padding: 12px 18px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: #0f0f14;
          color: #ffffff;
          font-family: inherit;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .vi-notify input:focus {
          border-color: #c9922a;
        }

        .vi-notify input::placeholder {
          color: #6b7280;
        }

        .vi-notify button {
          padding: 12px 24px;
          border-radius: 10px;
          border: none;
          background: #c9922a;
          color: #ffffff;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease;
          white-space: nowrap;
        }

        .vi-notify button:hover {
          background: #b07d1e;
        }

        .vi-notify__success {
          color: #c9922a;
          font-size: 15px;
          font-weight: 600;
        }

        @media (max-width: 700px) {
          .vi-card {
            grid-template-columns: 1fr;
          }

          .vi-card__thumb {
            min-height: 200px;
          }

          .vi-card__body {
            padding: 20px 22px 24px;
          }

          .vi-notify form {
            flex-direction: column;
            align-items: stretch;
          }

          .vi-notify input {
            max-width: none;
          }
        }
      `}</style>

      <div className="vi-header">
        <h1>Video Interviews</h1>
        <p>
          Watch in-depth conversations with Africa's boldest founders, CEOs,
          and innovators. Unfiltered stories, straight from the source.
        </p>
      </div>

      <div className="vi-grid">
        {videoInterviews.map((item) => (
          <div key={item.id} className="vi-card">
            <div className="vi-card__thumb">
              <img src={item.thumbnail} alt={item.guest} />
              <div className="vi-card__play">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
              {item.comingSoon && (
                <div className="vi-card__coming">Coming Soon</div>
              )}
            </div>

            <div className="vi-card__body">
              <div className="vi-card__meta">
                <span>{item.date}</span>
                <span className="vi-card__duration">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {item.duration}
                </span>
              </div>
              <h3 className="vi-card__title">{item.title}</h3>
              <div className="vi-card__guest">
                with <strong>{item.guest}</strong>
              </div>
              <div className="vi-card__guest-role">{item.role}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="vi-notify">
        <h3>Get Notified When We Drop New Episodes</h3>
        <p>Be the first to watch. We'll send you a heads-up when new interviews go live.</p>
        {submitted ? (
          <div className="vi-notify__success">You're on the list. Stay tuned!</div>
        ) : (
          <form onSubmit={handleNotify}>
            <input
              type="email"
              placeholder="your@email.com"
              value={notifyEmail}
              onChange={(e) => setNotifyEmail(e.target.value)}
              required
            />
            <button type="submit">Notify Me</button>
          </form>
        )}
      </div>
    </section>
  );
}
