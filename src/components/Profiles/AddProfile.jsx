"use client";
// dependencies
import style from "./Profile.module.scss";
import { HiOutlinePlus } from "react-icons/hi2";
import { InputField } from "../InputField";
import toArrayBuffer from "to-array-buffer";
import Modal from "react-bootstrap/Modal";
import Button from "../Button";
import { useReducer, useState, useRef, memo } from "react";
import axios from "axios";
import { BASE_URL, headers, imgheaders } from "@/helper/CONST";
import inputField from "@/components/InputField/Input.module.scss";
import { useDispatch } from "react-redux";
import { FaXmark } from "react-icons/fa6";
import { FaCamera } from "react-icons/fa6";
import moment from "moment";
import Image from "next/image";
import Otpinput from "./OtpFields";
// reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "IMG_LOADER": {
      return {
        ...state,
        imgLoader: !state.imgLoader,
      };
    }
    case "SET_URL": {
      return {
        ...state,
        imgLoader: false,
        url: action.payload,
      };
    }
    case "LOADER": {
      return {
        ...state,
        loading: !state.loading,
      };
    }
    case "SUCCESS": {
      return {
        ...state,
        name: "",
        dob: "",
        gender: "",
        location: "",
        relation: "",
        loading: false,
        url: "",
        phone_no: "",
      };
    }
    case "OTP_SEND": {
      return {
        ...state,
        loading: false,
      };
    }
    case "OTP_ERROR": {
      return {
        ...state,
        loading: false,
        otpError: true,
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
export default function AddProfile({ setProfile, toast }) {
  // reducer states
  const [otpModal, setOtpModal] = useState(false);
  const [states, setStates] = useReducer(reducer, {
    imgLoader: false,
    loading: false,
    name: "",
    dob: "",
    gender: "",
    location: "",
    relation: "",
    url: "",
    phone_no: "",
    otpError: false,
  });
  // exporting variables from reducer
  const {
    imgLoader,
    loading,
    name,
    dob,
    gender,
    location,
    relation,
    url,
    phone_no,
    otpError,
  } = states;
  // phone number matches variable
  const validatePhone = /^03[0-5][0-9]{8}$/;
  // states
  const [show, setShow] = useState(false);
  // const [file, setFile] = useState("");
  const dispatch = useDispatch();
  const myInputRef = useRef();
  // modal open and close function
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // add profile
  const updateProfile = (e) => {
    setStates({ type: "LOADER" });
    e.preventDefault();
    if (phone_no === "" && url === "") {
      axios
        .post(
          BASE_URL + "/patients/profile",
          {
            name: states.name,
            dob: states.dob,
            gender: states.gender,
            location: states.location,
            relation: states.relation,
            percentage: 90,
          },
          {
            headers: headers(),
          }
        )
        .then((res) => {
          setStates({ type: "SUCCESS" });
          dispatch({
            type: "getProfilesSlice/updateProfiles",
            payload: res.data.response.data,
          });
          toast(res.data.response.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            type: "success",
          });
        })
        .catch((err) => {
          setStates({ type: "LOADER" });
          if (err.response?.data) {
            toast(err.response.data.response.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              type: "error",
            });
          }
        });
    } else if (phone_no === "" && url !== "") {
      axios
        .post(
          BASE_URL + "/patients/profile",
          {
            name: states.name,
            dob: states.dob,
            gender: states.gender,
            location: states.location,
            relation: states.relation,
            percentage: 90,
            url,
          },
          {
            headers: headers(),
          }
        )
        .then((res) => {
          setStates({ type: "SUCCESS" });
          dispatch({
            type: "getProfilesSlice/updateProfiles",
            payload: res.data.response.data,
          });
          toast(res.data.response.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            type: "success",
          });
        })
        .catch((err) => {
          setStates({ type: "LOADER" });
          if (err.response?.data) {
            toast(err.response.data.response.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              type: "error",
            });
          }
        });
    } else if (phone_no) {
      const data = {
        name: states.name,
        dob: states.dob,
        gender: states.gender,
        location: states.location,
        relation: states.relation,
        percentage: 90,
        phone_no: "+92" + phone_no.slice(1),
        // patientId: "",
      };
      url ? (data.url = url) : data;
      axios
        .post(BASE_URL + "/patients/profile", data, {
          headers: headers(),
        })
        .then((res) => {
          setShow(false);
          setStates({ type: "OTP_SEND" });
          setOtpModal(true);
          // dispatch({
          //   type: "getProfilesSlice/updateProfiles",
          //   payload: res.data.response.data,
          // });
          // toast(res.data.response.message, {
          //   position: "top-right",
          //   autoClose: 3000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "light",
          //   type: "success",
          // });
        })
        .catch((err) => {
          setStates({ type: "LOADER" });
          if (err.response?.data) {
            toast(err.response.data.response.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              type: "error",
            });
          }
        });
    }
  };
  // on focus changing the input field
  const onFocusHandler = () => {
    const inputRef = myInputRef.current;
    if (inputRef) {
      inputRef.type = "date";
    }
  };
  // handle uploading profile image
  const uploadFile = (e) => {
    setStates({ type: "IMG_LOADER" });
    const [file] = e.target.files || e.dataTransfer.files;
    if (file.size <= 2000000) {
      if (
        file?.type === "image/jpeg" ||
        file?.type === "image/png" ||
        file?.type === "image/webp"
      ) {
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        //preview onload function.
        reader.onload = async () => {
          // this is the base64 data
          const fileRes = btoa(reader.result);
          const base64Image = toArrayBuffer(fileRes);
          axios
            .post(`${BASE_URL}/image-upload-api/type/new`, base64Image, {
              headers: imgheaders(),
            })
            .then((response) => {
              setStates({
                type: "SET_URL",
                payload: response.data.response.url,
              });
            })
            .catch((error) => {
              setStates({ type: "IMG_LOADER" });
              console.log(error);
            });
        };
      } else {
        setStates({ type: "IMG_LOADER" });
        if (file?.type) {
          toast(
            `🥺 Sorry, This file format does not supported, Choose the file with you last format: ".jpg, .jpeg, .png, .webp,"`,
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              type: "error",
            }
          );
        }
      }
    } else {
      setStates({ type: "IMG_LOADER" });
      if (file?.type) {
        toast(`😵 File size is exceeded. Max size is 2mb `, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          type: "error",
        });
      }
    }
    // preview img
  };
  // verified otp
  const getVarified = (values) => {
    setStates({ type: "LOADER" });
    let { otp1, otp2, otp3, otp4, otp5, otp6 } = values;
    let code = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
    const data = {
      name: states.name,
      dob: states.dob,
      gender: states.gender,
      location: states.location,
      relation: states.relation,
      percentage: 90,
      url: url,
      phone_no: "+92" + phone_no.slice(1),
      code: code,
      // type: 1,
    };

    const filteredObject = (({ url, ...rest }) => rest)(data);
    axios
      .post(
        BASE_URL + "/patients/profile",
        url === "" ? filteredObject : data,
        {
          headers: headers(),
        }
      )
      .then((res) => {
        setStates({ type: "LOADER" });
        dispatch({
          type: "getProfilesSlice/updateProfiles",
          payload: res.data.response.data,
        });
        setOtpModal(false);
        toast(res.data.response.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          type: "success",
        });
        setStates({ type: "SUCCESS" });
        // setStates({ type: "VERI_LOADING" });
        // localStorage.setItem("user", JSON.stringify(res.data.response));
        // return res.data.response;
        // userAuth(res.data.response.uuid);
      })
      .then((res) => {
        // if (res.profileCreated) {
        //   dispatch({ type: "loginModalSlice/setAuth", payload: res });
        //   close();
        // } else setProfile(true);
      })
      .catch((err) => {
        setStates({ type: "OTP_ERROR" });
        // setStates({ type: "VERI_ERROR" });
        console.error(err.response.data.response.message);
        toast(err.response.data.response.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          type: "error",
        });
      });
    // console.log(modelStates);
    // setProfile(true);
  };
  return (
    <>
      <li
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ color: "#009b94", fontSize: 14 }}
      >
        <Button className={style.addProfileBtn} onClick={handleShow}>
          <HiOutlinePlus />
        </Button>
        Add
      </li>
      <Modal show={show} onHide={() => setShow(false)}>
        {/* modal head */}
        <div className="d-flex align-items-center border-bottom py-2">
          <div className="w-40 ps-3">
            <Button onClick={handleClose}>
              <FaXmark className={style.deleteIcon} />
            </Button>
          </div>
          <p className="w-50 fw-bold text-dark">Add Profile</p>
        </div>
        <div className={style.addProfileModalContainer}>
          {/* modal body  */}
          <form className={style.profileForm} onSubmit={updateProfile}>
            <div className={style.profileImage}>
              {url && (
                <Image
                  src={url}
                  alt="eshaafi-profile-image-avatar"
                  className={style.profileImg}
                  width={98}
                  height={98}
                />
              )}
              <Button className={style.uploadImage}>
                <input type="file" onChange={uploadFile} />
                {imgLoader ? (
                  <div
                    className="spinner-border text-white spinner-border-sm"
                    role="status"
                  ></div>
                ) : (
                  <FaCamera className={style.icon} />
                )}
              </Button>
            </div>
            <div className="w-100">
              <InputField
                placeHolder="Full Name"
                name="name"
                onChange={setStates}
                required={true}
                value={name}
                className="w-100"
              />
              {name && (
                <div>
                  {name?.match(/^[a-zA-Z -]{3,}$/) ? (
                    <p></p>
                  ) : (
                    <p className="text-danger" style={{ fontSize: 10 }}>
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
              required
              value={dob}
            />
            <select
              name="gender"
              id=""
              className={style.selectOpt}
              onChange={setStates}
              placeholder="Gender"
              required
              value={gender}
            >
              <option value="" selected disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <InputField
              placeHolder="City"
              onChange={setStates}
              name="location"
              required={true}
              value={location}
            />
            <select
              name="relation"
              id=""
              className={style.selectOpt}
              onChange={setStates}
              placeholder="Relation"
              required
              value={relation}
            >
              <option value="" selected disabled>
                Select Relation
              </option>
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Son">Son</option>
              <option value="Daughter">Daughter</option>
              <option value="Spouse">Spouse</option>
              <option value="Other">Other</option>
            </select>
            <span>
              <InputField
                type="tel"
                placeHolder="Phone Optional"
                value={phone_no}
                // disabled={patient.relation === "Myself" || !edit}
                onChange={setStates}
                name="phone_no"
                className="w-100 "

                // onChange={handleChanged}
              />
              {!phone_no && (
                <p style={{ fontSize: 11, marginTop: 3 }}>Format:03xxxxxxxxx</p>
              )}
              {phone_no ? (
                validatePhone.test(phone_no) ? (
                  ""
                ) : (
                  <p style={{ fontSize: 11, marginTop: 3, color: "red" }}>
                    Phone format is not correct
                  </p>
                )
              ) : (
                ""
              )}
            </span>
            <Button variant="contained" type="submit" disabled={loading}>
              {loading ? (
                <div
                  className="spinner-border text-white spinner-border-sm"
                  role="status"
                ></div>
              ) : (
                "Continue"
              )}
            </Button>
          </form>
        </div>
      </Modal>
      <OtpModal
        otpModal={otpModal}
        setOtpModal={setOtpModal}
        verifyLoading={loading}
        getVarified={getVarified}
        otpError={otpError}
        setStates={setStates}
        // getOtp={getOtp}
        phone={phone_no}
      />
    </>
  );
}
const OtpModal = memo(
  ({
    otpModal,
    setOtpModal,
    setStates,
    phone,
    getVarified,
    verifyLoading,
    otpError,
  }) => {
    return (
      <Modal show={otpModal} onHide={() => setOtpModal(false)}>
        <Modal.Header closeButton className="border-bottom-0">
          <p className="text-dark fw-bold">OTP</p>
        </Modal.Header>
        <span
          className={`d-flex flex-column align-items-center my-4 pt-2 px-2`}
        >
          <h1 className="heading1">Enter OTP</h1>
          <p className={`subText text-center text-capitalize`}>
            Please Check your phone for 6-digit otp sent to
            <br />
            <u className="text-primary curser">+92{phone.slice(1)}</u>
          </p>
        </span>
        <Otpinput
          verifyLoading={verifyLoading}
          getVarified={getVarified}
          otpError={otpError}
          setStates={setStates}
          // getOtp={getOtp}
        />
      </Modal>
    );
  }
);
