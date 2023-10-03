// footer links
import creditCard from "../../../public/images/creditcard.png";
import secure from "../../../public/images/secure.png";
import support from "../../../public/images/support.png";
import verified from "../../../public/images/verified.png";
import {
  FaLinkedin,
  FaSquareFacebook,
  FaYoutube,
  FaXTwitter,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa6";

//
export const footerLinks = [
  // {
  //   heading: "Diseases We Treat",
  //   links: [
  //     { name: "Acne", href: "/" },
  //     { name: "Asthma", href: "/" },
  //     { name: "Cholera", href: "/" },
  //     { name: "Cholesterol", href: "/" },
  //     { name: "Diabetes", href: "/" },
  //     { name: "Dengue Fever", href: "/" },
  //     { name: "Depression and Anxiety", href: "/" },
  //     { name: "Hair Loss", href: "/" },
  //     { name: "Hepatitis", href: "/" },
  //     { name: "High Blood Pressure", href: "/" },
  //     { name: "Influenza", href: "/" },
  //     { name: "Insomnia", href: "/" },
  //     { name: "Malaria", href: "/" },
  //     { name: "Migraine", href: "/" },
  //     { name: "Respiratory Infection", href: "/" },
  //     { name: "Typhoid", href: "/" },
  //   ],
  // },
  {
    heading: "Company",
    links: [
      { name: "Home", href: "/" },
      // { name: "About Us", href: "/aboutus" },
      // { name: "Privacy Policy", href: "/privacypolicy" },
      // { name: "Careers", href: "/careers" },
      // { name: "Contact Us", href: "/contactus" },
    ],
  },
  {
    heading: "Services",
    links: [
      { name: "Video Consultation", href: "/doctors" },
      // { name: "Home Nursing", href: "/" },
      // { name: "Labs", href: "/" },
      // { name: "Pharmacy", href: "/" },
      // { name: "24/7 Support", href: "/" },
      // { name: "Subscription Plans", href: "/" },
      // { name: "For Organization", href: "/" },
    ],
  },
  {
    heading: "More",
    links: [
      { name: "Blogs", href: "/blog" },
      // { name: "Help", href: "/" },
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms and Conditions", href: "/terms-and-conditions" },
      { name: "FAQs", href: "/faq" },
    ],
  },
];
// social media links
export const socialLinks = [
  {
    icon: <FaLinkedin />,
    link: "https://www.linkedin.com/company/eshaafi/",
  },
  {
    icon: <FaSquareFacebook />,
    link: "https://www.facebook.com/eShaaficare?mibextid=ZbWKwL",
  },
  {
    icon: <FaXTwitter />,
    link: "https://twitter.com/eshaafi_com",
  },
  {
    icon: <FaInstagram />,
    link: "https://www.instagram.com/eshaafipk/",
  },
  {
    icon: <FaYoutube />,
    link: "https://www.youtube.com/@eShaaficare",
  },
  {
    icon: <FaTiktok />,
    link: "https://www.tiktok.com/@eshaaficare",
  },
];

export const supportsList = [
  {
    icon: verified,
    text: "PMC Verified doctors",
  },
  {
    icon: creditCard,
    text: "Return Payment in 48 hours",
  },
  {
    icon: secure,
    text: "Secure SSL",
  },
  {
    icon: support,
    text: "12/7 Customer Support",
  },
];
