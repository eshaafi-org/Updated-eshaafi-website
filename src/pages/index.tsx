// import Head from "next/head";
// // import Image from "next/image";
// import { Roboto } from "next/font/google";
// import styles from "@/styles/home.module.scss";
// // import Link from "next/link";
// import Hero from "@/views/Home/Hero";
// import Services from "@/views/Home/Services";
// import Mission from "@/views/Home/Mission";
// import Features from "@/views/Home/Features";
// import Working from "@/views/Home/Working";
// import Doctors from "@/views/Home/Doctors";
// // // import Subscriptions from "@/views/Home/Subscriptions";
// // // import Reviews from "@/views/Home/Reviews";
// import Blogs from "@/views/Home/Blogs";
// import Partners from "@/views/Home/Partners";
// import GetApp from "@/views/Home/GetApp";
// import { BASE_URL } from "@/helper/CONST";
// import heroImage from "../../public/heroImage.svg";
// import dynamic from 'next/dynamic';

// // const inter = Roboto({
// //   subsets: ["latin"],
// //   weight: ["100", "300", "400", "500", "700"],
// // });
// // import { Roboto } from "next/font/google";

// const inter = Roboto({
//   subsets: ["latin"],
//   weight: ["100", "300", "400", "500", "700"],
// });

// export default function Home({ positions, doctors }: any) {
//   const Partners = dynamic(() => import('@/views/Home/Partners'), { ssr: false });
//   return (
//     <>
//       <Head>
//         <title>Eshaafi | We care</title>
//         <meta name="description" content="Meet one on one with your doctor" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
//         <link rel="icon" href={"/favicon.ico"} />
//       </Head>
//       <main className={`${styles.main} ${inter.className}`}>
//         <Hero
//           img={heroImage}
//           heading="Stress free access to quality healthcare"
//           text="Book Appointment with best Verified Doctors"
//           link={{ name: "book now", link: "/doctors" }}
//         />
//         <Services />
//         <Mission
//           heading={"Our Mission"}
//           subHeading={"Care That Never Quits"}
//           text={` At eShaafi, our mission is to provide continuous care that
//               surpasses boundaries and empowers individuals to take control of
//               their health. We are committed to delivering accessible, reliable,
//               and compassionate healthcare through cutting-edge telemedicine
//               solutions.`}
//         />
//         <Features />
//         <Working />
//         {typeof window !== "undefined" && (
//           <Doctors doc={doctors} heading={"Book with Doctors"} />
//         )}

//         {/* <Subscriptions /> */}
//         {/* <Reviews />*/}
//         {/* <Partners /> */}
//         {typeof window !== 'undefined' && <Partners />}
//         <Blogs blogs={positions} />
//         <GetApp color="#fff" />
//       </main>
//     </>
//   );
// }

// export async function getStaticProps() {
//   let response = await fetch(BASE_URL + "/new/users/blogs");
//   let doc = await fetch(BASE_URL + "/patients/doctors/filter", {
//     cache: "no-cache",
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       type: "specialization",
//       search: "General Physician",
//     }),
//   });
//   const [blogs, doctors] = await Promise.all([response, doc]);
//   const data = await blogs.json();
//   const docData = await doctors.json();
//   return {
//     props: {
//       positions: data?.response?.Items ? data?.response?.Items : [],
//       doctors: docData.response.Items.sort((a: any, b: any) => {
//         if (a.isOnline && !b.isOnline) {
//           return -1;
//         } else if (!a.isOnline && b.isOnline) {
//           return 1;
//         } else {
//           return 0;
//         }
//       }),
//     },
//     revalidate: 1,
//   };
// }

import Head from "next/head";
import { Roboto } from "next/font/google";
import styles from "@/styles/home.module.scss";
import Hero from "@/views/Home/Hero";
import Services from "@/views/Home/Services";
import Mission from "@/views/Home/Mission";
import Features from "@/views/Home/Features";
import Working from "@/views/Home/Working";
import Blogs from "@/views/Home/Blogs";
import GetApp from "@/views/Home/GetApp";
import { BASE_URL } from "@/helper/CONST";
import heroImage from "../../public/heroImage.svg";
import Doctors from "@/views/Home/Doctors";
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const inter = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch(BASE_URL + "/new/users/blogs");
      const data = await response.json();
      setPositions(data?.response?.Items || []);
    };

    const fetchDoctors = async () => {
      const response = await fetch(BASE_URL + "/patients/doctors/filter", {
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
      const data = await response.json();
      setDoctors(data.response.Items.sort((a: any, b: any) => {
        return a.isOnline === b.isOnline ? 0 : a.isOnline ? -1 : 1;
      }));
    };

    fetchBlogs();
    fetchDoctors();
  }, []);

  const Partners = dynamic(() => import('@/views/Home/Partners'), { ssr: false });

  return (
    <>
      <Head>
        <title>Eshaafi | We care</title>
        <meta name="description" content="Meet one on one with your doctor" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href={"/favicon.ico"} />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <Hero
          img={heroImage}
          heading="Stress free access to quality healthcare"
          text="Book Appointment with best Verified Doctors"
          link={{ name: "book now", link: "/doctors" }}
        />
        <Services />
        <Mission
          heading={"Our Mission"}
          subHeading={"Care That Never Quits"}
          text={`At eShaafi, our mission is to provide continuous care that
              surpasses boundaries and empowers individuals to take control of
              their health. We are committed to delivering accessible, reliable,
              and compassionate healthcare through cutting-edge telemedicine
              solutions.`}
        />
        <Features />
        <Working />
        <Doctors doc={doctors} heading={"Book with Doctors"} />
        <Blogs blogs={positions} />
        {typeof window !== 'undefined' && <Partners />}
        <GetApp color="#fff" />
      </main>
    </>
  );
}
