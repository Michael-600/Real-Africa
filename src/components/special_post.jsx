import React from "react";

const SpecialPost = () => {
  return (
    <section className="special-post">
      <div className="special-post__media">
        <img
          src="./public/assets/hero_image1.jpeg"
          alt="Featured story"
          className="special-post__image"
        />
      </div>

      <div className="special-post__card">
        <p className="special-post__eyebrow">Why we started</p>

        <h2 className="special-post__title">
          We wanted to tell the stories no one else was telling.
        </h2>

        <p className="special-post__body">
          In a world full of noise, The Real Africa is focused on truth, talent,
          and transformation. We’re building a platform that reflects the
          brilliance of Africa, from tech parks in Kigali to boardrooms in Cape
          Town.
        </p>

        <a href="#" className="special-post__cta">Meet the Creators →</a>
      </div>
    </section>
  );
};

export default SpecialPost;
