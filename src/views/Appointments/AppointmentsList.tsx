import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/appointments.module.scss";
import { FaRegClock } from "react-icons/fa6";
import { BsCalendar4Week } from "react-icons/bs";
import moment from "moment";
import axios, { AxiosError } from "axios";
import { BASE_URL, headers } from "@/helper/CONST";
import empty from "../../../public/images/empty.png";
import Button from "@/components/Button";
// appointment card
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
              className={styles.cardImage}
            />
            <span className="flex flex-col">
              <h5 className={styles.subHeading}>
                {appointment?.doctorInfo?.title +
                  " " +
                  appointment?.doctorInfo?.firstName +
                  " " +
                  appointment?.doctorInfo?.lastName}
              </h5>
              <p className={styles.text}>
                {appointment?.doctorInfo?.specialization}
              </p>
              <p className={styles.text}>
                Patient: {appointment?.patientInfo?.name}
              </p>
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
            <p className={styles.subText}>{appointment?.appoint_type}</p>
          </div>
        </div>
        <div className="flex  col-gap-2 items-center pt-1 flex-wrap sm-items-start sm-row-gap-1">
          <p className={"flex col-gap-1 items-center " + styles.text}>
            <BsCalendar4Week />

            {moment(appointment.appoint_date).format("dddd, DD MMMM")}
          </p>
          <p className={"flex col-gap-1 items-center " + styles.text}>
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
// appointment list component
export default function AppointmentsList({ type }: { type: string }) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [appoint, setAppoint] = useState<any[]>([]);
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  // to load more data this function will run on scroll end
  const loadMoreData = () => {
    if (lastEvaluatedKey) {
      document.body.style.overflow = "hidden";
      setLoading(true);
      setReachedEnd(false);
      axios
        .post(
          `${BASE_URL}/patients/appointments?last=${lastEvaluatedKey}`,
          {
            type: type,
          },
          {
            headers: headers(),
          }
        )
        .then((response) => {
          const newLastEvaluatedKey = response.data.response.LastEvaluatedKey;
          setLastEvaluatedKey(newLastEvaluatedKey);
          const appointmentListNextPAge = response.data.response.Items;
          setAppoint((prev) => [...prev, ...appointmentListNextPAge]);
          document.body.style.overflow = "auto";
          setLoading(false);
          setReachedEnd(true);
        })
        .catch((error) => {
          console.error(error.response.data.response.message);
          setLoading(false);
        });
    }
  };
  // after first rendering
  async function getConsultations(type: string): Promise<any> {
    setLoading(true);
    try {
      axios
        .post(
          BASE_URL + "/patients/appointments",
          {
            type: type,
          },
          {
            headers: headers(),
          }
        )
        .then((response) => {
          setLoading(false);
          setLastEvaluatedKey(response.data.response.LastEvaluatedKey);
          setAppoint(response.data.response.Items);
          setReachedEnd(response.data.response.LastEvaluatedKey ? true : false);
        });
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        // Axios error: The request was made, but the server responded with a status code
        const axiosError: AxiosError = error;
        if (axiosError.response) {
          console.error(
            "Request failed with status",
            axiosError.response.status
          );
        } else {
          console.error("Axios error:", axiosError.message);
        }
      } else if (axios.isCancel(error)) {
        // Request was canceled
        console.error("Request canceled:", error.message);
      } else {
        // Something else happened
        console.error("Error:", error);
      }

      throw error; // Rethrow the error to be handled by the caller or an Error Boundary.
    }
  }
  useEffect(() => {
    getConsultations(type);
  }, [type]);
  // scrolling event
  useEffect(() => {
    function handleScroll() {
      const section = sectionRef.current;
      if (section) {
        const scrollPosition = window.scrollY;
        const sectionHeight = section.offsetHeight - 500;
        if (reachedEnd) {
          if (scrollPosition >= sectionHeight) {
            loadMoreData();
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [reachedEnd]);
  return (
    <div ref={sectionRef} className={styles.list}>
      {appoint.length > 0 ? (
        <ul
          className={
            "doc-profile bg-white flex flex-col row-gap-2  w-full sm-row-gap-1 "
          }
        >
          {appoint.map((appointment: any, indx: number) => (
            <li key={indx}>
              <Card appointment={appointment} />
            </li>
          ))}
          {loading && (
            <div className="flex justify-center">
              <div className="spinner-border" role="status"></div>
            </div>
          )}
        </ul>
      ) : (
        <div className="row ">
          <div className="col ">
            <div className="d-flex justify-content-center flex-column align-items-center row-gap-1">
              <Image
                src={empty}
                width={500}
                height={500}
                alt="search empty"
                className={styles.emptyImage}
              />
              <p>No {type === "past" ? "previous" : "Upcoming"} Appointments</p>
              <Link href={"/doctors"}>
                <Button variant={"outlined"}>Book Appointment</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
