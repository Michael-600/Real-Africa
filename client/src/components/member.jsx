import React, { useState, useEffect } from "react";
import { Armchair } from "lucide-react";
import {useAuth} from "../lib/authContext";
import { supabase } from "../lib/supabase";

const SeatSelector = ({ onSeatReserved, hasReservedSeat }) => {
  const { user, loading } = useAuth();
  const [selectedSeat, setSelectedSeat] = useState(null);

  const TOTAL_SEATS = 16;
  const EVENT_ID = "2026-01-15-live-call";
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadSeats = async () => {
      try {
        const { data, error } = await supabase
          .from("seat_reservations")
          .select("seat_number")
          .eq("event_id", EVENT_ID);

        if (error) {
          console.error("Failed to load seats:", error);
        }

        const bookedSeats = data ? data.map(r => r.seat_number) : [];

        const generatedSeats = Array.from(
          { length: TOTAL_SEATS },
          (_, i) => ({
            id: i + 1,
            booked: bookedSeats.includes(i + 1),
          })
        );

        if (isMounted) {
          setSeats(generatedSeats);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      }
    };

    loadSeats();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleReserve = () => {
    // Allow logged-out users to proceed to auth even while loading
    if (loading && user) return;

    if (!user) {
      window.location.href = "/auth";
      return;
    }

    onSeatReserved({
      seatNumber: selectedSeat,
      userId: user.id,
    });

    console.log("Calling onSeatReserved", {
      seatNumber: selectedSeat,
      userId: user.id,
    });
  };

  return (
    <div className="seat-selector" id="seat-selector">
      <p className="seat-selector__meta">
        <strong>Next Live Meet:</strong> January 15th, 2026 ·{" "}
        {TOTAL_SEATS - seats.filter(s => s.booked).length} seats remaining
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
        type="button"
        className="seat-cta"
        disabled={!selectedSeat || (loading && user)}
        onClick={handleReserve}
      >
        {!selectedSeat
          ? "Select a seat"
          : loading
          ? "Checking authentication..."
          : !user
          ? "Log in to reserve your seat"
          : `Reserve seat ${selectedSeat}`}
      </button>
    </div>
  );
};

const Member = () => {
  const EVENT_ID = "2026-01-15-live-call";
  const { user } = useAuth();

  const [reservedSeat, setReservedSeat] = useState(null);

  useEffect(() => {
    if (!user) return;

    const loadMySeat = async () => {
      const { data, error } = await supabase
        .from("seat_reservations")
        .select("seat_number")
        .eq("event_id", EVENT_ID)
        .eq("user_id", user.id)
        .single();

      if (!error && data) {
        setReservedSeat(data.seat_number);
      }
    };

    loadMySeat();
  }, [user]);

  const onSeatReserved = async ({ seatNumber, userId }) => {
    const { error } = await supabase.from("seat_reservations").insert({
      event_id: EVENT_ID,
      seat_number: seatNumber,
      user_id: userId,
    });

    if (error) {
      console.error("Failed to reserve seat:", error);
      alert(error.message);
      return;
    }

    // Hard refresh seats by reloading the page for now
    // window.location.reload();
    setReservedSeat(seatNumber);
  };

  return (
    <div className="membership-wrapper">
      <section className="membership-card">
        <h2 className="membership-card__title">
          Reserve your seat
        </h2>

        <div className="membership-divider" />

        {reservedSeat ? (
          <div className="seat-confirmation">
            <h3 className="seat-confirmation__title">
              🎉 Seat Reserved
            </h3>
            <p className="seat-confirmation__text">
              You’ve successfully reserved <strong>Seat {reservedSeat}</strong> for the
              January 15th, 2026 live session.
            </p>
            <p className="seat-confirmation__subtext">
              We’ll remind you before the event starts.
            </p>
          </div>
        ) : (
          <SeatSelector
            onSeatReserved={onSeatReserved}
            hasReservedSeat={false}
          />
        )}
      </section>
    </div>
  );
};

export default Member;
