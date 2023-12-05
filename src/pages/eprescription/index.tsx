"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import { PageHeading } from "@/components/Typography";
import AddressBar from "@/components/AddressBar";
import style from "@/styles/eprescription.module.scss";
import axios from "axios";
import { BASE_URL, headers } from "@/helper/CONST";
import moment from "moment";
import { Text16, Text11 } from "@/components/Typography";
import Button from "@/components/Button";
// links
const links = [
  { name: "Home", link: "/" },
  { name: "E-prescription", link: "/eprescription" },
];
export default function Eprescription() {
  const [prescription, setPrescription] = useState([]);
  // get list
  const getList = () => {
    axios
      .get(BASE_URL + `/patients/prescription`, { headers: headers() })
      .then((res) => {
        setPrescription(res.data.response.Items);
        console.log(res.data.response.Items);
      })
      .catch((err) => console.log(err));
  };
  // use effect
  useEffect(() => {
    getList();
  }, []);
  return (
    <>
      <Head>
        <title>eShaafi | ePrescription</title>
      </Head>
      <main>
        <div className="container">
          <PageHeading>E-prescription</PageHeading>
          <AddressBar links={links} />
          <div className={style.eprescriptionSection}>
            <ul className={style.eprescriptionContainer}>
              {prescription.map((item: any, indx) => (
                <li key={indx} className={style.recordItem}>
                  <div className={style.date}>
                    <Text16>
                      {moment(item.prescription_date).format("MM,ddd")}
                    </Text16>
                    <Text11>
                      {moment(item.prescription_date).format("MMM, YYYY")}
                    </Text11>
                  </div>
                  <div className={style.profile}>
                    <Text11>{item.patientInfo.relation}</Text11>
                    <Text16>{item.patientInfo.name}</Text16>
                  </div>
                  <div className={style.time}>
                    <Text11>Time uploaded</Text11>
                    <Text16>{moment(item.prescription_date).fromNow()}</Text16>
                  </div>
                  <div className={style.attachments}>h</div>
                  <Button>View</Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
