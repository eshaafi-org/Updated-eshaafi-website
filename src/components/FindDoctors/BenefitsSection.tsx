import React from "react";
import styles from "@/styles/findDoctors.module.scss";
import { trackEvent } from "@/lib/ga";

interface BenefitItem {
  title: string;
  description: string;
  icon?: string;
}

const BenefitsSection: React.FC = () => {
  const benefits: BenefitItem[] = [
    {
      title: "24/7 SERVICE",
      description:
        "Our in-house doctors are available 24/7. You can book appointment with any online doctor anytime.",
      icon: "/images/supp.svg",
    },
    {
      title: "QUALITY HEALTHCARE",
      description:
        "Now receive quality healthcare from comfort of your home and connect with the best doctors.",
      icon: "/images/quality.svg",
    },
    {
      title: "FAMILY HEALTHCARE",
      description:
        "Now receive quality healthcare from comfort of your home and connect with the best doctors.",
      icon: "/images/healthcare.svg",
    },
    {
      title: "ONLINE PAYMENT",
      description:
        "Avail payment hassle and use online payment methods like accounts for video consultations in only few steps.",
      icon: "/images/credit-card.svg",
    },
    {
      title: "FREE FOLLOW UP",
      description:
        "Our doctors can book you a free follow up on multiple appointments.",
      icon: "/images/checklist.svg",
    },
    {
      title: "E-PRESCRIPTION",
      description:
        "Embrace the future! Get clear e-prescriptions after every appointment—no more paperwork.",
      icon: "/images/medical-prescription.svg",
    },
  ];

  return (
    <section className={styles.benefitsSection}>
      <div className={styles.benefitsWrapper}>
        <div className={styles.benefitsHeader}>
          <h2 className={styles.benefitsTitle} style={{ fontFamily: "'Inter', sans-serif" }}>
            Benefits of{" "}
            <span className={styles.highlightBlue}>Video Consultation</span>
          </h2>
          <p className={styles.benefitsSubtitle} style={{ fontFamily: "'Inter', sans-serif" }}>
            Affordable, transparent healthcare options designed to fit your
            needs and budget.
          </p>
        </div>

        <div className={styles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className={styles.benefitCard}
              onClick={() => trackEvent('select_content', {
                section: 'benefits',
                action: 'view_benefit',
                label: benefit.title
              })}
              role="button"
              tabIndex={0}
            >
              <h3 className={styles.benefitTitle} style={{ fontFamily: "'Inter', sans-serif" }}>{benefit.title}</h3>
              <div className={styles.benefitIcon}>
                {benefit.icon && <img src={benefit.icon} alt={benefit.title} />}
              </div>

              <p className={styles.benefitDescription} style={{ fontFamily: "'Inter', sans-serif" }}>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
