"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/mind-wellness.module.scss";
import Link from "next/link";
import DoctorGrid from "@/components/FindDoctors/DoctorGrid";
import { fetchAndSortDoctors, DoctorQueryPresets, filterMentalHealthSpecialists } from "@/helper/doctorApi";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  isOnline: boolean;
  [key: string]: any;
}

export default function MindWellnessPage({ doctors = [] }: { doctors?: Doctor[] }) {
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const toolRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeSpecialty, setActiveSpecialty] = useState("All Specialists");

  // Derive specialties from fetched doctors (all unique ones)
  const specialties = useMemo(() => {
    const mentalHealthKeywords = [
      "psychiatrist",
      "psychologist",
      "clinical psychologist",
      "counselor",
      "counsellor",
      "therapist",
      "psychotherapist",
    ];

    const set = new Set<string>();
    doctors.forEach((doc: any) => {
      const spec = String(doc.specialization || "").trim();
      if (spec) {
        set.add(spec);
      }
    });

    return [
      "All Specialists",
      ...Array.from(set)
        .sort((a, b) => a.localeCompare(b)),
    ];
  }, [doctors]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles["animate-show"]);
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((ref) => ref && obs.observe(ref));
    toolRefs.current.forEach((ref) => ref && obs.observe(ref));

    return () => {
      cardRefs.current.forEach((ref) => ref && obs.unobserve(ref));
      toolRefs.current.forEach((ref) => ref && obs.unobserve(ref));
    };
  }, []);

  const conditionCards = [
    { icon: "/images/mind-icon1.svg", title: "Relationship Management", desc: "Marital Counseling, Family Therapy, Attachment Issues" },
    { icon: "/images/mind-icon2.svg", title: "Psychosis", desc: "Schizophrenia, Delusional Disorders, Hallucinations" },
    { icon: "/images/mind-icon3.svg", title: "Depression & Depressive", desc: "Major Depression, Dysthymia, Seasonal Affective Disorder" },
    { icon: "/images/mind-icon4.svg", title: "Bipolar Affective Conditions", desc: "Mood Swings, Mania, Depression Cycles" },
    { icon: "/images/mind-icon5.svg", title: "Anger & Anxiety Conditions", desc: "GAD, Panic Disorder, Social Anxiety, Phobias" },
    { icon: "/images/mind-icon6.svg", title: "Obsessive-Compulsive (OCD)", desc: "Compulsions, Intrusive Thoughts, ERP Therapy" },
    { icon: "/images/mind-icon7.svg", title: "Post-Traumatic Stress (PTSD)", desc: "Trauma Recovery, EMDR, Healing" },
    { icon: "/images/mind-icon8.svg", title: "Substance Use Conditions", desc: "Addiction Recovery, Harm Reduction, Support" },
  ];

  const tools = [
    { icon: "/images/tool-icon1.svg", title: "Mindful Anchor", desc: "Guided breathwork and presence practices." },
    { icon: "/images/tool-icon2.svg", title: "Ink Your Insight", desc: "Prompts for emotional decoding and clarity." },
    { icon: "/images/tool-icon3.svg", title: "Relaxation Tools", desc: "Access meditation, breathing, and mindfulness exercises anytime." },
  ];

  return (
    <>
      <Head>
        <title>Mind Wellness — eShaafi</title>
        <meta name="description" content="Mind Wellness — mental health programs and tools from eShaafi" />
      </Head>

      <main className={styles["mind-wellness-page"]}>
        {/* Hero Section */}
        <section className={styles["hero-section"]}>
  <div className={styles["hero-overlay"]} />
  <div className={styles["hero-content"]}>
    <h1 className={styles["hero-title"]}>
      Your Trusted Companion for <br /> Mind Wellness
    </h1>
    <Link 
  href="https://eshaafi.sng.link/D5hwf/jn0r" 
  target="_blank"
>
  <button className={styles["cta-button"]}>Book an appointment</button>
</Link>

    {/* <button className={styles["cta-button"]}>Book an appointment</button> */}
  </div>
</section>


        {/* Doctor Grid */}
        <section id="therapists-section" style={{ marginTop: -80 }}>
          {/* Specialty Filter Buttons */}
          <div style={{ padding: "0 1rem 2rem", maxWidth: "1240px", margin: "0 auto" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
              {specialties.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => setActiveSpecialty(specialty)}
                  style={{
                    padding: "0.75rem 1.5rem",
                    borderRadius: "25px",
                    border: activeSpecialty === specialty ? "none" : "2px solid #0e5487",
                    backgroundColor: activeSpecialty === specialty ? "#0e5487" : "transparent",
                    color: activeSpecialty === specialty ? "white" : "#0e5487",
                    cursor: "pointer",
                    fontWeight: activeSpecialty === specialty ? "600" : "500",
                    fontSize: "0.95rem",
                    transition: "all 0.3s ease",
                  }}
                >
                  {specialty}
                </button>
              ))}
            </div>
          </div>

          {/* Filtered Doctor Grid */}
          <DoctorGrid 
            showAllSpecialties={true}
            doctors={
              activeSpecialty === "All Specialists"
                ? doctors
                : doctors.filter((doc: any) =>
                    String(doc.specialization || "")
                      .toLowerCase()
                      .includes(activeSpecialty.toLowerCase())
                  )
            }
          />
        </section>

        {/* Conditions Section */}
        <section className={styles["conditions-section"]}>
          <h2 className={styles["section-title"]}>
            <span className={styles.blue}>Conditions</span>{" "}
            <span className={styles.gray}>We Treat</span>
          </h2>
          <p className={styles["section-subtitle"]}>
            Comprehensive care for your mental and emotional well-being.
          </p>
        </section>

        <section className={styles["condition-cards"]}>
          {conditionCards.map((c, i) => (
            <article
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className={styles["condition-card"]}
            >
              <div className={styles["condition-icon"]}>
                <img src={c.icon} alt={c.title} />
              </div>
              <div className={styles["condition-content"]}>
                <h3 className={styles["condition-title"]}>{c.title}</h3>
                <p className={styles["condition-description"]}>{c.desc}</p>
              </div>
            </article>
          ))}
        </section>
        
        <div className={styles["view-all-wrapper"]}>
  <a href="#therapists-section">
    <button className={styles["view-all-button"]}>View All Therapists & Specialists</button>
  </a>
