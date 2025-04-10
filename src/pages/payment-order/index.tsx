"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Stores from "@/views/Home/Stores";
import styles from "@/styles/payment.module.scss";
import moment from "moment";
import Link from "next/link";
import Animation from "../../../public/images/Animation.json";
import Animation1 from "../../../public/images/Animation1.json";
import dynamic from "next/dynamic";
import { BASE_URL } from "@/helper/CONST";

const LottieAnimation = dynamic(
  () => import("@/components/Animation/LottieAnimation"),
  { ssr: false }
);

export default function Index() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState<any>(null);
  const [paymentStatus, setPaymentStatus] = useState<
    "success" | "error" | "pending"
  >("pending");

  useEffect(() => {
    const verifyPayment = async () => {
      const status = searchParams.get("status");
      const ordId = searchParams.get("ordId");

      if (!ordId || !status) {
        setPaymentStatus("error");
        return; // no setLoading(false) here
      }

      const session = localStorage.getItem("paymentSession");
      if (!session) {
        // console.error("No payment session found in localStorage");
        setPaymentStatus("error");
        return; // no setLoading(false) here
      }

      const parsedSession = JSON.parse(session);
      setSessionData(parsedSession);

      const payload = {
        appointment_id: parsedSession.appointmentId,
        slot_id: parsedSession.activeSlotId,
      };

      try {
        const response = await fetch(`${BASE_URL}/new/pay-order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const result = await response.json();
        // console.log("API Response:", result);

        if (
          status === "Success" &&
          result?.message === "Success" &&
          result?.response?.message === "Transaction marked as paid"
        ) {
          setPaymentStatus("success");
        } else {
          setPaymentStatus("error");
        }
      } catch (err) {
        // console.error("Error during payment verification", err);
        setPaymentStatus("error");
      }

      setLoading(false); // ✅ final place after all checks
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <div className={styles["payment-wrapper"]}>
      <div className={styles["payment-content"]}>
        {loading ? (
          <div className="space-y-4">
            <p className="text-blue-600 font-semibold">
              Verifying your payment...
            </p>
          </div>
        ) : paymentStatus === "error" ? (
          <div className={styles["payment-error"]}>
            <LottieAnimation animationData={Animation1} loop={false} autoplay />
            <h1 className={styles["payment-heading"]}>Booking error!</h1>
            <p className={styles["payment-time"]}>
              {sessionData?.appointDate
                ? moment(sessionData.appointDate).format("dddd DD, MMM")
                : "No date available"}{" "}
              |{" "}
              {sessionData?.timestamp
                ? moment(sessionData.timestamp).format("h:mm A")
                : "-"}
            </p>
            <p className={styles["payment-note"]}>
              To Attend Consultation Download the eShaafi App
            </p>
            <div className={styles["store-wrapper"]}>
              <Stores />
            </div>
            <p className={styles["payment-note"]}>
              or for more info see{" "}
              <Link href="/" className={styles["payment-link"]}>
                Appointment Detail
              </Link>
            </p>
          </div>
        ) : (
          <div className={styles["payment-success"]}>
            <LottieAnimation animationData={Animation} loop={false} autoplay />
            <h1
              className={styles["payment-heading"]}
              style={{ color: "#40C175" }}
            >
              Booking successful!
            </h1>
            <p className={styles["payment-time"]}>
              {sessionData?.appointDate
                ? moment(sessionData.appointDate).format("dddd DD, MMM")
                : "Tuesday 12th"}
              |{" "}
              {sessionData?.timestamp
                ? moment(sessionData.timestamp).format("h:mm A")
                : "10:30am"}
            </p>
            <p className={styles["payment-note"]}>
              To Attend Consultation Download the eShaafi App
            </p>
            <div className={styles["store-wrapper"]}>
              <Stores />
            </div>
            <p className={styles["payment-note"]}>
              or for more info see{" "}
              <Link href="/" className={styles["payment-link"]}>
                Appointment Detail
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
