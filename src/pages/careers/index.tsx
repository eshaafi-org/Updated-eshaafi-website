import Head from "next/head";
import GetApp from "@/views/Home/GetApp";
import Hero from "@/views/Home/Hero";
import Mission from "@/views/Home/Mission";
export default function Careers() {
  return (
    <>
      <Head>
        <title>eShaafi | Careers</title>
      </Head>
      <main>
        <Hero />
        <Mission />
        <GetApp color="#DFEAF2" />
      </main>
    </>
  );
}
