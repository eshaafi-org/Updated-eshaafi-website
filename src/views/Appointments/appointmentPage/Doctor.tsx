import { FaStar } from "react-icons/fa6";
import Image from "next/image";
import style from "../../../styles/doctors.module.scss";
import styles from "../../../styles/appointments.module.scss";
export default function DoctorCard({ doctor }: any) {
  return (
    <div className="flex flex-col row-gap-2 border-bottom pb-2 w-full">
      <div className="flex col-gap-2 justify-between items-start sm-row-gap-1 sm-flex-reverse">
        <div className="flex col-gap-2">
          <div className={style.imageContainer}>
            <Image
              src={doctor?.doctorInfo?.profileUrl}
              alt="doctor-image"
              width={100}
              height={100}
              style={{ borderRadius: "50px" }}
            />
          </div>
          <span className="flex flex-col" style={{ rowGap: "0.3rem" }}>
            <h5>
              {doctor?.doctorInfo?.firstName} &nbsp;
              {doctor?.doctorInfo?.lastName}
            </h5>
            <p>{doctor?.doctorInfo?.specialization}</p>
            <p>
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
                  } sm-align-self-end`}
        >
          {doctor?.appointment_status === "booked"
            ? "Upcoming"
            : doctor?.appointment_status}
        </p>
      </div>
      <div className="flex col-gap-1 justify-between">
        <span className="flex flex-col items-center w-full  row-gap-1">
          <h5>{doctor?.doctorInfo?.yearsOfExperience} years</h5>
          <p>Experience</p>
        </span>
        <span
          className="flex flex-col items-center w-full border-left
                  border-right row-gap-1"
        >
          <h5>{doctor?.doctorRating?.behaviour}%</h5>
          <p className="text-center">Positive feedback</p>
        </span>
        <span className="flex flex-col items-center w-full row-gap-1">
          <h5>{doctor?.charges}</h5>
          <p>Fee in PKR</p>
        </span>
      </div>
    </div>
  );
}
