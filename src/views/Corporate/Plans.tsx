import style from "@/styles/corporate.module.scss";
import { Heading24, Heading40, Text16 } from "@/components/Typography";
import Image from "next/image";
export default function Plans() {
  return (
    <div className="container">
      <div className={style.plansContainer}>
        <div className={style.plaText}>
          <Heading24>Corporate Plan</Heading24>
          <Heading40>
            Prioritize health and boost productivity with eShaafi
          </Heading40>
          <Text16 className="mt-3">
            Unlock a new era of workplace vitality with our cutting-edge
            Corporate Telemedicine Program. Designed to seamlessly integrate
            into your corporate culture, our program prioritizes the well-being
            of your team, fostering a healthier, more productive workforce.
          </Text16>
          <Text16 className="mt-2">
            Explore a range of telehealth services for your team- easy access to
            medical consultations and preventive care, all from the convenience
            of their devices. Choose our Corporate Program and watch your team
            thrive.
          </Text16>
        </div>
        <div className={style.plansCoversSect}>
          <div className={style.plan1}></div>
          <div className={style.plan2}></div>
          <div className={style.plan3}></div>
          <div className={style.plan4}></div>
          <div className={style.planText}></div>
        </div>
      </div>
    </div>
  );
}
