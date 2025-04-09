"use client";

import React, { useState, useEffect } from "react";
import paymentloader from "../../../public/paymentloader.json";
import dynamic from "next/dynamic";

const LottieAnimation = dynamic(() => import("../Animation/LottieAnimation"), {
  ssr: false,
});

const LottieLoading: React.FC = () => {
  return (
    <>
      <div className="content">
        <div className="animation-container">
          <LottieAnimation
            animationData={paymentloader}
            loop={true}
            autoplay={true}
          />
          <h1>Secure Payment</h1>
        </div>
        <p className="footer">© 2025 - eshaafi Application</p>
      </div>
      <style jsx>{`
        .content {
          padding: 40px 0 0;
          margin: 0 auto;
          max-width: 480px;
        }

        .animation-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        h1 {
          font-size: 20px;
          padding: 24px 0;
          font-weight: 600;
          color: #1c6ba4;
        }

        @media (min-width: 640px) {
          h1 {
            font-size: 28px;
            padding: 40px 0;
          }
        }
        .footer {
          margin-top: 16px;
          display: flex;
          justify-content: flex-end;
          font-size: 14px;
          color: #344054;
          font-weight: 400;
        }
      `}</style>
    </>
  );
};

export default LottieLoading;
