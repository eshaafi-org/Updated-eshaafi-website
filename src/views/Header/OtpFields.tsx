import React, { useState } from "react";
import style from "./Header.module.scss";
// import Button from "react-bootstrap/Button";
import Button from "@/components/Button";
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
}
const Otpinput: React.FC<OtpFieldsProps> = ({ verifyLoading, getVarified }) => {
  const [otpValues, setOtpValues] = useState<OtpValues>({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  });

  const handleChange = (
    valueKey: keyof OtpValues,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOtpValues({ ...otpValues, [valueKey]: event.target.value });
    if (event.target.value) {
      event.target.style.border = "2px solid #0e5487";
    } else event.target.style.border = "2px solid #feeeee";
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(otpValues);
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

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col row-gap-2 sm-h-70 p-1 sm-justify-between"
    >
      <div className="flex col-gap-1 justify-center ">
        {Array.from({ length: numInputs }, (_, index) => (
          <input
            key={index}
            name={`otp${index + 1}`}
            type="text"
            autoComplete="off"
            className={style.otpField}
            // value={otpValues[`otp${index + 1}`]}
            onChange={(e) =>
              handleChange(`otp${index + 1}` as keyof OtpValues, e)
            }
            tabIndex={index + 1}
            maxLength={1}
            onKeyUp={inputfocus}
          />
        ))}
      </div>
      <Button className="" type="submit" variant="contained">
        {verifyLoading ? "Verifying..." : "Continue"}
      </Button>
    </form>
  );
};

export default Otpinput;
