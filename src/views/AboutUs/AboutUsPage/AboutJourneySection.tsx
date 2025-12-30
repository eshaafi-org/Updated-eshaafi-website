"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "@/styles/aboutPage.module.scss";

const AboutJourneySection = () => {

  const statsData = [
    { number: "15,000+", label: "Consultations Delivered" },
    { number: "70+", label: "B2B Partners" },
    { number: "6", label: "Tele-health Units Active" },
    { number: "4", label: "Provinces Covered" },
  ];

  const journeyImages = [
    { src: "/images/square1.webp", shape: styles.topLeft },
    { src: "/images/square2.webp", shape: styles.topRight },
    { src: "/images/square3.webp", shape: styles.bottomLeft },
    { src: "/images/square4.webp", shape: styles.bottomRight },
  ];

  return (
    <section id="our-journey" className={styles.journeySection}>
      <div className={styles.journeyWrapper}>
        <h2 className={styles.journeyMainTitle}>
          <span className={styles.colorBlack}>Our </span>
          <span className={styles.colorBlue}>Journey</span>
        </h2>

        <div className={styles.journeyContainer}>

          {/* LEFT TEXT SLIDE IN */}
          <motion.div
            className={styles.journeyTimeline}
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className={styles.timelineTitle}>Founded in October 2023</h3>
            <p className={styles.timelineText}>
              We&apos;ve quickly scaled to deliver 15,000+ consultations and have successfully partnered 
              with 70+ B2B clients across various sectors. Furthermore,
              we have 6 Pilot Tele-health Units (THUs) active across GB, Sindh, Punjab, and KPK.
            </p>
            <p className={styles.timelineHighlight}>
              We are your care companion, providing care that never quits.
            </p>
          </motion.div>

          {/* IMAGE POP */}
          <motion.div
            className={styles.journeyImageGrid}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {journeyImages.map((img, i) => (
              <motion.div
                key={i}
                className={`${styles.imageWrapper} ${img.shape}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Image src={img.src} alt="" width={600} height={500} className={styles.image} />
              </motion.div>
            ))}
          </motion.div>

        </div>

        {/* STATS POP STAGGER */}
        <div className={styles.statsGrid}>
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              className={styles.statItem}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: index * 0.12 }}
              viewport={{ once: true }}
            >
              <div className={styles.statNumber}>{stat.number}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutJourneySection;
