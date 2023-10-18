"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/helper/CONST";
import BookAppointmentPage from "@/views/BookAppointment/BookAppointmentPage";
import { useRouter } from "next/router";
import Head from "next/head";
import { useParams } from "next/navigation";

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
      <main>
        {loading ? (
          <div className="container">
            <div className="w-60">
              <div className="card border-none" aria-hidden="true">
                <div className="card-body">
                  <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-6"></span>
                  </h5>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-7"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <BookAppointmentPage data={response} />
        )}
      </main>
    </>
  );
}
