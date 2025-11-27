import style from '@/styles/subscription.module.scss'
import styles from '@/styles/findDoctors.module.scss'
import { IoCheckmark } from "react-icons/io5";
export function SkeletonLoader() {
  return (
    <div className="container pt-0 pb-0">
      <div className="w-60">
        <div className="card border-0" aria-hidden="true">
          <div className="card-body">
            <h5 className="card-title placeholder-glow">
              <span className="placeholder col-12"></span>
            </h5>
            <p className="card-text placeholder-glow">
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-8"></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export function CardsSkeletonLoader() {
  return (
    <div className="container pt-0 pb-0">
      <div className="card border-0 d-flex flex-column flex-sm-row gap-3 w-100" aria-hidden="true">
        <div className="card-body border">
          <h5 className="card-title placeholder-glow">
            <span className="placeholder col-12"></span>
          </h5>
          <h5 className="card-text placeholder-glow">
            <span className="placeholder col-12"></span>
          </h5>
          <h5 className="card-text placeholder-glow">
            <span className="placeholder col-12"></span>
          </h5>
        </div>
        <div className="card-body border">
          <h5 className="card-title placeholder-glow">
            <span className="placeholder col-12"></span>
          </h5>
          <h5 className="card-text placeholder-glow">
            <span className="placeholder col-12"></span>
          </h5>
          <h5 className="card-text placeholder-glow">
            <span className="placeholder col-12"></span>
          </h5>
        </div>
        <div className="card-body border">
          <h5 className="card-title placeholder-glow">
            <span className="placeholder col-12"></span>
          </h5>
          <h5 className="card-text placeholder-glow">
            <span className="placeholder col-12"></span>
          </h5>
          <h5 className="card-text placeholder-glow">
            <span className="placeholder col-12"></span>
          </h5>
        </div>
        <div className="card-body border">
          <h5 className="card-title placeholder-glow">
            <span className="placeholder col-12"></span>
          </h5>
          <h5 className="card-text placeholder-glow">
            <span className="placeholder col-12"></span>
          </h5>
          <h5 className="card-text placeholder-glow">
            <span className="placeholder col-12"></span>
          </h5>
        </div>
      </div>
    </div>
  );
}
export function PlanSkeletonLoader() {
  return (
    <div className={`${style.skeletonLoader}`}>
      <li className={style.planSkeleton}>
        <div className={`${style.skeleton} ${style.title}`}></div>
        <div className={`${style.skeleton} ${style.price2}`}></div>
        <div className={`${style.skeleton} ${style.description}`}></div>
        <span className='d-flex'><IoCheckmark
          style={{
            color: "#e0e0e0",
            fontSize: "1.5rem",
            margin: "1rem 1rem 1rem 0",
          }}
        /><div className={`${style.skeleton} ${style.price2}`}></div></span>
        <span className='d-flex'><IoCheckmark
          style={{
            color: "#e0e0e0",
            fontSize: "1.5rem",
            margin: "1rem 1rem 1rem 0",
          }}
        /><div className={`${style.skeleton} ${style.price2}`}></div></span>
        <span className='d-flex'><IoCheckmark
          style={{
            color: "#e0e0e0",
            fontSize: "1.5rem",
            margin: "1rem 1rem 1rem 0",
          }}
        /><div className={`${style.skeleton} ${style.price2}`}></div></span>
        <div className={`${style.skeleton} ${style.price2}`}></div>
        <div className={`${style.skeleton} ${style.buttons}`}></div>
        <div className={`${style.button2} d-flex justify-content-center align-items-center`}>
          <div className={`${style.skeleton} ${style.price3}`}></div>
        </div>
      </li>
      <li className={style.planSkeleton}>
        <div className={`${style.skeleton} ${style.title}`}></div>
        <div className={`${style.skeleton} ${style.price2}`}></div>
        <div className={`${style.skeleton} ${style.description}`}></div>
        <span className='d-flex'><IoCheckmark
          style={{
            color: "#e0e0e0",
            fontSize: "1.5rem",
            margin: "1rem 1rem 1rem 0",
          }}
        /><div className={`${style.skeleton} ${style.price2}`}></div></span>
        <span className='d-flex'><IoCheckmark
          style={{
            color: "#e0e0e0",
            fontSize: "1.5rem",
            margin: "1rem 1rem 1rem 0",
          }}
        /><div className={`${style.skeleton} ${style.price2}`}></div></span>
        <span className='d-flex'><IoCheckmark
          style={{
            color: "#e0e0e0",
            fontSize: "1.5rem",
            margin: "1rem 1rem 1rem 0",
          }}
        /><div className={`${style.skeleton} ${style.price2}`}></div></span>
        <div className={`${style.skeleton} ${style.price2}`}></div>
        <div className={`${style.skeleton} ${style.buttons}`}></div>
        <div className={`${style.button2} d-flex justify-content-center align-items-center`}>
          <div className={`${style.skeleton} ${style.price3}`}></div>
        </div>
      </li>
      <li className={style.planSkeleton}>
        <div className={`${style.skeleton} ${style.title}`}></div>
        <div className={`${style.skeleton} ${style.price2}`}></div>
        <div className={`${style.skeleton} ${style.description}`}></div>
        <span className='d-flex'><IoCheckmark
          style={{
            color: "#e0e0e0",
            fontSize: "1.5rem",
            margin: "1rem 1rem 1rem 0",
          }}
        /><div className={`${style.skeleton} ${style.price2}`}></div></span>
        <span className='d-flex'><IoCheckmark
          style={{
            color: "#e0e0e0",
            fontSize: "1.5rem",
            margin: "1rem 1rem 1rem 0",
          }}
        /><div className={`${style.skeleton} ${style.price2}`}></div></span>
        <span className='d-flex'><IoCheckmark
          style={{
            color: "#e0e0e0",
            fontSize: "1.5rem",
            margin: "1rem 1rem 1rem 0",
          }}
        /><div className={`${style.skeleton} ${style.price2}`}></div></span>
        <div className={`${style.skeleton} ${style.price2}`}></div>
        <div className={`${style.skeleton} ${style.buttons}`}></div>
        <div className={`${style.button2} d-flex justify-content-center align-items-center`}>
          <div className={`${style.skeleton} ${style.price3}`}></div>
        </div>
      </li>
    </div>
  );
};
export function DoctorCardSkeleton() {
  return (
    <div className={styles.doctorCard}>
      <div className={styles.cardHeader}>
        <div className={styles.imageContainer}>
          <div
            className="placeholder-glow"
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#e0e0e0'
            }}
          ></div>
        </div>
        <div className={styles.doctorInfo}>
          <div className="placeholder-glow" style={{ width: '50px', height: '20px', backgroundColor: '#e0e0e0', borderRadius: '4px', marginBottom: '8px' }}></div>
          <div className="placeholder-glow" style={{ width: '150px', height: '20px', backgroundColor: '#e0e0e0', borderRadius: '4px', marginBottom: '8px' }}></div>
          <div className={styles.specialtyRow}>
            <div className="placeholder-glow" style={{ width: '100px', height: '16px', backgroundColor: '#e0e0e0', borderRadius: '4px' }}></div>
            <div className="placeholder-glow" style={{ width: '60px', height: '16px', backgroundColor: '#e0e0e0', borderRadius: '4px' }}></div>
          </div>
        </div>
      </div>

      <div className={styles.cardMiddle}>
        <div className={styles.leftSection}>
          <div className="placeholder-glow" style={{ width: '100px', height: '16px', backgroundColor: '#e0e0e0', borderRadius: '4px', marginBottom: '8px' }}></div>
          <div className={styles.consultationType}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#e0e0e0', borderRadius: '4px' }}></div>
            <div className="placeholder-glow" style={{ width: '120px', height: '16px', backgroundColor: '#e0e0e0', borderRadius: '4px' }}></div>
          </div>
        </div>
        <div className={styles.rightSection}>
          <div className="placeholder-glow" style={{ width: '80px', height: '18px', backgroundColor: '#e0e0e0', borderRadius: '4px', marginBottom: '4px' }}></div>
          <div className="placeholder-glow" style={{ width: '90px', height: '14px', backgroundColor: '#e0e0e0', borderRadius: '4px' }}></div>
        </div>
      </div>

      <div className={styles.actionButtons}>
        <div className="placeholder-glow" style={{ width: '100px', height: '36px', backgroundColor: '#e0e0e0', borderRadius: '4px' }}></div>
        <div className="placeholder-glow" style={{ width: '140px', height: '36px', backgroundColor: '#e0e0e0', borderRadius: '4px' }}></div>
      </div>
    </div>
  );
}
