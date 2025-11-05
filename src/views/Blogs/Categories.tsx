import styles from "../../styles/healthlibrary.module.scss";
import Link from "next/link";
import { MdNavigateNext } from "react-icons/md";

export default function Categories({ categories }: { categories: any[] }) {
  return (
    <>
      {categories.map((item, indx) => (
        <section key={indx} className={styles.categorySection}>
          <div className={styles.categoryHeader}>
            <div className={styles.categoryTitle}>
              <div className={styles.categoryIcon}>
                <img src="/images/tech/blog-icon.png" alt={item.name} />
              </div>
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            </div>
            <Link href={`/blog/category/${item.name.replace(/\s/g, "")}`} className={styles.viewAllBtn}>
              View all <MdNavigateNext />
            </Link>
          </div>
          <div className={styles.articlesGrid}>
            {item.blogs.slice(0, 3).map((blog: any, index: number) => (
              <Link key={index} href={`/blog/${blog.name}`} className={styles.articleCard}>
                <div className={styles.articleImage}>
                  <img src={blog.url} alt={blog.title} />
                </div>
                <div className={styles.articleContent}>
                  <h4>{blog.title}</h4>
                  <div className={styles.articleMeta}>
                    <span className={styles.readTime}>5 min read</span>
                    <div className={styles.authorInfo}>
                      <img src="/images/author.png" alt="Author" />
                      <span>Author</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
