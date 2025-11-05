import React from 'react'
import styles from '@/styles/aboutPage.module.scss'

interface HeroSectionProps {
  backgroundVideo?: string
}

const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundVideo = '/images/video.mp4' // hero section background video
}) => {
  return (
    <section className={styles.heroSection}>
      {/* Background video */}
      <video
        className={styles.heroBackgroundVideo}
        src={backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      <div className={styles.heroOverlay}>
        <div className={styles.heroCardOverlay}>
          <div className={styles.heroCard}>
            {/* Keep the icon */}
            <div className={styles.heroIcon}>
              <img src="/images/hero-icon1.png" alt="Vision" />
            </div>
            <div className={styles.heroCardText}>
              <span className={styles.heroCardTitle}>
                <span className={styles.heroCardTitleAccent}>Vision</span>
              </span>
              <span className={styles.heroCardDesc}>
                To nurture healthier, kinder, and more connected lives.
              </span>
            </div>
          </div>

          <div className={styles.heroCard}>
            <div className={styles.heroIcon}>
              <img src="/images/hero-icon.png" alt="Mission" />
            </div>
            <div className={styles.heroCardText}>
              <span className={styles.heroCardTitle}>
                <span className={styles.heroCardTitleAccent}>Mission</span>
              </span>
              <span className={styles.heroCardDesc}>
                As a health companion in every step, we bring care, build value, and create lasting impact.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
