/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import Link from "next/link";
import { GetStaticProps, NextPage } from "next";
import styles from "../styles/mediaGallery.module.scss";
import { mediaItems, MediaItem } from "../helper/mediaGallery";
import { Calendar } from "lucide-react";

type Props = {
  items: MediaItem[];
};

const MediaGalleryPage: NextPage<Props> = ({ items }) => {
  const sections = ["Impact Moment", "Partnership Highlights", "Achievements"];
  
  // Track visible articles in Impact Moment section only
  const [visibleArticles, setVisibleArticles] = useState<number>(3);
  const [previousVisibleCount, setPreviousVisibleCount] = useState<number>(3);

  // Filter items by category for each section
  const getItemsForSection = (sectionName: string) => {
    if (sectionName === "Impact Moment") {
      return items.filter(item => item.category === "Impact");
    } else if (sectionName === "Partnership Highlights") {
      return items.filter(item => item.category === "Partnership");
    } else if (sectionName === "Achievements") {
      return items.filter(item => item.category === "Achievements");
    }
    return [];
  };

  const handleLoadMore = (sectionItems: MediaItem[], sectionElement: HTMLElement | null) => {
    if (visibleArticles >= sectionItems.length) {
      setPreviousVisibleCount(visibleArticles);
      setVisibleArticles(3);
      // Smooth scroll to section when collapsing
      if (sectionElement) {
        setTimeout(() => {
          sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      setPreviousVisibleCount(visibleArticles);
      setVisibleArticles((v) => Math.min(sectionItems.length, v + 3));
    }
  };

  return (
    <div>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Media Gallery</h1>
          <Link href="/partnerwithus" className={styles.partnerBtn}>
            Partner with Us
          </Link>
        </div>
      </section>

      <main className={styles.container}>
        {sections.map((section, idx) => {
          const sectionItems = getItemsForSection(section);
          const displayCount = idx === 0 ? visibleArticles : 3;
          const sectionRef = React.useRef<HTMLElement>(null);
          
          return (
            <section key={section} ref={sectionRef} style={{ marginBottom: 34 }}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>{section}</h2>
                {/* <Link href="/media-gallery" className={styles.viewAll}>View all</Link> */}
              </div>

              <div className={styles.grid}>
                {sectionItems.slice(0, displayCount).map((item, itemIdx) => {
                  // Only animate newly loaded items
                  const isNewItem = idx === 0 && itemIdx >= previousVisibleCount;
                  
                  return (
                    <article 
                      key={item.id} 
                      className={`${styles.card} ${isNewItem ? styles.cardAnimated : ''}`}
                      style={isNewItem ? { animationDelay: `${(itemIdx - previousVisibleCount) * 0.1}s` } : {}}
                    >
                      <Link href={`/media-gallery/${item.id}`} aria-label={item.title}>
                        <img 
                          className={styles.cardImage} 
                          src={item.cover} 
                          alt={item.title}
                          style={item.coverStyle || {}}
                        />
                      </Link>
                      <div className={styles.cardBody}>
                        {/* <h3 className={styles.cardTitle}>{item.title}</h3> */}
                        <p className={styles.cardExcerpt}>{item.excerpt}</p>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Render the 'Load more' button under the Impact Moment section only */}
              {idx === 0 && sectionItems.length > 3 && (
                <div className={styles.loadMoreWrapper}>
                  <button
                    className={styles.loadMoreBtn}
                    onClick={() => handleLoadMore(sectionItems, sectionRef.current)}
                    aria-label={visibleArticles >= sectionItems.length ? "Show less articles" : "Load more articles"}
                  >
                    <span className={styles.loadMoreText}>
                      {visibleArticles >= sectionItems.length ? "Show Less" : "Load More"}
                    </span>
                  </button>
                </div>
              )}
            </section>
          );
        })}

        <section className={styles.footprint}>
          <div className={styles.ctaLarge}>
            <div className={styles.ctaText}>
              Ready to Transform Your Team&apos;s well-being
            </div>
            <Link href="/partnerwithus" className={styles.ctaButton}>
              Book a Demo Session
              <Calendar size={20} />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Using local sample data for now. Replace with API fetch when available.
  return {
    props: {
      items: mediaItems,
    },
  };
};

export default MediaGalleryPage;
