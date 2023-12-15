"use client";
import { useEffect, useReducer } from "react";
import Image from "next/image";
import style from "../../styles/bookAppointment.module.scss";
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
  response,
  paymentId,
  setPaymentId,
  setMethod,
  navigations,
}: {
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

  return (
    <section className={style.paymentContainer}>
      {/* payment section */}
      <section className=" d-flex flex-column row-gap-1 mt-3">
        <span className="d-flex justify-content-between row-gap-1">
          <h3 className="text-dark">Payment Method </h3>
          <div className="d-flex align-items-center justify-content-end col-gap-1">
            <p>Use Wallet Balance</p>
            <div
              className={
                style.checkboxWrapper + " d-flex align-items-center col-gap-1"
              }
            >
              <span>Rs.{response.wallet} </span>
              <input
                type="checkbox"
                className={style.scGJwTLC + " " + style.ikxBAC}
                checked={wallet}
                name="wallet"
                onChange={(e) => {
                  setStates({ type: "WALLET" });
                  if (e.target.checked) {
                    setPaymentId("wallet");
                    setMethod("Wallet");
                  } else setPaymentId("");
                }}
                disabled={response.wallet === 0}
              />
            </div>
          </div>
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
      </section>
    </section>
  );
}
