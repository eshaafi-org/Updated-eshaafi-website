"use client";
import React, { useEffect, useState } from "react";
import styles from "../../styles/bookAppointment.module.scss";
import style from "../../styles/subscription.module.scss";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import axios from "axios";
import { headers } from "@/helper/CONST";
import Modal from "react-bootstrap/Modal";
import { Text18 } from "@/components/Typography";

export default function Summary({
  plan,
  loading,
  selectedMethod,
}: {
  plan: any;
  loading: boolean;
  selectedMethod: any;
}) {
  const router = useRouter();
  const { id } = router.query;
  const data = plan?.plansList.find((item: { pId: any }) => item.pId === id);
  const [pp_SecureHash, setSecureHash] = useState("");
  const [pp_TxnRefNo, setTxnRefNo] = useState("");
  const [show, setShow] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [idCardNumber, setIdCardNumber] = useState("");
  const showModal = () => setShow(true);
  useEffect(() => {
    // Example parameters (replace with actual values)
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, "");
    const pp_MerchantID = "00302074";
    const pp_Password = "z583y3x095";
    const pp_TxnRefNo = `T${timestamp}SUB`;
    const pp_Amount = "100";

    // Concatenate parameter values
    const concatenatedString = `${pp_MerchantID}${pp_Password}${pp_TxnRefNo}${pp_Amount}`;

    // Add secret key
    const secretKey = "your_secret_key";
    const concatenatedStringWithKey = `${concatenatedString}${secretKey}`;

    // Generate SHA-256 hash using crypto library
    const crypto = require("crypto");
    const hash = crypto
      .createHash("sha256")
      .update(concatenatedStringWithKey)
      .digest("hex");

    // Set the generated hash in state
    setTxnRefNo(pp_TxnRefNo);
    setSecureHash(hash);
  }, []);

  const handleSubscribe = async () => {
    // If the selectedMethod is not "Jazz Cash", proceed with the default payment URL
    const paymentUrl = `https://eshaafi.com/payment.html?handshake=${id}&paymentFee=${data?.charges}`;
    window.location.href = paymentUrl;
  };
  const handleJazzCash = () => {
    const currentDate = new Date();
    const formattedCurrentDate = new Date()
      .toISOString()
      .replace(/[^0-9]/g, "");

    const expiryDate = new Date(currentDate.getTime() + 60 * 60 * 1000); // 1 hour in milliseconds
    const formattedExpiryDate = expiryDate.toISOString().replace(/[^0-9]/g, "");

    // Ensure the Jazz Cash API endpoint URL is correct and accessible
    const apiUrl =
      "https://payments.jazzcash.com.pk/ApplicationAPI/API/2.0/Purchase/DoMWalletTransaction";

    // Use the correct field names and update the request payload
    const requestData = {
      pp_Amount: "100",
      pp_BillReference: "billRef",
      pp_Description: "Description",
      pp_Language: "EN",
      pp_CNIC: "021997",
      pp_MerchantID: "00302074",
      pp_MobileNumber: "03008835072",
      pp_Password: "z583y3x095",
      pp_ProductID: null,
      pp_TxnCurrency: "PKR",
      pp_SecureHash: pp_SecureHash,
      pp_TxnDateTime: formattedCurrentDate,
      pp_TxnExpiryDateTime: formattedExpiryDate,
      pp_TxnRefNo: pp_TxnRefNo,
    };

    // Update the headers to include Accept and Content-Type
    const requestHeaders = {
      Accept: "application/json",
      ...headers(),
    };

    // Perform the Axios POST request
    axios
      .post(apiUrl, requestData, { headers: requestHeaders })
      .then((response) => {
        console.log("Jazz Cash API Response:", response.data);
        // Handle the response data accordingly
      })
      .catch((error) => {
        console.error("Jazz Cash API Error:", error);
        // Handle the error or log more details for debugging
      });
  };

  return (
    <section className={styles.summary}>
      <h1>Billing Summary</h1>
      <table>
        <tr>
          <th>Plan Name</th>
          <td>
            {data?.noOfCalls} Call/{data?.planCategory}
          </td>
        </tr>
        <tr>
          <th>Total</th>
          <td>Rs. {data?.charges}</td>
        </tr>
        <tr>
          <th>Payment Method</th>
          <td className="text-capitalize">{selectedMethod}</td>
        </tr>
      </table>
      <Button
        variant="contained"
        className="font-bold"
        onClick={selectedMethod === "Jazz Cash" ? showModal : handleSubscribe}
      >
        {loading ? "Loading..." : "Subscribe Plan"}
      </Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <div className="d-flex flex-column p-3">
          <h2>Jazz Cash Payment</h2>
          <Text18 className="pt-4">Jazz Cash mobile account number</Text18>
          <input
            type="text"
            id="mobileNumber"
            placeholder="03000000000"
            className={`${style.field} p-2 rounded`}
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
          <Text18 className="pt-2">CNIC number</Text18>
          <input
            type="text"
            id="idCardNumber"
            placeholder="3440258888871"
            className={`${style.field} p-2 rounded`}
            value={idCardNumber}
            onChange={(e) => setIdCardNumber(e.target.value)}
          />
          <Button className="mt-4" onClick={handleJazzCash}>
            Make Payment
          </Button>
        </div>
      </Modal>
    </section>
  );
}
