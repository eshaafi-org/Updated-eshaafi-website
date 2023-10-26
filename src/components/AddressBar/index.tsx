import Link from "next/link";
import { MdNavigateNext } from "react-icons/md";

export default function AddressBar({
  links,
  title,
}: {
  links: { name: string | string[] | undefined; link: string }[];
  title?: string;
}) {
  return (
    <div className="mb-1">
      <h4 className="pageHeading">{title}</h4>
      <ul className="d-flex">
        {links.map(
          (
            item: { name: string | string[] | undefined; link: string },
            indx: number
          ) => (
            <li key={indx} className="d-flex align-items-center">
              <Link
                href={item.link}
                className="sm-font capitalize"
                style={{ color: "#777777" }}
              >
                {item.name}
              </Link>
              {indx + 1 === links.length || (
                <MdNavigateNext
                  style={{ color: "#777777", fontSize: "1.2rem" }}
                />
              )}
            </li>
          )
        )}
      </ul>
    </div>
  );
}
