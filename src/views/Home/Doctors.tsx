"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import style from "../../styles/home.module.scss";
import { FaStar } from "react-icons/fa6";
import Link from "next/link";
import { motion } from "framer-motion";
import { useWindowSize } from "react-use";

export default function Doctors({ doc }: { doc: any }) {
  const doctorsList = doc.slice(0, 4);
  const size = useWindowSize();
  const [width, setWidth] = useState<number | null>(null);
  let carousel = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [carousel?.current?.offsetWidth]);
  return (
    <section style={{ width: "100%" }} className={style.docSection}>
      <h2 className="text-center">Book with Doctors</h2>
      <motion.div
        ref={carousel}
        whileTap={{ cursor: "grabbing" }}
        className={style.docContainer}
      >
        <motion.div
          whileTap={{ cursor: "grabbing" }}
          drag={"x"}
          dragConstraints={{ right: 0, left: -width! }}
          key={JSON.stringify(size)}
          className={style.innerDocContainer}
        >
          {doctorsList.map((doc: any, indx: number) => (
            <motion.div
              key={indx}
              whileTap={{ cursor: "grabbing" }}
              // style={{ visibility: i.icon === "" ? "hidden" }}
              className={style.sliderItm}
            >
              <div
                className={
                  style.doctorHomeCard +
                  " border d-flex flex-column p-3 row-gap-1"
                }
              >
                <div className="d-flex justify-content-between align-items-start">
                  <div className="d-flex col-gap-1">
                    <Image
                      src={doc.personal_info.profileUrl}
                      alt={doc.personal_info.firstName}
                      className={
                        style.docImg + ` ${doc.isOnline ? style.isOnline : ""}`
                      }
                      width={65}
                      height={65}
                    />
                    <span className="d-flex flex-column" style={{ rowGap: 5 }}>
                      <h4 className="capitalize">
                        {doc.personal_info.title +
                          ". " +
                          doc.personal_info.firstName +
                          " " +
                          doc.personal_info.lastName}
                      </h4>
                      <span>
                        <p>{doc.specialization}</p>
                        <p>
                          <FaStar style={{ color: "#FFC107" }} />
                          <FaStar style={{ color: "#FFC107" }} />
                          <FaStar style={{ color: "#FFC107" }} />
                          <FaStar style={{ color: "#FFC107" }} />
                          <FaStar style={{ color: "#FFC107" }} />
                          {`${doc?.rating?.averageRating}/5 (${
                            doc?.rating?.count + " reviews"
                          })`}
                        </p>
                      </span>
                    </span>
                  </div>
                  <Link
                    href={"/doctors/" + doc.Id}
                    className="link"
                    style={{
                      fontSize: "12px",
                      fontWeight: 500,
                      textDecoration: "underline",
                    }}
                  >
                    View Profile
                  </Link>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="text-primary font-bold text-2">
                    Fee Rs. {doc.videoCallCharges}
                  </p>
                  <Link
                    href={"/doctors/" + doc.Id + "/booked"}
                    className="linkBtn"
                    style={{ width: "60%", textAlign: "center" }}
                  >
                    Book Appointment
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
