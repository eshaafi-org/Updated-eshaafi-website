import Link from "next/link";
import React from "react";
import whatsapp from "../../../public/images/phone-call.png";
interface SubLinks {
  icon: React.JSX.Element;
  name: string;
  link: string;
}
import style from "./Header.module.scss";
import Image from "next/image";
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
        className="bg-white p-2 rounded w-100"
        style={{ boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)" }}
      >
        <ul className="d-flex flex-column row-gap-3">
          {links.map((item, indx) => (
            <li key={indx}>
              <Link
                href={item.link}
                className="d-flex items-center col-gap-1"
                target="_blank"
              >
                <Image
                  src={whatsapp}
                  alt="WhatsApp Icon"
                  width={24}
                  height={24}
                />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
