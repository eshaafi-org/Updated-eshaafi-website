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
import { trackEvent } from "@/lib/ga";
// links
export default function CategoryPage() {
  // component variables
  const sectionRef = useRef<HTMLElement | null>(null);
  let router = useRouter();
  const [blog, setBlog] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState<
    string | undefined | null
  >("");
  const [uniqueBlogIds] = useState<Set<string>>(new Set()); // Track unique blogs by ID/name
  
  // links to navigate
  const links = [
    { name: "Home", link: "/" },
    { name: "Blog", link: "/blog" },
    {
      name: router?.query?.category,
      link: `/blog/category/${router?.query?.category}`,
    },
  ];

  // to load more data this function will run on scroll end
  const loadMoreData = () => {
    if (lastEvaluatedKey) {
      document.body.style.overflow = "hidden";
      setIsLoading(true);
      setReachedEnd(false);
      const categoryParam = router?.query?.category !== "recent"
        ? `?category=${router?.query?.category}&last=${lastEvaluatedKey}`
        : `?last=${lastEvaluatedKey}`;
      
      axios
        .get(`${BASE_URL}/new/users/blogs${categoryParam}`)
        .then((response) => {
          const newLastEvaluatedKey = response.data.response.LastEvaluatedKey;
          const adminListNextPage = response.data.response.Items || [];
          
          // Filter out duplicates
          const uniqueNewBlogs = adminListNextPage.filter((newBlog: any) => {
            const blogId = newBlog.name || newBlog.id;
            if (uniqueBlogIds.has(blogId)) {
              console.log(`⚠️ Duplicate blog skipped: ${newBlog.title}`);
              return false;
            }
            uniqueBlogIds.add(blogId);
            return true;
          });

          console.log(`📥 Loaded ${adminListNextPage.length} blogs, ${uniqueNewBlogs.length} are unique`);
          
          setLastEvaluatedKey(newLastEvaluatedKey);
          setBlog((prevBlogs) => [...prevBlogs, ...uniqueNewBlogs]);
          document.body.style.overflow = "auto";
          setIsLoading(false);
          setReachedEnd(true);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error('Error loading more blogs:', error);
        });
    }
  };
  
  // get initial data function
  const getData = () => {
    document.body.style.overflow = "auto";
    setIsLoading(true);
    uniqueBlogIds.clear(); // Reset unique tracking
    
    if (router?.query?.category) {
      const categoryParam = router?.query?.category !== "recent"
        ? `?category=${router?.query?.category}`
        : "";
      
      axios
        .get(`${BASE_URL}/new/users/blogs${categoryParam}`)
        .then((response) => {
          const initialBlogs = response.data.response.Items || [];
          
          // Track unique blogs and filter duplicates
          initialBlogs.forEach((blog: any) => {
            uniqueBlogIds.add(blog.name || blog.id);
          });
          
          console.log(`📂 Category: ${router?.query?.category}`);
          console.log(`📥 Loaded ${initialBlogs.length} blogs`);
          console.log('📋 Blogs:', initialBlogs.map((b: any) => b.title));
          
          trackEvent('blog_category_page_view', {
            section: 'category_page',
            category: router?.query?.category,
            blog_count: initialBlogs.length
          });
          
          setLastEvaluatedKey(response.data.response.LastEvaluatedKey);
          setBlog(initialBlogs);
          setIsLoading(false);
          setReachedEnd(true);
        })
        .catch((err) => {
          setIsLoading(false);
          console.error('Error loading category blogs:', err);
        });
    }
  };
  
  // after first rendering of the component
  useEffect(() => {
    getData();
  }, [router?.query?.category]);
  
  // getting know about scroll
  useEffect(() => {
    function handleScroll() {
      const section = sectionRef.current;
      if (section) {
        const scrollPosition = window.scrollY;
        const sectionHeight = section.offsetHeight - 500;
        if (reachedEnd) {
          if (scrollPosition >= sectionHeight) {
            loadMoreData();
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [reachedEnd]);
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

          <ul className={style.categoryBlogsList}>
            {blog.map((blog, indx) => (
              <li key={indx}>
                <BlogCard blog={blog} link={"/blog/"} />
              </li>
            ))}
          </ul>
          {isLoading && (
            <div className="flex justify-center">
              <div className="spinner-border" role="status"></div>
            </div>
          )}
        </section>
        <GetApp color="#DFEAF2" />
      </main>
    </>
  );
}
