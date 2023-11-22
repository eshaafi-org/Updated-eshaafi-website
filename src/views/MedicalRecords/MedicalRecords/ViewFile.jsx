/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Button from "@/components/Button";
import { Modal } from "react-bootstrap";
import style from "@/styles/medicalRecords.module.scss";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// import { Button } from '@mui/material'
// import Modal from '@mui/material/Modal'
// import { Box } from '@mui/material'
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import moment from "moment";

export default function ImageViewer({ images, patientName, date }) {
  const [show, setShow] = useState(false);
  const [imgItem, setImgItem] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const recordLength = images.length - 1;
  const handleClose = () => {
    setShow(false);
    setZoomed(false);
  };
  const handleShow = () => setShow(true);
  const handleImageDoubleClick = () => {
    setZoomed(!zoomed);
  };
  return (
    <>
      <Button
        className={style.date}
        style={{ textTransform: "none" }}
        onClick={handleShow}
      >
        View
      </Button>
      <Modal show={show} size="lg" onHide={handleClose}>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column pt-4 ps-4">
            <span
              className="text-capitalize"
              style={{ color: "#1E1E1E", fontSize: 14 }}
            >
              {patientName}
            </span>
            <span style={{ color: "#1E1E1E", fontSize: 10 }}>
              {moment(date).format("llll")}
            </span>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center  p-4">
          <Button
            className={style.forwardBtns}
            onClick={() => setImgItem(imgItem === 0 ? imgItem : imgItem - 1)}
          >
            <IoIosArrowBack />
          </Button>
          <div
            className="d-flex align-items-center"
            onDoubleClick={handleImageDoubleClick}
            style={{
              width: zoomed ? "650px" : "320px",
              maxHeight: zoomed ? "1000px" : "680px",
              marginBottom: "20px",
            }}
          >
            <img
              src={images[imgItem]}
              alt=""
              style={{ width: "100%", maxHeight: "100%" }}
              className="rounded my-1"
            />
          </div>
          <Button
            className={style.forwardBtns}
            onClick={() =>
              setImgItem(imgItem === recordLength ? imgItem : imgItem + 1)
            }
          >
            <IoIosArrowForward />
          </Button>
        </div>
        <div
          className="d-flex justify-content-center py-1 w-100"
          style={{ borderTop: "2px solid #F4F4F4" }}
        >
          <div
            className="d-flex justify-content-center py-1"
            style={{ width: "125px", height: "125px" }}
          >
            {images.map((item, index) => (
              <img
                onClick={() => setImgItem(index)}
                key={index}
                className={index === imgItem ? "active-image" : ""}
                src={item}
                alt=""
                style={{
                  // width: '100px',
                  // height: '125px',
                  margin: "5px",
                  cursor: "pointer",
                }}
              />
            ))}
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
