import { BASE_URL } from "@/helper/CONST";
import Head from "next/head";
import RecentBlogs from "@/views/Blogs/RecentBlogs";
import FeaturedBlogs from "@/views/Blogs/FeaturedBlog";
import style from "../../styles/blogs.module.scss";
import AddressBar from "@/components/AddressBar";
import Categories from "@/views/Blogs/Categories";
import GetApp from "@/views/Home/GetApp";
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
        <section className="container">
          <div className="d-flex items-start col-gap-1 position-relative flex-column w-100 row-gap-2 sm-row-gap-1">
            <span>
              <h2>Blogs</h2>
              <AddressBar links={links} />
            </span>
            <FeaturedBlogs featuredBlogs={recentBlogs} />
            <RecentBlogs recentBlogs={recentBlogs} />
            <Categories categories={categories} />
          </div>
        </section>
        <GetApp color="#DFEAF2" />
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
