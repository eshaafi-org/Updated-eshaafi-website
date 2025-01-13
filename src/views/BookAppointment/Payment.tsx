"use client";
import { useEffect, useReducer, useState } from "react";
import Image from "next/image";
import style from "../../styles/bookAppointment.module.scss";
import styles from "@/styles/bookSubscription.module.scss";
import SlotTimer from "./SlotTimer";
import axios from "axios";
import { BASE_URL, headers } from "@/helper/CONST";
import { FaUserCircle } from "react-icons/fa";
import AddressBar from "@/components/AddressBar";
// reducer
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOADING": {
      return {
        ...state,
        loading: true,
      };
    }
    case "RESPONSE": {
      return {
        ...state,
        loading: false,
        profiles: [action.payload.self, ...action.payload.profiles],
      };
    }
    case "WALLET": {
      return {
        ...state,
        wallet: !state.wallet,
      };
    }
    default: {
      return {
        [action.target.name]: action.target.value,
      };
    }
  }
};
export default function PaymentMethod({
  patient,
  setPatient,
  response,
  paymentId,
  setPaymentId,
  setMethod,
  navigations,
}: {
  patient: any;
  setPatient: any;
  response: any;
  paymentId: string;
  setPaymentId: any;
  setMethod: any;
  navigations: any;
}) {
  // states
  const [states, setStates] = useReducer(reducer, {
    loading: false,
    profiles: [],
    wallet: false,
  });
  const { loading, profiles, wallet } = states;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  // getting all the profile of patient
  const getProfiles = () => {
    setStates({ type: "LOADING" });
    axios
      .get(BASE_URL + "/patients/profile", {
        headers: headers(),
      })
      .then((res) => {
        setStates({ type: "RESPONSE", payload: res.data.response.data });
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getProfiles();
  }, []);
  return (
    <section className={style.paymentContainer}>
      <h2 className="pageSubHeading">Select Payment Method</h2>
      <AddressBar links={navigations} />
      {/* slot timer  */}
      <SlotTimer />
      {/* profiel selection */}
      <section
        className={
          style.profilesContainer + " border rounded d-flex flex-column p-2"
        }
      >
        <p>Booking For</p>
        {loading ? (
          <p className="card-text placeholder-glow">
            <span
              className="placeholder col-7"
              style={{ width: 60, height: 60, borderRadius: 50 }}
            ></span>
          </p>
        ) : (
          <ul className="w-100 d-flex col-gap-1">
            {profiles.map((itm: any, indx: any) => (
              <li key={indx}>
                <input
                  type="radio"
                  className={style.btnCheck}
                  name="profile"
                  id={itm.profileId}
                  value={itm.profileId}
                  onChange={(e) =>
                    setPatient({
                      patientId: e.target.value,
                      patientName: itm.name,
                    })
                  }
                />
                <label
                  className={`${
                    style.labelrdioclassProfile
                  } d-flex flex-column justify-content-center align-items-center text-center ${
                    patient.patientId === itm.profileId
                      ? style.labelActiveProfile
                      : ""
                  }`}
                  htmlFor={itm.profileId}
                >
                  {itm.url ? (
                    <Image
                      src={itm.url}
                      width={72}
                      height={72}
                      alt={itm.name}
                      style={{ borderRadius: 50 }}
                      className={style.paymentProfileImage}
                    />
                  ) : (
                    <FaUserCircle className={style.profileIcon} />
                  )}
                  <span>{itm.name.length <= 5 ? itm.name : `${itm.name}`}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </section>
      {/* payment section */}
      <section className=" d-flex flex-column row-gap-1">
        <span className="d-flex justify-content-between  row-gap-1">
          <h3 className="text-dark">Payment Method </h3>
          <span className="d-flex align-items-center justify-content-end col-gap-1">
            <p>Use Wallet Point</p>
            <div
              className={
                style.checkboxWrapper + " d-flex align-items-center col-gap-1"
              }
            >
              <span>you have {response.wallet} point </span>
              <input
                type="checkbox"
                className={style.scGJwTLC + " " + style.ikxBAC}
                checked={wallet}
                name="wallet"
                // onChange={(e) => {
                //   setStates({ type: "WALLET" });
                //   if (e.target.checked) {
                //     setPaymentId("wallet");
                //     setMethod("Wallet");
                //   } else setPaymentId("");
                // }}
                onChange={(e) => {
                  setStates({ type: "WALLET" });
                  if (e.target.checked) {
                    setPaymentId("wallet");
                    setMethod("Wallet");
                    setSelectedPaymentMethod("wallet");
                  } else {
                    setPaymentId("");
                    setSelectedPaymentMethod('');
                  }
                }}
                disabled={response.wallet === 0}
              />
            </div>
          </span>
        </span>
        {response.paymentMethods && (
          <ul className="d-flex flex-column row-gap-1">
            {response.paymentMethods.map((itm: any, indx: any) => (
              <li key={indx}>
                <input
                  type="radio"
                  className={style.btnCheck}
                  name="paymentId"
                  id={itm.paymentId}
                  value={itm.paymentId}
                  onClick={() => {
                    setPaymentId(itm.paymentId);
                    setMethod(itm.type);
                  }}
                  disabled={wallet}
                />
                <label
                  className={`${
                    style.labelrdioclass
                  } d-flex  align-items-center p-3 row-gap-1 ${
                    wallet ? style.paymentDisabled : ""
                  }`}
                  htmlFor={itm.paymentId}
                >
                  <span
                    className={
                      paymentId === itm.paymentId
                        ? style.paymentActive
                        : style.paymentCircle
                    }
                  >
                    {itm.type}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        )}
        <div className={styles.payment1}>
          <ul
            className={`d-flex flex-column row-gap-1 col-gap-2 w-100 mt-2 ${styles.paymentMethodList}`}
          >
            <li
              className={`${styles.paymentMethodItem} border rounded w-100 p-3 d-flex align-items-center`}
            >
              <input
                type="radio"
                id="payFast"
                name="paymentId"
              // style={{ width: "24px", height: "24px" }}
                checked={selectedPaymentMethod === "payFast"}
                onChange={() => {
                  if (wallet) {
                    setStates({ type: "WALLET" });
                    setPaymentId("payFast");
                    setSelectedPaymentMethod("payFast");
                    setMethod("payFast");
                  } else {
                    setSelectedPaymentMethod("payFast");
                    setPaymentId("payFast");
                    setMethod("payFast");
                  }
                }}
              />
              <label
                htmlFor="payFast"
                className={styles.paymentMethodLabel}
              >
                JazzCash / EasyPaisa / Debit Card
              </label>
            </li>
          </ul>
        </div>
      </section>
    </section>
  );
}
