import style from '@/styles/subscription.module.scss'
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
