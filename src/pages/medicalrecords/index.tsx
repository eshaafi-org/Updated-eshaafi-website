import style from "@/styles/medicalRecords.module.scss";
import { useState, useEffect } from "react";
// import { useEffectOnce } from "react-use";
import Head from "next/head";
import Profiles from "@/components/Profiles";
import { PageHeading } from "@/components/Typography/Heading";
import AddressBar from "@/components/AddressBar";
import AddRecords from "@/views/MedicalRecords/AddRecords";
import axios from "axios";
import { BASE_URL, headers } from "@/helper/CONST";
import RecordTable from "@/views/MedicalRecords/MedicalRecords/RecordTable";
// linkst
const links = [
  { name: "Home", link: "/" },
  {
    name: "Medical Records",
    link: "/medicalrecords",
  },
];
export default function MedicalRecord() {
  const [patient, setPatient] = useState({ patientId: "" });
  const [records, setRecords] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  // geting records
  const getMedicalRecords = () => {
    if (patient.patientId) {
      axios
        .get(
          BASE_URL +
            `/patients/medicalHistory?date=All&record_for=${patient.patientId}`,
          { headers: headers() }
        )
        .then((res) => {
          setRecords(res.data.response.data.Items);
          console.log(res.data.response.data.Items);
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .get(BASE_URL + `/patients/medicalHistory`, { headers: headers() })
        .then((res) => {
          setRecords(res.data.response.data.Items);
        })
        .catch((error) => console.log(error));
    }
  };
  // delete a single record list
  const deleteSingleListRecord = (id: string, recordId: string) => {
    axios
      .delete(
        BASE_URL + `/appointment/${"eShaafi"}/shareMedicalRecord/${recordId}`,
        {
          headers: headers(),
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    // setRecords((prev: any) =>
    //   prev.filter((item: any) => item?.appointmentId !== id)
    // );
  };
  useEffect(() => {
    getMedicalRecords();
  }, [patient]);
  return (
    <>
      <Head>
        <title>Eshaafi | Medical Records</title>
        <meta name="description" content="Meet one on one with your doctor" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={"/favicon.ico"} />
      </Head>
      <main style={{ overflowX: "hidden" }}>
        <section className="container">
          <div className={style.medicalRecordContainer}>
            <div className="d-flex flex-column row-gap-1">
              <PageHeading content={"Medical Records"} />
              <AddressBar links={links} />
            </div>
            <Profiles patient={patient} setPatient={setPatient} />
            <AddRecords />
            <RecordTable
              record={records}
              deleteRecord={deleteSingleListRecord}
            />
          </div>
        </section>
      </main>
    </>
  );
}
