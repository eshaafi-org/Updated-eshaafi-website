import styles from "@/components/Profiles/Profile.module.scss";
import { useState, useEffect, memo, useReducer } from "react";
import Head from "next/head";
import { InputField } from "@/components/InputField";
import { PageHeading } from "@/components/Typography";
import AddressBar from "@/components/AddressBar";
import style from "@/styles/profile.module.scss";
import { Text28, Text14, Text18, Text24 } from "@/components/Typography";
import { services, accounts } from "@/helper/profileLinks";
import Image from "next/image";
import Profiles from "@/components/Profiles";
import Link from "next/link";
import moment from "moment";
import { FaUserCircle } from "react-icons/fa";
import Button from "@/components/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL, headers, imgheaders } from "@/helper/CONST";
import { useDispatch } from "react-redux";
import Otpinput from "@/components/Profiles/OtpFields";
import toArrayBuffer from "to-array-buffer";
import { FaCamera } from "react-icons/fa6";
// Type assertion
const toArrayBufferTyped: (arg: any) => ArrayBuffer = toArrayBuffer();
// links
const links = [
  { name: "Home", link: "/" },
  { name: "Profile", link: "/profile" },
];
// reducer
const reducer = (state: any, action: any) => {
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
    case "SET_PROFILE": {
      return {
        ...state,
        dob: action.payload.dob,
        gender: action.payload.gender,
        location: action.payload.location,
        name: action.payload.name,
        patientId: action.payload.patientId,
        phone_no: action.payload.phone_no,
        relation: action.payload.relation,
        url: action.payload.url,
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
export default function Profile() {
  const [patient, setPatient] = useState<any>({
    dob: "",
    gender: "",
    location: "",
    patientId: "",
    name: "",
    relation: "",
    phone_no: "",
    url: "",
  });
  const [states, setStates] = useReducer(reducer, {
    loading: false,
    otpError: false,
    name: "",
    dob: "",
    gender: "",
    relation: "",
    location: "",
    phone_no: "",
    url: "",
    patientId: "",
    imgLoader: false,
  });
  const {
    loading,
    otpError,
    imgUrl,
    dob,
    gender,
    location,
    patientId,
    name,
    relation,
    phone_no,
    imgLoader,
    url,
  } = states;
  const dispatch = useDispatch();
  const [editLoading, setEditLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [modal, setModal] = useState(false);
  const [otpShow, setOtpShow] = useState(false);
  // const [imgLoader, setImgLoading] = useState(false);
  // getting changed values
  const handleChanged = (e: any) => {
    setPatient((prev: any) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  // handling editing proflie
  const handleEditingProfile = () => {
    setEditLoading(true);
    if (patient.phone_no && patient.relation !== "Myself") {
      const data: any = {
        dob,
        gender,
        location,
        name,
        patientId,
        relation,
        phone_no,
      };
      if (url) {
        data.url = url;
      }
      axios
        .patch(BASE_URL + `/patients/profile/${patientId}`, data, {
          headers: headers(),
        })
        .then((res) => {
          setEditLoading(false);
          // setOtpShow(true);
          toast("Profile updated successfully!", {
            type: "success",
          });
          // // console.log(res.data.response.data);
          dispatch({
            type: "getProfilesSlice/updateProfiles",
            payload: res.data.response.data,
          });
          setEdit(false);
        })
        .catch((error: any) => {
          setEditLoading(false);
          if (error.response.status === 401) {
          }
          toast(error.response.data.response.message, {
            type: "error",
          });
        });
    } else if (!patient.phone_no && patient.relation !== "Myself") {
      // const filteredObject = (({ phone_no, ...rest }) => rest)(patient);
      const data: any = {
        dob,
        gender,
        location,
        name,
        patientId,
        relation,
        phone_no,
      };
      if (url) {
        data.url = url;
      }
      axios
        .patch(BASE_URL + `/patients/profile/${patientId}`, data, {
          headers: headers(),
        })
        .then((res) => {
          setEditLoading(false);
          toast("Profile updated successfully!", {
            type: "success",
          });
          // console.log(res.data.response.data);
          dispatch({
            type: "getProfilesSlice/updateProfiles",
            payload: res.data.response.data,
          });
          setEdit(false);
        })
        .catch((error: any) => {
          setEditLoading(false);

          if (error.response.status === 401) {
          }
          toast(error.response.data.response.message, {
            type: "error",
          });
        });
    }
  };
  const getVarified = (values: any) => {
    setStates({ type: "LOADER" });
    let { otp1, otp2, otp3, otp4, otp5, otp6 } = values;
    let code = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
    axios
      .patch(
        BASE_URL + `/patients/profile/${patientId}`,
        {
          name: patient.patientName,
          dob: patient.dob,
          gender: patient.gender,
          location: patient.location,
          relation: patient.relation,
          percentage: 90,
          // [url  "url"]: url,
          phone_no: "+92" + phone_no.slice(1),
          code: code,
          profileId: patient.patientId,
          // type: 1,
        },
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
        setOtpShow(false);
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
        console.error(err.response.data.response?.message);
        toast(err.response.data.response?.message, {
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
    // handle uploading profile image
  };
  const uploadFile = (e: any) => {
    setStates({ type: "IMG_LOADER" });
    const [file] = e.target.files || e.dataTransfer.files;
    if (file.size <= 2000000) {
      if (
        file?.type === "image/jpeg" ||
        file?.type === "image/png" ||
        file?.type === "image/webp"
      ) {
        const reader: any = new FileReader();
        reader.readAsBinaryString(file);
        //preview onload function.
        reader.onload = async () => {
          // this is the base64 data
          const fileRes: any = btoa(reader.result);
          const base64Image: any = toArrayBuffer(fileRes);
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
  useEffect(() => {
    if (patient.name) {
      setStates({ type: "SET_PROFILE", payload: patient });
    }
  }, [patient]);
  console.log(patient);
  return (
    <>
      <Head>
        <title>eShaafi | Profile</title>
      </Head>
      <main>
        <div className="container">
          <PageHeading>Profile</PageHeading>
          <AddressBar links={links} />
        </div>
        <section className={style.profileContainer + " container pt-0"}>
          <div>
            <div className={style.profileCard}>
              <span
                className={styles.profileImage}
                style={{ background: "#fff" }}
              >
                {patient.url || url ? (
                  <Image
                    src={patient.url || url}
                    alt="eshaafi-best-doctor-online-consultation-patient-avatar"
                    width={100}
                    height={100}
                    style={{ borderRadius: 50 }}
                  />
                ) : (
                  <FaUserCircle style={{ fontSize: "5rem" }} />
                )}
                {edit && (
                  <Button className={styles.uploadImage}>
                    <input type="file" onChange={uploadFile} />
                    {imgLoader ? (
                      <div
                        className="spinner-border text-white spinner-border-sm"
                        role="status"
                      ></div>
                    ) : (
                      <FaCamera className={styles.icon} />
                    )}
                  </Button>
                )}
              </span>
              <Text24 className="text-dark fw-bold text-capitalize text-center">
                {patient?.name}
              </Text24>
              <p>{patient.phone_no}</p>
              <p className="mt-1">{patient.relation}</p>
            </div>
            <div className={style.profileList}>
              <Text18>Profiles</Text18>
              <Profiles
                patient={patient}
                setPatient={setPatient}
                styling={style.profilePageContainer}
                setEdit={setEdit}
              />
            </div>
          </div>
          <div className={style.settings}>
            <div className={style.profileInfoContainer}>
              <div className="d-flex justify-content-between align-items-center">
                <Text28 className="text-dark fw-bold">
                  Personal Information
                </Text28>
                {patient.name && (
                  <span>
                    {!edit && (
                      <>
                        {patient.relation !== "Myself" && (
                          <Button
                            className={style.editBtn + " text-danger me-4"}
                            onClick={() => setModal(true)}
                          >
                            Delete
                          </Button>
                        )}
                        <DeleteModal
                          show={modal}
                          setShow={setModal}
                          patient={patient}
                          toast={toast}
                          setPatient={setPatient}
                        />
                      </>
                    )}
                    {!edit && (
                      <Button
                        variant="outlined"
                        className={style.editBtn}
                        onClick={() => setEdit(true)}
                      >
                        Edit Profile
                      </Button>
                    )}
                  </span>
                )}
              </div>
              <div className={style.profileInfo}>
                <InputField
                  type="text"
                  name="name"
                  placeHolder="Full Name"
                  value={name}
                  className="text-capitalize"
                  disabled={!edit}
                  onChange={setStates}
                />
                <InputField
                  type="date"
                  placeHolder="Date of Birth"
                  max={moment().format("YYYY-MM-DD")}
                  value={dob}
                  disabled={!edit}
                  name="dob"
                  onChange={setStates}
                />
                <select
                  name="gender"
                  id=""
                  placeholder="Gender"
                  className={style.selectField}
                  value={gender}
                  onChange={setStates}
                  disabled={!edit}
                >
                  <option value="" disabled selected>
                    Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>

                <select
                  name="relation"
                  id=""
                  placeholder="Relation"
                  className={style.selectField}
                  value={relation}
                  onChange={setStates}
                  disabled={!edit}
                >
                  <option value="" disabled selected>
                    Relation
                  </option>
                  <option
                    value="Myself"
                    disabled={patient.relation !== "Myself"}
                  >
                    Myself
                  </option>
                  <option
                    value="Mother"
                    disabled={patient.relation === "Myself"}
                  >
                    Mother
                  </option>
                  <option
                    value="Father"
                    disabled={patient.relation === "Myself"}
                  >
                    Father
                  </option>
                  <option value="Son" disabled={patient.relation === "Myself"}>
                    Son
                  </option>
                  <option
                    value="Daughter"
                    disabled={patient.relation === "Myself"}
                  >
                    Daughter
                  </option>

                  <option
                    value="Spouse"
                    disabled={patient.relation === "Myself"}
                  >
                    Spouse
                  </option>
                  <option
                    value="Other"
                    disabled={patient.relation === "Myself"}
                  >
                    Other
                  </option>
                </select>
                <InputField
                  type="text"
                  placeHolder="City"
                  value={location}
                  disabled={!edit}
                  name="location"
                  onChange={setStates}
                />
                <span>
                  <InputField
                    type="tel"
                    placeHolder="Phone Optional"
                    value={phone_no}
                    disabled={
                      patient.relation === "Myself" ||
                      !edit ||
                      (patient.phone_no && edit)
                    }
                    name="phone_no"
                    onChange={setStates}
                    className="w-100"
                  />
                  {!phone_no && edit && (
                    <p style={{ fontSize: 11, marginTop: 3 }}>
                      Format:03xxxxxxxxx
                    </p>
                  )}
                </span>
              </div>
              {edit && (
                <div className="d-flex justify-content-end mt-4">
                  <Button
                    onClick={() => {
                      setStates({ type: "SET_PROFILE", payload: patient });
                      setEdit(false);
                    }}
                    className="me-4 text-danger"
                  >
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={handleEditingProfile}>
                    Save Changes
                    {editLoading && (
                      <div
                        className="spinner-border spinner-border-sm text-white ms-2"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    )}{" "}
                  </Button>
                  <OtpModal
                    otpModal={otpShow}
                    setOtpModal={setOtpShow}
                    verifyLoading={loading}
                    getVarified={getVarified}
                    otpError={otpError}
                    setStates={setStates}
                    // getOtp={getOtp}
                    phone={phone_no}
                  />
                </div>
              )}
            </div>
            <div className={style.servicesLinks}>
              <Text28 className="text-dark mb-3">Services</Text28>
              <ul className={style.linksContainer}>
                {services.map((item, indx) => (
                  <Link href={item.link} key={indx}>
                    <li className={style.linkItem}>
                      <Image src={item.icon} alt="service-icon-eshaafi" />
                      <Text14 className="fw-bold text-dark mt-3 mb-2">
                        {item.name}
                      </Text14>
                      <Text14 className="text-capitalize">{item.text}</Text14>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
            <div className={style.accountLinks}>
              <Text28 className="text-dark mb-3">Account</Text28>
              <ul className={style.linksContainer}>
                {accounts.map((item, indx) => (
                  <li key={indx} className={style.linkItem}>
                    <Image src={item.icon} alt="service-icon-eshaafi" />
                    <Text14 className="fw-bold text-dark mt-3 mb-2">
                      {item.name}
                    </Text14>
                    <Text14>{item.text}</Text14>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <ToastContainer />
      </main>
    </>
  );
}
function DeleteModal({
  show,
  setShow,
  patient,
  toast,
  setPatient,
}: {
  show: boolean;
  setShow: any;
  patient: any;
  toast: any;
  setPatient: any;
}) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleDeletingProflie = () => {
    setLoading(true);
    axios
      .delete(BASE_URL + `/patients/profile/${patient.patientId}`, {
        headers: headers(),
      })
      .then((res) => {
        setLoading(false);
        setShow(false);
        setPatient({
          dob: "",
          gender: "",
          location: "",
          patientId: "",
          name: "",
          relation: "",
          phone_no: "",
        });
        dispatch({
          type: "getProfilesSlice/updateProfiles",
          payload: res.data.response.data,
        });
        toast(`Profile deleted successfully!`, {
          type: "success",
        });
      })
      .catch((error: any) => {
        setLoading(false);
        console.log(error);
      });
  };
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      show={show}
      onHide={() => setShow(false)}
    >
      <Modal.Header closeButton className="border-bottom-0">
        <p className="text-dark fw-bold">Delete Profile</p>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <p className="text-dark">
          Are you sure? Deleting profile will delete medical records and
          appointment history of this profile
        </p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-light" onClick={() => setShow(false)}>
          Cancel
        </button>
        <button
          className="btn btn-danger"
          style={{ background: "#B00020" }}
          onClick={handleDeletingProflie}
        >
          Delete Profile{" "}
          {loading && (
            <div
              className="spinner-border text-white spinner-border-sm"
              role="status"
            ></div>
          )}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
const OtpModal = ({
  otpModal,
  setOtpModal,
  setStates,
  phone,
  getVarified,
  verifyLoading,
  otpError,
}: any) => {
  return (
    <Modal show={otpModal} onHide={() => setOtpModal(false)}>
      <Modal.Header closeButton className="border-bottom-0">
        <p className="text-dark fw-bold">OTP</p>
      </Modal.Header>
      <span className={`d-flex flex-column align-items-center my-4 pt-2 px-2`}>
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
};
