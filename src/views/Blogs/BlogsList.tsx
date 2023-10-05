import BlogCard from "@/components/BlogCard";
import style from "../../styles/blogs.module.scss";

export default function BlogsList({
  blogs = [],
  link,
}: {
  blogs: any;
  link: string;
}) {
  return (
    <section className="flex flex-col row-gap-2">
      {/* <span>
        <h2>Well-being</h2>
        <p className="text-2">
          Read about latest health problem and their solutions
        </p>
      </span> */}
      <ul className={style.blogCont}>
        {blogs.map((blog: any, indx: any) => (
          <li key={indx}>
            <BlogCard blog={blog} link={link} />
          </li>
        ))}
      </ul>
    </section>
  );
}
