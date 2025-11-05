import React from "react";
import Link from "next/link";
import styles from "@/styles/findDoctors.module.scss";

interface DoctorCardProps {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  consultationFee: number;
  available: boolean;
  image: string;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  id,
  name,
  specialty,
  experience,
  rating,
  consultationFee,
  available,
  image,
}) => {
  return (
    <div className={styles.doctorCard}>
      <div className={styles.cardHeader}>
        <div className={styles.imageContainer}>
          <img src={image} alt={name} className={styles.doctorImage} />
          {available && <div className={styles.onlineIndicator}></div>}
        </div>
        <div className={styles.doctorInfo}>
          <div className={styles.ratingBadge} style={{ fontFamily: "'Inter', sans-serif" }}>★ {rating.toFixed(1)}</div>
          <h3 className={styles.doctorName} style={{ fontFamily: "'Inter', sans-serif" }}>{name}</h3>
          <div className={styles.specialtyRow}>
            <p className={styles.specialty} style={{ fontFamily: "'Inter', sans-serif" }}>{specialty}</p>
            <span className={styles.experienceBadge} style={{ fontFamily: "'Inter', sans-serif" }}>
              {experience} Exp
            </span>
          </div>
        </div>
      </div>

      <div className={styles.cardMiddle}>
        <div className={styles.leftSection}>
          <div className={styles.availabilityStatus}>
            <span className={styles.availabilityText} style={{ fontFamily: "'Inter', sans-serif" }}>Available Now</span>
          </div>
          <div className={styles.consultationType}>
            <img
              src="/images/video-icon.svg"
              // alt="Video Consult"
              className={styles.consultationIcon}
            />
            <span className={styles.consultationLabel} style={{ fontFamily: "'Inter', sans-serif" }}>Video Consultation</span>
          </div>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.feeLabel} style={{ fontFamily: "'Inter', sans-serif" }}> Rs. {consultationFee}</div>
          <span className={styles.feeDescription} style={{ fontFamily: "'Inter', sans-serif" }}>Consultation fee</span>
        </div>
      </div>

      <div className={styles.actionButtons}>
        <Link href={`/doctors/${id}`}>
          <button className={styles.viewProfileBtn} style={{ fontFamily: "'Inter', sans-serif" }}>View Profile</button>
        </Link>
        <Link href={`/doctors/${id}/book`}>
          <button className={styles.bookAppointmentBtn} style={{ fontFamily: "'Inter', sans-serif" }}>
            Book Appointment
            <svg
              width="20"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.arrowIcon}
            >
              <path
                d="M8 4L16 12L8 20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;
