"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import styles from "../../styles/thus.module.scss";
import { trackEvent } from "@/lib/ga";

const SectionTHUsInfo = () => {
  const offerings = [
    {
      icon: "/images/heart-beat 1.svg",
      title: "Doctor Consultations",
      desc: "GP & Specialists. Expert medical guidance accessible right in their village.",
      key: "doctor_consultations"
    },
    {
      icon: "/images/online-consult 1.svg",
      title: "Vital Health Checks",
      desc: "On-site assessments for immediate care and long-term wellbeing.",
      key: "vital_health_checks"
    },
    {
      icon: "/images/medicine-thus.svg",
      title: "Timely Provision of Medicines",
      desc: "Treatment begins immediately. Necessary, quality medicines provided on-site",
      key: "provision_medicines"
    },
    {
      icon: "/images/prevention.svg",
      title: "Focus on Non-communicable Diseases",
      desc: "Proactive attention to manage chronic conditions like diabetes and hypertension.",
      key: "ncds_focus"
    }
  ];

  useEffect(() => {
    // Defer all animations to idle callback - no timeout!
    // This prevents main thread blocking during LCP
    if (typeof requestIdleCallback !== 'undefined') {
      const idleId = requestIdleCallback(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add(styles.animate);
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1, rootMargin: '100px' }
        );

        const cards = document.querySelectorAll(`.${styles.card}`);
        cards.forEach((card) => observer.observe(card));

        return () => observer.disconnect();
      });

      return () => {
        cancelIdleCallback(idleId);
      };
    }
  }, []);

  return (
    <section id="what-are-thus" className={styles.thusSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          What Are <span>Telehealth Units?</span>
        </h2>
        <p className={styles.desc}>
          eShaafi Telehealth Units are digital clinics powered by our provided tablets that link our panel of doctors with patients in rural areas across Pakistan, where access to basic healthcare is not available.
        </p>
        <div className={styles.bigSpace}></div>
        <h3 className={styles.subTitle}>
          What Our <span>Telehealth Units</span> Offer?
        </h3>
        <p className={styles.smallText}>
          Comprehensive Care at Your Local Telehealth Units
        </p>
      </div>

     <div className={styles.cardsArea}>
  <div className={styles.cardsInnerContainer}>
    <div className={styles.cardsGrid}>
      {offerings.map((offering, index) => (
        <div 
          className={`${styles.card} ${styles.animate}`} 
          key={offering.key}
          onClick={() => {
            trackEvent('thus_hero_offering_clk', {
              section: 'hero',
              offering_type: offering.key
            });
            trackEvent('thus_offerings_clk', {
              section: 'offerings',
              offering_type: offering.key
            });
          }}
          role="button"
          tabIndex={0}
        >
          <div className={styles.cardIcon}>
            <Image 
              src={offering.icon} 
              alt={offering.title}
              width={70}
              height={70}
              quality={80}
              loading="lazy"
            />
          </div>
          <h4>{offering.title}</h4>
          <p>{offering.desc}</p>
        </div>
      ))}
    </div>
  </div>
</div>

    </section>
  );
};

export default SectionTHUsInfo;
