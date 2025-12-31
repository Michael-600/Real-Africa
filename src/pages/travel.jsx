import Footer from '../components/footer'

export default function Travel() {
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

            <button className="btn-primary">Plan Your Trip</button>
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
          { title: "Cape Town Experience", price: "from $3,900", nights: "7 nights", img: "/assets/cape town.png" },
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
              <button className="btn-outline">View Details</button>
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
        <button className="btn-primary">Request Custom Trip</button>
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

    </>
  );
}