import React from "react";
import Link from "next/link";
import styles from "../../styles/homepage.module.scss";

const HeroSection: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__container}>
        {/* Text Content */}
        <div className={styles.hero__content}>
          <h1 className={styles.hero__title}>24/7 Doctors</h1>
          <p className={styles.hero__subtitle}>
            From GPs to Specialists. On your phone
          </p>
          <div className={styles.hero__buttons}>
            {/* <button className={`${styles.heroBtn} ${styles["heroBtn--primary"]}`}>Explore</button>
               <button className={`${styles.heroBtn} ${styles["heroBtn--secondary"]}`}>Book now</button> */}
            <Link
              href="/find-doctors"
              rel="noopener noreferrer"
            >
              <button
                className={`${styles.heroBtn} ${styles["heroBtn--primary"]}`}
              >
                Explore
              </button>
            </Link>

            <Link
              href="/find-doctors"
              rel="noopener noreferrer"
            >
              <button
                className={`${styles.heroBtn} ${styles["heroBtn--secondary"]}`}
              >
                Book now
              </button>
            </Link>
          </div>
        </div>

        {/* Simple Image Instead of Phone Mockup */}
        <div className={styles.hero__image}>
          <img
            src="/images/mobile-heroimg.png"
            alt="Doctor"
            className={styles.heroImage}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
