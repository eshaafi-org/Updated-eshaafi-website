import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
export default function Timer({ getOtp }: any) {
  const [seconds, setSeconds] = useState(60); // Start with 60 seconds
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: any;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    if (seconds === 0) {
      setIsActive(false); // Stop the timer when it reaches 0
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, seconds]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <>
      {isActive ? (
        <div role="timer" className="d-flex w-100 justify-content-center mt-3">
          <div>
            <p id="minute">{minutes < 10 ? "0" + minutes : minutes}</p>
          </div>
          :
          <div>
            <p id="second">
              {remainingSeconds < 10
                ? "0" + remainingSeconds
                : remainingSeconds}
            </p>
          </div>
        </div>
      ) : (
        <div
          role="timer"
          className="d-flex w-100 justify-content-center align-items-center flex-column mt-3"
        >
          <span className="d-flex align-items-center">
            <p className="m-0">{`Didn't Reciev Code?`}</p>
            <Button
              className="underline"
              onClick={() => {
                getOtp();
                setSeconds(60);
                setIsActive(true);
              }}
            >
              Request Again
            </Button>
          </span>
          <p>00:00</p>
        </div>
      )}
    </>
  );
}
