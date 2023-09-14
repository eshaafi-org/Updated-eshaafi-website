"use client";
import { useEffect, useReducer } from "react";
import Image from "next/image";
import style from "../../styles/bookAppointment.module.scss";
import SlotTimer from "./SlotTimer";
import axios from "axios";
import { BASE_URL, headers } from "@/helper/CONST";
import { FaUser } from "react-icons/fa6";
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
        console.log(res.data.response.data);
        setStates({ type: "RESPONSE", payload: res.data.response.data });
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getProfiles();
  }, []);
  return (
    <section className="w-70 lg-w-full flex flex-col row-gap-2">
      <h2>Select Payment Method</h2>
      <SlotTimer />
      <section className="p-1 border rounded flex flex-col row-gap-1">
        <p>Booking For</p>
        {loading ? (
          <p>loading...</p>
        ) : (
          <ul className="w-full flex col-gap-1">
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
                  } flex flex-col justify-center items-center row-gap-1 ${
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
                    />
                  ) : (
                    <FaUser style={{ color: "#000", fontSize: 45 }} />
                  )}
                  <span>{itm.name.slice(0, 5)}..</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className=" flex flex-col row-gap-1">
        <span className="flex justify-between items-center sm-flex-col sm-items-start sm-row-gap-1">
          <h2>Payment Method </h2>
          <span className="flex col-gap-1 justify-center sm-justify-between sm-w-full">
            <p>Use Wallet Balance</p>
            <div
              className={style.checkboxWrapper + " flex items-center col-gap-1"}
            >
              <span>{response.wallet} Rs.</span>
              <input
                type="checkbox"
                className={style.scGJwTLC + " " + style.ikxBAC}
                checked={wallet}
                name="wallet"
                onChange={() => {
                  setStates({ type: "WALLET" });
                  setPaymentId("wallet");
                }}
              />
            </div>
          </span>
        </span>
        {response.paymentMethods && (
          <ul className="flex flex-col row-gap-1">
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
                  } flex  items-center p-1 row-gap-1 ${
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
