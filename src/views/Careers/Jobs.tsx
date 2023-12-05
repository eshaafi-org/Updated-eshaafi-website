"use client";
import style from "@/styles/careers.module.scss";
// import { useState, useEffect } from "react";
import { Heading24, Heading40, Text16 } from "@/components/Typography";
import { IoIosArrowForward } from "react-icons/io";
import { RxDotFilled } from "react-icons/rx";
// import axios from "axios";
import Link from "next/link";

const jobs = [
  {
    id: 1,
    heading: "Jr. Backend Develo",
    depart: "Product Team",
    location: "Remote",
  },
  {
    id: 1,
    heading: "Doctor",
    depart: "Product Team",
    location: "Remote",
  },
  {
    id: 1,
    heading: "Jr. Backend Developer",
    depart: "Product Team",
    location: "Remote",
  },
  {
    id: 1,
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
        <Heading24>Jobs</Heading24>
        <Heading40>Opened Position</Heading40>
        <ul className={style.jobsList}>
          {jobs.map((itm, indx) => (
            <Link
              href={"/careers/" + itm.id}
              key={indx}
              className={style.jobLink}
            >
              <li className={style.jobsItm}>
                <div className="d-flex flex-column row-gap-0-5">
                  <Heading24 className="text-dark">{itm.heading}</Heading24>
                  <ul>
                    <li>
                      <RxDotFilled style={{ color: "#1C6BA4" }} />
                      <Text16 className="text-dark">{itm.depart}</Text16>
                    </li>
                    <li>
                      <RxDotFilled style={{ color: "#1C6BA4" }} />
                      <Text16 className="text-dark"> {itm.location}</Text16>
                    </li>
                  </ul>
                </div>
                <IoIosArrowForward
                  style={{ color: "#707683", fontSize: "1.5rem" }}
                />
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
