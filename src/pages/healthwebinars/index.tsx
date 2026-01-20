import React, { useEffect } from "react";
import { trackEvent } from "@/lib/ga";

export default function ComingSoon() {
  useEffect(() => {
    if (!sessionStorage.getItem('health_webinars_page_view_tracked')) {
      trackEvent('health_webinars_page_view_clk', {
        section: 'page_load'
      });
      sessionStorage.setItem('health_webinars_page_view_tracked', 'true');
    }
  }, []);

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
