import Head from "next/head";
// import Image from "next/image";
import { Roboto } from "next/font/google";
import styles from "@/styles/home.module.scss";
// import Link from "next/link";
import Hero from "@/views/Home/Hero";
import Services from "@/views/Home/Services";
import Mission from "@/views/Home/Mission";
import Features from "@/views/Home/Features";
import Working from "@/views/Home/Working";
import Doctors from "@/views/Home/Doctors";
// // import Subscriptions from "@/views/Home/Subscriptions";
// // import Reviews from "@/views/Home/Reviews";
import Blogs from "@/views/Home/Blogs";
import Partners from "@/views/Home/Partners";
import GetApp from "@/views/Home/GetApp";
import { BASE_URL } from "@/helper/CONST";
import fav from "../../public/favicon.ico";
// const inter = Roboto({
//   subsets: ["latin"],
//   weight: ["100", "300", "400", "500", "700"],
// });
// import { Roboto } from "next/font/google";

const inter = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

export default function Home({ positions, doctors }: any) {
  return (
    <>
      <Head>
        <title>Eshaafi | We care</title>
        <meta name="description" content="Meet one on one with your doctor" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={"/favicon.ico"} />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <Hero />
        <Services />
        <Mission
          heading={"Our Mission"}
          subHeading={"Care That Never Quits"}
          text={` At eShaafi, our mission is to provide continuous care that
              surpasses boundaries and empowers individuals to take control of
              their health. We are committed to delivering accessible, reliable,
              and compassionate healthcare through cutting-edge telemedicine
              solutions.`}
        />
        <Features />
        <Working />
        {typeof window !== "undefined" && (
          <Doctors doc={doctors} heading={"Book with Doctors"} />
        )}

        {/* <Subscriptions /> */}
        {/* <Reviews />*/}
        <Blogs blogs={positions} />
        <Partners />
        <GetApp color="#fff" />
      </main>
    </>
  );
}
// blogs prerendering
export async function getStaticProps() {
  let response = await fetch(BASE_URL + "/new/users/blogs");
  let doc = await fetch(BASE_URL + "/patients/doctors/filter", {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "specialization",
      search: "General Physician",
    }),
  });
  const [blogs, doctors] = await Promise.all([response, doc]);
  const data = await blogs.json();
  const docData = await doctors.json();
  return {
    props: {
      positions: data.response.Items ? data.response.Items : [],
      doctors: docData.response.Items,
    },
    revalidate: 1,
  };
}
