import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from "../../styles/contact.module.scss";
import Button from "../../components/Button/index";
import { trackEvent } from "@/lib/ga";

export default function Contact() {
    useEffect(() => {
        if (!sessionStorage.getItem('contact_us_page_view_tracked')) {
            trackEvent('contact_us_page_view_clk', {
                section: 'page_load'
            });
            sessionStorage.setItem('contact_us_page_view_tracked', 'true');
        }
    }, []);

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('success');

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(2, 'Name must be at least 2 characters long')
            .required('Name is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        message: Yup.string()
            .min(10, 'Message must be at least 10 characters long')
            .required('Message is required'),
    });

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        console.log('Form data:', values);
        // Simulate form submission (e.g., send to backend or process here)
        
        // Simulate success (you can replace this with actual API call)
        setTimeout(() => {
            setModalType('success');
            setShowModal(true);
            setSubmitting(false);
            resetForm();
        }, 1000);
    };

    return (
        <section className='container'>
            <Head>
                <title>Eshaafi | Contact Us</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles['contact-form']}>
                <h1>Contact Us</h1>
                <Formik
                    initialValues={{ name: '', email: '', message: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div>
                                <label htmlFor="name">Name:</label>
                                <Field type="text" name="name" />
                                <ErrorMessage name="name" component="div" className={styles.error} />
                            </div>

                            <div>
                                <label htmlFor="email">Email:</label>
                                <Field type="email" name="email" />
                                <ErrorMessage name="email" component="div" className={styles.error} />
                            </div>

                            <div>
                                <label htmlFor="message">Message:</label>
                                <Field as="textarea" name="message" rows="4" />
                                <ErrorMessage name="message" component="div" className={styles.error} />
                            </div>

                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>

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
                                ? 'We have received your message. Our team will get back to you soon!' 
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
        </section>
    );
}
