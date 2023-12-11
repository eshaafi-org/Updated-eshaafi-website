import style from "@/styles/careers.module.scss";
import { Heading24, Heading40, Text20, Text16 } from "@/components/Typography";
import Image from "next/image";
import principle1 from "../../../public/images/careerPrinciples1.svg";
import principle2 from "../../../public/images/careerPrinciples2.svg";
import principle3 from "../../../public/images/careerPrinciples3.svg";
const principles = [
  {
    icon: principle3,
    heading: "Driven by Purpose",
    text: "We firmly believe in our vision to provide stress free healthcare across Pakistan and with that vision we continue to excel in creating eShaafi.",
  },
  {
    icon: principle2,
    heading: "Continuous Learning",
    text: "Our team believes in providing the best technology in our application and website so with that pursuit we continue to learn new things and improve eShaafi.",
  },
  {
    icon: principle1,
    heading: "Transforming Healthcare",
    text: "Our aim is provide quality healthcare to all and along with that we transform the healthcare industry by bring essential element of care in our system.",
  },
];
export default function Principle({
  list = principles,
  heading,
  subHeading,
}: any) {
  return (
    <div className="container sm-pt-0">
      <div className={style.principleContainer}>
        <Heading24>{heading}</Heading24>
        <Heading40>{subHeading}</Heading40>
        <ul className={style.principleList}>
          {list.map((itm: any, indx: number) => (
            <li key={indx} className={style.principleItm}>
              <Image src={itm.icon} alt={itm.heading} width={50} height={50} />
              <Text20>{itm.heading}</Text20>
              <Text16 className="text-center">{itm.text}</Text16>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
