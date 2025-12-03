import { useEffect, useState, useRef, useCallback } from "react";
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
import { SkeletonLoader } from "@/components/SkeletonLoader";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

// Create a client-only ToastContainer to avoid SSR issues
const ClientOnlyToastContainer = dynamic(
  () => import("react-toastify").then((mod) => mod.ToastContainer),
  { ssr: false }
);
// appointment card
function Card({ appointment }: { appointment: any }) {
  const status = appointment?.appointment_status;

  const statusLabel =
    status === "completed"
      ? "Completed"
      : status === "cancelled"
        ? "Cancelled"
        : status === "inprogress"
          ? "In Progress"
          : "Booked";

  return (
    <Link href={"/appointments/" + appointment.appointmentId} className={styles.appointmentCard}>
      <div className={styles.cardContent}>
        {/* LEFT Section - Doctor Info */}
        <div className={styles.leftSection}>
          <div className={styles.avatarContainer}>
            <Image
              src={
                appointment?.doctorInfo?.profileUrl ||
                appointment?.doctorInfo?.profile_picture ||
                appointment?.doctorInfo?.personal_info?.profile_picture ||
                appointment?.doctor?.profileUrl ||
                "/images/doctor-placeholder.png"
              }
              alt="doctor"
              width={60}
              height={60}
              className={styles.doctorAvatar}
            />
          </div>
          <div className={styles.doctorInfo}>
            <h3 className={styles.doctorName}>
              Dr. {appointment?.doctorInfo?.personal_info?.firstName ||
                appointment?.doctorInfo?.firstName ||
                appointment?.doctor?.firstName ||
                appointment?.firstName ||
                appointment?.doctor_name ||
                "John"} {appointment?.doctorInfo?.personal_info?.lastName ||
                  appointment?.doctorInfo?.lastName ||
                  appointment?.doctor?.lastName ||
                  appointment?.lastName ||
                  "Smith"}
            </h3>
            <p className={styles.doctorSpeciality}>
              {appointment?.doctorInfo?.personal_info?.specialization ||
                appointment?.doctorInfo?.specialization ||
                appointment?.doctorInfo?.specialty ||
                appointment?.doctor?.specialization ||
                appointment?.doctor?.specialty ||
                appointment?.specialization ||
                appointment?.category ||
                "General Practice"}
            </p>
          </div>
        </div>

        {/* CENTER Section - Date & Time */}
        <div className={styles.centerSection}>
          <div className={styles.dateInfo}>
            <BsCalendar4Week className={styles.icon} />
            <span className={styles.dateValue}>
              {moment(appointment.appoint_date).format("DD MMM, YYYY")}
            </span>
          </div>

          <div className={styles.timeInfo}>
            <FaRegClock className={styles.icon} />
            <span className={styles.timeValue}>
              {appointment.appoint_start_time}
            </span>
          </div>
        </div>

        {/* RIGHT Section - Status */}
        <div className={styles.rightSection}>
          <span className={`${styles.statusBadge} ${styles[statusLabel.replace(" ", "")]}`}>
            {statusLabel}
          </span>
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
  const logout = useCallback(() => {
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
  }, [dispatch, userAuth.AccessToken, userAuth.uuid]);
  // to load more data this function will run on scroll end
  const loadMoreData = useCallback(() => {
    if (lastEvaluatedKey) {
      setLoading(true);
      setReachedEnd(false);

      // Map the filter type to API expected format
      let apiType = type;
      if (type === "Completed") {
        apiType = "Past";
      } else if (type === "Cancelled") {
        apiType = "Booked";
      } else if (type === "Upcoming") {
        // Include both Upcoming and Booked appointments
        apiType = "Upcoming,Booked";
      }

      axios
        .post(
          `${BASE_URL}/patients/appointments?last=${lastEvaluatedKey}`,
          {
            type: apiType,
          },
          {
            headers: headers(),
          }
        )
        .then((response) => {

          const newLastEvaluatedKey = response.data.response.LastEvaluatedKey;
          setLastEvaluatedKey(newLastEvaluatedKey);

          // // Filter appointments based on the current tab
          // let filteredAppointments = response.data.response.Items;
          // if (type === "Upcoming") {
          //   filteredAppointments = response.data.response.Items.filter((appointment: any) =>
          //     appointment.appointment_status === "missed" || appointment.appoint_type === "booked"
          //   );
          //   console.log('LoadMore Filtered Upcoming appointments:', filteredAppointments);
          // } else if (type === "Completed") {
          //   // Only show Completed appointments in Completed tab
          //   filteredAppointments = response.data.response.Items.filter((appointment: any) =>
          //     appointment.appointment_status === "completed"
          //   );
          //   console.log('LoadMore Filtered Completed appointments:', filteredAppointments);
          // }
          const appointmentListNextPPage = response.data.response.Items;
          setAppoint((prev) => [...prev, ...appointmentListNextPPage]);
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
  }, [lastEvaluatedKey, type, logout]);
  // after first rendering
  const getConsultations = useCallback(async (type: string): Promise<any> => {
    setLoading(true);
    try {
      // Map the filter type to API expected format
      let apiType = type;
      if (type === "Completed") {
        apiType = "Past";
      } else if (type === "Cancelled") {
        apiType = "Cancelled";
      } else if (type === "Upcoming") {
        // Include both Upcoming and Booked appointments
        apiType = "Upcoming";
      }

      axios
        .post(
          BASE_URL + "/patients/appointments",
          {
            type: apiType,
          },
          {
            headers: headers(),
          }
        )
        .then((response) => {
          setLoading(false);
          setLastEvaluatedKey(response.data.response.LastEvaluatedKey);

          // Debug logging
          //   console.log(`API Response for ${type} tab:`, response.data.response.Items);
          //   console.log('All appointment statuses:', response.data.response.Items.map((apt: any) => apt.appointment_status));

          //   // Filter appointments based on the current tab
          //   let filteredAppointments = response.data.response.appointment_status;
          //   if (type === "Upcoming") {
          //     // Show missed, booked, upcoming, inprogress appointments in Upcoming tab
          //     filteredAppointments = response.data.response.Items.filter((appointment: any) =>
          //       appointment.appointment_status === "missed"
          //     );
          //     console.log('Filtered Upcoming appointments:', filteredAppointments);
          //   } else if (type === "Completed") {
          //     // Only show Completed appointments in Completed tab
          //     filteredAppointments = response.data.response.Items.filter((appointment: any) =>
          //       appointment.appointment_status === "completed"
          //     );
          //     console.log('Filtered Completed appointments:', filteredAppointments);
          //   }

          //   setAppoint(filteredAppointments);
          // })
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
  }, [dispatch, logout]);
  useEffect(() => {
    if (type) {
      getConsultations(type);
    }
  }, [type, getConsultations]);
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
  }, [reachedEnd, loadMoreData]);
  return (
    <div ref={sectionRef} className={styles.list}>
      {appoint.length > 0 ? (
        <div className={styles.appointmentsList}>
          {appoint.map((appointment: any, indx: number) => (
            <Card key={indx} appointment={appointment} />
          ))}
          {loading && <SkeletonLoader />}
        </div>
      ) : (
        !loading && (
          <div className={styles.emptyState}>
            <div className={styles.emptyContent}>
              <Image
                src={empty}
                alt="No appointments"
                className={styles.emptyImage}
              />
              <h3 className={styles.emptyTitle}>
                No {type === "Completed" ? "Completed" : type === "Cancelled" ? "Cancelled" : "Upcoming"} Appointments
              </h3>
              <p className={styles.emptyDescription}>
                {type === "Upcoming"
                  ? "You don't have any upcoming appointments. Book one now!"
                  : `You don't have any ${type.toLowerCase()} appointments yet.`
                }
              </p>
              <Link href={"/doctors"}>
                <Button variant={"outlined"}>Book Appointment</Button>
              </Link>
            </div>
          </div>
        )
      )}
      <ClientOnlyToastContainer />
    </div>
  );
}
