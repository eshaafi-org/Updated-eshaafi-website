import React, { useEffect } from 'react';
import styles from "../../styles/thus.module.scss";
import Link from 'next/link';
interface ImpactCardProps {
  imageSrc: string;
  imageAlt: string;
  caption: string;
  description: string;
  position: 'left' | 'right';
}

const ImpactCard: React.FC<ImpactCardProps> = ({ imageSrc, imageAlt, caption, description, position }) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animate);
          }
        });
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById(`impact-card-${caption}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [caption]);

  return (
    <div id={`impact-card-${caption}`} className={`${styles.impactCard} ${styles[position]}`}>
      {position === 'left' && (
        <>
          <div className={styles.imageWrapper}>
            <img src={imageSrc} alt={imageAlt} className={styles.impactImage} />
            <p className={styles.imageCaption}>{caption}</p>
          </div>
          <div className={styles.textContent}>
            <p className={styles.description}>{description}</p>
          </div>
        </>
      )}
      {position === 'right' && (
        <>
          <div className={styles.textContent}>
            <p className={styles.description}>{description}</p>
          </div>
          <div className={styles.imageWrapper}>
            <img src={imageSrc} alt={imageAlt} className={styles.impactImage} />
            <p className={styles.imageCaption}>{caption}</p>
          </div>
        </>
      )}
    </div>
  );
};

const OurImpact: React.FC = () => {
  const impactStories = [
    { imageSrc: '/images/impact1.png', imageAlt: 'Patient Chief Gulistan Sindh', caption: 'Petaro Cadet College, Sindh', description: 'No more travelling miles for basic care.', position: 'left' as const },
    { imageSrc: '/images/impact2.png', imageAlt: 'Khairpur College For Women', caption: 'Chishtian (Village 125 Murad)', description: 'Providing quality healthcare where it was missing.', position: 'right' as const },
    { imageSrc: '/images/impact3.png', imageAlt: 'Amma G Hospital, Abbottabad', caption: 'Amma G Hospital, Abbottabad', description: 'Healing lives, restoring hope.', position: 'left' as const },
  ];

  return (
    <section className={styles.impactSection}>
      <div className={styles.impactWrapper}>
       <h2 className={styles.impactTitle}>
  Our <span className={styles.highlight}>Impact</span> So Far
</h2>

        <div className={styles.impactContent}>
          {impactStories.map((story, index) => (
            <ImpactCard
              key={index}
              imageSrc={story.imageSrc}
              imageAlt={story.imageAlt}
              caption={story.caption}
              description={story.description}
              position={story.position}
            />
          ))}
        </div>

        <div className={styles.ctaSection}>
          <h3 className={styles.ctaTitle}>Join us in making healthcare accessible for everyone.</h3>
          {/* <button className={styles.ctaButton}>Get in touch</button> */}
          <Link href="/getintouch">
  <button className={styles.ctaButton}>Get in touch</button>
</Link>

        </div>
      </div>
    </section>
  );
};

export default OurImpact;
