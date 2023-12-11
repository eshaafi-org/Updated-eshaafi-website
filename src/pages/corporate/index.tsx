import style from "@/styles/corporate.module.scss";
import Head from "next/head";
import Hero from "@/views/Home/Hero";
import coporateHero from "../../../public/images/coporateHero.png";
import { Text24, Text16 } from "@/components/Typography";
import Mission from "@/views/Home/Mission";
import Image from "next/image";
import Principle from "@/views/Careers/Principle";
import benefit1 from "../../../public/images/benefit (1).svg";
import benefit2 from "../../../public/images/benefit (2).svg";
import benefit3 from "../../../public/images/benefit (3).svg";
import benefit4 from "../../../public/images/benefit (4).svg";
import benefit5 from "../../../public/images/benefit (5).svg";
import benefit6 from "../../../public/images/benefit (6).svg";
import corportat1 from "../../../public/images/corporate1.png";
import corportat2 from "../../../public/images/corporate2.png";
import corportat3 from "../../../public/images/corporate3.png";
import Plans from "@/views/Corporate/Plans";
import ContactUs from "@/views/Corporate/ContantUs";
// benifits list
const benifits = [
  {
    icon: benefit1,
    heading: "24/7 Doctor’s Availability",
    text: "Our doctors are at your service 24/7. Ring up anytime to get the best medical advice from eShaafi.",
  },
  {
    icon: benefit2,
    heading: "E-Prescription",
    text: "We provide e-prescriptions with every call, making it easy for you and your family to get medicine.",
  },
  {
    icon: benefit3,
    heading: "Multiple Profile",
    text: "eShaafi proves to be a one-stop solution for all your medical needs, with profiles of you and your family in one application.",
  },
  {
    icon: benefit4,
    heading: "Video Consultation",
    text: "eShaafi allows you to receive medical consultations anytime, from the comfort of your home or office.",
  },
  {
    icon: benefit5,
    heading: "Health Tracker",
    text: "Track your health and progress with eShaafi's health tracker to stay updated and in control of your well-being.",
  },
  {
    icon: benefit6,
    heading: "Medical Records",
    text: "Our app connects you with experts and securely saves your medical records for convenient access and informed decisions.",
  },
];
export default function Coorporate() {
  return (
    <>
      <Head>
        <title>eShaafi | Corporate</title>
      </Head>
      <main>
        <Hero
          heading="Elevate employee wellbeing with eShaafi"
          text="We bring seamless healthcare solution for your employees ensuring productivity."
          link={{ name: "Book Demo", link: "/" }}
          img={coporateHero}
          capitalize={false}
        />
        <Mission
          heading="What it Includes"
          subHeading="We offer a complete virtual healthcare program"
          text={`We aim revolutionize employee well-being with our comprehensive virtual healthcare program tailored for corporate needs. Our integrated solution ensures accessible and high-quality healthcare, promoting a healthier and more productive workforce. Experience the future of corporate wellness with seamless telemedicine services, personalized health resources, and a focus on overall employee vitality.`}
        />
        <div className="container">
          <div className={style.corporateImgContainer}>
            <div className={style.corporateImg}>
              <Image src={corportat1} alt="corportate-image" unoptimized />
              <div className={style.overlay}>
                <Text24 className={style.text}>Collaborations</Text24>
                <Text16 className={style.innerText}>
                  We believe collaboration enhances creativity, efficiency, and
                  problem-solving.
                </Text16>
              </div>
            </div>
            <div className={style.corporateImg}>
              <Image src={corportat2} alt="corportate-image" unoptimized />
              <div className={style.overlay}>
                <Text24 className={style.text}>Collaborations</Text24>
                <Text16 className={style.innerText}>
                  We believe collaboration enhances creativity, efficiency, and
                  problem-solving.
                </Text16>
              </div>
            </div>
            <div className={style.corporateImg}>
              <Image src={corportat3} alt="corportate-image" unoptimized />
              <div className={style.overlay}>
                <Text24 className={style.text}>Collaborations</Text24>
                <Text16 className={style.innerText}>
                  We believe collaboration enhances creativity, efficiency, and
                  problem-solving.
                </Text16>
              </div>
            </div>
          </div>
        </div>
        <Principle
          list={benifits}
          heading={"Benefits"}
          subHeading={"Why choose us?"}
        />
        <Plans />
        <ContactUs />
      </main>
    </>
  );
}
