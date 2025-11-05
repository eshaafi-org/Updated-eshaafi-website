"use client";
import React, { useState } from "react";
import styles from "../../styles/applynow.module.scss";


const ApplyNow: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    email: "",
    phone: "",
    fileName: "No file chosen"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData(prev => ({ ...prev, fileName: file ? file.name : "No file chosen" }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Application submitted successfully!");
  };

  return (
    <div className={styles.applyNowWrapper}>
      {/* Blue Hero Section */}
      <section className={styles.heroBlue}>
        <div className={styles.container}>
          <h1 className={styles.title}>Apply for Healthcare Consultant</h1>
          <p className={styles.subtitle}>
            Take the next step toward a healthier tomorrow — join our mission today.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className={styles.formSection}>
        <div className={styles.container}>
          <form className={styles.form}>
            <input type="text" name="name" placeholder="Name*" value={formData.name} onChange={handleChange} />
            <input type="text" name="position" placeholder="Position*" value={formData.position} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email*" value={formData.email} onChange={handleChange} />
            <input type="tel" name="phone" placeholder="Phone*" value={formData.phone} onChange={handleChange} />

            <div className={styles.fileUpload}>
              <label className={styles.uploadLabel}>Upload CV/Resume</label>
              <div className={styles.fileRow}>
                <input type="file" id="file-upload" onChange={handleFileChange} accept=".pdf" />
                <label htmlFor="file-upload" className={styles.chooseFile}>Choose File</label>
                <span className={styles.fileName}>{formData.fileName}</span>
              </div>
              <p className={styles.allowedType}>Allowed Type(s): .pdf</p>
            </div>

            <button type="button" onClick={handleSubmit} className={styles.submitBtn}>SUBMIT</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ApplyNow;
