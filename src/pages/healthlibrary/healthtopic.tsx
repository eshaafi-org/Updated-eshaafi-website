"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "../../styles/healthlibrary.module.scss";
import { trackEvent } from "@/lib/ga";

const HealthTopics: React.FC<{ categories?: any[] }> = ({ categories }) => {
  const [activeCategory, setActiveCategory] = useState("All Topics");

  const defaultCategories = [
    "All Topics",
    "Mind Wellness",
    "Preventive Care",
    "Everyday Health",
    "About Telehealth",
  ];

  const defaultArticles = [
    {
      image: "/images/mw1.png",
      title: "Managing anxiety in Daily life",
      readTime: "2 mins read",
      author: "Jenny Wilson",
      authorImage: "/images/Ellipse.png",
    },
    {
      image: "/images/mw2.png",
      title: "Managing anxiety in Daily life",
      readTime: "2 mins read",
      author: "Jenny Wilson",
      authorImage: "/images/Ellipse.png",
    },
    {
      image: "/images/mw3.png",
      title: "Managing anxiety in Daily life",
      readTime: "2 mins read",
      author: "Jenny Wilson",
      authorImage: "/images/Ellipse.png",
    },
  ];

  const iconList = ["/images/brain-purple.svg", "/images/health-filled.svg", "/images/apple-filled.svg", "/images/laptop.svg"];

  const cats = categories ? categories.map(c => c.name) : defaultCategories;
  const allCats = ["All Topics", ...cats];

  const renderSections = () => {
    if (categories) {
      return categories.map((item, indx) => {
        const icon = iconList[indx % iconList.length];
        return (
          <div key={indx} className={styles.categorySection}>
            <div className={styles.categoryHeader}>
              <div className={styles.categoryTitle}>
                <div className={styles.categoryIcon}>
                  <img src={icon} alt={item.name} />
                </div>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
              <Link href={`/blog/category/${item.name.replace(/\s/g, "")}`} className={styles.viewAllBtn}
                onClick={() => trackEvent('blog_category_view_clk', {
                  section: 'health_topics',
                  category: item.name
                })}
              >
                View all <span>›</span>
              </Link>
            </div>

            {/* Articles Grid */}
            <div className={styles.articlesGrid}>
              {item.blogs.slice(0, 3).map((blog: any, index: number) => (
                <Link 
                  key={index} 
                  href={`/blog/${blog.name}`} 
                  className={styles.articleCard}
                  onClick={() => trackEvent('blog_view_clk', {
                    section: 'health_topics',
                    blog_title: blog.title,
                    category: item.name,
                    position: `category_card_${index + 1}`
                  })}
                >
                  <div className={styles.articleImage}>
                    <img src={blog.url} alt={blog.title} />
                  </div>
                  <div className={styles.articleContent}>
                    <h4>{blog.title}</h4>
                    <div className={styles.articleMeta}>
                      <span className={styles.readTime}>5 min read</span>
                      <div className={styles.authorInfo}>
                        <img src="/images/Ellipse.png" alt="Author" />
                        <span>Author</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      });
    } else {
      return (
        <div className={styles.categorySection}>
          <div className={styles.categoryHeader}>
            <div className={styles.categoryTitle}>
              <div className={styles.categoryIcon}>
                 <img src="/images/brain-purple.svg" alt="healthtopic Icon" />
              </div>
              <div>
                <h3>Mind Wellness</h3>
                <p>Nurture your thoughts, nourish your peace.</p>
              </div>
            </div>
            <button className={styles.viewAllBtn}>
              View all <span>›</span>
            </button>
          </div>

          {/* Articles Grid */}
          <div className={styles.articlesGrid}>
            {defaultArticles.map((article, index) => (
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
      );
    }
  };

  return (
    <section className={styles.healthTopicsSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2>
            Explore <span>{categories ? "Blog" : "Health"}</span> Topics
          </h2>
          <p>
            Browse our comprehensive collection of {categories ? "blog articles" : "health information"} by category
          </p>
        </div>

        {/* Category Tabs - only for default */}
        {!categories && (
          <div className={styles.categoryTabs}>
            {allCats.map((category, index) => (
              <button
                key={index}
                className={`${styles.categoryTab} ${
                  activeCategory === category ? styles.active : ""
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {renderSections()}
      </div>
    </section>
  );
};

export default HealthTopics;