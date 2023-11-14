"use client";
import Button from "@/components/Button";
import Image from "next/image";
import heroImage from "/public/heroImage.svg";
import styles from "../../styles/home.module.scss";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-main w-100">
      <div className="container pb-0">
        <div className={styles.heroContainer}>
          <span className={styles.heroText}>
            <h2 className="pageHeading text-capitalize">
              Stress free access <br /> to quality healthcare{" "}
            </h2>
            <p className="mainHeadingText capitalize">
              Book Appointment with best Verified Doctors
            </p>
            <Link href={"/doctors"} className="linkBtn self-start">
              book now
            </Link>
          </span>
          <span className="sm-w-full flex justify-end">
            <Image
              className={styles.heroImage}
              src={heroImage}
              alt="eshaafi-doctor-image"
              unoptimized
            />
          </span>
        </div>
      </div>
    </section>
  );
}
