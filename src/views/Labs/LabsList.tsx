// import
import labLogo1 from "../../../public/images/lablogo1.png";
import labLogo2 from "../../../public/images/lablogo2.png";
import labLogo3 from "../../../public/images/lablogo3.png";
import Image from "next/image";
import { Text16, Text14, Text11, Text28 } from "@/components/Typography";
import style from "@/styles/labs.module.scss";
import Link from "next/link";
import Button from "@/components/Button";
import { useSelector } from "react-redux";
import { CardsSkeletonLoader } from "@/components/SkeletonLoader";

const labLogos: { [key: string]: any } = {
  "Excel Lab": labLogo3,
  "IDC Lab": labLogo1,
  "Chughtai Lab": labLogo2,
};

export default function LabsList() {
  const {
    loading,
    value: { Labs },
  } = useSelector((state: any) => state.getLabHomeReducer);
  return (
    <>
      {loading ? (
        <div className="container">
          <CardsSkeletonLoader />
        </div>
      ) : (
        <section className="container pt-3">
          <div className={style.labsHeadingContainer}>
            <Text28 className={`fw-bold text-dark ${style.interFont}`}>Lab Partners </Text28>
          </div>
          <ul className={style.labList}>
            {Labs.map((item: any, indx: number) => (
              <li className={style.labCard} key={indx}>
                <Image 
                  src={labLogos[item.name] || labLogo1} 
                  alt={`${item.name}-logo`}
                  width={80}
                  height={80}
                />
                <span>
                  <p className="fw-bold text-dark">{item.name}</p>
                  <Text14 className={style.labCardText}>{item.noOfTests}+ Tests</Text14>
                  <Text11 className={style.labCardText}>
                    Available {item.startTime} - {item.endTime}
                  </Text11>
                </span>
                <Link
                  href={`/labs/${item.name.replace(/ /g, "-")}`}
                  className={style.labSelectBtn}
                >
                  <Button variant="contained">Select Test</Button>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
