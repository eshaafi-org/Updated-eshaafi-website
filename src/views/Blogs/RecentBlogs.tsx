import styles from "../../styles/healthlibrary.module.scss";
import Link from "next/link";
// recent blogs section
export default function RecentBlogs({ recentBlogs }: { recentBlogs: any[] }) {
  const mainBlog = recentBlogs[0];
  const smallBlogs = recentBlogs.slice(1, 5);

  return (
    <section className={styles.recentBlogs}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Recent Blogs</h2>
        <button className={styles.contributeBtn}>Contribute your Blog</button>
      </div>

      <div className={styles.blogGrid}>
        <div className={styles.mainBlog}>
          <img src={mainBlog?.url} alt={mainBlog?.title} />
          <div className={styles.overlayText}>{mainBlog?.title}</div>
        </div>

        <div className={styles.smallBlogs}>
          {smallBlogs.map((blog, index) => (
            <div key={index} className={styles.blogItem}>
              <img src={blog?.url} alt={blog?.title} />
              <div className={styles.overlayText}>{blog?.title}</div>
            </div>
          ))}
        </div>

        <div className={styles.sideButton}>
          <Link href="/blog/category/recent">
            <button className={styles.viewAllBtn}>View All Blogs</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
