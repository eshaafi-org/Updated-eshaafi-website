"use client";
import { useEffect } from "react";
import Head from "next/head";
import GetApp from "@/views/Home/GetApp";
import LabsHero from "@/views/Labs/LabsHero";
import LabsList from "@/views/Labs/LabsList";
import PackagesList from "@/views/Labs/PackagesList";
import FQuest from "@/views/Doctor/FQuest";
import { labFAQs, whyBookWithUs } from "@/helper/FAQData";
import Works from "@/views/Labs/Works";
import UploadPrescription from "@/views/Labs/UploadPrescription";
import { useDispatch } from "react-redux";
import { getLabsHome } from "@/views/Labs/labsSlice";
import HelpLine from "@/views/Labs/HelpLine";

export default function Labs() {
  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(getLabsHome());
  }, []);
  return (
    <>
      <Head>
        <title>eShaafi | Labs</title>
      </Head>
      <main>
        <LabsHero
          heading="Get Upto 30% Discounts"
          text="Avail major discounts on both lab visits and home sampling with eShaafi"
        />
        <div style={{ paddingTop: "4rem", paddingBottom: "3rem" }}>
          <LabsList />
        </div>
        <UploadPrescription />
        <div style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
          <PackagesList />
        </div>
        <div style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
          <Works />
        </div>
        <div style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
          <HelpLine />
        </div>
        {/* <FQuest quests={whyBookWithUs} heading={"Why book with us?"} /> */}
        <div style={{ paddingTop: "2rem" }}>
          <FQuest quests={labFAQs} heading={"Frequently Asked Questions"} />
        </div>
        {/* <GetApp color="#DFEAF2" /> */}
      </main>
    </>
  );
}
