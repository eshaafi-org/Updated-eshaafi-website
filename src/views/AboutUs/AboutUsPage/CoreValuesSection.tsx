"use client";
import React from 'react'
import { motion } from "framer-motion";
import styles from '@/styles/aboutPage.module.scss'

const CoreValuesSection = () => {
  const values = [
    { letter: 'C', title: 'Compassion', description: 'Human-first Always there.', icon: '/images/compassion-icon.svg' },
    { letter: 'A', title: 'Accessibility', description: 'Evolving healthcare, adding value everyday.', icon: '/images/accessibility-icon.svg' },
    { letter: 'R', title: 'Responsible', description: 'Doing what’s right, impact-driven.', icon: '/images/responsible-icon.svg' },
    { letter: 'E', title: 'Excellence', description: 'quality that speaks. Commited to being the best.', icon: '/images/excellence-icon.svg' },
  ]

  return (
    <section id="value-section" className={styles.coreValuesSection}>
      <div className={styles.overlay}></div>
      <div className={styles.coreValuesWrapper}>

        {/* Header Anim */}
        <motion.div 
          className={styles.coreValuesHeader}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.coreValuesTitle}>Our Core Values: The Pillars of Care</h2>
          <p className={styles.coreValuesSubtitle}>
            A vibrant visual collage showcasing the compassion, trust, and innovation that form the foundation of eShaafi’s patient-centered care.
          </p>
        </motion.div>

        <div className={styles.careGrid}>
          {values.map((value, index) => (
            <motion.div
              key={index}
              className={styles.careCard}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.3 }} 
            >
              <div className={styles.careLetter}>{value.letter}</div>
              <img src={value.icon} alt={value.title} className={styles.careIcon} />
              <h3 className={styles.careTitle}>{value.title}</h3>
              <p className={styles.careDescription}>{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CoreValuesSection
