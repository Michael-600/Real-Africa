import React, { useState } from "react";
import { Armchair } from "lucide-react";

const SeatSelector = () => {
  const TOTAL_SEATS = 24;
  const BOOKED_SEATS = 8;

  const [selectedSeat, setSelectedSeat] = useState(null);

  const seats = Array.from({ length: TOTAL_SEATS }, (_, i) => ({
    id: i + 1,
    booked: i < BOOKED_SEATS,
    almostFull: i >= BOOKED_SEATS && i < BOOKED_SEATS + 4,
  }));

  return (
    <div className="seat-selector">
      <p className="seat-selector__meta">
        <strong>Next Live Meet:</strong> January 15th, 2026 ·{" "}
        {TOTAL_SEATS - BOOKED_SEATS} seats remaining
      </p>

      <div style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 10px",
        borderRadius: 999,
        background: "rgba(251,146,60,0.12)",
        color: "#9a3412",
        fontSize: 12,
        fontWeight: 600,
        width: "fit-content",
        marginBottom: 12,
      }}>
        <span style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#fb923c",
          display: "inline-block",
        }} />
        Almost full
      </div>

      <div className="seat-grid" style={{
        maxWidth: 360,
        margin: "0 auto",
      }}>
        {seats.map((seat) => {
          const isSelected = selectedSeat === seat.id;

          return (
            <button
              key={seat.id}
              disabled={seat.booked}
              onClick={() => setSelectedSeat(seat.id)}
              className={`seat seat--circle ${seat.booked ? "seat--booked" : ""} ${isSelected ? "seat--selected" : ""}`}
              aria-label={`Seat ${seat.id}`}
              title={`Seat ${seat.id}`}
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: seat.booked
                  ? "#e5e7eb"
                  : isSelected
                  ? "#fde68a"
                  : seat.almostFull
                  ? "linear-gradient(135deg, #fdba74, #fb923c)"
                  : "#374151",
                border: isSelected ? "2px solid #f59e0b" : "1px solid #6b7280",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
            >
              <Armchair
                size={22}
                strokeWidth={2}
                className="seat-icon"
                color={
                  seat.booked
                    ? "#9ca3af"
                    : isSelected
                    ? "#92400e"
                    : "#e5e7eb"
                }
              />
            </button>
          );
        })}
      </div>

      <button
        className="seat-cta"
        disabled={!selectedSeat}
      >
        {selectedSeat ? `Seat ${selectedSeat} Selected` : "Select a Seat"}
      </button>
    </div>
  );
};

const Member = () => {
  return (
    <div className="membership-wrapper">
      <section className="membership-card">
        <h2 className="membership-card__title">
          Join the Movement.
        </h2>

        <p className="membership-card__description">
          Join our community by reserving a seat for at least one online meeting below for free, and get to ask your questions and get mentorship directly from the entrepreneurs we interview weekly. 
        </p>

        <SeatSelector />
      </section>
    </div>
  );
};

export default Member;
