import React from 'react';

export default function GetFeatured({ onClose }) {
  return (
    <div
      className="waitlist-overlay"
      onClick={onClose}
    >
      <div
        className="waitlist-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="waitlist-close"
          onClick={onClose}
        >
          ✕
        </button>

        <h2>Get Featured</h2>
        <p>Share your story and get featured on Real Africa.</p>

        <div className="waitlist-field">
          <label>
            Name <span>*</span>
          </label>
          <input placeholder="Your name" />
        </div>

        <div className="waitlist-field">
          <label>
            Email <span>*</span>
          </label>
          <input placeholder="you@email.com" />
        </div>

        <div className="waitlist-field">
          <label>Company / Venture (Must be based in Africa)</label>
          <input placeholder="Your company, startup, or initiative" />
        </div>

        <div className="waitlist-field">
          <label>
            What makes you exceptional?
          </label>
          <small className="waitlist-helper">
          </small>
          <textarea
            placeholder="Share your journey, achievements, challenges you've overcome, or impact you're creating…"
            rows="5"
          />
        </div>

        <div className="waitlist-actions">
          <button
            className="waitlist-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="waitlist-submit">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}