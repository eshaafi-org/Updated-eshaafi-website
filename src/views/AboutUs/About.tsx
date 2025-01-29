import style from "@/styles/aboutus.module.scss";
import aboutEshaafi from "../../../public/images/aboutEshaafi.png";
import Image from "next/image";
export default function About() {
  return (
    <div className="container sm-pt-0">
      <div className={style.aboutContainer}>
        <div className={style.aboutDetails}>
          <h3>About eShaafi</h3>
          <h2 className="mb-3">Our Story</h2>
          <p className="cardDescription">
            {` Guided by our unwavering commitment to 'Care That Never Quits,'
            eShaafi stands tall as your beacon of quality healthcare. In our
            hearts burns the belief that every soul in Pakistan deserves the
            finest care.`}
          </p>
          <p className="cardDescription">
            {`  With this noble vision, we forge ahead, crafting a user-friendly
            digital health care App that unites patients with doctors – seamlessly, at
            any moment, and from every corner.`}
          </p>
        </div>
        <div className={style.aboutCover}>
          <Image
            src={aboutEshaafi}
            alt="About-eshaafi-video-consultation-with-doctor"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
