import React from "react";
import { footerLinks, socialLinks, supportsList } from "./helper";
import Link from "next/link";
import styles from "./Footer.module.scss";
import Image from "next/image";
import downloadButton from "../../../public/images/download-badge-google-play-badge.svg";

// links

// Define the props type for the Footer component
type FooterProps = {};

// Define the Footer component
const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles.footerCont + " " + "container"}>
        <div className={styles.linksCont}>
          <div
            className={styles.intro + " " + "d-flex row-gap-0-5 flex-column"}
          >
            <h2 className={"text-primary"}>eShaafi</h2>
            <p className="line-height-1">
              Book video appointment with our in house doctors anytime and
              receive e-prescription every consultation.
            </p>
            <h4 className="mt-3">Follow Us</h4>
            <ul className="d-flex col-gap-1 flex-wrap">
              {socialLinks.map((item, indx) => (
                <li key={indx}>
                  <a
                    href={item.link}
                    className="text-primary"
                    style={{ fontSize: "2rem" }}
                    target="_blank"
                  >
                    {item.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {footerLinks.map((item, index) => (
            <ul
              key={index}
              className="d-flex flex-column row-gap-1 sm-row-gap-0-5"
            >
              <h4>{item.heading}</h4>
              {item.links.map((link, indx) => (
                <li key={indx}>
                  <Link href={link.href} className="text-main">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
          <div className={`d-flex flex-column row-gap-1 ${styles.downloads}`}>
            <h4>Download App</h4>
            <Link href="https://play.google.com/store/apps/details?id=com.eshaafi.patient.consultation&pcampaignid=web_share">
              <Image
                src={downloadButton}
                className={styles.downloadImage}
                alt="eshaafi-app-download"
              />
            </Link>
          </div>
        </div>
        <ul
          className={`d-flex col-gap-1 bg-white w-100 justify-content-between my-2 py-4 border-bottom flex-wrap sm-flex-col `}
        >
          {supportsList.map((itm, indx) => (
            <li
              key={indx}
              className={`d-flex col-gap-1 align-items-center  py-1`}
            >
              <Image src={itm.icon} width={40} height={40} alt={itm.text} />
              <p className="fw-bold text-main">{itm.text}</p>
            </li>
          ))}
        </ul>
        <p className={styles.copyrights}>
          © 2023 All Rights Reserved eShaafi.com
        </p>
      </section>
    </footer>
  );
};

export default Footer;
