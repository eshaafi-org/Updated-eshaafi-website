import Link from "next/link";
import Image from "next/image";
import feature1 from "../../../public/images/feature1.png";
import feature2 from "../../../public/images/feature2.png";
import feature3 from "../../../public/images/feature3.png";
import style from "../../styles/home.module.scss";
const features = [
  {
    heading: "E-prescription",
    text: "Receive a digital prescription on every appointment",
    link: "/",
    icon: feature1,
  },
  {
    heading: "Medical Records",
    text: "Manage and share All your medical Records ",
    link: "/",
    icon: feature2,
  },
  {
    heading: "Health Tracker",
    text: "Track Your Health Progress ",
    link: "/",
    icon: feature3,
  },
];
export default function Features() {
  return (
    <section className="w-full bg-white">
      <div className="container">
        <div className="flex flex-col row-gap-2 items-center">
          <h2>Unique Features</h2>

          <ul className={style.servicesList}>
            {features.map((itm, indx) => (
              <li key={indx} className={style.serviceItm}>
                <div
                  className={` ${style.itemCont} m-0-5 rounded `}
                  style={{ background: "#f2f2f2" }}
                >
                  <span className={style.serviceText}>
                    <span className="flex flex-col row-gap-0-5 ">
                      <h4>{itm.heading}</h4>
                      <p className="capitalize">{itm.text}</p>
                    </span>
                  </span>
                  <span className={style.serviceLink}>
                    <Link href={itm.link} className="linkBtn">
                      Book Now
                    </Link>
                  </span>
                  <span className={style.servicesImage}>
                    <Image
                      src={itm.icon}
                      alt={itm.text}
                      className={style.servicesImg}
                    />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
