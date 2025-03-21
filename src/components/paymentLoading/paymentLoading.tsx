"use client";

import React, { useState, useEffect } from "react";
import paymentloader from "../../../public/paymentloader.json";
import dynamic from "next/dynamic";

const LottieAnimation = dynamic(() => import("../Animation/LottieAnimation"), {
  ssr: false,
});

interface LottieLoadingProps {
  transactionAmount: string;
  orderId: string;
}

const LottieLoading: React.FC<LottieLoadingProps> = ({
  transactionAmount,
  orderId,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(4 * 60 + 40); // 4 minutes, 40 seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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

        {/* Form Section */}
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="transaction-amount">Transaction Amount</label>
            <input
              type="text"
              id="transaction-amount"
              value={transactionAmount}
              disabled
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="order-id">Order ID</label>
            <input
              type="text"
              id="order-id"
              value={orderId}
              disabled
              className="form-input"
            />
          </div>
        </form>
        <p className="footer">© 2025 - eshaafi Application</p>
      </div>

      {/* CSS Styles */}
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

        .form {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          width: 100%;
        }

        .form-group label {
          display: block;
          color: #475467;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 6px;
        }

        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #d0d5dd;
          border-radius: 8px;
          outline: none;
          font-size: 16px;
          color: #667085;
          font-weight: 400;
          width: 480px;
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
