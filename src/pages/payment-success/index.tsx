"use client";
import Image from "next/image";
import { useRouter } from "next/router";
import successGif from "../../../public/images/success.gif";
import eShaafiApp from "../../../public/images/download-badge-google-play-badge.png";
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, headers } from "@/helper/CONST";
import { ToastContainer, toast } from "react-toastify";
import crypto from "crypto";
import base64url from "base64url";  // Make sure to install this package

export default function PaymentSuccess() {
    const router = useRouter();
    const [loading, setLoading] = useState(false); // Add loading state

    // Encryption key (same as in your Node.js code)
    const encryptionKey = 'WThxTGd6M1FURmNLRnNYNGJZWWZtSXR4eGFMX3ZZWlVwT0dBMzlaNloyZz0=';

    // Decode the base64url-encoded key and ensure it's exactly 32 bytes
    const key: any = base64url.toBuffer(encryptionKey).slice(0, 32);

    // Function to encrypt data using AES-256-GCM with Node's crypto module
    const encryptData = (data: any) => {
        const iv: any = crypto.randomBytes(12); // AES-GCM requires a 12-byte IV
        const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

        let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'base64');
        encrypted += cipher.final('base64');

        const authTag = cipher.getAuthTag(); // Get the authentication tag

        // Combine IV, encrypted data, and auth tag, then return base64url-encoded string
        return base64url.encode(Buffer.concat([iv, Buffer.from(encrypted, 'base64'), authTag]));
    };

    // Function to parse and structure the basket_id and slot_id from the query
    const parseQuery = (query: any) => {
        const basketAndSlot = query.basket_id;

        if (basketAndSlot) {
            const [basket_id, slotData] = basketAndSlot.split("slot_id=");
            const slot_id = slotData ? slotData : "";
            return { basket_id, slot_id };
        }

        return { basket_id: "", slot_id: "" };
    };

    // Encrypt the router.query object including basket_id and slot_id
    const encryptQuery = (query: any) => {
        const { basket_id, slot_id } = parseQuery(query);

        const modifiedQuery = {
            ...query,
            basket_id,
            slot_id,
        };

        console.log("Data before encryption:", modifiedQuery);

        const encrypted = encryptData(modifiedQuery);
        return encrypted;
    };

    // Decrypt data function (AES-256-GCM decryption)
    const decryptData = (encryptedData: string) => {
        try {
            const decoded = base64url.toBuffer(encryptedData);

            const iv: any = decoded.slice(0, 12);  // First 12 bytes are IV
            const authTag: any = decoded.slice(-16); // Last 16 bytes are authTag
            const encryptedText: any = decoded.slice(12, -16); // Encrypted content

            const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
            decipher.setAuthTag(authTag);

            let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
            decrypted += decipher.final('utf8');

            const decryptedObject = JSON.parse(decrypted);
            console.log("Decrypted data:", decryptedObject);

            return decryptedObject;
        } catch (error) {
            console.error("Error decrypting data:", error);
            return null;
        }
    };

    // Handle encrypted data submission
    const handleEncryptData = () => {
        setLoading(true); // Start loading
        const encryptedQuery = encryptQuery(router.query);
        const data = { data: encryptedQuery };

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

                // Decrypt and log the query
                const decryptedData = decryptData(encryptedQuery);
                console.log("Decrypted Query Data:", decryptedData);
                setLoading(false); // Stop loading after success
                router.push("/payment-success/booking");
            })
            .catch((error) => {
                const decryptedData = decryptData(encryptedQuery);
                console.log("Decrypted Query Data:", decryptedData);
                console.error("Error submitting encrypted data:", error);
                toast.error("Error submitting payment data");

                setLoading(false); // Stop loading after error
                router.push("/payment-error");
            });
    };

    // On component mount, handle encryption and data submission
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

            {/* Conditionally render the loading spinner */}
            {loading ? (
                <div className="d-flex align-items-center justify-content-center w-100">
                    <p style={{ fontSize: 22, color: "#40C175", fontWeight: 700 }}>Processing Payment...</p>
                </div>
            ) : (
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
            )}

            <ToastContainer />
        </>
    );
}
