"use client";
import { useEffect, useReducer } from "react";
import Image from "next/image";
import style from "../../styles/bookAppointment.module.scss";
import SlotTimer from "./SlotTimer";
import axios from "axios";
import { BASE_URL, headers } from "@/helper/CONST";
import { FaUserCircle } from "react-icons/fa";
// reducer
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOADING": {
      return {
        ...state,
        loading: !state.loading,
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
}: {
  patient: any;
  setPatient: any;
  response: any;
  paymentId: string;
  setPaymentId: any;
}) {
  // states
  const [states, setStates] = useReducer(reducer, {
    loading: false,
    profiles: [],
    wallet: false,
  });
  const { loading, profiles, wallet } = states;
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
      {/* slot timer  */}
      <SlotTimer />
      {/* profiel selection */}
      <section className="border rounded d-flex flex-column p-2">
        <p>Booking For</p>
        {loading ? (
          <p>loading...</p>
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
                  } d-flex flex-column justify-content-center align-items-center ${
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
                  <span>{itm.name.slice(0, 5)}..</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </section>
      {/* payment section */}
      <section className=" d-flex flex-column row-gap-1">
        <span className="d-flex justify-content-between flex-column row-gap-1">
          <h3 className="text-dark">Payment Method </h3>
          <span className="d-flex align-items-center justify-content-between">
            <p>Use Wallet Balance</p>
            <div
              className={
                style.checkboxWrapper + " d-flex align-items-center col-gap-1"
              }
            >
              <span>{response.wallet} Rs.</span>
              <input
                type="checkbox"
                className={style.scGJwTLC + " " + style.ikxBAC}
                checked={wallet}
                name="wallet"
                onChange={(e) => {
                  setStates({ type: "WALLET" });
                  if (e.target.checked) {
                    setPaymentId("wallet");
                  } else setPaymentId("");
                }}
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
      </section>
    </section>
  );
}
