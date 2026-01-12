"use client";
import React, { useEffect } from "react";
import styles from "../../styles/healthlibrary.module.scss";
import RecentBlogs from "./recentblog";
import HealthTopics from "./healthtopic";
import Preventivecare from "./preventivecare";
import EverydayHealth from "./everyday";
import AboutTelehealth from "./abouttelehealth";
import { trackEvent } from "@/lib/ga";

const HeroSection: React.FC = () => {
  useEffect(() => {
    trackEvent('healthlibrary_page_view_clk', {
      section: 'page_load'
    })
  }, [])

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
