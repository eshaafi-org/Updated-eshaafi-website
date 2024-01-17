"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Text18, Text28, Text22 } from "@/components/Typography";
import { BASE_URL, headers } from "@/helper/CONST";
import AddressBar from "@/components/AddressBar";
import Head from "next/head";
import style from "@/styles/orders.module.scss";
import { Modal } from "react-bootstrap";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";

import checkMark from "../../../public/images/checkmark.png";
let links = [
  { name: "Home", link: "/" },
  { name: "My Orders", link: "/orders" },
];
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .post(
        BASE_URL + "/lab/patients/labs/appointments",
        {},
        {
          headers: headers(),
        }
      )
      .then((res) => {
        setLoading(false);
        setOrders(res.data.response.Items);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);
  return (
    <>
      <Head>
        <title>eShaafi | My Orders</title>
      </Head>
      <main>
        <section className="container">
          <span>
            <h2>My Orders</h2>
            <AddressBar links={links} />
          </span>
          {loading ? (
            <ul className={style.orderListContainer}>
              <li className={style.orderList}>
                <div style={{ width: "50%" }}>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-4"></span>
                  </p>
                  <ul className={style.testList}>
                    <li>
                      <p className="card-text placeholder-glow">
                        <span className="placeholder col-3"></span>
                      </p>
                      <p className="card-text placeholder-glow">
                        <span className="placeholder col-3"></span>
                      </p>
                    </li>
                  </ul>
                </div>
                <span className="placeholder col-2"></span>
              </li>
              <li className={style.orderList}>
                <div style={{ width: "50%" }}>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-4"></span>
                  </p>
                  {/* <ul className={style.testList}>
                    <li>
                      <p className="card-text placeholder-glow">
                        <span className="placeholder col-3"></span>
                      </p>
                      <p className="card-text placeholder-glow">
                        <span className="placeholder col-3"></span>
                      </p>
                    </li>
                  </ul> */}
                </div>
                <span className="placeholder col-2"></span>
              </li>
              <li className={style.orderList}>
                <div style={{ width: "50%" }}>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-4"></span>
                  </p>
                  <ul className={style.testList}>
                    <li>
                      <p className="card-text placeholder-glow">
                        <span className="placeholder col-3"></span>
                      </p>
                      <p className="card-text placeholder-glow">
                        <span className="placeholder col-3"></span>
                      </p>
                    </li>
                  </ul>
                </div>
                <span className="placeholder col-2"></span>
              </li>
            </ul>
          ) : (
            <ul className={style.orderListContainer}>
              {orders.map((item: any, indx: number) => (
                <Order item={item} indx={indx} />
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}
const Order = ({ item, indx }: { item: any; indx: number }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <li key={indx} className={style.orderList} onClick={() => setShow(true)}>
        <span>
          <Text18 className="text-dark fw-bold">
            Order# {item.appointmentId}
          </Text18>
          {/* <p>{item.labName}</p> */}
          <ul className={style.testList}>
            {item?.testDetails?.map((test: any, key: number) => (
              <li key={key}>{test.MedicineName}</li>
            ))}
          </ul>
        </span>
        <span
          className={`${
            item.appointment_status === "lab_confirmed"
              ? style.confirmed
              : item.appointment_status === "lab_pending"
              ? style.pending
              : item.appointment_status === "lab_cancelled"
              ? style.cancelled
              : style.completed
          }`}
        >
          {item.appointment_status === "lab_confirmed"
            ? "Confirmed"
            : item.appointment_status === "lab_pending"
            ? "Pending"
            : item.appointment_status === "lab_cancelled"
            ? "Cancelled"
            : item.appointment_status === "lab_completed"
            ? "Completed"
            : ""}
        </span>
      </li>
      <Modal show={show} onHide={() => setShow(false)}>
        <div className={style.orderModal}>
          <div>
            <Text22 className="text-dark fw-bold">
              Booked - # {item.appointmentId}
            </Text22>
            {item.appointment_status === "lab_cancelled" || (
              <div className={style.statusBar}>
                <span
                  className={
                    style.labStatus +
                    " text-dark " +
                    `${
                      item.appointment_status === "lab_pending"
                        ? style.beforeStatus
                        : style.afterStatus
                    }`
                  }
                >
                  <IoCheckmarkCircleSharp className={style.successSvg} />
                  Booked
                </span>
                <span
                  className={
                    style.labStatus +
                    " " +
                    `${
                      item.appointment_status === "lab_completed"
                        ? style.afterStatus
                        : style.beforeStatus
                    }`
                  }
                  style={{
                    zIndex:
                      item.appointment_status === "lab_completed" ? "5" : "2",
                    color:
                      item.appointment_status === "lab_completed" ||
                      item.appointment_status === "lab_confirmed"
                        ? "#000"
                        : "#717171",
                  }}
                >
                  {item.appointment_status === "lab_confirmed" ||
                  item.appointment_status === "lab_completed" ? (
                    <IoCheckmarkCircleSharp className={style.successSvg} />
                  ) : (
                    <FaCircle className={style.processSvg} />
                  )}
                  Confirmed
                </span>
                <span
                  className={style.labStatus}
                  style={{
                    color:
                      item.appointment_status === "lab_completed"
                        ? "#000"
                        : "#717171",
                  }}
                >
                  {item.appointment_status === "lab_completed" ? (
                    <IoCheckmarkCircleSharp className={style.successSvg} />
                  ) : (
                    <FaCircle className={style.processSvg} />
                  )}
                  Completed
                </span>
              </div>
            )}
          </div>
          <div className="modalAddress">
            <Text18 className="text-dark my-2">Address</Text18>
            <span className={style.modalContent}>{item.patientAddress}</span>
          </div>
          <div className="modalPayment">
            <Text18 className="text-dark my-2">Payment Method</Text18>
            <span className={style.modalContent}>{"Cash on Delievery"}</span>
          </div>
          <div className="order">
            <Text18 className="text-dark my-2">Order Details</Text18>
            <ul className={style.modalContent + " flex-column"}>
              {item?.testDetails?.map((test: any, key: number) => (
                <li key={key}>{test.MedicineName}</li>
              ))}
            </ul>
          </div>
        </div>
      </Modal>
    </>
  );
};
