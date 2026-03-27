import React from "react";

export default function TermsOfService() {
  return (
    <div className="legal-page">
      <style>{`
        .legal-page {
          font-family: 'Space Grotesk', sans-serif;
          background: #ffffff;
          min-height: 100vh;
        }

        .legal-hero {
          background: #1f2230;
          padding: clamp(48px, 8vw, 80px) clamp(16px, 4vw, 64px);
          text-align: center;
        }

        .legal-hero h1 {
          font-size: clamp(28px, 5vw, 44px);
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 8px;
        }

        .legal-hero p {
          font-size: 14px;
          color: #9ca3af;
        }

        .legal-content {
          max-width: 760px;
          margin: 0 auto;
          padding: 48px clamp(20px, 4vw, 40px) 80px;
          color: #374151;
          line-height: 1.8;
        }

        .legal-content h2 {
          font-size: 22px;
          font-weight: 700;
          color: #1f2230;
          margin: 40px 0 12px;
        }

        .legal-content h2:first-of-type {
          margin-top: 0;
        }

        .legal-content p {
          font-size: 15px;
          margin: 0 0 16px;
        }

        .legal-content ul {
          padding-left: 24px;
          margin: 0 0 16px;
        }

        .legal-content li {
          font-size: 15px;
          margin-bottom: 8px;
        }

        .legal-content a {
          color: #c9922a;
          text-decoration: none;
        }

        .legal-content a:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="legal-hero">
        <h1>Terms of Service</h1>
        <p>Last updated: March 2026</p>
      </div>

      <div className="legal-content">
        <h2>Acceptance of Terms</h2>
        <p>
          By accessing or using The Real Africa website at therealafrica.co and any associated
          services (collectively, the "Platform"), you agree to be bound by these Terms of Service.
          If you do not agree to these terms, please do not use the Platform.
        </p>

        <h2>About the Platform</h2>
        <p>
          The Real Africa is a media and community platform dedicated to telling authentic stories
          about Africa's technology, business, and creative ecosystems. We provide articles, video
          interviews, communities, travel experiences, mentorship programs, and career opportunities.
        </p>

        <h2>User Accounts</h2>
        <p>To access certain features, you may need to create an account. You agree to:</p>
        <ul>
          <li>Provide accurate and complete registration information.</li>
          <li>Maintain the security of your password and account.</li>
          <li>Notify us immediately of any unauthorized use of your account.</li>
          <li>Accept responsibility for all activities that occur under your account.</li>
        </ul>
        <p>
          We reserve the right to suspend or terminate accounts that violate these terms
          or engage in harmful behavior.
        </p>

        <h2>Communities</h2>
        <p>
          Our communities are spaces for learning, networking, and collaboration. By requesting
          to join or participating in a community, you agree to:
        </p>
        <ul>
          <li>Treat all members with respect and professionalism.</li>
          <li>Not share spam, offensive, or misleading content.</li>
          <li>Not use community spaces for unauthorized solicitation or promotion.</li>
          <li>Follow any additional guidelines set by community administrators.</li>
        </ul>
        <p>
          We reserve the right to remove members or content that violates community standards.
        </p>

        <h2>Content & Intellectual Property</h2>
        <p>
          All content on the Platform — including articles, interviews, images, logos, and
          design elements — is owned by The Real Africa or its content creators and is
          protected by intellectual property laws. You may not:
        </p>
        <ul>
          <li>Reproduce, distribute, or republish our content without written permission.</li>
          <li>Use our branding, logos, or trademarks without authorization.</li>
          <li>Scrape, crawl, or use automated tools to extract content from the Platform.</li>
        </ul>
        <p>
          You may share links to our content and quote brief excerpts with proper attribution.
        </p>

        <h2>User-Submitted Content</h2>
        <p>
          When you submit content to the Platform (such as community posts, join requests,
          or travel inquiries), you grant us a non-exclusive, worldwide license to use,
          display, and process that content in connection with operating the Platform.
          You retain ownership of your original content.
        </p>

        <h2>Travel Services</h2>
        <p>
          Travel experiences listed on the Platform are coordinated through third-party
          partners and providers. The Real Africa acts as a facilitator and is not directly
          responsible for:
        </p>
        <ul>
          <li>The quality or safety of third-party travel services.</li>
          <li>Changes, cancellations, or disruptions caused by travel providers.</li>
          <li>Personal injury, loss, or damage during travel experiences.</li>
        </ul>
        <p>
          We recommend that all travelers obtain appropriate travel insurance.
        </p>

        <h2>Newsletter & Communications</h2>
        <p>
          By subscribing to our newsletter or providing your email, you consent to receiving
          periodic communications from us. You can unsubscribe at any time by clicking the
          unsubscribe link in any email or contacting us directly.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          The Platform is provided "as is" without warranties of any kind. To the fullest
          extent permitted by law, The Real Africa shall not be liable for any indirect,
          incidental, special, or consequential damages arising from your use of the Platform,
          including but not limited to loss of data, revenue, or business opportunities.
        </p>

        <h2>Modifications</h2>
        <p>
          We reserve the right to modify these Terms of Service at any time. Changes will
          be posted on this page with an updated date. Continued use of the Platform after
          changes constitutes acceptance of the revised terms.
        </p>

        <h2>Governing Law</h2>
        <p>
          These terms shall be governed by and construed in accordance with applicable laws.
          Any disputes arising from these terms shall be resolved through good-faith negotiation
          before pursuing formal legal proceedings.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about these Terms of Service, please reach out:
        </p>
        <ul>
          <li>Email: <a href="mailto:therealafrica.co@gmail.com">therealafrica.co@gmail.com</a></li>
          <li>Phone: <a href="tel:+19197489995">+1 (919) 748-9995</a></li>
        </ul>
      </div>
    </div>
  );
}
