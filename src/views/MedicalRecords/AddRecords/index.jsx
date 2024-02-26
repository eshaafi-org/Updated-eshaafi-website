import style from "@/styles/medicalRecords.module.scss";
import { useState, useRef, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "@/components/Button";
import { SectionHeading } from "@/components/Typography";
import { HiOutlinePlus } from "react-icons/hi2";
import { FaXmark } from "react-icons/fa6";
import Image from "next/image";
import uploadRecords from "../../../../public/images/uploadRecords.svg";
import toArrayBuffer from "to-array-buffer";
import axios from "axios";
import pdfIcon from "../../../../public/pdfIcon.svg";
import { BASE_URL, imgheaders, headers } from "@/helper/CONST";

// import { FileUploader } from "react-drag-drop-files";
// const fileTypes = ["JPG", "PNG", "GIF"];
export default function AddRecords({ patient, getMedicalRecords, toast }) {
  // states and variables
  const [images, setImages] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState("");
  const fileInputRef = useRef();
  const [fileType, setFileType] = useState(".jpg, .jpeg, .png, .webp, .pdf");
  // handle closing modal
  const handleClose = () => {
    setShow(false);
    setFileType(".jpg, .jpeg, .png, .webp, .pdf");
    setImages([]);
    setLoading(false);
  };
  // show modal
  const handleShow = () => {
    if (patient.profileId) {
      setShow(true);
    } else {
      toast("Select any profile to proceed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        type: "warning",
      });
    }
  };
  // handle delete record
  const handleDeleteRecord = async (img) => {
    setImages((prev) => prev.filter((itm) => itm !== img));
    // if (images.length === 0) {
    //   setFileType(".jpg, .jpeg, .png, .webp, .pdf");
    // }
  };
  const pdfRegex = /\bpdf\b/i;
  // handling uploading of image
  const handleUpload = (e) => {
    const [file] = e.target.files || e.dataTransfer.files;
    // if file type is supported than go head and upload the record
    if (file.size <= 4000000) {
      if (
        file?.type === "image/jpeg" ||
        file?.type === "application/pdf" ||
        file?.type === "image/png" ||
        file?.type === "image/webp"
      ) {
        setLoading(true);
        // if previous jpeg
        if (pdfRegex.test(file?.type)) {
          // let suppose current file type is jpeg, png
          if (fileType === ".jpg, .jpeg, .png, .webp") {
            setLoading(false);
            toast(
              `This is a different file format from your previous format is "${fileType}". You can add one record of one format with multiple entries.`,
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
          } else {
            setFileType(".pdf");
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
                  let nextImg = response.data.response.url;
                  setLoading(false);
                  setImages((prev) => [...prev, nextImg]);
                  // setFile(response.data.response.url);
                  return nextImg;
                })
                .catch((error) => {
                  setLoading(false);
                  console.log(error);
                });
            };
          }
        } else {
          if (fileType === ".pdf") {
            setLoading(false);
            toast(
              `This is a different file format from your previous format is "${fileType}". You can add one record of one format with multiple entries.`,
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
          } else {
            // setting the file format
            setFileType(".jpg, .jpeg, .png, .webp");
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
                  let nextImg = response.data.response.url;
                  setLoading(false);
                  setImages((prev) => [...prev, nextImg]);
                  // setFile(response.data.response.url);
                  return nextImg;
                })
                .catch((error) => {
                  setLoading(false);
                  console.log(error);
                });
            };
          }
        }
        // const reader = new FileReader();
        // reader.readAsBinaryString(file);
        // //preview onload function.
        // reader.onload = async () => {
        //   // this is the base64 data
        //   const fileRes = btoa(reader.result);
        //   const base64Image = toArrayBuffer(fileRes);
        //   axios
        //     .post(
        //       `${BASE_URL}/image-upload-api/type/${
        //         pdfRegex.test(file?.type) ? "pdf" : "new"
        //       }`,
        //       base64Image,
        //       {
        //         headers: imgheaders(),
        //       }
        //     )
        //     .then((response) => {
        //       let nextImg = response.data.response.url;
        //       setLoading(false);
        //       setImages((prev) => [...prev, nextImg]);
        //       // setFile(response.data.response.url);
        //       return nextImg;
        //     })
        //     .catch((error) => {
        //       setLoading(false);
        //       console.log(error);
        //     });
        // };
      } else {
        setLoading(false);
        if (file?.type) {
          toast(
            `🥺 Sorry, This file format does not supported, Choose the file with you last format: "${fileType}"`,
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
    // preview img
  };
  // uploading records
  const uploadingRecords = () => {
    setUploading(true);
    axios
      .post(
        BASE_URL + `/patients/addMedicalRecord/${patient.patientId}`,
        {
          image: fileType === ".pdf" ? [] : images,
          pdf: fileType === ".pdf" ? images : [],
        },
        {
          headers: headers(),
        }
      )
      .then((res) => {
        setUploading(false);
        setImages([]);
        setFileType(".jpg, .jpeg, .png, .webp, .pdf");
        toast("Record updated successfully", {
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
        getMedicalRecords();
      })
      .catch((err) => {
        setUploading(false);
        console.log(err);
      });
  };
  // use effect
  useEffect(() => {
    if (images.length < 1) {
      setFileType(".jpg, .jpeg, .png, .webp, .pdf");
    }
  }, [images]);
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <SectionHeading content={"Uploaded Records"} />
        <Button onClick={handleShow} className={style.addRecordsBtn}>
          <HiOutlinePlus />
          Add Medical Record
        </Button>
      </div>
      <Modal show={show} onHide={handleClose} size="lg">
        {/* modal header */}
        <div className="d-flex align-items-center border-bottom align-items-center py-2">
          <div className="w-40 ps-3">
            <Button onClick={handleClose}>
              <FaXmark className={style.deleteIcon} />
            </Button>
          </div>
          <p className="w-50 fw-bold text-dark">Upload Medical Records</p>
        </div>
        {/* modal body */}
        <div className={style.addMedicalRecordsModalcontainer}>
          <div className={style.uploadHereCont}>
            <Image
              src={uploadRecords}
              alt="upload-records"
              width={80}
              height={90}
            />
            {/* <FileUploader
              handleChange={handleChange}
              name="file"
              types={fileTypes}
            /> */}
            {/* <p className=" fw-bold text-dark">Drop Your Image Here</p> */}
            <p>Files Supported: PNG, JPG, and PDF </p>
            {/* <p className=" fw-bold text-dark">or</p> */}
            <Button variant="outlined" style={{ position: "relative" }}>
              <input
                type="file"
                className={style.uploadingFile}
                // hidden
                ref={fileInputRef}
                onChange={(e) => handleUpload(e)}
                accept={fileType}
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
                "Browse Files"
              )}
            </Button>
          </div>
          <div className={style.modalRecordList}>
            <ul className={style.uploadedImageslist}>
              <p className="w-50 fw-bold text-dark">Selected Records</p>
              {images.length < 1 ? (
                <p>No Records</p>
              ) : (
                images.map((itm, indx) => (
                  <li key={indx}>
                    <span className="d-flex align-items-center col-gap-0-5">
                      <Image
                        src={fileType === ".pdf" ? pdfIcon : itm}
                        width={32}
                        height={42}
                        alt="patient-medical-record"
                        style={{ borderRadius: 3 }}
                      />
                      <p>Record {indx + 1}</p>
                    </span>
                    <Button onClick={() => handleDeleteRecord(itm)}>
                      <FaXmark />
                    </Button>
                  </li>
                ))
              )}
            </ul>
            <div className={style.modalActionBtn}>
              <Button
                onClick={uploadingRecords}
                variant="contained"
                disabled={images.length < 1}
              >
                {uploading ? (
                  <>
                    Loading
                    <div
                      className="spinner-border text-white spinner-border-sm ms-2"
                      role="status"
                    ></div>
                  </>
                ) : (
                  "Upload Records"
                )}
              </Button>
              <Button className="text-danger" onClick={handleClose}>
                Discard
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
