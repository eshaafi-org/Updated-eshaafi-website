import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/appointments.module.scss";
import { FaRegClock } from "react-icons/fa6";
import { BsCalendar4Week } from "react-icons/bs";

import moment from "moment";
function Card({ appointment }: { appointment: any }) {
  return (
    <Link
      href={"/appointments/" + appointment.appointmentId}
      className={styles.appointCard}
    >
      <div className="border p-1 flex flex-col rounded shadow">
        <div className="flex justify-between border-bottom pb-1">
          <div className="flex items-center col-gap-1">
            <Image
              src={appointment?.doctorInfo?.profileUrl}
              alt="doctor-image"
              width={70}
              height={70}
              style={{ borderRadius: 50 }}
            />
            <span className="flex flex-col row-gap-0-5">
              <h5
                className=" font-bolder text-main capitalize"
                style={{ fontSize: 18 }}
              >
                {appointment?.doctorInfo?.title +
                  " " +
                  appointment?.doctorInfo?.firstName +
                  " " +
                  appointment?.doctorInfo?.lastName}
              </h5>
              <p>{appointment?.doctorInfo?.specialization}</p>
              <p>Patient: {appointment?.patientInfo?.name}</p>
            </span>
          </div>
          <div className="flex flex-col items-end row-gap-0-5">
            <span>
              <p
                className={`
                  ${
                    appointment.appointment_status === "missed"
                      ? styles.statusMissed
                      : appointment?.appointment_status === "booked"
                      ? styles.statusBooked
                      : appointment?.appointment_status === "completed"
                      ? styles.statusCompleted
                      : appointment?.appointment_status === "cancelled"
                      ? styles.statusCancelled
                      : appointment?.appointment_status === "reschedule"
                      ? styles.statusReschedule
                      : appointment?.appointment_status === "unattended"
                      ? styles.statusMissed
                      : styles.statusInprogress
                  } capitalize`}
              >
                {appointment?.appointment_status === "booked"
                  ? "Upcoming"
                  : appointment?.appointment_status}
              </p>
            </span>
            <p>{appointment?.appoint_type}</p>
          </div>
        </div>
        <div className="flex  col-gap-2 items-center pt-1 sm-flex-col sm-items-start sm-row-gap-1">
          <p className="flex col-gap-1 items-center">
            <BsCalendar4Week />

            {moment(appointment.appoint_date).format("dddd, DD MMMM")}
          </p>
          <p className="flex col-gap-1 items-center">
            <FaRegClock />

            {`${appointment.appoint_start_time} - ${moment(
              appointment.appoint_end_time,
              "HH:mm:ss"
            ).format("h:mm A")}`}
          </p>
        </div>
      </div>
    </Link>
  );
}
export default function AppointmentsList({
  list = [],
  type,
  loading,
}: {
  list: any;
  loading: boolean;
  type: string;
}) {
  return (
    <>
      {list.length > 0 ? (
        <ul
          className={
            "doc-profile bg-white flex flex-col row-gap-2 sm-w-full " +
            styles.list
          }
        >
          {list.map((appointment: any, indx: number) => (
            <li key={indx}>
              <Card appointment={appointment} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No {type === "past" ? "previous" : "Upcoming"} Appointments</p>
      )}
    </>
  );
}
