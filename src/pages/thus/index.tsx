"use client";
import React, { useEffect, Suspense, lazy } from "react";
import Image from "next/image";
import styles from "../../styles/thus.module.scss";
import Link from "next/link";
import { trackEvent } from "@/lib/ga";

// Lazy load non-critical sections to prevent JS blocking LCP image
const SectionTHUsInfo = lazy(() => import("./infothus"));
const OurImpact = lazy(() => import("./ourimpact"));
const THUs = () => {
  useEffect(() => {
    // Defer tracking to not block initial render
    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(() => {
        if (!sessionStorage.getItem('thus_page_view_tracked')) {
          trackEvent('thus_page_view_clk', {
            section: 'page_load'
          });
          sessionStorage.setItem('thus_page_view_tracked', 'true');
        }
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        if (!sessionStorage.getItem('thus_page_view_tracked')) {
          trackEvent('thus_page_view_clk', {
            section: 'page_load'
          });
          sessionStorage.setItem('thus_page_view_tracked', 'true');
        }
      }, 3000);
    }
  }, [])

  return (
    <div>
    <section className={styles.heroSection}>
      <Image
        src="/images/thushero-bg.webp"
        alt="Payback Pakistan - HEAL A VILLAGE, HONOR YOUR ROOTS"
        fill
        priority
        fetchPriority="high"
        quality={55}
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
      <div className={styles.overlay}></div>

      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>
          Payback Pakistan - HEAL A VILLAGE, HONOR YOUR ROOTS!
        </h1>

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
     <Suspense fallback={<div style={{height: '400px'}}></div>}>
       <SectionTHUsInfo/>
     </Suspense>
     <Suspense fallback={<div style={{height: '400px'}}></div>}>
       <OurImpact/>
     </Suspense>
    </div>
  );
};

export default THUs;
