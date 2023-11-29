import style from "@/styles/aboutus.module.scss";
import aboutWorking1 from "../../../public/images/aboutWorking1.png";
import aboutWorking2 from "../../../public/images/aboutWorking2.png";
import aboutWorking3 from "../../../public/images/aboutWorking3.png";
import Image from "next/image";
const steps = [
  {
    icon: aboutWorking1,
    heading: "Create an account",
    text: `Sign up for free & access
all features on our app`,
  },
  {
    icon: aboutWorking2,
    heading: "Book Appointment",
    text: `Search doctors and book appointment instantly`,
  },
  {
    icon: aboutWorking3,
    heading: "Enjoy a healthly life",
    text: `eShaafi cares for your health,
and is always with you`,
  },
];
export default function Working() {
  return (
    <div className="container">
      <div className={style.workingContainer}>
        <div className={style.workingText}>
          <h3>Our Team</h3>
          <h2>{`How it Works?`}</h2>
        </div>
        <ul className={style.workingSteps}>
          {steps.map((itm, indx) => (
            <li
              key={indx}
              className={style.step}
              style={{ flexDirection: indx % 2 === 0 ? "row" : "row-reverse" }}
            >
              <div className={style.stepImg}>
                <Image src={itm.icon} alt="working-step-eshaafi" />
              </div>
              <div className={style.stepBorder}>
                <p>Step</p>
                <span>{`0${indx + 1}`}</span>
              </div>
              <span>
                <h5 className="mb-2">{itm.heading}</h5>
                <p>{itm.text}</p>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
