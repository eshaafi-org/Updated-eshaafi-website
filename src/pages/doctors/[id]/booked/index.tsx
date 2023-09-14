"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/helper/CONST";
import BookAppointmentPage from "@/views/BookAppointment/BookAppointmentPage";
import { useRouter } from "next/router";

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
    <main>
      {loading ? <p>loading...</p> : <BookAppointmentPage data={response} />}
    </main>
  );
}
