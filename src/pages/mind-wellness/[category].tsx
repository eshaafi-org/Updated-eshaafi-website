import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from "@/styles/mind-wellness.module.scss";
import Link from "next/link";
import DoctorGrid from "@/components/FindDoctors/DoctorGrid";
import { BASE_URL } from "@/helper/CONST";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from 'next'
import { trackEvent } from "@/lib/ga";
import { SkeletonLoader } from '@/components/SkeletonLoader';

interface CategoryPageProps {
  doctors: any[]
  initialCategory?: string
}

const MindWellnessCategoryPage: React.FC<CategoryPageProps> = ({ doctors, initialCategory }) => {
  const router = useRouter()
  const { category } = router.query
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory || null)
  const [isLoading, setIsLoading] = useState(true)
  const [doctorsWithSlots, setDoctorsWithSlots] = useState<any[]>([])
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const toolRefs = useRef<(HTMLElement | null)[]>([])

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
      category: "psychiatrist"
    },
    {
      icon: "/images/mind-icon3.svg",
      title: "Depression & Depressive",
      desc: "Major Depression, Dysthymia, Seasonal Affective Disorder",
      category: "psychiatrist"
    },
    {
      icon: "/images/mind-icon4.svg",
      title: "Bipolar Affective Conditions",
      desc: "Mood Swings, Mania, Depression Cycles",
      category: "psychiatrist"
    },
    {
      icon: "/images/mind-icon5.svg",
      title: "Anger & Anxiety Conditions",
      desc: "GAD, Panic Disorder, Social Anxiety, Phobias",
      category: "mental-health"
    },
    {
      icon: "/images/mind-icon6.svg",
      title: "Obsessive-Compulsive (OCD)",
      desc: "Compulsions, Intrusive Thoughts, ERP Therapy",
      category: "psychiatrist"
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
      category: "psychiatrist"
    },
  ]

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
  ]

  useEffect(() => {
    if (router.isReady && category) {
      setSelectedCategory(category as string)
    }
  }, [router.isReady, category])

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

  // Fetch availability slots for all doctors
  useEffect(() => {
    const fetchAvailabilitySlots = async () => {
      if (doctors && doctors.length > 0) {
        const doctorsWithAvailability = await Promise.all(
          doctors.map(async (doctor) => {
            try {
              const response = await axios.post(
                `${BASE_URL}/patients/doctor/appointmentSlots`,
                {
                  doctorId: doctor.Id,
                  medium: 'Video',
                }
              )
              return {
                ...doctor,
                availabilitySlots: response.data.response?.Items || [],
              }
            } catch (error) {
              return {
                ...doctor,
                availabilitySlots: [],
              }
            }
          })
        )
        setDoctorsWithSlots(doctorsWithAvailability)
        setIsLoading(false)
      }
    }

    const timer = setTimeout(() => {
      fetchAvailabilitySlots()
    }, 500)
    
    return () => clearTimeout(timer)
  }, [doctors])

  // Show loading state while page is being generated
  if (!router.isReady) {
    return <div><SkeletonLoader/></div>
  }

  const categoryTitles: { [key: string]: string } = {
    'psychiatrist': 'Psychiatrists',
    'psychologist': 'Psychologists',
    'counselor': 'Counselors & Therapists',
    '': 'All Mental Health Doctors',
    null: 'All Mental Health Doctors'
  }

  const categoryTitle = categoryTitles[selectedCategory as string] || categoryTitles[''] || 'Mental Health Specialists'

  return (
    <>
      <Head>
        <title>{categoryTitle} - Mind Wellness - eShaafi</title>
        <meta name="description" content={`Book video consultation with the best ${categoryTitle.toLowerCase()}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
              <button className={styles["cta-button"]}>
                Book an appointment
              </button>
            </Link>
          </div>
        </section>

        {/* Category Banner */}
        <section style={{ marginTop: -80, marginBottom: 20 }}>
          <div style={{ 
            padding: '20px', 
            backgroundColor: '#f0f7ff', 
            borderRadius: '8px', 
            textAlign: 'center',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <h2 style={{ 
              margin: 0, 
              fontSize: '24px', 
              color: '#1976d2',
              fontWeight: 600
            }}>
              {categoryTitle}
            </h2>
          </div>
        </section>

        {/* Doctor Grid */}
        <section id="therapists-section">
          <DoctorGrid 
            doctors={doctorsWithSlots} 
            onlyMentalHealth={true} 
            isLoading={isLoading}
            activeCategory={selectedCategory || undefined}
            disableNavigation={true}
            eventPrefix="mw_"
            onCategoryChange={(newCategory) => {
              if (newCategory) {
                router.push(`/mind-wellness/${newCategory}`, undefined, { shallow: true, scroll: false })
              } else {
                router.push('/mind-wellness', undefined, { shallow: true, scroll: false })
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
                
                if (newCategory) {
                  router.push(`/mind-wellness/${newCategory}`, undefined, { shallow: true, scroll: false });
                } else {
                  router.push('/mind-wellness', undefined, { shallow: true, scroll: false });
                }
                
                trackEvent('mw_category_condition_clk', {
                  section: 'conditions',
                  condition_category: c.category,
                  condition_title: c.title,
                  page_category: category
                });
                
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
              onClick={() => trackEvent('mw_category_view_all_clk', {
                section: 'conditions',
                action: 'view_all_therapists',
                category: category
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
                onClick={() => trackEvent('mw_category_tool_clk', {
                  section: 'tools',
                  tool_name: t.title,
                  tool_type: 'questionnaire',
                  page_category: category
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
                onPlay={() => trackEvent('mw_category_video_play_clk', {
                  section: 'mind_wellness',
                  video_title: 'Mind Wellness Introduction',
                  category: category
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
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const response = await fetch(BASE_URL + "/patients/doctors/filter", {
      cache: "no-cache",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "categroy",
      }),
    })

    const docData = await response.json()
    const allDoctors = docData.response?.Items || []

    // Extract unique mental health categories from doctors
    const mentalHealthSpecialties = [
      'psychiatrist', 'psychologist', 'clinical psychologist',
      'counselor', 'counsellor', 'therapist', 'mentor', 'mental health'
    ]

    const uniqueCategories = new Set<string>()
    allDoctors.forEach((doctor: any) => {
      const specialty = doctor.specialization?.toLowerCase().trim() || ''
      if (specialty.includes('psychiatrist')) uniqueCategories.add('psychiatrist')
      if (specialty.includes('psychologist')) uniqueCategories.add('psychologist')
      if (specialty.includes('counselor') || specialty.includes('counsellor')) uniqueCategories.add('counselor')
      if (specialty.includes('therapist')) uniqueCategories.add('therapist')
      if (specialty.includes('mental health')) uniqueCategories.add('mental-health')
    })

    const paths = Array.from(uniqueCategories).map(category => ({
      params: { category }
    }))

    return {
      paths: paths.length > 0 ? paths : [
        { params: { category: 'psychiatrist' } },
        { params: { category: 'psychologist' } },
        { params: { category: 'counselor' } }
      ],
      fallback: 'blocking'
    }
  } catch (error) {
    console.error('Error fetching categories for mind-wellness:', error)
    
    return {
      paths: [
        { params: { category: 'psychiatrist' } },
        { params: { category: 'psychologist' } },
        { params: { category: 'counselor' } }
      ],
      fallback: 'blocking'
    }
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { category } = context.params || {}
  
  try {
    // Fetch all mental health doctors
    const response = await fetch(BASE_URL + "/patients/doctors/filter", {
      cache: "no-cache",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "categroy",
      }),
    })

    const docData = await response.json()
    const allDoctors = docData.response?.Items || []

    // Filter for all mental health specialists
    const mentalHealthSpecialties = [
      'psychiatrist', 'psychologist', 'clinical psychologist',
      'counselor', 'counsellor', 'therapist', 'mentor', 'mental health'
    ]

    const filteredDoctors = allDoctors.filter((doc: any) => {
      const specialty = doc.specialization?.toLowerCase().trim() || ''
      return mentalHealthSpecialties.some(s => specialty.includes(s))
    })

    // Sort doctors with online status first
    const sortedDoctors = filteredDoctors.sort((a: any, b: any) => {
      if (a.isOnline && !b.isOnline) return -1
      if (!a.isOnline && b.isOnline) return 1
      return 0
    })

    return {
      props: {
        doctors: sortedDoctors,
        initialCategory: category || null,
      },
      revalidate: 60
    }
  } catch (error) {
    console.error('Error fetching doctors:', error)
    
    return {
      props: {
        doctors: [],
        initialCategory: category || null,
      },
      revalidate: 60
    }
  }
}

export default MindWellnessCategoryPage
