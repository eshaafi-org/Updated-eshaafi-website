import Link from "next/link";
import React from "react";
interface SubLinks {
  icon: React.JSX.Element;
  name: string;
  link: string;
}
import style from "./Header.module.scss";
export const SubLinksModal = ({
  links,
  onClose,
}: {
  links: SubLinks[];
  onClose: () => void;
}) => {
  return (
    <div
      className={style.subLinkContainer}
      onMouseLeave={onClose}
      onClick={onClose}
    >
      <div
        className="bg-white p-1 rounded sm-w-full"
        style={{ width: 180, boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)" }}
      >
        <ul className="flex flex-col row-gap-2">
          {links.map((item, indx) => (
            <li key={indx}>
              <Link
                href={item.link}
                className="flex items-center col-gap-1"
                target="_blank"
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
