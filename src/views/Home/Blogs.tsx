import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import style from "../../styles/home.module.scss";
import BlogCard from "@/components/BlogCard";

export default function Blogs({ blogs }: { blogs: any }) {
  const blogsList = blogs.slice(0, 3);
  return (
    <section className="w-full bg-white">
      <div className="container sm-pt-0">
        <div className="flex flex-col row-gap-2 w-full">
          <div className="flex justify-between w-full items-base">
            <span>
              <h2 className="mb-1">Blogs</h2>
              <p className="text-3" style={{ color: "#5A5A5A" }}>
                Read about latest health problem and their solutions
              </p>
            </span>
            <Link href={"/blog"} className="link">
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
