import style from "@/styles/aboutus.module.scss";
export default function Stats() {
  return (
    <div className="container">
      <div className={style.statsContainer}>
        <span className={style.statsContent}>
          <h6 className={style.statsHeading}>35,000+</h6>
          <p className={style.statsText}>App Downloads</p>
        </span>
        <span className={style.statsContent}>
          <h6 className={style.statsHeading}>24/7</h6>
          <p className={style.statsText}>Video Consultation</p>
        </span>
        <span className={style.statsContent}>
          <h6 className={style.statsHeading}>1000+</h6>
          <p className={style.statsText}>Successful Consultations</p>
        </span>
        <span className={style.statsContent}>
          <h6 className={style.statsHeading}>All Across</h6>
          <p className={style.statsText}>Pakistan</p>
        </span>
      </div>
    </div>
  );
}
