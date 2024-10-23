"use client";
import Image from "next/image";
import { useRouter } from "next/router";
import successGif from "../../../public/images/success.gif";
import eShaafiApp from "../../../public/images/download-badge-google-play-badge.png";
import Head from "next/head";
import CryptoJS from "crypto-js";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL, headers } from "@/helper/CONST";
import { ToastContainer, toast } from "react-toastify";

export default function PaymentSuccess() {
    const router = useRouter();
    console.log(router.query);

    // Ensure the encryption key is Base64 decoded before use
    const encryptionKey = CryptoJS.enc.Base64.parse("WThxTGd6M1FURmNLRnNYNGJZWWZtSXR4eGFMX3ZZWlVwT0dBMzlaNloyZz0=");

    // Function to extract and structure basket_id and slot_id
    const parseQuery = (query: any) => {
        const basketAndSlot = query.basket_id;

        if (basketAndSlot) {
            // Separate the basket_id by splitting at "slot_id="
            const [basket_id, slotData] = basketAndSlot.split("slot_id=");
            const slot_id = slotData ? slotData : ""; // In case slotData exists
            return {
                basket_id,
                slot_id,
            };
        }

        // Return empty object or handle the absence of basket_id gracefully
        return {
            basket_id: "",
            slot_id: "",
        };
    };

    // Encrypt the router.query object including the new basket_id and slot_id
    const encryptQuery = (query: any) => {
        // Extract the basket_id and slot_id from the query
        const { basket_id, slot_id } = parseQuery(query);

        // Merge the new basket_id and slot_id with the rest of the query data
        const modifiedQuery = {
            ...query,         // Include all existing query data
            basket_id,        // Add extracted and cleaned basket_id
            slot_id           // Add extracted slot_id
        };

        // Log all data before encryption
        console.log("Data before encryption:", modifiedQuery);

        const queryString = JSON.stringify(modifiedQuery);

        // Encrypt the data and return Base64 encoded ciphertext
        const encrypted = CryptoJS.AES.encrypt(queryString, encryptionKey, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });

        return encrypted.toString();  // Convert to Base64 string for transmission
    };

    // Function to handle encrypted data submission
    const handleEncryptData = () => {
        const encryptedQuery = encryptQuery(router.query);  // Encrypt the full query data
        const data = { data: encryptedQuery };

        // API call to backend to submit encrypted data
        axios.post(`${BASE_URL}/new/patients/payfast/payments`, data, {
            headers: headers(),
        })
            .then((response) => {
                console.log("Encryption and transmission successful:", response);
                toast.success("Payment data successfully sent!", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
            .catch((error) => {
                console.error("Error submitting encrypted data:", error);
                toast.error("Error submitting payment data");
            });
    };

    // On component mount, handle the encryption and data submission
    useEffect(() => {
        if (router.query.basket_id) {
            handleEncryptData();
        }
    }, [router.query]);

    return (
        <>
            <Head>
                <title>Book Appointment</title>
                <meta name="description" content="Meet one on one with your doctor" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="d-flex align-items-center row-gap-1 col-gap-1 position-relative flex-column w-100 justify-content-center">
                <Image
                    src={successGif.src}
                    alt="successGif"
                    width={200}
                    height={200}
                />
                <p style={{ fontSize: 22, color: "#40C175", fontWeight: 700 }}>
                    Booking Successful!
                </p>
                <p className="text-2 text-center">
                    To Attend Consultation Download the eShaafi App
                </p>
                <a
                    href="https://play.google.com/store/apps/details?id=com.eshaafi.patient.consultation"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image src={eShaafiApp} alt="download-eshaafi-app" />
                </a>
            </div>
            <ToastContainer />
        </>
    );
}
