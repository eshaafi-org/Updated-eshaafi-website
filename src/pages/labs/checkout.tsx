"use client";
// Importing necessary components, styles, and images
import AddressBar from "@/components/AddressBar";
import Button from "@/components/Button";
import style from '@/styles/labs.module.scss'
import { InputField } from "@/components/InputField";
import { Text14, Text16, Text18, Text22, Text28 } from "@/components/Typography";
import cod from "../../../public/images/cod.svg"
import Image from "next/image";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { ModalBody } from "react-bootstrap";
import axios from "axios";
import { BASE_URL, headers } from "@/helper/CONST";
// add Address Modal
function AddressModal() {
    const [show, setShow] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [address, setAddress] = useState("");
    const [landmark, setLandmark] = useState("");
    // modal open and close function
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    function handleAddress() {
        axios.post(BASE_URL + "/patients/labs/address",
            {},
            {
                headers: headers()
            })
            .catch()
    }
    return (
        <>
            {/* Button where Modal open */}
            <Button className={`${style.blueColor} d-flex align-items-center gap-1`}
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
                        Please Provide your address to successfully book home Nursing Service
                    </Text14>
                    <div className={`${style.modalField} d-grid w-100 mt-3 gap-3`}>
                        {/* <InputField placeHolder="Address" className="w-100" /> */}
                        <select className="form-select"
                            value={selectedOption}
                            onChange={(e: { target: { value: string }; }) => setSelectedOption(e.target.value)}
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
                            <option value="MuzaffarabadAzadKashmir">Muzaffarabad (Azad Kashmir)</option>
                        </select>
                        <InputField placeHolder="Address" className="w-100" value={address}
                            onChange={(e: { target: { value: string }; }) => setAddress(e.target.value)} />
                        <InputField placeHolder="Landmark" className="w-100" value={landmark}
                            onChange={(e: { target: { value: string }; }) => setLandmark(e.target.value)} />
                    </div>
                    <div className="d-flex w-100 mt-5 col-gap-1">
                        <Button variant="contained">
                            Save Address
                        </Button>
                        <Button className={style.discard} type="reset">
                            Discard
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}
// Defining the Checkout component
export default function Checkout() {
    // Array of links for the breadcrumb navigation
    let links = [
        { name: "Home", link: "/" },
        { name: "Lab Tests", link: "/labs" },
        { name: "Chughtai Lab", link: `/labs/id` },
        { name: "Checkout", link: `/labs/Checkout` },
    ];
    const value = useSelector((state: any) => state.labCartReducer.value);
    console.log(value);
    // Rendering the Checkout component
    return (
        <section className="container">
            <span>
                {/* Heading and breadcrumb navigation */}
                <h2>Checkout</h2>
                <AddressBar links={links} />
            </span>
            {/* Main content of the Checkout page */}
            <div className={`${style.checkoutDetail} d-flex justify-content-between col-gap-1`}>
                {/* Order details section */}
                <div className={style.orderDetail}>
                    <Text28 className={style.blackColor}>Order Detail</Text28>
                    <div className="p-3">
                        {/* Individual test details */}
                        <span className="d-flex align-items-center justify-content-between">
                            <Text22 className={style.blackCol}>HbA1C</Text22>
                            <Text16 className={style.blueColor}>Rs. 1000</Text16>
                        </span>
                        <Text16>Glycated Hb test 1X</Text16>
                    </div>
                    {/* Payment method section */}
                    <div>
                        <Text28 className={style.blackColor}>Payment Method</Text28>
                        <div className="d-flex align-items-center border rounded p-3 col-gap-1 mt-3">
                            {/* Cash on Delivery icon */}
                            <Image
                                src={cod}
                                alt="COD"
                                width={24}
                                height={24}
                            />
                            <Text22 className={style.blackCol}>Cash on Delivery</Text22>
                        </div>
                        {/* Address and Add New Address button */}
                        <div className="d-flex align-items-center justify-content-between mt-3">
                            <Text28 className={style.blackColor}>Address</Text28>
                            <AddressModal />
                        </div>
                        {/* Displaying the address */}
                        <div className={`${style.address} mt-3 p-3`}>
                            <Text16>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</Text16>
                        </div>
                        {/* Note section */}
                        <div className={`${style.note} mt-3`}>
                            <Text28 className={style.blackColor}>Note</Text28>
                            {/* Input field for adding notes or instructions */}
                            <input
                                className="w-100 p-3 rounded mt-1"
                                placeholder="Write Note for any instructions to follow"
                            />
                        </div>
                    </div>
                </div>
                {/* Order summary and additional details section */}
                <div className={`${style.summary} d-flex flex-column p-4`}>
                    <Text18 className={style.blackColor}>Order Summary</Text18>
                    {/* Table displaying order summary details */}
                    <table className="w-100">
                        <tbody className="d-flex flex-column row-gap-4">
                            <tr>
                                <th>Tests</th>
                                <td>2</td>
                            </tr>
                            <tr>
                                <th>Total Charges</th>
                                <td>Rs. 250</td>
                            </tr>
                            <tr>
                                <th>Payment Method</th>
                                <td>COD</td>
                            </tr>
                        </tbody>
                    </table>
                    {/* Input field and button for applying discount codes or promo codes */}
                    <span className="w-100 d-flex">
                        <InputField placeHolder="Discount code or promo code" />
                        <Button variant="contained" className={style.applyButton}>Apply</Button>
                    </span>
                    {/* Button for placing the order */}
                    <Button variant="contained">Place Order</Button>
                </div>
            </div>
        </section>
    )
}
