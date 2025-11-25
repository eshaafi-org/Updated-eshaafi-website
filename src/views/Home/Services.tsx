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
  // {
  //   heading: "Instant Call",
  //   text: "Book appointment in one click",
  //   link: "/doctors",
  //   icon: service1,
  // },
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
        <div className={style.servicesContainer}>
          <h2>Our Services</h2>
          <ul className={style.servicesList}>
            {services.map((itm, indx) => (
              <li key={indx} className={style.serviceItm}>
                <Link
                  href={itm.heading === "Instant Call" ? "/" : itm.link}
                  className={` ${style.itemCont} ${
                    (indx + 1) % 2 ? "bg-blue" : "bg-lite"
                  }`}
                >
                  <span className={style.serviceText}>
                    <h4 className="cardHeading">{itm.heading}</h4>
                    <p className="cardDescription text-capitalize">
                      {itm.text}
                    </p>
                  </span>
                  <span className={style.serviceLink}>
                    {itm.heading === "Home Nursing" ||
                    itm.heading === "Instant Call" ? (
                      <Link href={"/"} className="fw-bold cardHeading">
                        Coming Soon
                      </Link>
                    ) : (
                      <Link href={itm.link} className="linkBtn">
                        Book Now
                      </Link>
                    )}
                  </span>
                  <span className={style.servicesImage}>
                    <Image
                      src={itm.icon}
                      alt={itm.text}
                      className={style.servicesImg}
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
