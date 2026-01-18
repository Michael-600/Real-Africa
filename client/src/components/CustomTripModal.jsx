import React, { useState } from 'react'

export default function CustomTripModal({ onClose, onSubmit }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [dates, setDates] = React.useState("");
  const [groupSize, setGroupSize] = React.useState("");
  const [tripType, setTripType] = React.useState("");
  const [budget, setBudget] = React.useState("");
  const [vision, setVision] = React.useState("");
  const [submitted, setSubmitted] = useState(false);
    return (
      <div className="waitlist-overlay" onClick={onClose}>
        <div
          className="waitlist-modal custom-trip-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="waitlist-close" onClick={onClose}>
            ✕
          </button>
  
          {submitted ? (
            <>
              <div className="confirmation-icon">🌍</div>
              <h2>Request Received</h2>
              <p>
                We’re designing your custom itinerary and will be in touch shortly.
              </p>
              <p style={{ fontSize: 14, color: "#166534" }}>
                Expect a response within 24–48 hours.
              </p>
            </>
          ) : (
            <>
              <h2>Request a Custom Trip</h2>
              <p>
                Tell us what you’re dreaming of — our travel experts will design the
                perfect experience for you.
              </p>
  
              <div className="waitlist-field">
                <label>
                  Full Name <span>*</span>
                </label>
                <input
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
  
              <div className="waitlist-field">
                <label>
                  Email <span>*</span>
                </label>
                <input
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
  
              <div className="waitlist-field">
                <label>
                  Desired Destination(s) <span>*</span>
                </label>
                <input
                  placeholder="e.g. Kenya, Morocco, South Africa"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
  
              <div className="waitlist-row">
                <div className="waitlist-field">
                  <label>Travel Dates</label>
                  <input
                    placeholder="e.g. June 10 – June 22"
                    value={dates}
                    onChange={(e) => setDates(e.target.value)}
                  />
                </div>
  
                <div className="waitlist-field">
                  <label>Group Size</label>
                  <input
                    placeholder="e.g. 2 people"
                    value={groupSize}
                    onChange={(e) => setGroupSize(e.target.value)}
                  />
                </div>
              </div>
  
              <div className="waitlist-field">
                <label>Trip Type</label>
                <select value={tripType} onChange={(e) => setTripType(e.target.value)}>
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
                <select value={budget} onChange={(e) => setBudget(e.target.value)}>
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
                  value={vision}
                  onChange={(e) => setVision(e.target.value)}
                />
              </div>
            </>
          )}
  
          <div className="waitlist-actions">
            {!submitted && (
              <>
                <button className="waitlist-cancel" onClick={onClose}>
                  Cancel
                </button>
                <button
                  className="waitlist-submit"
                  onClick={async () => {
                    await onSubmit({
                      tripType,
                      destination,
                      dates,
                      groupSize,
                      budget,
                      vision,
                      name,
                      email,
                    });
                    setSubmitted(true);
                  }}
                >
                  Request Custom Trip
                </button>
              </>
            )}
  
            {submitted && (
              <button className="waitlist-submit" onClick={onClose}>
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    );
}