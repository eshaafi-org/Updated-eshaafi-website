"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL, headers } from '@/helper/CONST';
import successGif from "../../../../public/images/success.gif";
import Image from "next/image";
import eShaafiApp from "../../../../public/images/download-badge-google-play-badge.png";
import Link from "next/link";
import Button from "@/components/Button";
import { SkeletonLoader } from '@/components/SkeletonLoader';
import moment from 'moment';
//import LottieLoading from '@/components/paymentLoading/paymentLoading';
import { trackEvent } from "@/lib/ga";

const Index = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [appointmentData, setAppointmentData] = useState<any>(null);
  const [appointDate, setAppointDate] = useState('');
  const [appointTime, setAppointTime] = useState('');
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
    // Use appointment date/time from parsedData if available
    setAppointDate(parsedData.appointmentDate || parsedData.date || moment().format('YYYY-MM-DD'));
    setAppointTime(parsedData.appointmentTime || parsedData.time || parsedData.slot_time || '10:00:00');
    setActiveSlot({ time: parsedData.appointmentTime || parsedData.time || parsedData.slot_time || '10:00:00', id: parsedData.slot_id });

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
      
      // Track successful payment booking
      trackEvent('fd_booking_success', {
        section: 'booking_flow',
        appointment_id: parsedData.appointmentId,
        payment_method: 'payPro',
        booking_type: 'payment_success_page'
      });
      
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

  // Track when success screen is displayed
  useEffect(() => {
    if (success && appointmentData) {
      trackEvent('fd_booking_success_screen_viewed', {
        section: 'booking_flow',
        appointment_id: appointmentData.appointmentId,
        payment_method: 'payPro',
        booking_type: 'payment_success_page'
      });
    }
  }, [success, appointmentData]);

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
    <section className="container" style={{ marginTop: '50px' }}>
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
        <h5>
          {appointDate} {appointTime ? appointTime : ''}
        </h5>
        <a
          href={
            "https://play.google.com/store/apps/details?id=com.eshaafi.patient.consultation"
          }
          target="_blank"
          onClick={() => trackEvent('fd_success_app_download_click', {
            section: 'booking_success',
            appointment_id: appointmentData?.appointmentId,
            app_store: 'google_play',
            booking_type: 'payment_success_page'
          })}
        >
          <Image src={eShaafiApp} alt="download-eshaafi-app" />
        </a>
        <Link
          href={`/appointments/${appointmentData?.appointmentId}`}
          onClick={() => trackEvent('fd_success_view_details_click', {
            section: 'booking_success',
            appointment_id: appointmentData?.appointmentId,
            booking_type: 'payment_success_page'
          })}
        >
          <Button variant="outlined">view details</Button>
        </Link>
      </div>
    </section>
  );
};

export default Index;
