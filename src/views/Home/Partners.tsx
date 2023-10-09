import Link from "next/link";
import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";
import partner1 from "/public/images/partner1.png";
import partner2 from "/public/images/partner2.png";
import partner3 from "/public/images/partner3.png";
import partner4 from "/public/images/partner4.png";
//
const partners = [
  {
    icon: partner4,
  },
  {
    icon: partner3,
  },
  {
    icon: partner2,
  },
  {
    icon: partner1,
  },
];
//
export default function Partners() {
  return (
    <section className="w-full bg-white">
      <div className="container sm-pt-0">
        <div className="flex flex-col row-gap-2 items-center">
          <h2>Corporate Partners</h2>
          <ul className="flex justify-between flex-wrap w-full sm-flex-col sm-items-center">
            {partners.map((itm, indx) => (
              <li key={indx}>
                <Image src={itm.icon} alt="partner" />
              </li>
            ))}
          </ul>
          {/* <Link href={"/"} className="link">
            Join Us <MdKeyboardArrowRight />
          </Link> */}
        </div>
      </div>
    </section>
  );
}
