import React from 'react'
import { useState } from "react";
import Footer from "../components/footer";
import CustomTripModal from "../components/CustomTripModal";

export default function Travel() {
  const [customTripOpen, setCustomTripOpen] = useState(false);
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [plannerStep, setPlannerStep] = useState(1);
  const [plannerData, setPlannerData] = useState({
    tripType: "",
    destination: "",
    dates: "",
    groupSize: "",
    budget: "",
    vision: "",
    name: "",
    email: "",
  });
  return (
    <>
      {/* Hero */}
        <section className="travel-hero luxe-hero">
          <div className="luxe-hero-overlay" />

          <div className="luxe-hero-content">
            <p>
              Stress-free bucket list experiences curated by our team of
              African travel experts.
            </p>

            <button
              className="btn-primary"
              onClick={() => {
                setPlannerStep(1);
                setPlannerOpen(true);
              }}
            >
              Plan Your Trip
            </button>
          </div>
        </section>

      {/* Filters */}
      <section className="travel-filters">
        <button className="filter-btn">Business Exposure</button>
        <button className="filter-btn">Meet Entrepreneurs</button>
        <button className="filter-btn">Digital Nomad</button>
        <button className="filter-btn">Networking</button>
        <button className="filter-btn">Family/Couples</button>
        <button className="filter-btn">Solo Trip</button>
      </section>

      {/* Trip Cards Grid */}
      <section className="trip-cards">
        {[
          { title: "Cairo Magic", price: "from $3,400", nights: "10 nights", img: "/assets/cairo.jpg" },
          { 
            title: "Cape Town Experience", 
            price: "from $9,900", 
            nights: "6 weeks", 
            img: "/assets/cape town.png",
            link: "https://www.ixperience.co/for-university/programs/cape-town/data-science-ai#City-info"
          },
          { title: "Nairobi Safari", price: "from $6,200", nights: "8 nights", img: "/assets/nairobi.png" },
          { title: "Accra Bucketlist", price: "from $3,900", nights: "7 nights", img: "/assets/accra.avif" },
        ].map((trip, idx) => (
          <div className="trip-card" key={idx}>
            <img src={trip.img} alt={trip.title} />
            <div className="trip-info">
              <h3>{trip.title}</h3>
              <p className="trip-meta">
                {trip.nights} · <span className="trip-price">{trip.price}</span>
              </p>
              {trip.link ? (
                <a
                  href={trip.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  View Details
                </a>
              ) : (
                <button className="btn-outline">Coming soon</button>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h4>1. Choose Your Trip</h4>
            <p>Select the perfect experience or request a custom itinerary.</p>
          </div>
          <div className="step">
            <h4>2. Customize Details</h4>
            <p>We tailor your itinerary to your dates, interests & budget.</p>
          </div>
          <div className="step">
            <h4>3. Book & Travel</h4>
            <p>Secure with a small deposit and enjoy your adventure!</p>
          </div>
        </div>
      </section>

      {/* Custom Trip CTA */}
      <section className="custom-trip">
        <h2>Can’t Find What You Want?</h2>
        <p>
          Request a fully customized trip and we’ll build the perfect itinerary for you.
        </p>
        <button
          className="btn-primary"
          onClick={() => setCustomTripOpen(true)}
        >
          Request Custom Trip
        </button>
      </section>

      {/* FAQs */}
      <section className="travel-faqs">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-list">
          <details className="faq-item">
            <summary>What’s included in the trip packages?</summary>
            <p>
              Our packages typically include accommodation, curated experiences,
              select meals, airport transfers, and on-ground support.
            </p>
          </details>

          <details className="faq-item">
            <summary>Can I customize my trip?</summary>
            <p>
              Yes. Every trip can be customized based on your preferences,
              travel dates, and budget.
            </p>
          </details>

          <details className="faq-item">
            <summary>How do payments work?</summary>
            <p>
              You can secure your trip with a small deposit. The remaining
              balance is paid in milestones before departure.
            </p>
          </details>

          <details className="faq-item">
            <summary>Do you support solo travelers?</summary>
            <p>
              Absolutely. We design safe, social, and enriching experiences
              for solo travelers.
            </p>
          </details>
        </div>
      </section>

      <div className="section-divider" />

    {customTripOpen && (
      <CustomTripModal onClose={() => setCustomTripOpen(false)} />
    )}

    {plannerOpen && (
      <div className="waitlist-overlay" onClick={() => setPlannerOpen(false)}>
        <div
          className="waitlist-modal custom-trip-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="waitlist-close" onClick={() => setPlannerOpen(false)}>
            ✕
          </button>

          {/* STEP INDICATOR */}
          <p style={{ fontSize: 14, color: "#666", marginBottom: 8 }}>
            Step {plannerStep <= 4 ? plannerStep : 4} of 4
          </p>

          {/* STEP 1 */}
          {plannerStep === 1 && (
            <>
              <h2>What kind of trip are you planning?</h2>
              <div className="waitlist-field">
                <select
                  value={plannerData.tripType}
                  onChange={(e) =>
                    setPlannerData({ ...plannerData, tripType: e.target.value })
                  }
                >
                  <option value="">Select trip type</option>
                  <option>Business / Exposure</option>
                  <option>Culture & History</option>
                  <option>Safari / Nature</option>
                  <option>Networking / Retreat</option>
                  <option>Digital Nomad</option>
                  <option>Family / Couples</option>
                  <option>Solo Trip</option>
                </select>
              </div>
            </>
          )}

          {/* STEP 2 */}
          {plannerStep === 2 && (
            <>
              <h2>Trip details</h2>
              <div className="waitlist-field">
                <label>Destination(s)</label>
                <input
                  value={plannerData.destination}
                  onChange={(e) =>
                    setPlannerData({ ...plannerData, destination: e.target.value })
                  }
                  placeholder="e.g. Kenya, Morocco"
                />
              </div>

              <div className="waitlist-field">
                <label>Travel dates</label>
                <input
                  value={plannerData.dates}
                  onChange={(e) =>
                    setPlannerData({ ...plannerData, dates: e.target.value })
                  }
                  placeholder="Flexible / June 2026"
                />
              </div>

              <div className="waitlist-field">
                <label>Group size</label>
                <input
                  value={plannerData.groupSize}
                  onChange={(e) =>
                    setPlannerData({ ...plannerData, groupSize: e.target.value })
                  }
                  placeholder="Number of people"
                />
              </div>
            </>
          )}

          {/* STEP 3 */}
          {plannerStep === 3 && (
            <>
              <h2>Budget & expectations</h2>
              <div className="waitlist-field">
                <select
                  value={plannerData.budget}
                  onChange={(e) =>
                    setPlannerData({ ...plannerData, budget: e.target.value })
                  }
                >
                  <option value="">Select budget range</option>
                  <option>$2,000 – $4,000</option>
                  <option>$4,000 – $7,000</option>
                  <option>$7,000 – $10,000</option>
                  <option>$10,000+</option>
                </select>
              </div>

              <div className="waitlist-field">
                <label>What do you want from this trip?</label>
                <textarea
                  rows="4"
                  value={plannerData.vision}
                  onChange={(e) =>
                    setPlannerData({ ...plannerData, vision: e.target.value })
                  }
                  placeholder="Impact, rest, business exposure, networking, etc."
                />
              </div>
            </>
          )}

          {/* STEP 4 */}
          {plannerStep === 4 && (
            <>
              <h2>Your details</h2>
              <div className="waitlist-field">
                <label>Name</label>
                <input
                  value={plannerData.name}
                  onChange={(e) =>
                    setPlannerData({ ...plannerData, name: e.target.value })
                  }
                />
              </div>

              <div className="waitlist-field">
                <label>Email</label>
                <input
                  value={plannerData.email}
                  onChange={(e) =>
                    setPlannerData({ ...plannerData, email: e.target.value })
                  }
                />
              </div>
            </>
          )}

          {/* STEP 5: Confirmation */}
          {plannerStep === 5 && (
            <>
            <div className="confirmation-icon">🌍</div>
            <h2>Request Received</h2>
            <p>
              We’re designing your itinerary and will be in touch shortly.
            </p>
            <p style={{ fontSize: 14, color: "#166534" }}>
              Expect a response within 24–48 hours.
            </p>
          </>
          )}

          {/* ACTIONS */}
          <div className="waitlist-actions">
            {plannerStep < 5 && plannerStep > 1 && (
              <button
                className="waitlist-cancel"
                onClick={() => setPlannerStep(plannerStep - 1)}
              >
                Back
              </button>
            )}

            {plannerStep < 4 && (
              <button
                className="waitlist-submit"
                onClick={() => setPlannerStep(plannerStep + 1)}
              >
                Next
              </button>
            )}

            {plannerStep === 4 && (
              <button
                className="waitlist-submit"
                onClick={() => setPlannerStep(5)}
              >
                Design My Trip
              </button>
            )}

            {plannerStep === 5 && (
              <button
                className="waitlist-submit"
                onClick={() => {
                  setPlannerOpen(false);
                  setPlannerStep(1);
                }}
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    )}
    </>
  );
}