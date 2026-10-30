//doctors List Page
import BenefitsOfVideoConsultation from "@/views/Doctor/VideoConsultation";
import FQuest from "@/views/Doctor/FQuest";
import DoctorGrid from "@/components/FindDoctors/DoctorGrid";
import { fetchAndSortDoctors, DoctorQueryPresets } from "@/helper/doctorApi";
import Head from "next/head";
import GetApp from "@/views/Home/GetApp";
import { doctbenifits } from "@/helper/FAQData";
import { useState } from "react";
// Renders the DoctorGrid, BenefitsOfVideoConsultation, and FQuest components
export default function Doctors({ doctors }: any) {
  const [videoCharges, setVideoCharges] = useState(
    doctors.length > 0 ? doctors[0].videoCallCharges : 499
  );

  return (
    <>
      <Head>
        <title>Eshaafi | Doctors</title>
        <meta name="description" content="Meet one on one with your doctor" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={"/favicon.ico"} />
      </Head>
      <main>
        <DoctorGrid doctors={doctors} excludeMentalHealth={true} />
        <BenefitsOfVideoConsultation />
        <FQuest quests={doctbenifits} heading={"Frequently Asked Questions"} />
        <GetApp color="#DFEAF2" />
      </main>
    </>
  );
}
export async function getStaticProps() {
  try {
    const doctors = await fetchAndSortDoctors(DoctorQueryPresets.allDoctors());

    return {
      props: {
        doctors,
      },
      revalidate: 1,
    };
  } catch (err) {
    return { props: { doctors: [] }, revalidate: 1 };
  }
}
