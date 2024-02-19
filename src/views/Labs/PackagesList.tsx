// import
import { CardsSkeletonLoader } from "@/components/SkeletonLoader";
import packageIcon from "../../../public/images/packageIcon.png";
import { Text16, Text20, Text24, Text28 } from "@/components/Typography";
import style from "@/styles/labs.module.scss";
import Link from "next/link";
import { useSelector } from "react-redux";
export default function PackagesList() {
  const {
    loading,
    value: { PacakgeResponse },
  } = useSelector((state: any) => state.getLabHomeReducer);
  return (
    <>
      {loading ? (
        <div className="container">
          <CardsSkeletonLoader />
        </div>
      ) : (
        <section className="container pt-0">
          <div className="d-flex justify-content-between align-items-center">
            <Text28 className="fw-bold text-dark">Packages</Text28>
            <Text20><Link href={"/labs/packages"}>View All</Link></Text20>
          </div>
          <ul className={style.labList}>
            {PacakgeResponse.map((item: any, indx: number) => (
              <li key={indx}>
                <Link
                  href={"/labs/packages/" + item.pId}
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
      )}
    </>
  );
}
