"use client";
import { useState, useRef } from "react";
import AddressBar from "@/components/AddressBar";
import Head from "next/head";
import style from "@/styles/labs.module.scss";
import { Text28, Text16, Text11, Text18 } from "@/components/Typography";
import { IoCheckmarkDone } from "react-icons/io5";
import uploadRecords from "../../../public/images/uploadRecords.svg";
import Image from "next/image";
import axios from "axios";
import { BASE_URL, imgheaders, headers } from "@/helper/CONST";
import Button from "@/components/Button";
import { ToastContainer, toast } from "react-toastify";
import toArrayBuffer from "to-array-buffer";
import { InputField } from "@/components/InputField";
import successGif from "../../../public/images/success.gif";
let links = [
  { name: "Home", link: "/" },
  { name: "Lab Tests", link: "/labs" },
  { name: "Upload Prescription", link: `/labs/prescription` },
];
export default function Prescription() {
  const pdfRegex = /\bpdf\b/i;
  const [images, setImages] = useState("");
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(true);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState("");
  const fileInputRef = useRef();
  const [formFields, setFormFields] = useState({
    typeTest: "",
    patientName: "",
    time: "",
    date: "",
    labName: "",
  });
  const { typeTest, patientName, time, date, labName } = formFields;
  // all the functions
  // get the form data from
  const handleFormData = (e) => {
    setFormFields((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  // upload eprescription to get the link
  const handleUpload = (e) => {
    const [file] = e.target.files || e.dataTransfer.files;
    if (file.size <= 4000000) {
      if (
        file?.type === "image/jpeg" ||
        file?.type === "application/pdf" ||
        file?.type === "image/png" ||
        file?.type === "image/webp"
      ) {
        setLoading(true);
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        //preview onload function.
        reader.onload = async () => {
          // this is the base64 data
          const fileRes = btoa(reader.result);
          const base64Image = toArrayBuffer(fileRes);
          axios
            .post(
              `${BASE_URL}/image-upload-api/type/${
                pdfRegex.test(file?.type) ? "pdf" : "new"
              }`,
              base64Image,
              {
                headers: imgheaders(),
              }
            )
            .then((response) => {
              setLoading(false);
              if (pdfRegex.test(file?.type)) {
                setFile("pdf");
              } else setFile("");
              setImages(response.data.response.url);
              setShow(true);
              toast(`File successfully uploaded`, {
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
            .catch((error) => {
              setLoading(false);
              toast(`Something went wrong please try again later`, {
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
        };
      } else {
        setLoading(false);
        if (file?.type) {
          toast(
            `🥺 Sorry, This file format does not supported, Choose the file with you last format: ".jpg, .jpeg, .png, .webp, .pdf"`,
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
      setLoading(false);
      if (file?.type) {
        toast(`😵 File size is exceeded. Max size is 4mb `, {
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
  };
  // upload prescription
  const uploadPrescription = (e) => {
    e.preventDefault();
    setUploading(true);
    const data = {
      patientName,
      time,
      date,
      labName,
      prescriptionUrl: images,
      address: "asf",
      // testUid: [],
      typeTest,
    };
    console.log(data);
    axios
      .post(BASE_URL + "/lab/patients/labs/book", data, {
        headers: headers(),
      })
      .then((res) => {
        setUploading(false);
        toast(
          `ePrescription uploaded successfully our team will contact you shortly`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            type: "success",
          }
        );
      })
      .catch((err) => {
        setUploading(false);

        toast(`Some thing went wrong please try again later`, {
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
  };
  return (
    <>
      <Head>
        <title>eShaafi | Upload ePrescription</title>
      </Head>
      <section className="container">
        <span>
          <h2>Upload Prescription</h2>
          <AddressBar links={links} />
        </span>
        {!success ? (
          <div className={style.prescriptionContent}>
            <div className={style.prescripitonForm}>
              <Text28 className="fw-bold text-dark">
                Prescription Upload Guidelines
              </Text28>
              <ul>
                <li>
                  <IoCheckmarkDone style={{ color: "#0E5487" }} />
                  <Text16>Avoid uploading blurry Images</Text16>
                </li>
                <li>
                  <IoCheckmarkDone style={{ color: "#0E5487" }} />{" "}
                  <Text16>Do not crop out any part of the prescription</Text16>
                </li>
                <li>
                  <IoCheckmarkDone style={{ color: "#0E5487" }} />
                  <Text16>
                    Prescription should include Complete details of test
                  </Text16>
                </li>
              </ul>
              {show && (
                <form
                  className={style.prescriptionForm}
                  onSubmit={uploadPrescription}
                >
                  <div className={style.collectionForm}>
                    <p>Select Preference</p>
                    <div className={style.collectionOptions}>
                      <label
                        htmlFor="lab"
                        className={`${style.labelrdioclass} d-flex  align-items-center row-gap-1`}
                      >
                        <input
                          type="radio"
                          id="lab"
                          name="typeTest"
                          value={"labVisit"}
                          className={style.btnCheck}
                          onChange={handleFormData}
                        />
                        <span
                          className={
                            typeTest === "labVisit"
                              ? style.typeActive
                              : style.typeCircle
                          }
                        >
                          Lab Visit
                        </span>
                      </label>
                      <label
                        htmlFor="home"
                        className={`${style.labelrdioclass} d-flex  align-items-center row-gap-1`}
                      >
                        <input
                          type="radio"
                          onChange={handleFormData}
                          id="home"
                          name="typeTest"
                          value={"homeSample"}
                          className={style.btnCheck}
                        />
                        <span
                          className={
                            typeTest === "homeSample"
                              ? style.typeActive
                              : style.typeCircle
                          }
                        >
                          Home Sampling
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className={style.formFields}>
                    <InputField
                      placeHolder="Patient Name"
                      className={style.nameField}
                      name="patientName"
                      value={patientName}
                      onChange={handleFormData}
                    />
                    <InputField
                      type="date"
                      name="date"
                      value={date}
                      onChange={handleFormData}
                    />
                    <InputField
                      type="time"
                      name="time"
                      value={time}
                      onChange={handleFormData}
                    />
                    <select
                      name="labName"
                      value={labName}
                      id=""
                      onChange={handleFormData}
                      className={style.labField}
                    >
                      <option value="chugtai">hi</option>
                      <option value="chugtai">hsi</option>
                    </select>
                  </div>
                  <div className={style.paymentMethod}>
                    <input
                      type="radio"
                      className={style.btnCheck}
                      name="paymentId"
                      // id={itm.paymentId}
                      // value={itm.paymentId}
                      onClick={() => {
                        setPaymentId(itm.paymentId);
                        setMethod(itm.type);
                      }}
                      // disabled={wallet}
                    />
                    <label
                      className={`${style.labelrdioclass} d-flex  align-items-center p-3 row-gap-1`}
                      // htmlFor={itm.paymentId}
                    >
                      <span className={style.paymentActive}>
                        <Text18 className="text-dark fw-bold">
                          Cash on Delivery
                        </Text18>
                      </span>
                    </label>
                  </div>
                  <div className={style.notes}></div>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={
                      images &&
                      typeTest &&
                      patientName &&
                      date &&
                      time &&
                      labName
                        ? false
                        : true
                    }
                  >
                    Upload
                    {uploading && (
                      <>
                        <div
                          className="spinner-border text-blue spinner-border-sm ms-2"
                          role="status"
                        ></div>
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
            <div className={style.uploadEprescription}>
              <div className={style.uploadHereCont}>
                {!file ? (
                  <Image
                    src={images ? images : uploadRecords}
                    alt="upload-records"
                    width={80}
                    height={90}
                  />
                ) : (
                  <iframe src={images}></iframe>
                )}
                {/* <FileUploader
              handleChange={handleChange}
              name="file"
              types={fileTypes}
            /> */}
                {/* <p className=" fw-bold text-dark">Drop Your Image Here</p> */}
                {show || <Text11>Files Supported: PNG, JPG, and PDF </Text11>}
                {/* <p className=" fw-bold text-dark">or</p> */}
                <Button
                  variant={show ? "text" : "outlined"}
                  style={{ position: "relative", marginTop: "2rem" }}
                >
                  <input
                    type="file"
                    className={style.uploadingFile}
                    // hidden
                    ref={fileInputRef}
                    onChange={(e) => handleUpload(e)}
                    accept={".jpg, .jpeg, .png, .webp, .pdf"}
                  />
                  {loading ? (
                    <>
                      Loading
                      <div
                        className="spinner-border text-blue spinner-border-sm ms-2"
                        role="status"
                      ></div>
                    </>
                  ) : (
                    <span>{show ? "Upload again" : "Browse Files"}</span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div>success</div>
        )}
        <ToastContainer />
      </section>
    </>
  );
}
