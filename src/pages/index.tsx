import Head from "next/head";
// import { Roboto } from "next/font/google";
import { Inter} from "next/font/google";
import styles from "@/styles/homepage.module.scss";
// import Hero from "@/views/Home/Hero";
import Herosection from "@/views/Home/Herosection"
import Schedule from "@/views/Home/Psychologists";
import ExpertCareSection from "@/views/Home/ServiceCard";
// import Mission from "@/views/Home/Mission";
// import Features from "@/views/Home/Features";
import HealthcareLanding from "@/views/Home/HealthcareLanding";
import TrustedBySection from "@/views/Home/TrustedBySection";
// import Working from "@/views/Home/Working";
import Imagesection from "@/views/Home/Imagesection";
import Medicalcare from "@/views/Home/Medicalcare";
import GetApp from "@/views/Home/GetApp";
import { BASE_URL } from "@/helper/CONST";
import heroImage from "../../public/heroImage.svg";
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';



const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});
// const inter = Roboto({
//   subsets: ["latin"],
//   weight: ["100", "300", "400", "500", "700"],
// });

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
  const Doctors = dynamic(() => import('@/views/Home/Doctors'), { ssr: false });
  const Blogs = dynamic(() => import('@/views/Home/Blogs'), { ssr: false });

  return (
    <>
      <Head>
        <title>Eshaafi | Care That Never Quits</title>
        <meta name="description" content="Meet one on one with your doctor" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href={"/favicon.ico"} />
      </Head>
      <main className={`${styles.main} `}>
        {/* <Hero
          img={heroImage}
          heading="Stress free access to quality healthcare"
          text="Book Appointment with best Verified Doctors"
          link={{ name: "book now", link: "/doctors" }}
        /> */}
        <Herosection/>
        {/* <Services /> */}
        <Schedule/>
        <ExpertCareSection/>
        {/* <Medicalcare/> */}
        {/* <Mission
          heading={"Our Mission"}
          subHeading={"Care That Never Quits"}
          text={`At eShaafi, our mission is to provide continuous care that
              surpasses boundaries and empowers individuals to take control of
              their health. We are committed to delivering accessible, reliable,
              and compassionate healthcare through cutting-edge telemedicine
              solutions.`}
        /> */}
        {/* <HealthcareLanding/> */}
        {/* <Features /> */}
        {/* <TrustedBySection/> */}
        {/* <Working /> */}
        {/* <Doctors doc={doctors} heading={"Book with Doctors"} /> */}
        {/* <Imagesection/> */}
        {/* {typeof window !== 'undefined' && <Partners />}
        <Blogs blogs={positions} />
        <GetApp color="#fff" /> */}
       
      </main>
    </>
  );
}
