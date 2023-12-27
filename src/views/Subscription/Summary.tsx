// Summary.js

import React from "react";
import styles from "../../styles/bookAppointment.module.scss";
import Button from "@/components/Button";

export default function Summary({
  plan,
  loading,
  selectedMethod ,
}: {
  plan: any;
  loading: boolean;
  selectedMethod : any;
}) {
  const data = plan;
  console.log(data)
  return (
    <section className={styles.summary}>
      <h1>Billing Summary</h1>
      <table>
        <tr>
          <th>Plan Name</th>
          <td>{data?.noOfCalls} Call/1month</td>
        </tr>
        <tr>
          <th>Total</th>
          <td>Rs. {data?.charges}</td>
        </tr>
        <tr>
          <th>Payment Method</th>
          {/* <td className="text-capitalize">Credit/Debit Card</td> */}
          <td className="text-capitalize">{selectedMethod}</td>
        </tr>
      </table>
      <Button variant="contained" className="font-bold">
        {loading ? "Loading..." : "Subscribe Plan"}
      </Button>
    </section>
  );
}
