import { MdOutlineDoneAll } from "react-icons/md";
import Image from "next/image";
import working from "../../../public/images/working.png";
import download from "/public/images/download-badge-google-play-badge.png";
import Link from "next/link";
import style from "../../styles/home.module.scss";
export default function Working() {
  return (
    <section className="w-full bg-white">
      <div className="container sm-pt-0">
        <div className="flex justify-between items-center sm-flex-col sm-row-gap-1">
          <div className="flex flex-col row-gap-0-5">
            <span className="flex flex-col row-gap-0-5 mb-2">
              <h3>How it works?</h3>
              <h2>Booking Appointment</h2>
            </span>
            <ul className="flex flex-col row-gap-1">
              <li className="flex col-gap-1">
                <MdOutlineDoneAll
                  style={{ color: "#0e5487", fontSize: "1.5rem" }}
                />
                <p className="capitalize">Book video consultation</p>
              </li>
              <li className="flex col-gap-1">
                <MdOutlineDoneAll
                  style={{ color: "#0e5487", fontSize: "1.5rem" }}
                />
                <p className="capitalize">Select Doctor</p>
              </li>
              <li className="flex col-gap-1">
                <MdOutlineDoneAll
                  style={{ color: "#0e5487", fontSize: "1.5rem" }}
                />
                <p className="capitalize">Select Date and Payment Method</p>
              </li>
              <li className="flex col-gap-1">
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
          <span>
            <Image
              src={working}
              alt="working"
              style={{ width: "100%", height: "auto" }}
              className={style.sectionImage}
            />
          </span>
        </div>
      </div>
    </section>
  );
}
