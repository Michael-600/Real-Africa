import React from 'react';

export default function NextLiveCallCard({
  nextLiveCall,
  tiers,
  hasReservedSeat,
  canJoinCall,
  onReserveSeat,
  onJoinCall,
}) {
  return (
    <section>
      <div className={`live-call ${(hasReservedSeat && !canJoinCall) ? "locked" : ""}`}>
        <div className="space-y-1">
          <p className="text-sm text-zinc-500">Next Live Call</p>

          <h2 className="text-xl font-medium">
            {nextLiveCall.title}
          </h2>

          <p className="text-zinc-600">
            {nextLiveCall.datetime}
          </p>

          <p className="text-sm text-zinc-500">
            Mentor Tier:{" "}
            {tiers.find(t => t.level === nextLiveCall.tierRequired)?.name}
          </p>

          {nextLiveCall.speaker && (
            <div className="speaker-row speaker-highlight mt-3">
              <img
                src={nextLiveCall.speaker.photo}
                alt={nextLiveCall.speaker.name}
                className="speaker-avatar speaker-avatar-lg"
              />

              <div className="speaker-info">
                <p className="speaker-name text-lg font-semibold">
                  {nextLiveCall.speaker.name}
                </p>
                <p className="speaker-role text-sm font-medium text-zinc-600">
                  {nextLiveCall.speaker.role}
                </p>

                <div className="speaker-links">
                  {nextLiveCall.speaker.links.linkedin && (
                    <a
                      href={nextLiveCall.speaker.links.linkedin}
                      target="_blank"
                      rel="noreferrer"
                    >
                      LinkedIn
                    </a>
                  )}

                  {nextLiveCall.speaker.links.website && (
                    <a
                      href={nextLiveCall.speaker.links.website}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Website
                    </a>
                  )}

                  {nextLiveCall.speaker.links.portfolio && (
                    <a
                      href={nextLiveCall.speaker.links.portfolio}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Portfolio
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          disabled={hasReservedSeat && !canJoinCall}
          className={hasReservedSeat && !canJoinCall ? "disabled" : "enabled"}
          onClick={() => {
            if (!hasReservedSeat) onReserveSeat();
            else if (canJoinCall) onJoinCall();
          }}
        >
          {!hasReservedSeat
            ? "Reserve Seat"
            : !canJoinCall
            ? "Seat Reserved"
            : "Join Live Call"}
        </button>
      </div>
    </section>
  );
}