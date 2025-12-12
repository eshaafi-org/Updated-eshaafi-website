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
        href={"https://eshaafi.sng.link/D5hwf/jn0r"}
        className={style.downloadlink}
      >
        <Image
          src={download}
          alt="eshaafi-app-download"
          className={style.appstore}
        />
      </Link>
      <Link
        href="https://eshaafi.sng.link/D5hwf/jn0r"
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
