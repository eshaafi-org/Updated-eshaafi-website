"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/helper/CONST";
import BookAppointmentPage from "@/views/BookAppointment/BookAppointmentPage";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Booking() {
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useRouter();
  console.log(params.query.id);
  function getSlots() {
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
      })
      .catch((err) => {
        setLoading(false);
        console.log("error", err);
      });
  }

  useEffect(() => {
    getSlots();
  }, []);
  return (
    <>
      <Head>
        <title>Book Appointment</title>
        <meta name="description" content="Meet one on one with your doctor" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={"/favicon.ico"} />
      </Head>
      <main>
        {loading ? <p>loading...</p> : <BookAppointmentPage data={response} />}
      </main>
    </>
  );
}
