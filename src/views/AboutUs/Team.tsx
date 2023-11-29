import style from "@/styles/aboutus.module.scss";
import member from "../../../public/images/team1.png";
import member1 from "../../../public/images/team2.png";
import member2 from "../../../public/images/team3.png";
import Image from "next/image";
import linkedin from "../../../public/images/Linkedin.svg";
//
const team = [
  {
    icon: member,
    name: "Shafique Anwar",
    position: "Founder eShaafi",
    linkedin: "https://www.linkedin.com/in/shafique-anwar/",
  },
  {
    icon: member1,
    name: "Omer Yousef",
    position: "COO eShaafi",
    linkedin: "https://www.linkedin.com/in/omer-yousuf-coo/",
  },
  {
    icon: member2,
    name: "Muhammad Faisal",
    position: "Founder eShaafi",
    linkedin: "https://www.linkedin.com/in/muhammad-faisal-vp/",
  },
];
export default function Team() {
  return (
    <div className="container">
      <div className={style.teamContainer}>
        <div className={style.teamText}>
          <h3>Our Team</h3>
          <h2>
            {`Meet the team behind`} <br />
            {`eShaafi’s success`}
          </h2>
        </div>
        <ul className={style.teamList}>
          {team.map((itm, indx) => (
            <li key={indx} className={style.memeber}>
              <Image
                className={style.teamImg}
                src={itm.icon}
                width={1000}
                height={1000}
                alt={itm.name}
                quality={100}
              />
              <div className={style.memeberDetail}>
                <span>
                  <h5 className={style.memberHeading}>{itm.name}</h5>
                  <p className={`${style.memberText} text-dark`}>
                    {itm.position}
                  </p>
                </span>
                <a href={itm.linkedin} target="_blank">
                  <Image
                    src={linkedin}
                    alt="linkedin"
                    width={40}
                    height={40}
                    className={style.memberLink}
                  />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
