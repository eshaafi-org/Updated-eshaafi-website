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
// links for navbar
const links = [
  { name: "Home", link: "/" },
  { name: "Doctors", link: "/doctors" },
  { name: "Appointments", link: "/appointments" },
];
export default function AppointmentPage() {
  const params = useRouter();
  const [detail, setDetail] = useState<any>(null);
  console.log(params);
  async function consultationDetail(): Promise<any> {
    try {
      const response: AxiosResponse = await axios.get(
        BASE_URL + "/patients/appointments/" + params?.query?.id,
        {
          headers: headers(),
        }
      );
      return setDetail(response.data.response);
    } catch (error) {
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
  console.log(detail);
  useEffect(() => {
    if (params?.query.id) {
      consultationDetail();
    }
  }, [params?.query.id]);
  return (
    <main>
      <section className="container">
        <span>
          <h2>Book video consultation with the best doctors</h2>
          <AddressBar links={links} />
        </span>
        {detail?.appointment_status === "missed" ||
          detail?.appointment_status === "completed" || (
            <Timer appointment={detail} />
          )}
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
          <Summary summary={detail} />
        </div>
      </section>
    </main>
  );
}
