import { BASE_URL } from "@/helper/CONST";
import Head from "next/head";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import RecentBlogs from "../healthlibrary/recentblog";
import HealthTopics from "../healthlibrary/healthtopic";
import styles from "../../styles/healthlibrary.module.scss";
// async function generateStaticParams() {
//   const res = await fetch(BASE_URL + "/new/users/blogs", {
//     cache: "force-cache",
//   });
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.

//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch data");
//   }
//   return res.json();
// }
const links = [
  { name: "Home", link: "/" },
  { name: "Blog", link: "/blog" },
];
export default function Blogs({ recentBlogs, categories }: any) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsDropdownOpen(true);
  }, []);

  const handleSuggestionClick = useCallback((blog: any) => {
    setSearchQuery("");
    setIsDropdownOpen(false);
    // Navigation will be handled by Link
  }, []);

  const handleInputFocus = useCallback(() => {
    if (searchQuery.trim()) {
      setIsDropdownOpen(true);
    }
  }, [searchQuery]);

  const handleInputBlur = useCallback(() => {
    // Delay closing to allow click on suggestions
    setTimeout(() => setIsDropdownOpen(false), 150);
  }, []);

  // Filter suggestions based on search query
  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return recentBlogs.filter((blog: any) =>
      blog.title?.toLowerCase().includes(query) ||
      blog.authorName?.toLowerCase().includes(query) ||
      blog.description?.toLowerCase().includes(query)
    ).slice(0, 5); // Limit to 5 suggestions
  }, [recentBlogs, searchQuery]);
  return (
    <>
      <Head>
        <title>Eshaafi | Blogs</title>
        <meta name="description" content="Meet one on one with your doctor" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={"/favicon.ico"} />
      </Head>
      <main>
        <section className={styles.wellbeingSection}>
          <div className={styles.overlay}></div>
          <div className={styles.content}>
            <h2>Explore tips to care for your body, mind and everyday wellbeing</h2>
            <div className={styles.searchBar} ref={searchRef}>
              <input
                type="text"
                placeholder="Search blogs..."
                className={styles.input}
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
              {isDropdownOpen && suggestions.length > 0 && (
                <div className={styles.searchDropdown}>
                  {suggestions.map((blog: any) => (
                    <Link
                      key={blog.name}
                      href={`/blog/${blog.name}`}
                      onClick={() => handleSuggestionClick(blog)}
                      className={styles.searchSuggestion}
                    >
                      <div className={styles.suggestionContent}>
                        <img src={blog.url} alt={blog.title} className={styles.suggestionImage} />
                        <div className={styles.suggestionText}>
                          <div className={styles.suggestionTitle}>{blog.title}</div>
                          <div className={styles.suggestionAuthor}>by {blog.authorName}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <RecentBlogs recentBlogs={recentBlogs} />
        <HealthTopics categories={categories} />
      </main>
    </>
  );
}
export async function getStaticProps() {
  let response = await fetch(BASE_URL + "/new/users/blogs");
  const data = await response.json();
  return {
    props: {
      recentBlogs: data.response.Items ? data.response.Items : [],
      categories: data.response.CategoriesList
        ? data.response.CategoriesList
        : [],
    },
    revalidate: 1,
  };
}
