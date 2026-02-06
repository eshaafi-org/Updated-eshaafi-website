"use client";
import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/mind-wellness.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import DoctorGrid from "@/components/FindDoctors/DoctorGrid";
import { BASE_URL } from "@/helper/CONST";
import axios from "axios";
import { trackEvent } from "@/lib/ga";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  isOnline: boolean;
  [key: string]: any;
}

export default function MindWellnessPage({
  doctors = [],
}: {
  doctors?: Doctor[];
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!sessionStorage.getItem('mw_page_view_tracked')) {
      trackEvent('mw_page_view_clk', {
        section: 'page_load'
      });
      sessionStorage.setItem('mw_page_view_tracked', 'true');
    }
  }, [])
  const toolRefs = useRef<(HTMLElement | null)[]>([]);

  // Note: selectedCategory is managed by local state and URL navigation
  // The URL is now path-based (/mind-wellness/category) not query-based

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
    {
      icon: "/images/mind-icon1.svg",
      title: "Relationship Management",
      desc: "Marital Counseling, Family Therapy, Attachment Issues",
      category: "psychologist"
    },
    {
      icon: "/images/mind-icon2.svg",
      title: "Psychosis",
      desc: "Schizophrenia, Delusional Disorders, Hallucinations",
      category: "psychologist"
    },
    {
      icon: "/images/mind-icon3.svg",
      title: "Depression & Depressive",
      desc: "Major Depression, Dysthymia, Seasonal Affective Disorder",
      category: "counselor"
    },
    {
      icon: "/images/mind-icon4.svg",
      title: "Bipolar Affective Conditions",
      desc: "Mood Swings, Mania, Depression Cycles",
      category: "psychologist"
    },
    {
      icon: "/images/mind-icon5.svg",
      title: "Anger & Anxiety Conditions",
      desc: "GAD, Panic Disorder, Social Anxiety, Phobias",
      category: "counselor"
    },
    {
      icon: "/images/mind-icon6.svg",
      title: "Obsessive-Compulsive (OCD)",
      desc: "Compulsions, Intrusive Thoughts, ERP Therapy",
      category: "psychologist"
    },
    {
      icon: "/images/mind-icon7.svg",
      title: "Post-Traumatic Stress (PTSD)",
      desc: "Trauma Recovery, EMDR, Healing",
      category: "psychologist"
    },
    {
      icon: "/images/mind-icon8.svg",
      title: "Substance Use Conditions",
      desc: "Addiction Recovery, Harm Reduction, Support",
      category: "counselor"
    },
  ];

  const tools = [
    {
      icon: "/images/tool-icon1.svg",
      title: "Mindful Anchor",
      desc: "Guided breathwork and presence practices.",
    },
    {
      icon: "/images/tool-icon2.svg",
      title: "Ink Your Insight",
      desc: "Prompts for emotional decoding and clarity.",
    },
    {
      icon: "/images/tool-icon3.svg",
      title: "Relaxation Tools",
      desc: "Access meditation, breathing, and mindfulness exercises anytime.",
    },
  ];

  return (
    <>
      <Head>
        <title>Mind Wellness — eShaafi</title>
        <meta
          name="description"
          content="Mind Wellness — mental health programs and tools from eShaafi"
        />
      </Head>

      <main className={styles["mind-wellness-page"]}>
        {/* Hero Section */}
        <section className={styles["hero-section"]}>
          <div className={styles["hero-overlay"]} />
          <div className={styles["hero-content"]}>
            <h1 className={styles["hero-title"]}>
              Your Trusted Companion for <br /> Mind Wellness
            </h1>
            <Link href="https://eshaafi.sng.link/D5hwf/jn0r" target="_blank">
              <button 
                className={styles["cta-button"]}
                onClick={() => trackEvent('mw_hero_cta_clk', {
                  section: 'hero',
                  action: 'book_appointment',
                  category: 'mental_wellness'
                })}
              >
                Book an appointment
              </button>
            </Link>
          </div>
        </section>

        {/* Doctor Grid */}
        <section id="therapists-section" style={{ marginTop: -80 }}>
          {selectedCategory && (
            <div style={{ 
              padding: '16px 20px', 
              backgroundColor: '#e3f2fd', 
              borderRadius: '8px', 
              marginBottom: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              maxWidth: '1200px',
              margin: '0 auto 20px'
            }}>
              <span style={{ fontSize: '16px', color: '#1976d2', fontWeight: 500 }}>
                Showing {conditionCards.find(c => c.category === selectedCategory)?.title} Specialists
              </span>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  router.push('/mind-wellness', undefined, { shallow: true });
                }}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#1976d2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 500
                }}
              >
                Clear Filter
              </button>
            </div>
          )}
          <DoctorGrid 
            doctors={doctors} 
            onlyMentalHealth={true} 
            isLoading={isLoading}
            disableNavigation={true}
            activeCategory={selectedCategory || undefined}
            eventPrefix="mw_"
            onCategoryChange={(category) => {
              setSelectedCategory(category);
              if (category) {
                router.push(`/mind-wellness/${category}`, undefined, { shallow: true, scroll: false });
              } else {
                router.push('/mind-wellness', undefined, { shallow: true, scroll: false });
              }
            }}
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
              className={`${styles["condition-card"]} ${selectedCategory === c.category ? styles["condition-card-active"] : ''}`}
              onClick={() => {
                const newCategory = selectedCategory === c.category ? null : c.category;
                setSelectedCategory(newCategory);
                
                // Navigate to category page
                if (newCategory) {
                  router.push(`/mind-wellness/${newCategory}`, undefined, { scroll: false });
                } else {
                  router.push('/mind-wellness', undefined, { scroll: false });
                }
                
                trackEvent(`mw_${c.category.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')}_clk`, {
                  section: 'conditions',
                  condition_category: c.category,
                  condition_title: c.title
                });
                
                // Scroll to therapists section
                setTimeout(() => {
                  document.getElementById('therapists-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              role="button"
              tabIndex={0}
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
            <button 
              className={styles["view-all-button"]}
              onClick={() => trackEvent('mw_view_all_clk', {
                section: 'conditions',
                action: 'view_all_therapists'
              })}
            >
              View All Therapists & Specialists
            </button>
          </a>
        </div>

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
                onClick={() => trackEvent(`mw_${t.title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')}_clk`, {
                  section: 'tools',
                  tool_name: t.title,
                  tool_type: 'questionnaire'
                })}
                role="button"
                tabIndex={0}
              >
                <img
                  src={t.icon}
                  alt={t.title}
                  className={styles["tool-icon"]}
                />
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
              <p className={styles["video-subtitle"]}>
                We&apos;re Here For You, Whatever Life Brings.
              </p>
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
                onPlay={() => trackEvent('mw_mind_wellness_introduction_play_clk', {
                  section: 'mind_wellness',
                  video_title: 'Mind Wellness Introduction'
                })}
              ></iframe>
            </div>
          </div>
        </section>

        <section className={styles["bottom-cta"]} id="contact">
          <div className={styles["cta-text"]}>
            We&apos;re Here For You, Whatever Life Brings
          </div>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  // Fetch all doctors using the working endpoint
  const response = await fetch(BASE_URL + "/patients/doctors/filter", {
    cache: "no-cache",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "categroy",
    }),
  });

  const docData = await response.json();
  const allDoctors = docData.response?.Items || [];

  // Filter for psychologists and counselors only (exclude other therapists)
  const filteredDoctors = allDoctors.filter((doc: any) => {
    const specialty = doc.specialization?.toLowerCase().trim() || '';
    
    // Exclude non-mental health therapists
    const excludeKeywords = ['physio', 'speech', 'occupational', 'physical'];
    if (excludeKeywords.some(keyword => specialty.includes(keyword))) {
      return false;
    }
    
    // Only include psychologists and counselors
    return specialty.includes('psychologist') || 
           specialty.includes('counselor') || 
           specialty.includes('counsellor');
  });

  return {
    props: {
      doctors: filteredDoctors.sort((a: any, b: any) => {
        if (a.isOnline && !b.isOnline) return -1;
        if (!a.isOnline && b.isOnline) return 1;
        return 0;
      }),
    },
    revalidate: 1,
  };
}
