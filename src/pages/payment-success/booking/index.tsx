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
import { SkeletonLoader } from '@/components/SkeletonLoader';
//import LottieLoading from '@/components/paymentLoading/paymentLoading';

const Index = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [appointmentData, setAppointmentData] = useState<any>(null);
  const [appointDate, setAppointDate] = useState('');
  const [activeSlot, setActiveSlot] = useState({ time: '', id: '' });
  const [error, setError] = useState<string | null>(null);

  // Extracted so user can retry on failure
  const processBooking = async () => {
    setLoading(true);
    setError(null);

    const storedData = localStorage.getItem('appointmentData');
    if (!storedData) {
      setError('No appointment data found.');
      setLoading(false);
      return;
    }

    const parsedData = JSON.parse(storedData);
    setAppointmentData(parsedData);
    setAppointDate(moment().format('YYYY-MM-DD'));
    setActiveSlot({ time: '10:00:00', id: parsedData.slot_id });

    try {
      const response = await axios.post(
        BASE_URL + '/patients/doctors/bookAppointment',
        {
          appointmentId: parsedData.appointmentId,
          patientName: parsedData.patientName,
          patientId: parsedData.patientId,
          paymentType: 'payPro',
          isSave: 'false',
          slot_id: parsedData.slot_id,
        },
        { headers: headers() }
      );

      // Consider checking response.ok / response.data.responseCode if backend uses that
      setSuccess(true);
      localStorage.removeItem('appointmentData');
    } catch (err: any) {
      console.error('Booking failed:', err);
      setError(err?.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    processBooking();
  }, []);

  if (loading) {
    return <SkeletonLoader />;
  }

  if (!success) {
    return (
      <section className="container">
        <div className="d-flex align-items-center row-gap-1 col-gap-1 position-relative flex-column w-100 justify-content-center">
          <p style={{ fontSize: 20, color: '#b00020', fontWeight: 700 }}>Payment failed or booking error.</p>
          {error && <p style={{ color: '#6b7280' }}>{error}</p>}

          <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
            <Button variant="outlined" onClick={() => window.history.back()}>Back</Button>
            <Button variant="contained" onClick={() => processBooking()}>Retry Booking</Button>
          </div>
        </div>
      </section>
    );
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
