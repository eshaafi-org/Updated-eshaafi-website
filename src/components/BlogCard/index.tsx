import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import style from "./blogCard.module.scss";
import ReactMarkdown from "react-markdown";
// global blog card
const stripMarkdown = (text: string) => {
  // Regular expression to remove markdown symbols (e.g., bold `**`, italics `_`)
  return text.replace(/[\*\_\~\`\#\+\-\!\[\]\(\)\{\}]+/g, "").slice(0, 60); // Keep it to 60 chars
};
export default function BlogCard({ blog, link }: any) {
  const cleanDescription = stripMarkdown(blog.description);
  return (
    <Link
      className={`d-flex flex-column ${style.blogContainer}`}
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
      <h4 className={style.blogHeading}>{blog.title}</h4>
      <p style={{ fontSize: 11 }}>
        {moment(
          blog.scheduleDateTime ? blog.scheduleDateTime : blog.date
        ).format("D MMMM, YYYY")}{" "}
        <small className={style.blogTimeCircle}>{blog.readTime} min read</small>
      </p>
      <p className={style.blogDescription}>
        <ReactMarkdown>{cleanDescription + "..."}</ReactMarkdown>
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
