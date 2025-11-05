"use client";
import { useState } from "react";
import Image from "next/image";
import style from "../../styles/home.module.scss";
import { FaStar } from "react-icons/fa6";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Doctors({ doc, heading }: { doc: any; heading: string }) {
  const items = doc || [];
  const len = items.length || 0;
  const [center, setCenter] = useState<number>(1);

  const prev = () => setCenter((c) => (c - 1 + len) % len);
  const next = () => setCenter((c) => (c + 1) % len);

  // helper to get item by circular index
  const get = (i: number) => items[(i + len) % len];

  // show up to 3 cards; if less than 3, show them all
  const leftItem = len > 0 ? get(center - 1) : null;
  const centerItem = len > 0 ? get(center) : null;
  const rightItem = len > 0 ? get(center + 1) : null;

  return (
    <section style={{ width: "100%" }} className={style.docSection}>
      <h2 className="text-center">{heading}</h2>

      <div className={style.docCarousel}>
        <button aria-label="prev" className={style.arrowBtn} onClick={prev}>
          ‹
        </button>

        <div className={style.carouselRow}>
          <AnimatePresence initial={false} mode="popLayout">
            {leftItem && (
              <motion.div
                key={leftItem.Id}
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 0.96 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className={`${style.carouselCard} ${style.cardSide}`}
              >
                <DoctorCardSummary doc={leftItem} />
              </motion.div>
            )}

            {centerItem && (
              <motion.div
                key={centerItem.Id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.38 }}
                className={`${style.carouselCard} ${style.cardCenter}`}
              >
                <DoctorCardSummary doc={centerItem} highlighted />
              </motion.div>
            )}

            {rightItem && (
              <motion.div
                key={rightItem.Id}
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 0.96 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className={`${style.carouselCard} ${style.cardSide}`}
              >
                <DoctorCardSummary doc={rightItem} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button aria-label="next" className={style.arrowBtn} onClick={next}>
          ›
        </button>
      </div>

      <div className={style.carouselDots}>
        {items.map((_: any, i: number) => (
          <button
            key={i}
            className={i === center ? style.dotActive : style.dot}
            onClick={() => setCenter(i)}
            aria-label={`Go to ${i}`}
          />
        ))}
      </div>
    </section>
  );
}

function DoctorCardSummary({ doc, highlighted }: any) {
  return (
    <div className={"d-flex flex-column p-0"}>
      {/* image area */}
      <div className={highlighted ? style.cardImageCenter : style.cardImageSide}>
        <Image
          src={doc.personal_info.profileUrl}
          alt={doc.personal_info.firstName}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* bottom footer card contains details */}
      <div className={highlighted ? style.cardFooterCenter : style.cardFooterSide}>
        <div className={style.cardFooterInner}>
          <div style={{ width: "100%" }}>
            <div className="d-flex justify-content-between align-items-start">
              <h4 className={style.docHeading + " capitalize"} style={{ margin: 0 }}>
                {doc.personal_info.title + ". " + doc.personal_info.firstName}
              </h4>
              <div className={style.smallRating} style={{ marginLeft: 8 }}>
                <FaStar style={{ color: "#F5B400" }} /> {(Number(doc?.rating?.averageRating) || 0).toFixed(1)}
              </div>
            </div>
            <p className={style.docSpec} style={{ margin: "6px 0 8px 0" }}>
              {doc.specialization}
            </p>
            <p className={style.feeGreen} style={{ margin: "0 0 12px 0" }}>Rs {doc.videoCallCharges}</p>
            <Link
              href={'/doctors/' + doc.Id + '/booked'}
              className={highlighted ? style.greenBtn : style.greenBtnOutline}
            >
              {doc.specialization || "General Physician"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
