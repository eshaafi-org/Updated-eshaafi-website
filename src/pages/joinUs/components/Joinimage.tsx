"use client";
import React from "react";
import styles from "../../../styles/joinus.module.scss";

const JoinFamily = () => {
  return (
    <section className={styles.joinFamilySection}>
      <div className={styles.overlayimg}></div>
      <div className={styles.contents}>
        <h2>Become Part of the eShaafi Family</h2>
        
        {/* <p>
          Join a team that&apos;s passionate about making healthcare accessible,
          affordable, and efficient for everyone. Your journey to creating
          meaningful impact starts here.
        </p> */}
      </div>
    </section>
  );
};

export default JoinFamily;
