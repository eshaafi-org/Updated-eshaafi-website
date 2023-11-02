import React, { useState, useEffect } from "react";
import moment from "moment/moment";
import style from "../../styles/bookAppointment.module.scss";
import { FaCircleExclamation, FaCircleInfo } from "react-icons/fa6";

export default function Timer() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const deadline = moment().add(5, "minutes"); // Set the initial deadline to 5 minutes from now

  const getTime = () => {
    const currentTime = moment();
    const timeDifference = deadline.diff(currentTime, "milliseconds");
    if (timeDifference > 0) {
      const duration = moment.duration(timeDifference);
      setDays(Math.floor(duration.asDays()));
      setHours(duration.hours());
      setMinutes(duration.minutes());
      setSeconds(duration.seconds());
    } else {
      // Set all timer units to 0 when the timer is up
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    }
  };

  useEffect(() => {
    getTime(); // Initialize the timer

    // Start the countdown timer
    const timerInterval = setInterval(() => {
      getTime();
    }, 1000);

    return () => clearInterval(timerInterval); // Cleanup the interval on component unmount
  }, []); // Pass an empty dependency array

  return (
    <>
      {seconds > 0 || minutes > 0 || hours > 0 || days > 0 ? (
        <div
          className={
            "d-flex justify-content-center border rounded align-items-center col-gap-1 " +
            style.slotTimerContainer
          }
          role="timer"
          style={{ color: "#707683" }}
        >
          <p
            className={style.slotTimer}
            style={{
              color: minutes < 5 && hours === 0 ? "#ED0006" : "",
            }}
          >
            <FaCircleExclamation style={{ marginRight: 16 }} />
            <span> Slot is on hold for</span>
          </p>
          <div
            className={style.box}
            style={{
              color: minutes < 5 && hours === 0 ? "#ED0006" : "",
            }}
          >
            <span id="minute" style={{ marginBottom: 0 }}>
              {minutes < 10 ? "0" + minutes : minutes}
            </span>
            <span className={style.unit}>m</span>
          </div>

          <div
            className={style.box}
            style={{
              color: minutes < 5 && hours === 0 ? "#ED0006" : "",
            }}
          >
            <span id="second" style={{ marginBottom: 0 }}>
              {seconds < 10 ? "0" + seconds : seconds}
            </span>
            <span className={style.unit}>s</span>
          </div>
        </div>
      ) : (
        <div
          className={
            "d-flex justify-content-center border rounded align-items-center text col-gap-1 " +
            style.slotTimerContainer
          }
          role="timer"
          style={{ color: "#707683" }}
        >
          <p
            className={style.slotTimer}
            style={{
              color: minutes < 5 && hours === 0 ? "#F78022" : "",
            }}
          >
            <FaCircleInfo />
            <span> {`Time up! You can't book this slot anymore`}</span>
          </p>
        </div>
      )}
    </>
  );
}
