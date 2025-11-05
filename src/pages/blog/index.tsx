import { BASE_URL } from "@/helper/CONST";
import Head from "next/head";
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
            <div className={styles.searchBar}>
              <input
                type="text"
                placeholder="Search blogs..."
                className={styles.input}
              />
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
