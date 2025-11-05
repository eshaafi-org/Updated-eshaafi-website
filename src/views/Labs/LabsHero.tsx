"use client";
import styles from "../../styles/labs.module.scss";

export default function LabsHero({ heading, text }: any) {
  return (
    <section
      className={styles.labsHeroContainer}
      style={{
        backgroundImage: "url(/images/labhero.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className={styles.labsHeroOverlay}>
        <div className={styles.labsHeroContent}>
          <h1 className={styles.labsHeroHeading}>
            Get Upto <span className={styles.highlightRed}>30%</span> Discounts
          </h1>
          <p className={styles.labsHeroText}>{text}</p>
        </div>
      </div>
    </section>
  );
}
