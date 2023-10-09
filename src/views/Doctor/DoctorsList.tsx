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
      <div className="d-flex col-gap-1 align-items-star mt-5">
        <ul className={style.docList}>
          {list.map((itm: any, indx: string) => (
            <li
              key={indx}
              className={`${style.docCard} p-1 flex flex-col row-gap-1`}
            >
              <div className="flex justify-between">
                <div className="flex col-gap-1">
                  <Image
                    src={itm.personal_info.profileUrl}
                    alt="doctor-image"
                    className={style.docImg}
                    width={91}
                    height={91}
                  />
                  <span>
                    <h5 className="capitalize">
                      {" "}
                      {itm.personal_info.title +
                        ". " +
                        itm.personal_info.firstName +
                        " " +
                        itm.personal_info.lastName}
                    </h5>
                    <p>{itm.specialization}</p>
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
                <p className="text-primary font-bold text-2">
                  Fee Rs.{itm.videoCallCharges}
                </p>
              </div>
              <div className="flex col-gap-1 justify-between">
                <span className="flex flex-col items-center w-full row-gap-1">
                  <h5 className="text-2">{itm.yearsOfExperience} years</h5>
                  <p>Experience</p>
                </span>
                <span className="flex flex-col items-center w-full border-left border-right row-gap-1">
                  <h5 className="text-2">
                    <FaStar style={{ color: "#FFC107" }} />
                    {itm?.rating?.averageRating}/5
                  </h5>
                  <p>{itm?.rating?.count} Reviews</p>
                </span>
                <span className="flex flex-col items-center w-full row-gap-1">
                  <h5 className="text-2">{itm.recommended}%</h5>
                  <p>Positive feedback</p>
                </span>
              </div>
              <div className="flex justify-between col-gap-1 sm-flex-col sm-row-gap-1">
                <Link href={"/doctors/" + itm.Id} className="w-1-2 sm-w-full">
                  <Button variant="outlined" className="w-full">
                    view profile
                  </Button>
                </Link>
                <Link
                  href={"/doctors/" + itm.Id + "/booked"}
                  className="w-1-2 sm-w-full"
                >
                  <Button variant="contained" className="w-full">
                    book appointment
                  </Button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
        <div className="filters w-30 ">
          <div className="bg-main rounded border w-full p-1">
            Specializaitons
          </div>
        </div>
      </div>
    </section>
  );
}
