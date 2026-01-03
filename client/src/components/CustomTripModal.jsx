import React from 'react'

export default function CustomTripModal({ onClose }) {
    return (
      <div className="waitlist-overlay" onClick={onClose}>
        <div
          className="waitlist-modal custom-trip-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="waitlist-close" onClick={onClose}>
            ✕
          </button>
  
          <h2>Request a Custom Trip</h2>
          <p>
            Tell us what you’re dreaming of — our travel experts will design the
            perfect experience for you.
          </p>
  
          <div className="waitlist-field">
            <label>
              Full Name <span>*</span>
            </label>
            <input placeholder="Your full name" />
          </div>
  
          <div className="waitlist-field">
            <label>
              Email <span>*</span>
            </label>
            <input placeholder="you@email.com" />
          </div>
  
          <div className="waitlist-field">
            <label>
              Desired Destination(s) <span>*</span>
            </label>
            <input placeholder="e.g. Kenya, Morocco, South Africa" />
          </div>
  
          <div className="waitlist-row">
            <div className="waitlist-field">
              <label>Travel Dates</label>
              <input placeholder="e.g. June 10 – June 22" />
            </div>
  
            <div className="waitlist-field">
              <label>Group Size</label>
              <input placeholder="e.g. 2 people" />
            </div>
          </div>
  
          <div className="waitlist-field">
            <label>Trip Type</label>
            <select>
              <option>Select trip type</option>
              <option>Solo Trip</option>
              <option>Couples / Honeymoon</option>
              <option>Family</option>
              <option>Business / Exposure</option>
              <option>Digital Nomad</option>
              <option>Group / Retreat</option>
            </select>
          </div>
  
          <div className="waitlist-field">
            <label>Estimated Budget (USD)</label>
            <select>
              <option>Select a range</option>
              <option>$2,000 – $4,000</option>
              <option>$4,000 – $7,000</option>
              <option>$7,000 – $10,000</option>
              <option>$10,000+</option>
            </select>
          </div>
  
          <div className="waitlist-field">
            <label>
              What kind of experience are you looking for?
            </label>
            <small className="waitlist-helper">
              Adventure, culture, business exposure, relaxation, networking, etc.
            </small>
            <textarea
              rows="5"
              placeholder="Describe what you want to experience, see, or achieve on this trip…"
            />
          </div>
  
          <div className="waitlist-actions">
            <button className="waitlist-cancel" onClick={onClose}>
              Cancel
            </button>
            <button className="waitlist-submit">
              Request Custom Trip
            </button>
          </div>
        </div>
      </div>
    );
  }