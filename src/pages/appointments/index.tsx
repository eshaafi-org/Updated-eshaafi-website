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
  const [appointType, setAppointType] = useState("Past");

  return (
    <>
      <Head>
        <title>Appointments</title>
      </Head>
      <main>
        <section className="container">
          <div className="flex flex-col row-gap-1 position-relative sm-row-gap-0-5">
            <span>
              <h2>My Appointments</h2>
              <AddressBar links={links} />
            </span>
            <section className="flex justify-between col-gap-1 items-start lg-flex-col lg-row-gap-2 sm-row-gap-1">
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
                <div className="border bg-main w-full rounded p-1">
                  <h4 className="text-2 mb-1">View Appointments</h4>
                  <form action="" className="flex flex-col">
                    <label htmlFor="Past" className="text text-main mb-1">
                      <input
                        className="mr-1"
                        id="Past"
                        onChange={() => setAppointType("Past")}
                        type="radio"
                        name="type"
                        defaultChecked={true}
                      />
                      Past
                    </label>
                    <label htmlFor="Upcoming" className="text text-main ">
                      <input
                        className="mr-1"
                        id="Upcoming"
                        onChange={() => setAppointType("Upcoming")}
                        type="radio"
                        name="type"
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
