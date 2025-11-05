"use client";
import React, { useEffect, useState } from "react";
import styles from "../../styles/homepage.module.scss";

export default function Schedule() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      icon: "/images/Group.png",
      title: "Choose Your Doctor",
      videoUrl: "/images/eshaffi find doctor video 1.mp4",
    },
    {
      id: 1,
      icon: "/images/calendar 1.png",
      title: "Pick a Time",
      videoUrl: "/images/eshaffi schedule instantly video 2.mp4",
    },
    {
      id: 2,
      icon: "/images/correct 1.png",
      title: "Proceed to Pay",
      videoUrl: "/images/eshaffi appoinment confirmed video 3.mp4",
    },
  ];

  // ✅ Auto-change video every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prevStep) => (prevStep + 1) % steps.length);
    }, 7000); // 7 seconds per video
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <section className={styles.appointmentSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2>
            <span className={styles.coloredText}>Consult Your Doctor</span>{" "}
            <span className={styles.blackText}>in Minutes</span>
          </h2>
          <p>
            Experience healthcare simplicity. <br />
            Book your appointment in just 3 quick steps
          </p>
        </div>

        <div className={styles.grid}>
          {/* Left Side - Steps */}
          <div className={styles.left}>
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`${styles.step} ${
                  activeStep === index ? styles.active : ""
                }`}
              >
                <div className={styles.iconWrapper}>
                  <img
                    src={step.icon}
                    alt={step.title}
                    className={styles.iconImage}
                  />
                </div>
                <h3>{step.title}</h3>
              </div>
            ))}
          </div>

          {/* Right Side - Mobile with Video */}
          <div className={styles.right}>
            <div className={styles.mobileWrapper}>
              <div className={styles.phoneContainer}>
                <img
                  src="/images/mobile-bg.png"
                  alt="Mobile Mockup"
                  className={styles.mobileImage}
                />

                {/* ✅ Auto-playing video overlay */}
                <div className={styles.videoOverlay}>
                  <video
                    className={styles.videoPlayer}
                    src={steps[activeStep].videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    onEnded={() => {
                      setActiveStep((prevStep) => (prevStep + 1) % steps.length);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* ✅ App Store Buttons */}
            <div className={styles.appButtons}>
              <a href="https://apps.apple.com/pk/app/eshaafi-health-telemedicine/id6739331112" target="_blank" rel="noopener noreferrer">
                <img
                  src="/images/appstore.png"
                  alt="App Store"
                  className={styles.appButton}
                />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.eshaafi.patient.consultation" target="_blank" rel="noopener noreferrer">
                <img
                  src="/images/playstore.png"
                  alt="Play Store"
                  className={styles.appButton}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
