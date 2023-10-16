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
  const sectRef = useRef();
  let router = useRouter();
  const [blog, setBlog] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState("");

  // const handleLoadMoreData = () => {
  //   if (!lastEvaluatedKey) {
  //     return;
  //   }
  //   setIsLoading(true);
  //   axios
  //     .get(`${BASE_URL}/new/users/blogs?last=${lastEvaluatedKey}`)
  //     .then((response) => {
  //       const newLastEvaluatedKey = response.data.response.LastEvaluatedKey;
  //       setLastEvaluatedKey(newLastEvaluatedKey);
  //       const adminListNextPage: [] = response.data.response.Items;
  //       setBlog([...blog, ...adminListNextPage]);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setIsLoading(false);
  //     });
  // };
  // const [blogList, setBlogList] = useState([]);
  // const [loading, setLoading] = useState<boolean>(false);
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
  useEffect(() => {
    getData();
  }, [router]);
  //
  // function debounce(func: () => void, delay: number) {
  //   let timeoutId: NodeJS.Timeout;
  //   return function () {
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(func, delay);
  //   };
  // }
  // const handleScroll = useRef(
  //   debounce(() => {
  //     if (
  //       sectRef.current &&
  //       sectRef.current.scrollHeight - sectRef.current.clientHeight <=
  //         sectRef.current.scrollTop <=
  //         1
  //     ) {
  //       handleLoadMoreData();
  //     }
  //   }, 300)
  // );

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll.current);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll.current);
  //   };
  // }, [lastEvaluatedKey]);
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
