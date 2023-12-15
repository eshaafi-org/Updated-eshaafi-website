// Summary.js

import React from "react";
import styles from "../../styles/bookAppointment.module.scss";
import Button from "@/components/Button";

export default function Summary({
  plan,
  loading,
}: {
  plan: any;
  loading: boolean;
}) {
  console.log(plan)
  return (
    <section className={styles.summary}>
      <h1>Billing Summary</h1>
      <table>
        <tr>
          <th>Plan Name</th>
          <td>{plan?.calls} Call/1month</td>
        </tr>
        <tr>
          <th>Total</th>
          <td>Rs. {plan?.price}</td>
        </tr>
        <tr>
          <th>Payment Method</th>
          <td className="text-capitalize">Credit/Debit Card</td>
        </tr>
      </table>
      <Button variant="contained" className="font-bold">
        {loading ? "Loading..." : "Confirm Booking"}
      </Button>
    </section>
  );
}
