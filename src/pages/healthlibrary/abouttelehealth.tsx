"use client";

import React from "react";
import styles from "../../styles/healthlibrary.module.scss";

const AboutTelehealth: React.FC = () => {
  const articles = [
    {
      image: "/images/at1.png",
      title: "How Telehealth is Changing Healthcare",
      readTime: "3 mins read",
      author: "Courtney Henry",
      authorImage: "/images/Ellipse.png",
    },
    {
      image: "/images/at2.png",
      title: "Benefits of Virtual Consultations",
      readTime: "2 mins read",
      author: "Esther Howard",
      authorImage: "/images/Ellipse.png",
    },
    {
      image: "/images/at3.png",
      title: "Telemedicine: The Future of Care",
      readTime: "4 mins read",
      author: "Jerome Bell",
      authorImage: "/images/Ellipse.png",
    },
  ];

  return (
    <section className={styles.aboutTelehealthSection}>
      <div className={styles.container}>
        {/* About Telehealth Header */}
        <div className={styles.categorySection}>
          <div className={styles.categoryHeader}>
            <div className={styles.categoryTitle}>
              <div className={styles.categoryIcon}>
                <img src="/images/laptop.svg" alt="Telehealth Icon" />
              </div>
              <div>
                <h3>About Telehealth</h3>
                <p>Bringing quality healthcare to your screen.</p>
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

export default AboutTelehealth;
