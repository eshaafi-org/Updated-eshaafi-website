import style from "@/styles/aboutus.module.scss";
import aws from "../../../public/images/tech/aws.svg";
import lambda from "../../../public/images/tech/aws-lambda.svg";
import python from "../../../public/images/tech/Python.svg";
import figma from "../../../public/images/tech/Figma.svg";
import react from "../../../public/images/tech/react.svg";
import next from "../../../public/images/tech/next.svg";
import reactQuery from "../../../public/images/tech/react-query.svg";
import typescript from "../../../public/images/tech/typescript1.svg";
import Image from "next/image";
//
const tech = [
  { icon: aws, name: "AWS" },
  { icon: lambda, name: "lambda" },
  { icon: python, name: "Python" },
  { icon: figma, name: "Figma" },
  { icon: react, name: "React" },
  { icon: next, name: "Next Js" },
  { icon: reactQuery, name: "React Query" },
  { icon: typescript, name: "TypeScript" },
];
export default function Tech() {
  return (
    <div className="container">
      <ul className={style.techContainer}>
        {tech.map((itm, indx) => (
          <li key={indx}>
            <Image src={itm.icon} alt={itm.name} width={50} height={50} />
            <p>{itm.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
