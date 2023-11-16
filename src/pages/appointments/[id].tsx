"use client";
import { useState, useEffect } from "react";
import Timer from "@/views/Appointments/appointmentPage/Timer";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useRouter } from "next/router";
import { BASE_URL, headers } from "@/helper/CONST";
import DoctorCard from "@/views/Appointments/appointmentPage/Doctor";
import Summary from "@/views/Appointments/appointmentPage/Summary";
import AddressBar from "@/components/AddressBar";
import Link from "next/link";
import styles from "../../styles/appointments.module.scss";
import eprescription from "../../../public/images/eprescription.svg";
import record from "../../../public/images/record.svg";
import Image from "next/image";
import Head from "next/head";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

// links
const links = [
  { name: "Home", link: "/" },
  { name: "Doctors", link: "/doctors" },
  { name: "Appointments", link: "/appointments" },
];
export default function AppointmentPage() {
  const params = useRouter();
  const [detail, setDetail] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { userAuth } = useSelector((state: any) => state.loginModalReducer);
  const dispatch = useDispatch();
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
  async function consultationDetail(): Promise<any> {
    setLoading(false);
    axios
      .get(BASE_URL + "/patients/appointments/" + params?.query?.id, {
        headers: headers(),
      })
      .then((res) => {
        setLoading(true);
        setDetail(res.data.response);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setLoading(false);
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
        } else if (error.response.status === 405) {
          logout();
          dispatch({ type: "loginModalSlice/signIn" });
        }
      });
  }
  // cancel appointment
  const cancelAppointment = () => {
    axios
      .patch(
        BASE_URL + `/appointment/${params?.query.id}/cancel`,
        {},
        {
          headers: headers(),
        }
      )
      .then((res) => {
        console.log(res);
        toast("Appointment Cancelled Successfully ", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          type: "success",
        });
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status === 401) {
          setLoading(false);
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
        } else if (error.response.status === 405) {
          logout();
          dispatch({ type: "loginModalSlice/signIn" });
        } else if (error.response.status === 404) {
          toast("You can cancel this appointment before atleast 2 hours", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            type: "error",
          });
        }
      });
  };
  useEffect(() => {
    if (params?.query.id) {
      consultationDetail();
    }
  }, [params?.query.id]);
  return (
    <>
      <Head>
        <title>Appointments</title>
      </Head>
      <section className="container">
        <span>
          <h2>Book video consultation with the best doctors</h2>
          <AddressBar links={links} />
        </span>
        {detail?.appointment_status === "missed" ||
          detail?.appointment_status === "completed" ||
          detail?.appointment_status === "cancelled" || (
            <Timer appointment={detail} />
          )}
        {loading ? (
          <div
            className={
              "d-flex justify-content-between " + styles.consultationWrapper
            }
          >
            <section className={styles.appointmentDetail}>
              <DoctorCard doctor={detail} />
              <div className={styles.btnContainer}>
                <Link
                  href={`/medicalrecord`}
                  className={`${styles.consultationBtn} ${
                    detail?.appointment_status === "missed" ||
                    detail?.appointment_status === "cancelled" ||
                    detail?.appointment_status === "booked" ||
                    detail?.appointment_status === "unattended"
                      ? styles.disableLink
                      : ""
                  }`}
                >
                  <Image src={record} alt="medical record" width={30} />
                  Medical Record
                </Link>
                <Link
                  href={`/eprescription`}
                  className={`${styles.consultationBtn} ${
                    detail?.appointment_status === "missed" ||
                    detail?.appointment_status === "cancelled" ||
                    detail?.appointment_status === "booked" ||
                    detail?.appointment_status === "unattended"
                      ? styles.disableLink
                      : ""
                  }`}
                >
                  <Image src={eprescription} alt="eprescription" width={30} />
                  ePrescription
                </Link>
              </div>
            </section>
            <Summary summary={detail} cancelAppointment={cancelAppointment} />
          </div>
        ) : (
          <div className="row">
            <div className="col-8">
              <p className="card-text placeholder-glow">
                <span className="placeholder col-7"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-6"></span>
                <span className="placeholder col-8"></span>
              </p>
            </div>
            <div className="col-4">
              <p className="card-text placeholder-glow">
                <span className="placeholder col-7"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-6"></span>
                <span className="placeholder col-8"></span>
              </p>
            </div>
          </div>
        )}
        <ToastContainer />
      </section>
    </>
  );
}
