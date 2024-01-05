import { Text28, Text12 } from "@/components/Typography";
import style from "../../styles/labs.module.scss";
import labsWorkingIcon1 from "../../../public/images/labsworking1.svg";
import labsWorkingIcon2 from "../../../public/images/labsworking2.svg";
import labsWorkingIcon3 from "../../../public/images/labsworking3.svg";
import Image from "next/image";
export default function Works() {
  return (
    <section className="container pt-0">
      <Text28 className="text-dark fw-bold mb-3">How it works?</Text28>
      <div className={style.workingStepsStyling}>
        <span>
          <Image src={labsWorkingIcon3} alt="labs-icon-eshaafi" />
          <Text12 className="text-dark">
            Search and book either lab visit or home sampling.
          </Text12>
        </span>
        <span className={style.labsWorkingBeforeAfter}>
          <Image src={labsWorkingIcon2} alt="labs-icon-eshaafi" />
          <Text12 className="text-dark">
            You can visit the lab, or we will send a professional to collect
            your sample.
          </Text12>
        </span>
        <span>
          <Image src={labsWorkingIcon1} alt="labs-icon-eshaafi" />
          <Text12 className="text-dark">
            You will receive an SMS to download your report on your phone
          </Text12>
        </span>
      </div>
    </section>
  );
}
