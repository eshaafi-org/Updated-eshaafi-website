"use client";
import React, { useState, useEffect } from "react";
import styles from "../../styles/homepage.module.scss";
import Link from "next/link";

import Navbar from "@/views/Header/Navbar";
// import Schedule from "@/Component/Schedule/schedule";
// import Medicalsection from "@/Component/Medicalsection/medicalsection";
// import Healcarecards from "@/Component/Healthcarecards/healthcarecards";
// import LogoLoop from "@/Component/LogoLoop/logoloop";
// import Imagesection from "@/Component/Imagesection/imagesection";

export default function HomePage() {
  const [currentImage, setCurrentImage] = useState(0);

  const leftImage = "/images/hero1.png";
  const rightImages = [
    "/images/hero2.png",
    "/images/hero3.png",
    "/images/hero4.png",
    "/images/hero5.png",
    "/images/hero6.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % rightImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.homePage}>
      <Navbar />

      <div className={styles.heroSection}>
  {/* Left Image */}
  <div className={styles.heroLeft}>
    <img src={leftImage} alt="Healthcare professional" />
  </div>

  {/* Right Image Slider */}
  <div className={styles.heroRight}>
    {rightImages.map((image, index) => (
      <div
        key={index}
        style={{
          opacity: index === currentImage ? 1 : 0,
          transition: "opacity 1s ease-in-out",
          position: "absolute",
          inset: 0,
        }}
      >
        <img src={image} alt={`Healthcare ${index + 1}`} />
      </div>
    ))}
  </div>

  {/* 🟩 Black Gradient Overlay */}
  <div className={styles.heroGradient}></div>

  {/* Text and Button Overlay */}
  <div className={styles.heroOverlay}>
    <div>
      <h1>
        Connecting You to Care, 
        <br />
        Anytime. Anywhere
      </h1>
      {/* <button>Talk to a Doctor</button> */}
      <button 
className={styles.heroButton}>        
  <Link href="https://eshaafi.sng.link/D5hwf/jn0r">
    Talk to a Doctor
  </Link>
</button>
    </div>
  </div>



        {/* Image Indicators */}
        {/* <div className={styles.heroIndicators}>
          {rightImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={index === currentImage ? styles.active : ""}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
}
