import React from 'react'
import styles from '@/styles/aboutPage.module.scss'

const AboutValuesSection = () => {
  const valuesData = [
    {
      id: 1,
      icon: '❤️',
      title: 'Patient Care',
      description: 'Your health and well-being is our top priority'
    },
    {
      id: 2,
      icon: '🤝',
      title: 'Accessibility',
      description: 'Healthcare should be accessible to everyone, everywhere'
    },
    {
      id: 3,
      icon: '🔒',
      title: 'Trust & Security',
      description: 'Protecting your data with the highest security standards'
    },
    {
      id: 4,
      icon: '🌱',
      title: 'Innovation',
      description: 'Continuously improving through technology and research'
    }
  ]

  return (
    <section className={styles.valuesSection}>
      <div className={styles.valuesContainer}>
        <div className={styles.valuesHeader}>
          <h2 className={styles.valuesTitle}>Our Core Values</h2>
          <p className={styles.valuesSubtitle}>
            What drives us to deliver excellence every day
          </p>
        </div>

        <div className={styles.valuesGrid}>
          {valuesData.map((value) => (
            <div key={value.id} className={styles.valueCard}>
              <div className={styles.valueIcon}>{value.icon}</div>
              <h3 className={styles.valueTitle}>{value.title}</h3>
              <p className={styles.valueDescription}>{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutValuesSection
