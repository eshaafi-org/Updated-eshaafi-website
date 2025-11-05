// import Head from "next/head";
// import Hero from "@/views/Home/Hero";
// import Mission from "@/views/Home/Mission";
// import GetApp from "@/views/Home/GetApp";
// import Stats from "@/views/AboutUs/Stats";
// import About from "@/views/AboutUs/About";
// import Values from "@/views/AboutUs/Values";
// import Gallery from "@/views/AboutUs/Gallery";
// import Working from "@/views/AboutUs/Working";
// import Team from "@/views/AboutUs/Team";
// import Tech from "@/views/AboutUs/Tech";
// import aboutHero from "../../../public/images/aboutCover.svg";
// export default function AboutUs() {
//   return (
//     <>
//       <Head>
//         <title>eShaafi | About us</title>
//       </Head>
//       <main>
//         <Hero
//           img={aboutHero}
//           heading="Making Healthcare Accessible to All"
//           text="We bring accessible telemedicine to Pakistan, ensuring your wellness is our constant commitment"
//           link={{ name: "", link: "" }}
//         />
//         <Stats />
//         <Mission
//           heading={"Our Mission"}
//           subHeading={"Care That Never Quits"}
//           text={`At eShaafi, our mission is to provide continuous care that
//               surpasses boundaries and empowers individuals to take control of
//               their health. We are committed to delivering accessible, reliable,
//               and compassionate healthcare through cutting-edge telemedicine
//               solutions.`}
//         />
//         <About />
//         <Values />
//         <Mission
//           heading={"Our Vision"}
//           subHeading={"What Impact we aim to create in healthcare"}
//           text={`At eShaafi, our mission is to provide continuous care that surpasses boundaries and empowers individuals to take control of their health. We are committed to delivering accessible, reliable, and compassionate healthcare through cutting-edge telemedicine solutions. Together, we're revolutionizing healthcare, making it convenient, efficient, and truly patient-centered.`}
//         />
//         <Gallery />
//         <Working />
//         <Team />
//         <Mission
//           heading={"Our Technology"}
//           subHeading={"Technology we use in eShaafi"}
//           text={
//             "Harnessing cutting-edge technologies, our telemedicine app seamlessly integrates secure video consultation. With intuitive mobile and web access, patients receive personalized care, while healthcare providers make informed decisions, shaping the future of remote medical consultations."
//           }
//         />
//         <Tech />
//         <GetApp color={"#DFEAF2"} />
//       </main>
//     </>
//   );
// }
import React from 'react'
import AboutUsPage from '@/views/AboutUs/AboutUsPage/AboutUsPage'

const AboutUs = () => {
  return <AboutUsPage />
}

export default AboutUs
