"use client";
// dependencies
import style from "./Profile.module.scss";
import { HiOutlinePlus } from "react-icons/hi2";
import { InputField } from "../InputField";
import toArrayBuffer from "to-array-buffer";
import Modal from "react-bootstrap/Modal";
import Button from "../Button";
import { useReducer, useState, useRef } from "react";
import axios from "axios";
import { BASE_URL, headers, imgheaders } from "@/helper/CONST";
import inputField from "@/components/InputField/Input.module.scss";
import { useDispatch } from "react-redux";
import { FaXmark } from "react-icons/fa6";
import { FaCamera } from "react-icons/fa6";
import moment from "moment";
import Image from "next/image";
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
  } = states;
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
    axios
      .post(
        BASE_URL + "/patients/profile",
        {
          relation: states.relation,
          name: states.name,
          gender: states.gender,
          dob: states.dob,
          location: states.location,
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
        setProfile({
          type: "SET_PROFILES",
          payload: [
            res.data.response.data.self,
            ...res.data.response.data.profiles,
          ],
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

        // setStates({ type: "PROFILE_LOADING" });
        // dispatch({ type: "loginModalSlice/setAuth", payload: uuid });
        // close();
      })
      .catch((err) => {
        setStates({ type: "LOADER" });
        if (err.response.data) {
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
      <Modal show={show}>
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
            <Button
              variant="contained"
              type="submit"
              disabled={name?.match(/^[a-zA-Z -]{3,}$/) ? false : true}
            >
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
    </>
  );
}
