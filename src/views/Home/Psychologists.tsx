import React from 'react';
import { motion } from "framer-motion";
import styles from "../../styles/homepage.module.scss";

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
            <button className={`${styles.psyBtn} ${styles["psyBtn--primary"]}`}>Explore</button>
            <button className={`${styles.psyBtn} ${styles["psyBtn--secondary"]}`}>Book now</button>
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
            src="/images/laptop.png"
            alt="Psychologists"
            className={styles.psychologistsImage}
          />
        </motion.div>

      </div>
    </section>
  );
};

export default PsychologistsSection;
