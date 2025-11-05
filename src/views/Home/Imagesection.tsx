"use client";
import React from "react";
import styles from "../../styles/homepage.module.scss";

const HealthcareLanding: React.FC = () => {
  return (
    <div className={styles.healthcareLanding}>
      {/* Health Section */}
      <section className={styles.healthSection}>
        <img
          src="/images/imagesection.png"
          alt="Health is a Lifestyle"
          className={styles.healthBg}
        />

        {/* Left Gradient Overlay */}
        <div className={styles.leftGradient}></div>

        <div className={styles.contentWrapper}>
          <div className={styles.textContainer}>
            <h2 className={styles.heading}>Health is a Lifestyle</h2>
            <div className={styles.buttonGroup}>
              {/* <button className={styles.primaryBtn}>Get Started</button> */}

              {/* <button className={styles.appBtn}>
                Get the app
                <img
                  src="/images/apple.png"
                  alt="Apple Store"
                  className={styles.icon}
                />
                <img
                  src="/images/mage_playstore.png"
                  alt="Play Store"
                  className={styles.icon}
                />
              </button> */}
               <div className={styles.appButtons}>
              <a href="https://apps.apple.com/pk/app/eshaafi-health-telemedicine/id6739331112" target="_blank" rel="noopener noreferrer">
                <img
                  src="/images/appstore.png"
                  alt="App Store"
                  className={styles.appButton}
                />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.eshaafi.patient.consultation" target="_blank" rel="noopener noreferrer">
                <img
                  src="/images/playstore.png"
                  alt="Play Store"
                  className={styles.appButton}
                />
              </a>
            </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HealthcareLanding;
