"use client";
// Importing necessary components, styles, and images
import AddressBar from "@/components/AddressBar";
import Button from "@/components/Button";
import style from '@/styles/labs.module.scss'
import { Text16, Text18, Text22, Text28 } from "@/components/Typography";
import { useSelector } from "react-redux";
import Head from "next/head";
import { useEffect, useState } from "react";
import Info from "@/views/Labs/info";
import axios from "axios";
import { BASE_URL, headers } from "@/helper/CONST";
import { ToastContainer, toast } from "react-toastify";
import Profiles from "@/components/Profiles";
// Defining the Checkout component
export default function Checkout() {
    // Array of links for the breadcrumb navigation
    let links = [
        { name: "Home", link: "/" },
        { name: "Lab Tests", link: "/labs" },
        { name: "Checkout", link: `/checkout` },
    ];
    const { cart, totalAmount, subTotalAmount } = useSelector(
        (state: any) => state.labCartReducer
    );
    const [profile, setProfile] = useState<any>('')
    const [address, setAddress] = useState("");
    const [typeTest, setTypeTest] = useState("");
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [labName, setLabName] = useState("");
    const [patientName, setPatientName] = useState("");
    const [uploading, setUploading] = useState(false);

    const bookLab = () => {
        // e.preventDefault();
        setUploading(true);
        const data = {
            patientName: patientName,
            time: time,
            date: date,
            labName: labName,
            typeTest: typeTest,
            testUid: cart.map((item: { Sk: any; quantity: { toString: () => any; }; }) => ({ uuid: item.Sk, quantity: item.quantity.toString() })),
        }
        axios
            .post(
                BASE_URL + "/lab/patients/labs/book",
                typeTest === "homeSample" ? { ...data, address } : data,
                {
                    headers: headers(),
                }
            )
            .then((res) => {
                setUploading(false);
                toast(
                    `Lab Booked successfully our team will contact you shortly`,
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
                )
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
    }
    // Function to calculate total quantity and total discount
    const calculateTotals = () => {
        let totalQuantity = 0;
        let totalDiscount = 0;
        // Iterate over each item in the cart
        cart.forEach((item: any) => {
            totalQuantity += item.quantity;
            totalDiscount += parseInt(item.discount) || 0;
        });
        const averageDiscount = totalDiscount / cart.length;
        return { totalQuantity, averageDiscount };
    }
    // useEffect hook to watch changes in profile and update patientName accordingly
    useEffect(() => {
        if (profile && profile.patientName) {
            setPatientName(profile.patientName);
        }
    }, [profile]);
    // Rendering the Checkout component
    return (
        <>
            <Head>
                <title>eShaafi | Labs</title>
            </Head>
            <section className="container">
                <span>
                    {/* Heading and breadcrumb navigation */}
                    <h2>Checkout</h2>
                    <AddressBar links={links} />
                </span>
                {/* Main content of the Checkout page */}
                <div className={`${style.checkoutDetail} d-flex justify-content-between col-gap-2`}>
                    {/* Order details section */}
                    <div className={style.orderDetail}>
                        <span>
                            <p className="mt-4 pb-2">Booking For</p>
                            <Profiles patient={profile} setPatient={setProfile} />
                        </span>
                        <Text28 className={style.blackColor1}>Order Detail</Text28>
                        {cart.map((item: any, index: number) => (
                            <div className="p-3" key={index}>
                                {/* Individual test details */}
                                <span className="d-flex align-items-center justify-content-between">
                                    <Text22 className={style.blackCol}>{item.MedicineName}</Text22>
                                    <span className="d-flex gap-1">
                                        <Text16 className={style.fadeColor}>Rs. {item.subPrice}</Text16>
                                        <Text16 className={style.blueColor}>Rs. {item.productPrice}</Text16>
                                    </span>
                                </span>
                                <Text16>Quantity {item.quantity}X</Text16>
                            </div>
                        ))}
                        {/* Payment method section */}
                        <div>
                            {/* Information */}
                            <Info
                                typeTest={typeTest}
                                setTypeTest={setTypeTest}
                                address={address}
                                setAddress={setAddress}
                                patientName={patientName}
                                setPatientName={setPatientName}
                                time={time}
                                setTime={setTime}
                                date={date}
                                setDate={setDate}
                                labName={labName}
                                setLabName={setLabName}
                            />
                            {/* Note section */}
                            <div className={`${style.note} mt-3`}>
                                <Text28 className={style.blackColor1}>Note</Text28>
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
                        <Text18 className={style.blackColor1}>Order Summary</Text18>
                        {/* Table displaying order summary details */}
                        <table className="w-100">
                            <tbody className="d-flex flex-column row-gap-4">
                                <tr>
                                    <th>Tests</th>
                                    <td>{calculateTotals().totalQuantity}</td>
                                </tr>
                                <tr>
                                    <th>Sub Total Charges</th>
                                    <td>Rs. {subTotalAmount}</td>
                                </tr>
                                <tr>
                                    <th>Discount</th>
                                    <td>{calculateTotals().averageDiscount}%</td>
                                </tr>
                                <tr>
                                    <th>Total Charges</th>
                                    <td>Rs. {totalAmount}</td>
                                </tr>
                                <tr>
                                    <th>Payment Method</th>
                                    <td>COD</td>
                                </tr>
                            </tbody>
                        </table>
                        {/* Input field and button for applying discount codes or promo codes */}
                        {/* <span className="w-100 d-flex">
                            <InputField placeHolder="Discount code or promo code" />
                            <Button variant="contained" className={style.applyButton}>Apply</Button>
                        </span> */}
                        {/* Button for placing the order */}
                        <Button variant="contained"
                            onClick={bookLab}
                            disabled={
                                typeTest &&
                                    patientName &&
                                    date &&
                                    time &&
                                    labName
                                    ? false
                                    : true
                            }
                        >
                            Place Order
                            {uploading && (
                                <>
                                    <div
                                        className="spinner-border text-blue spinner-border-sm ms-2"
                                        role="status"
                                    ></div>
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    )
}
