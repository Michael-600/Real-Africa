

import React, { useState, useEffect } from "react";

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "It’s refreshing to see Africa’s tech scene presented with depth and creativity. Real stories, real people.",
      name: "Jeremy Jerome",
      role: "Investor & Mentor",
      avatar: "https://placehold.co/48x48",
    },
    {
      quote:
        "Real Africa captures the energy of builders and thinkers shaping the continent. The storytelling feels authentic and global.",
      name: "Amina Hassan",
      role: "Startup Founder",
      avatar: "https://placehold.co/48x48",
    },
    {
      quote:
        "This platform bridges Africa’s innovation ecosystem with the world. It’s insightful, modern, and deeply human.",
      name: "David Okoye",
      role: "Product Leader",
      avatar: "https://placehold.co/48x48",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000); // change slide every 4 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="testimonials">
      <div className="testimonials__container">
        {/* Left column */}
        <div className="testimonials__intro">
          <p className="testimonials__eyebrow">Testimonials</p>
          <h2 className="testimonials__title">What people say about our blog</h2>
          <p className="testimonials__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor.
          </p>
        </div>

        {/* Divider */}
        <div className="testimonials__divider" />

        {/* Testimonial */}
        <div className="testimonials__card">
          <blockquote className="testimonials__quote">
            “{testimonials[activeIndex].quote}”
          </blockquote>

          <div className="testimonials__author">
            <img
              src={testimonials[activeIndex].avatar}
              alt={testimonials[activeIndex].name}
              className="testimonials__avatar"
            />
            <div>
              <p className="testimonials__name">
                {testimonials[activeIndex].name}
              </p>
              <p className="testimonials__role">
                {testimonials[activeIndex].role}
              </p>
            </div>
          </div>

          {/* Decorative controls */}
          <div className="testimonials__controls">
            {testimonials.map((_, idx) => (
              <span
                key={idx}
                className={
                  "testimonials__dot" +
                  (idx === activeIndex
                    ? " testimonials__dot--active"
                    : "")
                }
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