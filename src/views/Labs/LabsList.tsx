// import
import { useEffect } from "react";
import Image from "next/image";
import { Text16, Text14, Text11, Text28 } from "@/components/Typography";
import style from "@/styles/labs.module.scss";
import Link from "next/link";
import Button from "@/components/Button";
import { useSelector } from "react-redux";
import { CardsSkeletonLoader } from "@/components/SkeletonLoader";
import { trackEvent } from "@/lib/ga";

export default function LabsList() {
  const {
    loading,
    value: { Labs },
  } = useSelector((state: any) => state.getLabHomeReducer);
  
  // Log backend labs data
  useEffect(() => {
    //console.log('📋 Labs from Backend:', Labs);
    Labs.forEach((lab: any) => {
     // console.log(`🏥 Lab Name: ${lab.name}, Logo URL: ${lab.url}`);
    });
  }, [Labs]);
  
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
                  src={item.url} 
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
                  onClick={() => trackEvent('select_item', {
                    section: 'lab_partners',
                    action: 'select_lab',
                    label: item.name,
                    content_type: 'lab_partner'
                  })}
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
