"use client";

import React from "react";
import styles from "../../styles/healthlibrary.module.scss";

const PreventiveCare: React.FC = () => {
  const articles = [
    {
      image: "/images/pc1.png",
      title: "Healthy Habits for Preventive Care",
      readTime: "3 mins read",
      author: "Jenny Wilson",
      authorImage: "/images/Ellipse.png",
    },
    {
      image: "/images/pc2.png",
      title: "Vaccinations You Shouldn't Miss",
      readTime: "2 mins read",
      author: "Jacob Jones",
      authorImage: "/images/Ellipse.png",
    },
    {
      image: "/images/pc3.png",
      title: "How Regular Checkups Save Lives",
      readTime: "4 mins read",
      author: "Courtney Henry",
      authorImage: "/images/Ellipse.png",
    },
  ];

  return (
    <section className={styles.preventiveCareSection}>
      <div className={styles.container}>
        {/* Preventive Care Header */}
        <div className={styles.categorySection}>
          <div className={styles.categoryHeader}>
            <div className={styles.categoryTitle}>
              <div className={styles.categoryIcon}>
                  <img src="/images/health-filled.svg" alt="Healthcare Icon" />
              </div>
              <div>
                <h3>Preventive Care</h3>
                <p>Take steps today to protect your tomorrow.</p>
              </div>
            </div>
            <button className={styles.viewAllBtn}>
              View all <span>›</span>
            </button>
          </div>

          {/* Articles Grid */}
          <div className={styles.articlesGrid}>
            {articles.map((article, index) => (
              <div key={index} className={styles.articleCard}>
                <div className={styles.articleImage}>
                  <img src={article.image} alt={article.title} />
                </div>
                <div className={styles.articleContent}>
                  <h4>{article.title}</h4>
                  <div className={styles.articleMeta}>
                    <span className={styles.readTime}>{article.readTime}</span>
                    <div className={styles.authorInfo}>
                      <img src={article.authorImage} alt={article.author} />
                      <span>{article.author}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreventiveCare;
