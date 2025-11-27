"use client";
import React, { useEffect, useRef, useState } from "react"; // <-- useState yahan import karo

import styles from "../../styles/partnerwithus.module.scss";

const WellnessAreas: React.FC = () => {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [showModal, setShowModal] = useState(false); // <-- yahan

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.show);
          }
        });
      },
      { threshold: 0.25 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });
  }, []);

  return (
    <section id="wellness-section" className={styles.wellnessSection}>
      <h2 className={styles.sectionTitle}>
        Core <span>Wellness Areas</span>
      </h2>

      {/* Cards Section */}
      <div className={styles.cardsContainer}>
        {[
          {
            img: "/images/_x32_.svg",
            title: "Life Style & Fitness",
            text: "Yoga Sessions, Weight Management.",
            className: styles.card1,
          },
          {
            img: "/images/ion_fitness.svg",
            title: "Preventive Care",
            text: "Diabetes Awareness, Cancer Awareness, Heart Health.",
            className: styles.card2,
          },
          {
            img: "/images/brain.svg",
            title: "Mental Health",
            text: "Stress Management, Resilience, Work-Life Balance, Sleep Hygiene, Energy Optimization.",
            className: styles.card3,
          },
        ].map((item, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el!)}
            className={`${styles.card} ${item.className}`}
          >
            <div className={styles.icon}>
              <img src={item.img} alt={item.title} />
            </div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>

      {/* Banner Section */}
     <div id="schedule" className={styles.bannerSection}>
  <div className={styles.bannerText}>
    <h4>
      Let&apos;s collaborate to make your organization healthier, more
      supported, and more hopeful.
    </h4>
  </div>

  <div className={styles.imageWrapper}>
    <img
      src="/images/schedule-img.png"
      alt="Doctor Meeting"
      className={styles.bannerImage}
    />
    <button
      className={styles.meetingButton}
      onClick={() => setShowModal(true)}
    >
      Schedule a meeting
    </button>
  </div>
</div>


      {showModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowModal(false)}
        >
          <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <h3>Schedule a Meeting</h3>

            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Organization Name" />
            <input type="text" placeholder="Contact Number" />
            <input type="email" placeholder="Official Email ID" />
            <div className={styles.formGroup}>
              <select>
                <option value="">Organization Size</option>
                <option value="1-20">1 - 20 Employees</option>
                <option value="21-50">21 - 50 Employees</option>
                <option value="51-100">51 - 100 Employees</option>
                <option value="100+">100+ Employees</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <select>
                <option value="">Interested In</option>
                <option value="corporate wellness">Corporate Wellness</option>
                <option value="mental wellbeing">Mental Wellbeing</option>
                <option value="medical support">Medical Support</option>
                <option value="complete health program">
                  Complete Health Program
                </option>
              </select>
            </div>

            <button className={styles.submitBtn}>Schedule a meeting</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default WellnessAreas;
