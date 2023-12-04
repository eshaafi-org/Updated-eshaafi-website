import style from "@/styles/aboutus.module.scss";
import Image from "next/image";
import aboutEmpathy from "../../../public/images/aboutEmpathy.svg";
import aboutStar from "../../../public/images/aboutStars.svg";
import aboutIdea from "../../../public/images/aboutIdea.svg";
import aboutRes from "../../../public/images/aboutRes.svg";
//
const values = [
  {
    icon: aboutStar,
    heading: "omplete commitment to excellence",
    letter: "C",
    text: `Providing the best healthcare services to patients throughout Pakistan.`,
  },
  {
    icon: aboutIdea,
    heading: "dvanced and Agile",
    letter: "A",
    text: `Using Agile methodology for enhanced user convenience and accessibility.`,
  },
  {
    icon: aboutRes,
    heading: "esponsibility",
    letter: "R",
    text: `Every team member embracing the success and impact of eShaafi.`,
  },
  {
    icon: aboutEmpathy,
    heading: "mpathy",
    letter: "E",
    text: `Infusing empathy into eShaafi and addressing user concerns with care.`,
  },
];
export default function Values() {
  return (
    <div className="container">
      <div className={style.valuesContainer}>
        <div className={style.valuesText}>
          <h3>Our Values</h3>
          <h2>Values Representing eShaafi</h2>
        </div>
        <ul className={style.valuesList}>
          {values.map((itm, indx) => (
            <li key={indx} className={style.valueItem}>
              <Image
                src={itm.icon}
                alt="eshaafi-about-us-doctor-consultations"
              />
              <div className={style.itemDetail}>
                <h6>
                  <span>{itm.letter}</span>
                  {itm.heading}
                </h6>
                <p>{itm.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
