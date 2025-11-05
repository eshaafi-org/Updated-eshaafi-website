"use client";
import React, { useState } from "react";
import styles from "../../styles/applynow.module.scss";

const ContributeBlog: React.FC = () => {
  const [category, setCategory] = useState("");
  const [showUploadBox, setShowUploadBox] = useState(false);
  const [showWriteBox, setShowWriteBox] = useState(false);

  return (
    <>
      {/* HERO */}
      <section className={styles.heroSection}>
        <h1 className={styles.title}>Contribute Your Blog</h1>
        <p className={styles.subtitle}>Write. Inspire. Heal — contribute your blog and make a difference today.</p>
      </section>

      {/* FORM */}
      <section className={styles.formSection}>
        <div className={styles.formContainer}>
          <div className={styles.formBox}>
            <input type="text" placeholder="Full Name*" />
            <input type="text" placeholder="Occupation*" />
            <input type="tel" placeholder="Phone*" />
            <input type="email" placeholder="Email*" />
            <textarea placeholder="Your Short Intro*"></textarea>

            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Category Selection*</option>
              <option>TeleMedicine</option>
              <option>Patient Care</option>
              <option>Digital Health</option>
              <option>Health Policy</option>
              <option>Medical Research</option>
            </select>

            <div className={styles.actionRow}>
              <button className={styles.secondaryBtn} onClick={() => setShowUploadBox(true)}>Upload Blog</button>
              <button className={styles.secondaryBtn} onClick={() => setShowWriteBox(true)}>Write Blog</button>
            </div>

            <button className={styles.submitBtn}>SUBMIT</button>
          </div>
        </div>
      </section>

      {/* UPLOAD BLOG MODAL */}
      {showUploadBox && (
        <div className={styles.modalWrapper}>
          <div className={styles.modalBox}>
            <h3>Upload Blog File</h3>

            <input type="file" accept=".doc,.docx,.pdf,.txt" />

            <button className={styles.modalPrimaryBtn}>Upload</button>
            <button className={styles.modalCloseBtn} onClick={() => setShowUploadBox(false)}>Close</button>
          </div>
        </div>
      )}

      {/* WRITE BLOG MODAL */}
      {showWriteBox && (
        <div className={styles.modalWrapper}>
          <div className={styles.modalBox}>
            <h3>Write Blog</h3>

            <textarea placeholder="Write your complete blog here..." />

            <button className={styles.modalPrimaryBtn}>Submit</button>
            <button className={styles.modalCloseBtn} onClick={() => setShowWriteBox(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ContributeBlog;
