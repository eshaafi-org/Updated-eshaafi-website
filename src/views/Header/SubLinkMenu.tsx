import Link from "next/link";
import React from "react";
interface SubLinks {
  icon: React.JSX.Element;
  name: string;
  link: string;
}
export const SubLinksModal = ({
  links,
  onClose,
}: {
  links: SubLinks[];
  onClose: () => void;
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: -30,
        width: 180,
        height: 300,
        paddingTop: 60,
        // boxShadow: "20px -20px 60px #bebebe,-20px 20px 60px #ffffff",
      }}
      onMouseLeave={onClose}
    >
      <div
        className="bg-white p-1 rounded"
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
