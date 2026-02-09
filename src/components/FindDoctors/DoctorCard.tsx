import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/findDoctors.module.scss";
import { trackEvent } from "@/lib/ga";
import { useEffect, useRef } from "react";

interface DoctorCardProps {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  consultationFee: number;
  available: boolean;
  availableTime?: string;
  image: string;
  eventPrefix?: string; // Optional: defaults to 'fd_', use 'mw_' for mind-wellness
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  id,
  name,
  specialty,
  experience,
  rating,
  consultationFee,
  available,
  availableTime,
  image,
  eventPrefix = 'fd_', // Default to find-doctors prefix
}) => {
  // Check if this is a psychiatrist
  const isPsychiatrist = specialty?.toLowerCase().includes('psychiatrist');
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Helper function to sanitize doctor name for event (max 40 char limit)
  const getSanitizedDoctorName = (doctorName: string): string => {
    return doctorName
      .toLowerCase()
      .replace(/\s+/g, '_') // Replace spaces with underscores
      .replace(/[^a-z0-9_]/g, ''); // Remove special characters
  };
  
  const sanitizedName = getSanitizedDoctorName(name);

  // Track card impressions (psychiatrist and regular doctors)
  // useEffect(() => {
  //   if (!cardRef.current) return;

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           // Track psychiatrist impressions
  //           if (isPsychiatrist) {
  //             trackEvent('psychiatrist_view_clk', {
  //               section: 'psychiatrists',
  //               doctor_id: id,
  //               doctor_name: name,
  //               specialty: specialty
  //             });
  //           }
  //           // Track regular doctor impressions with doctor name in event
  //           trackEvent(`find_doctors_${sanitizedName}_view_clk`, {
  //             section: 'doctor_list',
  //             doctor_id: id,
  //             doctor_name: name,
  //             specialty: specialty
  //           });
  //           observer.unobserve(entry.target);
  //         }
  //       });
  //     },
  //     { threshold: 0.3 }
  //   );

  //   observer.observe(cardRef.current);
  //   return () => observer.disconnect();
  // }, [isPsychiatrist, id, name, specialty, sanitizedName]);
  
  return (
    <div className={styles.doctorCard} ref={cardRef}>
      <div className={styles.cardHeader}>
        <div className={styles.imageContainer}>
          {image ? (
            <Image 
              src={image} 
              alt={name} 
              width={85} 
              height={85} 
              className={styles.doctorImage} 
              unoptimized={false}
              onError={(e) => {
                // Fallback to hiding the image or showing a placeholder if needed
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          ) : (
            <div className={styles.doctorImage} />
          )}
          {available && <div className={styles.onlineIndicator}></div>}
        </div>
        <div className={styles.doctorInfo}>
          <div 
            className={styles.ratingBadge} 
            style={{ fontFamily: "'Inter', sans-serif" }}
            onClick={() => trackEvent(`${eventPrefix}${sanitizedName}_rating_clk`, {
              section: 'doctor_card',
              doctor_name: name,
              specialty: specialty,
              rating: rating.toFixed(1)
            })}
            role="button"
            tabIndex={0}
          >
            ★ {rating.toFixed(1)}
          </div>
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
          <div 
            className={`${styles.availabilityStatus} ${availableTime?.startsWith('Available at') ? styles.offline : styles.online}`}
            onClick={() => trackEvent(`${eventPrefix}${sanitizedName}_availability_clk`, {
              section: 'doctor_card',
              doctor_name: name,
              availability_status: available ? 'available' : 'booked',
              specialty: specialty
            })}
            role="button"
            tabIndex={0}
          >
            <span className={styles.availabilityText} style={{ fontFamily: "'Inter', sans-serif" }}>
              {availableTime}
            </span>
          </div>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.feeLabel} style={{ fontFamily: "'Inter', sans-serif" }}> Rs. {consultationFee}</div>
          <span className={styles.feeDescription} style={{ fontFamily: "'Inter', sans-serif" }}>Consultation fee</span>
        </div>
      </div>

      <div className={styles.actionButtons}>
        <Link href={`/doctors/${id}`}>
          <button 
            className={styles.viewProfileBtn} 
            style={{ fontFamily: "'Inter', sans-serif" }}
            onClick={() => {
              if (isPsychiatrist) {
                trackEvent('psychiatrist_profile_clk', {
                  section: 'psychiatrists',
                  doctor_id: id,
                  doctor_name: name,
                  specialty: specialty
                });
              }
              trackEvent(`${eventPrefix}${sanitizedName}_profile_clk`, {
                section: 'doctor_list',
                doctor_id: id,
                doctor_name: name,
                specialty: specialty,
                consultation_fee: consultationFee
              });
            }}
          >
            View Profile
          </button>
        </Link>
        <Link href={`/doctors/${id}/booked`}>
          <button 
            className={styles.bookAppointmentBtn} 
            style={{ fontFamily: "'Inter', sans-serif" }}
            onClick={() => {
              if (isPsychiatrist) {
                trackEvent('psychiatrist_profile_clk', {
                  section: 'psychiatrists',
                  doctor_id: id,
                  doctor_name: name,
                  specialty: specialty
                });
              }
              trackEvent(`${eventPrefix}${sanitizedName}_book_clk`, {
                section: 'doctor_list',
                doctor_id: id,
                doctor_name: name,
                specialty: specialty,
                consultation_fee: consultationFee
              });
            }}
          >
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
