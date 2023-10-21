import style from "../../styles/blogs.module.scss";
import Image from "next/image";
import Link from "next/link";
import { MdNavigateNext } from "react-icons/md";
// recent blog card component
function BlogCard({ blog }: any) {
  return (
    <Link href={`/blog/${blog.name}`} className={style.recentBlogCard}>
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
        <p className={style.blogDescription}>
          {blog.description.slice(0, 60)} ...
          <Link href={`/blog/${blog.name}`} className={style.blogLink}>
            Read More
          </Link>
        </p>
      </span>
    </Link>
  );
}
// recent blogs section
export default function RecentBlogs({ recentBlogs }: { recentBlogs: [] }) {
  return (
    <div className={style.recentBlogs}>
      <span className="d-flex w-100 justify-between sm-col-gap-0-5">
        <h4 className={style.blogPageHeadings}>Recent Uploads</h4>
        <Link href="/blog/category/recent" className="link">
          View all <MdNavigateNext />
        </Link>
      </span>
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
