import Link from "next/link";
import Image from "next/image";
import getApp from "../../../public/images/getApp.png";
import download from "../../../public/images/download-badge-google-play-badge.svg";
import style from "../../styles/home.module.scss";

export default function GetApp({ color = "#fff" }: { color: string }) {
  return (
    <section className="w-100" style={{ backgroundColor: color }}>
      <div className="container pb-0">
        <div className="d-flex justify-content-between sm-flex-col sm-row-gap-1 align-items-center col-gap-1">
          <div className="d-flex flex-column row-gap-2 align-items-start w-50 sm-w-100 sm-row-gap-1 pb-1">
            <div className="d-flex flex-column row-gap-1">
              <h2>Get eShaafi App</h2>
              <p>
                Download the app to book and manage your appointments, keep
                track of the payments and get instant medical advice in case of
                emergencies. Keep your health up to date.
              </p>
            </div>
            <Link
              href={
                "https://play.google.com/store/apps/details?id=com.eshaafi.patient.consultation&pcampaignid=web_share"
              }
            >
              <Image src={download} alt="eshaafi-app-download" />
            </Link>
          </div>
          <span>
            <Image
              src={getApp}
              alt="subscription plans"
              style={{ width: "100%", height: "auto" }}
              className={style.getAppImage}
            />
          </span>
        </div>
      </div>
    </section>
  );
}
