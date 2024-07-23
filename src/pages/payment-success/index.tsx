"use client";
import Image from "next/image";
import successGif from "../../../public/images/success.gif";
import eShaafiApp from "../../../public/images/download-badge-google-play-badge.png";
import Link from "next/link";
import Head from "next/head";

export default function PaymentSuccess() {
    return (
        <>
            <Head>
                <title>Book Appointment</title>
                <meta name="description" content="Meet one on one with your doctor" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href={"/favicon.ico"} />
            </Head>
            <div className="d-flex align-items-center row-gap-1 col-gap-1 position-relative flex-column w-100 justify-content-center">
               
                <Image
                    src={successGif.src}
                    alt="successGif"
                    width={200}
                    height={200}
                />
                <p style={{ fontSize: 22, color: "#40C175", fontWeight: 700 }}>
                    {"Booking Successful!"}
                </p>
                {/* <h5>
                    {moment(appointDate).format("MMMM Do") + " "}{" "}
                    {moment(activeSlot.time, "HH:mm:ss").format("h:mm A")}
                </h5> */}
                <p className="text-2 text-center">
                    To Attend Consultation Download the eShaafi App
                </p>
                <a
                    href={
                        "https://play.google.com/store/apps/details?id=com.eshaafi.patient.consultation"
                    }
                    target="_blank"
                >
                    <Image src={eShaafiApp} alt="download-eshaafi-app" />
                </a>
                {/* <Link
                    href={`/appointments/${response.appointmentId}`}
                >
                    <Button variant="outlined">view details</Button>
                </Link> */}
            </div>
        </>
    )
}
