import { useState, useEffect } from "react";
import Head from "next/head";
import { InputField } from "@/components/InputField";
import { PageHeading } from "@/components/Typography";
import AddressBar from "@/components/AddressBar";
import style from "@/styles/profile.module.scss";
import { Text28, Text14, Text18, Text24 } from "@/components/Typography";
import { services, accounts } from "@/helper/profileLinks";
import Image from "next/image";
import Profiles from "@/components/Profiles";
import Link from "next/link";
import moment from "moment";
import { FaUserCircle } from "react-icons/fa";
import Button from "@/components/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL, headers } from "@/helper/CONST";
// links
const links = [
  { name: "Home", link: "/" },
  { name: "Profile", link: "/profile" },
];
export default function Profile() {
  const [patient, setPatient] = useState<any>({
    dob: "",
    gender: "",
    location: "",
    patientId: "",
    patientName: "",
    relation: "",
    phone_no: "",
  });
  const [editLoading, setEditLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [modal, setModal] = useState(false);
  const [otpShow, setOtpShow] = useState(false);
  const { dob, gender, location, patientId, patientName, relation, phone_no } =
    patient;
  // getting changed values
  const handleChanged = (e: any) => {
    setPatient((prev: any) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  //
  // console.log(patient);
  // handling editing proflie
  const handleEditingProfile = () => {
    setEditLoading(true);
    if (patient.phone_no) {
      setEditLoading(false);
      setOtpShow(true);
    } else {
      const filteredObject = (({ phone_no, patientName, ...rest }) => rest)(
        patient
      );
      axios
        .patch(
          BASE_URL + `/patients/profile/${patientId}`,
          { ...filteredObject, name: patient.patientName },
          {
            headers: headers(),
          }
        )
        .then((res) => {
          setEditLoading(false);
          toast("Profile updated successfully!", {
            type: "success",
          });
        })
        .catch((error: any) => {
          setEditLoading(false);

          if (error.response.status === 401) {
          }
          toast(error.response.data.response.message, {
            type: "error",
          });
        });
    }
  };
  // useEffect(() => {
  //   setEdit(false);
  // }, [patient]);
  return (
    <>
      <Head>
        <title>eShaafi | Profile</title>
      </Head>
      <main>
        <div className="container">
          <PageHeading>Profile</PageHeading>
          <AddressBar links={links} />
        </div>
        <section className={style.profileContainer + " container pt-0"}>
          <div>
            <div className={style.profileCard}>
              <span>
                {patient.url ? (
                  <Image
                    src={patient.url}
                    alt="eshaafi-best-doctor-online-consultation-patient-avatar"
                  />
                ) : (
                  <FaUserCircle style={{ fontSize: "5rem" }} />
                )}
              </span>
              <Text24 className="text-dark fw-bold text-capitalize">
                {patient?.patientName}
              </Text24>
              <p>{patient.phone_no}</p>
              <p className="mt-1">{patient.relation}</p>
            </div>
            <div className={style.profileList}>
              <Text18>Profiles</Text18>
              <Profiles
                patient={patient}
                setPatient={setPatient}
                styling={style.profilePageContainer}
                setEdit={setEdit}
              />
            </div>
          </div>
          <div className={style.settings}>
            <div className={style.profileInfoContainer}>
              <div className="d-flex justify-content-between align-items-center">
                <Text28 className="text-dark fw-bold">
                  Personal Information
                </Text28>
                {patient.patientName && (
                  <span>
                    {!edit && (
                      <>
                        {patient.relation !== "Myself" && (
                          <Button
                            className={style.editBtn + " text-danger me-4"}
                            onClick={() => setModal(true)}
                          >
                            Delete
                          </Button>
                        )}
                        <DeleteModal
                          show={modal}
                          setShow={setModal}
                          patient={patient}
                        />
                      </>
                    )}
                    {!edit && (
                      <Button
                        variant="outlined"
                        className={style.editBtn}
                        onClick={() => setEdit(true)}
                      >
                        Edit Profile
                      </Button>
                    )}
                  </span>
                )}
              </div>
              <div className={style.profileInfo}>
                <InputField
                  type="text"
                  name="patientName"
                  placeHolder="Full Name"
                  value={patientName}
                  className="text-capitalize"
                  disabled={!edit}
                  onChange={handleChanged}
                />
                <InputField
                  type="date"
                  placeHolder="Date of Birth"
                  max={moment().format("YYYY-MM-DD")}
                  value={dob}
                  disabled={!edit}
                  name="dob"
                  onChange={handleChanged}
                />
                <select
                  name="gender"
                  id=""
                  placeholder="Gender"
                  className={style.selectField}
                  value={gender}
                  onChange={handleChanged}
                  disabled={!edit}
                >
                  <option value="" disabled selected>
                    Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>

                <select
                  name="relation"
                  id=""
                  placeholder="Relation"
                  className={style.selectField}
                  value={relation}
                  onChange={handleChanged}
                  disabled={!edit}
                >
                  <option value="" disabled selected>
                    Relation
                  </option>
                  <option
                    value="Myself"
                    disabled={patient.relation !== "Myself"}
                  >
                    Myself
                  </option>
                  <option
                    value="Mother"
                    disabled={patient.relation === "Myself"}
                  >
                    Mother
                  </option>
                  <option
                    value="Father"
                    disabled={patient.relation === "Myself"}
                  >
                    Father
                  </option>
                  <option value="Son" disabled={patient.relation === "Myself"}>
                    Son
                  </option>
                  <option
                    value="Daughter"
                    disabled={patient.relation === "Myself"}
                  >
                    Daughter
                  </option>

                  <option
                    value="Spouse"
                    disabled={patient.relation === "Myself"}
                  >
                    Spouse
                  </option>
                  <option
                    value="Other"
                    disabled={patient.relation === "Myself"}
                  >
                    Other
                  </option>
                </select>
                <InputField
                  type="text"
                  placeHolder="City"
                  value={location}
                  disabled={!edit}
                  name="location"
                  onChange={handleChanged}
                />
                <InputField
                  type="tel"
                  placeHolder="Phone Optional"
                  value={phone_no}
                  disabled={patient.relation === "Myself" || !edit}
                  name="phone_no"
                  onChange={handleChanged}
                />
              </div>
              {edit && (
                <div className="d-flex justify-content-end mt-4">
                  <Button
                    onClick={() => setEdit(false)}
                    className="me-4 text-danger"
                  >
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={handleEditingProfile}>
                    Save Changes
                    {editLoading && (
                      <div
                        className="spinner-border spinner-border-sm text-white ms-2"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    )}{" "}
                  </Button>
                  <OtpModal otpShow={otpShow} setOtpShow={setOtpShow} />
                </div>
              )}
            </div>
            <div className={style.servicesLinks}>
              <Text28 className="text-dark mb-3">Services</Text28>
              <ul className={style.linksContainer}>
                {services.map((item, indx) => (
                  <Link href={item.link} key={indx}>
                    <li className={style.linkItem}>
                      <Image src={item.icon} alt="service-icon-eshaafi" />
                      <Text14 className="fw-bold text-dark mt-3 mb-2">
                        {item.name}
                      </Text14>
                      <Text14 className="text-capitalize">{item.text}</Text14>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
            <div className={style.accountLinks}>
              <Text28 className="text-dark mb-3">Account</Text28>
              <ul className={style.linksContainer}>
                {accounts.map((item, indx) => (
                  <li key={indx} className={style.linkItem}>
                    <Image src={item.icon} alt="service-icon-eshaafi" />
                    <Text14 className="fw-bold text-dark mt-3 mb-2">
                      {item.name}
                    </Text14>
                    <Text14>{item.text}</Text14>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <ToastContainer />
      </main>
    </>
  );
}
function DeleteModal({
  show,
  setShow,
  patient,
}: {
  show: boolean;
  setShow: any;
  patient: any;
}) {
  const handleDeletingProflie = () => {
    axios
      .delete(BASE_URL + `/patients/profile/${patient.patientId}`, {
        headers: headers(),
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      show={show}
      onHide={() => setShow(false)}
    >
      <Modal.Header closeButton className="border-bottom-0">
        <p className="text-dark fw-bold">Delete Profile</p>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <p className="text-dark">
          Are you sure? Deleting profile will delete medical records and
          appointment history of this profile
        </p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-light" onClick={() => setShow(false)}>
          Cancel
        </button>
        <button
          className="btn btn-danger"
          style={{ background: "#B00020" }}
          onClick={handleDeletingProflie}
        >
          Delete Profile
        </button>
      </Modal.Footer>
    </Modal>
  );
}
function OtpModal({ otpShow, setOtpShow }: { otpShow: any; setOtpShow: any }) {
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      show={otpShow}
      onHide={() => setOtpShow(false)}
    >
      <Modal.Header closeButton className="border-bottom-0">
        <p className="text-dark fw-bold">Delete Profile</p>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <p className="text-dark">
          Are you sure? Deleting profile will delete medical records and
          appointment history of this profile
        </p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-light" onClick={() => setOtpShow(false)}>
          Cancel
        </button>
        <button
          className="btn btn-danger"
          style={{ background: "#B00020" }}
          // onClick={handleDeletingProflie}
        >
          Delete Profile
        </button>
      </Modal.Footer>
    </Modal>
  );
}
