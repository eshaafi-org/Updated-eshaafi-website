"use client";

import React, { useState, useEffect, Suspense, lazy } from "react";
import Image from "next/image";
import styles from "../../styles/partnerwithus.module.scss";
import { trackEvent } from "@/lib/ga";

// Lazy load non-critical components to reduce initial bundle
const MedicalServices = lazy(() => import("./services"));
const WellnessAreas = lazy(() => import("./wellness"));
const WhyPartnerSection = lazy(() => import("./partnersection"));
const TestimonialSection = lazy(() => import("./testimonial"));
const FAQSection = lazy(() => import("./faq"));

const PartnerWithUs: React.FC = () => {
  useEffect(() => {
    if (!sessionStorage.getItem('partnerwithus_page_view_tracked')) {
      trackEvent('partnerwithus_page_view_clk', {
        section: 'page_load'
      });
      sessionStorage.setItem('partnerwithus_page_view_tracked', 'true');
    }
  }, [])

  const [showForm, setShowForm] = useState(true);
  const [name, setName] = useState('');
  const [orgName, setOrgName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [orgSize, setOrgSize] = useState('');
  const [interestedIn, setInterestedIn] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isFlipped, setIsFlipped] = useState(false);
  const [flipType, setFlipType] = useState<'success' | 'error' | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!orgName.trim()) newErrors.orgName = 'Organization name is required';
    if (!contact.trim()) newErrors.contact = 'Contact number is required';
    else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(contact.replace(/\s/g, ''))) 
      newErrors.contact = 'Please enter a valid contact number';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) 
      newErrors.email = 'Please enter a valid email address';
    if (!orgSize) newErrors.orgSize = 'Please select organization size';
    if (!interestedIn) newErrors.interestedIn = 'Please select what you\'re interested in';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Track form submission
    trackEvent('partnerwithus_form_submit_clk', {
      section: 'hero'
    });

    setIsLoading(true);
    
    const data = {
      type: 'business',
      name,
      organization_name: orgName,
      contact_number: contact,
      email,
      organization_size: orgSize,
      interested_in: interestedIn,
      subject: 'New Business Inquiry'
    };
    // console.log('Sending data:', data);
    try {
      const response = await fetch('https://f6l7k20y31.execute-api.us-east-1.amazonaws.com/stage/new/patient/emailWebsite/notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        setIsFlipped(true);
        setTimeout(() => {
          setFlipType('success');
          setName('');
          setOrgName('');
          setContact('');
          setEmail('');
          setOrgSize('');
          setInterestedIn('');
          setErrors({});
        }, 650);
      } else {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        setIsFlipped(true);
        setTimeout(() => {
          setFlipType('error');
        }, 650);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setIsFlipped(true);
      setTimeout(() => {
        setFlipType('error');
      }, 650);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFlipBack = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log('Back to form clicked, current flipType:', flipType);
    
    // Prevent multiple clicks during animation
    if (!isFlipped || isFlipping) return;
    
    setFlipType(null);
    setIsFlipping(true);
    setIsFlipped(false);
    
    // Clear flipType after animation completes to prevent content flicker
    setTimeout(() => {
      setIsFlipping(false);
    }, 650);
  };

  return (
    <div className={styles.partnerPage}>
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Background Image Container */}
        {/* <div className={styles.imageContainer}>
      
          <div className={styles.gradientLeft}></div>
          <div className={styles.gradientRight}></div>
          <div className={styles.gradientBottom}></div>
        </div> */}
        <div className={styles.imageContainer}>
  <Image
    src="/images/partner-bg.webp"
    alt="Partner with us background"
    fill
    quality={65}
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
    priority={true}
  />

  {/* Gradients */}
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
            <div className={`${styles.formCard} ${isFlipped ? styles.flipped : ''}`}>
              {/* Front Side - Form */}
              <div className={styles.cardSide}>
                <h2>Schedule a Demo</h2>
                
                <div className={styles.formFields}>
                  <div className={styles.inputGroup}>
                    <input 
                      type="text" 
                      placeholder={errors.name || "Name"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`${styles.inputField} ${errors.name ? styles.error : ''}`}
                    />
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <input 
                      type="text" 
                      placeholder={errors.orgName || "Organization Name"}
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      className={`${styles.inputField} ${errors.orgName ? styles.error : ''}`}
                    />
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <input 
                      type="tel" 
                      placeholder={errors.contact || "Contact Number"}
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className={`${styles.inputField} ${errors.contact ? styles.error : ''}`}
                    />
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <input 
                      type="email" 
                      placeholder={errors.email || "Official Email ID"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`${styles.inputField} ${errors.email ? styles.error : ''}`}
                    />
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <select 
                      value={orgSize} 
                      onChange={(e) => setOrgSize(e.target.value)}
                      className={`${styles.selectField} ${errors.orgSize ? styles.error : ''}`}
                    >
                      <option value="">{errors.orgSize || "Organization Size"}</option>
                      <option value="1-10">1-10</option>
                      <option value="11-50">11-50</option>
                      <option value="51-200">51-200</option>
                      <option value="201-500">201-500</option>
                      <option value="500+">500+</option>
                    </select>
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <select 
                      value={interestedIn} 
                      onChange={(e) => setInterestedIn(e.target.value)}
                      className={`${styles.selectField} ${errors.interestedIn ? styles.error : ''}`}
                    >
                      <option value="">{errors.interestedIn || "Interested In"}</option>
                      <option value="ehr">EHR Solutions</option>
                      <option value="telemedicine">Telemedicine</option>
                      <option value="analytics">Healthcare Analytics</option>
                      <option value="all">All Services</option>
                    </select>
                  </div>
                  
                  <button 
                    onClick={handleSubmit} 
                    className={styles.submitBtn}
                    disabled={isLoading || isFlipping}
                    onFocus={() => {
                      trackEvent('partnerwithus_form_start_clk', {
                        section: 'hero'
                      });
                    }}
                  >
                    {isLoading ? (
                      <>
                        <span className={styles.loader}></span>
                        Sending...
                      </>
                    ) : (
                      'Schedule a Demo'
                    )}
                  </button>
                </div>
              </div>

              {/* Back Side - Result */}
              <div className={`${styles.cardSide} ${styles.cardBack}`}>
                <div className={styles.resultContent}>
                  <div className={styles.resultIcon}>
                    {flipType === 'success' ? (
                      <Image 
                        src="/images/success.png" 
                        alt="Success" 
                        className={styles.successImage} 
                        width={120} 
                        height={120} 
                        loading="lazy"
                      />
                    ) : flipType === 'error' ? (
                      <Image 
                        src="/images/failure.png" 
                        alt="Failure" 
                        className={styles.successImage} 
                        width={120} 
                        height={120} 
                        loading="lazy"
                      />
                    ) : null}
                  </div>
                  <h3 className={styles.resultTitle}>
                    {flipType === 'success' ? 'Thank You!' : flipType === 'error' ? 'Oops!' : ''}
                  </h3>
                  <p className={styles.resultMessage}>
                    {flipType === 'success' 
                      ? 'Your submission has been received. Our team will connect with you soon.' 
                      : flipType === 'error'
                      ? 'Unable to submit your request. Please try again or contact support if the issue persists.'
                      : ''}
                  </p>
                  {flipType && (
                    <button 
                      type="button"
                      className={styles.backBtn} 
                      onClick={handleFlipBack}
                      disabled={!isFlipped || isFlipping}
                    >
                      Back to Form
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
       <Suspense fallback={<div style={{height: '400px'}}></div>}>
         <MedicalServices/>
       </Suspense>
       <Suspense fallback={<div style={{height: '400px'}}></div>}>
         <WellnessAreas/>
       </Suspense>
       <Suspense fallback={<div style={{height: '400px'}}></div>}>
         <WhyPartnerSection/>
       </Suspense>
       <Suspense fallback={<div style={{height: '400px'}}></div>}>
         <TestimonialSection/>
       </Suspense>
       <Suspense fallback={<div style={{height: '400px'}}></div>}>
         <FAQSection/>
       </Suspense>
    </div>
  
  );
};

export default PartnerWithUs;