//doctors List Page
import BenefitsOfVideoConsultation from "@/views/Doctor/VideoConsultation";
import FQuest from "@/views/Doctor/FQuest";
import DoctorList from "@/views/Doctor/DoctorsList";
import { BASE_URL } from "@/helper/CONST";
import Head from "next/head";
// Fetches a list of doctors with the specialization "General Physician" from the API
// async function getDoctors() {
//   const res = await fetch(
//     BASE_URL + "/patients/doctors/filter",

//     {
//       cache: "no-cache",
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         type: "specialization",
//         search: "General Physician",
//       }),
//     }
//   );

//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

// Renders the DoctorList, BenefitsOfVideoConsultation, and FQuest components
export default function Doctors({ doctors }: any) {
  // const doctors = await getDoctors();

  return (
    <>
      <Head>
        <title>Eshaafi | Doctors</title>
        <meta name="description" content="Meet one on one with your doctor" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={"/favicon.ico"} />
      </Head>
      <main>
        <DoctorList list={doctors} />
        <BenefitsOfVideoConsultation />
        <FQuest />
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
      type: "specialization",
      search: "General Physician",
    }),
  });

  const docData = await response.json();
  return {
    props: {
      doctors: docData.response.Items,
    },
    revalidate: 1,
  };
}
