import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/homepage.module.scss";

const HealthcareSection: React.FC = () => {
  const router = useRouter();
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  // Define navigation routes for each card
  const cardRoutes: { [key: number]: string } = {
    1: "https://play.google.com/store/apps/details?id=com.eshaafi.patient.consultation", // Our Story
    2: "/aboutus", // App
    3: "/mind-wellness", // Mind Wellness
    4: "/thus", // THUs
    5: "/partnerwithus", // B2B Session
    6: "/find-doctors", // Doctors
  };

  const handleCardClick = (cardId: number) => {
    const route = cardRoutes[cardId];
    if (route !== "#") {
      router.push(route);
    }
  };

  useEffect(() => {
    if (!gridRef.current) return;
    const node = gridRef.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // toggle visibility so animation can replay on re-enter
          setVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -20% 0px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);
  const cardData = [
    { id: 1, label: "Our Story", tall: true },
    { id: 2, label: "App", tall: false },
    { id: 3, label: "Mind Wellness", tall: true },
    { id: 4, label: "THUs", tall: false },
    { id: 5, label: "B2B Session", tall: true },
    { id: 6, label: "Doctors", tall: false },
  ];

  return (
    <section className={styles.healthcareSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>
            <span className={styles.blueText}>Total Care,</span>
            <span className={styles.blackText}> Totally Different</span>
          </h1>
          <p>
            What started as a concerning thought has become a journey to change
            how people access healthcare.
          </p>
        </div>

        <div
          ref={gridRef}
          className={`${styles.statsGrid} ${visible ? styles.animateGrid : ""}`}
        >
          {/* Column 1 */}
          <div className={styles.column}>
            <div
              className={`${styles.statCard} ${styles.tallCard} ${styles.card1}`}
              onClick={() => handleCardClick(1)}
              role="button"
              tabIndex={0}
              style={{ cursor: "pointer" }}
            >
              <div className={styles.cardContent}>
                <p>
                  Among the{" "}
                  <span className={styles.highlight}>Top 15</span> <br />
                  medical apps trusted nationwide
                </p>
              </div>
              <div className={styles.hoverOverlay}>
                <span className={styles.hoverText}>App</span>
                <span className={styles.hoverArrow}>→</span>
              </div>
            </div>

            <div
              className={`${styles.statCard} ${styles.shortCard} ${styles.card4}`}
              onClick={() => handleCardClick(4)}
              role="button"
              tabIndex={0}
              style={{ cursor: "pointer" }}
            >
              <div className={styles.cardContent}>
                <p>
                  <span className={styles.highlight}>10+ Villages </span> connected to 
                  quality healthcare
                </p>
              </div>
              <div className={styles.hoverOverlay}>
                <span className={styles.hoverText}>THUs</span>
                <span className={styles.hoverArrow}>→</span>
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className={styles.column}>
            <div
              className={`${styles.statCard} ${styles.shortCard} ${styles.card2}`}
              onClick={() => handleCardClick(2)}
              role="button"
              tabIndex={0}
              style={{ cursor: "pointer" }}
            >
              <div className={styles.cardContent}>
                <p>
                  <span className={styles.highlight}>15,000+ </span>
                  Lives Served
                </p>
              </div>
              <div className={styles.hoverOverlay}>
                <span className={styles.hoverText}>Our Story </span>
                <span className={styles.hoverArrow}>→</span>
              </div>
            </div>

            <div
              className={`${styles.statCard} ${styles.tallCard} ${styles.card5}`}
              onClick={() => handleCardClick(5)}
              role="button"
              tabIndex={0}
              style={{ cursor: "pointer" }}
            >
              <div className={styles.cardContent}>
                <p>
                  <span className={styles.highlight}>100+ Awareness </span>
                  sessions <br />
                  for a healthier tomorrow
                </p>
              </div>
              <div className={styles.hoverOverlay}>
                <span className={styles.hoverText}>B2B Session Section</span>
                <span className={styles.hoverArrow}>→</span>
              </div>
            </div>
          </div>

          {/* Column 3 */}
          <div className={styles.column}>
            <div
              className={`${styles.statCard} ${styles.tallCard} ${styles.card3}`}
              onClick={() => handleCardClick(3)}
              role="button"
              tabIndex={0}
              style={{ cursor: "pointer" }}
            >
              <div className={styles.cardContent}>
                <p>
                  Building Pakistan&apos;s first <br />
                  care and community-led <br />
                  <span className={styles.highlight}>
                    mental health <br /> platform
                  </span>
                </p>
              </div>
              <div className={styles.hoverOverlay}>
                <span className={styles.hoverText}>Mind Wellness</span>
                <span className={styles.hoverArrow}>→</span>
              </div>
            </div>

            <div
              className={`${styles.statCard} ${styles.shortCard} ${styles.card6}`}
              onClick={() => handleCardClick(6)}
              role="button"
              tabIndex={0}
              style={{ cursor: "pointer" }}
            >
              <div className={styles.cardContent}>
                <p>
                  Handpicked network of <br />
                  <span className={styles.highlight}>trusted doctors </span>
                  nationwide
                </p>
              </div>
              <div className={styles.hoverOverlay}>
                <span className={styles.hoverText}>Doctors</span>
                <span className={styles.hoverArrow}>→</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthcareSection;
