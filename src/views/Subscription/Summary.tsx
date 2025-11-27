"use client";
import styles from "../../styles/bookAppointment.module.scss";
import Button from "@/components/Button";
import { useRouter } from "next/router";

export default function Summary({
  plan,
  loading,
}: {
  plan: any;
  loading: boolean;
}) {
  const router = useRouter();
  const { id } = router.query;
  const data = plan?.plansList.find((item: { pId: any }) => item.pId === id);

  // geanrate Random ID for Dabit Card Payment 
  function debitId() {
    const prefix = "SUB2";
    const randomChars = Array.from({ length: 4 }, () => String.fromCharCode(Math.floor(Math.random() * (90 - 65 + 1)) + 65)).join("");
    const randomNumbers = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
    return `${prefix}-${randomChars}-${randomNumbers}`;
  }
  // Debit card payment method
  const handleSubscribe = async () => {
    // Call the debitId function to get a unique ID
    const handshakeId = debitId(); // This calls the function and stores the return value in handshakeId
    const paymentUrl = `https://paypro.eshaafi.com/?handshake=${handshakeId}&paymentFee=${data?.charges}`;
    window.location.href = paymentUrl; // Redirects the user to the payment URL with the unique ID and payment fee
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
          <td className="text-capitalize">{"JazzCash / EasyPaisa / Debit Card / PayPro"}</td>
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
