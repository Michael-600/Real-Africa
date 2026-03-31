import React, { useState, useEffect } from "react";

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "Incredible insights! It's inspiring to see how visionaries like Mitchell Elegbe are truly shaping Africa's financial landscape. Your commitment to highlighting such stories of growth and innovation is commendable. Here's to building a future that showcases Africa's immense potential.",
      name: "The Tech Hut",
      role: "Tech Community — 425 followers",
      source: "LinkedIn",
    },
    {
      quote:
        "Thank you so much for the kind words from all and the recognition. All kudos goes to the amazing team I get to build alongside and God. Lots more work to do!!!!",
      name: "Uzoma Bailey Ayogu",
      role: "Co-founder, Releaf Earth (YC W19) — Forbes 30 Under 30",
      source: "LinkedIn",
    },
    {
      quote:
        "Thoughtful post, thanks",
      name: "Abigael Mokua",
      role: "Legal Assistant | Social Media Manager | Digital Creator",
      source: "LinkedIn",
    },
    {
      quote:
        "Thanks for sharing",
      name: "Fabrice Bamporineza",
      role: "Lead Organizer & Founder of The Rise Initiative | Entrepreneur",
      source: "LinkedIn",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="testimonials">
      <style>{`
        .testimonials {
          padding: clamp(48px, 8vw, 80px) clamp(16px, 4vw, 40px);
          background: #f8fafc;
          font-family: 'Space Grotesk', sans-serif;
        }

        .testimonials__container {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr auto 1.4fr;
          gap: 48px;
          align-items: center;
        }

        .testimonials__intro {
          max-width: 340px;
        }

        .testimonials__eyebrow {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #c9922a;
          margin: 0 0 12px;
        }

        .testimonials__title {
          font-size: clamp(24px, 3vw, 32px);
          font-weight: 700;
          color: #1f2230;
          line-height: 1.3;
          margin: 0 0 12px;
        }

        .testimonials__description {
          font-size: 15px;
          color: #6b7280;
          line-height: 1.6;
          margin: 0;
        }

        .testimonials__divider {
          width: 1px;
          height: 160px;
          background: #e5e7eb;
        }

        .testimonials__card {
          position: relative;
          min-height: 200px;
        }

        .testimonials__linkedin-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 999px;
          background: #0a66c2;
          color: #ffffff;
          font-size: 11px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .testimonials__linkedin-badge svg {
          width: 14px;
          height: 14px;
        }

        .testimonials__quote {
          font-size: clamp(16px, 2vw, 18px);
          font-weight: 400;
          color: #1f2230;
          line-height: 1.7;
          margin: 0 0 24px;
          font-style: italic;
          position: relative;
          padding-left: 20px;
          border-left: 3px solid #c9922a;
        }

        .testimonials__author {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .testimonials__avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #1f2230;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 16px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .testimonials__name {
          font-size: 15px;
          font-weight: 700;
          color: #1f2230;
          margin: 0;
        }

        .testimonials__role {
          font-size: 13px;
          color: #6b7280;
          margin: 2px 0 0;
        }

        .testimonials__controls {
          display: flex;
          gap: 8px;
          margin-top: 24px;
        }

        .testimonials__dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #d1d5db;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .testimonials__dot--active {
          background: #c9922a;
          width: 28px;
          border-radius: 999px;
        }

        @media (max-width: 768px) {
          .testimonials__container {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .testimonials__divider {
            width: 100%;
            height: 1px;
          }

          .testimonials__intro {
            max-width: 100%;
          }
        }
      `}</style>

      <div className="testimonials__container">
        <div className="testimonials__intro">
          <p className="testimonials__eyebrow">Testimonials</p>
          <h2 className="testimonials__title">What our community is saying</h2>
          <p className="testimonials__description">
            Real reactions from founders, creators, and communities engaging with our content on LinkedIn.
          </p>
        </div>

        <div className="testimonials__divider" />

        <div className="testimonials__card">
          <div className="testimonials__linkedin-badge">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </div>

          <blockquote className="testimonials__quote">
            {testimonials[activeIndex].quote}
          </blockquote>

          <div className="testimonials__author">
            <div className="testimonials__avatar">
              {testimonials[activeIndex].name.split(" ").map(n => n[0]).slice(0, 2).join("")}
            </div>
            <div>
              <p className="testimonials__name">{testimonials[activeIndex].name}</p>
              <p className="testimonials__role">{testimonials[activeIndex].role}</p>
            </div>
          </div>

          <div className="testimonials__controls">
            {testimonials.map((_, idx) => (
              <span
                key={idx}
                className={`testimonials__dot${idx === activeIndex ? " testimonials__dot--active" : ""}`}
                onClick={() => setActiveIndex(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
