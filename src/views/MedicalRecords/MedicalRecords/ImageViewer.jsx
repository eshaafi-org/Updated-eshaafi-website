/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import Button from "@/components/Button";
import { Modal } from "react-bootstrap";
import style from "@/styles/medicalRecords.module.scss";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import axios from "axios";
import { FaXmark } from "react-icons/fa6";
import { MdAddToPhotos } from "react-icons/md";
import toArrayBuffer from "to-array-buffer";
import axios from "axios";
// import { Button } from '@mui/material'
// import Modal from '@mui/material/Modal'
// import { Box } from '@mui/material'
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
// import moment from "moment";
import { BASE_URL, headers, imgheaders } from "@/helper/CONST";

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
}) {
  const [imagesList, setImagesList] = useState(images);
  const fileInputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
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
  const handleShow = () => setShow(true);

  // handle delete record
  const handleDelete = (imgId) => {
    let id = entryId.split("#");
    axios
      .patch(
        BASE_URL + `/appointment/${id[0]}/shareMedicalRecord/${recordId}`,
        {
          date: "",
          doctor_name: "",
          image: imagesList.filter((itm) => itm !== imgId),
          pdf: [],
          record_type: "Other",
        },
        { headers: headers() }
      )
      .then((res) => {
        setImagesList((prev) => prev.filter((itm) => itm !== imgId));
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
  const handleUpload = (e) => {
    setLoading(true);
    let id = entryId.split("#");
    console.log(id);
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
              BASE_URL + `/appointment/${id[0]}/shareMedicalRecord/${recordId}`,
              {
                date: "",
                doctor_name: "",
                image: [...imagesList, res],
                pdf: [],
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
  };
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
            <img
              src={imagesList[imgItem]}
              alt=""
              className={style.viewingImage}
            />
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
                    <img
                      onClick={() => setImgItem(index)}
                      key={index}
                      src={item}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",

                        cursor: "pointer",
                      }}
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
                  <img
                    onClick={() => setImgItem(index)}
                    key={index}
                    className={index === imgItem ? "active-image" : ""}
                    src={item}
                    alt=""
                    style={{
                      width: "100px",
                      height: "125px",
                      margin: "5px",
                      cursor: "pointer",
                    }}
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
                  accept=".jpg, .jpeg, .png, .webp"
                  onChange={(e) => handleUpload(e)}
                />
                <MdAddToPhotos style={{ fontSize: "1.5rem" }} />
              </Button>
            )}
          </div>
        </div>
        <style jsx="true">{`
          .active-image {
            border: 3px solid #0e5487;
            border-radius: 5px;
          }
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
