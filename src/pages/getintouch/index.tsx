"use client"
import React from "react";
import styles from "../../styles/applynow.module.scss";

const GetInTouch = () => {
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
          <form className={styles.formBox}>
            
            <div className={styles.formGroup}>
              <input type="text" placeholder="Enter your name" />
            </div>

            <div className={styles.formGroup}>
              <input type="text" placeholder="Your role / position" />
            </div>

            <div className={styles.formGroup}>
              <input type="email" placeholder="Enter your email" />
            </div>

            <div className={styles.formGroup}>
              <textarea placeholder="Write your message"></textarea>
            </div>

            <button type="submit" className={styles.submitBtn}>Submit</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default GetInTouch;
