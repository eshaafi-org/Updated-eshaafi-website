// import
import labSvg from "../../../public/images/labSvg.svg";
import Image from "next/image";
import { Text16, Text14, Text11, Text28 } from "@/components/Typography";
import style from "@/styles/labs.module.scss";
import Link from "next/link";
import Button from "@/components/Button";
import { useSelector } from "react-redux";
export default function LabsList() {
  const {
    value: { Labs },
  } = useSelector((state: any) => state.getLabHomeReducer);
  return (
    <section className="container">
      <Text28 className="fw-bold text-dark">Lab Partners </Text28>
      <ul className={style.labList}>
        {Labs.map((item: any, indx: number) => (
          <li className={style.labCard} key={indx}>
            <Image src={labSvg} alt="lab-icons-eshaafi" />
            <span>
              <p className="fw-bold text-dark">{item.name}</p>
              <Text14>{item.noOfTests}+ Tests</Text14>
              <Text11>
                Available {item.startTime} - {item.endTime}
              </Text11>
            </span>
            <Link
              href={`/labs/${item.name.replace(/ /g, "-")}`}
              className={style.labSelectBtn}
            >
              <Button variant="contained">Select Plan</Button>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
