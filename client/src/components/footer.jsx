import React, { useState, useRef } from "react";
import { FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

const Footer = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const lastSubmitRef = useRef(0);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const now = Date.now();
    if (now - lastSubmitRef.current < 30_000) {
      setErrorMsg("Please wait a moment before trying again.");
      return;
    }
    lastSubmitRef.current = now;

    if (!supabase) {
      setErrorMsg("Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
      return;
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMsg("Please enter an email address.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from("subscriptions")
        .insert([{ email: trimmedEmail, source: "footer" }])
        

      // If you have a UNIQUE(email) constraint, duplicate inserts throw 23505.
      if (error) {
        if (error.code === "23505") {
          // Treat as success UX-wise: already subscribed.
          setSubscribed(true);
          return;
        }

        console.error("Newsletter signup error:", error);
        setErrorMsg("We couldn’t subscribe you right now. Please try again later.");
        return;
      }

      setSubscribed(true);
      setEmail("");
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="footer__button">
                Subscribe
              </button>
              {errorMsg ? <p className="footer__error">{errorMsg}</p> : null}
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