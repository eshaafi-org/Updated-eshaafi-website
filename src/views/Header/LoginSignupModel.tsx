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
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { IoIosArrowForward, IoIosArrowRoundBack } from "react-icons/io";
import Image from "next/image";
import logo from "../../../public/eshaafiLogo.svg";

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
export const Model = ({ page = "login" }: { page: string }) => {
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
  const [corporateLogin, setCorporateLogin] = useState<boolean>(false);
  const [profile, setProfile] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state: any) => state.loginModalReducer);
  // function for handling static window, so user can't move
  const close = () => {
    document.body.style.overflow = "auto";
    dispatch({ type: "loginModalSlice/close" });
  };
  // get otp
  const getOtp = (e: any) => {
    // e.preventDefault();
    if (e) {
      setStates({ type: "OTP_LOADING_TRUE" });
    }
    let processedPhoneNo = e ? (e.phone_no.startsWith('0') ? e.phone_no.substring(1) : e.phone_no) : (phoneNum.startsWith('0') ? phoneNum.substring(1) : phoneNum);
    axios
      .post(BASE_URL + "/auth/sendOtp", {
        phone_no: `+92${processedPhoneNo}`,
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
        console.error(err.response.data.response.message);
        toast(err.response.data.response.message);
      });
  };
  // verified otp
  const getVarified = (values: any) => {
    setStates({ type: "VERI_LOADING" });
    let { otp1, otp2, otp3, otp4, otp5, otp6 } = values;
    let code = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
    let processedPhoneNo = phoneNum.startsWith('0') ? phoneNum.substring(1) : phoneNum;
    axios
      .post(BASE_URL + "/auth/verifyOtp", {
        phone_no: "+92" + processedPhoneNo,
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
          dispatch({ type: "loginModalSlice/setAuth", payload: res });
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
        dispatch({ type: "loginModalSlice/setAuth", payload: uuid });
        close();
      })
      .catch((err) => {
        setStates({ type: "PROFILE_LOADING" });
      });
  };
  // on focus changing the input field
  const onFocusHandler = () => {
    const inputRef = myInputRef.current;
    if (inputRef) {
      inputRef.type = "date";
    }
  };

  return (
    <div className={style.modalCont}>
      <div className={style.modaldiv}>
        {!profile ? (
          <>
            {!otp ? (
              <>
                {page === "login" || (
                  <span className="d-flex align-items-center py-2 border-bottom px-4">
                    <Button onClick={close}>
                      <FaX />
                    </Button>
                    <p className=" text-center fw-bold mx-auto">
                      Login or Sign up
                    </p>
                  </span>
                )}
                <span
                  className={`d-flex flex-column align-items-center my-4 pt-2 px-2`}
                >
                  <span className="w-1-2 lg-w-full mb-3">
                    <Image src={logo} alt="eshaafi-logo" width={234} height={56} />
                  </span>
                  <h1 className="heading1 mb-4" style={{ color: "#00568A", paddingTop: "1rem" }}>Welcome to eShaafi</h1>
                  <p className={`subText text-center text-capitalize `}>
                    Please enter your phone number, we will send you one time
                    password (OTP) for verification.
                  </p>
                </span>
                {/* <Formik
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
                > */}
                <Formik
                  initialValues={{ phone_no: phoneNum }}
                  validationSchema={Yup.object({
                    phone_no: Yup.string()
                      .required("Phone number is required*")
                      .test(
                        "valid-phone",
                        "Phone number must be valid",
                        value => {
                          if (!value) return false; // Required field, not checking for empty values.
                          const firstChar = value.charAt(0);
                          if (firstChar === '0') {
                            // If it starts with '0', should be 11 digits.
                            return value.length === 11 && /^(0[0-9]*)$/.test(value);
                          } else if (firstChar === '3') {
                            // If it starts with '3', should be 10 digits.
                            return value.length === 10 && /^(3[0-5][0-9]*)$/.test(value);
                          }
                          return false; // If neither, fail the validation.
                        }
                      )
                  })}
                  onSubmit={getOtp}
                >
                  {(formik) => (
                    <form
                      onSubmit={formik.handleSubmit}
                      className="px-3 d-flex flex-column"
                    >
                      <div>
                        <h4 className="mb-2" style={{ color: "#00568A", textAlign: "left" }}>Signup</h4>
                        <span className={style.phoneNum}>
                          <select name="country" id="">
                            <option value="+92">+92</option>
                          </select>
                          <input
                            id="phone"
                            type="tel"
                            placeholder="Phone Number"
                            className={style.phoneInput}
                            {...formik.getFieldProps("phone_no")}
                            onChange={formik.handleChange}
                            autoFocus
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
                      {/* {!corporateLogin ? (
                        <button
                          type="button"
                          className={style.corporateBtn}
                          onClick={() => setCorporateLogin(true)}
                        >
                          <span>
                            <p className="text-dark">Have corporate plan?</p>
                            <p style={{ color: "#0E8781" }}>Login here</p>
                          </span>
                          <span>
                            <IoIosArrowForward />
                          </span>
                        </button>
                      ) : (
                        <p
                          className="mt-4"
                          style={{
                            color: "blue",
                            fontSize: 12,
                            cursor: "pointer",
                          }}
                          onClick={() => setCorporateLogin(false)}
                        >
                          <IoIosArrowRoundBack /> Login With personal account
                        </p>
                      )} */}
                      <div className="d-flex flex-column my-4">
                        <Button
                          type="submit"
                          variant="contained"
                          className="my-1 sm-mt-1"
                          disabled={
                            formik.values.phone_no.toString().length > 9
                              ? false
                              : true
                          }
                        >
                          {otpLoading ? "Sending..." : "Continue"}
                        </Button>
                        <span style={{ fontSize: 11 }} className="mt-2">
                          By continuing you agree to our{" "}
                          <Link href={"/terms-and-conditions"}>
                            Terms and Conditions
                          </Link>{" "}
                          and <Link href="/privacy-policy">Privacy Policy</Link>
                        </span>
                      </div>
                    </form>
                  )}
                </Formik>
              </>
            ) : (
              <>
                <span className="d-flex align-items-center border-bottom py-1">
                  <Button onClick={() => setOtp(false)}>
                    <FaChevronLeft />
                  </Button>
                  <p className="w-100 fw-bold text-center">
                    Verify Phone Number
                  </p>
                </span>
                <span
                  className={`d-flex flex-column align-items-center my-4 pt-2 px-2`}
                >
                  <h1 className="heading1">Enter OTP</h1>
                  <p className={`subText text-center text-capitalize`}>
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
            <span className="d-flex border-bottom py-1 ">
              <p className="w-100 fw-bold text-center py-2">Complete Profile</p>
            </span>
            <span
              className={`d-flex flex-column align-items-center my-4 pt-2 px-2`}
            >
              <h1 className="heading1">Welcome to eShaafi</h1>
              <p
                className={`text-center text-capitalize`}
                style={{ fontSize: 14 }}
              >
                We will use this information for booking video consultation
              </p>
            </span>
            <form
              className="d-flex flex-column row-gap-1 px-3 pb-4"
              onSubmit={updateProfile}
            >
              <span className="d-flex flex-column row-gap-1">
                <div className="w-full">
                  <InputField
                    placeHolder="Full name"
                    name="name"
                    onChange={setStates}
                    className="w-100"
                  />
                  {modelStates.name && (
                    <div>
                      {modelStates?.name?.match(/^[a-zA-Z -]{3,}$/) ? (
                        <p></p>
                      ) : (
                        <p className="text-danger" style={{ fontSize: 12 }}>
                          {`minimum 3 letters (User name can not contain numberic
                          or special characters except -)*`}
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
                  max={moment().format("YYYY-MM-DD")}
                  className={inputField.inputField + " " + style.dobField}
                  onChange={setStates}
                  onMouseEnter={onFocusHandler}
                  onFocus={onFocusHandler}
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
                  modelStates?.name?.match(/^[a-zA-Z -]{3,}$/) &&
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
      <ToastContainer />
    </div>
  );
};
// RFP for development and implementation of data analytics platform
