import React from 'react'
import styles from '@/styles/findDoctors.module.scss'

interface PlanCardProps {
  savingBadge: string
  calls: number
  price: number
  period: string
  description: string
  features: string[]
  isPopular?: boolean
}

const PlanCard: React.FC<PlanCardProps> = ({
  savingBadge,
  calls,
  price,
  period,
  description,
  features,
  isPopular = false
}) => {
  return (
    <div className={`${styles.planCard} ${isPopular ? styles.popularPlan : ''}`}>
      <div className={styles.planHeader}>
        <span className={styles.savingBadge}>{savingBadge}</span>
      </div>

      <div className={styles.planCalls}>
        <p className={styles.callsNumber}>{calls} Calls in</p>
      </div>

      <div className={styles.planPrice}>
        <h3 className={styles.price}>Rs. {price}/{period}</h3>
        <p className={styles.priceDescription}>{description}</p>
      </div>

      <ul className={styles.featuresList}>
        {features.map((feature, index) => (
          <li key={index} className={styles.featureItem}>
            <span className={styles.checkmark}>✓</span>
            <span className={styles.featureText}>{feature}</span>
          </li>
        ))}
      </ul>

      <button className={styles.subscribeBtn}>Subscribe Now</button>
    </div>
  )
}

export default PlanCard
