// import Head from "next/head";
import Image from "next/image";
// import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import style from "@/styles/blogs.module.scss";
import Head from "next/head";
import { BASE_URL } from "@/helper/CONST";
export default function Post({ post }: any) {
  const baseUrl = "https://www.eshaafi.com";
  return (
    <>
      {post && (
        <Head>
          <title>{post?.title}</title>
          <meta name="description" content={post?.description} key={"desc"} />
          {/* <link rel="canonical" href={baseUrl + router.asPath} /> */}
          <meta property="og:title" content={post?.title} />
          <meta property="og:description" content={post?.description} />
          <meta property="og:image" content={post?.url} />
          <meta property="og:image:alt" content={post?.title} />
          <meta
            property="og:url"
            content={baseUrl + "/blog/second" + post?.name}
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:creator" content="eshaafi.com" />
          <meta name="twitter:site" content="eshaafi.com" />
          <meta name="twitter:label1" content="Written by" />
          <meta name="twitter:data1" content={post?.authorName} />
          <meta name="twitter:label2" content="Est. reading time" />
          <meta name="twitter:data2" content={post?.readTime + " minutes"} />
          {/* <meta property="og:image:type" content="image/png" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta name="author" content={post?.authorName} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="eshaafi.com" />
        <meta name="twitter:site" content="eshaafi.com" />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content={post?.authorName} />
        <meta name="twitter:label2" content="Est. reading time" />
        <meta name="twitter:data2" content={post?.readTime + " minutes"} />
        <meta
          property="og:site_name"
          content="Health Zone | Healthy reads on eshaafi.com"
        />
        <meta
          property="article:publisher"
          content="https://www.facebook.com/eShaaficare?mibextid=ZbWKwL"
        />
        <meta
          property="article:published_time"
          content="2023-09-11T06:32:01+00:00"
        />
        <meta
          property="article:modified_time"
          content="2023-09-11T06:16:11+00:00"
        />
        <meta property="fb:app_id" content="287697960444401"></meta> */}
        </Head>
      )}
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
  try {
    // Call an external API endpoint to get posts
    const res = await fetch(BASE_URL + "/new/users/blogs");
    const position = await res.json();
    // console.log(position);
    const items = position?.response?.Items ? position.response.Items : [];
    const paths = items.map((post: any) => ({
      params: { id: post.name },
    }));
    // console.log(paths);
    // { fallback: false } means other routes should 404
    return { paths, fallback: true };
  } catch (err) {
    // API unavailable at build time: build posts on first request instead
    return { paths: [], fallback: true };
  }
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
