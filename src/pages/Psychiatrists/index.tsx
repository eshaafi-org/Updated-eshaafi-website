"use client";
import React, { useEffect } from "react";
import styles from "../../styles/medicine.module.scss";
import { trackEvent } from "@/lib/ga";

export default function MedicinePage() {
  useEffect(() => {
    trackEvent('psychiatrist_list_view_clk', {
      section: 'page_load'
    })
  }, [])

  return (
    <section className={styles.medicinePage}>
      <div className={styles.glassBox}>
        <h1>Coming Soon</h1>
        {/* <p>Something amazing is on the way...</p> */}
        <div className="loadingBar"></div>
      </div>
    </section>
  );
}
