import Head from "next/head";
import Image from "next/image";
import logo from "../../public/eshaafiLogo.svg";
import { Model } from "../views/Header/LoginSignupModel";
export default function Login() {
  return (
    <>
      <Head>
        <title>Eshaafi | Login</title>
        <meta name="description" content="Meet one on one with your doctor" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={"/favicon.ico"} />
      </Head>
      <section className="container">
        <div
          className="flex items-center w-70 justify-center lg-flex-col lg-w-full"
          style={{ margin: "0 auto" }}
        >
          <span className="w-1-2 lg-w-full">
            <Image src={logo} alt="eshaafi-logo" />
          </span>
          <span className="w-1-2 lg-w-full">
            <Model page={"login"} setShowModal={false} userAuth={false} />
          </span>
        </div>
      </section>
    </>
  );
}
