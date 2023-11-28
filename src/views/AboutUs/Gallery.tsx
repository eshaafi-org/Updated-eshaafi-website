import style from "@/styles/aboutus.module.scss";
import Image from "next/image";
import aboutGalleryImage from "../../../public/images/aboutGalleryImage.png";
export default function Gallery() {
  return (
    <div className="container">
      <div className={style.galleryContainer}>
        <div className={style.galleryItem1}>
          <Image
            src={aboutGalleryImage}
            alt="about-eshaafi-doctor-consultation"
          />
        </div>
        <div className={style.galleryItem2}>
          <Image
            src={aboutGalleryImage}
            alt="about-eshaafi-doctor-consultation"
          />
        </div>
        <div className={style.galleryItem3}>
          <Image
            src={aboutGalleryImage}
            alt="about-eshaafi-doctor-consultation"
          />
        </div>
        <div className={style.galleryItem4}>
          <Image
            src={aboutGalleryImage}
            alt="about-eshaafi-doctor-consultation"
          />
        </div>
        <div className={style.galleryItem5}>
          <Image
            src={aboutGalleryImage}
            alt="about-eshaafi-doctor-consultation"
          />
        </div>
      </div>
    </div>
  );
}
