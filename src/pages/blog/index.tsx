import BlogsList from "@/views/Blogs/BlogsList";
import { BASE_URL } from "@/helper/CONST";
import Head from "next/head";
import RecentBlogs from "@/views/Blogs/RecentBlogs";
import FeaturedBlogs from "@/views/Blogs/FeaturedBlog";
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
export default function Blogs({ recentBlogs }: any) {
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
          <div className="flex items-start col-gap-1 position-relative flex-col w-full row-gap-2">
            <FeaturedBlogs featuredBlogs={recentBlogs} />
            <RecentBlogs recentBlogs={recentBlogs} />
          </div>
        </section>
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
    },
    revalidate: 1,
  };
}
