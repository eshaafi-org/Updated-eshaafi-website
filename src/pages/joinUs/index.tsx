"use client";
import React, { useEffect } from "react";
import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import Lifeateshaafi from "./components/Lifeateshaafi";
import CurrentOpenings from "./components/Currentopening";
import JoinFamily from "./components/Joinimage";
import { trackEvent } from "@/lib/ga";

const JoinUsPage = () => {
  useEffect(() => {
    trackEvent('joinus_page_view_clk', {
      section: 'joinus'
    });
  }, []);

  return (
    <>
      <Hero />
      <Philosophy />
      <Lifeateshaafi />
      <CurrentOpenings/>
      <JoinFamily/>
    </>
  );
};

export default JoinUsPage;
