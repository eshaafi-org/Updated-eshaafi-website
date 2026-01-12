"use client"
import React, { useState, useEffect } from "react";
import styles from "../../styles/applynow.module.scss";
import { trackEvent } from "@/lib/ga";

const GetInTouch = () => {
  useEffect(() => {
    trackEvent('getintouch_page_view_clk', {
      section: 'page_load'
    })
  }, [])

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error'>('success');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!role.trim()) newErrors.role = 'Role/Position is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) 
      newErrors.email = 'Please enter a valid email address';
    if (!message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      trackEvent('getintouch_form_error_clk', {
        section: 'form',
        error_type: 'validation'
      });
      return;
    }
    
    trackEvent('getintouch_form_submit_clk', {
      section: 'form'
    });
    
    setIsLoading(true);
    const data = {
      type: 'thu',
      name,
      role_position: role,
      email,
      message,
      subject: 'Get in Touch Inquiry'
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
      if (response.ok) {
        trackEvent('getintouch_form_success_clk', {
          section: 'form'
        });
        setModalType('success');
        setShowModal(true);
        setName('');
        setRole('');
        setEmail('');
        setMessage('');
        setErrors({});
      } else {
        trackEvent('getintouch_form_error_clk', {
          section: 'form',
          error_type: 'submission_failed'
        });
        const errorText = await response.text();
        console.error('Error response:', errorText);
        setModalType('error');
        setShowModal(true);
      }
    } catch (error) {
      trackEvent('getintouch_form_error_clk', {
        section: 'form',
        error_type: 'fetch_error'
      });
      console.error('Fetch error:', error);
      setModalType('error');
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {/* Hero Blue Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Get in Touch</h1>
          <p className={styles.subtitle}>
            Connect with our care team to find the right support for your mind and body.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className={styles.formSection}>
        <div className={styles.formContainer}>
          <form className={styles.formBox} onSubmit={handleSubmit}>
            
            <div className={styles.formGroup}>
              <input 
                type="text" 
                placeholder={errors.name || "Enter your name"}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({...errors, name: ''});
                }}
                className={errors.name ? styles.error : ''}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <input 
                type="text" 
                placeholder={errors.role || "Your role / position"}
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  if (errors.role) setErrors({...errors, role: ''});
                }}
                className={errors.role ? styles.error : ''}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <input 
                type="email" 
                placeholder={errors.email || "Enter your email"}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({...errors, email: ''});
                }}
                className={errors.email ? styles.error : ''}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <textarea 
                placeholder={errors.message || "Write your message"}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message) setErrors({...errors, message: ''});
                }}
                className={errors.message ? styles.error : ''}
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className={styles.submitBtn}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className={styles.loader}></span>
                  Sending...
                </>
              ) : (
                'Submit'
              )}
            </button>
          </form>
        </div>
      </section>

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
    </>
  );
};

export default GetInTouch;
