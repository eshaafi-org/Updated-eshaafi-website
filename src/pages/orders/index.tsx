"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Text18, Text28, Text22, Text16 } from "@/components/Typography";
import { BASE_URL, headers } from "@/helper/CONST";
import AddressBar from "@/components/AddressBar";
import Head from "next/head";
import style from "@/styles/orders.module.scss";
import { Modal } from "react-bootstrap";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import { logout } from "@/components/Profiles";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import empty from "../../../public/images/empty.svg";
import Image from "next/image";
import moment from 'moment';
import checkMark from "../../../public/images/checkmark.png";
let links = [
  { name: "Home", link: "/" },
  { name: "My Orders", link: "/orders" },
];
export default function Orders() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state: any) => state.loginModalReducer);
  const [orders, setOrders] = useState([]);
  console.log(orders)
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
        if (error.response.status === 401) {
          logout(dispatch, router, userAuth);
        }
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
                  <span className="placeholder col-2"></span>
                </div>
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
              </li>
              <li className={style.orderList}>
                <div style={{ width: "50%" }}>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-4"></span>
                  </p>
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
            <>
              {orders.length > 0 ? (
                <ul className={style.orderListContainer}>
                  {orders.map((item: any, indx: number) => (
                    <li key={indx}>
                      <Order item={item} indx={indx} />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="row ">
                  <div className="col ">
                    <div className="d-flex justify-content-center flex-column align-items-center row-gap-1">
                      <Image
                        src={empty}
                        alt="search empty"
                        className={style.emptyImage}
                      />
                      <p>No previous Orders</p>
                    </div>
                  </div>
                </div>
              )}
            </>
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
      {/* <li key={indx} className={style.orderList} onClick={() => setShow(true)}> */}
      {/* <div
          className="w-100 d-flex justify-content-between align-items-center"
          style={{ columnGap: "0.5rem" }}
        > */}
      <table key={indx} className={style.orderList}>
        <tbody className={style.tableData} onClick={() => setShow(true)}>
          <tr>
            <td className={style.date}>
              <span style={{ color: "#1C6BA4", fontWeight: 500 }}>{moment(item.appoint_date).format('DD,ddd')}</span>
              <span style={{ color: "#1C6BA4" }}>{moment(item.appoint_date).format('MMM YYYY')}</span>
            </td>
          </tr>
          <tr>
            <td>Profile</td>
            <th>{item.name}</th>
          </tr>
          <tr>
            <td>Booking Time</td>
            <th>{moment(item.appoint_start_time, "HH:mm").format('h:mm A')}</th>
          </tr>
          <tr>
            <td>Order ID</td>
            <th>{item.appointmentId}</th>
          </tr>
          <tr>
            <span
              className={`${item.appointment_status === "lab_confirmed"
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
          </tr>
        </tbody>
      </table>
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
                    `${item.appointment_status === "lab_pending"
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
                    `${item.appointment_status === "lab_completed"
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

          {item.testType === "labVisit" ? null : <div className="modalAddress">
            <Text18 className="text-dark my-2">Address</Text18>
            <span className={style.modalContent}>{item.patientAddress}</span>
          </div>}
          <div className="modalPayment">
            <Text18 className="text-dark my-2">Payment Method</Text18>
            <div
              className={style.modalContent + " flex justify-content-between"}
            >
              {"Cash on Delievery"}
              {/* <span>Rs.{item.charges}</span> */}
            </div>
          </div>
          {item?.testDetails.length > 0 && (
            <div className="order">
              <Text18 className="text-dark my-2">Order Details</Text18>
              <ul className={style.modalContent + " flex-column"}>
                {item?.testDetails?.map((test: any, key: number) => (
                  <li key={key}>
                    <Text16 style={{ textTransform: "Capitalize" }}> {test.MedicineName} X {test.quantity}</Text16>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Text18 className="text-dark mt-2">Patient Details</Text18>
          <table className={style.modalContent}>
            <tbody className={style.tableDataModal}>
              <tr>
                <td>Patient Name</td>
                <td>{item.patientName}</td>
              </tr>
              <tr>
                <td>Date and Time</td>
                <td>{moment(item.appoint_date).format('ddd, MMM DD, YYYY')} {moment(item.appoint_start_time, "HH:mm").format('h:mm a')}</td>
              </tr>
              <tr>
                <td>Subtotal</td>
                <td>Rs.{item.charges}</td>
              </tr>
              <tr>
                <td>Discount</td>
                <td>{item.discount}%</td>
              </tr>
              <tr>
                <th>Total</th>
                <th>Rs.{item.grandTotal}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>
    </>
  );
};
