import React from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "../../styles/homepage.module.scss";
import { trackEvent } from '@/lib/ga';

const PsychologistsSection: React.FC = () => {
  return (
    <section className={styles.psychologists}>
      <div className={styles.psychologists__container}>

        {/* Animated Text Content */}
        <motion.div
          className={styles.psychologists__content}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className={styles.psychologists__title}>Psychologists & Psychiatrists</h2>
          <p className={styles.psychologists__subtitle}>
            Mental health support. Talk freely. Feel better.
          </p>

          <div className={styles.psychologists__buttons}>
            
            <Link href="/mind-wellness#therapists-section">
              {/* <button className={`${styles.psyBtn} ${styles["psyBtn--primary"]}`}> */}
                 <button 
                className={`${styles.psyBtn} ${styles["psyBtn--primary"]}`}
                onClick={() => {
                  trackEvent('homepage_mental_health_explore_clk', {
                    section: 'mental_health'
                  });
                }}
              >
                Explore
              </button>
            </Link>

            <Link href="/mind-wellness#therapists-section">
              <button 
                className={`${styles.psyBtn} ${styles["psyBtn--secondary"]}`}
                onClick={() => {
                  trackEvent('homepage_mental_health_book_clk', {
                    section: 'mental_health'
                  });
                }}
              >
                Book now
              </button>
            </Link>

          </div>
        </motion.div>

        {/* Animated Image */}
        <motion.div
          className={styles.psychologists__image}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <img 
            src="/images/Psychologist-laptop.webp"
            alt="Psychologists"
            className={styles.psychologistsImage}
          />
        </motion.div>

      </div>
    </section>
  );
};

export default PsychologistsSection;
