import style from "./Profile.module.scss";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "../Button";
import { HiOutlinePlus } from "react-icons/hi2";
export default function AddProfile() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
