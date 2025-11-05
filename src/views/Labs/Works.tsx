import { Text28, Text12 } from "@/components/Typography";
import style from "../../styles/labs.module.scss";
import labsWorkingIcon1 from "../../../public/images/labsworking1.svg";
import labsWorkingIcon2 from "../../../public/images/labsworking2.svg";
import labsWorkingIcon3 from "../../../public/images/labsworking3.svg";
import Image from "next/image";
export default function Works() {
  return (
    <section className="container pt-0">
      <div className={style.worksHeadingContainer}>
        <Text28 className={`text-dark fw-bold ${style.interFont}`}>How it works?</Text28>
      </div>
      <div className={style.workingStepsStyling}>
        <div className={style.workingStep}>
          <Image src={labsWorkingIcon3} alt="labs-icon-eshaafi" width={40} height={40} />
          <Text12 className={`text-dark ${style.workingStepText}`}>
            Search and book either lab visit or home sampling.
          </Text12>
        </div>
        <div className={style.workingStep}>
          <Image src={labsWorkingIcon2} alt="labs-icon-eshaafi" width={40} height={40} />
          <Text12 className={`text-dark ${style.workingStepText}`}>
            You can visit the lab, or we will send a professional to collect your sample.
          </Text12>
        </div>
        <div className={style.workingStep}>
          <Image src={labsWorkingIcon1} alt="labs-icon-eshaafi" width={40} height={40} />
          <Text12 className={`text-dark ${style.workingStepText}`}>
            You will receive an SMS to download your report on your phone
          </Text12>
        </div>
      </div>
    </section>
  );
}
