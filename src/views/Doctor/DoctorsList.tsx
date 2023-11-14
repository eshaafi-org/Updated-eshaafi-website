import style from "../../styles/doctors.module.scss";
import Button from "@/components/Button";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import Image from "next/image";
//

//
export default function DoctorList({ list }: { list: any }) {
  return (
    <section className="container border-bottom ">
      <h2>Book video consultation with the best doctors</h2>
      <div className="d-flex col-gap-1 align-items-star mt-5 sm-mt-1">
        <ul className={style.docList}>
          {list.map((itm: any, indx: string) => (
            <li
              key={indx}
              className={`${style.docCard} d-flex flex-column row-gap-1`}
            >
              {/* introduction card */}
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <Image
                    src={itm.personal_info.profileUrl}
                    alt="doctor-image"
                    className={style.docImg}
                    width={100}
                    height={100}
                  />
                  <span>
                    <h5 className={style.docTitle}>
                      {" "}
                      {itm.personal_info.title +
                        ". " +
                        itm.personal_info.firstName +
                        " " +
                        itm.personal_info.lastName}
                    </h5>
                    <p className={style.docSpecialization}>
                      {itm.specialization}
                    </p>
                    {itm.isOnline && (
                      <div className={style.onlineindicator}>
                        <div className={style.onlinecircle}>
                          <div className={style.innercircle}></div>
                        </div>
                        <span className={style.onlinetext}>Online</span>
                      </div>
                    )}
                  </span>
                </div>
                <p className={style.docFee}>Fee Rs.{itm.videoCallCharges}</p>
              </div>
              {/* experience card */}
              <div className={style.docExperience}>
                <span className="d-flex flex-column align-items-center ">
                  <h5 className={style.experienceHeading}>
                    {itm.yearsOfExperience} years
                  </h5>
                  <p className={style.experienceText}>Experience</p>
                </span>

                <span className="d-flex flex-column align-items-center w-100  border-end border-start">
                  <h5 className={style.experienceHeading}>
                    <FaStar style={{ color: "#FFC107" }} />
                    {itm?.rating?.averageRating}/5
                  </h5>
                  <p className={style.experienceText}>
                    {itm?.rating?.count} Reviews
                  </p>
                </span>

                <span className="d-flex flex-column align-items-center ">
                  <h5 className={style.experienceHeading}>
                    {itm.recommended}%
                  </h5>
                  <p className={style.experienceText}>Positive feedback</p>
                </span>
              </div>
              {/* action button  */}
              <div className="d-flex justify-content-between col-gap-1">
                <Link
                  href={"/doctors/" + itm.Id}
                  className="linkBtn w-50 bg-white text-primary text-center"
                >
                  view profile
                </Link>
                <Link
                  href={"/doctors/" + itm.Id + "/booked"}
                  className="linkBtn w-50 text-center"
                >
                  book appointment
                </Link>
              </div>
            </li>
          ))}
        </ul>
        {/* <div className="filters w-30 ">
          <div className="bg-main rounded border w-full p-1">
            Specializaitons
          </div>
        </div> */}
      </div>
    </section>
  );
}
