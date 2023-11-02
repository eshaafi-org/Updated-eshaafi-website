import { MdOutlineDoneAll } from "react-icons/md";
import Image from "next/image";
import working from "../../../public/images/working.svg";
import download from "/public/images/download-badge-google-play-badge.svg";
import Link from "next/link";
import style from "../../styles/home.module.scss";
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
              <li className="flex col-gap-1 mt-1">
                <Link
                  href={
                    "https://play.google.com/store/apps/details?id=com.eshaafi.patient.consultation&pcampaignid=web_share"
                  }
                >
                  <Image src={download} alt="eshaafi-download" />
                </Link>
              </li>
            </ul>
          </div>
          <span className={style.workingImg}>
            <Image src={working} alt="working" className={style.workingImage} />
          </span>
        </div>
      </div>
    </section>
  );
}
