// "use client";
import { MdOutlineDoneAll } from "react-icons/md";
import style from "../../styles/doctors.module.scss";
// import { useRef, useEffect } from "react";
const benifits = [
  {
    heading: "Connect With Doctors 24/7",
    text: "Our in house doctors are available 24/7. You can book appointment with any online doctor anytime.",
  },
  {
    heading: "Quality Healthcare",
    text: "Now receive quality healthcare from comfort of your home and connect with the best doctors.",
  },
  {
    heading: "Complete Family Healthcare",
    text: "Add in your family members profiles to book their appointment in a one stop solution ato your healthcare problems with eShaafi.",
  },
  {
    heading: "Hassel Free Online Payment",
    text: "Avoid payment hassles and use online payment methods like Jazzcash for video consultations in only Rs.300.",
  },
  {
    heading: "Free Follow Up appointment",
    text: "Our doctors can book you a free follow up on multiple appointments.",
  },
  {
    heading: "Receive e-Prescription ",
    text: "Embace the future and receive e-prescription after every appointment. No more having a hard time understanding your prescription",
  },
];
export default function BenefitsOfVideoConsultation() {
  // const svgRef = useRef(null);
  // useEffect(() => {
  //   console.log(svgRef.current);
  // }, []);

  return (
    <section className="container">
      <h2>Benefits of Video Consultation</h2>
      <ul className={"border rounded p-3 mt-3 " + style.benifitCont}>
        {benifits.map((itm, indx) => (
          <li key={indx}>
            <div className={style.benefitItemCont}>
              <MdOutlineDoneAll className={style.checkIcon} />
              <span className="flex flex-col row-gap-1 sm-row-gap-0-5">
                <h4>{itm.heading}</h4>
                <p>{itm.text}</p>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

