"use client";
import style from "../../styles/bookAppointment.module.scss";
import { useState, useEffect } from "react";
import Slots from "./Slots";
import Reviews from "@/views/BookAppointment/Reviews";
import DoctorInfo from "./DoctorInfo";
import Summary from "./Summary";
import { useRouter } from "next/router";
import PaymentMethod from "./Payment";
import axios from "axios";
import { BASE_URL, headers } from "@/helper/CONST";
import successGif from "../../../public/images/success.gif";
import Image from "next/image";
import eShaafiApp from "../../../public/images/download-badge-google-play-badge.png";
import moment from "moment";
import AddressBar from "@/components/AddressBar";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import Button from "@/components/Button";
import { FaArrowLeft, FaRegListAlt } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import { trackEvent } from "@/lib/ga";

export default function BookAppointmentPage({
  data,
  appointmentPage,
  reschedule,
}: {
  data: any;
  appointmentPage: any;
  reschedule: boolean;
}) {
  const router = useRouter();

  let links = [
    { name: "Home", link: "/" },
    { name: "Doctors", link: "/doctors" },
    {
      name: `Dr. ${data.doctorInfo?.personal_info?.firstName}`,
      link: `/doctors/${router.query.id}`,
    },
    { name: "Schedule", link: `/doctors/${router.query.id}/booked` },
  ];

  const params = useRouter();
  const [response, setResponse] = useState<any>({});
  const [appointDate, setAppointDate] = useState(moment().format("YYYY-MM-DD"));
  const [method, setMethod] = useState<string>("-");
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  // const [showModal, setShowModal] = useState(false);
  const handleModalClose = () => {
    console.log('Modal close button clicked - assuming payment success');
    // setShowModal(false); //COMMENT IT FOR PRODUCTION DEV

    // Complete the booking process
    const appointmentData = localStorage.getItem('appointmentData');
    if (appointmentData) {
      const parsedData = JSON.parse(appointmentData);
      console.log('Completing booking with data:', parsedData);

      // Call the actual booking API
      setLoading(true);
      axios
        .post(
          BASE_URL + "/patients/doctors/bookAppointment",
          {
            appointmentId: parsedData.appointmentId,
            patientName: parsedData.patientName,
            patientId: parsedData.patientId,
            paymentType: "payPro", // Since payment was completed via PayPro
            isSave: "false",
            slot_id: parsedData.slot_id
          },
          {
            headers: headers(),
          }
        )
        .then((res) => {
          console.log('Booking confirmed successfully:', res.data);
          setSuccess(true);
          setLoading(false);
          setPaymentScreen(false);
          
          // Track successful PayPro booking
          trackEvent('fd_booking_success', {
            section: 'booking_flow',
            doctor_id: router.query.id,
            doctor_name: data?.doctorInfo?.personal_info?.firstName + ' ' + data?.doctorInfo?.personal_info?.lastName,
            specialty: data?.doctorInfo?.specialization,
            payment_method: 'payPro',
            appointment_date: appointDate,
            appointment_time: activeSlot.time,
            booking_type: 'paypro'
          });
          
          // Clear the temporary appointment data
          localStorage.removeItem('appointmentData');
          // Don't redirect to /payment-success, show the built-in success screen
        })
        .catch((err) => {
          console.error('Booking confirmation failed:', err);
          setLoading(false);
          if (err.response) {
            toast(`Booking failed: ${err.response.data.response?.message || 'Please try again'}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              type: "error",
            });
          }
          // Still redirect to payment success in case of API issues
          router.push('/payment-success');
        });
    } else {
      // No appointment data found, just redirect
      router.push('/payment-success');
    }
  };
  //const handleModalOpen = () => setShowModal(true);
  const [activeSlot, setSlot] = useState({
    time: "",
    id: "",
    availability_status: "",
  });
  const [patient, setPatient] = useState({
    patientId: "",
    patientName: "",
  });
  const [paymentId, setPaymentId] = useState<string>("");
  const [paymentScreen, setPaymentScreen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state: any) => state.loginModalReducer);

  const proifileData: {
    appointmentSlotId: string;
    doctorId: string | undefined | string[];
    appoint_date: string;
  } = {
    appointmentSlotId: activeSlot.id,
    doctorId: params.query.id,
    appoint_date: appointDate,
  };

  // Track page view for doctor booking page
  useEffect(() => {
    const pageViewKey = 'fd_doctor_booking_page_viewed';
    if (!sessionStorage.getItem(pageViewKey)) {
      trackEvent('fd_doctor_book_appt_clk', {
        section: 'booking_flow',
        doctor_id: router.query.id,
        doctor_name: data?.doctorInfo?.personal_info?.firstName + ' ' + data?.doctorInfo?.personal_info?.lastName,
        specialty: data?.doctorInfo?.specialization,
        booking_type: reschedule ? 'reschedule' : 'new'
      });
      sessionStorage.setItem(pageViewKey, 'true');
    }
  }, [router.query.id, data?.doctorInfo, reschedule]);

  // Track when a slot is selected on the doctor card
  useEffect(() => {
    if (activeSlot?.id) {
      trackEvent("find_doctors_time_select_clk", {
        section: "doctor_card",
        doctor_name:
          data?.doctorInfo?.personal_info?.firstName +
          " " +
          data?.doctorInfo?.personal_info?.lastName,
        specialty: data?.doctorInfo?.specialization,
        availability_status: activeSlot.availability_status || "available",
      });
    }
  }, [activeSlot?.id]);

  // booking appointment
  const bookAppointmentData = () => {
    if (paymentId === "wallet") {
      return {
        appointmentId: response.appointmentId,
        patientName: patient.patientName,
        patientId: patient.patientId,
        wallet_pay: (data?.doctorInfo?.videoCallCharges).toString(),
      };
    } else {
      return {
        appointmentId: response.appointmentId,
        patientName: patient.patientName,
        patientId: patient.patientId,
        paymentId: paymentId,
      };
    }
  };

  // logout if token expire function
  const logout = () => {
    axios
      .post(BASE_URL + `/auth/signOut`, {
        access_token: userAuth.AccessToken,
        type: 1,
        uuid: userAuth.uuid,
      })
      .then((res) => {
        dispatch({ type: "loginModalSlice/clearAuth" });
        localStorage.removeItem("user");
      })
      .catch((err) => {
        dispatch({ type: "loginModalSlice/clearAuth" });
        localStorage.removeItem("user");
      });
  };

  // handle booking appointment
  const handleBookAppoint = (flag: boolean) => {
    if (userAuth?.uuid) {
      if (flag) {
        // Track second/final confirm booking click (after profile/payment selection)
        trackEvent('fd_confirm_booking_final_click', {
          section: 'booking_flow',
          doctor_id: router.query.id,
          doctor_name: data?.doctorInfo?.personal_info?.firstName + ' ' + data?.doctorInfo?.personal_info?.lastName,
          specialty: data?.doctorInfo?.specialization,
          appointment_date: appointDate,
          appointment_time: activeSlot.time,
          payment_method: paymentId,
          booking_type: reschedule ? 'reschedule' : 'new'
        });

        if (patient.patientId === "") {
          toast("Kindly Select a profile", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            type: "info",
          });
          return;
        }
        if (paymentId === "payPro") {
          handlePayPro();
          return;
        }
        setLoading(true);
        axios
          .post(
            BASE_URL + "/patients/doctors/bookAppointment",
            bookAppointmentData(),
            {
              headers: headers(),
            }
          )
          .then((res) => {
            setSuccess(true);
            setLoading(false);
            setPaymentScreen(false);
            
            // Track successful booking
            trackEvent('fd_booking_success', {
              section: 'booking_flow',
              doctor_id: router.query.id,
              doctor_name: data?.doctorInfo?.personal_info?.firstName + ' ' + data?.doctorInfo?.personal_info?.lastName,
              specialty: data?.doctorInfo?.specialization,
              payment_method: paymentId,
              appointment_date: appointDate,
              appointment_time: activeSlot.time,
              booking_type: 'direct'
            });
          })
          .catch((err) => {
            setLoading(false);
            if (err.response.status === 400) {
              toast(
                err.response.data.response.message === "Not a valid UUID." &&
                  patient.patientId === ""
                  ? "Kindly Select a profile"
                  : "Kindly Proceed with a payment method",
                {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  type: "info",
                }
              );
            } else if (err.response.status === 410) {
              toast("Your appointment reservation has expired", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                type: "warning",
              });
            } else if (err.response.status === 405) {
              toast("Your session has been expired, kindly sign-in again", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                type: "warning",
              });
              logout();
              dispatch({ type: "loginModalSlice/signIn" });
            } else if (err.response.status === 404) {
              toast(err.response.data.response.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                type: "warning",
              });
            }
          });
      } else {
        // Track first confirm booking click (after slot selection)
        trackEvent('fd_confirm_booking_first_click', {
          section: 'booking_flow',
          doctor_id: router.query.id,
          doctor_name: data?.doctorInfo?.personal_info?.firstName + ' ' + data?.doctorInfo?.personal_info?.lastName,
          specialty: data?.doctorInfo?.specialization,
          appointment_date: appointDate,
          appointment_time: activeSlot.time,
          booking_type: reschedule ? 'reschedule' : 'new'
        });

        setLoading(true);
        axios
          .post(BASE_URL + "/patients/doctors/checkAppointment", proifileData, {
            headers: headers(),
          })
          .then((res) => {
            setLoading(false);
            setResponse(res.data.response.Item);
            setPaymentScreen(true);
            toast("😇 Slot is available, kindly select payment method", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          })
          .catch((err) => {
            setLoading(false);
            if (err.response.status === 401) {
              if (
                err.response.data.message === "The incoming token has expired"
              ) {
                toast("😐 Need to login again", {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
                logout();
                dispatch({ type: "loginModalSlice/signIn" });
              } else {
                toast("😐 Slot is unavailable", {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }
            } else if (err.response.status === 404) {
              toast(err.response.data.response.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                type: "info",
              });
            } else if (err.response.status === 405) {
              toast("Your session has been expired, kindly sign-in again", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                type: "warning",
              });
              logout();
              dispatch({ type: "loginModalSlice/signIn" });
            }
          });
        console.log("Slot check initiated , appointmentSlotId:", proifileData.appointmentSlotId, "doctorId:", proifileData.doctorId, "appoint_date:", proifileData.appoint_date);
      }
    } else {
      toast("Kindly login first to book an appointment", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        type: "info",
      });
      dispatch({ type: "loginModalSlice/signIn" });
    }
  };

  //handle PayPro Integration
  const handlePayPro = async () => {
    const appointmentId = response.appointmentId; // From /patients/doctors/checkAppointment
    const slotId = activeSlot.id; // From /patients/doctor/appointmentSlots (activeSlot.id)
    const baseURL = "https://pay.eshaafi.com";
    const successUrl = `${window.location.origin}/payment-success/booking`; // App's success page
    const failureUrl = `${window.location.origin}/payment/failure`; // App's failure page
    const url = `${baseURL}/?appointment_id=${appointmentId}&slot_id=${slotId}&success_url=${encodeURIComponent(successUrl)}&failure_url=${encodeURIComponent(failureUrl)}`;
    setPaymentUrl(url);
    // setShowModal(true); //COMMENT IT FOR PRODUCTION DEV
    const appointmentData = {
      appointmentId: appointmentId,
      patientName: patient.patientName,
      patientId: patient.patientId,
      paymentType: paymentId,
      slot_id: slotId,
    };

    localStorage.setItem('appointmentData', JSON.stringify(appointmentData));
    //console.log("Appointment data stored for PayPro:", appointmentData);
  };

  //---UNCOMMENT THIS IN PRODUCTION---//

  // Redirect to payment URL once it's set
  useEffect(() => {
    if (paymentUrl) {
      window.location.href = paymentUrl;
    }
  }, [paymentUrl]);

  // handle reschedule of appointment
  const handleRescheduleAppointment = () => {
    setLoading(true);
    axios
      .post(
        BASE_URL + `/appointment/${appointmentPage.appointmentId}/reschedule`,
        {
          appoint_date: appointDate,
          appointmentSlotId: activeSlot.id,
          doctorId: router.query.id,
        },
        {
          headers: headers(),
        }
      )
      .then((res) => {
        setSuccess(true);
        setLoading(false);
        
        // Track successful reschedule
        trackEvent('fd_booking_success', {
          section: 'booking_flow',
          doctor_id: router.query.id,
          doctor_name: data?.doctorInfo?.personal_info?.firstName + ' ' + data?.doctorInfo?.personal_info?.lastName,
          specialty: data?.doctorInfo?.specialization,
          payment_method: 'reschedule',
          appointment_date: appointDate,
          appointment_time: activeSlot.time,
          booking_type: 'reschedule'
        });
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) {
          toast(err.response.data.response.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            type: "warning",
          });
        } else if (err.response.status === 410) {
          toast("Your appointment reservation has expired", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            type: "warning",
          });
        } else if (err.response.status === 405) {
          toast("Your session has been expired, kindly sign-in again", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            type: "warning",
          });
          logout();
          dispatch({ type: "loginModalSlice/signIn" });
        } else if (err.response.status === 404) {
          toast(err.response.data.response.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            type: "warning",
          });
        }
      });
  };

  // use effect
  useEffect(() => {
    if (data.Items) {
      setAppointDate(data.Items[0].slot_date);
    }
  }, [data]);

  // Track when success screen is displayed
  useEffect(() => {
    if (success) {
      trackEvent('fd_booking_success_screen_viewed', {
        section: 'booking_flow',
        doctor_id: router.query.id,
        doctor_name: data?.doctorInfo?.personal_info?.firstName + ' ' + data?.doctorInfo?.personal_info?.lastName,
        specialty: data?.doctorInfo?.specialization,
        appointment_date: appointDate,
        appointment_time: activeSlot.time,
        booking_type: reschedule ? 'reschedule' : 'new'
      });
    }
  }, [success]);

  // Track when payment/profile selection page is displayed
  useEffect(() => {
    if (paymentScreen) {
      trackEvent('fd_payment_page_view', {
        section: 'booking_flow',
        doctor_id: router.query.id,
        doctor_name: data?.doctorInfo?.personal_info?.firstName + ' ' + data?.doctorInfo?.personal_info?.lastName,
        specialty: data?.doctorInfo?.specialization,
        appointment_date: appointDate,
        appointment_time: activeSlot.time,
        booking_type: reschedule ? 'reschedule' : 'new'
      });
    }
  }, [paymentScreen]);


  return (
    <section className="container">
      {!success ? (
        <div className="d-flex align-items-start col-gap-1 position-relative w-100 justify-content-between">
          {!paymentScreen ? (
            <section className={style.slotsContainer}>
              <span>
                <h2>Book video consultation with the best doctors</h2>
                <AddressBar links={links} />
              </span>
              <DoctorInfo doc={data?.doctorInfo} />
              <Slots
                Items={data?.Items}
                setAppointDate={setAppointDate}
                appointDate={appointDate}
                activeSlot={activeSlot}
                setSlot={setSlot}
              />
              {data.doctorInfo?.review.length > 1 && (
                <Reviews
                  reviews={data?.doctorInfo ? data.doctorInfo?.review : []}
                />
              )}
            </section>
          ) : (
            <PaymentMethod
              patient={patient}
              setPatient={setPatient}
              response={response}
              paymentId={paymentId}
              setPaymentId={setPaymentId}
              setMethod={setMethod}
              navigations={links}
            />
          )}
          <Summary
            doc={data?.doctorInfo}
            appointDate={appointDate}
            time={activeSlot.time}
            handleBook={handleBookAppoint}
            method={method}
            loading={loading}
            paymentId={paymentId}
            paymentScreen={paymentScreen}
            reschedule={reschedule}
            appointmentPage={appointmentPage}
            handleRescheduleAppointment={handleRescheduleAppointment}
          />
        </div>
      ) : (
        <div className="d-flex align-items-center row-gap-1 col-gap-1 position-relative flex-column w-100 justify-content-center">
          <Button
            variant="outlined"
            onClick={() => {
              trackEvent('fd_success_schedule_another_click', {
                section: 'booking_success',
                doctor_id: router.query.id,
                booking_type: reschedule ? 'reschedule' : 'new'
              });
              setSuccess(false);
            }}
            className="cardDescription"
            style={{ alignSelf: "self-start" }}
          >
            <FaArrowLeft /> Schedule another appointment
          </Button>

          <Image
            src={successGif.src}
            alt="successGif"
            width={200}
            height={200}
          />
          <p style={{ fontSize: 22, color: "#40C175", fontWeight: 700 }}>
            {reschedule ? "Reschedule Successfully" : "Booking Successful!"}
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
            onClick={() => trackEvent('fd_success_app_download_click', {
              section: 'booking_success',
              doctor_id: router.query.id,
              app_store: 'google_play',
              booking_type: reschedule ? 'reschedule' : 'new'
            })}
          >
            <Image src={eShaafiApp} alt="download-eshaafi-app" />
          </a>
          <Link
            href={
              reschedule
                ? `/appointments/${appointmentPage.appointmentId}`
                : `/appointments/${response.appointmentId}`
            }
            onClick={() => trackEvent('fd_success_view_details_click', {
              section: 'booking_success',
              doctor_id: router.query.id,
              appointment_id: reschedule ? appointmentPage.appointmentId : response.appointmentId,
              booking_type: reschedule ? 'reschedule' : 'new'
            })}
          >
            <Button variant="outlined">view details</Button>
          </Link>
        </div>
      )}
      <ToastContainer />
      {/* <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Gateway</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <iframe
            src={paymentUrl}
            style={{ width: '100%', height: '500px' }}
            frameBorder="0"
            title="Payment Gateway"
          />
        </Modal.Body>
      </Modal> */}
    </section>
  );
}
