import { useState } from "react";
import Head from "next/head";
import { PageHeading } from "@/components/Typography";
import AddressBar from "@/components/AddressBar";
import style from "@/styles/profile.module.scss";
import { Text28, Text14, Text18 } from "@/components/Typography";
import { services } from "@/helper/profileLinks";
import Image from "next/image";
import Profiles from "@/components/Profiles";
// links
const links = [
  { name: "Home", link: "/" },
  { name: "Profile", link: "/profile" },
];
export default function Profile() {
  const [patient, setPatient] = useState("");
  console.log(patient);
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
          <div className={style.profileCard}>profile</div>
          <div className={style.profileList}>
            <Text18>Profiles</Text18>
            <Profiles
              patient={patient}
              setPatient={setPatient}
              styling={style.profilePageContainer}
            />
          </div>
          <div className={style.profileInfo}>profile info</div>
          <div className={style.servicesLinks}>
            <Text28 className="text-dark">Services</Text28>
            <ul className={style.linksContainer}>
              {services.map((item, indx) => (
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
          <div className={style.accountLinks}>
            <Text28 className="text-dark">Account</Text28>
            <ul className={style.linksContainer}>
              {services.map((item, indx) => (
                <li key={indx} className={style.linkItem}>
                  <Text14 className="fw-bold text-dark">{item.name}</Text14>
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
