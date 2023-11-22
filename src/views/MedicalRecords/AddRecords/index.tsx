import style from "@/styles/medicalRecords.module.scss";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "@/components/Button";
import { SectionHeading } from "@/components/Typography/Heading";
import { HiOutlinePlus } from "react-icons/hi2";

export default function AddRecords() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="d-flex justify-content-between">
        <SectionHeading content={"Uploaded Records"} />
        <Button onClick={handleShow} className={style.addRecordsBtn}>
          <HiOutlinePlus />
          Add Medical Record
        </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
