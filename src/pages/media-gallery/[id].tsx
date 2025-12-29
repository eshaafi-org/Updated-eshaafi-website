import React from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import styles from '../../styles/mediaGalleryDetail.module.scss';
import { mediaItems, MediaItem } from '../../helper/mediaGallery';
import Link from 'next/link';

type Props = {
  item?: MediaItem;
};

const MediaDetailPage: NextPage<Props> = ({ item }) => {
  if (!item) {
    return (
      <div className={styles.container}>
        <p>Item not found</p>
        <p><Link href="/media-gallery">Back to gallery</Link></p>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.heroHeader}>
        <div className={styles.heroContent}>
          <h1>{item.excerpt || item.title}</h1>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.verticalImageLayout}>
          {item.id === 'partnership-highlights-4' ? (
            <>
              {item.images[0] && (
                <div className={styles.imageWrapper}>
                  <img src={item.images[0]} alt={`${item.title} 1`} className={styles.gridImage} />
                  {item.imageCaptions && item.imageCaptions[0] && (
                    <p className={styles.imageCaption}>{item.imageCaptions[0]}</p>
                  )}
                </div>
              )}
              {item.images[1] && (
                <div className={styles.imageWrapper}>
                  <img src={item.images[1]} alt={`${item.title} 2`} className={styles.gridImage} />
                  {item.imageCaptions && item.imageCaptions[1] && (
                    <p className={styles.imageCaption}>{item.imageCaptions[1]}</p>
                  )}
                </div>
              )}
              {item.images[2] && (
                <div className={styles.imageWrapper}>
                  <img src={item.images[2]} alt={`${item.title} 3`} className={styles.zindigiTallImage} />
                  {item.imageCaptions && item.imageCaptions[2] && (
                    <p className={styles.imageCaption}>{item.imageCaptions[2]}</p>
                  )}
                </div>
              )}
            </>
          ) : (
            item.images.map((src, i) => (
              <div key={i} className={styles.imageWrapper}>
                <img src={src} alt={`${item.title} ${i + 1}`} className={styles.gridImage} />
                {item.imageCaptions && item.imageCaptions[i] && (
                  <p className={styles.imageCaption}>{item.imageCaptions[i]}</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
{/* 
      <div className={styles.navigation}>
        <Link href="/media-gallery" className={styles.backLink}>
          ← Back to Media Gallery
        </Link>
      </div> */}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = mediaItems.map((m) => ({ params: { id: m.id } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const id = ctx.params?.id as string;
  const item = mediaItems.find((m) => m.id === id) || null;
  return { props: { item } };
};

export default MediaDetailPage;
