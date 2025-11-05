"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import styles from "./ExpertCareSection.module.scss";

interface Card {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function ExpertCareSection() {
  const cards: Card[] = [
    {
      id: 1,
      title: "Book Your Doctor",
      description:
        "Instant access to general physicians and on-demand appointments with certified specialists.",
      image: "/images/doctors.png",
      link: "/find-doctors",
    },
    {
      id: 2,
      title: "Mind Wellness",
      description:
        "Confidential counseling and therapy sessions along with self care resources.",
      image: "/images/wellness.png",
      link: "/mind-wellness",
    },
    {
      id: 3,
      title: "Diagnostics",
      description:
        "Avail discounted lab tests and access to home sample collection.",
      image: "/images/diagnostics.png",
      link: "/labs",
    },
    {
      id: 4,
      title: "Medicines",
      description:
        "Convenient access to discounted medicines at your doorstep.",
      image: "/images/medicines.png",
      link: "/",
    },
    {
      id: 5,
      title: "Corporate Plans",
      description:
        "Tailored health solutions for organizations boosting employee well-being and productivity.",
      image: "/images/corporate.png",
      link: "/partnerwithus",
    },
    {
      id: 6,
      title: "Tele-health Units",
      description:
        "Quality healthcare for rural/remote areas through THUs.",
      image: "/images/tele-health.png",
      link: "/thus",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const autoplayDelay = 3000;

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % cards.length);
  }, [cards.length]);

  useEffect(() => {
    if (!isPaused) {
      autoplayIntervalRef.current = setInterval(goToNext, autoplayDelay);
    }
    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [isPaused, goToNext, autoplayDelay]);

  const changeSlide = (newIndex: number) => {
    const newSafeIndex = (newIndex + cards.length) % cards.length;
    setActiveIndex(newSafeIndex);
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
    if (!isPaused) {
      autoplayIntervalRef.current = setInterval(goToNext, autoplayDelay);
    }
  };

  const handlePrev = () => {
    changeSlide(activeIndex - 1);
  };

  const handleNext = () => {
    changeSlide(activeIndex + 1);
  };

  const handleCardClick = (index: number) => {
    changeSlide(index);
  };

  return (
    <section
      className={styles.expertCareSection}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 10px",
        }}
      >
        <div className={styles.sectionHeader}>
          <h2>
           Your Health. <span className={styles.coloredText}>Our Expertise.</span> Uncompromised!
          </h2>

        </div>

        <div className={styles.cardsContainer}>
          {cards.map((card, index) => {
            let offset = index - activeIndex;
            if (offset > cards.length / 2) offset -= cards.length;
            else if (offset < -cards.length / 2) offset += cards.length;

            const isVisible = Math.abs(offset) <= 1;

            return (
              <div
                key={card.id}
                className={styles.card}
                style={{
                  transform: `translateX(${offset * 87}%) scale(${
                    offset === 0 ? 1 : 0.8
                  })`,
                  filter: offset === 0 ? "none" : "blur(1.5px) brightness(0.85)",
                  zIndex: cards.length - Math.abs(offset),
                  opacity: isVisible ? 1 : 0,
                }}
                onClick={(e) => {
                  e.preventDefault();
                  if (offset === 0) {
                    // Only navigate if card is active (center position)
                    window.location.href = card.link;
                  } else {
                    // Carousel behavior for inactive cards
                    handleCardClick(index);
                  }
                }}
              >
                <div
                  className={`${styles.cardContent} ${offset === 0 ? styles.active : styles.inactive}`}
                >
                  <div className={styles.cardImage}>
                    <img
                      src={card.image}
                      alt={card.title}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src =
                          "https://placehold.co/400x300/87D2FF/ffffff?text=" +
                          encodeURIComponent(card.title);
                      }}
                    />
                  </div>
                  <div className={styles.cardText}>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.controls}>
          <button
            onClick={handlePrev}
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={handleNext}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
