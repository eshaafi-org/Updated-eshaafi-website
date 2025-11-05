"use client";

import React, { useState } from "react";
import styles from "../../styles/partnerwithus.module.scss";

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Do you offer 24/7 doctor services?",
      answer:
        "Yes, eShaafi provides 24/7 teleconsultation services so patients can connect with doctors anytime, anywhere.",
    },
    {
      question: "How do I access specialty care?",
      answer:
        "You can get an allotted appointment with our staff specialists for expert guidance, treatment plans, and overall options.",
    },
    {
      question: "What type of mental health services are available?",
      answer:
        "We offer mental health consultations, therapy sessions, and stress management programs with certified professionals.",
    },
    {
      question:
        "What are eShaafi Telehealth Units (THUs) and who do they serve?",
      answer:
        "THUs are healthcare stations providing remote consultation access to patients in underserved or remote areas.",
    },
    {
      question: "Do you offer services for businesses?",
      answer:
        "Yes, we offer corporate wellness and healthcare plans for businesses of all sizes.",
    },
    {
      question:
        "Are the corporate benefits plans applicable to employees' families?",
      answer:
        "Yes, family coverage can be extended as part of our corporate wellness partnership program.",
    },
    {
      question: "What strategic partnerships does eShaafi engage in?",
      answer:
        "We collaborate with hospitals, pharmacies, labs, and insurers to expand healthcare accessibility.",
    },
    {
      question:
        "What is the measured impact of eShaafi's wellness programs on educational staff?",
      answer:
        "Our wellness programs have improved overall employee satisfaction and reduced absenteeism across educational institutions.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2>
            Frequently Asked <span>Questions</span>
          </h2>
          {/* <div className={styles.headerDivider}></div> */}
        </div>

        {/* FAQ List */}
     {/* FAQ List */}
<div className={styles.faqList}>
  {faqs.map((faq, index) => (
    <div key={index} className={styles.faqItem}>
      {/* Add gray divider above the first question */}
      {index === 0 && <div className={styles.topDivider}></div>}

      <button
        className={styles.faqQuestion}
        onClick={() => toggleFAQ(index)}
      >
        <span>{faq.question}</span>
        <span className={styles.icon}>
          {openIndex === index ? "×" : "+"}
        </span>
      </button>

      {openIndex === index && faq.answer && (
        <div className={styles.faqAnswer}>
          <p>{faq.answer}</p>
        </div>
      )}

      {index !== faqs.length - 1 && <div className={styles.divider}></div>}
    </div>
  ))}
</div>

      </div>
    </section>
  );
};

export default FAQSection;
