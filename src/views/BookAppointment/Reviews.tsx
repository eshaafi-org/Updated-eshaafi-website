import { MdThumbUp } from "react-icons/md";
import moment from "moment";

export default function Reviews({ reviews }: { reviews: any[] }) {
  return (
    <section className="d-flex flex-column row-gap-1">
      <h5>Patient Reviews</h5>
      <ul className="d-flex flex-column row-gap-1">
        {reviews?.map((itm, indx) => (
          <li key={indx} className="d-flex flex-column row-gap-0-5">
            <h3 className="d-flex align-items-center col-gap-1 text-dark">
              <MdThumbUp style={{ color: "#009b94" }} />
              Recommended
            </h3>
            <p style={{ color: "#192A3E" }}>“{itm.review}”</p>
            <small className="align-self-end">
              by {itm.patientInfo + " "}
              {moment(itm.appoint_date).startOf("day").fromNow()}
            </small>
          </li>
        ))}
      </ul>
    </section>
  );
}
