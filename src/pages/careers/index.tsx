import style from "@/styles/careers.module.scss";
import Head from "next/head";
import GetApp from "@/views/Home/GetApp";
import Hero from "@/views/Home/Hero";
// import Mission from "@/views/Home/Mission";
import Team from "@/views/Careers/Team";
import careerHero from "../../../public/images/careerHero.png";
import Principle from "@/views/Careers/Principle";
import Mantra from "@/views/Careers/Mantra";
import Jobs from "@/views/Careers/Jobs";

export default function Careers() {
  return (
    <>
      <Head>
        <title>eShaafi | Careers</title>
      </Head>
      <main>
        <Hero
          img={careerHero}
          heading={"Become a Member of eShaafi"}
          text={
            "Subscribe to our plans to avail discounts and exclusive offers"
          }
          link={{ name: "", link: "" }}
        />
        <div className="container">
          <p className={style.introText}>
            Guided by our unwavering mission to bring
            <span className="text-dark fw-bold"> Quality Healthcare </span>
            to Pakistan, eShaafi is dedicated to providing each patient with our
            undivided attention, listening to their concerns with utmost care
          </p>
        </div>
        <Team />
        <Principle />
        <Mantra />
        <Jobs />
        <GetApp color="#DFEAF2" />
      </main>
    </>
  );
}
