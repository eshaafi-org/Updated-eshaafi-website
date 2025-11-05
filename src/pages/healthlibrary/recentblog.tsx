import React from "react";
import Link from "next/link";
import styles from "../../styles/healthlibrary.module.scss";

const RecentBlogs: React.FC<{ recentBlogs?: any[] }> = ({ recentBlogs }) => {
  const defaultBlogs = [
    { url: "/images/mainblog.png", title: "How to Maintain a Healthy Lifestyle" },
    { url: "/images/blog2.png", title: "Healthy Eating Habits" },
    { url: "/images/blog3.png", title: "Mental Wellness Tips" },
    { url: "/images/blog4.png", title: "Daily Exercise Routine" },
    { url: "/images/blog5.png", title: "Stress-Free Living" },
  ];

  const blogs = recentBlogs || defaultBlogs;
  const mainBlog = blogs[0];
  const smallBlogs = blogs.slice(1, 5);
  return (
    <section className={styles.recentBlogs}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Recent Blogs</h2>
        {/* <button className={styles.contributeBtn}>Contribute your Blog</button> */}
         <Link href="/contributeBlog">
            <button className={styles.contributeBtn}>Contribute your Blog</button>
          </Link>
      </div>

      <div className={styles.blogGrid}>
        {/* Left Large Image */}
        <Link href={`/blog/${mainBlog?.name}`} className={styles.mainBlog}>
          <img src={mainBlog?.url} alt={mainBlog?.title} />
          <div className={styles.overlayText}>{mainBlog?.title}</div>
        </Link>

        {/* Right Side 4 Small Images */}
        <div className={styles.smallBlogs}>
          {smallBlogs.map((blog, index) => (
            <Link key={index} href={`/blog/${blog?.name}`} className={styles.blogItem}>
              <img src={blog?.url} alt={blog?.title} />
              <div className={styles.overlayText}>{blog?.title}</div>
            </Link>
          ))}
        </div>

        {/* Right Button */}
        <div className={styles.sideButton}>
          <Link href="/contributeBlog">
            <button className={styles.viewAllBtn}>Contribute your Blog</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentBlogs;
