import Link from "next/link";
import Image from "next/image";
import getApp from "../../../public/images/getApp.png";
import download from "../../../public/images/download-badge-google-play-badge.png";

export default function GetApp() {
  return (
    <section className="w-full bg-white">
      <div className="container pb-0">
        <div className="flex justify-between sm-flex-col sm-row-gap-1 items-center col-gap-1">
          <div className="flex flex-col row-gap-2 items-start w-1-2 sm-w-full">
            <h2>Get eShaafi App</h2>
            <p className="text-2">
              Download the app to book and manage your appointments, keep track
              of the payments and get instant medical advice in case of
              emergencies. Keep your health up to date.
            </p>
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
            />
          </span>
        </div>
      </div>
    </section>
  );
}
