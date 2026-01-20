/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { GetStaticProps, NextPage } from "next";
import styles from "../styles/mediaGallery.module.scss";
import { mediaItems, MediaItem } from "../helper/mediaGallery";
import { Calendar } from "lucide-react";
import { trackEvent } from "@/lib/ga";

type Props = {
  items: MediaItem[];
};

const MediaGalleryPage: NextPage<Props> = ({ items }) => {
  useEffect(() => {
    if (!sessionStorage.getItem('media_gallery_page_view_tracked')) {
      trackEvent('media_gallery_page_view_clk', {
        section: 'page_load'
      });
      sessionStorage.setItem('media_gallery_page_view_tracked', 'true');
    }
  }, []);

  const sections = ["Impact Moment", "Partnership Highlights", "Achievements"];

  // Impact Moment state
  const [visibleImpact, setVisibleImpact] = useState<number>(3);
  const [prevImpactCount, setPrevImpactCount] = useState<number>(3);

  // Partnership state
  const [visiblePartnership, setVisiblePartnership] = useState<number>(3);

  const getItemsForSection = (sectionName: string) => {
    if (sectionName === "Impact Moment") {
      return items.filter(item => item.category === "Impact");
    }
    if (sectionName === "Partnership Highlights") {
      return items.filter(item => item.category === "Partnership");
    }
    if (sectionName === "Achievements") {
      return items.filter(item => item.category === "Achievements");
    }
    return [];
  };

  const handleImpactLoadMore = (sectionItems: MediaItem[], sectionRef: HTMLElement | null) => {
    if (visibleImpact >= sectionItems.length) {
      setPrevImpactCount(visibleImpact);
      setVisibleImpact(3);

      if (sectionRef) {
        setTimeout(() => {
          sectionRef.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } else {
      setPrevImpactCount(visibleImpact);
      setVisibleImpact(v => Math.min(sectionItems.length, v + 3));
    }
  };

  const handlePartnershipLoadMore = (sectionItems: MediaItem[]) => {
    setVisiblePartnership(v =>
      v >= sectionItems.length ? 3 : Math.min(sectionItems.length, v + 3)
    );
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
        {sections.map((section) => {
          let sectionItems = getItemsForSection(section);
          // For Partnership Highlights show newest (last) first
          if (section === "Partnership Highlights") {
            sectionItems = [...sectionItems].reverse();
          }
          const sectionRef = useRef<HTMLElement>(null);

          let displayCount = 3;
          if (section === "Impact Moment") displayCount = visibleImpact;
          if (section === "Partnership Highlights") displayCount = visiblePartnership;

          return (
            <section key={section} ref={sectionRef} style={{ marginBottom: 34 }}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>{section}</h2>
              </div>

              <div className={styles.grid}>
                {sectionItems.slice(0, displayCount).map((item, index) => {
                  const isNewImpactItem =
                    section === "Impact Moment" && index >= prevImpactCount;

                  return (
                    <article
                      key={item.id}
                      className={`${styles.card} ${
                        isNewImpactItem ? styles.cardAnimated : ""
                      }`}
                      style={
                        isNewImpactItem
                          ? { animationDelay: `${(index - prevImpactCount) * 0.1}s` }
                          : {}
                      }
                    >
                      <Link href={`/media-gallery/${item.id}`}>
                        <img
                          className={styles.cardImage}
                          src={item.cover}
                          alt={item.title}
                          style={item.coverStyle || {}}
                        />
                      </Link>
                      <div className={styles.cardBody}>
                        <p className={styles.cardExcerpt}>{item.excerpt}</p>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Impact Load More */}
              {section === "Impact Moment" && sectionItems.length > 3 && (
                <div className={styles.loadMoreWrapper}>
                  <button
                    className={styles.loadMoreBtn}
                    onClick={() =>
                      handleImpactLoadMore(sectionItems, sectionRef.current)
                    }
                  >
                    {visibleImpact >= sectionItems.length ? "Show Less" : "Load More"}
                  </button>
                </div>
              )}

              {/* Partnership Load More */}
              {section === "Partnership Highlights" && sectionItems.length > 3 && (
                <div className={styles.loadMoreWrapper}>
                  <button
                    className={styles.loadMoreBtn}
                    onClick={() => handlePartnershipLoadMore(sectionItems)}
                  >
                    {visiblePartnership >= sectionItems.length
                      ? "Show Less"
                      : "Load More"}
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
              Book a Demo Session <Calendar size={20} />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      items: mediaItems,
    },
  };
};

export default MediaGalleryPage;
