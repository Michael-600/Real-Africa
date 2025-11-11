import React from "react";

export const Navbar = () => {
  return (
    <div style={{ width: 1440, height: 80, position: "relative" }}>
  {/* background */}
  <div
    style={{
      width: 1440,
      height: 80,
      left: 0,
      top: 0,
      position: "absolute",
      background: "#232536",
      zIndex: 0, // 👈 keep it behind
    }}
  />

  {/* button */}
  <div
    style={{
      paddingLeft: 48,
      paddingRight: 48,
      paddingTop: 16,
      paddingBottom: 16,
      left: 1181,
      top: 12,
      position: "absolute",
      background: "white",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      gap: 12,
      display: "inline-flex",
      zIndex: 1, // 👈 place above
    }}
  >
    <div
      style={{
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        color: "#232536",
        fontSize: 18,
        fontFamily: "Sen",
        fontWeight: "700",
        lineHeight: "24px",
        wordWrap: "break-word",
      }}
    >
      Get Featured
    </div>
  </div>

  {/* text links */}
  <div
    style={{
      left: 1066,
      top: 26,
      position: "absolute",
      justifyContent: "center",
      display: "flex",
      flexDirection: "column",
      color: "white",
      fontSize: 16,
      fontFamily: "Inter",
      fontWeight: "400",
      lineHeight: "28px",
      wordWrap: "break-word",
      zIndex: 1, // 👈 add this to all text
    }}
  >
    Contact us
  </div>

  <div
    style={{
      width: 71,
      height: 27.65,
      left: 971,
      top: 27,
      position: "absolute",
      justifyContent: "center",
      display: "flex",
      flexDirection: "column",
      color: "white",
      fontSize: 16,
      fontFamily: "Inter",
      fontWeight: "400",
      lineHeight: "28px",
      wordWrap: "break-word",
      zIndex: 1,
    }}
  >
    About Us
  </div>

  <div
    style={{
      left: 913,
      top: 27,
      position: "absolute",
      justifyContent: "center",
      display: "flex",
      flexDirection: "column",
      color: "white",
      fontSize: 16,
      fontFamily: "Inter",
      fontWeight: "400",
      lineHeight: "28px",
      wordWrap: "break-word",
      zIndex: 1,
    }}
  >
    Blog
  </div>

  <div
    style={{
      left: 844,
      top: 26,
      position: "absolute",
      justifyContent: "center",
      display: "flex",
      flexDirection: "column",
      color: "white",
      fontSize: 16,
      fontFamily: "Inter",
      fontWeight: "400",
      lineHeight: "28px",
      wordWrap: "break-word",
      zIndex: 1,
    }}
  >
    Home
  </div>
</div>
  );
};

export default Navbar;