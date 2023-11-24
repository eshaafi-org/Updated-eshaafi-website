"use client";
import style from "./Profile.module.scss";
import { HiOutlinePlus } from "react-icons/hi2";
import { InputField } from "../InputField";
import toArrayBuffer from "to-array-buffer";
import Modal from "react-bootstrap/Modal";
import Button from "../Button";
import { useReducer, useState, FormEvent, useRef } from "react";
import axios from "axios";
import { BASE_URL, headers, imgheaders } from "@/helper/CONST";
import inputField from "@/components/InputField/Input.module.scss";
import { FaX, FaChevronLeft } from "react-icons/fa6";
import { Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Image from "next/image";
import { FaCamera } from "react-icons/fa";

// reducer
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "IMG_LOADER": {
      return {
        ...state,
        imgLoader: !state.imgLoader,
      };
    }
    default: {
      return {
        [action.target.name]: action.target.value,
      };
    }
  }
};
export default function AddProfile() {
  // reducer states
  const [states, setStates] = useReducer(reducer, {
    imgLoader: false,
  });
  // exporting variables from reducer
  const { imgLoader } = states;
  // states
  const [show, setShow] = useState(false);
  const [file, setFile] = useState("");
  // modal open and close function
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // add profile
  const updateProfile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const storedValue: any | null = localStorage.getItem("user");
    // const uuid: any | null = storedValue ? JSON.parse(storedValue) : null;
    // axios
    //   .post(
    //     BASE_URL + "/patients/profile",
    //     {
    //       relation: "Myself",
    //       name: modelStates.name,
    //       gender: modelStates.gender,
    //       dob: modelStates.dob,
    //       location: modelStates.location,
    //     },
    //     {
    //       headers: headers(),
    //     }
    //   )
    //   .then((res) => {
    //     // setStates({ type: "PROFILE_LOADING" });
    //     // dispatch({ type: "loginModalSlice/setAuth", payload: uuid });
    //     // close();
    //   })
    //   .catch((err) => {
    //     // setStates({ type: "PROFILE_LOADING" });
    //   });
  };
  const myInputRef = useRef<HTMLInputElement | null>(null);
  // on focus changing the input field
  const onFocusHandler = () => {
    const inputRef = myInputRef.current;
    if (inputRef) {
      inputRef.type = "date";
    }
  };
  // handle uploading profile image
  const uploadFile = (e: any) => {
    setStates({ type: "IMG_LOADER" });
    const [file] = e.target.files || e.dataTransfer.files;
    // preview img
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
          setStates({ type: "IMG_LOADER" });
          setFile(response.data.response.url);
        })
        .catch((error) => {
          setStates({ type: "IMG_LOADER" });
          console.log(error);
        });
    };
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
      <Modal show={show} onHide={handleClose}>
        <div className={style.addProfileModalContainer}>
          {/* modal head */}
          <div></div>
          {/* modal body  */}
          <form action="" className={style.profileForm}>
            <div className={style.profileImage}>
              {file && (
                <Image
                  src={file}
                  alt=""
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
            <InputField placeHolder="Full Name" />
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
            <InputField placeHolder="City" />
            <select
              name="gender"
              id=""
              className={style.selectOpt}
              onChange={setStates}
              placeholder="Relation"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <Button variant="contained">Continue</Button>
          </form>
        </div>
      </Modal>
    </>
  );
}
