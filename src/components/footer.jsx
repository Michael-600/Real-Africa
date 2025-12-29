

import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Top navigation */}
        <nav className="footer__nav">
          <a href="#">Home</a>
          <a href="#">Blog</a>
          <a href="#">About us</a>
          <a href="#">Contact us</a>
          <a href="#">Privacy Policy</a>
        </nav>

        {/* Newsletter */}
        <div className="footer__newsletter">
          <h3 className="footer__newsletter-title">
            Subscribe to our newsletter to get latest updates and news
          </h3>

          <form className="footer__form">
            <input
              type="email"
              placeholder="Enter your email"
              className="footer__input"
            />
            <button type="submit" className="footer__button">
              Subscribe
            </button>
          </form>
        </div>

        {/* Divider */}
        <div className="footer__divider" />

        {/* Bottom */}
        <div className="footer__bottom">
          <div className="footer__contact">
            <p>The Real Africa — Nairobi, Kenya</p>
            <p>info@therealafrica.com · </p>
          </div>

          <div className="footer__socials">
            <span aria-hidden />
            <span aria-hidden />
            <span aria-hidden />
            <span aria-hidden />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;