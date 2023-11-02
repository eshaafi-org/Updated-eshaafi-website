"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/helper/CONST";
import BookAppointmentPage from "@/views/BookAppointment/BookAppointmentPage";
import { useRouter } from "next/router";
import Head from "next/head";
// import { useParams } from "next/navigation";
import SkeletonLoader from "@/components/SkeletonLoader";
export default function Booking() {
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useRouter();
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
          console.log(res);
          setResponse(res.data.response);
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
          <BookAppointmentPage data={response} />
        )}
      </main>
    </>
  );
}
