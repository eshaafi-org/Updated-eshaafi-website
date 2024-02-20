"use client";
import styles from "@/styles/home.module.scss";
import Image from "next/image";
import partner1 from "/public/images/partner1.png";
import partner2 from "/public/images/partner2.png";
import partner3 from "/public/images/partner3.png";
import partner4 from "/public/images/partner4.png";
import useMeasure from "react-use-measure";
import { useMotionValue, animate, motion } from "framer-motion";
import { useEffect, useState } from "react";
//
const partners = [
  {
    icon: partner4,
  },
  {
    icon: partner3,
  },
  {
    icon: partner2,
  },
  {
    icon: partner1,
  },
];
//
export default function Partners() {
  let [ref, { width }] = useMeasure();
  const xTransition = useMotionValue(0);
  useEffect(() => {
    let finalPosition = -(width + 32);
    let controls: any;
    controls = animate(xTransition, [0, finalPosition], {
      ease: "linear",
      duration: 8,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    });
    return () => {
      controls.stop();
    };
  }, [xTransition, width]);
  return (
    <section className="w-100 bg-white" style={{ overflowX: "hidden" }}>
      {/* <div className="container sm-pt-0"> */}
      <div
        className="d-flex flex-column align-items-center"
        style={{
          overflowX: "hidden",
        }}
      >
        <h2 className="">Corporate Partners</h2>
        <motion.ul className={styles.partnersList} style={{ x: xTransition }}>
          <div className={styles.partnerAnimiList} ref={ref}>
            {[...partners].map((itm, indx) => (
              <li key={indx} className={styles.partnetItem}>
                <Image src={itm.icon} alt="partner" />
              </li>
            ))}
          </div>
          <div className={styles.partnerAnimiList}>
            {[...partners].map((itm, indx) => (
              <li key={indx} className={styles.partnetItem}>
                <Image src={itm.icon} alt="partner" />
              </li>
            ))}
          </div>
        </motion.ul>
      </div>
      {/* </div> */}
    </section>
  );
}
