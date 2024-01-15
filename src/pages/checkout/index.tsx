"use client";
// Importing necessary components, styles, and images
import AddressBar from "@/components/AddressBar";
import Button from "@/components/Button";
import style from '@/styles/labs.module.scss'
import { InputField } from "@/components/InputField";
import { Text16, Text18, Text22, Text28 } from "@/components/Typography";
import { useSelector } from "react-redux";
import Head from "next/head";
import { useState } from "react";
import Info from "@/views/Labs/info";
// add Address Modal

// Defining the Checkout component
export default function Checkout() {
    // Array of links for the breadcrumb navigation
    let links = [
        { name: "Home", link: "/" },
        { name: "Lab Tests", link: "/labs" },
        { name: "Chughtai Lab", link: `/labs/Chugtai-Lab` },
        { name: "Checkout", link: `Checkout` },
    ];
    const { cart, totalAmount } = useSelector(
        (state: any) => state.labCartReducer
    );
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
                        <Text28 className={style.blackColor}>Order Detail</Text28>
                        {cart.map((item: any, index: number) => (
                            <div className="p-3" key={index}>
                                {/* Individual test details */}
                                <span className="d-flex align-items-center justify-content-between">
                                    <Text22 className={style.blackCol}>{item.MedicineName}</Text22>
                                    <Text16 className={style.blueColor}>Rs. {item.productPrice}</Text16>
                                </span>
                                <Text16>{item.category} {item.quantity}X</Text16>
                            </div>
                        ))}
                        {/* Payment method section */}
                        <div>
                            {/* Information */}
                            <Info />
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
                                    <td>{totalAmount}</td>
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
        </>
    )
}
