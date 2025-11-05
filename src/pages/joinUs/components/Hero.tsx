"use client";
import React, { useEffect, useRef } from "react";
import styles from "../../../styles/joinus.module.scss";
import Link from "next/link";
const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
  }, []);

  return (
    <section className={styles.heroSection}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className={styles.heroVideo}
      >
        <source src="/images/video.mp4" type="video/mp4" />
      </video>

      <div className={styles.overlay}></div>

      <div className={styles.textContainer}>
        <h1>
          Join us and let’s live a life that will be remembered, not just lived
        </h1>
        {/* <button>See Open Roles</button> */}
        {/* <Link href="/open-roles" passHref>
  <button className={styles.openRolesBtn}>
    See Open Roles
  </button>
</Link> */}

        <button
          className={styles.openRolesBtn}
          onClick={() => {
            const element = document.getElementById("current-openings");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          See Open Roles
        </button>
      </div>
    </section>
  );
};

export default Hero;
