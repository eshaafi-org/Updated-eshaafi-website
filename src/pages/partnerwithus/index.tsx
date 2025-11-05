"use client";

import React, { useState } from "react";
import styles from "../../styles/partnerwithus.module.scss";
import MedicalServices from "./services";
import WellnessAreas from "./wellness";
import WhyPartnerSection from "./partnersection";
import TestimonialSection from "./testimonial";
import FAQSection from "./faq";

const PartnerWithUs: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <div className={styles.partnerPage}>
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Background Image Container */}
        <div className={styles.imageContainer}>
          {/* Multiple Gradients */}
          <div className={styles.gradientLeft}></div>
          <div className={styles.gradientRight}></div>
          <div className={styles.gradientBottom}></div>
        </div>

        <div className={styles.contentWrapper}>
          {/* Center Content - Text and Button */}
          <div className={`${styles.textContent} ${showForm ? styles.textContentSlide : ''}`}>
            <h1>Unlock a healthier, <br /> happier workforce with <br /> our corporate wellness plans</h1> 
            <button onClick={() => setShowForm(true)}>
              Schedule a Demo
            </button>
          </div>

          {/* Right Side - Form */}
          <div className={`${styles.formContainer} ${showForm ? styles.formVisible : ''}`}>
            <div className={styles.formCard}>
              <h2>Schedule a Demo</h2>
              
              <div className={styles.formFields}>
                <input 
                  type="text" 
                  placeholder="Name"
                />
                
                <input 
                  type="text" 
                  placeholder="Organization Name"
                />
                
                <input 
                  type="tel" 
                  placeholder="Contact Number"
                />
                
                <input 
                  type="email" 
                  placeholder="Official Email ID"
                />
                
                <select>
                  <option value="">Organization Size</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="201-500">201-500</option>
                  <option value="500+">500+</option>
                </select>
                
                <select>
                  <option value="">Interested In</option>
                  <option value="ehr">EHR Solutions</option>
                  <option value="telemedicine">Telemedicine</option>
                  <option value="analytics">Healthcare Analytics</option>
                  <option value="all">All Services</option>
                </select>
                
                <button onClick={handleSubmit} className={styles.submitBtn}>
                  Schedule a Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
       <MedicalServices/>
       <WellnessAreas/>
       <WhyPartnerSection/>
       <TestimonialSection/>
       <FAQSection/>
    </div>
  
  );
};

export default PartnerWithUs;