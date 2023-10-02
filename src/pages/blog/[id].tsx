// import Head from "next/head";
import Image from "next/image";
// import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import style from "@/styles/blogs.module.scss";
import { BASE_URL } from "@/helper/CONST";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import addImage from "../../../public/images/addImage.png";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaShareAlt,
} from "react-icons/fa";
import { FiLink2 } from "react-icons/fi";
import moment from "moment";

export default function Post({ post }: any) {
  const baseUrl = "https://beta.eshaafi.com";
  let router = useRouter();
  // console.log(router);
  // copy blog post link funciton
  const copyURLToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("URL copied to clipboard");
      })
      .catch((error) => {
        console.error("Failed to copy URL:", error);
      });
    // console.log("hello");
  };
  // generating random number
  // const randomNum = Math.floor(Math.random() * 1000) + 1;
  // console.log(router.asPath);
  return (
    <>
      <Head>
        <title>{post?.title}</title>
        <meta name="description" content={post?.description} key={"desc"} />
        {/* <link rel="canonical" href={baseUrl + router.asPath} /> */}
        <meta property="og:title" content={post?.title} />
        <meta property="og:description" content={post?.description} />
        <meta property="og:image" content={post?.url} />
        <meta property="og:image:alt" content={post?.title} />
        <meta property="og:url" content={baseUrl + "/blog/" + post.name} />
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
      {post ? (
        <main>
          <section className="container">
            {/* blog's heading section */}
            <div className=" w-60 m-auto">
              <h2>{post?.title}</h2>
              <div className="flex col-gap-1 items-center mt-1">
                <div
                  className={style.authorImage}
                  style={{
                    background: `url(${post?.authorProfileUrl})`,
                    backgroundPosition: "center calc(50% + 8px)",
                    backgroundSize: "200%",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
                <p style={{ color: "#222222" }}>
                  {post?.authorName}{" "}
                  <span className="mx-0-5" style={{ color: "#DFEAF2" }}>
                    |
                  </span>
                  {moment(post?.date).format("MMM DD, YYYY")}{" "}
                  <span className="mx-0-5" style={{ color: "#DFEAF2" }}>
                    |
                  </span>
                  {post?.readTime} min read
                </p>
              </div>
            </div>
            {/* body of the blog */}
            <div className="flex col-gap-1 mt-1 ">
              {/* table of content and sharing */}
              <div
                className="w-20 flex align-self-start position-sticky"
                style={{ top: 100 }}
              >
                <div className="flex justify-between w-full flex-col row-gap-1">
                  {/* <span>
                  <button
                    className="linkBtn flex col-gap-1 bg-none border-none text-primary"
                    id={baseUrl + router?.asPath}
                    type="button"
                  >
                    <FaShareAlt />
                    Share
                  </button>
                </span> */}
                  <p className="font-bold text-main">Share This Article</p>
                  <span className="flex col-gap-0-5 flex-wrap">
                    <button
                      onClick={copyURLToClipboard}
                      className={
                        style.iconStyle + " flex col-gap-1 border-none"
                      }
                    >
                      <FiLink2 style={{ color: "#1B76B8", fontSize: "1rem" }} />
                    </button>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${
                        baseUrl + router?.asPath
                      }`}
                      className={style.iconStyle}
                      target="_blank"
                    >
                      <FaFacebookF
                        style={{ color: "#1976D2", fontSize: "1rem" }}
                      />
                    </a>
                    <a
                      href={`https://api.whatsapp.com/send?text=${
                        baseUrl + router?.asPath
                      }`}
                      className={style.iconStyle}
                      target="_blank"
                    >
                      <FaWhatsapp
                        style={{ color: "#20B038", fontSize: "1rem" }}
                      />
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${
                        baseUrl + router?.asPath
                      }`}
                      className={style.iconStyle}
                    >
                      <FaLinkedinIn
                        style={{ color: "#1976D2", fontSize: "1rem" }}
                      />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${
                        baseUrl + router?.asPath
                      }`}
                      className={style.iconStyle}
                      target="_blank"
                    >
                      <FaTwitter
                        style={{ color: "#03A9F4", fontSize: "1rem" }}
                      />
                    </a>
                  </span>
                </div>
              </div>
              {/* main content of the blog */}
              <div className="flex items-start col-gap-1 position-relative flex-col w-full row-gap-2 w-60 sm-w-full border-top pt-2">
                <div className={style.imgCont}>
                  <Image
                    src={post?.url}
                    alt={post?.title}
                    className={style.blogImage}
                    width={1000}
                    height={1000}
                    loading="eager"
                  />
                </div>
                <div className={style.blogContent}>
                  <ReactMarkdown>{post?.description}</ReactMarkdown>
                </div>
              </div>
              {/* blog searching and add section */}
              <div
                className="w-20 bg-main align-self-start flex flex-col row-gap-1  position-sticky rounded"
                style={{
                  background: `url(${addImage.src})`,
                  backgroundPosition: "center calc(50% + 8px)",
                  backgroundSize: "100%",
                  backgroundRepeat: "no-repeat",
                  top: 100,
                  padding: "1rem 1rem 5rem 1rem",
                }}
              >
                <p className="text-main font-bold w-60">
                  Book Video Consultation With Doctors Anytime
                </p>
                <Link href={"/doctors"} className="linkBtn align-self-start ">
                  Book now
                </Link>
              </div>
            </div>
            {/* <div className="w-70 flex flex-col row-gap-1">
            <p style={{ fontSize: 20, color: "#747A7A" }}>
              Viewed by {randomNum} + people
            </p>
          </div> */}
          </section>
        </main>
      ) : (
        "loading..."
      )}
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
