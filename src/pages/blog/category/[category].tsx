"use client";
import style from "../../../styles/blogs.module.scss";
import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import BlogCard from "@/components/BlogCard";
import axios from "axios";
import { BASE_URL } from "@/helper/CONST";
import AddressBar from "@/components/AddressBar";
import GetApp from "@/views/Home/GetApp";
// links
export default function CategoryPage() {
  // component variables
  const sectionRef = useRef<HTMLElement | null>(null);
  let router = useRouter();
  const [blog, setBlog] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState<string>("");
  // links to navigate
  const links = [
    { name: "Home", link: "/" },
    { name: "Blog", link: "/blog" },
    {
      name: router?.query?.category,
      link: `/blog/category/${router?.query?.category}`,
    },
  ];
  // getting know about scroll
  useEffect(() => {
    function handleScroll() {
      const section = sectionRef.current;
      if (section) {
        const scrollPosition = window.scrollY;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionHeight) {
          console.log("end");
        } else {
          console.log("start");
        }
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // get initial data function
  const getData = () => {
    setIsLoading(true);
    axios
      .get(
        `${
          router?.query?.category !== "recent"
            ? `${BASE_URL}/new/users/blogs?category=${router?.query?.category}`
            : `${BASE_URL}/new/users/blogs`
        }`
      )
      .then((response) => {
        setLastEvaluatedKey(response.data.response.LastEvaluatedKey);
        setBlog(response.data.response.Items);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  };
  // after first rendering of the component
  useEffect(() => {
    getData();
  }, [router]);
  return (
    <>
      <Head>
        <title>{router?.query?.category}</title>
      </Head>
      <main>
        <section className="container" ref={sectionRef}>
          <AddressBar links={links} title={"Blog"} />
          <span className={style.pageContent}>
            <h4 className={style.blogPageHeadings}>
              {router?.query?.category}
            </h4>
            <p className="sm-d-none capitalize">
              Read about {router?.query?.category} blogs
            </p>
          </span>
          {isLoading ? (
            <div className="flex justify-center">
              <div className="spinner-border" role="status"></div>
            </div>
          ) : (
            <>
              <ul className={style.categoryBlogsList}>
                {blog.map((blog, indx) => (
                  <li key={indx}>
                    <BlogCard blog={blog} link={"/blog/"} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
        <GetApp color="#DFEAF2" />
      </main>
    </>
  );
}
