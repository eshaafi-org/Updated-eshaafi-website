// import {Slider} from "react-slick";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
//
const reviews = [
  {
    id: 0,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus dignissimos, et repudiandae quas hic inventore quisquam quis vitae, excepturi labore laudantium laboriosam veritatis optio illo minima voluptatum pariatur iure esse, voluptatibus ut explicabo est similique molestias.",
    name: "Elsa Porter",
  },
  {
    id: 1,
    text: "Fugit quibusdam veniam illum iure sunt quisquam necessitatibus sequi excepturi minima harum qui aliquid, modi voluptatibus expedita quasi illo! Numquam provident, vero saepe soluta officia beatae ducimus est ut dolorem atque aperiam non suscipit voluptatem?",
    name: "John Smith",
  },
  {
    id: 2,
    text: "Ut eius omnis rerum harum beatae ullam commodi quam quasi aperiam veniam quae esse corporis, fuga quis, animi asperiores similique nobis maiores molestias dolore ipsam. Omnis sunt iusto quasi.",
    name: "Scarlett Light",
  },
];

//
export default function Reviews() {
  return (
    <section className="w-full bg-white">
      <div className="container">
        <div className="flex flex-col row-gap-2 items-center">
          <h3>Reviews</h3>
          <h2>Hear From Our Patients</h2>
          <div></div>
        </div>
      </div>
    </section>
  );
}
