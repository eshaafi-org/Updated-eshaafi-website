//doctors List Page
import BenefitsOfVideoConsultation from "@/views/Doctor/VideoConsultation";
import FQuest from "@/views/Doctor/FQuest";
import DoctorGrid from "@/components/FindDoctors/DoctorGrid";
import { BASE_URL } from "@/helper/CONST";
import Head from "next/head";
import GetApp from "@/views/Home/GetApp";
import { doctbenifits } from "@/helper/FAQData";
// Renders the DoctorGrid, BenefitsOfVideoConsultation, and FQuest components
export default function Doctors({ doctors }: any) {
  return (
    <>
      <Head>
        <title>Eshaafi | Doctors</title>
        <meta name="description" content="Meet one on one with your doctor" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={"/favicon.ico"} />
      </Head>
      <main>
        <DoctorGrid doctors={doctors} />
        <BenefitsOfVideoConsultation />
        <FQuest quests={doctbenifits} heading={"Frequently Asked Questions"} />
        <GetApp color="#DFEAF2" />
      </main>
    </>
  );
}
export async function getStaticProps() {
  let response = await fetch(BASE_URL + "/patients/doctors/filter", {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "categroy",
      // search: "",
    }),
  });

  const docData = await response.json();
  console.log("docData", docData);
  return {
    props: {
      doctors: docData.response.Items.sort((a: any, b: any) => {
        if (a.isOnline && !b.isOnline) {
          return -1;
        } else if (!a.isOnline && b.isOnline) {
          return 1;
        } else {
          return 0;
        }
      }),
    },
    revalidate: 1,
  };
}
