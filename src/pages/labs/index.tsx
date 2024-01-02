import Head from "next/head";
import GetApp from "@/views/Home/GetApp";
import Hero from "@/views/Home/Hero";
import LabsCover from "../../../public/images/labsIcon.png";
import LabsList from "@/views/Labs/LabsList";
import PackagesList from "@/views/Labs/PackagesList";
export default function Labs() {
  return (
    <>
      <Head>
        <title>eShaafi | Labs</title>
      </Head>
      <main>
        <Hero
          img={LabsCover}
          heading="Get Upto 30% Discounts"
          text="Avail major discounts on both lab visits and home sampling with eShaafi"
          link=""
        />
        <LabsList />
        <PackagesList />
        <GetApp color="#DFEAF2" />
      </main>
    </>
  );
}
