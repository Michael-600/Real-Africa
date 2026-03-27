import React from "react";

export default function PrivacyPolicy() {
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
        <h1>Privacy Policy</h1>
        <p>Last updated: March 2026</p>
      </div>

      <div className="legal-content">
        <h2>Introduction</h2>
        <p>
          The Real Africa ("we," "us," or "our") is committed to protecting your privacy.
          This Privacy Policy explains how we collect, use, disclose, and safeguard your
          information when you visit our website at therealafrica.co and use our services.
        </p>

        <h2>Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul>
          <li><strong>Account Information:</strong> When you create an account, we collect your name, email address, country, and password.</li>
          <li><strong>Profile Information:</strong> Profile photos and any additional details you choose to provide.</li>
          <li><strong>Community Data:</strong> Information submitted when you request to join a community, including your name, email, and reason for joining.</li>
          <li><strong>Newsletter Subscriptions:</strong> Your email address when you subscribe to our newsletter.</li>
          <li><strong>Travel Requests:</strong> Trip preferences, dates, budget, and contact information when you request a custom travel itinerary.</li>
          <li><strong>Usage Data:</strong> Pages visited, time spent on the site, browser type, and device information collected automatically.</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide, operate, and maintain our platform and services.</li>
          <li>Process community join requests and manage memberships.</li>
          <li>Send newsletters, updates, and promotional communications you've opted into.</li>
          <li>Respond to inquiries and provide customer support.</li>
          <li>Curate and coordinate travel experiences.</li>
          <li>Improve our website, content, and user experience.</li>
          <li>Detect and prevent fraud or unauthorized access.</li>
        </ul>

        <h2>Information Sharing</h2>
        <p>
          We do not sell, trade, or rent your personal information to third parties.
          We may share information with:
        </p>
        <ul>
          <li><strong>Service Providers:</strong> Trusted third-party services that help us operate the platform (e.g., hosting, email delivery, authentication).</li>
          <li><strong>Legal Requirements:</strong> When required by law or to protect our rights, safety, or property.</li>
          <li><strong>Community Leaders:</strong> Limited information (name, email) shared with community administrators for membership management.</li>
        </ul>

        <h2>Data Storage & Security</h2>
        <p>
          Your data is stored securely using industry-standard encryption and security practices.
          We use Supabase for our backend infrastructure, which provides enterprise-grade security,
          row-level security policies, and encrypted data storage. However, no method of electronic
          storage is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h2>Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access the personal information we hold about you.</li>
          <li>Request correction of inaccurate information.</li>
          <li>Request deletion of your account and associated data.</li>
          <li>Unsubscribe from marketing communications at any time.</li>
          <li>Withdraw consent for data processing where applicable.</li>
        </ul>

        <h2>Cookies</h2>
        <p>
          We use essential cookies to maintain your session and authentication state.
          We do not use third-party tracking cookies for advertising purposes.
        </p>

        <h2>Children's Privacy</h2>
        <p>
          Our services are not directed to individuals under the age of 13. We do not
          knowingly collect personal information from children. If we learn that we have
          collected data from a child under 13, we will take steps to delete it promptly.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any
          changes by posting the new policy on this page and updating the "Last updated" date.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <ul>
          <li>Email: <a href="mailto:therealafrica.co@gmail.com">therealafrica.co@gmail.com</a></li>
          <li>Phone: <a href="tel:+19197489995">+1 (919) 748-9995</a></li>
        </ul>
      </div>
    </div>
  );
}
