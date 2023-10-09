import style from "../../styles/doctors.module.scss";
import { FaStar } from "react-icons/fa6";
import Image from "next/image";
export default function DoctorInfo({ doc }: { doc: any }) {
  console.log(doc);
  return (
    <div className={style.docInfo + " w-full border-bottom"}>
      <h2 className="mb-2">Book video consultation with the best doctors</h2>
      <div className="flex justify-between w-full">
        <div className="flex flex-col row-gap-1 w-full">
          <span className="flex col-gap-1">
            <div className={doc?.isOnline ? style.docOnline : ""}>
              <Image
                src={doc?.personal_info?.profileUrl}
                alt="doctor-image"
                className={style.docImg}
                width={65}
                height={65}
              />
            </div>
            <span className="flex flex-col" style={{ rowGap: "0.3rem" }}>
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
          <div className="flex col-gap-1 justify-between pb-1">
            <span className="flex flex-col items-center w-full row-gap-1 justify-center">
              <h5>{doc?.yearsOfExperience}</h5>
              <p>Experience</p>
            </span>
            <span
              className="flex flex-col items-center w-full border-left row-gap-1
              border-right justify-center"
            >
              <h5>{doc?.rating.recommended}%</h5>
              <p className="text-center">Positive feedback</p>
            </span>
            <span className="flex flex-col items-center w-full row-gap-1">
              <h5>{doc?.videoCallCharges}</h5>
              <p>Fee in PKR</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
