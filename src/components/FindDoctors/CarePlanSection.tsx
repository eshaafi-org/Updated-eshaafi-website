import React, { useState } from 'react';
import styles from '@/styles/findDoctors.module.scss'
import { trackEvent } from '@/lib/ga'

interface PlanCardProps {
  title: string;
  savingBadge?: string;
  price: number;
  period: string;
  features: string[];
  isPopular?: boolean;
  note?: string;
}

const PlanCard: React.FC<PlanCardProps> = ({
  title,
  savingBadge,
  price,
  period,
  features,
  isPopular = false,
  note
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
        <h4 className={styles.price} onClick={() => trackEvent('fd_plan_view_clk', {
          section: 'care_plans',
          plan_name: title,
          plan_price: price,
          plan_period: period
        })}>Rs. {price}</h4>
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

      {note && (
        <div className={styles.planNote} style={{ 
          marginTop: '12px', 
          marginBottom: '12px',
          fontSize: '12px', 
          color: '#6b7280', 
          fontStyle: 'italic',
          lineHeight: '1.4',
          textAlign: 'center'
        }}>
          {note}
        </div>
      )}

      <button 
        className={styles.subscribeBtn}
        onClick={() => trackEvent('fd_plan_subscribe_clk', {
          section: 'care_plans',
          plan_name: title,
          plan_price: price,
          plan_period: period,
          is_popular: isPopular
        })}
      >
        Subscribe Plan
      </button>
    </div>
  );
};

const CarePlanSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Monthly Plans');

  const planTabs = ['Weekly Plans', 'Monthly Plans', 'Yearly Plans'];

  const plansData = {
    'Weekly Plans': [
      {
        title: 'Basic Family',
        price: 200,
        period: 'week',
        features: [
          'All Immediate Family Members',
          '2 GP Calls',
          '24/7 Availability of doctors',
          'Upto 25% Lab Discounts',
          'Discounted Medicines',
          'Medical Health Record',
          'Access to Health Related to Webinars'
        ],
        isPopular: false,
        //note: '*Free Call after buying, Reimbursement if you changed your mind.'
      }
    ],
    'Monthly Plans': [
      {
        title: 'Essential Care Plan',
        price: 399,
        period: 'month',
        features: [
          'All Immediate Family Members',
          'Unlimited GPs Calls',
          '24/7 Availability of doctors',
          'Upto 25% Discount on Labs',
          'Discounted Medicines',
          '2 Counselor Calls',
          'Medical Health Record',
          'Access to Health Related to Webinars'
        ],
        isPopular: false,
      },
      {
        title: 'Smart Family Care',
        price: 899,
        period: 'month',
        features: [
          'All Immediate Family Members',
          'Unlimited GPs Calls',
          '24/7 Availability of doctors',
          'Upto 25% Discount on Labs',
          'Discounted Medicines',
          '2 Counselor Calls',
          'Medical Health Record',
          '10% Discount on Specialists',
          '(Derma, ENT, Gynae, Dentists)',
          'Access to Health Related to Webinars'
        ],
        isPopular: true,
      },
      {
        title: 'Total Health Protection',
        price: 999,
        period: 'month',
        features: [
          'All Immediate Family Members',
          'Unlimited GPs Calls',
          '24/7 Availability of doctors',
          'Upto 25% Discount on Labs',
          'Discounted Medicines',
          '3 Counselor Calls',
          'Medical Health Record',
          '15% Discount on All Specialists',
          'Access to Health Related to Webinars'
        ],
        isPopular: false,
      }
    ],
    'Yearly Plans': [
      {
        title: 'Essential Care Plan',
        price: 3999,
        period: 'year',
        features: [
          'All Immediate Family Members',
          'Unlimited GPs Calls',
          '24/7 Availability of doctors',
          'Upto 25% Discount on Labs',
          'Discounted Medicines',
          '2 Counselor Calls',
          'Medical Health Record',
          'Access to Health Related to Webinars'
        ],
        isPopular: false,
      },
      {
        title: 'Smart Family Care',
        price: 6999,
        period: 'year',
        features: [
          'All Immediate Family Members',
          'Unlimited GPs Calls',
          '24/7 Availability of doctors',
          'Upto 25% Discount on Labs',
          'Discounted Medicines',
          '2 Counselor Calls',
          'Medical Health Record',
          '10% Discount on Specialists',
          '(Derma, ENT, Gynae, Dentists)',
          'Access to Health Related to Webinars'
        ],
        isPopular: false,
      },
      {
        title: 'Total Health Protection',
        price: 8999,
        period: 'year',
        features: [
          'All Immediate Family Members',
          'Unlimited GPs Calls',
          '24/7 Availability of doctors',
          'Upto 25% Discount on Labs',
          'Discounted Medicines',
          '3 Counselor Calls',
          'Medical Health Record',
          '15% Discount on All Specialists',
          'Access to Health Related to Webinars'
        ],
        isPopular: false,
      }
    ]
  };

  const currentPlans = plansData[activeTab as keyof typeof plansData];

  return (
    <section id="subscription-plans" className={styles.carePlanSection}>
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
          {currentPlans.map((plan, index) => (
            <PlanCard
              key={index}
              title={plan.title}
              price={plan.price}
              period={plan.period}
              features={plan.features}
              isPopular={plan.isPopular}
              // note={plan.note}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarePlanSection;