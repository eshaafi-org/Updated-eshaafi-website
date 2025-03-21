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
import LottieLoading from "@/components/paymentLoading/paymentLoading";
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
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  const [response, setResponse] = useState<any>({});
  const [appointDate, setAppointDate] = useState(moment().format("YYYY-MM-DD"));
  const [method, setMethod] = useState<string>("-");
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleModalClose = () => setShowModal(false);
  const handleModalOpen = () => setShowModal(true);
  const [activeSlot, setSlot] = useState({
    time: "",
    id: "",
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
    if (localStorage.getItem("user")) {
      if (flag) {
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
          handlePayfast();
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

  //handle Payfast Integration
  // const handlePayfast = async () => {
  //   const handshakeId = response.appointmentId;

  //   // const url = `https://betapayfast.eshaafi.com/?handshake=${handshakeId}:51aec218-feb0-467f-9691-9a5843407db57&paymentFee=${data?.doctorInfo?.videoCallCharges}`;
  //   setPaymentUrl("");
  //   const appointmentData = {
  //     appointmentId: response.appointmentId,
  //     patientName: patient.patientName,
  //     patientId: patient.patientId,
  //     paymentId: paymentId,
  //   };
  //   localStorage.setItem("appointmentData", JSON.stringify(appointmentData));
  // };

  const handlePayfast = async () => {
    // Validate required data
    if (!response.appointmentId || !activeSlot.id) {
      toast("Invalid appointment or slot data. Please try again.", {
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
      return;
    }

    // Set loading state to true
    setIsPaymentLoading(true);

    // Prepare the payload for the API request
    const payload = {
      appointment_id: response.appointmentId, // Use the appointment ID from the response
      slot_id: activeSlot.id, // Use the selected slot ID
    };

    console.log("Payload being sent:", payload); // Log the payload

    try {
      // Make the POST request to the API
      const res = await axios.post(
        "https://api.eshaafi.com/new/create-order",
        payload
      );

      // Log the API response
      console.log("API Response:", res.data);

      // Handle the API response
      if (res.data && res.data.response && res.data.response.click2pay_url) {
        // If the request is successful, set the payment URL
        setPaymentUrl(res.data.response.click2pay_url); // Use the click2pay_url from the response
      } else {
        // Handle API errors or unsuccessful responses
        toast("Failed to create payment order. Please try again.", {
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
      }
    } catch (error) {
      // Log the error
      console.error("Error creating payment order:", error);

      // Handle network or server errors
      toast("An error occurred while creating the payment order.", {
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
    } finally {
      // Reset loading state
      setIsPaymentLoading(false);
    }

    // Save appointment data to localStorage
    const appointmentData = {
      appointmentId: response.appointmentId,
      patientName: patient.patientName,
      patientId: patient.patientId,
      paymentId: paymentId,
    };
    localStorage.setItem("appointmentData", JSON.stringify(appointmentData));
  };
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
  console.log(isPaymentLoading, "iytfgo8qwegcfhsdftg73");
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
            onClick={() => setSuccess(false)}
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
          >
            <Image src={eShaafiApp} alt="download-eshaafi-app" />
          </a>
          <Link
            href={
              reschedule
                ? `/appointments/${appointmentPage.appointmentId}`
                : `/appointments/${response.appointmentId}`
            }
          >
            <Button variant="outlined">view details</Button>
          </Link>
        </div>
      )}
      {isPaymentLoading ? (
        // Show loading spinner or message
        <div className="fullscreen-overlay d-flex justify-content-center align-items-center">
          <LottieLoading transactionAmount="500" orderId="PLN-PYAN-5273" />
        </div>
      ) : paymentUrl ? (
        // Show iframe once payment URL is available
        <iframe
          src={paymentUrl}
          style={{ width: "100%", height: "500px" }}
          frameBorder="0"
        />
      ) : null}
      <ToastContainer />
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Gateway</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
      </Modal>
    </section>
  );
}
