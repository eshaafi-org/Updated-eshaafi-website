"use client";

import React from "react";
import styles from "../../styles/healthlibrary.module.scss";

const EverydayHealth: React.FC = () => {
  const articles = [
    {
      image: "/images/eh1.png",
      title: "Daily Habits for a Stronger Body",
      readTime: "3 mins read",
      author: "Brooklyn Simmons",
      authorImage: "/images/Ellipse.png",
    },
    {
      image: "/images/eh2.png",
      title: "Simple Steps to Stay Hydrated",
      readTime: "2 mins read",
      author: "Cameron Williamson",
      authorImage: "/images/Ellipse.png",
    },
    {
      image: "/images/eh3.png",
      title: "Balancing Work and Health",
      readTime: "4 mins read",
      author: "Savannah Nguyen",
      authorImage: "/images/Ellipse.png",
    },
  ];

  return (
    <section className={styles.everydayHealthSection}>
      <div className={styles.container}>
        {/* Everyday Health Header */}
        <div className={styles.categorySection}>
          <div className={styles.categoryHeader}>
            <div className={styles.categoryTitle}>
              <div className={styles.categoryIcon}>
                    <img src="/images/apple-filled.svg" alt="Everyday Icon" />
              </div>
              <div>
                <h3>Everyday Health</h3>
                <p>Small daily actions, big lifelong benefits.</p>
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

export default EverydayHealth;
