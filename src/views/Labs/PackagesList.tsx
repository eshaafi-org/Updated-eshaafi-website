// import
import packageIcon from "../../../public/images/packageIcon.png";
import { Text16, Text24, Text28 } from "@/components/Typography";
import style from "@/styles/labs.module.scss";
import Link from "next/link";
import { useSelector } from "react-redux";
export default function PackagesList() {
  const {
    value: { PacakgeResponse },
  } = useSelector((state: any) => state.getLabHomeReducer);
  return (
    <section className="container pt-0">
      <Text28 className="fw-bold text-dark">Packages</Text28>
      <ul className={style.labList}>
        {PacakgeResponse.map((item: any, indx: number) => (
          <li key={indx}>
            <Link
              href={"/labs/packages/" + item.subscriptionName}
              className={style.packageCard}
              style={{
                backgroundColor: "#DFEAF2",
              }}
            >
              <span className={style.packageText}>
                <Text24 className="fw-bold text-dark">
                  {item.subscriptionName}
                </Text24>
                <Text16>Includes {item.noOfTests} tests</Text16>
              </span>
              <div
                className={style.packageCardImg}
                style={{
                  backgroundImage: `url(${packageIcon.src})`,
                }}
              ></div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
