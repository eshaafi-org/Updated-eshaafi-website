"use client";
import React, { useEffect } from "react";
import styles from "../../styles/thus.module.scss";

const SectionTHUsInfo = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animate);
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = document.querySelectorAll(`.${styles.card}`);
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="what-are-thus" className={styles.thusSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          What Are <span>THUs?</span>
        </h2>
        <p className={styles.desc}>
          eShaafi THUs are digital clinics powered by our provided tablets that link our panel of doctors with patients in rural areas across Pakistan, where access to basic healthcare is not available.
        </p>
        <div className={styles.bigSpace}></div>
        <h3 className={styles.subTitle}>
          What Our <span>THUs</span> Offer?
        </h3>
        <p className={styles.smallText}>
          Comprehensive Care at Your Local THU
        </p>
      </div>

     <div className={styles.cardsArea}>
  <div className={styles.cardsInnerContainer}>
    <div className={styles.cardsGrid}>
      <div className={`${styles.card} ${styles.animate}`} key="1">
        <div className={styles.cardIcon}>
          <img src="/images/heart-beat 1.svg" alt="Doctor Consultations" />
        </div>
        <h4>Doctor Consultations</h4>
        <p>GP & Specialists. Expert medical guidance accessible right in their village.</p>
      </div>

      <div className={`${styles.card} ${styles.animate}`} key="2">
        <div className={styles.cardIcon}>
          <img src="/images/online-consult 1.svg" alt="Vital Health Checks" />
        </div>
        <h4>Vital Health Checks</h4>
        <p>On-site assessments for immediate care and long-term wellbeing.</p>
      </div>

      <div className={`${styles.card} ${styles.animate}`} key="3">
        <div className={styles.cardIcon}>
          <img src="/images/medicine-thus.svg" alt="Provision of Medicines" />
        </div>
        <h4>Timely Provision of Medicines</h4>
        <p>Treatment begins immediately. Necessary, quality medicines provided on-site</p>
      </div>

      <div className={`${styles.card} ${styles.animate}`} key="4">
        <div className={styles.cardIcon}>
          <img src="/images/prevention.svg" alt="Focus on Non-communicable Diseases" />
        </div>
        <h4>Focus on Non-communicable Diseases</h4>
        <p>Proactive attention to manage chronic conditions like diabetes and hypertension.</p>
      </div>
    </div>
  </div>
</div>

    </section>
  );
};

export default SectionTHUsInfo;
