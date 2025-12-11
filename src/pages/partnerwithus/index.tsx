"use client";

import React, { useState } from "react";
import styles from "../../styles/partnerwithus.module.scss";
import MedicalServices from "./services";
import WellnessAreas from "./wellness";
import WhyPartnerSection from "./partnersection";
import TestimonialSection from "./testimonial";
import FAQSection from "./faq";
import { headers } from "../../helper/CONST";

const PartnerWithUs: React.FC = () => {
  const [showForm, setShowForm] = useState(true);
  const [name, setName] = useState('');
  const [orgName, setOrgName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [orgSize, setOrgSize] = useState('');
  const [interestedIn, setInterestedIn] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error'>('success');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const storedValue: any | null = localStorage.getItem("user");
    const user = storedValue ? JSON.parse(storedValue) : null;
    if (!user || !user.IdToken) {
      setModalType('error');
      setShowModal(true);
      return;
    }
    const data = {
      type: 'career',
      name,
      organization_name: orgName,
      contact_number: contact,
      email,
      organization_size: orgSize,
      interested_in: interestedIn,
      subject: 'New Business Inquiry'
    };
    console.log('Sending data:', data);
    try {
      const response = await fetch('https://f6l7k20y31.execute-api.us-east-1.amazonaws.com/stage/new/patient/emailWebsite/notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      console.log('Response status:', response.status);
      if (response.ok) {
        setModalType('success');
        setShowModal(true);
        setName('');
        setOrgName('');
        setContact('');
        setEmail('');
        setOrgSize('');
        setInterestedIn('');
      } else {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        setModalType('error');
        setShowModal(true);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setModalType('error');
      setShowModal(true);
    }
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
            {/* <button onClick={() => setShowForm(true)}>
              Schedule a Demo
            </button> */}
          </div>

          {/* Right Side - Form */}
          <div className={`${styles.formContainer} ${showForm ? styles.formVisible : ''}`}>
            <div className={styles.formCard}>
              <h2>Schedule a Demo</h2>
              
              <div className={styles.formFields}>
                <input 
                  type="text" 
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                
                <input 
                  type="text" 
                  placeholder="Organization Name"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                />
                
                <input 
                  type="tel" 
                  placeholder="Contact Number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
                
                <input 
                  type="email" 
                  placeholder="Official Email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                
                <select value={orgSize} onChange={(e) => setOrgSize(e.target.value)}>
                  <option value="">Organization Size</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="201-500">201-500</option>
                  <option value="500+">500+</option>
                </select>
                
                <select value={interestedIn} onChange={(e) => setInterestedIn(e.target.value)}>
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

       {/* Modal */}
       {showModal && (
         <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
           <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
             <div className={styles.modalIcon}>
               {modalType === 'success' ? '✅' : '❌'}
             </div>
             <h3 className={styles.modalTitle}>
               {modalType === 'success' ? 'Thank You!' : 'Oops!'}
             </h3>
             <p className={styles.modalMessage}>
               {modalType === 'success' 
                 ? 'We have received your query. Our team will get back to you soon!' 
                 : 'Something went wrong. Please try again later.'}
             </p>
             <button 
               className={styles.modalButton} 
               onClick={() => setShowModal(false)}
             >
               Close
             </button>
           </div>
         </div>
       )}
    </div>
  
  );
};

export default PartnerWithUs;