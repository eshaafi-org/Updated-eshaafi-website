"use client";
import React, { useEffect } from "react";
import styles from "../../styles/thus.module.scss";
import SectionTHUsInfo from "./infothus";
import OurImpact from "./ourimpact";
import Link from "next/link";
import { trackEvent } from "@/lib/ga";
const THUs = () => {
  useEffect(() => {
    trackEvent('thus_page_view_clk', {
      section: 'page_load'
    })
  }, [])

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
           <button 
             className={styles.ctaBtn}
             onClick={() => trackEvent('thus_hero_cta_clk', {
               section: 'hero'
             })}
           >
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
