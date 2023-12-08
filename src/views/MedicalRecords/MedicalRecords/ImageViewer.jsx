/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import Button from "@/components/Button";
import { Modal } from "react-bootstrap";
import style from "@/styles/medicalRecords.module.scss";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import { MdAddToPhotos } from "react-icons/md";
import toArrayBuffer from "to-array-buffer";
import axios from "axios";
import { BASE_URL, headers, imgheaders } from "@/helper/CONST";
import Image from "next/image";
import { FaEye } from "react-icons/fa";
import pdfIcon from "../../../../public/pdfIcon.svg";
// import { Worker, Viewer } from "react-pdf-viewer";
// import Worker from "react-pdf-viewer";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// image viewer
export default function ImageViewer({
  images,
  patientName,
  date,
  show,
  setShow,
  edit,
  setEdit,
  recordId,
  entryId,
  toast,
  getMedicalRecords,
  fileType,
}) {
  const [imagesList, setImagesList] = useState(images);
  const fileInputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const pdfRegex = /\bpdf\b/i;
  // const [show, setShow] = useState(false);
  const [imgItem, setImgItem] = useState(0);
  const recordLength = images.length - 1;
  const handleClose = () => {
    setShow(false);
    if (edit) {
      setEdit(false);
      getMedicalRecords();
    }
  };
  // handle show
  const handleShow = () => setShow(true);
  // handle delete record
  const handleDelete = (imgId) => {
    let id = entryId.split("#");
    let listing = imagesList.filter((itm) => itm !== imgId);
    setImgItem(imagesList.length - 2);
    console.log(listing);
    setImagesList(listing);
    // for image list
    let fileData = {
      date: "",
      doctor_name: "",
      image: listing,
      pdf: [],
      record_type: "Other",
    };
    // for pdf list
    let pdfData = {
      date: "",
      doctor_name: "",
      image: [],
      pdf: listing,
      record_type: "Other",
    };
    axios
      .patch(
        BASE_URL + `/appointment/${id[0]}/shareMedicalRecord/${recordId}`,
        fileType === "image" ? fileData : pdfData,
        { headers: headers() }
      )
      .then((res) => {
        // setImagesList((prev) => prev.filter((itm) => itm !== imgId));
        // setImgItem(imagesList.length - 2);

        toast("Record Deleted Successfully", {
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
      .catch((err) => console.log(err));
  };
  // console.log(images);
  const handleUpload = async (e) => {
    let id = entryId.split("#");
    // console.log(id);
    const [file] = e.target.files || e.dataTransfer.files;
    // console.log(file);
    // preview img
    if (file?.type) {
      setLoading(true);
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      //preview onload function.
      reader.onload = async () => {
        // this is the base64 data
        const fileRes = btoa(reader.result);
        // console.log(fileRes);
        const base64Image = toArrayBuffer(fileRes);
        console.log(base64Image);
        axios
          .post(
            `${BASE_URL}/image-upload-api/type/${
              fileType === "image" ? "new" : "pdf"
            }`,
            base64Image,
            {
              headers: imgheaders(),
            }
          )
          .then((response) => {
            let nextImg = response.data.response.url;
            setLoading(false);
            setImagesList((prev) => [...prev, nextImg]);
            setFile(response.data.response.url);
            fileInputRef.current.value = "";
            return nextImg;
          })
          .then((res) => {
            axios
              .patch(
                BASE_URL +
                  `/appointment/${id[0]}/shareMedicalRecord/${recordId}`,
                {
                  date: "",
                  doctor_name: "",
                  image: fileType === "image" ? [...imagesList, res] : [],
                  pdf: fileType === "image" ? [] : [...imagesList, res],
                  record_type: "Other",
                },
                { headers: headers() }
              )
              .then((res) => {
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
                console.log(res);
              })
              .catch((err) => console.log(err));
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
      };
    }
  };

  // updating records
  useEffect(() => {
    setImagesList(images);
  }, [images]);
  return (
    <>
      <Button
        className={`${style.viewRecords}`}
        style={{ textTransform: "none" }}
        onClick={handleShow}
      >
        View
      </Button>
      <Modal show={show} size="lg" onHide={handleClose}>
        {/* modal header */}
        <div className="d-flex align-items-center border-bottom py-2 align-items-center">
          <div className="w-40 ps-3">
            <Button onClick={handleClose}>
              <FaXmark className={style.deleteIcon} />
            </Button>
          </div>
          <p className="w-50 fw-bold text-dark">Medical Records</p>
        </div>
        {/* image viewer modue */}
        <div className={style.imageViewer}>
          <Button
            className={style.forwardBtns + " shadow-sm"}
            onClick={() => setImgItem(imgItem === 0 ? imgItem : imgItem - 1)}
          >
            <IoIosArrowBack />
          </Button>
          <div className={style.imageContainer}>
            {fileType === "image" ? (
              <Image
                src={imagesList[imgItem]}
                alt=""
                className={style.viewingImage}
                width={800}
                height={800}
              />
            ) : (
              <div className={style.pdfViewer}>
                <iframe src={imagesList[imgItem]} className={style.pdfFram} />
                <a
                  href={imagesList[imgItem]}
                  target="_blank"
                  className={style.viewPdf}
                >
                  <span className={style.pdfText}>
                    <p className="text-primary fw-bold">Click To view</p>
                    {/* <p style={{ fontSize: 8, whiteSpace: "wrap" }}>
                      {imagesList[imgItem]}
                    </p> */}
                  </span>
                </a>
              </div>
            )}
          </div>
          <Button
            className={style.forwardBtns + " shadow-sm"}
            onClick={() =>
              setImgItem(imgItem === recordLength ? imgItem : imgItem + 1)
            }
          >
            <IoIosArrowForward />
          </Button>
        </div>
        {/* gallery container */}
        <div className={style.galleryContainer + " border-top"}>
          <div className="d-flex justify-content-center col-gap-0-5">
            {imagesList.map((item, index) => (
              <>
                {edit ? (
                  <div className={style.editImageDiv}>
                    <Image
                      onClick={() => setImgItem(index)}
                      key={index}
                      src={fileType === "image" ? item : pdfIcon}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                      }}
                      width={100}
                      height={100}
                    />
                    {imagesList.length > 1 && (
                      <Button
                        onClick={() => handleDelete(item)}
                        className={style.deleteRecordBtn}
                      >
                        <FaXmark className={style.deleteIcon} />
                      </Button>
                    )}
                  </div>
                ) : (
                  <Image
                    onClick={() => setImgItem(index)}
                    key={index}
                    className={index === imgItem ? style.activeImg : ""}
                    src={fileType === "image" ? item : pdfIcon}
                    alt=""
                    style={{
                      width: "100px",
                      height: "125px",
                      margin: "5px",
                      cursor: "pointer",
                    }}
                    width={500}
                    height={300}
                  />
                )}
              </>
            ))}
            {loading && (
              <Button className={style.addRecordBtn}>
                <div
                  className="spinner-border text-white spinner-border-sm"
                  role="status"
                ></div>
              </Button>
            )}
            {edit && (
              <Button className={style.addRecordBtn}>
                <input
                  type="file"
                  className={style.uploadingFile}
                  ref={fileInputRef}
                  accept={
                    fileType === "image" ? ".jpg, .jpeg, .png, .webp" : ".pdf"
                  }
                  onChange={(e) => handleUpload(e)}
                />
                <MdAddToPhotos style={{ fontSize: "1.5rem" }} />
              </Button>
            )}
          </div>
        </div>
        <style jsx="true">{`
          .image-view {
            cursor: pointer;
          }
          .image-view:hover {
            text-decoration: underline;
          }
        `}</style>
      </Modal>
    </>
  );
}
