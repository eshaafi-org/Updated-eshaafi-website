// import
import { CardsSkeletonLoader } from "@/components/SkeletonLoader";
import packageIcon from "../../../public/images/packageIcon.png";
import { Text16, Text20, Text24, Text28 } from "@/components/Typography";
import style from "@/styles/labs.module.scss";
import Link from "next/link";
import { useSelector } from "react-redux";
import { trackEvent } from "@/lib/ga";
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
          <div className={style.packagesHeadingContainer}>
            <Text28 className={`fw-bold text-dark ${style.interFont}`}>Packages</Text28>
          </div>
          <ul className={style.packagesList}>
            {PacakgeResponse.map((item: any, indx: number) => (
              <li key={indx}>
                <Link
                  href={"/labs/packages/" + item.pId}
                  className={style.packageCard}
                  onClick={() => trackEvent('view_item', {
                    section: 'packages',
                    action: 'view_package',
                    label: item.subscriptionName,
                    item_id: `package_${item.pId}`,
                    content_type: 'lab_package'
                  })}
                >
                  <div className={style.packageContent}>
                    <span className={style.packageText}>
                      <Text24 className={`fw-bold text-dark ${style.interFont}`}>
                        {item.subscriptionName}
                      </Text24>
                      <Text16 className={style.packageSubtext}>Includes {item.noOfTests} tests</Text16>
                    </span>
                  </div>
                  <div
                    className={style.packageCardImg}
                    style={{
                      backgroundImage: `url(${item.url ? item.url : packageIcon})`,
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
