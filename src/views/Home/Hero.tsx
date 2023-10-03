"use client";
import Button from "@/components/Button";
import Image from "next/image";
import heroImage from "/public/heroImage.png";
import styles from "../../styles/home.module.scss";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-main w-full" style={{ background: "#EDF6FE" }}>
      <div className="container pb-0">
        <div className="flex sm-flex-col justify-around items-center sm-row-gap-2">
          <span className="flex flex-col row-gap-0-5 items-start w-1-2 sm-w-full">
            <h2 className="heading capitalize">
              Stress free access <br /> to quality healthcare{" "}
            </h2>
            <p className="text-3 capitalize">
              Book Appointment with best Verified Doctors
            </p>
            <Link href={"/doctors"}>
              <Button variant="contained" className="font-bolder mt-1">
                book now
              </Button>
            </Link>
          </span>
          <span className="w-1-2 sm-w-full flex justify-end">
            <Image
              className={styles.heroImage}
              src={heroImage}
              alt="eshaafi-doctor-image"
            />
          </span>
        </div>
      </div>
    </section>
  );
}
