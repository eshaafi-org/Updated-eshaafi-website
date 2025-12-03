"use client";
import { useState } from "react";
import AppointmentsList from "@/views/Appointments/AppointmentsList";
import Head from "next/head";
import style from "../../styles/appointments.module.scss";
import AddressBar from "@/components/AddressBar";
import GetApp from "@/views/Home/GetApp";

const links = [
  { name: "Home", link: "/" },
  { name: "Appointments", link: "/appointments" },
];
export default function Appointments() {
  const [appointType, setAppointType] = useState("Upcoming");
  return (
    <>
      <Head>
        <title>Appointments</title>
      </Head>
      <main>
        <section className="container">
          <div className="d-flex flex-column row-gap-1">
            <span>
              <AddressBar links={links} />
            </span>

            {/* Page Header */}
            <div className="text-center py-4">
              <h1 className="h2 fw-bold mb-2">Appointment Overview</h1>
              <p className="text-muted">Manage and track all your medical appointments in one place</p>
            </div>

            {/* Filter Chips */}
            <div className={style.chips}>
              <div className="d-flex justify-content-center gap-3">
                {["Upcoming", "Completed", "Cancelled"].map((t) => (
                  <button
                    key={t}
                    className={`${style.tabChip} ${appointType === t ? style.activeChip : ""}`}
                    onClick={() => setAppointType(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <section className={style.listingContainer}>

              <AppointmentsList type={appointType} />
            </section>
          </div>
        </section>
        <GetApp color="#DFEAF2" />
      </main>
    </>
  );
}
