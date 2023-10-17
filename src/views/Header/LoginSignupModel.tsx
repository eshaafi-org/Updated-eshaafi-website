import { useReducer, useState, FormEvent, useRef } from "react";
import axios from "axios";
import { BASE_URL, headers } from "@/helper/CONST";
import style from "./Header.module.scss";
import Button from "@/components/Button";
import { InputField } from "@/components/InputField";
import { FaX, FaChevronLeft } from "react-icons/fa6";
import Otpinput from "./OtpFields";
import { Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import inputField from "@/components/InputField/Input.module.scss";

// reducer
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "OTP_LOADING_TRUE": {
      return {
        ...state,
        otpLoading: true,
        phoneNum: action.payload,
        otpError: false,
      };
    }
    case "OTP_LOADING_FALSE": {
      return {
        ...state,
        otpLoading: false,
        phoneNum: action.payload,
        otpError: false,
      };
    }
    case "VERI_LOADING": {
      return {
        ...state,
        verifyLoading: !state.verifyLoading,
      };
    }
    case "VERI_ERROR": {
      return {
        ...state,
        verifyLoading: false,
        otpError: true,
      };
    }
    case "PROFILE_LOADING": {
      return {
        ...state,
        profileLoading: !state.profileLoading,
      };
    }
    case "OTP_ERROR_FALSE": {
      return {
        ...state,
        otpError: false,
      };
    }
    default: {
      return {
        ...state,
        [action.target.name]: action.target.value,
      };
    }
  }
};
// model
export const Model = ({
  page = "login",
  setShowModal,
  userAuth,
}: {
  page: string;
  setShowModal: any;
  userAuth: any;
}) => {
  const myInputRef = useRef<HTMLInputElement | null>(null);
  const [modelStates, setStates] = useReducer(reducer, {
    phoneNum: "",
    otpLoading: false,
    verifyLoading: false,
    profileLoading: false,
    otpError: false,
  });
  const { phoneNum, otpLoading, verifyLoading, profileLoading, otpError } =
    modelStates;
  const [otp, setOtp] = useState<boolean>(false);
  const [profile, setProfile] = useState<boolean>(false);
  // function for handling static window, so user can't move
  const close = () => {
    document.body.style.overflow = "auto";
    setShowModal(false);
  };
  // get otp
  const getOtp = (e: any) => {
    // e.preventDefault();
    if (e) {
      setStates({ type: "OTP_LOADING_TRUE" });
    }
    axios
      .post(BASE_URL + "/auth/sendOtp", {
        phone_no: `+92${e ? e.phone_no : phoneNum}`,
        type: 1,
        os_name: "web",
      })
      .then((res) => {
        setStates({
          type: "OTP_LOADING_FALSE",
          payload: e ? e.phone_no : phoneNum,
        });
        if (e) {
          setOtp(true);
        }
      })
      .catch((err) => {
        setStates({ type: "OTP_LOADING_FALSE" });
        console.error(err);
      });
  };
  // verified otp
  const getVarified = (values: any) => {
    setStates({ type: "VERI_LOADING" });
    let { otp1, otp2, otp3, otp4, otp5, otp6 } = values;
    let code = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
    axios
      .post(BASE_URL + "/auth/verifyOtp", {
        phone_no: "+92" + phoneNum,
        code: code,
        type: 1,
      })
      .then((res) => {
        setStates({ type: "VERI_LOADING" });
        localStorage.setItem("user", JSON.stringify(res.data.response));
        return res.data.response;
        // userAuth(res.data.response.uuid);
      })
      .then((res) => {
        if (res.profileCreated) {
          if (!userAuth) {
          } else userAuth(res);
          close();
        } else setProfile(true);
      })
      .catch((err) => {
        setStates({ type: "VERI_ERROR" });
        console.error(err);
      });
    // console.log(modelStates);
    // setProfile(true);
  };
  // updating the profile
  const updateProfile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(modelStates);
    setStates({ type: "PROFILE_LOADING" });
    const storedValue: any | null = localStorage.getItem("user");
    const uuid: any | null = storedValue ? JSON.parse(storedValue) : null;
    axios
      .post(
        BASE_URL + "/patients/profile",
        {
          relation: "Myself",
          name: modelStates.name,
          gender: modelStates.gender,
          dob: modelStates.dob,
          location: modelStates.location,
        },
        {
          headers: headers(),
        }
      )
      .then((res) => {
        setStates({ type: "PROFILE_LOADING" });
        userAuth(uuid);
        close();
      })
      .catch((err) => {
        setStates({ type: "PROFILE_LOADING" });
      });
  };

  const onFocusHandler = () => {
    const inputRef = myInputRef.current;
    if (inputRef) {
      inputRef.type = "date";
    }
  };

  const onBlurHandler = () => {
    const inputRef = myInputRef.current;
    if (inputRef) {
      inputRef.type = "text";
    }
  };
  return (
    <div className={page === "login" ? style.loginCont : style.modalCont}>
      <div className={style.modaldiv}>
        {!profile ? (
          <>
            {!otp ? (
              <>
                {page === "login" || (
                  <span className="flex items-center border-bottom py-1">
                    <Button onClick={close}>
                      <FaX />
                    </Button>
                    <h4 className="grow-2 text-center">Login or Signup</h4>
                  </span>
                )}
                <span
                  className={`flex flex-col p-1 row-gap-1 ${
                    page === "login" ? "" : "items-center"
                  }`}
                >
                  <h1>Welcome to eShaafi</h1>
                  <p
                    className={` ${
                      page === "login" ? "" : "text-center capitalize"
                    }`}
                    style={{ fontSize: 14 }}
                  >
                    Please enter your phone number, we will send you one time
                    password (OTP) for verification.
                  </p>
                </span>
                <Formik
                  initialValues={{ phone_no: phoneNum }}
                  validationSchema={Yup.object({
                    phone_no: Yup.string()
                      .max(10, "Phone number must be 10 digits")
                      .matches(
                        /^(3|[3][0-5])[0-9]*$/,
                        "Invalid phone number format"
                      )
                      .required("Phone number is required*"),
                  })}
                  onSubmit={getOtp}
                >
                  {(formik) => (
                    <form
                      onSubmit={formik.handleSubmit}
                      className="p-1 flex flex-col sm-h-70 mb-1"
                    >
                      <div>
                        <span className={style.phoneNum}>
                          <select name="country" id="">
                            <option value="+92">+92</option>
                          </select>
                          <input
                            id="phone"
                            type="number"
                            placeholder="3000000000"
                            className={style.phoneInput}
                            {...formik.getFieldProps("phone_no")}
                            onChange={formik.handleChange}
                          />
                        </span>
                        {formik.errors.phone_no ? (
                          <div
                            style={{ color: "red", fontSize: 12, marginTop: 5 }}
                          >
                            {String(formik.errors.phone_no)}
                          </div>
                        ) : null}
                      </div>
                      <div className="flex flex-col">
                        <Button
                          type="submit"
                          variant="contained"
                          className="my-1 sm-mt-10"
                        >
                          {otpLoading ? "Sending..." : "Continue"}
                        </Button>
                        <span
                          style={{ fontSize: 11, display: "inline-block mb-1" }}
                        >
                          By continuing you agree to our{" "}
                          <Link
                            href={"/terms-and-conditions"}
                            className="inline-block  text-primary"
                          >
                            Terms and Conditions
                          </Link>{" "}
                          and{" "}
                          <Link
                            href="/privacy-policy"
                            className="inline-block  text-primary"
                          >
                            Privacy Policy
                          </Link>
                        </span>
                      </div>
                    </form>
                  )}
                </Formik>
              </>
            ) : (
              <>
                <span className="flex items-center border-bottom py-1">
                  <Button onClick={() => setOtp(false)}>
                    <FaChevronLeft />
                  </Button>
                  <h4 className="grow-2 text-center">
                    {page === "login"
                      ? "Change your number"
                      : "Login or Signup"}
                  </h4>
                </span>
                <span
                  className={`flex flex-col p-1 row-gap-1 ${
                    page === "login" ? "" : "items-center"
                  }`}
                >
                  <h1>Enter OTP</h1>
                  <p
                    className={` ${
                      page === "login" ? "" : "text-center capitalize"
                    }`}
                    style={{ fontSize: 14 }}
                  >
                    Please Check your phone for 6-digit otp sent to
                    <br />
                    <u
                      className="text-primary curser"
                      onClick={() => setOtp(false)}
                    >
                      +92{phoneNum}
                    </u>
                  </p>
                </span>
                <Otpinput
                  verifyLoading={verifyLoading}
                  getVarified={getVarified}
                  otpError={otpError}
                  setStates={setStates}
                  getOtp={getOtp}
                />
              </>
            )}
          </>
        ) : (
          <>
            <span className="flex items-center border-bottom py-1 ">
              {/* <Button onClick={close}>
                <FaX />
              </Button> */}
              <h4 className="grow-2 text-center">Complete Profile</h4>
            </span>
            <span className="flex flex-col items-center p-1 row-gap-1">
              <h1>Welcome to eShaafi</h1>
              <p
                className={` ${
                  page === "login" ? "" : "text-center capitalize"
                }`}
                style={{ fontSize: 14 }}
              >
                We will use this information for booking video consultation
              </p>
            </span>
            <form
              className="flex flex-col row-gap-1 p-1 mb-1"
              onSubmit={updateProfile}
            >
              <span className="flex flex-col row-gap-1">
                <div className="w-full">
                  <InputField
                    placeHolder="Full name"
                    name="name"
                    onChange={setStates}
                    className="w-full"
                  />
                  {modelStates.name && (
                    <div>
                      {modelStates?.name?.match(/^[a-zA-Z ]+$/) ? (
                        <p></p>
                      ) : (
                        <p className="text-danger" style={{ fontSize: 12 }}>
                          *User name can not contain numberic or any special
                          characters
                        </p>
                      )}
                    </div>
                  )}
                </div>
                <input
                  ref={myInputRef}
                  placeholder="Date of birth"
                  type="text"
                  name="dob"
                  className={inputField.inputField + " w-full"}
                  onChange={setStates}
                  onMouseEnter={onFocusHandler}
                  // onBlur={onBlurHandler}
                />
                <select
                  name="gender"
                  id=""
                  className={style.selectOpt}
                  onChange={setStates}
                  placeholder="Gender"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <InputField
                  placeHolder="City"
                  type="text"
                  name="location"
                  onChange={setStates}
                />
              </span>
              <Button
                variant="contained"
                type="submit"
                disabled={
                  modelStates?.name?.match(/^[a-zA-Z ]+$/) &&
                  modelStates.dob &&
                  modelStates.gender &&
                  modelStates.location
                    ? false
                    : true
                }
              >
                {profileLoading ? "Updating..." : "Continue"}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
// RFP for development and implementation of data analytics platform
