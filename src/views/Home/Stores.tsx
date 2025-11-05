import React from "react";
import Link from "next/link";
import Image from "next/image";
import download from "/public/images/googleplay.png";
import style from "../../styles/home.module.scss";
import appStore from "/public/images/appstore.png";

const Stores = () => {
  return (
    <div className={style.storecontainer}>
      <Link
        href={
          "https://play.google.com/store/apps/details?id=com.eshaafi.patient.consultation&pcampaignid=web_share"
        }
        className={style.downloadlink}
      >
        <Image
          src={download}
          alt="eshaafi-app-download"
          className={style.appstore}
        />
      </Link>
      <Link
        href="https://apps.apple.com/us/app/eshaafi-health-telemedicine/id6739331112"
        className={style.downloadlink}
      >
        <Image
          src={appStore}
          alt="eshaafi-download"
          className={style.appstore}
        />
      </Link>
    </div>
  );
};

export default Stores;
