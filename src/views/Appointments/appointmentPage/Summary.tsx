import styles from "../../../styles/bookAppointment.module.scss";
import moment from "moment";
import Button from "@/components/Button";
export default function Summary({ summary }: any) {
  return (
    <section className={styles.summary}>
      <h1>Appointment Summary</h1>
      <table>
        <tr>
          <th>Fee in Pkr</th>
          <td>{summary?.charges} Rs.</td>
        </tr>
        <tr>
          <th>Date</th>
          <td>{moment(summary?.appoint_date).format("dddd DD,MMM")}</td>
        </tr>
        <tr>
          <th>Time</th>
          <td>
            {moment(summary?.appoint_start_time, "HH:mm:ss").format("h:mm A")}
          </td>
        </tr>
        <tr>
          <th>Payment Method</th>
          <td className="capitalize">{summary?.paymentMethod}</td>
        </tr>
      </table>
      {/* <span className="flex col-gap-1">
        <Button
          variant="contained"
          onClick={() => {
            if (paymentId) {
              debugger;
              console.log(paymentId, "hel");
              handleBook(true);
            } else handleBook(false);
          }}
          className="font-bold"
          disabled={!appointDate || !time ? true : false}
        >
          {loading ? "Loading..." : "Confirm Booking"}
          Reschdule
        </Button>
        <Button>Cancel Booking</Button>
      </span> */}
    </section>
  );
}
