"use client";
import Image from "next/image";
import styles from "../../styles/home.module.scss";
import Link from "next/link";

export default function Hero({ img, heading, text, link }: any) {
  return (
    <section className="bg-main w-100">
      <div className="container pb-0">
        <div className={styles.heroContainer}>
          <span className={styles.heroText}>
            <h2 className="pageHeading text-capitalize">{heading}</h2>
            <p className="mainHeadingText text-capitalize">{text}</p>
            {link.name && (
              <Link href={link.link} className="linkBtn self-start">
                {link.name}
              </Link>
            )}
          </span>
          <span className="sm-w-full flex justify-end">
            <Image
              className={styles.heroImage}
              src={img}
              alt="eshaafi-doctor-image"
              unoptimized
            />
          </span>
        </div>
      </div>
    </section>
  );
}
