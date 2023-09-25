"use client";
import { useState, useEffect } from "react";
import Timer from "@/views/Appointments/appointmentPage/Timer";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useRouter } from "next/router";
import { BASE_URL, headers } from "@/helper/CONST";
import DoctorCard from "@/views/Appointments/appointmentPage/Doctor";
import Summary from "@/views/Appointments/appointmentPage/Summary";
import Link from "next/link";
import styles from "../../styles/appointments.module.scss";
import eprescription from "../../../public/images/eprescription.png";
import record from "../../../public/images/record.png";
import Image from "next/image";

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
        <h2 className="mb-2">Book video consultation with the best doctors</h2>
        {detail?.appointment_status === "missed" || (
          <Timer appointment={detail} />
        )}
        <div className="flex col-gap-2 lg-flex-col lg-row-gap-1">
          <section className="flex row-gap-2 items-start flex-col w-60 lg-w-full">
            <DoctorCard doctor={detail} />
            <div className="flex col-gap-1 w-full sm-flex-col sm-row-gap-1">
              {/* <Link
                href={`/appointments/${params?.id}/eprescription`}
                className={`w-1-2 border rounded bg-white p-1 sm-w-full capitalize pointer flex items-center col-gap-2 ${
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
              <Link
                href={`/appointments/${params?.id}/eprescription`}
                className={`w-1-2  border rounded bg-white p-1 sm-w-full capitalize pointer flex items-center col-gap-2 ${
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
              </Link> */}
            </div>
          </section>
          <Summary summary={detail} />
        </div>
      </section>
    </main>
  );
}
