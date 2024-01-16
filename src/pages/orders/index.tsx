"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Text18 } from "@/components/Typography";
import { BASE_URL, headers } from "@/helper/CONST";
import AddressBar from "@/components/AddressBar";
import Head from "next/head";
import style from "@/styles/orders.module.scss";
import { Modal } from "react-bootstrap";
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
          <ul className={style.orderListContainer}>
            {orders.map((item: any, indx: number) => (
              <Order item={item} indx={indx} />
            ))}
          </ul>
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
              : style.completed
          }`}
        >
          {item.appointment_status === "lab_confirmed"
            ? "Confirmed"
            : item.appointment_status === "lab_pending"
            ? "Pending"
            : "Cancelled"}
        </span>
      </li>
      <Modal show={show} onHide={() => setShow(false)}>
        <div>
          <Text18>Payment Method</Text18>
        </div>
      </Modal>
    </>
  );
};
