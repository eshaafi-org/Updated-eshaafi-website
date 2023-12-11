import style from "@/styles/aboutus.module.scss";
import Image from "next/image";
import about1 from "../../../public/images/about1.png";
import about2 from "../../../public/images/about2.png";
import about3 from "../../../public/images/about3.png";
import about4 from "../../../public/images/about4.png";
import about5 from "../../../public/images/about5.png";
export default function Gallery() {
  return (
    <div className="container">
      <div className={style.galleryContainer}>
        <div className={style.galleryItem1}>
          <Image
            src={about1}
            alt="about-eshaafi-doctor-consultation"
            className={style.galleryImg}
            unoptimized
          />
        </div>
        <div className={style.galleryItem2}>
          <Image
            src={about2}
            alt="about-eshaafi-doctor-consultation"
            className={style.galleryImg}
            unoptimized
          />
        </div>
        <div className={style.galleryItem3}>
          <Image
            src={about3}
            alt="about-eshaafi-doctor-consultation"
            className={style.galleryImg}
            unoptimized
          />
        </div>

        <div className={style.galleryItem4}>
          <Image
            src={about4}
            alt="about-eshaafi-doctor-consultation"
            className={style.galleryImg}
            unoptimized
          />
        </div>
        <div className={style.galleryItem5}>
          <Image
            src={about5}
            alt="about-eshaafi-doctor-consultation"
            className={style.galleryImg}
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
