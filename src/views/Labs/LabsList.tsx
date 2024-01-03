// import
import labSvg from "../../../public/images/labSvg.svg";
import Image from "next/image";
import { Text16, Text14, Text11 } from "@/components/Typography";
import style from "@/styles/labs.module.scss";
import Link from "next/link";
import Button from "@/components/Button";
export default function LabsList() {
  return (
    <section className="container">
      <h1 className="fw-bold">Lab Partners </h1>
      <ul className={style.labList}>
        <li className={style.labCard}>
          <Image src={labSvg} alt="lab-icons-eshaafi" />
          <span>
            <Text16 className="fw-bold text-dark">Chughtai Lab</Text16>
            <Text14>1200+ tests</Text14>
            <Text11>Available 00:00am - 00:00pm</Text11>
          </span>
          <Link href={`/labs/${"id"}`} className={style.labSelectBtn}>
            <Button variant="contained">Select Plan</Button>
          </Link>
        </li>
      </ul>
    </section>
  );
}
