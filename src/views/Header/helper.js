import {
  FaUserDoctor,
  FaUserNurse,
  FaBloggerB,
  FaCircleInfo,
} from "react-icons/fa6";
import { PiFirstAidKitFill } from "react-icons/pi";

export const navLinks = [
  {
    id: 1,
    linkName: "Doctors",
    LinkRoute: "/doctors",
    subLink: [],
    icon: <FaUserDoctor style={{ fontSize: 20 }} />,
  },
  // {
  //   id: 2,
  //   linkName: "Home Nursing",
  //   LinkRoute: "/nursing",
  //   subLink: [],
  //   icon: <FaUserNurse style={{ fontSize: 20 }} />,
  // },
  // {
  //   id: 3,
  //   linkName: `Solutions`,
  //   subLink: [
  //     { name: "Video Consultation", link: "/" },
  //     { name: "Home Nursing", link: "/" },
  //     { name: "Lab Test", link: "/" },
  //     { name: "Subscription Plans", link: "/" },
  //     { name: "For Organizations", link: "/" },
  //   ],
  //   LinkRoute: "/",
  //   icon: <PiFirstAidKitFill style={{ fontSize: 20 }} />,
  // },
  {
    id: 5,
    linkName: "Blogs",
    LinkRoute: "/blog",
    subLink: [],
    icon: <FaBloggerB style={{ fontSize: 20 }} />,
  },
  // {
  //   id: 6,
  //   linkName: "About Us",
  //   LinkRoute: "/aboutus",
  //   subLink: [],
  //   icon: <FaCircleInfo style={{ fontSize: 20 }} />,
  // },
];
