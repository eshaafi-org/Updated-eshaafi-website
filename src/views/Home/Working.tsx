import { MdOutlineDoneAll } from "react-icons/md";
import Image from "next/image";
import working from "../../../public/images/working.png";
import download from "/public/images/download-badge-google-play-badge.png";
import Link from "next/link";
export default function Working() {
  return (
    <section className="w-full bg-white">
      <div className="container">
        <div className="flex justify-between items-center sm-flex-col sm-row-gap-1">
          <div className="flex flex-col row-gap-2">
            <span className="flex flex-col row-gap-1">
              <h3>How it works?</h3>
              <h2>Booking Appointment</h2>
            </span>
            <ul className="flex flex-col row-gap-1">
              <li className="flex col-gap-1">
                <MdOutlineDoneAll
                  style={{ color: "#0e5487", fontSize: "1.5rem" }}
                />
                <p>Book video consultation</p>
              </li>
              <li className="flex col-gap-1">
                <MdOutlineDoneAll
                  style={{ color: "#0e5487", fontSize: "1.5rem" }}
                />
                <p>Select Doctor</p>
              </li>
              <li className="flex col-gap-1">
                <MdOutlineDoneAll
                  style={{ color: "#0e5487", fontSize: "1.5rem" }}
                />
                <p>Select Date and Payment Method</p>
              </li>
              <li className="flex col-gap-1">
                <MdOutlineDoneAll
                  style={{ color: "#0e5487", fontSize: "1.5rem" }}
                />
                <p>Successfully Book Appointment</p>
              </li>
              <li className="flex col-gap-1">
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
            />
          </span>
        </div>
      </div>
    </section>
  );
}
