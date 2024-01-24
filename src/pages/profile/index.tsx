import { useState } from "react";
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
// links
const links = [
  { name: "Home", link: "/" },
  { name: "Profile", link: "/profile" },
];
export default function Profile() {
  const [patient, setPatient] = useState<any>({
    dob: "2024-01-01",
    gender: "Male",
    location: "Lahore",
    patientId: "6e03af71-4d2e-4fb7-85c2-6cd90f027676",
    patientName: "testing user",
    relation: "Mother",
  });
  const { dob, gender, location, patientId, patientName, relation } = patient;
  // console.log(patient);
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
        <section className={style.profileContainer + " container"}>
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
            <p>{patient.dob}</p>
          </div>
          <div className={style.profileList}>
            <Text18>Profiles</Text18>
            <Profiles
              patient={patient}
              setPatient={setPatient}
              styling={style.profilePageContainer}
            />
          </div>
          <div>
            <Text28 className="text-dark fw-bold">Personal Information</Text28>
            <div className={style.profileInfo}>
              <InputField
                type="text"
                placeHolder="Full Name"
                value={patientName}
                className="text-capitalize"
              />
              <InputField
                type="date"
                placeHolder="Date of Birth"
                max={moment().format("YYYY-MM-DD")}
                value={dob}
              />

              <select
                name=""
                id=""
                placeholder="Gender"
                className={style.selectField}
                value={gender}
              >
                <option value="" disabled selected>
                  Gender
                </option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>

              <select
                name=""
                id=""
                placeholder="Gender"
                className={style.selectField}
                value={relation}
              >
                <option value="" disabled selected>
                  Relation
                </option>
                <option value="Myself">Myself</option>
                <option value="Mother">Mother</option>
                <option value="Son">Son</option>
                <option value="Daughter">Daughter</option>
                <option value="Father">Father</option>
              </select>
              <InputField type="text" placeHolder="City" value={location} />
            </div>
          </div>
          <div className={style.servicesLinks}>
            <Text28 className="text-dark">Services</Text28>
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
            <Text28 className="text-dark">Account</Text28>
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
        </section>
      </main>
    </>
  );
}
