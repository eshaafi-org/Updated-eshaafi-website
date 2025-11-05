import React, { useState } from 'react'
import styles from '@/styles/findDoctors.module.scss'
import { FiPlus, FiMinus } from 'react-icons/fi'

interface FAQItem {
  question: string
  answer: string
}

const FAQSection: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const faqs: FAQItem[] = [
    {
      question: 'Can I connect with doctor anytime on eShaafi app and website?',
      answer: 'eShaafi offers round-the-clock video consultations, allowing you to connect with a doctor anytime, anywhere. Whether you prefer an instant call.'
    },
    {
      question: 'Is the quality of care same as in-person consultation?',
      answer: 'Yes, our telemedicine consultations provide the same quality of care as in-person visits. Our doctors are fully qualified and experienced professionals.'
    },
    {
      question: 'Can I book appointment for any family member?',
      answer: 'Absolutely! You can book appointments for yourself and any family member. Simply add them to your profile and schedule their consultation.'
    },
    {
      question: 'Can I book appointment again with the same doctor?',
      answer: 'Yes, you can book appointment with same doctor by booking their slot in advance or book instant call after they are online.'
    },
    {
      question: 'What if I face technical issues during the telemedicine appointment?',
      answer: 'Our support team is available 24/7 to help you with any technical issues. Contact us immediately and we will assist you.'
    },
    {
      question: 'What if I face emergency situation during telemedicine consultation?',
      answer: 'If you face an emergency during consultation, our doctors will immediately guide you or connect you to emergency services nearby.'
    }
  ]

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <section className={styles.faqSection}>
      <div className={styles.faqWrapper}>
        <div className={styles.faqHeader}>
          <h2 className={styles.faqTitle} style={{ fontFamily: "'Inter', sans-serif" }}>
            Frequentlty Asked <span className={styles.highlightBlue}>Questions</span>
          </h2>
        </div>

        <div className={styles.faqContainer}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <button
                className={`${styles.faqQuestion} ${expandedIndex === index ? styles.expanded : ''}`}
                onClick={() => toggleAccordion(index)}
              >
                <span className={styles.questionText} style={{ fontFamily: "'Inter', sans-serif" }}>{faq.question}</span>
                <span className={styles.toggleIcon} aria-hidden>
                  {expandedIndex === index ? <FiMinus size={16} /> : <FiPlus size={16} />}
                </span>
              </button>
              {expandedIndex === index && (
                <div className={styles.faqAnswer}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
