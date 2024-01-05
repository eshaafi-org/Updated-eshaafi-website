// import
import packageIcon from "../../../public/images/packageIcon.png";
import { Text16, Text24, Text28 } from "@/components/Typography";
import style from "@/styles/labs.module.scss";
import Link from "next/link";
export default function PackagesList() {
  return (
    <section className="container pt-0">
      <Text28 className="fw-bold text-dark">Packages</Text28>
      <ul className={style.labList}>
        <li>
          <Link
            href={"/labs"}
            className={style.packageCard}
            style={{
              backgroundColor: "#DFEAF2",
            }}
          >
            <span className={style.packageText}>
              <Text24 className="fw-bold text-dark">Diabetes Plan</Text24>
              <Text16>Includes 12 tests</Text16>
            </span>
            <div
              className={style.packageCardImg}
              style={{
                backgroundImage: `url(${packageIcon.src})`,
              }}
            ></div>
          </Link>
        </li>
      </ul>
    </section>
  );
}
