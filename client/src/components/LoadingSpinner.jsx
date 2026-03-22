import React from "react";

export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner" />
      <p className="loading-spinner-text">{message}</p>

      <style>{`
        .loading-spinner-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 40vh;
          gap: 16px;
        }

        .loading-spinner {
          width: 36px;
          height: 36px;
          border: 3px solid #e5e7eb;
          border-top-color: #111827;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        .loading-spinner-text {
          font-size: 14px;
          color: #6b7280;
          font-family: inherit;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
