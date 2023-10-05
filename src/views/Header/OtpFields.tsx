import React, { useEffect, useState, useRef } from "react";
import style from "./Header.module.scss";
// import Button from "react-bootstrap/Button";
import Button from "@/components/Button";
import Timer from "./Timer";
interface OtpValues {
  otp1?: string;
  otp2?: string;
  otp3?: string;
  otp4?: string;
  otp5?: string;
  otp6?: string;
}
interface OtpFieldsProps {
  verifyLoading: boolean;
  getVarified: any;
  otpError: boolean;
  setStates: any;
  getOtp: any;
}
const Otpinput: React.FC<OtpFieldsProps> = ({
  verifyLoading,
  getVarified,
  otpError,
  setStates,
  getOtp,
}) => {
  const [otpValues, setOtpValues] = useState<OtpValues>({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  });
  const inputRef = useRef(null);
  const handleChange = (
    valueKey: keyof OtpValues,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOtpValues({ ...otpValues, [valueKey]: event.target.value.slice(0, 1) });
    setStates({ type: "OTP_ERROR_FALSE" });
    if (event.target.value) {
      event.target.style.border = "2px solid #0e5487";
    } else {
      event.target.style.border = "2px solid #feeeee";
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getVarified(otpValues);
  };

  const inputfocus = (elmnt: React.KeyboardEvent<HTMLInputElement>) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.currentTarget.tabIndex - 2;
      if (next > -1) {
        const elements = (elmnt.target as HTMLInputElement).form!.elements;
        if (elements[next] instanceof HTMLInputElement) {
          (elements[next] as HTMLInputElement).focus();
        }
      }
    } else {
      const next = elmnt.currentTarget.tabIndex;
      if (next < 6) {
        const elements = (elmnt.target as HTMLInputElement).form!.elements;
        if (elements[next] instanceof HTMLInputElement) {
          (elements[next] as HTMLInputElement).focus();
        }
      }
    }
  };
  const numInputs = 6; // Number of OTP input fields
  const handleValues = () => {
    return true;
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm-h-70 p-1  mb-1">
      <div>
        <div className="flex col-gap-1 justify-center ">
          {Array.from({ length: numInputs }, (_, index) => (
            <input
              key={index}
              name={`otp${index + 1}`}
              type="number"
              autoComplete="off"
              className={`${style.otpField} ${otpError ? style.otpError : ""}`}
              value={Object.values(otpValues)[index]}
              onChange={(e) =>
                handleChange(`otp${index + 1}` as keyof OtpValues, e)
              }
              tabIndex={index + 1}
              maxLength={1}
              onKeyUp={inputfocus}
              autoFocus={index === 0 ? true : false}
              onFocus={(e) => e.target.select()}
            />
          ))}
        </div>
        {otpError && (
          <span style={{ marginTop: "1rem" }}>
            <p style={{ color: "#B00020", textAlign: "center" }}>
              Incorrect OTP
            </p>
          </span>
        )}
        <Timer getOtp={getOtp} />
      </div>
      <Button
        className="mt-1 sm-mt-10"
        type="submit"
        variant="contained"
        disabled={
          otpValues.otp1 &&
          otpValues.otp2 &&
          otpValues.otp3 &&
          otpValues.otp4 &&
          otpValues.otp5 &&
          otpValues.otp6
            ? false
            : true
        }
      >
        {verifyLoading ? "Verifying..." : "Continue"}
      </Button>
    </form>
  );
};

export default Otpinput;
