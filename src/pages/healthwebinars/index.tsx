import React from "react";

export default function ComingSoon() {
  return (
    <div style={{
      height: "80vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      textAlign: "center"
    }}>
      <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>Coming Soon</h1>
      <p style={{ fontSize: "18px", color: "#555" }}>
        This page is currently under development.
      </p>
    </div>
  );
}
