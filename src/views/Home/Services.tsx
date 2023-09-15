import Link from "next/link";
import Image from "next/image";
import service1 from "../../../public/images/services1.png";
import service2 from "../../../public/images/services2.png";
import service3 from "../../../public/images/services3.png";
import service4 from "../../../public/images/services4.png";
import service5 from "../../../public/images/services5.png";
import service6 from "../../../public/images/services6.png";
import style from "../../styles/home.module.scss";
const services = [
  {
    heading: "Instant Call",
    text: "Book appointment in one click",
    link: "/doctors",
    icon: service1,
  },
  {
    heading: "Video Consultation",
    text: "Schedule Call with doctors",
    link: "/doctors",
    icon: service2,
  },
  {
    heading: "Home Nursing",
    text: "Book home nursing services",
    link: "/",
    icon: service3,
  },
  // {
  //   heading: "Lab Tests",
  //   text: "Book lab tests and home sampling",
  //   link: "/",
  //   icon: service4,
  // },
  // {
  //   heading: "Pharmacy",
  //   text: "Receive medicines at your doorstep",
  //   link: "/",
  //   icon: service5,
  // },
  // {
  //   heading: "Medical Kit",
  //   text: "Lorem ipsum dolor sit amet, consectetur ",
  //   link: "/",
  //   icon: service6,
  // },
];
export default function Services() {
  return (
    <section className="w-full bg-white">
      <div className="container">
        <div className="flex flex-col row-gap-2 items-center">
          <h2>Our Services</h2>
          <ul className={style.servicesList}>
            {services.map((itm, indx) => (
              <li key={indx} className={style.serviceItm}>
                <div
                  className={` ${style.itemCont} ${
                    (indx + 1) % 2 ? "bg-blue" : "bg-lite"
                  } m-0-5 rounded `}
                >
                  <span className={style.serviceText}>
                    <span className="flex flex-col row-gap-1 ">
                      <h4>{itm.heading}</h4>
                      <p className="capitalize">{itm.text}</p>
                    </span>
                  </span>
                  <span className={style.serviceLink}>
                    {itm.heading !== "Home Nursing" ? (
                      <Link href={itm.link} className="linkBtn">
                        Book Now
                      </Link>
                    ) : (
                      <h3 className="text text-primary font-bolder">
                        Coming soon
                      </h3>
                    )}
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
