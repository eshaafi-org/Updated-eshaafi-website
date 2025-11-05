import React, { useRef, useEffect, useState } from "react";
import styles from "@/styles/aboutPage.module.scss";

const FounderStorySection = ({
  founderImage = "/images/founder.png",
  founderName = "Shafique Anwar",
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.founderStorySection} ref={ref}>
      <div className={`${styles.founderStoryWrapper} ${isVisible ? styles.show : ""}`}>
        
        <div className={styles.founderHeader}>
          <h2 className={styles.founderTitle}>
           Founder&apos;s Messages
          </h2>
        </div>

        <div className={styles.founderStoryContainer}>
          <div className={`${styles.founderImage} ${styles.popIn}`}>
            <img src={founderImage} alt={founderName} />
          </div>

          <div className={`${styles.founderContent} ${styles.slideRight}`}>
            <div className={styles.founderStory}>
              <p className={styles.storyText}>
                I&apos;ve had the opportunity to build several startups, each with its own journey, its own lessons, and its own wins. But 
                <span className={styles.highlightboldBlue}> eShaafi </span>
                reshaped how I understand what it truly means to create something with 
                <span className={styles.highlightBlue}> lasting impact. </span>
              </p>

              <p className={styles.storyText}>
                When you choose to build something that has the potential to 
                <span className={styles.highlightBlue}> improve lives, </span>
                you realize that the most meaningful results don&apos;t come overnight. There are no instant highs. But what you do get, if you pay attention, is something much more profound.
                It&apos;s a sense of fulfillment knowing your work became part of 
                <span className={styles.highlightBlue}> someone&apos;s better day, someone&apos;s healing, or someone&apos;s moment of relief. </span>
              </p>

              <p className={styles.storyText}>
                Every day might feel ordinary from the outside but we all believe that if we can make even one life a little 
                <span className={styles.highlightBlue}> healthier, </span>
                a little 
                <span className={styles.highlightBlue}> lighter, </span>
                a little more hopeful, then we&apos;re already on the right track.
              </p>

              <p className={styles.signature}>- {founderName}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FounderStorySection;
