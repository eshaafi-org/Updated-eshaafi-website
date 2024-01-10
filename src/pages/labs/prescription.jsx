"use client";
import { useState, useRef } from "react";
import AddressBar from "@/components/AddressBar";
import Head from "next/head";
import style from "@/styles/labs.module.scss";
import { Text28, Text16, Text11 } from "@/components/Typography";
import { IoCheckmarkDone } from "react-icons/io5";
import uploadRecords from "../../../public/images/uploadRecords.svg";
import Image from "next/image";
import axios from "axios";
import { BASE_URL, imgheaders } from "@/helper/CONST";
import Button from "@/components/Button";
import { ToastContainer, toast } from "react-toastify";
import toArrayBuffer from "to-array-buffer";
let links = [
  { name: "Home", link: "/" },
  { name: "Lab Tests", link: "/labs" },
  { name: "Upload Prescription", link: `/labs/prescription` },
];
export default function Prescription() {
  const pdfRegex = /\bpdf\b/i;
  const [images, setImages] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState("");
  const fileInputRef = useRef();
  // all the functions
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
  // if file type is supported than go head and upload the record
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
        <ToastContainer />
      </section>
    </>
  );
}
