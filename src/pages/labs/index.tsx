"use client";
import { useEffect } from "react";
import Head from "next/head";
import GetApp from "@/views/Home/GetApp";
import Hero from "@/views/Home/Hero";
import LabsCover from "../../../public/images/labImage.png";
import LabsList from "@/views/Labs/LabsList";
import PackagesList from "@/views/Labs/PackagesList";
import FQuest from "@/views/Doctor/FQuest";
import { labFAQs, whyBookWithUs } from "@/helper/FAQData";
import Works from "@/views/Labs/Works";
import UploadPrescription from "@/views/Labs/UploadPrescription";
import { useDispatch } from "react-redux";
import { getLabsHome } from "@/views/Labs/labsSlice";

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
        <Hero
          img={LabsCover}
          heading="Get Upto 25% Discounts"
          text="Avail major discounts on both lab visits and home sampling with eShaafi"
          link=""
        />
        <LabsList />
        <UploadPrescription />
        <PackagesList />
        <Works />
        <FQuest quests={whyBookWithUs} heading={"Why book with us?"} />
        <FQuest quests={labFAQs} heading={"Frequently Asked Questions"} />
        <GetApp color="#DFEAF2" />
      </main>
    </>
  );
}
