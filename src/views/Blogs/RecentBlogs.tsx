import style from "../../styles/blogs.module.scss";
import Image from "next/image";
import Link from "next/link";
// recent blog card component
function BlogCard({ blog }: any) {
  return (
    <div className={style.recentBlogCard}>
      <span className={style.blogImage}>
        <Image
          src={blog.url}
          className={style.recentBlogImage}
          width={200}
          height={200}
          alt={blog.url}
        />
      </span>
      <span className={style.recentBlogContent}>
        <h5 className={style.blogHeading}>{blog.title}</h5>
        <p className={style.blogDiscription}>
          {blog.description.slice(0, 50)} ...
          <Link href={`/blog/${blog.name}`} className={style.blogLink}>
            Read More
          </Link>
        </p>
      </span>
    </div>
  );
}
// recent blogs section
export default function RecentBlogs({ recentBlogs }: { recentBlogs: [] }) {
  return (
    <div className={style.recentBlogs}>
      <h4 className={style.blogPageHeadings}>Recent Uploads</h4>
      <ul className={style.recentBlogsList}>
        {recentBlogs.slice(0, 4).map((blog, indx) => (
          <li key={indx}>
            <BlogCard blog={blog} />
          </li>
        ))}
      </ul>
    </div>
  );
}
