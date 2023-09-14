import { MdThumbUp } from "react-icons/md";
import moment from "moment";

export default function Reviews({ reviews }: { reviews: any[] }) {
  return (
    <section className="flex flex-col row-gap-1">
      <h5>Reviews</h5>
      <ul className="flex flex-col row-gap-1">
        {reviews?.map((itm, indx) => (
          <li key={indx} className="flex flex-col row-gap-1">
            <h3 className="flex items-center col-gap-1">
              <MdThumbUp />
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
