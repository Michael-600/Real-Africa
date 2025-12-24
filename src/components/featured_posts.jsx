function FeaturedPosts() {
  return (
    <section style={{
      padding: "120px 32px",
      backgroundColor: "#000000",
      color: "white"
    }}>
      <h2 style={{
        fontSize: "2rem",
        marginBottom: "32px"
      }}>
        Featured Stories
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "24px"
      }}>
        {[1, 2, 3].map((post) => (
          <div key={post} style={{
            padding: "24px",
            background: "#020617",
            borderRadius: "12px"
          }}>
            <h3>Story Title {post}</h3>
            <p style={{ color: "#94a3b8", marginTop: "12px" }}>
              Short description of the story goes here.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedPosts;