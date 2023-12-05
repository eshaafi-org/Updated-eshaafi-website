"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import { PageHeading } from "@/components/Typography";
import AddressBar from "@/components/AddressBar";
import style from "@/styles/eprescription.module.scss";
import axios from "axios";
import { BASE_URL, headers } from "@/helper/CONST";
import moment from "moment";
import { Text16, Text11 } from "@/components/Typography";
import Button from "@/components/Button";
import { BsDownload } from "react-icons/bs";
import styles from "@/styles/doctors.module.scss";
import Image from "next/image";
import pdfIcon from "../../../public/pdfIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
// links
const links = [
  { name: "Home", link: "/" },
  { name: "E-prescription", link: "/eprescription" },
];
export default function Eprescription() {
  const [prescription, setPrescription] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userAuth } = useSelector((state: any) => state.loginModalReducer);
  const dispatch = useDispatch();
  const router = useRouter();
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
        router.push("/");
      })
      .catch((err) => {
        dispatch({ type: "loginModalSlice/clearAuth" });
        localStorage.removeItem("user");
      });
  };
  // get list
  const getList = () => {
    setLoading(true);
    axios
      .get(BASE_URL + `/patients/prescription`, { headers: headers() })
      .then((res) => {
        setPrescription(res.data.response.Items);
        console.log(res.data.response.Items);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
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
            type: "info",
          });
        } else if (err.response.status === 410) {
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
    getList();
  }, []);
  return (
    <>
      <Head>
        <title>eShaafi | ePrescription</title>
      </Head>
      <main>
        <div className="container">
          <PageHeading>E-prescription</PageHeading>
          <AddressBar links={links} />
          <div className={style.eprescriptionSection}>
            {!loading ? (
              <ul className={style.eprescriptionContainer}>
                {prescription.map((item: any, indx) => (
                  <li key={indx} className={style.recordItem}>
                    <div className={style.date}>
                      <Text16 className="text-primary fw-bold">
                        {moment(item.prescription_date).format("MM,ddd")}
                      </Text16>
                      <Text11 className="text-primary">
                        {moment(item.prescription_date).format("MMM, YYYY")}
                      </Text11>
                    </div>
                    <div className={style.profile}>
                      <Text11>{item.patientInfo.relation}</Text11>
                      <Text16 className="text-dark">
                        {item.patientInfo.name}
                      </Text16>
                    </div>
                    <div className={style.time}>
                      <Text11>Time uploaded</Text11>
                      <Text16 className="text-dark">
                        {moment(item.prescription_date).fromNow()}
                      </Text16>
                    </div>
                    <div className={style.attachments}>
                      <div className={style.pdfContainer}>
                        <Image src={pdfIcon} alt="eshaafi-pdf-eprescription" />
                      </div>
                    </div>
                    <a
                      href={item.prescription_url}
                      // target="_blank"
                      rel="noreferrer"
                      className="d-flex align-items-center"
                    >
                      <Button className="d-flex align-items-center col-gap-1">
                        Download <BsDownload />
                      </Button>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className={style.eprescriptionContainer}>
                <li className={style.recordItem}>
                  <div className={style.date}>
                    <p className="card-text placeholder-glow">
                      <span className="placeholder col-7"></span>
                    </p>
                  </div>
                  <div className={style.profile}>
                    <p className="card-text placeholder-glow">
                      <span className="placeholder col-7"></span>
                    </p>
                  </div>
                  <div className={style.time}>
                    <p className="card-text placeholder-glow">
                      <span className="placeholder col-7"></span>
                    </p>
                  </div>
                  <div className={style.time}>
                    <p className="card-text placeholder-glow">
                      <span className="placeholder col-7"></span>
                    </p>
                  </div>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-7"></span>
                  </p>
                </li>
                <li className={style.recordItem}>
                  <div className={style.date}>
                    <p className="card-text placeholder-glow">
                      <span className="placeholder col-7"></span>
                    </p>
                  </div>
                  <div className={style.profile}>
                    <p className="card-text placeholder-glow">
                      <span className="placeholder col-7"></span>
                    </p>
                  </div>
                  <div className={style.time}>
                    <p className="card-text placeholder-glow">
                      <span className="placeholder col-7"></span>
                    </p>
                  </div>
                  <div className={style.time}>
                    <p className="card-text placeholder-glow">
                      <span className="placeholder col-7"></span>
                    </p>
                  </div>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-7"></span>
                  </p>
                </li>
                <li className={style.recordItem}>
                  <div className={style.date}>
                    <p className="card-text placeholder-glow">
                      <span className="placeholder col-7"></span>
                    </p>
                  </div>
                  <div className={style.profile}>
                    <p className="card-text placeholder-glow">
                      <span className="placeholder col-7"></span>
                    </p>
                  </div>
                  <div className={style.time}>
                    <p className="card-text placeholder-glow">
                      <span className="placeholder col-7"></span>
                    </p>
                  </div>
                  <div className={style.time}>
                    <p className="card-text placeholder-glow">
                      <span className="placeholder col-7"></span>
                    </p>
                  </div>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-7"></span>
                  </p>
                </li>
              </div>
            )}
            <div className={styles.filters + " w-100 "}>
              <div className="bg-main rounded border w-100 p-1">
                <p className="text-dark">Sort By</p>
                <select
                  name=""
                  id=""
                  className={styles.selectFilter}
                  // onChange={(e) => setFilters({ search: e.target.value })}
                >
                  {/* <option value="" disabled>
                    Specialization
                  </option> */}
                  {/* <option value="all">All</option> */}
                  <option value="General Physician" selected>
                    All
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </main>
    </>
  );
}
