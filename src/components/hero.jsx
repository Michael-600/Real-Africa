function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        position: "relative",
        backgroundImage: "url('/assets/hero_image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(16px, 5vw, 64px)",
        boxSizing: "border-box",
        fontFamily: "Space Grotesk, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Gradient Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 71.93% 80.99% at 74.58% 0%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%)",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 900,
          display: "flex",
          flexDirection: "column",
          marginTop: "-10vh",
          gap: "16px",
        }}
      >
        {/* Posted By */}
        <div
          style={{
            color: "white",
            fontFamily: "inherit",
            fontSize: "clamp(12px, 3vw, 16px)",
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          <span style={{ fontWeight: 500 }}>Posted By </span>
          <span style={{ fontWeight: 900 }}>THE REAL AFRICA</span>
        </div>

        {/* Title */}
        <h1
          style={{
            color: "white",
            fontFamily: "inherit",
            fontSize: "clamp(28px, 6vw, 56px)",
            fontWeight: 700,
            lineHeight: "1.15",
            maxWidth: "100%",
          }}
        >
          Spotlighting African Tech: Stories of Innovation and Impact
        </h1>

        {/* Author */}
        <div
          style={{
            fontFamily: "inherit",
            fontSize: "clamp(14px, 3.5vw, 16px)",
            lineHeight: "1.7",
            color: "white",
          }}
        >
          By <span style={{ color: "#FFD050" }}>Debbie Lalude</span> | May 23, 2025
        </div>

        {/* Description */}
        <p
          style={{
            maxWidth: 600,
            fontFamily: "inherit",
            fontSize: "clamp(14px, 3.5vw, 16px)",
            lineHeight: "1.7",
            color: "white",
          }}
        >
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident.
        </p>

        {/* CTA Button */}
        <button
          style={{
            marginTop: 12,
            alignSelf: "flex-start",
            padding: "clamp(12px, 4vw, 16px) clamp(28px, 8vw, 48px)",
            background: "#FFD050",
            borderRadius: 50,
            border: "1px solid black",
            fontFamily: "inherit",
            fontSize: "clamp(16px, 4vw, 18px)",
            fontWeight: 700,
            color: "#232536",
            cursor: "pointer",
          }}
        >
          Read More &gt;
        </button>
      </div>
    </section>
  );
}

export default Hero;