// import Head from "next/head";
import React, { useEffect } from "react";
import Image from "next/image";
// import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import style from "@/styles/blogs.module.scss";
import { BASE_URL } from "@/helper/CONST";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import addImage from "../../../public/images/addImage.png";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiLink2 } from "react-icons/fi";
import moment from "moment";
import GetApp from "@/views/Home/GetApp";

import AddressBar from "@/components/AddressBar";
const links = [
  { name: "Home", link: "/" },
  { name: "Blog", link: "/blog" },
];
export default function Post({ post }: any) {
  const baseUrl = "https://stage.eshaafi.com";
  let router = useRouter();

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
  };
  useEffect(() => {
    const h2 = document.querySelectorAll("h2");
  }, []);
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
          <meta property="og:url" content={baseUrl + "/blog/" + post?.name} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:creator" content="eshaafi.com" />
          <meta name="twitter:site" content="eshaafi.com" />
          <meta name="twitter:label1" content="Written by" />
          <meta name="twitter:data1" content={post?.authorName} />
          <meta name="twitter:label2" content="Est. reading time" />
          <meta name="twitter:data2" content={post?.readTime + " minutes"} />
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
      {post ? (
        <main>
          <section className="container">
            <AddressBar links={links} title={"Blog"} />
            {/* blog page  */}
            <div className={style.blogPage}>
              {/* share and table of content section */}
              {/* <div className={style.tableOfContent}>
                <p className="text-main font-bold">Table of content</p>
              </div> */}
              <div className={style.share}>
                <div className={style.shareIcon}>
                  <p className="text-main font-bold">Share this Article</p>
                  <span className="flex col-gap-0-5 flex-wrap">
                    <button
                      onClick={copyURLToClipboard}
                      className={
                        style.iconStyle + " flex col-gap-1 border-none"
                      }
                      title="Copy link"
                      id={`${baseUrl + router?.asPath}`}
                    >
                      <FiLink2 style={{ color: "#1B76B8", fontSize: "1rem" }} />
                    </button>
                    <button
                      title="Share on Facebook"
                      className="border-none bg-none"
                    >
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
                    </button>
                    <button
                      title="Share-on-WhatsApp"
                      id="whatsapp"
                      className="border-none bg-none"
                    >
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
                    </button>
                    <button
                      title="Share-on-linkedin"
                      id="linkedin"
                      className="border-none bg-none"
                    >
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${
                          baseUrl + router?.asPath
                        }`}
                        target="_blank"
                        className={style.iconStyle}
                      >
                        <FaLinkedinIn
                          style={{ color: "#1976D2", fontSize: "1rem" }}
                        />
                      </a>
                    </button>
                    <button
                      title="Share on Twitter"
                      className="border-none bg-none"
                    >
                      <a
                        href={`https://twitter.com/intent/tweet?url=${
                          baseUrl + router?.asPath
                        }`}
                        className={style.iconStyle}
                        target="_blank"
                      >
                        <FaXTwitter
                          style={{ color: "#000", fontSize: "1rem" }}
                        />
                      </a>
                    </button>
                  </span>
                </div>
              </div>
              {/* add section */}
              <div className={style.addSection}>
                <div
                  className={
                    "bg-main align-self-start flex flex-col row-gap-1 rounded"
                  }
                  style={{
                    background: `url(${addImage.src})`,

                    backgroundSize: "100%",
                    backgroundRepeat: "no-repeat",
                    top: 100,
                    backgroundPosition: "bottom ",
                    padding: "1rem 1rem 5rem 1rem",
                  }}
                >
                  <p className={"text-main font-bold w-60 " + style.addText}>
                    Book Video Consultation{" "}
                    <span className="sm-d-none">With Doctors Anytime</span>
                  </p>
                  <Link
                    href={"/doctors"}
                    className={"linkBtn align-self-start " + style.addBtn}
                  >
                    Book now
                  </Link>
                </div>
              </div>
              {/* blog introduction heading and author */}
              <div className={style.blogIntro + " pb-1"}>
                <h2>{post?.title}</h2>
                <div className="flex col-gap-1 items-center">
                  <div
                    className={style.authorImage}
                    style={{
                      background: `url(${post?.authorProfileUrl})`,
                      // backgroundPosition: "contained",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                  <p style={{ color: "#777", fontSize: 14 }}>
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
              {/* blog Image container */}
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
              {/* blog writing section */}
              <div className={style.blogContent}>
                <ReactMarkdown>{post?.description}</ReactMarkdown>
              </div>
            </div>
          </section>
          <GetApp color="#DFEAF2" />
        </main>
      ) : (
        <div className="container ">
          <div className="row">
            <div className="col">
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(BASE_URL + "/new/users/blogs");
  const position = await res.json();
  const paths = position.response.Items.map((post: any) => ({
    params: { id: post.name },
  }));

  // { fallback: false } means other routes should 404
  return { paths, fallback: true };
}
export async function getStaticProps({ params: { id } }: any) {
  let response = await fetch(`${BASE_URL}/new/users/blogs/${id}`);
  const data = await response.json();
  return {
    props: {
      post: data?.response?.Item,
    },
    revalidate: 1,
  };
}
