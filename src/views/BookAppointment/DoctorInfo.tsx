import style from "../../styles/doctors.module.scss";
import { FaStar } from "react-icons/fa6";
import Image from "next/image";

export default function DoctorInfo({ doc }: { doc: any }) {
  return (
    <div className={style.docInfo + " w-100 border-bottom pb-4 mb-4"}>
      <div className="d-flex justify-between w-100">
        <div className="d-flex flex-column row-gap-1 w-100">
          <span className="d-flex col-gap-1 align-items-center">
            <div
              className={`${style.imageContainer} ${
                doc?.isOnline ? style.docOnline : ""
              }`}
            >
              <Image
                src={doc?.personal_info?.profileUrl}
                alt="doctor-image"
                className={style.docImg}
                width={65}
                height={65}
              />
            </div>
            <span className="d-flex flex-column">
              <h5 className={style.docTitle}>
                {doc?.personal_info?.title +
                  ". " +
                  doc?.personal_info?.firstName +
                  " " +
                  doc?.personal_info?.lastName}
              </h5>
              <p className={style.docSpecialization}>{doc?.specialization}</p>
              <p className={style.docSpecialization}>
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
            <span className="d-flex flex-column align-items-center justify-content-center">
              <h5 className={style.docSecSubHeading}>
                {doc?.yearsOfExperience}
              </h5>
              <p className={style.docSecDes}>Experience</p>
            </span>
            <span className="d-flex flex-column align-items-center justify-content-around border-start border-end w-40">
              <h5 className={style.docSecSubHeading}>
                {doc?.rating.recommended}%
              </h5>
              <p className={style.docSecDes}>Positive feedback</p>
            </span>
            <span className="d-flex flex-column align-items-center justify-content-around">
              <h5 className={style.docSecSubHeading}>
                {doc?.videoCallCharges}
              </h5>
              <p className={style.docSecDes}>Fee in PKR</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
