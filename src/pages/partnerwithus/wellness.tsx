"use client";
import React, { useEffect, useRef, useState } from "react"; // <-- useState yahan import karo

import styles from "../../styles/partnerwithus.module.scss";
import { trackEvent } from "@/lib/ga";

const WellnessAreas: React.FC = () => {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [showModal, setShowModal] = useState(false); // <-- yahan
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error'>('success');
  const [formData, setFormData] = useState({
    name: '',
    organizationName: '',
    contactNumber: '',
    email: '',
    organizationSize: '',
    interestedIn: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // const storedValue: any | null = localStorage.getItem("user");
    // const user = storedValue ? JSON.parse(storedValue) : null;
    // if (!user || !user.IdToken) {
    //   setModalType('error');
    //   setShowSuccessModal(true);
    //   return;
    // }

    const data = {
      type: 'business',
      name: formData.name,
      organization_name: formData.organizationName,
      contact_number: formData.contactNumber,
      email: formData.email,
      organization_size: formData.organizationSize,
      interested_in: formData.interestedIn,
      subject: 'New Business Inquiry - Wellness Meeting'
    };

    try {
      const response = await fetch('https://f6l7k20y31.execute-api.us-east-1.amazonaws.com/stage/new/patient/emailWebsite/notification', {
        method: 'POST',
        // headers: {
        //   ...headers()
        // },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setModalType('success');
        setShowSuccessModal(true);
        setShowModal(false);
        setFormData({
          name: '',
          organizationName: '',
          contactNumber: '',
          email: '',
          organizationSize: '',
          interestedIn: ''
        });
      } else {
        setModalType('error');
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setModalType('error');
      setShowSuccessModal(true);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.show);
          }
        });
      },
      { threshold: 0.25 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });
  }, []);

  return (
    <section id="wellness-section" className={styles.wellnessSection}>
      <h2 className={styles.sectionTitle}>
        Core <span>Wellness Areas</span>
      </h2>

      {/* Cards Section */}
      <div className={styles.cardsContainer}>
        {[
          {
            img: "/images/_x32_.svg",
            title: "Life Style & Fitness",
            text: "Yoga Sessions, Weight Management.",
            className: styles.card1,
          },
          {
            img: "/images/ion_fitness.svg",
            title: "Preventive Care",
            text: "Diabetes Awareness, Cancer Awareness, Heart Health.",
            className: styles.card2,
          },
          {
            img: "/images/brain.svg",
            title: "Mental Health",
            text: "Stress Management, Work-Life Balance, Energy Optimization.",
            className: styles.card3,
          },
        ].map((item, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el!)}
            className={`${styles.card} ${item.className}`}
            onClick={() => trackEvent('partnerwithus_wellness_area_clk', {
              section: 'wellness_areas'
            })}
            role="button"
            tabIndex={0}
          >
            <div className={styles.icon}>
              <img src={item.img} alt={item.title} />
            </div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>

      {/* Banner Section */}
     <div id="schedule" className={styles.bannerSection}>
  <div className={styles.bannerText}>
    <h4>
      Let&apos;s make your team more creative, healthier, and productive.
    </h4>
  </div>

  <div className={styles.imageWrapper}>
    <img
      src="/images/schedule-a-meeting.webp"
      alt="Doctor Meeting"
      className={styles.bannerImage}
    />
    <button
      className={styles.meetingButton}
      onClick={() => {
        setShowModal(true);
        trackEvent('partnerwithus_wellness_schedule_clk', {
          section: 'mid_page',
          action: 'schedule_meeting',
          content_type: 'corporate'
        });
      }}
    >
      Schedule a meeting
    </button>
  </div>
</div>


      {showModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowModal(false)}
        >
          <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <h3>Schedule a Meeting</h3>
            <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                name="name"
                placeholder="Name" 
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input 
                type="text" 
                name="organizationName"
                placeholder="Organization Name" 
                value={formData.organizationName}
                onChange={handleInputChange}
                required
              />
              <input 
                type="text" 
                name="contactNumber"
                placeholder="Contact Number" 
                value={formData.contactNumber}
                onChange={handleInputChange}
                required
              />
              <input 
                type="email" 
                name="email"
                placeholder="Official Email ID" 
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <div className={styles.formGroup}>
                <select 
                  name="organizationSize"
                  value={formData.organizationSize}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Organization Size</option>
                  <option value="1-20">1 - 20 Employees</option>
                  <option value="21-50">21 - 50 Employees</option>
                  <option value="51-100">51 - 100 Employees</option>
                  <option value="100+">100+ Employees</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <select 
                  name="interestedIn"
                  value={formData.interestedIn}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Interested In</option>
                  <option value="corporate wellness">Corporate Wellness</option>
                  <option value="mental wellbeing">Mental Wellbeing</option>
                  <option value="medical support">Medical Support</option>
                  <option value="complete health program">
                    Complete Health Program
                  </option>
                </select>
              </div>

              <button type="submit" className={styles.submitBtn}>Schedule a meeting</button>
            </form>
          </div>
        </div>
      )}

     
      {showSuccessModal && (
        <div className={styles.modalOverlay} onClick={() => setShowSuccessModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {/* <div className={styles.modalIcon}>
              {modalType === 'success' ? '✅' : '❌'}
            </div> */}
            <h3 className={styles.modalTitle}>
                {modalType === 'success' ? (
                                    <img src="/images/success.png" alt="Success" className={styles.successImage} />
                                  ) : (
                                    <img src="/images/failure.png" alt="Failure" className={styles.successImage} />
                                    
                                  )}
            </h3>
            <p className={styles.modalMessage}>
              {modalType === 'success' 
               ? 'Your submission has been received. Our team will connect with you soon.' 
               : 'Unable to submit your request. Please try again or contact support if the issue persists.'}
            </p>
            <button 
              className={styles.modalButton} 
              onClick={() => setShowSuccessModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default WellnessAreas;
