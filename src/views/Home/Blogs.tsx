import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import style from "../../styles/home.module.scss";
import BlogCard from "@/components/BlogCard";

export default function Blogs({ blogs }: { blogs: any }) {
  const blogsList = blogs.slice(0, 3);
  return (
    <section className="w-100 bg-white ">
      <div className="container pt-0">
        <div className="d-flex flex-column row-gap-2 w-100">
          <div className="d-flex justify-content-between w-100 align-items-base">
            <span>
              <h2 className="mb-1">Blogs</h2>
              <p className="mainHeadingText">
                Read about latest health problem and their solutions
              </p>
            </span>
            <Link
              href={"/blog"}
              className="link fw-bold d-flex align-items-center"
            >
              View All <MdKeyboardArrowRight />
            </Link>
          </div>
          <ul className={style.blogCont}>
            {blogsList.map(
              (
                blog: {
                  title: string;
                  url: string;
                  date: string;
                  readTime: string;
                  description: string;
                },
                indx: string
              ) => (
                <li key={indx}>
                  <BlogCard blog={blog} link={"/blog/"} />
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
