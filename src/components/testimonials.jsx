

import React from "react";

const Testimonials = () => {
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
            “It’s refreshing to see Africa’s tech scene presented with depth and
            creativity. Real stories, real people.”
          </blockquote>

          <div className="testimonials__author">
            <img
              src="https://placehold.co/48x48"
              alt="Jeremy Jerome"
              className="testimonials__avatar"
            />
            <div>
              <p className="testimonials__name">Jeremy Jerome</p>
              <p className="testimonials__role">Investor & Mentor</p>
            </div>
          </div>

          {/* Decorative controls */}
          <div className="testimonials__controls">
            <span className="testimonials__dot testimonials__dot--active" />
            <span className="testimonials__dot" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;