import React, { useState } from "react";
import { FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setLoading(true);

    // simulate network delay / email submission
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
    }, 1200);
  };

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

          {!subscribed && !loading ? (
            <form className="footer__form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                className="footer__input"
                required
              />
              <button type="submit" className="footer__button">
                Subscribe
              </button>
            </form>
          ) : loading ? (
            <div className="footer__confirmation">
              <p>
                <strong>Subscribing…</strong>
              </p>
              <p>Please wait a moment.</p>
            </div>
          ) : (
            <div className="footer__confirmation">
              <p>
                <strong>You’re in.</strong>
              </p>
              <p>
                We’ll be in touch with stories, opportunities, and curated experiences
                from across Africa.
              </p>
            </div>
          )}
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
            <a href="https://twitter.com/therealafrica" target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com/therealafrica" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com/company/therealafrica" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://youtube.com/@therealafrica" target="_blank" rel="noreferrer">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;