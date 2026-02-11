import { BASE_URL } from "@/helper/CONST";
import Head from "next/head";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import RecentBlogs from "../healthlibrary/recentblog";
import HealthTopics from "../healthlibrary/healthtopic";
import styles from "../../styles/healthlibrary.module.scss";
import { trackEvent } from "@/lib/ga";
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
  const [enrichedCategories, setEnrichedCategories] = useState(categories);

  // Fetch missing category blogs on mount
  useEffect(() => {
    const fetchCategoryBlogs = async () => {
      if (!Array.isArray(categories)) return;

      // Check if categories have blogs, if not fetch them
      const categoriesNeedingBlogs = categories.filter(
        (c: any) => !Array.isArray(c.blogs) || c.blogs.length === 0
      );

      if (categoriesNeedingBlogs.length === 0) {
        return;
      }
      try {
        const updatedCategories = await Promise.all(
          categories.map(async (category: any) => {
            if (Array.isArray(category.blogs) && category.blogs.length > 0) {
              return category; // Already has blogs
            }

            const categoryName = category.name || category.category;
            try {
              // Fetch all pages for this category using LastEvaluatedKey pagination
              let collected: any[] = [];
              let lastKey: string | undefined | null = undefined;
              let page = 0;
              do {
                const paramPrefix = page === 0 ? "?" : "&";
                const lastParam = lastKey ? `&last=${encodeURIComponent(lastKey)}` : "";
                const url = `${BASE_URL}/new/users/blogs?category=${encodeURIComponent(categoryName)}${lastParam}`;
                const resp = await fetch(url);
                const json = await resp.json();
                const items = json.response?.Items || [];
                const responseLastKey = json.response?.LastEvaluatedKey;
                collected = collected.concat(items);
                page += 1;
                lastKey = responseLastKey;
                // Continue until API returns no LastEvaluatedKey
              } while (lastKey);
              return {
                ...category,
                blogs: collected,
              };
            } catch (err) {
              return category;
            }
          })
        );

        setEnrichedCategories(updatedCategories);
      } catch (err) {

      }
    };

    fetchCategoryBlogs();
  }, [categories]);

  // Aggregate all blogs from categories and recentBlogs
  const allBlogs = useMemo(() => {
    
    const blogsSet = new Set<string>();
    const allBlogsArray: any[] = [];

    // Add recentBlogs
    if (Array.isArray(recentBlogs)) {
      recentBlogs.forEach((blog: any, idx: number) => {
        if (blog.name && !blogsSet.has(blog.name)) {
          blogsSet.add(blog.name);
          allBlogsArray.push(blog);
        }
      });
    }

    // Log all categories with detailed breakdown
    let totalCategoryBlogs = 0;
    const categoryStats: any[] = [];

    if (Array.isArray(enrichedCategories)) {
      enrichedCategories.forEach((category: any, catIndex: number) => {
        const categoryName = category.name || category.category;
        const blogCount = category.blogs?.length || 0;
        totalCategoryBlogs += blogCount;
        
        categoryStats.push({
          'Category': categoryName,
          'Blogs': blogCount
        });
      });
    }

    // Add blogs from all categories
    if (Array.isArray(enrichedCategories)) {
      enrichedCategories.forEach((category: any) => {
        const categoryName = category.name || category.category;
        if (Array.isArray(category.blogs)) {
          category.blogs.forEach((blog: any) => {
            if (blog.name && !blogsSet.has(blog.name)) {
              blogsSet.add(blog.name);
              allBlogsArray.push({ ...blog, categoryName: categoryName });
            } else if (blog.name && blogsSet.has(blog.name)) {
            }
          });
        }
      });
    }
    return allBlogsArray;
  }, [recentBlogs, enrichedCategories]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsDropdownOpen(true);
    
    if (query.trim()) {
      trackEvent('blog_search_query', {
        section: 'blog_search',
        query: query
      });
    }
  }, []);

  const handleSuggestionClick = useCallback((blog: any) => {
    trackEvent('blog_search_result_click', {
      section: 'blog_search',
      blog_title: blog.title,
      blog_name: blog.name,
      category: blog.categoryName || 'recent_blogs'
    });
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

  // Filter suggestions based on search query from ALL blogs
  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    
    const filtered = allBlogs.filter((blog: any) => {
      // Search by title, author, description, and category
      const titleMatch = blog.title?.toLowerCase().includes(query);
      const authorMatch = blog.authorName?.toLowerCase().includes(query);
      const descMatch = blog.description?.toLowerCase().includes(query);
      const categoryMatch = blog.categoryName?.toLowerCase().includes(query);
      
      const isMatch = titleMatch || authorMatch || descMatch || categoryMatch;
      return isMatch;
    });
    
    return filtered; // Show ALL matching results
  }, [allBlogs, searchQuery]);

  useEffect(() => {
    trackEvent('blog_page_view_clk', {
      section: 'page_load',
      total_blogs: allBlogs.length,
      categories_count: enrichedCategories?.length || 0
    });
  }, [allBlogs.length, enrichedCategories?.length]);
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
                <div className={styles.searchDropdown} style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  <div style={{ padding: '8px 12px', fontSize: '12px', color: '#666', borderBottom: '1px solid #eee', position: 'sticky', top: 0, background: '#fff' }}>
                    Found {suggestions.length} blog{suggestions.length !== 1 ? 's' : ''} matching &quot;{searchQuery}&quot;
                  </div>
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
                          {blog.categoryName && (
                            <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
                              Category: {blog.categoryName}
                            </div>
                          )}
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
  try {
    let response = await fetch(BASE_URL + "/new/users/blogs");
    const data = await response.json();

    const recentBlogs = data.response?.Items ? data.response.Items : [];
    const categoriesList = data.response?.CategoriesList
      ? data.response.CategoriesList
      : [];

    // For each category, fetch all pages using LastEvaluatedKey so we prefetch full blog lists
    const enrichedCategories = await Promise.all(
      categoriesList.map(async (category: any) => {
        const categoryName = category.name || category.category;
        if (!categoryName) return category;

        try {
          let collected: any[] = [];
          let lastKey: string | undefined | null = undefined;
          do {
            const lastParam = lastKey ? `&last=${encodeURIComponent(lastKey)}` : "";
            const url = `${BASE_URL}/new/users/blogs?category=${encodeURIComponent(
              categoryName
            )}${lastParam}`;
            const resp = await fetch(url);
            const json = await resp.json();
            const items = json.response?.Items || [];
            const responseLastKey = json.response?.LastEvaluatedKey;
            collected = collected.concat(items);
            lastKey = responseLastKey;
          } while (lastKey);

          return {
            ...category,
            blogs: collected,
          };
        } catch (err) {
          return category;
        }
      })
    );

    return {
      props: {
        recentBlogs,
        categories: enrichedCategories,
      },
      revalidate: 1,
    };
  } catch (err) {
    return {
      props: { recentBlogs: [], categories: [] },
      revalidate: 1,
    };
  }
}
