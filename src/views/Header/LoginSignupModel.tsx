import { useReducer, useState, FormEvent, useRef } from "react";
import axios from "axios";
import { BASE_URL, headers } from "@/helper/CONST";
import { initializeDeviceToken } from "@/helper/notifications";
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
    case "VERI_LOADING_TRUE": {
      return {
        ...state,
        verifyLoading: true,
        otpError: false,
      };
    }
    case "VERI_LOADING_FALSE": {
      return {
        ...state,
        verifyLoading: false,
        otpError: false,
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
  const [profileSelection, setProfileSelection] = useState<boolean>(false);
  const [existingProfiles, setExistingProfiles] = useState<any[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state: any) => state.loginModalReducer);
  // function for handling static window, so user can't move
  const close = () => {
    document.body.style.overflow = "auto";
    dispatch({ type: "loginModalSlice/close" });
  };
  // fetch user profiles
  const fetchUserProfiles = async () => {
    try {
      // Wait a bit to ensure localStorage is updated
      await new Promise(resolve => setTimeout(resolve, 100));

      const response = await axios.get(`${BASE_URL}/patients/profile?device=web`, {
        headers: headers(),
      });

      console.log("Profiles API response:", response.data);

      const profilesData = response.data.response.data;
      const allProfiles = [profilesData.self, ...profilesData.profiles].filter(Boolean);

      // Filter profiles to show only those belonging to current phone number
      const currentPhoneNumber = `+92${phoneNum.startsWith('0') ? phoneNum.substring(1) : phoneNum}`;
      const filteredProfiles = allProfiles.filter((profile: any) => {
        // Check if profile phone matches current phone number
        const profilePhone = profile.phone_no || profile.phoneNo || profile.phone;
        return profilePhone === currentPhoneNumber || profilePhone === phoneNum ||
          profilePhone === `92${phoneNum.startsWith('0') ? phoneNum.substring(1) : phoneNum}`;
      });

      console.log("Current phone number:", currentPhoneNumber);
      console.log("All profiles:", allProfiles);
      console.log("Filtered profiles for current phone:", filteredProfiles);
      return filteredProfiles;
    } catch (error) {
      console.error("Error fetching profiles:", error);
      return [];
    }
  };  // get otp
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
    // show verify loading explicitly
    setStates({ type: "VERI_LOADING_TRUE" });
    let { otp1, otp2, otp3, otp4, otp5, otp6 } = values;
    let code = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
    let processedPhoneNo = phoneNum.startsWith('0') ? phoneNum.substring(1) : phoneNum;
    axios
      .post(BASE_URL + "/auth/verifyOtp", {
        phone_no: "+92" + processedPhoneNo,
        code: code,
        type: 1,
      })
      .then(async (res) => {
        // keep verify loading until profiles are resolved and UI updated
        localStorage.setItem("user", JSON.stringify(res.data.response));

        // immediately update redux so navbar/profile reacts
        try {
          dispatch({ type: "loginModalSlice/setAuth", payload: res.data.response });
        } catch (err) {
          console.warn('[Login] dispatch setAuth failed', err);
        }

        console.log("OTP verification response:", res.data.response);

        // Register device token with backend for call notifications (don't block UI)
        try {
          const userId = res.data.response.uuid || res.data.response.IdToken;
          const phoneNumber = `+92${processedPhoneNo}`;
          console.log('[Login] Registering device token for user:', userId);
          await initializeDeviceToken(userId, phoneNumber);
        } catch (tokenError) {
          console.error('[Login] Device token registration failed:', tokenError);
        }

        // Check for existing profiles
        const profiles = await fetchUserProfiles();

        if (profiles.length > 0) {
          console.log("Profiles found:", profiles);
          setExistingProfiles(profiles);
          setOtp(false);
          setProfileSelection(true);
        } else {
          console.log("No profiles found - showing profile creation dialog");
          setOtp(false);
          setProfile(true);
        }

        // done resolving profiles, hide verify loading
        setStates({ type: "VERI_LOADING_FALSE" });
      })
      .catch((err) => {
        setStates({ type: "VERI_ERROR" });
        console.error("OTP verification error:", err);
      });

    console.log("verifying otp with phone no:", "+92" + processedPhoneNo, "and code:", code);
  };
  // handle profile selection and login
  const handleProfileSelection = () => {
    if (selectedProfile) {
      const storedValue: any | null = localStorage.getItem("user");
      const userAuth: any | null = storedValue ? JSON.parse(storedValue) : null;

      // Set the selected profile and complete login
      dispatch({ type: "loginModalSlice/setAuth", payload: { ...userAuth, selectedProfile } });
      close();
    }
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

  console.log("Rendering LoginSignupModel - profile state:", profile, "otp state:", otp, "profileSelection state:", profileSelection);

  return (
    <div className={style.modalCont}>
      <div className={style.modaldiv}>
        {!profile && !profileSelection ? (
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
                <span
                  className={`d-flex flex-column align-items-center my-4 pt-2 px-2`}
                >
                  <Image
                    src="/eshaafiLogo.svg"
                    alt="eShaafi"
                    width={120}
                    height={40}
                    className="mb-3"
                  />
                  <h1 className="heading1 mb-3" style={{ color: "#00568A", fontSize: "18px", fontWeight: "600" }}>Verify Phone Number</h1>
                  <h2 className="heading2" style={{ color: "#000", fontSize: "24px", fontWeight: "400", marginBottom: "1rem" }}>Welcome to eShaafi</h2>
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
        ) : profileSelection ? (
          <>
            <span className="d-flex align-items-center py-2 border-bottom px-4">
              <Button onClick={() => setProfileSelection(false)}>
                <FaChevronLeft />
              </Button>
              <p className="text-center fw-bold mx-auto">Select Profile</p>
              <Button onClick={close}>
                <FaX />
              </Button>
            </span>
            <span className={`d-flex flex-column align-items-center my-4 pt-2 px-2`}>
              <Image
                src="/eshaafiLogo.svg"
                alt="eShaafi"
                width={120}
                height={40}
                className="mb-3"
              />
              <h1 className="heading1 mb-3" style={{ color: "#00568A", fontSize: "18px", fontWeight: "600" }}>
                Select Your Profile
              </h1>
              <p className={`text-center text-capitalize`} style={{ fontSize: 14 }}>
                Choose from your existing profiles to continue
              </p>
            </span>
            <div className="px-3 pb-4">
              <div className="d-flex flex-column row-gap-3 mb-4">
                {existingProfiles.map((profileItem: any, index: number) => (
                  <div
                    key={index}
                    className={`d-flex align-items-center p-3 border rounded cursor-pointer ${selectedProfile?.profileId === profileItem.profileId ? 'border-primary bg-light' : 'border-secondary'
                      }`}
                    onClick={() => setSelectedProfile(profileItem)}
                    style={{ cursor: 'pointer' }}
                  >
                    {profileItem.url ? (
                      <Image
                        src={profileItem.url}
                        width={50}
                        height={50}
                        alt={profileItem.name}
                        style={{ borderRadius: '50%' }}
                        className="me-3"
                      />
                    ) : (
                      <div
                        className="me-3 d-flex align-items-center justify-content-center"
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: '50%',
                          backgroundColor: '#f0f0f0',
                          color: '#666'
                        }}
                      >
                        {profileItem.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="flex-grow-1">
                      <h6 className="mb-1 text-capitalize">{profileItem.name}</h6>
                      <small className="text-muted">{profileItem.relation}</small>
                    </div>
                    {selectedProfile?.profileId === profileItem.profileId && (
                      <div className="text-primary">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="d-flex flex-column row-gap-2">
                <Button
                  variant="contained"
                  onClick={handleProfileSelection}
                  disabled={!selectedProfile}
                  className="w-100"
                >
                  Continue with Selected Profile
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setProfileSelection(false);
                    setProfile(true);
                  }}
                  className="w-100"
                >
                  Create New Profile
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            {console.log("RENDERING COMPLETE PROFILE DIALOG - profile state is true")}
            {existingProfiles.length > 0 && (
              <span className="d-flex align-items-center py-2 border-bottom px-4">
                <Button onClick={() => {
                  setProfile(false);
                  setProfileSelection(true);
                }}>
                  <FaChevronLeft />
                </Button>
                <p className="text-center fw-bold mx-auto">Create New Profile</p>
                <Button onClick={close}>
                  <FaX />
                </Button>
              </span>
            )}
            <span
              className={`d-flex flex-column align-items-center my-4 pt-2 px-2`}
            >
              <Image
                src="/eshaafiLogo.svg"
                alt="eShaafi"
                width={120}
                height={40}
                className="mb-3"
              />
              <h1 className="heading1 mb-3" style={{ color: "#00568A", fontSize: "18px", fontWeight: "600" }}>Complete Profile</h1>
              <h2 className="heading3" style={{ color: "#000", fontSize: "20px", fontWeight: "100", marginBottom: "2rem" }}>Welcome to eShaafi</h2>
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
                  style={{ borderRadius: "8px" }}
                />
                <select
                  name="gender"
                  id=""
                  className={style.selectOpt}
                  onChange={setStates}
                  placeholder="Gender"
                  style={{ borderRadius: "8px" }}
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
                  className="w-100"
                />
                <InputField
                  placeHolder="Phone Number"
                  type="tel"
                  name="phoneNo"
                  value={`+92${phoneNum}`}
                  disabled
                  className="w-100"
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
