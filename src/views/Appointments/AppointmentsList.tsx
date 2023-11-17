import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/appointments.module.scss";
import { FaRegClock } from "react-icons/fa6";
import { BsCalendar4Week } from "react-icons/bs";
import moment from "moment";
import axios, { AxiosError } from "axios";
import { BASE_URL, headers } from "@/helper/CONST";
import empty from "../../../public/images/empty.svg";
import Button from "@/components/Button";
import SkeletonLoader from "@/components/SkeletonLoader";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// appointment card
function Card({ appointment }: { appointment: any }) {
  return (
    <Link
      href={"/appointments/" + appointment.appointmentId}
      className={styles.appointCard}
    >
      <div className="border p-3 d-flex flex-column rounded shadow">
        {/* profile information */}
        <div className="d-flex justify-content-between border-bottom pb-4">
          <div className="d-flex align-items-center ">
            <Image
              src={appointment?.doctorInfo?.profileUrl}
              alt="doctor-image"
              width={70}
              height={70}
              style={{ borderRadius: 50 }}
              className={styles.cardImage}
            />
            <span className="d-flex flex-column">
              <h5 className={styles.docHeading}>
                {appointment?.doctorInfo?.title +
                  " " +
                  appointment?.doctorInfo?.firstName +
                  " " +
                  appointment?.doctorInfo?.lastName}
              </h5>
              <p className={styles.docDesc}>
                {appointment?.doctorInfo?.specialization}
              </p>
              <p className={styles.docDesc}>
                Patient: {appointment?.patientInfo?.name}
              </p>
            </span>
          </div>
          {/* status information */}
          <div className="d-flex flex-column align-items-end row-gap-0-5">
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
                  } text-capitalize`}
              >
                {appointment?.appointment_status === "booked"
                  ? "Upcoming"
                  : appointment?.appointment_status}
              </p>
            </span>
            <p className={styles.subText}>{appointment?.appoint_type}</p>
          </div>
        </div>
        {/* date and time section */}
        <div className="d-flex col-gap-2 items-center pt-3 flex-wrap ">
          <p
            className={
              "d-flex col-gap-1 align-items-center " + styles.appointTiming
            }
          >
            <BsCalendar4Week />

            {moment(appointment.appoint_date).format("dddd, DD MMMM")}
          </p>
          <p
            className={
              "d-flex col-gap-1 align-items-center " + styles.appointTiming
            }
          >
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
  const value = useSelector((state: any) => state.appointmentListReducer);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [appoint, setAppoint] = useState<any[]>([]);
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state: any) => state.loginModalReducer);
  // logout function
  const logout = () => {
    axios
      .post(BASE_URL + `/auth/signOut`, {
        access_token: userAuth.AccessToken,
        type: 1,
        uuid: userAuth.uuid,
      })
      .then((res) => {
        dispatch({ type: "loginModalSlice/clearAuth" });
        localStorage.removeItem("user");
      })
      .catch((err) => {
        dispatch({ type: "loginModalSlice/clearAuth" });
        localStorage.removeItem("user");
      });
  };
  // to load more data this function will run on scroll end
  const loadMoreData = () => {
    if (lastEvaluatedKey) {
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
          // console.log(response.reso);
          const newLastEvaluatedKey = response.data.response.LastEvaluatedKey;
          setLastEvaluatedKey(newLastEvaluatedKey);
          const appointmentListNextPAge = response.data.response.Items;
          setAppoint((prev) => [...prev, ...appointmentListNextPAge]);
          document.body.style.overflow = "auto";
          setLoading(false);
          setReachedEnd(true);
        })
        .catch((error) => {
          console.log("error: " + error.response.data.message);
          setLoading(false);
          if (error.response.status === 405) {
            logout();
          }
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
        })
        .catch((error) => {
          if (error.response.status === 401) {
            toast("Kindly login to view your appointments", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              type: "info",
            });
            dispatch({ type: "loginModalSlice/signIn" });
            console.log(error);
          } else if (error.response.status === 405) {
            logout();
            dispatch({ type: "loginModalSlice/signIn" });
          }
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
    if (type) {
      getConsultations(type);
    }
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
          className={"doc-profile bg-white d-flex flex-column row-gap-1 w-100"}
        >
          {appoint.map((appointment: any, indx: number) => (
            <li key={indx}>
              <Card appointment={appointment} />
            </li>
          ))}
          {loading && <SkeletonLoader />}
        </ul>
      ) : (
        <div className="row ">
          <div className="col ">
            <div className="d-flex justify-content-center flex-column align-items-center row-gap-1">
              <Image
                src={empty}
                alt="search empty"
                className={styles.emptyImage}
              />
              <p>No {type === "Past" ? "Previous" : "Upcoming"} Appointments</p>
              <Link href={"/doctors"}>
                <Button variant={"outlined"}>Book Appointment</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
