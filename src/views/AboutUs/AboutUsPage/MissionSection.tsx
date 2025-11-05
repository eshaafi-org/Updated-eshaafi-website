import React from 'react'
import styles from '@/styles/aboutPage.module.scss'

interface MissionSectionProps {
  title: string
  subtitle: string
  description: string
  alignment?: 'left' | 'right'
}

const MissionSection: React.FC<MissionSectionProps> = ({
  title,
  subtitle,
  description,
  alignment = 'left'
}) => {
  return (
    <section className={styles.missionSection}>
      <div
        className={`${styles.missionContainer} ${
          alignment === 'right' ? styles.missionRight : styles.missionLeft
        }`}
      >
        <div className={styles.missionContent}>
          <h2 className={styles.missionTitle}>{title}</h2>
          <h3 className={styles.missionSubtitle}>{subtitle}</h3>
          <p className={styles.missionDescription}>{description}</p>
        </div>
      </div>
    </section>
  )
}

export default MissionSection
