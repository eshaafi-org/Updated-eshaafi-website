import style from "../../styles/doctors.module.scss";
import { FaStar } from "react-icons/fa6";
import Image from "next/image";
import AddressBar from "@/components/AddressBar";
// links
let links = [
  { name: "Home", link: "/" },
  { name: "Doctors", link: "/doctors" },
];
export default function DoctorInfo({ doc }: { doc: any }) {
  console.log(doc);
  return (
    <div className={style.docInfo + " w-100 border-bottom"}>
      <span>
        <h2 className="mb-2">Book video consultation with the best doctors</h2>
        <AddressBar links={links} />
      </span>

      <div className="d-flex justify-between w-100">
        <div className="d-flex flex-column row-gap-1 w-100">
          <span className="d-flex col-gap-1">
            <div className={doc?.isOnline ? style.docOnline : ""}>
              <Image
                src={doc?.personal_info?.profileUrl}
                alt="doctor-image"
                className={style.docImg}
                width={65}
                height={65}
              />
            </div>
            <span className="d-flex flex-column">
              <h5>
                {doc?.personal_info?.title +
                  ". " +
                  doc?.personal_info?.firstName +
                  " " +
                  doc?.personal_info?.lastName}
              </h5>
              <p>{doc?.specialization}</p>
              <p>
                <FaStar style={{ color: "#FFC107" }} />
                <FaStar style={{ color: "#FFC107" }} />
                <FaStar style={{ color: "#FFC107" }} />
                <FaStar style={{ color: "#FFC107" }} />
                <FaStar style={{ color: "#FFC107" }} />
                {` ${doc?.rating?.averageRating}/5 (${
                  doc?.rating?.count + " reviews"
                })`}
              </p>
            </span>
          </span>
          <div className="d-flex col-gap-1 justify-content-around pb-1">
            <span className="d-flex flex-column align-items-center justify-content-around">
              <h5>{doc?.yearsOfExperience}</h5>
              <p>Experience</p>
            </span>
            <span className="d-flex flex-column align-items-center justify-content-around">
              <h5>{doc?.rating.recommended}%</h5>
              <p className="text-center">Positive feedback</p>
            </span>
            <span className="d-flex flex-column align-items-center justify-content-around">
              <h5>{doc?.videoCallCharges}</h5>
              <p>Fee in PKR</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
