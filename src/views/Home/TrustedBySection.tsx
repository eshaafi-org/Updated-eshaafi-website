"use client";
import Image from "next/image";
import React from "react";
import styles from "../../styles/homepage.module.scss"; 

const TrustedBySection: React.FC = () => {
  const logos: string[] = [
    "/images/logo1.png",
    "/images/Logo22.png",
    "/images/logo3.png",
    "/images/logo4.png",
    "/images/logo5.png",
    "/images/logo6.png",
    "/images/logo7.png",
  ];

  return (
    <section className={styles.trustedBy}>
  {/* <h2 className={styles.trustedTitle}>Trusted By</h2> */}
  <h2 className={styles.trustedTitle}>
  <span className={styles.blueText}>Trusted</span>{" "}
  <span className={styles.blackText}>By</span>
</h2>

  <div className={styles.logosSlider}>
    <div className={styles.logosTrack}>
      {[...logos, ...logos].map((logo, index) => (
        <div key={index} className={styles.logoBox}>
          <Image
            src={logo}
            alt={`Logo ${index + 1}`}
            width={150}
            height={150}
            className={styles.logoImg}
          />
        </div>
      ))}
    </div>
  </div>
</section>

  );
};

export default TrustedBySection;
