import React from "react";
import Link from "next/link";
import styles from "../../styles/homepage.module.scss";
import { trackEvent } from "@/lib/ga";
import Image from "next/image";

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
            <Link href="/find-doctors" rel="noopener noreferrer">
              <button
                className={`${styles.heroBtn} ${styles["heroBtn--primary"]}`}
                onClick={() => {
                  trackEvent("homepage_hero_explore_clk", {
                    section: "hero",
                    action: "explore",
                    label: "Explore",
                  });
                }}
              >
                Explore
              </button>
            </Link>

            <Link href="/find-doctors" rel="noopener noreferrer">
              <button
                className={`${styles.heroBtn} ${styles["heroBtn--secondary"]}`}
                onClick={() => {
                  trackEvent("homepage_hero_book_now_clk", {
                    section: "hero",
                    action: "book_now",
                    label: "Book Now",
                  });
                }}
              >
                Book now
              </button>
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className={styles.hero__image}>
          <Image
            src="/images/heroimage.webp"
            alt="Doctor"
            width={420}
            height={520}
            priority
            quality={90}
            className={styles.heroImage}
            sizes="(max-width: 768px) 300px,
           (max-width: 992px) 360px,
           (max-width: 1200px) 420px,
           420px"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
