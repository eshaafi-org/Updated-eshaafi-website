"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/helper/CONST";
import BookAppointmentPage from "@/views/BookAppointment/BookAppointmentPage";
import { useRouter } from "next/router";
import Head from "next/head";
import { trackEvent } from "@/lib/ga";
// import { useParams } from "next/navigation";
import {SkeletonLoader} from "@/components/SkeletonLoader";
export default function Booking() {
  const [response, setResponse] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const params = useRouter();

  // Helper function to sanitize doctor name for event
  const getSanitizedDoctorName = (firstName: string, lastName: string): string => {
    const fullName = `${firstName} ${lastName}`;
    return fullName
      .toLowerCase()
      .replace(/\s+/g, '_') // Replace spaces with underscores
      .replace(/[^a-z0-9_]/g, ''); // Remove special characters
  };

  const sanitizedDoctorName = response?.Doctor?.firstName && response?.Doctor?.lastName
    ? getSanitizedDoctorName(response.Doctor.firstName, response.Doctor.lastName)
    : 'doctor';

  // const params = useParams();
  function getSlots() {
    if (params.query.id) {
      axios
        .post(
          `${BASE_URL}/patients/doctor/appointmentSlots`,
          {
            doctorId: params.query.id,
            medium: "Video",
          }
          // {
          //   headers: headers(),
          // }
        )
        .then((res) => {
          setLoading(false);
          setResponse(res.data.response);
          // Track booking page view
          trackEvent(`fd_${sanitizedDoctorName}_booking_page_clk`, {
            section: 'booking_flow',
            doctor_id: params.query.id,
            doctor_name: `${res.data.response?.Doctor?.firstName} ${res.data.response?.Doctor?.lastName}`,
            specialty: res.data.response?.Doctor?.specialization
          });
        })
        .catch((err) => {
          setLoading(false);
          console.log("error", err);
        });
    }
  }

  useEffect(() => {
    getSlots();
  }, [params]);
  return (
    <>
      <Head>
        <title>Book Appointment</title>
        <meta name="description" content="Meet one on one with your doctor" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={"/favicon.ico"} />
      </Head>
      <main style={{ overflowX: "hidden" }}>
        {loading ? (
          <div className="container">
            <SkeletonLoader />
          </div>
        ) : (
          <BookAppointmentPage
            data={response}
            appointmentPage={{}}
            reschedule={false}
          />
        )}
      </main>
    </>
  );
}
