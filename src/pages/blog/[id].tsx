// import Head from "next/head";
import Image from "next/image";
// import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import style from "@/styles/blogs.module.scss";
import { BASE_URL } from "@/helper/CONST";
export default function Post({ post }: any) {
  return (
    <>
      {/* <Head>
        <title>{post.title}</title>
        <meta property="og:title" content={post.title} key="title" />
        <meta property="og:image" content={post.url} />
      </Head> */}
      <main>
        <section className="container">
          <div className="flex items-start col-gap-1 position-relative flex-col w-full row-gap-2 w-70 sm-w-full">
            <span>
              <h2>{post?.title}</h2>
            </span>
            <div className={style.imgCont}>
              <Image
                src={post?.url}
                alt={post?.title}
                className={style.blogImage}
                width={2000}
                height={2000}
              />
            </div>
            <div className={style.blogContent}>
              <ReactMarkdown>{post?.description}</ReactMarkdown>
            </div>
          </div>
          <div className="w-30"></div>
        </section>
      </main>
    </>
  );
}
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(BASE_URL + "/new/users/blogs");
  const position = await res.json();
  // console.log(position);
  const paths = position.response.Items.map((post: any) => ({
    params: { id: post.name },
  }));
  // console.log(paths);
  // { fallback: false } means other routes should 404
  return { paths, fallback: true };
}
export async function getStaticProps({ params: { id } }: any) {
  let response = await fetch(`${BASE_URL}/new/users/blogs/${id}`);
  const data = await response.json();
  //   console.log(data.response);
  return {
    props: {
      post: data?.response?.Item,
    },
    revalidate: 1,
  };
}
