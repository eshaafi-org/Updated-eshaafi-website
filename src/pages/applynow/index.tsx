"use client";
import React, { useState } from "react";
import styles from "../../styles/applynow.module.scss";

// Validation functions
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  // Accept 10+ digits
  const phoneRegex = /^\d{10,}$/;
  return phoneRegex.test(phone.replace(/\D/g, ""));
};

const ApplyNow: React.FC = () => {
  // Type is hardcoded as 'career' for this form
  const APPLICATION_TYPE = "career";

  const [formData, setFormData] = useState({
    name: "",
    position: "",
    email: "",
    phone: "",
    file: null as File | null,
  });
  const [fileName, setFileName] = useState("No file chosen");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error'>('success');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (file.type !== "application/pdf") {
        setValidationErrors(prev => ({
          ...prev,
          file: "Only PDF files are allowed"
        }));
        setFileName("No file chosen");
        setFormData(prev => ({ ...prev, file: null }));
        return;
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setValidationErrors(prev => ({
          ...prev,
          file: "File size must be less than 10MB"
        }));
        setFileName("No file chosen");
        setFormData(prev => ({ ...prev, file: null }));
        return;
      }

      setFileName(file.name);
      setFormData(prev => ({ ...prev, file }));
      
      // Clear file error
      if (validationErrors.file) {
        setValidationErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.file;
          return newErrors;
        });
      }
    }
  };

  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {};

    // Validate all fields
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.position.trim()) {
      newErrors.position = "Position is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number (10+ digits)";
    }

    if (!formData.file) {
      newErrors.file = "Please upload a PDF resume";
    }

    setValidationErrors(newErrors);

    // If there are validation errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      setModalType('error');
      setShowModal(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log("Submitting form data:", formData);
      
      // OLD API ENDPOINT - Commented out instead of removed
      // const response = await fetch("/api/submit-application", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     name: formData.name,
      //     position: formData.position,
      //     email: formData.email,
      //     phone: formData.phone,
      //     type: APPLICATION_TYPE,
      //     fileName: formData.file?.name || "No file chosen",
      //   }),
      // });

      // Create FormData for multipart/form-data submission
      const formDataToSend = new FormData();
      formDataToSend.append('type', APPLICATION_TYPE);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('position', formData.position);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('subject', 'Career Application Submission');
      
      // Add file if it exists
      if (formData.file) {
        console.log('File to upload:', formData.file.name, 'Size:', formData.file.size, 'Type:', formData.file.type);
        
        // Check if file has content
        if (formData.file.size === 0) {
          console.error('File is empty!');
          setModalType('error');
          setShowModal(true);
          return;
        }
        
        // Read file as ArrayBuffer to ensure content is preserved
        const fileBuffer = await formData.file.arrayBuffer();
        const fileBlob = new Blob([fileBuffer], { type: formData.file.type });
        formDataToSend.append('resume', fileBlob, formData.file.name);
        
        //console.log('File content read and appended to FormData, size:', fileBuffer.byteLength);
      } else {
        //console.log('No file selected');
      }

      const response = await fetch('https://f6l7k20y31.execute-api.us-east-1.amazonaws.com/stage/new/patient/emailWebsite/notification', {
        method: 'POST',
        body: formDataToSend,
        // Remove Content-Type header to let browser set it for multipart/form-data
      });

      console.log("Response status:", response.status);
      
      if (response.ok) {
        setModalType('success');
        setShowModal(true);
        // Reset form
        setFormData({
          name: "",
          position: "",
          email: "",
          phone: "",
          file: null,
        });
        setFileName("No file chosen");
        setValidationErrors({});
      } else {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        setModalType('error');
        setShowModal(true);
      }

      /*
      // OLD CODE 
      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit application");
      }
      */

    } catch (err) {
      // OLD ERROR HANDLING 
      // const errorMessage = err instanceof Error ? err.message : "An error occurred";
      // setModalType('error');
      // setShowModal(true);
      // console.error("Submission error:", err);
      console.error("Submission error:", err);
      setModalType('error');
      setShowModal(true);
    } finally {
      setLoading(false);
    }
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
            {error && <p style={{ color: "red", marginBottom: "1rem", fontSize: "0.875rem", textAlign: "center" }}>{error}</p>}
            
            <input type="text" name="name" placeholder="Name*" value={formData.name} onChange={handleChange} />
            
            <input type="text" name="position" placeholder="Position*" value={formData.position} onChange={handleChange} />
            
            <input type="email" name="email" placeholder="Email*" value={formData.email} onChange={handleChange} />
            
            <input type="tel" name="phone" placeholder="Phone*" value={formData.phone} onChange={handleChange} />

            <div className={styles.fileUpload}>
              <label className={styles.uploadLabel}>Upload CV/Resume</label>
              <div className={styles.fileRow}>
                <input type="file" id="file-upload" onChange={handleFileChange} accept=".pdf" />
                <label htmlFor="file-upload" className={styles.chooseFile}>Choose File</label>
                <span className={styles.fileName}>{fileName}</span>
              </div>
              <p className={styles.allowedType}>Allowed Type(s): .pdf</p>
            </div>

            <button type="button" onClick={handleSubmit} disabled={loading} className={styles.submitBtn}>
              {loading ? "SUBMITTING..." : "SUBMIT"}
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
                ? 'We have received your application. Our team will get back to you soon!' 
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

export default ApplyNow;
