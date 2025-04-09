"use client";
import Link from "next/link";
import Image from "next/image";
import service1 from "../../../public/images/services1.png";
import service2 from "../../../public/images/services2.png";
import service3 from "../../../public/images/service3.png";
import service4 from "../../../public/images/services4.png";
import service5 from "../../../public/images/services5.png";
import service6 from "../../../public/images/services6.png";
import style from "../../styles/home.module.scss";
import { useState } from "react";

const services = [
  {
    heading: "Video Consultation",
    text: "Schedule Call with doctors",
    link: "/doctors",
    icon: service2,
  },
  {
    heading: "Labs Tests",
    text: "Get Up to 20% Off on Lab Tests with Free Home Sampling!",
    link: "/",
    icon: service3,
  },
];

export default function Services() {
  const [isCalled, setIsCalled] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCallNowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent page reload
    setIsCalled(true);
  };

  const handleCopyPhoneNumber = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default behavior
    const phoneNumber = "03111151161";
    navigator.clipboard.writeText(phoneNumber).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset copy state after 2 seconds
    });
  };

  const buttonStyle = {
    transition: "opacity 0.3s ease-in-out",
    opacity: isCalled ? 0 : 1,
  };

  const phoneNumberStyle = {
    opacity: isCalled ? 1 : 0,
    transform: isCalled ? "translateY(0)" : "translateY(-20px)",
    transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
  };

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
                  className={`${style.itemCont} ${
                    (indx + 1) % 2 ? "bg-blue" : "bg-lite"
                  }`}
                >
                  <span className={style.serviceText}>
                    <h4 className="cardHeading">{itm.heading}</h4>
                    <p className="cardDescription text-capitalize">
                      {itm.text}
                    </p>
                  </span>
                  {indx === 0 ? (
                    <span className={style.serviceLink}>
                      <Link href={itm.link} className="linkBtn">
                        Book Now
                      </Link>
                    </span>
                  ) : (
                    <span className={style.serviceLink}>
                      {isCalled ? (
                        <span style={phoneNumberStyle}>
                          <>
                            <button
                              onClick={handleCopyPhoneNumber}
                              className="copyBtn linkBtn"
                            >
                              {isCopied ? "Copied!" : "03 111 151 161"}
                            </button>
                          </>
                        </span>
                      ) : (
                        <span
                          onClick={handleCallNowClick}
                          style={buttonStyle}
                          className="linkBtn"
                        >
                          Call Now
                        </span>
                      )}
                    </span>
                  )}
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
