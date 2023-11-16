import { FaStar } from "react-icons/fa6";
import Image from "next/image";
import style from "../../../styles/doctors.module.scss";
import styles from "../../../styles/appointments.module.scss";
export default function DoctorCard({ doctor }: any) {
  console.log(doctor);
  return (
    <div className="d-flex flex-column row-gap-2 border-bottom pb-4 w-100">
      <div className="d-flex justify-content-between align-items-start">
        <div className="d-flex align-items-center col-gap-0-5">
          <div
            className={`${style.imageContainer} ${
              doctor?.isOnline ? style.docOnline : ""
            }`}
          >
            <Image
              src={doctor?.doctorInfo?.profileUrl}
              alt="doctor-image"
              width={100}
              height={100}
              className={style.docImg}
            />
          </div>
          <span className="d-flex flex-column" style={{ rowGap: "0.2rem" }}>
            <h5 className={style.docTitle}>
              {doctor?.doctorInfo?.firstName} &nbsp;
              {doctor?.doctorInfo?.lastName}
            </h5>
            <p className={style.docSpecialization}>
              {doctor?.doctorInfo?.specialization}
            </p>
            <p className={style.docSpecialization}>
              <FaStar style={{ color: "#FFC107" }} />
              <FaStar style={{ color: "#FFC107" }} />
              <FaStar style={{ color: "#FFC107" }} />
              <FaStar style={{ color: "#FFC107" }} />
              <FaStar style={{ color: "#FFC107" }} />
              {` ${doctor?.doctorRating?.averageRating}/5 (${
                doctor?.doctorRating?.count + " reviews"
              })`}
            </p>
          </span>
        </div>
        <div className="d-flex flex-column justify-content-center">
          <p
            className={`
                  ${
                    doctor?.appointment_status === "missed"
                      ? styles.statusMissed
                      : doctor?.appointment_status === "booked"
                      ? styles.statusBooked
                      : doctor?.appointment_status === "completed"
                      ? styles.statusCompleted
                      : doctor?.appointment_status === "cancelled"
                      ? styles.statusCancelled
                      : doctor?.appointment_status === "reschedule"
                      ? styles.statusReschedule
                      : doctor?.appointment_status === "unattended"
                      ? styles.statusMissed
                      : styles.statusInprogress
                  } text-capitalize`}
          >
            {doctor?.appointment_status === "booked"
              ? "Upcoming"
              : doctor?.appointment_status}
          </p>
          <p className={styles.appointType}>{doctor?.appoint_type}</p>
        </div>
      </div>
      <div className="d-flex col-gap-1 justify-content-around">
        <span className="d-flex flex-column align-items-center justify-content-center row-gap-1">
          <h5 className={style.experienceHeading}>
            {doctor?.doctorInfo?.yearsOfExperience} years
          </h5>
          <p className={style.experienceText}>Experience</p>
        </span>
        <span
          className={
            "d-flex flex-column align-items-center justify-content-center row-gap-1 border-start border-end w-25"
          }
        >
          <h5 className={style.experienceHeading}>
            {doctor?.doctorRating?.behaviour}%
          </h5>
          <p className={style.experienceText}>Positive feedback</p>
        </span>
        <span className="d-flex flex-column align-items-center justify-content-center row-gap-1">
          <h5 className={style.experienceHeading}>{doctor?.charges}</h5>
          <p className={style.experienceText}>Fee in PKR</p>
        </span>
      </div>
    </div>
  );
}
