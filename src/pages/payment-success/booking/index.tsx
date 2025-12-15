"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL, headers } from '@/helper/CONST';
import successGif from "../../../../public/images/success.gif";
import Image from "next/image";
import eShaafiApp from "../../../../public/images/download-badge-google-play-badge.png";
import moment from "moment";
import Link from "next/link";
import Button from "@/components/Button";
import { FaArrowLeft } from "react-icons/fa";
//import LottieLoading from '@/components/paymentLoading/paymentLoading';

const Index = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [appointmentData, setAppointmentData] = useState<any>(null);
  const [appointDate, setAppointDate] = useState('');
  const [activeSlot, setActiveSlot] = useState({ time: '', id: '' });

  useEffect(() => {
    const processBooking = async () => {
      const storedData = localStorage.getItem('appointmentData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setAppointmentData(parsedData);
        // Assume appointDate and activeSlot are stored or can be derived
        // For now, use current date and a placeholder time
        setAppointDate(moment().format("YYYY-MM-DD"));
        setActiveSlot({ time: '10:00:00', id: parsedData.slot_id }); // Placeholder

        try {
          const response = await axios.post(
            BASE_URL + "/patients/doctors/bookAppointment",
            {
              appointmentId: parsedData.appointmentId,
              patientName: parsedData.patientName,
              patientId: parsedData.patientId,
              paymentType: "payPro",
              isSave: "false",
              slot_id: parsedData.slot_id
            },
            { headers: headers() }
          );
          setSuccess(true);
          localStorage.removeItem('appointmentData');
        } catch (error) {
          console.error('Booking failed:', error);
          // Handle error, maybe show error message
        }
      }
      setLoading(false);
    };

    processBooking();
  }, []);

  if (loading) {
    return <div>Processing your booking...</div>;
  }

  if (!success) {
    return <div>Payment failed or booking error.</div>;
  }

  return (
    <section className="container">
      <div className="d-flex align-items-center row-gap-1 col-gap-1 position-relative flex-column w-100 justify-content-center">
        <Button
          variant="outlined"
          onClick={() => window.history.back()}
          className="cardDescription"
          style={{ alignSelf: "self-start" }}
        >
          <FaArrowLeft /> Back
        </Button>

        <Image
          src={successGif.src}
          alt="successGif"
          width={200}
          height={200}
        />
        <p style={{ fontSize: 22, color: "#40C175", fontWeight: 700 }}>
          Booking Successful!
        </p>
        <h5>
          {moment(appointDate).format("MMMM Do") + " "}{" "}
          {moment(activeSlot.time, "HH:mm:ss").format("h:mm A")}
        </h5>
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
        <Link
          href={`/appointments/${appointmentData?.appointmentId}`}
        >
          <Button variant="outlined">view details</Button>
        </Link>
      </div>
    </section>
  );
};

export default Index;
