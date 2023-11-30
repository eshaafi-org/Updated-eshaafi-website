import style from "@/styles/careers.module.scss";
import teamPhoto from "../../../public/images/careerTeam.png";
import Image from "next/image";
import {
  Heading40,
  Heading24,
  Text16,
  Text18,
  Text14,
} from "@/components/Typography";
export default function Team() {
  return (
    <div className="container sm-pt-0">
      <div className={style.TeamContainer}>
        <div className={style.detail}>
          <Heading24 children="Team eShaafi" />
          <Heading40
            className="mt-2 sm-mt-0-5"
            children={"Why join eShaafi?"}
          />
          <div className="d-flex flex-column row-gap-0-5 mt-4 sm-mt-0-5">
            <Text16 children="eShaafi's team is united by our shared commitment to provide quality healthcare across Pakistan. By becoming a member of eShaafi, you will be at the forefront of a healthcare revolution in Pakistan, working with cutting-edge technology and enjoying continuous opportunities for professional growth. Our diverse and collaborative environment fosters innovation, while your work will be inherently meaningful, contributing to improved healthcare access and patient well-being." />
            <Text16>
              To join drop your resume at{" "}
              <a href="mail:hr@terafort.com" style={{ color: "#56A4EC" }}>
                hr@terafort.com
              </a>
            </Text16>
          </div>
        </div>
        <div className={style.cover}>
          <Image src={teamPhoto} alt="eshaafi-team-cover" />
          <div className={style.tosts}>
            <span>
              <Text18 children="Product Team" style={{ color: "#2788CD" }} />
              <Text14
                children={"Join our platform our product creating team"}
              />
            </span>
            <span>
              <Text18 children="Healthcare Team" style={{ color: "#27CDC4" }} />
              <Text14 children={"Join our platform as a doctor."} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
