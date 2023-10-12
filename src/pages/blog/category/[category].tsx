"use client";
import style from "../../../styles/blogs.module.scss";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BlogCard from "@/components/BlogCard";
import axios from "axios";
import { BASE_URL } from "@/helper/CONST";
import AddressBar from "@/components/AddressBar";
// links
export default function CategoryPage() {
  let router = useRouter();
  const [blogList, setBlogList] = useState([]);
  const links = [
    { name: "Home", link: "/" },
    { name: "Blog", link: "/blog" },
    {
      name: router?.query?.category,
      link: `/blog/category/${router?.query?.category}`,
    },
  ];
  // fetch data ${BASE_URL}/new/users/blogs?category=${router?.query?.category}
  const getData = () => {
    axios
      .get(
        `${
          router?.query?.category !== "recent"
            ? `${BASE_URL}/new/users/blogs?category=${router?.query?.category}`
            : `${BASE_URL}/new/users/blogs`
        }`
      )
      .then((res) => setBlogList(res.data.response.Items))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getData();
  }, [router]);
  return (
    <>
      <Head>
        <title>{router?.query?.category}</title>
      </Head>
      <main>
        <section className="container">
          <AddressBar links={links} title={"Blog"} />
          <span className={style.pageContent}>
            <h4 className={style.blogPageHeadings}>
              {router?.query?.category}
            </h4>
            <p className="sm-d-none capitalize">
              Read about {router?.query?.category} blogs
            </p>
          </span>
          <ul className={style.categoryBlogsList}>
            {blogList.map((blog, indx) => (
              <li key={indx}>
                <BlogCard blog={blog} link={"/blog/"} />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
