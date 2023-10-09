import Link from "next/link";
import style from "../../styles/blogs.module.scss";
import moment from "moment";
// featured blog card
function Card({ blog }: any) {
  return (
    <Link href={`/blog/${blog.name}`} className={style.featuredBlogCard}>
      <div className="flex col-gap-1 items-center">
        <p style={{ color: "#fff", fontSize: 14 }}>
          {blog?.authorName}{" "}
          <span className="mx-0-5" style={{ color: "#DFEAF2" }}>
            |
          </span>
          {moment(blog?.date).format("MMM DD, YYYY")}{" "}
          <span className="mx-0-5" style={{ color: "#DFEAF2" }}>
            |
          </span>
          {blog?.readTime} min read
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
        <li key={indx} style={{ background: `url(${blog.url})` }}>
          <Card blog={blog} />
        </li>
      ))}
    </ul>
  );
}
