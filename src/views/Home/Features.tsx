import Link from "next/link";
import Image from "next/image";
import feature1 from "../../../public/images/feature1.png";
import feature2 from "../../../public/images/feature2.png";
import feature3 from "../../../public/images/feature3.png";
import style from "../../styles/home.module.scss";
const features = [
//   {
//     heading: "E-prescription",
//     text: "Receive a digital prescription on every appointment",
//     link: "/",
//     icon: feature1,
//   },
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
    <section className="w-100 bg-white">
      <div className="container sm-pt-0">
        <div className={style.servicesContainer}>
          <h2>Unique Features</h2>
          <ul className={style.featureList}>
            {features.map((itm, indx) => (
              <li key={indx} className={style.featureItm}>
                <div className={style.featureItemCont}>
                  <span className={style.featureText}>
                    <span className="d-flex flex-column row-gap-0-5 ">
                      <h4 className="cardHeading">{itm.heading}</h4>
                      <p className="cardDescription text-capitalize">
                        {itm.text}
                      </p>
                    </span>
                  </span>
                  {/* <span className={style.serviceLink}>
                    <Link href={itm.link} className="linkBtn">
                      Book Now
                    </Link>
                  </span> */}
                  <span className={style.featureImage}>
                    <Image
                      src={itm.icon}
                      alt={itm.text}
                      className={style.featureImg}
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
