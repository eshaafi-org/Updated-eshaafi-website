"use client";
import React, { useEffect, useRef } from "react";
import styles from "../../../styles/joinus.module.scss";

const Philosophy = () => {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = boxRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add(styles.showAnim);
          } else {
            element.classList.remove(styles.showAnim);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.philosophySection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>
            The <span>Philosophy</span>
          </h2>
          <p>Learn. Lead. Leave a legacy</p>
        </div>

        <div ref={boxRef} className={styles.textBoxNew}>
          <p>
            <span className={styles.highlight}>eShaafi</span> believes in the power and potential of today&apos;s generation.
            With the right guidance, opportunities, and a sense of purpose, they
            can create lasting legacies and we&apos;re here to fuel their journey
            every step of the way. Almost every role at <span className={styles.highlight}>eShaafi</span> begins with
            young talent stepping in as interns, growing into successful careers
            and meaningful legacies.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
