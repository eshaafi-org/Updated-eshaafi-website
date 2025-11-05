"use client";
import React from "react";
import styles from "../../styles/thus.module.scss";
import SectionTHUsInfo from "./infothus";
import OurImpact from "./ourimpact";
import Link from "next/link";
const THUs = () => {
  return (
    <div>
    <section className={styles.heroSection}>
      <div className={styles.overlay}></div>

      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>
          Payback Pakistan - HEAL A VILLAGE, HONOR YOUR ROOTS!
        </h1>

        {/* <button className={styles.ctaBtn}>
          Get in Touch
        </button> */}
         <Link href="/getintouch">
           <button className={styles.ctaBtn}>
          Get in Touch
        </button>
          </Link>
      </div>
    
    </section>
     <SectionTHUsInfo/>
     <OurImpact/>
    </div>
  );
};

export default THUs;
