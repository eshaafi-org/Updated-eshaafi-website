import BlogsList from "@/views/Blogs/BlogsList";
import { BASE_URL } from "@/helper/CONST";
import Head from "next/head";

export default function Blogs({ positions }: any) {
  return (
    <>
      <Head>
        <title>Health Blog's</title>
      </Head>
      <main>
        <section className="container">
          <div className="flex items-start col-gap-1 position-relative flex-col w-full row-gap-2">
            <h2>Blogs</h2>
            <BlogsList blogs={positions} link={"/blog/second/"} />
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
      positions: data.response.Items ? data.response.Items : [],
    },
    revalidate: 1,
  };
}
