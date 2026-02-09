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
import Imagesection from "@/views/Home/Imagesection";
import Medicalcare from "@/views/Home/Medicalcare";
import GetApp from "@/views/Home/GetApp";
// import { BASE_URL } from "@/helper/CONST";
// import heroImage from "../../public/heroImage.png";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";



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

  // NOTE: These API calls were fetching data for commented-out components
  // Disabled to prevent unnecessary API calls and potential timeout errors on Amplify
  // Uncomment when Blogs and Doctors components are re-enabled
  /*
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(BASE_URL + "/new/users/blogs", {
          signal: AbortSignal.timeout(10000), // 10 second timeout
        });
        if (!response.ok) throw new Error("Failed to fetch blogs");
        const data = await response.json();
        setPositions(data?.response?.Items || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setPositions([]);
      }
    };

    const fetchDoctors = async () => {
      try {
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
          signal: AbortSignal.timeout(10000), // 10 second timeout
        });
        if (!response.ok) throw new Error("Failed to fetch doctors");
        const data = await response.json();
        const doctors = data?.response?.Items || [];
        setDoctors(doctors.sort((a: any, b: any) => {
          return a.isOnline === b.isOnline ? 0 : a.isOnline ? -1 : 1;
        }));
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setDoctors([]);
      }
    };

    fetchBlogs();
    fetchDoctors();
  }, []);
  */

  useEffect(() => {
    // Page tracking or initialization if needed
  }, []);

  const Partners = dynamic(() => import('@/views/Home/Partners'), { ssr: false });
  const Doctors = dynamic(() => import('@/views/Home/Doctors'), { ssr: false });
  const Blogs = dynamic(() => import('@/views/Home/Blogs'), { ssr: false });

  return (
    <>
      <Head>
        <title>eShaafi | Care That Never Quits</title>
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
