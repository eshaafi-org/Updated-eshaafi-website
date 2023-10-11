import Link from "next/link";
import { MdNavigateNext } from "react-icons/md";
export default function AddressBar({
  links,
}: {
  links: { name: string; link: string }[];
}) {
  return (
    <ul className="d-flex">
      {links.map((item: { name: string; link: string }, indx: number) => (
        <li key={indx} className="d-flex items-center">
          <Link
            href={item.link}
            className="sm-font"
            style={{ color: "#777777" }}
          >
            {item.name}
          </Link>
          {indx + 1 === links.length || (
            <MdNavigateNext style={{ color: "#777777", fontSize: "1.2rem" }} />
          )}
        </li>
      ))}
    </ul>
  );
}