</div>

        {/* <div className={styles["view-all-wrapper"]}>
          <button className={styles["view-all-button"]}>View All Therapists & Specialists</button>
        </div> */}

        {/* Tools & Questionnaires */}
        <section className={styles["tools-section"]}>
          <h2 className={styles["tools-title"]}>
            <span className={styles.blue}>Tools and</span>{" "}
            <span className={styles.gray}> Questionnaires</span>
          </h2>
          <div className={styles["tools-grid"]}>
            {tools.map((t, i) => (
              <div
                key={i}
                ref={(el) => (toolRefs.current[i] = el)}
                className={styles["tool-card"]}
              >
                <img src={t.icon} alt={t.title} className={styles["tool-icon"]} />
                <h4 className={styles["tool-title"]}>{t.title}</h4>
                <p className={styles["tool-description"]}>{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Video Section */}
        <section className={styles["video-section"]}>
          <div className={styles["video-container"]}>
            <div className={styles["video-content"]}>
              <h3 className={styles["video-title"]}>
                <span className={styles.blue}>
                  Why Mind Wellness Matters: <br /> Hear From Our Expert
                </span>
              </h3>
              <p className={styles["video-subtitle"]}>We&apos;re Here For You, Whatever Life Brings.</p>
            </div>
            <div className={styles["video-thumbnail"]}>
              
             <iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/QhEGVe9Jhmk?si=fgeOB9vFCkbi6Si-"
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerPolicy="strict-origin-when-cross-origin"
  allowFullScreen
></iframe>
          </div>
          </div>
        </section>

        <section className={styles["bottom-cta"]} id="contact">
          <div className={styles["cta-text"]}>We&apos;re Here For You, Whatever Life Brings</div>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  /**
   * Fetch all doctors and filter for mental-health specialists client-side
   * This ensures we capture all psychiatrists, psychologists, counselors, therapists
   */
  const allDoctors = await fetchAndSortDoctors(
    DoctorQueryPresets.allDoctors()
  );

  // Filter to only mental-health specialists
  const mentalHealthDoctors = filterMentalHealthSpecialists(allDoctors);

  return {
    props: {
      doctors: mentalHealthDoctors,
    },
    revalidate: 1,
  };
}
