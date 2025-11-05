import React, { useState } from 'react';
import styles from '@/styles/findDoctors.module.scss'

interface PlanCardProps {
  title: string;
  savingBadge?: string;
  price: number;
  period: string;
  features: string[];
  isPopular?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({
  title,
  savingBadge,
  price,
  period,
  features,
  isPopular = false
}) => {
  return (
    <div className={`${styles.planCard} ${isPopular ? styles.popularPlan : ''}`}>
      {isPopular && (
        <div className={styles.popularBadge}>Popular</div>
      )}
      
      <div className={styles.planHeader}>
        <h3 className={styles.planTitle}>{title}</h3>
        {savingBadge && (
          <span className={styles.savingBadge}>{savingBadge}</span>
        )}
      </div>

      <div className={styles.planPrice}>
        <h4 className={styles.price}>Rs. {price}</h4>
        <p className={styles.priceDescription}>/{period}</p>
      </div>

      <ul className={styles.featuresList}>
        {features.map((feature, index) => (
          <li key={index} className={styles.featureItem}>
            <span className={styles.checkmark}>✓</span>
            <span className={styles.featureText}>{feature}</span>
          </li>
        ))}
      </ul>

      <button className={styles.subscribeBtn}>Subscribe Plan</button>
    </div>
  );
};

const CarePlanSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Monthly Plans');

  const planTabs = ['Weekly Plans', 'Monthly Plans', 'Yearly Plans'];

  const plans = [
    {
      title: 'Essential Care',
      savingBadge: 'Save 25%',
      price: 499,
      period: 'month',
      features: [
        'Immediate Family Coverage',
        'Unlimited GP Support',
        '24/7 Doctor Access',
        'Up to 25% Lab Discounts',
        '2 Counseling Sessions',
        'Digital Health Records',
        'Expert Wellness Webinars'
      ],
      isPopular: false
    },
    {
      title: 'Smart Family Care',
      savingBadge: 'Save 25%',
      price: 999,
      period: 'month',
      features: [
        'Immediate Family Coverage',
        'Unlimited GP Support',
        '24/7 Doctor Access',
        'Up to 25% Lab Discounts',
        '2 Counseling Sessions',
        'Digital Health Records',
        '15% Off At Specialties',
        'Expert Wellness Webinars'
      ],
      isPopular: true
    },
    {
      title: 'Total Health Protection',
      savingBadge: 'Save 25%',
      price: 1199,
      period: 'month',
      features: [
        'Immediate Family Coverage',
        'Unlimited GP Support',
        '24/7 Doctor Access',
        'Up to 25% Lab Discounts',
        '3 Counseling Sessions',
        'Digital Health Records',
        '15% Off At Specialties',
        'Access to Health & Wellness Webinars'
      ],
      isPopular: false
    }
  ];

  return (
    <section id="subscription-plans"  className={styles.carePlanSection}>
      <div className={styles.carePlanWrapper}>
        <div className={styles.carePlanHeader}>
          <h2 className={styles.carePlanTitle}>
            Choose the Right <span className={styles.highlightBlue}>Care Plan</span>
          </h2>
          <p className={styles.carePlanSubtitle}>
            Affordable, transparent healthcare options designed<br />
            to fit your needs and budget.
          </p>
        </div>

        <div className={styles.planTabs}>
          {planTabs.map((tab) => (
            <button
              key={tab}
              className={`${styles.planTab} ${activeTab === tab ? styles.active : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={styles.plansContainer}>
          {plans.map((plan, index) => (
            <PlanCard
              key={index}
              title={plan.title}
              savingBadge={plan.savingBadge}
              price={plan.price}
              period={plan.period}
              features={plan.features}
              isPopular={plan.isPopular}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarePlanSection;