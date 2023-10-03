import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import style from "./blogCard.module.scss";
// global blog card
export default function BlogCard({ blog, link }: any) {
  return (
    <Link
      className={`flex flex-col row-gap-0 ${style.blogContainer}`}
      href={link + blog.name}
      style={{ textDecoration: "none" }}
    >
      <Image
        src={blog.url}
        width={1000}
        height={1000}
        alt={blog.title}
        className={style.blogImage}
        style={{ borderRadius: 8 }}
      />
      <h4 style={{ minHeight: 35 }}>{blog.title}</h4>
      <p style={{ fontSize: 11 }}>
        {moment(blog.date).format("D MMMM, YYYY")}{" "}
        <small className={style.blogTimeCircle}>{blog.readTime} min read</small>
      </p>
      <p>
        {blog.description.slice(0, 60)}...
        <span
          className={`link inline-block ${style.readMore}`}
          style={{
            fontSize: "1rem",
            fontWeight: "400",
          }}
        >
          read more
        </span>
      </p>
    </Link>
  );
}

// recent blog card
