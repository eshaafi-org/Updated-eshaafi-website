// // Summary.js

// import React from "react";
// import styles from "../../styles/bookAppointment.module.scss";
// import Button from "@/components/Button";
// import { useRouter } from "next/router";

// export default function Summary({
//   plan,
//   loading,
//   selectedMethod,
// }: {
//   plan: any;
//   loading: boolean;
//   selectedMethod: any;
// }) {
//   const router = useRouter();
//   const { id } = router.query;
//   const data = plan?.plansList.find((item: { pId: any }) => item.pId === id);
//   const handleSubscribe = () => {
//     // Construct the payment URL with parameters
//     const paymentUrl = `https://eshaafi.com/payment.html?handshake=${id}&paymentFee=${data?.charges}`;
//     // Redirect to the payment page
//     window.location.href = paymentUrl;
//   };
//   return (
//     <section className={styles.summary}>
//       <h1>Billing Summary</h1>
//       <table>
//         <tr>
//           <th>Plan Name</th>
//           <td>{data?.noOfCalls} Call/{data?.planCategory}</td>
//         </tr>
//         <tr>
//           <th>Total</th>
//           <td>Rs. {data?.charges}</td>
//         </tr>
//         <tr>
//           <th>Payment Method</th>
//           {/* <td className="text-capitalize">Credit/Debit Card</td> */}
//           <td className="text-capitalize">{selectedMethod}</td>
//         </tr>
//       </table>
//       <Button variant="contained" className="font-bold" onClick={handleSubscribe}>
//         {loading ? "Loading..." : "Subscribe Plan"}
//       </Button>
//     </section>
//   );
// }

import React from "react";
import styles from "../../styles/bookAppointment.module.scss";
import Button from "@/components/Button";
import { useRouter } from "next/router";

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

  const handleSubscribe = async () => {
    if (selectedMethod === "Jazz Cash") {
      try {
        const jazzCashApiUrl =
          "https://payments.jazzcash.com.pk/ApplicationAPI/API/2.0/Purchase/DoMWalletTransaction";

        const response = await fetch(jazzCashApiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ppAmount: data?.charges,
            ppBillReference: "billRef",
            ppDescription: "Description",
            ppLanguage: "EN",
            ppCNIC: "021997",
            ppMerchantID: "00302074",
            ppMobileNumber: "03008835072",
            ppPassword: "z583y3x095",
            ppProductID: id,
            ppTxnCurrency: "PKR",
            ppSecureHash: "", // Include the actual secure hash value
            ppTxnDateTime: "", // Include the actual transaction date and time
            ppTxnExpiryDateTime: "", // Include the actual transaction expiry date and time
            ppTxnRefNo: "T2312280436131213PTD",
          }),
        });

        if (response.ok) {
          // Handle successful response (optional)
          const jsonResponse = await response.json();
          console.log("JazzCash API call success:", jsonResponse);
        } else {
          // Handle error response (optional)
          console.error("JazzCash API call failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error in JazzCash API call:", error);
      }
    } else {
      // If the selectedMethod is not "Jazz Cash", proceed with the default payment URL
      const paymentUrl = `https://eshaafi.com/payment.html?handshake=${id}&paymentFee=${data?.charges}`;
      window.location.href = paymentUrl;
    }
  };

  return (
    <section className={styles.summary}>
      <h1>Billing Summary</h1>
      <table>
        <tr>
          <th>Plan Name</th>
          <td>{data?.noOfCalls} Call/{data?.planCategory}</td>
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
        onClick={handleSubscribe}
      >
        {loading ? "Loading..." : "Subscribe Plan"}
      </Button>
    </section>
  );
}
