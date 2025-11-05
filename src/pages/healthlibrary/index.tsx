"use client";
import React from "react";
import styles from "../../styles/healthlibrary.module.scss";
import RecentBlogs from "./recentblog";
import HealthTopics from "./healthtopic";
import Preventivecare from "./preventivecare";
import EverydayHealth from "./everyday";
import AboutTelehealth from "./abouttelehealth";

const HeroSection: React.FC = () => {
  return (
    <div>
      <section className={styles.wellbeingSection}>
        <div className={styles.overlay}></div>
        <div className={styles.content}>
          <h2>Explore tips to care for your body, mind and everyday wellbeing</h2>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder=""
              className={styles.input}
            />
          </div>
        </div>
      </section>

      <RecentBlogs />
      <HealthTopics />
      <Preventivecare />
      <EverydayHealth />
      <AboutTelehealth />
    </div>
  );
};

export default HeroSection;
