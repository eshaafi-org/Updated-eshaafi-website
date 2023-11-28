import styles from "../../../styles/appointments.module.scss";
import Link from "next/link";
import moment from "moment";
import Button from "@/components/Button";
import { useDispatch } from "react-redux";
export default function Summary({ summary, cancelAppointment, cancel }: any) {
  const dispatch = useDispatch();
  let currentTimestamp = Date.now();

  // Add 2 hours in milliseconds (2 hours * 60 minutes/hour * 60 seconds/minute * 1000 milliseconds/second)
  let newTimestamp = currentTimestamp + 2 * 60 * 60 * 1000;
  console.log(summary);
  const sendData = () => {
    dispatch({ type: "appointmentPageSlice/appointment", payload: summary });
  };
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
        summary?.appointment_status === "cancelled" ||
        summary?.appointment_status === "reschedule" ||
        cancel ||
        newTimestamp > moment(summary?.appoint_date).valueOf() || (
          <span className={styles.summaryBtn}>
            <Link
              href={`/doctors/${summary.doctorId}/reschedule`}
              onClick={sendData}
            >
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
                Reschedule
              </Button>
            </Link>
            <Button className={styles.cancelBtn} onClick={cancelAppointment}>
              Cancel Booking
            </Button>
          </span>
        )}
    </section>
  );
}
