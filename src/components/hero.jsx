function Hero() {
  return (
    <section style={{
      height: "100vh",
      padding: "120px 32px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      background: `
        linear-gradient(
          rgba(2,6,23,0.6),
          rgba(2,6,23,1)
        ),
        url('/hero_image.jpeg') center/cover no-repeat
      `
    }}>
      <h1 style={{
        fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
        color: "white",
        maxWidth: "900px"
      }}>
        Africa, told properly.
      </h1>

      <p style={{
        marginTop: "24px",
        maxWidth: "600px",
        fontSize: "1.125rem",
        color: "#cbd5f5"
      }}>
        Stories, builders, and culture shaping the future of the continent.
      </p>

      <div className="scroll-tip">Scroll</div>
    </section>
  );
}

export default Hero;