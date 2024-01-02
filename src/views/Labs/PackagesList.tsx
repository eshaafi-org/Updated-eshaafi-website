// import
import packageIcon from "../../../public/images/packageIcon.png";
import { Text16, Text24 } from "@/components/Typography";
import style from "@/styles/labs.module.scss";
import Link from "next/link";
export default function PackagesList() {
  return (
    <section className="container">
      <h1 className="fw-bold">Packages</h1>
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
              style={{
                backgroundImage: `url(${packageIcon.src})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "bottom right",
                padding: "5rem",
              }}
            ></div>
          </Link>
        </li>
      </ul>
    </section>
  );
}
