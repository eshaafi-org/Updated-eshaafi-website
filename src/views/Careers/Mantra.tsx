import style from "@/styles/careers.module.scss";
import Image from "next/image";
import { Heading24, Heading40 } from "@/components/Typography";
import aboutGalleryImage from "../../../public/images/aboutGalleryImage.png";
export default function Mantra() {
  return (
    <div className="container">
      <Heading24>How eShaafi works</Heading24>
      <Heading40>Our Working Mantra</Heading40>
      <div className={style.mantraContainer}>
        <div className={style.galleryItem1}>
          <Image
            src={aboutGalleryImage}
            alt="about-eshaafi-doctor-consultation"
            className={style.galleryImg}
          />
          <div className={style.overlay}>
            <div className={style.text}>Collaborations</div>
          </div>
        </div>
        <div className={style.galleryItem2}>
          <Image
            src={aboutGalleryImage}
            alt="about-eshaafi-doctor-consultation"
            className={style.galleryImg}
          />
          <div className={style.overlay}>
            <div className={style.text}>Finding Solutions</div>
          </div>
        </div>
        <div className={style.galleryItem3}>
          <Image
            src={aboutGalleryImage}
            alt="about-eshaafi-doctor-consultation"
            className={style.galleryImg}
          />
          <div className={style.overlay}>
            <div className={style.text}>Bringing New Ideas</div>
          </div>
        </div>
        <div className={style.galleryItem4}>
          <Image
            src={aboutGalleryImage}
            alt="about-eshaafi-doctor-consultation"
            className={style.galleryImg}
          />
          <div className={style.overlay}>
            <div className={style.text}>Accomplishing Goals</div>
          </div>
        </div>
        <div className={style.galleryItem5}>
          <Image
            src={aboutGalleryImage}
            alt="about-eshaafi-doctor-consultation"
            className={style.galleryImg}
          />
          <div className={style.overlay}>
            <div className={style.text}>Accepting Differences</div>
          </div>
        </div>
      </div>
    </div>
  );
}
// import style from "@/styles/aboutus.module.scss";
