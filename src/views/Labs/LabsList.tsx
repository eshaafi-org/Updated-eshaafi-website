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

  const handleLabSelect = (labName: string) => {
    const sanitizedLabName = labName.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
    trackEvent(`labs_${sanitizedLabName}_select_clk`, {
      section: 'filters',
      partner_name: labName
    });
    trackEvent(`labs_${sanitizedLabName}_book_now_clk`, {
      section: 'booking',
      partner_name: labName
    });
  };
  
  return (
    <>
      {loading ? (
        <div className="container">
          <CardsSkeletonLoader />
        </div>
      ) : (
        <section className="container pt-0">
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
                  onClick={() => {
                    const sanitizedLabName = item.name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
                    handleLabSelect(item.name);
                    trackEvent(`labs_${sanitizedLabName}_view_clk`, {
                      section: 'partners',
                      partner_name: item.name
                    });
                    trackEvent(`labs_${sanitizedLabName}_test_clk`, {
                      section: 'lab_partners',
                      label: item.name
                    });
                  }}
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
