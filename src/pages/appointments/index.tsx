"use client";
import { useState } from "react";
import AppointmentsList from "@/views/Appointments/AppointmentsList";
import Head from "next/head";
// import style from "../../styles/appointments.module.scss";
import style from "../../styles/appointments.module.scss";

export default function Appointments() {
  const [appointType, setAppointType] = useState("Past");

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
              {/* appointment list */}
              <AppointmentsList type={appointType} />
              {/*consultation filters*/}
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
                      Past
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
