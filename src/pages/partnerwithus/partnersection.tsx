"use client";
import React from "react";
import styles from "../../styles/partnerwithus.module.scss";
import { trackEvent } from "@/lib/ga";

const WhyPartnerSection: React.FC = () => {
  return (
    <section className={styles.whyPartner}>
      <h2 className={styles.heading}>
        Why Partner with <span>eShaafi?</span>
      </h2>

      <div className={styles.cards}>
        <div 
          className={styles.card}
          onClick={() => trackEvent('partnerwithus_why_partner_clk', {
            section: 'why_partner'
          })}
          role="button"
          tabIndex={0}
        >
        
          <h3>Putting People First:</h3>
          <p>
            Everything we do begins with people—their needs, their stories, and
            their well-being. We are dedicated to providing clear, effective
            solutions that move us and our partners forward.
          </p>
        </div>

        <div 
          className={styles.card}
          onClick={() => trackEvent('partnerwithus_why_partner_clk', {
            section: 'why_partner'
          })}
          role="button"
          tabIndex={0}
        >

          <h3>Proven Impact & Reach:</h3>
          <p>
            With 50,000+ app downloads and eShaafi’s active users across
            Pakistan, eShaafi is driving real patient impact. Our growing
            footprint includes 15+ corporate partners focused on employee
            wellness.
          </p>
        </div>

        <div 
          className={styles.card}
          onClick={() => trackEvent('partnerwithus_why_partner_clk', {
            section: 'why_partner'
          })}
          role="button"
          tabIndex={0}
        >
          <h3>Comprehensive Service Offering:</h3>
          <p>
            Our ecosystem offers a complete health solution, from discounted
            labs and pharmacies to gyms and specialist bookings, enabling
            customized partnerships that support every wellness need.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyPartnerSection;
