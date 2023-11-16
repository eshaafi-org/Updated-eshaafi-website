"use client";
import style from "../../styles/bookAppointment.module.scss";
import { useState } from "react";
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
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
// links
let links = [
  { name: "Home", link: "/" },
  { name: "Doctors", link: "/doctors" },
];

// import { useRouter } from "next/navigation";
export default function BookAppointmentPage({ data }: { data: any }) {
  // const router = useRouter();
  const params = useRouter();
  const [response, setResponse] = useState<any>({});
  const [appointDate, setAppointDate] = useState(moment().format("YYYY-MM-DD"));
  const [method, setMethod] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
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
  const { modalValue, userAuth } = useSelector(
    (state: any) => state.loginModalReducer
  );
  const proifileData: {
    appointmentSlotId: string;
    doctorId: string | undefined | string[];
    appoint_date: string;
  } = {
    appointmentSlotId: activeSlot.id,
    doctorId: params.query.id,
    appoint_date: appointDate,
  };
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
  const handleBookAppoint = (flag: boolean) => {
    console.log(paymentId);
    if (localStorage.getItem("user")) {
      if (flag) {
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
            console.log(err.response.data.response.message);
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
              // type: "info",
            });
          })
          .catch((err) => {
            setLoading(false);
            if (err.response.status === 401) {
              toast("😐 Slot is unavailable", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                // type: "info",
              });
            } else if (err.response.status === 404) {
              toast("Slot Is Already In Booking Process..", {
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
    // console.log(postData);
  };
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
              <Reviews reviews={data?.doctorInfo?.review} />
            </section>
          ) : (
            <PaymentMethod
              patient={patient}
              setPatient={setPatient}
              response={response}
              paymentId={paymentId}
              setPaymentId={setPaymentId}
              setMethod={setMethod}
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
          />
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
            Booking successful!
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
        </div>
      )}
      <ToastContainer />
    </section>
  );
}
