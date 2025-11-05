// import React from "react";
import styles from "../../../styles/joinus.module.scss";
import React, { useEffect } from "react";
const LifeAtEShaafi: React.FC = () => {
   useEffect(() => {
    const cards = document.querySelectorAll(`.${styles.card}`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add(styles.show);
            }, idx * 190);   // one by one delay popping
          }
        });
      },
      { threshold: 0.3 }
    );

    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.lifeAtContainer} aria-labelledby="life-title">
      <h2 id="life-title" className={styles.mainTitle}>
        Life at <span className={styles.brand}>eShaafi</span>
      </h2>

      <div className={styles.grid}>
        <figure className={`${styles.card} ${styles.cardA}`}>
          <img src="/images/life1.png" alt="Ethics First" />
          <figcaption>Ethics First</figcaption>
        </figure>

        <figure className={`${styles.card} ${styles.cardB}`}>
          <img src="/images/life2.png" alt="Building trust everyday" />
          <figcaption>Building trust everyday</figcaption>
        </figure>

        <figure className={`${styles.card} ${styles.cardC}`}>
          <figcaption>Privacy respected</figcaption>
          <img src="/images/life3.png" alt="Privacy respected" />
        </figure>

        <figure className={`${styles.card} ${styles.cardD}`}>
          <img src="/images/life4.png" alt="Professionalism preserved" />
          <figcaption>Professionalism preserved</figcaption>
        </figure>

        <figure className={`${styles.card} ${styles.cardE}`}>
          <img src="/images/life5.png" alt="Working with heart" />
          <figcaption>Working with heart</figcaption>
        </figure>
      </div>
    </section>
  );
};

export default LifeAtEShaafi;