"use client";
// import React from "react";
import React, { useEffect } from "react";
import Image from "next/image";
import styles from "../../styles/partnerwithus.module.scss";
import { trackEvent } from "@/lib/ga";

const OurServices: React.FC = () => {
  const leftServices = [
    {
      title: "Handpicked Network of specialists",
      description:
        "Our handpicked network of specialists provide personalised attention, leveraging their expertise to deliver optimal treatment and outcomes.",
      icon: "/images/online-doctor1.svg",
      className: styles.handpicked,
    },
    {
      title: "Mental Health Specialists Access",
      description:
        "Connect with expert mental health specialists for personalized support and therapy.",
      icon: "/images/flask.svg",
      className: styles.mental,
    },
    {
      title: "Individual and immediate family (including parents) coverage",
      description:
        "Enjoy comprehensive coverage for yourself and your loved ones, including parents.",
      icon: "/images/family.svg",
      className: styles.family,
    },
  ];

  const rightServices = [
    {
      title: "Pharmacy discounts",
      description:
        "Get exclusive discounts on prescription medicines and health products.",
      icon: "/images/pharmacy.svg",
      className: styles.pharmacy,
    },
    {
      title: "Up to 20% Diagnostics Discount",
      description:
        "Enjoy discounted rates on diagnostic tests and procedures, helping you stay on top of your health without breaking the bank.",
      icon: "/images/microscope.svg",
      className: styles.diagnostics,
    },
    {
      title: "24/7 GP Access",
      description:
        "Get round-the-clock access to general practitioners for immediate medical concerns.",
      icon: "/images/callsupport.svg",
      className: styles.gpAccess,
    },
  ];

  useEffect(() => {
    // Defer intersection observer to prevent blocking main thread
    const timeoutId = setTimeout(() => {
      const cards = document.querySelectorAll(`.${styles.serviceCard}`);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(styles.show);
              observer.unobserve(entry.target); // Stop observing after animation
            }
          });
        },
        { threshold: 0.1, rootMargin: '50px' }
      );

      cards.forEach((card) => observer.observe(card));
      return () => observer.disconnect();
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section id="services"className={styles.servicesSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>
            <span className={styles.ourText}>Our</span>{" "}
            <span className={styles.serviceText}>Services</span>
          </h2>
          {/* <p>
            Access trusted doctors, wellness experts, and digital care —
            bringing every essential health service together in one platform.
          </p> */}
        </div>

        <div className={styles.contentGrid}>
          {/* Left Services */}
          <div className={styles.leftServices}>
            {leftServices.map((service, index) => (
              <div
                key={index}
                className={`${styles.serviceCard} ${service.className}`}
                onClick={() => trackEvent('partnerwithus_services_left_clk', {
                  section: 'services'
                })}
                role="button"
                tabIndex={0}
              >
                <div className={styles.iconBox}>
                  <img src={service.icon} alt={service.title} width={48} height={48} loading="lazy" />
                </div>
                <div className={styles.serviceInfo}>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Center Doctor Image */}
          <div className={styles.doctorImage}>
            <Image src="/images/service-doctor.webp" alt="Doctor" width={300} height={400} loading="lazy" />
          </div>

          {/* Right Services */}
          <div className={styles.rightServices}>
            {rightServices.map((service, index) => (
              <div
                key={index}
                className={`${styles.serviceCard} ${service.className}`}
                onClick={() => trackEvent('partnerwithus_services_right_clk', {
                  section: 'services'
                })}
                role="button"
                tabIndex={0}
              >
                <div className={styles.iconBox}>
                  <img src={service.icon} alt={service.title} width={48} height={48} loading="lazy" />
                </div>
                <div className={styles.serviceInfo}>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
