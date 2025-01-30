import style from "../../styles/blogs.module.scss";
import Image from "next/image";
import Link from "next/link";
import { MdNavigateNext } from "react-icons/md";

// recent blog card component
import ReactMarkdown from "react-markdown";

// Function to strip Markdown syntax
const stripMarkdown = (text: string) => {
  // Regular expression to remove markdown symbols (e.g., bold `**`, italics `_`)
  return text.replace(/[\*\_\~\`\#\+\-\!\[\]\(\)\{\}]+/g, "").slice(0, 60); // Keep it to 60 chars
};

function BlogCard({ blog }: any) {
  const cleanDescription = stripMarkdown(blog.description); // Strip Markdown and truncate

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
          {/* Pass the clean string with the truncated description */}
          <ReactMarkdown>{cleanDescription + "..."}</ReactMarkdown>
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
      <span className="d-flex w-100 justify-content-between">
        <h2 className={style.blogPageHeadings}>Recent Uploads</h2>
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
