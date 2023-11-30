"use client";
import style from "@/styles/careers.module.scss";
import { useState, useEffect } from "react";
import { Heading24, Heading40, Text16 } from "@/components/Typography";
import { IoIosArrowForward } from "react-icons/io";
import { RxDotFilled } from "react-icons/rx";
import axios from "axios";

const jobs = [
  {
    heading: "Jr. Backend Develo",
    depart: "Product Team",
    location: "Remote",
  },
  {
    heading: "Doctor",
    depart: "Product Team",
    location: "Remote",
  },
  {
    heading: "Jr. Backend Developer",
    depart: "Product Team",
    location: "Remote",
  },
  {
    heading: "Jr. Backend Developer",
    depart: "Product Team",
    location: "Remote",
  },
];
export default function Jobs() {
  // variablse
  //   const [jobs, setJobs] = useState([]);
  //   // functions
  //   // get jobs
  //   const getjobs = () => {
  //     axios("").then((res) => setJobs(res.data.response.Items));
  //   };
  //   // use effect
  //   useEffect(() => {
  //     // getJobs()
  //   }, []);
  return (
    <div className="container sm-pt-0">
      <div className={style.jobsContainer}>
        <Heading24 children="Jobs" />
        <Heading40 children="Opened Position" />
        <ul className={style.jobsList}>
          {jobs.map((itm, indx) => (
            <li key={indx} className={style.jobsItm}>
              <div className="d-flex flex-column row-gap-0-5">
                <Heading24>{itm.heading}</Heading24>
                <ul>
                  <li>
                    <RxDotFilled style={{ color: "#1C6BA4" }} />
                    <Text16>{itm.depart}</Text16>
                  </li>
                  <li>
                    <RxDotFilled style={{ color: "#1C6BA4" }} />
                    <Text16> {itm.location}</Text16>
                  </li>
                </ul>
              </div>
              <IoIosArrowForward
                style={{ color: "#707683", fontSize: "1.5rem" }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
