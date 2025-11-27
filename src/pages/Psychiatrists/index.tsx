"use client";
import React from "react";
import styles from "../../styles/medicine.module.scss";

export default function MedicinePage() {
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
