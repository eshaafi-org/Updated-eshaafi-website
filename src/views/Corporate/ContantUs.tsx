import style from "@/styles/corporate.module.scss";
import { Heading24, Heading40 } from "@/components/Typography";
import Image from "next/image";
import contact from "../../../public/images/contact.png";
export default function ContactUs() {
  return (
    <div className="container">
      <div className={style.contactusContainer}>
        <div className={style.contactusCover}>
          <Image src={contact} alt="corporate-contact" />
        </div>
        <div className={style.form}>
          <Heading24>Contact Us</Heading24>
          <Heading40>Request a demo with us</Heading40>
        </div>
      </div>
    </div>
  );
}
