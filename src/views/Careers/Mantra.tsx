import style from "@/styles/careers.module.scss";
import Image from "next/image";
import { Heading24, Text24, Heading40, Text16 } from "@/components/Typography";
import aboutGalleryImage from "../../../public/images/aboutGalleryImage.png";
export default function Mantra() {
  return (
    <div className="container">
      <Heading24 className="sm-text-center">How eShaafi works</Heading24>
      <Heading40 className="sm-text-center">Our Working Mantra</Heading40>
      <div className={style.mantraContainer}>
        <div className={style.galleryItem1}>
          <Image
            src={aboutGalleryImage}
            alt="about-eshaafi-doctor-consultation"
            className={style.galleryImg}
          />
          <div className={style.overlay}>
            <Text24 className={style.text}>Collaborations</Text24>
            <Text16 className={style.innerText}>
              We believe collaboration enhances creativity, efficiency, and
              problem-solving.
            </Text16>
          </div>
        </div>
        <div className={style.galleryItem2}>
          <Image
            src={aboutGalleryImage}
            alt="about-eshaafi-doctor-consultation"
            className={style.galleryImg}
          />
          <div className={style.overlay}>
            <Text24 className={style.text}>Finding Solutions</Text24>
            <Text16 className={style.innerText}>
              For effective problem-solving we analyze challenges strategically
              and implement solutions with adaptability.
            </Text16>
          </div>
        </div>
        <div className={style.galleryItem3}>
          <Image
            src={aboutGalleryImage}
            alt="about-eshaafi-doctor-consultation"
            className={style.galleryImg}
          />
          <div className={style.overlay}>
            <Text24 className={style.text}>Bringing New Ideas</Text24>
            <Text16 className={style.innerText}>
              Innovation happens when different viewpoints come together, making
              our solutions more creative and effective.
            </Text16>
          </div>
        </div>
        <div className={style.galleryItem4}>
          <Image
            src={aboutGalleryImage}
            alt="about-eshaafi-doctor-consultation"
            className={style.galleryImg}
          />
          <div className={style.overlay}>
            <Text24 className={style.text}>Accomplishing Goals</Text24>
            <Text16 className={style.innerText}>
              We reach our goals by working together as a team, using everyone's
              strengths.
            </Text16>
          </div>
        </div>
        <div className={style.galleryItem5}>
          <Image
            src={aboutGalleryImage}
            alt="about-eshaafi-doctor-consultation"
            className={style.galleryImg}
          />
          <div className={style.overlay}>
            <Text24>Accepting Differences</Text24>
            <Text16 className={style.innerText}>
              As a team, we embrace our differences, recognizing that diversity
              to strengthen us.
            </Text16>
          </div>
        </div>
      </div>
    </div>
  );
}
// import style from "@/styles/aboutus.module.scss";
