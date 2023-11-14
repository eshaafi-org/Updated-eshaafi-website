import styles from "../../styles/bookAppointment.module.scss";
import Button from "@/components/Button";
import moment from "moment";
export default function Summary({
  doc,
  appointDate,
  time,
  handleBook,
  method,
  loading,
  paymentId,
  paymentScreen,
}: {
  doc: any;
  appointDate: any;
  time: string;
  handleBook: any;
  method: any;
  loading: boolean;
  paymentId: string;
  paymentScreen: boolean;
}) {
  return (
    <section className={styles.summary}>
      <h1>Appointment Summary</h1>
      <table>
        <tr>
          <th>Fee in Pkr</th>
          <td>{doc?.videoCallCharges} Rs.</td>
        </tr>
        <tr>
          <th>Date</th>
          <td>
            {appointDate ? moment(appointDate).format("dddd DD,MMM") : "-"}
          </td>
          {/* <td>{appointDate}</td> */}
        </tr>
        <tr>
          <th>Time</th>
          <td>{time ? moment(time, "HH:mm:ss").format("h:mm A") : "-"}</td>
        </tr>
        <tr>
          <th>Payment Method</th>
          <td>{method}</td>
        </tr>
      </table>
      <p className={styles.reviewTotalText}>
        <span>
          {appointDate
            ? moment(appointDate).format("dddd DD,MMM")
            : "Select Date "}{" "}
          {time ? moment(time, "HH:mm:ss").format("h:mm A") : " Select Time"}
        </span>
        <span>{doc?.videoCallCharges} Rs.</span>
      </p>
      <Button
        variant="contained"
        onClick={() => {
          handleBook(paymentScreen);
        }}
        className="font-bold"
        disabled={!appointDate || !time ? true : false}
      >
        {loading ? "Loading..." : "Confirm Booking"}
      </Button>
    </section>
  );
}
