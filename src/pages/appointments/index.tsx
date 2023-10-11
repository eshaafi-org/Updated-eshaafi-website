"use client";
import { useState, useEffect } from "react";
import AppointmentsList from "@/views/Appointments/AppointmentsList";
import { BASE_URL, headers } from "@/helper/CONST";
import axios, { AxiosResponse, AxiosError } from "axios";
import { Suspense } from "react";
import Head from "next/head";
// import style from "../../styles/appointments.module.scss";
import style from "../../styles/appointments.module.scss";
import Checkbox from "@/components/Checkbox";
export default function Appointments() {
  const [appoint, setAppoint] = useState<any>(null);
  const [appointType, setAppointType] = useState("Past");
  const [loading, setLoading] = useState<boolean>(false);
  async function getConsultations(type: string): Promise<any> {
    try {
      const response: AxiosResponse = await axios.post(
        BASE_URL + "/patients/appointments",
        {
          type: type,
        },
        {
          headers: headers(),
        }
      );
      return setAppoint(response.data.response);
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
  useEffect(() => {
    getConsultations(appointType);
  }, [appointType]);
  return (
    <>
      <Head>
        <title>Appointments</title>
      </Head>
      <main>
        <section className="container">
          <div className="flex flex-col row-gap-2 position-relative">
            <h2>My Appointments</h2>
            <section className="flex justify-between col-gap-1 items-start lg-flex-col lg-row-gap-2">
              <Suspense fallback={<p>Loading...</p>}>
                <AppointmentsList
                  list={appoint?.Items}
                  type={appointType}
                  loading={loading}
                />
              </Suspense>
              {/* booking consultation */}
              <section className={style.fitlers}>
                <div className="border bg-main w-full rounded p-1">
                  <h4 className="text-2 mb-1">View Appointments</h4>
                  <form action="" className="flex flex-col">
                    <label htmlFor="Past" className="text text-main mb-1">
                      <input
                        className="mr-1"
                        id="Past"
                        type="radio"
                        name="type"
                        onChange={() => setAppointType("Past")}
                        defaultChecked={true}
                      />
                      past
                    </label>
                    <label htmlFor="Upcoming" className="text text-main ">
                      <input
                        className="mr-1"
                        id="Upcoming"
                        type="radio"
                        name="type"
                        onChange={() => setAppointType("Upcoming")}
                      />
                      Upcoming
                    </label>
                  </form>
                </div>
              </section>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
