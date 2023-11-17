import styles from "../../../styles/appointments.module.scss";

import moment from "moment";
import Button from "@/components/Button";
export default function Summary({ summary, cancelAppointment }: any) {
  return (
    <section className={styles.summary}>
      <div>
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
            <td className="text-capitalize">{summary?.paymentMethod}</td>
          </tr>
        </table>
      </div>
      <p className={styles.summaryText}>
        <span>
          {moment(summary?.appoint_date).format("dddd DD,MMM")}{" "}
          {moment(summary?.appoint_start_time, "HH:mm:ss").format("h:mm A")}
        </span>
        <span className="text-capitalize">
          {summary?.paymentMethod} Rs.{summary?.charges}{" "}
        </span>
      </p>
      {summary?.appointment_status === "missed" ||
        summary?.appointment_status === "completed" ||
        summary?.appointment_status === "cancelled" || (
          <span className={styles.summaryBtn}>
            <Button
              variant="contained"
              // onClick={() => {
              //   if (paymentId) {
              //     debugger;
              //     console.log(paymentId, "hel");
              //     handleBook(true);
              //   } else handleBook(false);
              // }}
              className="fw-bold"
              // disabled={!appointDate || !time ? true : false}
            >
              {/* {loading ? "Loading..." : "Confirm Booking"} */}
              Reschdule
            </Button>
            <Button className={styles.cancelBtn} onClick={cancelAppointment}>
              Cancel Booking
            </Button>
          </span>
        )}
    </section>
  );
}
