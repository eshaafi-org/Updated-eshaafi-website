"use client";
import React from "react";
import Button from "@/components/Button";
import { InputField } from "@/components/InputField";
import { Text14, Text18, Text28 } from "@/components/Typography";
import { RxCross2 } from "react-icons/rx";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { ModalBody } from "react-bootstrap";
import axios from "axios";
import { BASE_URL, headers } from "@/helper/CONST";
import { FaPlus } from "react-icons/fa6";
import style from "@/styles/labs.module.scss";
import { ToastContainer, toast } from 'react-toastify';

function AddressModal({ getAddress }: { getAddress: any }) {
  const [show, setShow] = useState(false);
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  // modal open and close function
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function handleAddress() {
    const value = {
      area: city,
      city: city,
      landMark: landmark,
      address: address,
    };
    axios
      .post(BASE_URL + "/lab/patients/labs/address", value, {
        headers: headers(),
      })
      .then((response) => {
        toast("Address Added to Successfully ", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          type: "success",
        });
        handleClose();
        getAddress();
      })
      .catch((error) => {
        console.error("Error saving address:", error);
        toast.error("Error saving address");
      });
  }
  return (
    <>
      {/* Button where Modal open */}
      <Button
        className={`${style.blueColor} d-flex align-items-center gap-1`}
        onClick={handleShow}
      >
        <FaPlus /> Add New Address
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName={style.customModal}
      >
        <Modal.Header>
          {/* Close button on the left */}
          <Button className="btn btn-sm btn-link" onClick={handleClose}>
            <RxCross2 style={{ fontSize: "1.5rem", color: "#6c757d" }} />
          </Button>
          <div className="d-flex justify-content-center w-100">
            {/* Title in the center */}
            <Text18 className={"text-dark fw-bolder"}>View Details</Text18>
          </div>
        </Modal.Header>
        <ModalBody>
          <Text14>
            Please Provide your address to successfully book home Nursing
            Service
          </Text14>
          <div className={`${style.modalField} d-grid w-100 mt-3 gap-3`}>
            {/* <InputField placeHolder="Address" className="w-100" /> */}
            <select
              className="form-select"
              value={city}
              onChange={(e: { target: { value: string } }) =>
                setCity(e.target.value)
              }
            >
              <option value="">Select City</option>
              <option value="Islamabad">Islamabad (Capital City)</option>
              <option value="Karachi">Karachi</option>
              <option value="Lahore">Lahore</option>
              <option value="Faisalabad">Faisalabad</option>
              <option value="Rawalpindi">Rawalpindi</option>
              <option value="Multan">Multan</option>
              <option value="Peshawar">Peshawar</option>
              <option value="Quetta">Quetta</option>
              <option value="Sialkot">Sialkot</option>
              <option value="Gujranwala">Gujranwala</option>
              <option value="Abbottabad">Abbottabad</option>
              <option value="Sargodha">Sargodha</option>
              <option value="Bahawalpur">Bahawalpur</option>
              <option value="Sukkur">Sukkur</option>
              <option value="Larkana">Larkana</option>
              <option value="RahimYarKhan">Rahim Yar Khan</option>
              <option value="Jhang">Jhang</option>
              <option value="Sheikhupura">Sheikhupura</option>
              <option value="MirpurAzadKashmir">Mirpur (Azad Kashmir)</option>
              <option value="MuzaffarabadAzadKashmir">
                Muzaffarabad (Azad Kashmir)
              </option>
            </select>
            <InputField
              placeHolder="Address"
              className="w-100"
              value={address}
              onChange={(e: { target: { value: string } }) =>
                setAddress(e.target.value)
              }
            />
            <InputField
              placeHolder="Landmark"
              className="w-100"
              value={landmark}
              onChange={(e: { target: { value: string } }) =>
                setLandmark(e.target.value)
              }
            />
          </div>
          <div className="d-flex w-100 mt-5 col-gap-1">
            <Button variant="contained" type="submit" onClick={handleAddress}>
              Save Address
            </Button>
            <Button
              className={style.discard}
              type="reset"
              onClick={handleClose}
            >
              Discard
            </Button>
          </div>
        </ModalBody>
      </Modal>
      
    </>
  );
}
function Address({
  address,
  setAddress,
}: {
  address: string;
  setAddress: any;
}) {
  const [addressList, setAdressList] = useState([]);
  const getAddress = () => {
    axios
      .get(BASE_URL + "/lab/patients/labs/address", {
        headers: headers(),
      })
      .then((res) => {
        setAdressList(res.data.response.Items);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getAddress();
  }, []);
  return (
    <div className={style.addressContainer}>
      <div className="d-flex align-items-center justify-content-between">
        <Text28 className={style.blackColor}>Address</Text28>
        <AddressModal getAddress={getAddress} />
      </div>
      {/* Displaying the address */}
      <ul className={`${style.address}`}>
        {addressList.map((item: any, index: number) => (
          <li key={index} className={style.addressListItem}>
            <label
              className={`${style.labelrdioclass} d-flex  align-items-center row-gap-1`}
            >
              <input
                type="radio"
                name="patientAddress"
                value={`${item.address} ${item.landMark}, ${item.city}`}
                onChange={(e) => setAddress(e.target.value)}
                className={style.btnCheck}
              />
              <span
                className={
                  address === `${item.address} ${item.landMark}, ${item.city}`
                    ? style.paymentActive
                    : style.paymentCircle
                }
              >
                {item.address + " " + item.landMark + ", " + item.city}
              </span>
            </label>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
}
export default React.memo(Address);
