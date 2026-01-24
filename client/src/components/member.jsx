import React, { useState } from "react";
import { Armchair } from "lucide-react";

const useAuth = () => {
  // TODO: replace with real auth (Supabase / Clerk / Firebase)
  return {
    user: null, // change to an object when logged in
  };
};

const SeatSelector = ({ onSeatReserved, hasReservedSeat }) => {
  const { user } = useAuth();
  const TOTAL_SEATS = 24;
  const BOOKED_SEATS = 8;

  const [selectedSeat, setSelectedSeat] = useState(null);

  const seats = Array.from({ length: TOTAL_SEATS }, (_, i) => ({
    id: i + 1,
    booked: i < BOOKED_SEATS,
  }));

  return (
    <div className="seat-selector" id="seat-selector">
      <p className="seat-selector__meta">
        <strong>Next Live Meet:</strong> January 15th, 2026 ·{" "}
        {TOTAL_SEATS - BOOKED_SEATS} seats remaining
      </p>

      <div className="seat-grid" style={{
        maxWidth: 300,
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
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: seat.booked
                  ? "#e5e7eb"
                  : isSelected
                  ? "#fde68a"
                  : "#374151",
                border: isSelected ? "2px solid #f59e0b" : "1px solid #6b7280",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
            >
              <Armchair
                size={18}
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
        onClick={() => {
          if (!user) {
            alert("Please log in to reserve a seat.");
            return;
          }
          onSeatReserved(selectedSeat);
        }}
      >
        {!selectedSeat
          ? "Select a Seat"
          : !user
          ? "Log in to reserve your seat"
          : `Reserve Seat ${selectedSeat}`}
      </button>
    </div>
  );
};

const Member = ({ onSeatReserved, hasReservedSeat }) => {
  return (
    <div className="membership-wrapper">
      <section className="membership-card">
        <h2 className="membership-card__title">
          Take a seat in the next live session.
        </h2>

        <p className="membership-card__description">
          Join our community by reserving a seat in the online meeting below for free, and get to ask your questions and get mentorship directly from the entrepreneurs we interview weekly. Reminders will be sent to those who have their seats reserved.
        </p>

        <SeatSelector
          onSeatReserved={onSeatReserved}
          hasReservedSeat={hasReservedSeat}
        />
      </section>
    </div>
  );
};

export default Member;
