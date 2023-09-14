import { useReducer, useState, FormEvent } from "react";
import axios from "axios";
import { BASE_URL, headers } from "@/helper/CONST";
import style from "./Header.module.scss";
import Button from "@/components/Button";
import { InputField } from "@/components/InputField";
import { FaX, FaChevronLeft } from "react-icons/fa6";
import Otpinput from "./OtpFields";

// reducer
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "OTP_LOADING": {
      return {
        ...state,
        otpLoading: !state.otpLoading,
      };
    }
    case "VERI_LOADING": {
      return {
        ...state,
        verifyLoading: !state.verifyLoading,
      };
    }
    case "PROFILE_LOADING": {
      return {
        ...state,
        profileLoading: !state.profileLoading,
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
  setShowModal,
  userAuth,
}: {
  setShowModal: any;
  userAuth: any;
}) => {
  const [modelStates, setStates] = useReducer(reducer, {
    phone_no: "",
    otpLoading: false,
    verifyLoading: false,
    profileLoading: false,
  });
  const { phone_no, otpLoading, verifyLoading, profileLoading } = modelStates;
  const [otp, setOtp] = useState<boolean>(false);
  const [profile, setProfile] = useState<boolean>(false);
  // function for handling static window, so user can't move
  const close = () => {
    document.body.style.overflow = "auto";
    setShowModal(false);
  };
  // get otp
  const getOtp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStates({ type: "OTP_LOADING" });
    console.log(phone_no);
    axios
      .post(BASE_URL + "/auth/sendOtp", {
        phone_no: "+92" + phone_no,
        type: 1,
      })
      .then((res) => {
        console.log(res);
        setStates({ type: "OTP_LOADING" });
        setOtp(true);
      })
      .catch((err) => {
        setStates({ type: "OTP_LOADING" });
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
        phone_no: "+92" + phone_no,
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
          userAuth(res);
          close();
        } else setProfile(true);
      })
      .catch((err) => {
        console.error(err);
      });
    // console.log(modelStates);
    // setProfile(true);
  };
  // updating the profile
  const updateProfile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStates({ type: "PROFILE_LOADING" });
    const storedValue: any | null = localStorage.getItem("user");
    const uuid: any | null = storedValue ? JSON.parse(storedValue) : null;
    console.log(uuid);
    axios
      .post(
        BASE_URL + "/patients/profile",
        {
          relation: "Myself",
          name: modelStates.name,
          gender: modelStates.gender,
          dob: modelStates.dob,
          location: "Lahore",
        },
        {
          headers: headers(),
        }
      )
      .then((res) => {
        setStates({ type: "PROFILE_LOADING" });
        console.log(res);
        userAuth(uuid);
        close();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={style.modalCont}>
      <div className={style.modaldiv}>
        {!profile ? (
          <>
            {!otp ? (
              <>
                <span className="flex items-center border-bottom py-1">
                  <Button onClick={close}>
                    <FaX />
                  </Button>
                  <h4 className="grow-2 text-center">Login or Signup</h4>
                </span>
                <span className="flex flex-col items-center p-1 row-gap-1">
                  <h1>Welcome to eShaafi</h1>
                  <p className="text-center">
                    Please enter your phone number, we will send you one time
                    password (OTP) for verification.
                  </p>
                </span>
                <form
                  className="p-1 flex flex-col row-gap-1 sm-h-70 sm-justify-between"
                  onSubmit={getOtp}
                >
                  <span className={style.phoneNum}>
                    <select name="country" id="">
                      <option value="+92">+92</option>
                    </select>
                    <input
                      type="number"
                      placeholder="Phone number"
                      className={style.phoneInput}
                      maxLength={10}
                      name="phone_no"
                      value={phone_no}
                      onChange={setStates}
                    />
                  </span>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={phone_no.length < 10 || phone_no.length > 10}
                  >
                    {otpLoading ? "Sending..." : "Continue"}
                  </Button>
                </form>
              </>
            ) : (
              <>
                <span className="flex items-center border-bottom py-1">
                  <Button onClick={() => setOtp(false)}>
                    <FaChevronLeft />
                  </Button>
                  <h4 className="grow-2 text-center">Login or Signup</h4>
                </span>
                <span className="flex flex-col items-center p-1 row-gap-1">
                  <h1>Enter OTP</h1>
                  <p className="text-center">
                    Please Check your phone for 6-digit otp sent to
                    <br />
                    <u className="text-primary">+92{phone_no} </u>
                  </p>
                </span>

                <Otpinput
                  verifyLoading={verifyLoading}
                  getVarified={getVarified}
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
              <p className="text-center">
                We will use this information for booking video consultation
              </p>
            </span>
            <form
              className="flex flex-col row-gap-1 p-1 mb-1"
              onSubmit={updateProfile}
            >
              <span className="flex flex-col row-gap-1">
                <InputField
                  placeHolder="Full name"
                  name="name"
                  onChange={setStates}
                />
                <InputField
                  placeHolder="Date of birth"
                  type="date"
                  name="dob"
                  onChange={setStates}
                />
                <select
                  name="gender"
                  id=""
                  className={style.selectOpt}
                  onChange={setStates}
                >
                  <option value="">--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </span>
              <Button variant="contained" type="submit">
                {profileLoading ? "Updating..." : "Continue"}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
