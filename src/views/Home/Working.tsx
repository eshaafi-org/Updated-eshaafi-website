import { MdOutlineDoneAll } from "react-icons/md";
import Image from "next/image";
import working from "/public/images/working.png";

import style from "../../styles/home.module.scss";
import Stores from "./Stores";
export default function Working() {
  return (
    <section className="w-100 bg-white">
      <div className="container sm-pt-0">
        <div className={style.workingContainer}>
          <div className="flex flex-col row-gap-0-5">
            <span className="flex flex-col row-gap-0-5 mb-2">
              <h3>How it works?</h3>
              <h2>Booking Appointment</h2>
            </span>
            <ul className="d-flex flex-column row-gap-1 mt-3">
              <li className="d-flex col-gap-1">
                <MdOutlineDoneAll
                  style={{ color: "#0e5487", fontSize: "1.5rem" }}
                />
                <p className="capitalize">Book video consultation</p>
              </li>
              <li className="d-flex col-gap-1">
                <MdOutlineDoneAll
                  style={{ color: "#0e5487", fontSize: "1.5rem" }}
                />
                <p className="capitalize">Select Doctor</p>
              </li>
              <li className="d-flex col-gap-1">
                <MdOutlineDoneAll
                  style={{ color: "#0e5487", fontSize: "1.5rem" }}
                />
                <p className="capitalize">Select Date and Payment Method</p>
              </li>
              <li className="d-flex col-gap-1">
                <MdOutlineDoneAll
                  style={{ color: "#0e5487", fontSize: "1.5rem" }}
                />
                <p className="capitalize">Appointment Successfully Booked</p>
              </li>
              <li>
                <Stores />
              </li>
            </ul>
          </div>
          <span className={style.workingImg}>
            <Image
              src={working}
              alt="working"
              className={style.workingImage}
              unoptimized
              width={1000}
              height={1000}
            />
          </span>
        </div>
      </div>
    </section>
  );
}
