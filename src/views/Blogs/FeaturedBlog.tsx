import Link from "next/link";
import style from "../../styles/blogs.module.scss";
import moment from "moment";
// featured blog card
function Card({ blog }: any) {
  console.log(blog);
  return (
    <Link href={`/blog/${blog.name}`} className={style.featuredBlogCard}>
      <div className="d-flex flex-column justify-content-end h-100">
        <p style={{ color: "#fff" }} className={style.blogDescription}>
          {blog?.authorName}{" "}
          <span className="mx-0-5" style={{ color: "#DFEAF2" }}>
            •
          </span>
          {moment(
            blog?.scheduleDateTime ? blog.scheduleDateTime : blog.date
          ).format("MMM DD, YYYY")}{" "}
        </p>
        <h5 className={style.blogHeading} style={{ color: "#fff" }}>
          {blog.title}
        </h5>
      </div>
    </Link>
  );
}
// featured blogs seciton
export default function FeaturedBlogs({ featuredBlogs }: any) {
  return (
    <ul className={style.featuredBlogsList}>
      {featuredBlogs.slice(4, 9).map((blog: any, indx: number) => (
        <li
          key={indx}
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(34, 34, 34, 0) 0%, rgba(16, 16, 16, 0.17) 42%, rgba(0, 0, 0, 0.88) 82.35%), url(${blog.url})`,

            backgroundSize: "cover",
            borderRadius: 8,
            backgroundRepeat: "no-repeat",
          }}
        >
          <Card blog={blog} />
        </li>
      ))}
    </ul>
  );
}
