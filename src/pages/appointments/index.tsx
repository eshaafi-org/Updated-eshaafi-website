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
              <h2>My Appointments</h2>
              <AddressBar links={links} />
            </span>
            <section className={style.listingContainer + " position-relative"}>
              <div className={style.chips}>
                <div className="chip-group" role="radiogroup">
                  <div
                    className="chip chip-checkbox"
                    aria-labelledby="radioTwoLabel"
                    tabIndex={0}
                    role="radio"
                    aria-checked="false"
                    onClick={() => setAppointType("Upcoming")}
                  >
                    <input type="radio" name="radioEx" />
                    <span id="radioTwoLabel">Upcoming</span>
                  </div>
                  <div
                    className="chip chip-checkbox"
                    aria-labelledby="radioOneLabel"
                    tabIndex={0}
                    role="radio"
                    aria-checked="false"
                    onClick={() => setAppointType("Past")}
                  >
                    <input type="radio" name="radioEx" />
                    <span id="radioOneLabel">Past</span>
                  </div>
                </div>
              </div>
              {/* appointment list */}
              <AppointmentsList type={appointType} />
              {/*consultation filters*/}
              <section className={style.fitlers}>
                <div className="border bg-main w-100 rounded p-3">
                  <h4 className={style.fiterHeading}>View Appointments</h4>
                  <form action="" className="d-flex flex-column row-gap-0-5">
                    <label htmlFor="Past" className="">
                      <input
                        className="me-2"
                        id="Past"
                        onChange={() => setAppointType("Past")}
                        type="radio"
                        name="type"
                      />
                      Past
                    </label>
                    <label htmlFor="Upcoming" className="text text-main ">
                      <input
                        className="me-2"
                        id="Upcoming"
                        onChange={() => setAppointType("Upcoming")}
                        type="radio"
                        name="type"
                        defaultChecked={true}
                      />
                      Upcoming
                    </label>
                  </form>
                </div>
              </section>
            </section>
          </div>
        </section>
        <GetApp color="#DFEAF2" />
      </main>
    </>
  );
}
