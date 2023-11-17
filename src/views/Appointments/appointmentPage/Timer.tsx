"use client";
import { useState, useEffect } from "react";
import moment from "moment/moment";
// import Button from "@/components/Button";
import style from "../../../styles/appointments.module.scss";
export default function Timer({ appointment }: any) {
  //   let { timer, box, clock, unit } = style;
  let [call, setCall] = useState(true);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  let deadline = appointment?.appoint_date;
  const getTime = () => {
    if (moment(deadline).valueOf() > Date.now()) {
      setCall(true);
      const time = moment(deadline).valueOf() - Date.now();
      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    } else setCall(false);
  };
  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);
    return () => clearInterval(interval);
  }, [appointment]);

  return (
    <div
      className={style.consultationTimer}
      style={{ background: !call ? "#D7DDEA" : "#009B94" }}
    >
      {call ? (
        <div className={style.timer} role="timer">
          <div className={style.box}>
            <p id="day" style={{ marginBottom: 0 }} className={style.clock}>
              {days < 10 ? "0" + days : days}
            </p>
            <span className={style.unit}>D</span>
          </div>
          <div className={style.box}>
            <p id="hour" className={style.clock} style={{ marginBottom: 0 }}>
              {hours < 10 ? "0" + hours : hours}
            </p>
            <span className={style.unit}>h</span>
          </div>

          <div
            className={style.box}
            style={{
              color: hours === 0 && minutes < 5 ? "#B00020" : "",
            }}
          >
            <p id="minute" className={style.clock} style={{ marginBottom: 0 }}>
              {minutes < 10 ? "0" + minutes : minutes}
            </p>
            <span className={style.unit}>m</span>
          </div>
          <div
            className={style.box}
            style={{
              color: hours === 0 && minutes < 5 ? "#B00020" : "#fff",
            }}
          >
            <p id="second" className={style.clock} style={{ marginBottom: 0 }}>
              {seconds < 10 ? "0" + seconds : seconds}
            </p>
            <span className={style.unit}>s</span>
          </div>
        </div>
      ) : (
        <p style={{ color: "#009b94" }}>Doctor Will Call You Shortly</p>
      )}
    </div>
  );
}
