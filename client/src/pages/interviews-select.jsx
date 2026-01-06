import React from "react";

const InterviewSelect = () => {
  return (
    <main className="interview-page">
      {/* Header */}
      <section className="interview-header">
        <img
          className="author-avatar"
          src="https://placehold.co/48x48"
          alt="Author"
        />
        <div className="author-meta">
          <h4 className="author-name">Debbie L.</h4>
          <p className="post-date">Posted on 27th January 2025</p>
        </div>

        <h1 className="interview-title">
          The Story Behind Africa’s First AI-Powered HR Tool
        </h1>
      </section>

      {/* Hero Image */}
      <img
        className="interview-hero"
        src="https://placehold.co/870x565"
        alt="Interview hero"
      />

      {/* Article Body */}
      <article className="interview-body">
        <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <h3>Key Takeaways</h3>
        <ul>
          <li>Lorem ipsum dolor sit amet</li>
          <li>Non blandit massa enim nec scelerisque</li>
          <li>Neque egestas congue quisque egestas</li>
        </ul>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </article>

      {/* Watch Next */}
      <section className="watch-next">
        <h2>What to watch next</h2>

        <div className="watch-grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="watch-card">
              <img
                src="https://placehold.co/405x318"
                alt="Next interview"
              />
              <p className="watch-meta">
                By <span>John Doe</span> · Aug 23, 2021
              </p>
              <h3>
                The Story Behind Africa’s First AI-Powered HR Tool
              </h3>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default InterviewSelect;
