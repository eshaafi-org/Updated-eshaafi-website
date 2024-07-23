// "use client";
// import styles from "@/styles/home.module.scss";
// import Image from "next/image";
// import partner1 from "/public/images/partner1.png";
// import partner2 from "/public/images/partner2.png";
// import partner3 from "/public/images/partner3.png";
// import partner4 from "/public/images/partner4.png";
// import partner5 from "/public/images/partner5.png";
// import partner6 from "/public/images/partner6.png";
// import partner7 from "/public/images/partner7.png";
// import partner8 from "/public/images/partner8.png";
// import partner9 from "/public/images/partner9.png";
// import partner10 from "/public/images/partner10.png";
// import partner11 from "/public/images/partner11.png";
// import partner12 from "/public/images/partner12.png";
// import partner13 from "/public/images/partner13.png";
// import useMeasure from "react-use-measure";
// import { useMotionValue, animate, motion } from "framer-motion";
// import { useEffect, useState } from "react";
// //
// const partners = [
//   { icon: partner1, },
//   { icon: partner2, },
//   { icon: partner3, },
//   { icon: partner4, },
//   { icon: partner5, },
//   { icon: partner6, },
//   { icon: partner7, },
//   { icon: partner8, },
//   { icon: partner9, },
//   { icon: partner10, },
//   { icon: partner11, },
//   { icon: partner12, },
//   { icon: partner13, },
// ];
// //
// export default function Partners() {
//   let [ref, { width }] = useMeasure();
//   const xTransition = useMotionValue(0);
//   useEffect(() => {
//     let finalPosition = -(width + 32);
//     let controls: any;
//     controls = animate(xTransition, [0, finalPosition], {
//       ease: "linear",
//       duration: 55,
//       repeat: Infinity,
//       repeatType: "loop",
//       repeatDelay: 0,
//     });
//     return () => {
//       controls.stop();
//     };
//   }, [xTransition, width]);
//   return (
//     <section className="w-100 bg-white p-4 mb-5" style={{ overflowX: "hidden" }}>
//       {/* <div className="container sm-pt-0"> */}
//       <div
//         className="d-flex flex-column align-items-center"
//         style={{
//           overflowX: "hidden",
//         }}
//       >
//         <h2 className="pb-4">Corporate Partners</h2>
//         <motion.ul className={styles.partnersList} style={{ x: xTransition }}>
//           <div className={styles.partnerAnimiList} ref={ref}>
//             {[...partners].map((itm, indx) => (
//               <li key={indx} className={styles.partnetItem}>
//                 <Image src={itm.icon} alt="partner" />
//               </li>
//             ))}
//           </div>
//           <div className={styles.partnerAnimiList}>
//             {[...partners].map((itm, indx) => (
//               <li key={indx} className={styles.partnetItem}>
//                 <Image src={itm.icon} alt="partner" />
//               </li>
//             ))}
//           </div>
//         </motion.ul>
//       </div>
//       {/* </div> */}
//     </section>
//   );
// } 
"use client";
import styles from "@/styles/home.module.scss";
import Image from "next/image";
import partner1 from "/public/images/partner1.png";
import partner2 from "/public/images/partner2.png";
import partner3 from "/public/images/partner3.png";
import partner4 from "/public/images/partner4.png";
import partner5 from "/public/images/partner5.png";
import partner6 from "/public/images/partner6.png";
import partner7 from "/public/images/partner7.png";
import partner8 from "/public/images/partner8.png";
import partner9 from "/public/images/partner9.png";
import partner10 from "/public/images/partner10.png";
import partner11 from "/public/images/partner11.png";
import partner12 from "/public/images/partner12.png";
import partner13 from "/public/images/partner13.png";
import useMeasure from "react-use-measure";
import { useMotionValue, animate, motion } from "framer-motion";
import { useEffect } from "react";

const partners = [
  { icon: partner1 },
  { icon: partner2 },
  { icon: partner3 },
  { icon: partner4 },
  { icon: partner5 },
  { icon: partner6 },
  { icon: partner7 },
  { icon: partner8 },
  { icon: partner9 },
  { icon: partner10 },
  { icon: partner11 },
  { icon: partner12 },
  { icon: partner13 },
];

export default function Partners() {
  const [ref, { width }] = useMeasure();
  const xTransition = useMotionValue(0);

  useEffect(() => {
    const handleLoad = () => {
      let finalPosition = -(width + 32);
      const controls : any  = animate(xTransition, [0, finalPosition], {
        ease: "linear",
        duration: 55,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      });

      return () => {
        controls.stop();
      };
    };

    if (typeof window !== "undefined" && document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => {
        window.removeEventListener("load", handleLoad);
      };
    }
  }, [xTransition, width]);

  return (
    <section className="w-100 bg-white p-4 mb-5" style={{ overflowX: "hidden" }}>
      <div className="d-flex flex-column align-items-center" style={{ overflowX: "hidden" }}>
        <h2 className="pb-4">Corporate Partners</h2>
        <motion.ul className={styles.partnersList} style={{ x: xTransition }}>
          <div className={styles.partnerAnimiList} ref={ref}>
            {partners.map((itm, indx) => (
              <li key={indx} className={styles.partnerItem}>
                <Image src={itm.icon} alt="partner" />
              </li>
            ))}
          </div>
          <div className={styles.partnerAnimiList}>
            {partners.map((itm, indx) => (
              <li key={indx} className={styles.partnerItem}>
                <Image src={itm.icon} alt="partner" />
              </li>
            ))}
          </div>
        </motion.ul>
      </div>
    </section>
  );
}
