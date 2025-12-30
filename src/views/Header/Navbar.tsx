// // ============================================
// // FILE: Navbar.tsx
// // ============================================
// "use client";
// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import styles from "./Navbar.module.scss";
// import Link from "next/link";


// const Header: React.FC = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState<any[]>([]);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024) setMobileMenuOpen(false);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Search data with all pages
//   const allPages = [
//     { name: "Home", href: "/" },
//     { name: "Find Doctors", href: "/find-doctors" },
//     { name: "About Us", href: "/aboutus" },
//     { name: "Media Gallery", href: "/media-gallery" },
//     { name: "Health Library", href: "/blog" },
//     { name: "Labs", href: "/labs" },
//     { name: "Mind Wellness", href: "/mind-wellness" },
//     { name: "Appointments", href: "/appointments" },
//     { name: "Health Tracker", href: "/healthtracker" },
//     { name: "Medical Records", href: "/medicalrecords" },
//     { name: "E-Prescription", href: "/eprescription" },
//     { name: "Orders", href: "/orders" },
//     { name: "Subscriptions", href: "/subscriptions" },
//     { name: "Careers", href: "/joinUs" },
//     { name: "Partner With Us", href: "/partnerwithus" },
//     { name: "Corporate", href: "/corporate" },
//     { name: "TeleHealth Units", href: "/thus" },
//     { name: "Contact Us", href: "/contact-us" },
//     { name: "Privacy Policy", href: "/privacy-policy" },
//     { name: "Terms & Conditions", href: "/terms-and-conditions" },
//   ];

//   // Handle search input change
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     if (query.trim() === "") {
//       setSearchResults([]);
//     } else {
//       const filtered = allPages.filter((page) =>
//         page.name.toLowerCase().includes(query)
//       );
//       setSearchResults(filtered);
//     }
//   };

//   // Handle search result click
//   const handleSearchResultClick = (href: string) => {
//     setSearchQuery("");
//     setSearchResults([]);
//     setSearchOpen(false);
//     window.location.href = href;
//   };

//   const solutionsDropdown = {
//     columns: [
//       {
//         title: "Wellness & Services",
//         items: [
//           {
//             name: "Doctors",
//             icon: "doctors",
//             picon: "p1",
//             href: "find-doctors",
//           },
//           {
//             name: "Mind Wellness",
//             icon: "mind-wellness",
//             picon: "p2",
//             href: "/mind-wellness",
//           },
//           { name: "Labs", icon: "labs", picon: "p3", href: "labs" },
//           { name: "Medicines", icon: "medicines", picon: "p4", href: "/medicine" },
//         ],
//       },
//       {
//         title: "Plans & Access",
//         items: [
//           {
//             name: "Wellness Sessions",
//             icon: "wellness-sessions",
//             picon: "p5",
//             href: "/partnerwithus#wellness-section",
//           },
//           {
//             name: "Corporate Care",
//             icon: "corporate-care",
//             picon: "p6",
//             href: "/partnerwithus",
//           },
//           {
//             name: "Your Care Plans",
//             icon: "yourcare-plans",
//             picon: "p7",
//             href: "/find-doctors#subscription-plans",
//           },
//           {
//             name: "TeleHealth Units",
//             icon: "teleHealth-units",
//             picon: "p8",
//             href: "thus",
//           },
//         ],
//       },
//     ],
//   };

//   const joinUsDropdown = [
//     { name: "Careers", icon: "careers", picon: "p9", href: "/joinUs" },
//     {
//       name: "Partner with us",
//       icon: "partner-with-us",
//       picon: "p10",
//       href: "/partnerwithus",
//     },
//   ];

//   const mainLinks = [
//     { name: "Our Story", href: "/aboutus" },
//     { name: "Media Gallery", href: "/media-gallery" },
//     { name: "Health Library", href: "/blog" },
//   ];

//   const contactDropdown = {
//     columns: [
//       {
//         title: "General Inquiries",
//         items: [
//           {
//             label: "CSR Number:",
//             phone: "+92 311 115 1161",
//             picon: "p11",
//             href: "tel:+92 311 115 1161",
//           },
//           {
//             label: "Join Our Team:",
//             phone: "careers@eshaafi.com",
//             picon: "p11",
//             href: "tel:18004357669",
//           },
//           // {
//           //   label: "General Inquiries",
//           //   phone: "GBR: 1-800-HELP-NOW",
//           //   picon: "p11",
//           //   href: "tel:18004357669",
//           // },
//         ],
//       },
//       {
//         title: "Partnership & Media",
//         items: [
//           {
//             label: "For Employers (Wellness Programs):",
//             phone: "business@eshaafi.com",
//             picon: "emp",
//             href: "tel:18004357669",
//           },
//           {
//             label: "For Partnerships & NGOs:",
//             email: "growth@eshaafi.com",
//             picon: "p12",
//             href: "mailto:partner@eshaafi.com",
//           },
//           {
//             label: "Media & PR:",
//             email: "social@eshaafi.com ",
//             picon: "p13",
//             href: "mailto:media@eshaafi.com",
//           },
//         ],
//       },
//     ],
//   };

//   return (
//     <nav className={styles.navbar}>
//       <div className={styles.container}>
//         {/* Logo */}
//         <div className={styles.logo}>
//           {/* <Image
//             src="/images/Logo11.png"
//             alt="eShaafi logo"
//             width={140}
//             height={40}
//             className={styles.logoImg}
//           /> */}
//             <Link href="/" passHref>
//     <Image
//       src="/images/Logo11.png"
//       alt="eShaafi logo"
//       width={140}
//       height={40}
//       className={styles.logoImg}
//     />
//   </Link>
//         </div>

//         {/* Desktop Navigation */}
//         <div className={`${styles.navLinks} ${searchOpen ? styles.hidden : ''}`}>
//           {/* Solutions Dropdown */}
//           <div
//             className={styles.dropdown}
//             onMouseEnter={() => setOpenDropdown("Solutions")}
//             onMouseLeave={() => setOpenDropdown(null)}
//           >
//             <button className={styles.navButton}>
//               <span>Solutions</span>
//               <svg
//                 className={styles.icon}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </button>

//             {openDropdown === "Solutions" && (
//               <div
//                 className={styles.megaDropdown}
//                 onMouseEnter={() => setOpenDropdown("Solutions")}
//                 onMouseLeave={() => setOpenDropdown(null)}
//               >
//                 {solutionsDropdown.columns.map((column, idx) => (
//                   <div key={idx} className={styles.dropdownColumn}>
//                     <h3 className={styles.columnTitle}>{column.title}</h3>
//                     <div className={styles.columnItems}>
//                       {column.items.map((item) => {
//                         const iconSrc = item.picon
//                           ? `/images/${item.picon}.svg`
//                           : `/images/icons/${item.icon}.svg`;
//                         return (
//                           <a
//                             key={item.name}
//                             href={item.href}
//                             className={styles.megaItem}
//                           >
//                             <Image
//                               src={iconSrc}
//                               alt={item.name}
//                               width={20}
//                               height={20}
//                               className={styles.itemIcon}
//                             />
//                             <span className={styles.itemName}>{item.name}</span>
//                           </a>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Join Us Dropdown */}
//           <div
//             className={styles.dropdown}
//             onMouseEnter={() => setOpenDropdown("Join us")}
//             onMouseLeave={() => setOpenDropdown(null)}
//           >
//             <button className={styles.navButton}>
//               <span>Join us</span>
//               <svg
//                 className={styles.icon}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </button>

//             {openDropdown === "Join us" && (
//               <div
//                 className={styles.simpleDropdown}
//                 onMouseEnter={() => setOpenDropdown("Join us")}
//                 onMouseLeave={() => setOpenDropdown(null)}
//               >
//                 {joinUsDropdown.map((item) => {
//                   const iconSrc = item.picon
//                     ? `/images/${item.picon}.svg`
//                     : `/images/icons/${item.icon}.svg`;

//                   return (
//                     <a
//                       key={item.name}
//                       href={item.href}
//                       className={styles.simpleItem}
//                     >
//                       <Image
//                         src={iconSrc}
//                         alt={item.name}
//                         width={20}
//                         height={20}
//                         className={styles.itemIcon}
//                       />
//                       <span className={styles.itemName}>{item.name}</span>
//                     </a>
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//           {mainLinks.map((item) => (
//             <a key={item.name} href={item.href} className={styles.navButton}>
//               {item.name}
//             </a>
//           ))}
//         </div>

//         {/* Search Bar - Replaces NavLinks */}
//         {searchOpen && (
//           <>
//             <div className={styles.searchBarInline}>
//               <input
//                 type="text"
//                 placeholder="Search pages..."
//                 className={styles.searchInputInline}
//                 autoFocus
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//               />

//               {/* Search Results Dropdown */}
//               {searchResults.length > 0 && (
//                 <div className={styles.searchResultsDropdown}>
//                   {searchResults.map((result, idx) => (
//                     <a
//                       key={idx}
//                       href={result.href}
//                       className={styles.searchResultItem}
//                       onClick={(e) => {
//                         e.preventDefault();
//                         handleSearchResultClick(result.href);
//                       }}
//                     >
//                       <svg
//                         className={styles.searchResultIcon}
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M13 10V3L4 14h7v7l9-11h-7z"
//                         />
//                       </svg>
//                       <span>{result.name}</span>
//                     </a>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <button 
//               className={styles.closeSearchInline}
//               onClick={() => {
//                 setSearchOpen(false);
//                 setSearchQuery("");
//                 setSearchResults([]);
//               }}
//             >
//               <svg
//                 className={styles.icon}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </>
//         )}

//         {/* Desktop Actions */}
//         <div className={`${styles.desktopActions} ${searchOpen ? styles.hidden : ''}`}>
//           <button 
//             className={styles.searchBtn}
//             onClick={() => setSearchOpen(!searchOpen)}
//           >
//             <svg
//               className={styles.icon}
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               />
//             </svg>
//           </button>

//           {/* Contact Us Dropdown */}
//           <div
//             className={styles.contactDropdown}
//             onMouseEnter={() => setOpenDropdown("Contact")}
//             onMouseLeave={() => setOpenDropdown(null)}
//           >
//             {/* Keep your original button — unchanged */}
//             <button className={`${styles.actionBtn} ${styles.contactBtn}`}>
//               Contact us
//             </button>

//             {/* Contact Us Dropdown */}
//             {openDropdown === "Contact" && (
//               <div
//                 className={styles.contactMegaDropdown}
//                 onMouseEnter={() => setOpenDropdown("Contact")}
//                 onMouseLeave={() => setOpenDropdown(null)}
//               >
//                 {contactDropdown.columns.map((column, idx) => (
//                   <div key={idx} className={styles.contactColumn}>
//                     <h3 className={styles.contactColumnTitle}>
//                       {column.title}
//                     </h3>
//                     <div className={styles.contactItems}>
//                       {column.items.map((item, itemIdx) => {
//                         let iconSrc = "/images/p11.svg"; 
//                         if (item.picon === "emp") iconSrc = "/images/emp.svg"; 
//                          if (item.picon === "p12") iconSrc = "/images/p12.svg"; 
//                         if (item.picon === "p13") iconSrc = "/images/p13.svg"; 

//                         return (
//                           <div key={itemIdx} className={styles.contactItem}>
//                             <Image
//                               src={iconSrc}
//                               alt={item.label}
//                               width={20}
//                               height={20}
//                               className={styles.contactIcon}
//                             />
//                             <div className={styles.contactDetails}>
//                               <p className={styles.contactLabel}>
//                                 {item.label}
//                               </p>
//                               {item.phone && (
//                                 <a
//                                   href={item.href}
//                                   className={styles.contactLink}
//                                 >
//                                   {item.phone}
//                                 </a>
//                               )}
//                               {item.email && (
//                                 <a
//                                   href={item.href}
//                                   className={styles.contactLink}
//                                 >
//                                   {item.email}
//                                 </a>
//                               )}
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Mobile Toggle */}
//         <button
//           className={styles.mobileToggle}
//           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//         >
//           {mobileMenuOpen ? (
//             <svg
//               className={styles.icon}
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           ) : (
//             <svg
//               className={styles.icon}
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           )}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className={styles.mobileMenu}>
//           <div className={styles.mobileMenuInner}>
//             {["Solutions", "Join us", ...mainLinks.map((l) => l.name)].map(
//               (item) => (
//                 <div key={item} className={styles.mobileDropdown}>
//                   {item === "Solutions" || item === "Join us" ? (
//                     <button
//                       className={styles.mobileLink}
//                       onClick={() =>
//                         setOpenDropdown(openDropdown === item ? null : item)
//                       }
//                     >
//                       <span>{item}</span>
//                       <svg
//                         className={styles.icon}
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M19 9l-7 7-7-7"
//                         />
//                       </svg>
//                     </button>
//                   ) : (
//                     <a
//                       className={styles.mobileLink}
//                       href={mainLinks.find((l) => l.name === item)?.href || "#"}
//                     >
//                       <span>{item}</span>
//                     </a>
//                   )}

//                   {item === "Solutions" && openDropdown === item && (
//                     <div className={styles.mobileSubmenu}>
//                       {solutionsDropdown.columns.flatMap((col) =>
//                         col.items.map((sub) => {
//                           const iconSrc = sub.picon
//                             ? `/images/${sub.picon}.svg`
//                             : `/images/icons/${sub.icon}.svg`;
//                           return (
//                             <a
//                               key={sub.name}
//                               href={sub.href}
//                               className={styles.mobileSubItem}
//                             >
//                               <Image
//                                 src={iconSrc}
//                                 alt={sub.name}
//                                 width={18}
//                                 height={18}
//                               />
//                               <span style={{ marginLeft: "0.5rem" }}>
//                                 {sub.name}
//                               </span>
//                             </a>
//                           );
//                         })
//                       )}
//                     </div>
//                   )}

//                   {item === "Join us" && openDropdown === item && (
//   <div className={styles.mobileSubmenu}>
//     {joinUsDropdown.map((sub) => {
//       // const iconSrc = sub.icon ? `/images/icons/${sub.icon}.svg` 
//       // : `/images/icons/arrow-right.svg`; // fallback icon
//       const iconSrc = sub.picon
//   ? `/images/${sub.picon}.svg`
//   : `/images/icons/${sub.icon}.svg`;

//       return (
//         <a
//           key={sub.name}
//           href={sub.href}
//           className={styles.mobileSubItem}
//         >
//           <Image
//             src={iconSrc}
//             alt={sub.name}
//             width={18}
//             height={18}
//           />
//           <span style={{ marginLeft: "0.5rem" }}>{sub.name}</span>
//         </a>
//       );
//     })}
//   </div>
// )}

//                 </div>
//               )
//             )}

//             <div className={styles.mobileActions}>
//               <button className={`${styles.actionBtn} ${styles.contactBtn}`}>
//                 Contact us
//               </button>
//             </div>
//           </div>
//         </div>
//       )}


//     </nav>
//   );
// };

// export default Header;



'use client';
import React, { useState, useEffect, useCallback } from 'react';
import styles from './Navbar.module.scss';
import Image from "next/image";
import Link from 'next/link';
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { createPortal } from "react-dom";
import { Model } from "./LoginSignupModel";
import Button from "@/components/Button";
import axios from "axios";
import { BASE_URL } from "@/helper/CONST";
import { FaUser, FaCartShopping } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import Cart from "./Cart";
import { unregisterDeviceToken } from "@/helper/notifications";

interface DropdownItem {
  name: string;
  href: string;
  icon?: string;
}

interface NavbarItem {
  title: string;
  href?: string;
  dropdown?: DropdownItem[];
}

const navbarItems: NavbarItem[] = [
  {
    title: "Doctors",
    href: "/find-doctors",
    dropdown: [
      { name: "General Practitioners", href: "/find-doctors?specialty=General%20Physician", icon: "/images/doctor1.svg" },
      { name: "Specialists", href: "/find-doctors?specialty=Specialist", icon: "/images/doctor2.svg" },
      // { name: "Psychiatrists", href: "/Psychiatrists", icon: "/images/doctor3.svg" },
      // { name: "Care Plans", href: "/find-doctors#subscription-plans", icon: "/images/careplans.svg" },
    ],
  },

  {
    title: "Mental Health",
    href: "/mind-wellness",
    dropdown: [
      { name: "Counselors", href: "/mind-wellness?specialty=Counselor#therapists-section", icon: "/images/doctor4.svg" },
      { name: "Psychologists", href: "/mind-wellness?specialty=Clinical%20Psychologist#therapists-section", icon: "/images/doctor5.svg" },
      // { name: "Psychiatrists", href: "/Psychiatrists", icon: "/images/doctor6.svg" },
    ],
  },

  {
    title: "Labs",
    href: "/labs",
  },

  {
    title: "Medicines",
    href: "/medicines",
  },

  {
    title: "Subscription Plans",
    href: "/find-doctors#subscription-plans",
    // dropdown: [
    //   { name: "Essential Care Plan", href: "/find-doctors#subscription-plans", icon: "/images/essential.svg" },
    //   { name: "Family Care Plan", href: "/find-doctors#subscription-plans", icon: "/images/familyplan.svg" },
    //   { name: "Total Health Protection", href: "/find-doctors#subscription-plans", icon: "/images/total.svg" },
    // ],
  },
  {
    title: "Wellness Sessions",
    href: "/partnerwithus#wellness-section",
    // dropdown: [
    //   { name: "Mind Wellness", href: "/partnerwithus#wellness-section", icon: "/images/mindwellness.svg" },
    //   { name: "Nutritional Wellness", href: "/partnerwithus#wellness-section", icon: "/images/nutritionalwellness.svg" },
    //   { name: "Physical Wellness", href: "/partnerwithus#wellness-section", icon: "/images/physicalwellness.svg" },
    //   { name: "Preventive Care", href: "/partnerwithus#wellness-section", icon: "/images/preventivecare.svg" },
    // ],
  },

  {
    title: "Corporate Care",
    href: "/partnerwithus",
    dropdown: [
      { name: "Schedule a Meeting", href: "/partnerwithus#schedule", icon: "/images/schedule.svg" },
      { name: "Our Services", href: "/partnerwithus#services", icon: "/images/services.svg" },
      // { name: "Wellness Sessions", href: "/partnerwithus#wellness-section", icon: "/images/wellnesssessions.svg" },
      { name: "Testimonials", href: "/partnerwithus#testimonials", icon: "/images/testimonials.svg" },
    ],
  },

  {
    title: "THUs",
    href: "/thus",
    dropdown: [
      { name: "What are THUs", href: "/thus#what-are-thus", icon: "/images/thus.svg" },
      { name: "Journey", href: "/thus#journey", icon: "/images/journey.svg" },
      { name: "Join the Mission", href: "/thus#join", icon: "/images/joinmeeting.svg" },
    ],
  },

  {
    title: "Blogs",
    href: "/blog",
    // dropdown: [
    //   { name: "Mind Wellness", href: "/blog#recent", icon: "/images/mindwellness.svg" },
    //   { name: "Preventive Care", href: "/blog#recent", icon: "/images/preventivecare.svg" },
    //   { name: "Everyday Health", href: "/blog#recent", icon: "/images/everyday.svg" },
    //   { name: "About Telehealth", href: "/blog#recent", icon: "/images/about.svg" },
    // ],
  },

  {
    title: "Impact",
    href: "/aboutus",
    dropdown: [
      { name: "Our Story", href: "/aboutus", icon: "/images/ourstory.svg" },
      { name: "Careers", href: "/joinUs", icon: "/images/career.svg" },
      { name: "Media Gallery", href: "/media-gallery", icon: "/images/mediagallery.svg" },
    ],
  },
];


// Define a type for search content items that includes optional specialty
type SearchContentItem = {
  name: string;
  href: string;
  category?: string;
  keywords?: string[];
  specialty?: string;
};

const allPages: SearchContentItem[] = navbarItems.flatMap(item => {
  const mainPage = item.href
    ? [{ name: item.title, href: item.href }]
    : [];

  const dropdownPages = item.dropdown
    ? item.dropdown.map(sub => ({ name: sub.name, href: sub.href }))
    : [];

  return [...mainPage, ...dropdownPages];
});

// Extended search data with doctors, specialties, labs, and services

const getSearchableContent = (doctorsData?: any[]): SearchContentItem[] => {
  const searchContent: SearchContentItem[] = [

    // Navigation pages
    ...allPages,
    
    // Specialties/Services
    { name: 'General Physician', category: 'Specialty', href: '/find-doctors?specialty=General%20Physician', keywords: ['gp', 'general doctor', 'general practitioner'] },
    { name: 'Dermatologist', category: 'Specialty', href: '/find-doctors?specialty=Dermatologist', keywords: ['skin', 'skin specialist', 'skin doctor'] },
    { name: 'Cardiologist', category: 'Specialty', href: '/find-doctors?specialty=Cardiologist', keywords: ['heart', 'cardiac', 'heart specialist'] },
    { name: 'Pediatrician', category: 'Specialty', href: '/find-doctors?specialty=Pediatrician', keywords: ['child', 'children', 'kids'] },
    { name: 'Orthopedic', category: 'Specialty', href: '/find-doctors?specialty=Orthopedic', keywords: ['bones', 'joints', 'orthopedist'] },
    { name: 'Psychiatrist', category: 'Specialty', href: '/mind-wellness', keywords: ['mental health', 'psychology', 'therapist'] },
    { name: 'Clinical Psychologist', category: 'Specialty', href: '/mind-wellness', keywords: ['psychology', 'counseling', 'psychologist'] },
    { name: 'Counselor', category: 'Specialty', href: '/mind-wellness', keywords: ['counseling', 'therapy'] },
    
    // Lab Tests
    { name: 'Blood Test', category: 'Lab Test', href: '/labs', keywords: ['blood', 'hematology', 'cbc'] },
    { name: 'COVID-19 Test', category: 'Lab Test', href: '/labs', keywords: ['covid', 'coronavirus', 'pcr'] },
    { name: 'Diabetes Test', category: 'Lab Test', href: '/labs', keywords: ['diabetes', 'glucose', 'hba1c'] },
    { name: 'Thyroid Test', category: 'Lab Test', href: '/labs', keywords: ['thyroid', 'tsh', 'endocrine'] },
    { name: 'Liver Test', category: 'Lab Test', href: '/labs', keywords: ['liver', 'hepatic', 'bilirubin'] },
    { name: 'Kidney Test', category: 'Lab Test', href: '/labs', keywords: ['kidney', 'renal', 'creatinine'] },
    
    // Services
    { name: 'Video Consultation', category: 'Service', href: '/find-doctors', keywords: ['online doctor', 'video call', 'telemedicine'] },
    { name: 'Health Tracker', category: 'Service', href: '/healthtracker', keywords: ['fitness', 'health', 'tracking'] },
    { name: 'Medical Records', category: 'Service', href: '/medicalrecords', keywords: ['records', 'documents', 'prescriptions'] },
    { name: 'Medicines', category: 'Service', href: '/medicines', keywords: ['drugs', 'medication', 'pharmacy'] },
    { name: 'Appointment Booking', category: 'Service', href: '/appointments', keywords: ['book', 'schedule', 'appointment'] },
  ];

  // Add dynamic doctor data if available
  if (doctorsData && Array.isArray(doctorsData)) {
    doctorsData.forEach((doctor: any) => {
      const doctorName = `${doctor.personal_info?.title || ''} ${doctor.personal_info?.firstName || ''} ${doctor.personal_info?.lastName || ''}`.trim();
      const specialty = doctor.specialization || '';
      
      if (doctorName) {
        searchContent.push({
          name: doctorName,
          // category: 'Doctor', 
          specialty: specialty,
          href: `/find-doctors`,
          keywords: [specialty?.toLowerCase(), 'doctor', 'consultation']
        });
      }
    });
  }

  return searchContent;
};


const Navbar: React.FC<{ doctors?: any[] }> = ({ doctors = [] }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [doctorsData, setDoctorsData] = useState<any[]>(doctors);

  // Get searchable content (includes doctors if passed)
  const searchableContent = getSearchableContent(doctorsData);

  const dispatch = useDispatch();
  const router = useRouter();
  const { modalValue, userAuth, drawer } = useSelector(
    (state: any) => state.loginModalReducer
  );
  const { cart, packages } = useSelector((state: any) => state.labCartReducer);

  // Plus Both Value 
  const totalItemCount = cart.length + packages.length;

  // Fetch doctors data on component mount if not already provided
  useEffect(() => {
    if (doctors && doctors.length > 0) {
      setDoctorsData(doctors);
      return;
    }

    const fetchDoctors = async () => {
      try {
        const response = await axios.post(BASE_URL + "/patients/doctors/filter", {
          type: "categroy",
        });
        
        if (response.data?.response?.Items) {
          setDoctorsData(response.data.response.Items);
        }
      } catch (error) {
        console.error('Failed to fetch doctors for search:', error);
        // Silently fail - search will work with limited data
      }
    };

    fetchDoctors();
  }, [doctors]);

  // Enhanced search that includes content like doctors, specialties, labs
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase().trim();
    setSearchQuery(query);
    
    if (!query) {
      setSearchResults([]);
    } else {
      // Filter searchable content with keyword matching
      const filtered = searchableContent.filter((item: any) => {
        const nameMatch = item.name.toLowerCase().includes(query);
        const categoryMatch = item.category?.toLowerCase().includes(query);
        const keywordMatch = item.keywords?.some((kw: string) => kw.includes(query));
        
        return nameMatch || categoryMatch || keywordMatch;
      });
      
      // Sort results: prioritize exact matches and category matches
      const sorted = filtered.sort((a: any, b: any) => {
        const aExact = a.name.toLowerCase().startsWith(query) ? 1 : 0;
        const bExact = b.name.toLowerCase().startsWith(query) ? 1 : 0;
        return bExact - aExact;
      });
      
      setSearchResults(sorted.slice(0, 12)); // Limit to 12 results
    }
  };

  const handleSearchResultClick = (href: string) => {
    setSearchQuery("");
    setSearchResults([]);
    setSearchOpen(false);
    window.location.href = href;
  };

  const handleModal = () => {
    document.body.style.overflow = "hidden";
    dispatch({ type: "loginModalSlice/open" });
  };

  const logout = () => {
    // Unregister device token before logout
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      if (userData.userId) {
        unregisterDeviceToken(userData.userId).catch(console.error);
      }
    }

    axios
      .post(BASE_URL + `/auth/signOut`, {
        access_token: userAuth.AccessToken,
        type: 1,
        uuid: userAuth.uuid,
      })
      .then((res) => {
        dispatch({ type: "loginModalSlice/clearAuth" });
        localStorage.removeItem("user");
        router.push("/");
      })
      .catch((err) => {
        dispatch({ type: "loginModalSlice/clearAuth" });
        localStorage.removeItem("user");
      });
  };

  useEffect(() => {
    const storedValue: any | null = localStorage.getItem("user");
    const uuid: any | null = storedValue ? JSON.parse(storedValue) : null;
    dispatch({ type: "loginModalSlice/setAuth", payload: uuid });
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__container}>
        {/* Logo */}
        <Link href="/" className={styles.navbar__logo}>
          <Image src="/images/eShaafilogo.png" alt="eShaafi Logo" width={40} height={40} />
          <span className={styles.logoText}>eShaafi</span>
        </Link>

        {/* Desktop Menu */}
        {!searchOpen && (
          <ul className={styles.navbar__menu}>
            {navbarItems.map((item, idx) => (
              <li
                key={idx}
                className={styles.navItem}
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                {item.href ? (
                  <a href={item.href}>{item.title}</a>
                ) : (
                  <a href="#">{item.title}</a>
                )}

                {/* Dropdown */}
                {hoverIndex === idx && item.dropdown && (
                  <div className={styles.dropdown}>
                    {item.dropdown.map((sub, i) => (
                      <a
                        key={i}
                        href={sub.href}
                        className={styles.dropdownItem}
                        onClick={() => {
                          setHoverIndex(null);
                          setMenuOpen(false);
                        }}
                      >
                        {sub.icon && <Image src={sub.icon} alt={sub.name} width={30} height={30} />}
                        <span>{sub.name}</span>
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        {/* Inline Search */}
        {searchOpen && (
          <div className={styles.searchBarInline}>
            <input
              type="text"
              placeholder="Search pages..."
              className={styles.searchInputInline}
              autoFocus
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button
              className={styles.closeSearchInline}
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery('');
                setSearchResults([]);
              }}
              aria-label="Close search"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {searchResults.length > 0 && (
              <div className={styles.searchResultsDropdown}>
                {searchResults.map((result, idx) => (
                  <a
                    key={idx}
                    href={result.href}
                    className={styles.searchResultItem}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSearchResultClick(result.href);
                    }}
                    title={result.specialty ? `${result.name} - ${result.specialty}` : result.name}
                  >
                    <svg
                      className={styles.searchResultIcon}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <div className={styles.searchResultContent}>
                      <span className={styles.searchResultName}>{result.name}</span>
                      {result.category && (
                        <span className={styles.searchResultCategory}>{result.category}</span>
                      )}
                      {result.specialty && (
                        <span className={styles.searchResultSpecialty}>{result.specialty}</span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Right Actions */}
        <div className={styles.navbar__actions}>
          {!searchOpen && (
            <>
              <button
                className={styles.searchBtn}
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2" />
                  <path d="M14 14L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>

              {!userAuth?.uuid ? (
                <>
                  <Button onClick={handleModal}>
                    Login/Sign Up
                  </Button>
                </>
              ) : (
                <>
                  {/* {userAuth.uuid && (
                    <Button
                      onClick={() => setShowCart(!showCart)}
                      className={styles.cartBtn}
                    >
                      <FaCartShopping style={{ fontSize: 22 }} />
                      {totalItemCount >= 1 && (
                        <span className={styles.cartNumber}>{totalItemCount}</span>
                      )}
                    </Button>
                  )}
                  {showCart &&
                    createPortal(<Cart setShowCart={setShowCart} />, document.body)} */}

                  <Button onClick={() => setShowProfile(true)} className={styles.profileBtn}>
                    {!userAuth.url ? (
                      <FaUser
                        style={{
                          fontSize: 22,
                          borderRadius: "50px",
                        }}
                      />
                    ) : (
                      <Image
                        src={userAuth.url}
                        alt="user-image"
                        width={35}
                        height={35}
                        style={{ borderRadius: 50, objectFit: 'cover' }}
                      />
                    )}
                  </Button>
                  {showProfile &&
                    createPortal(
                      <div
                        className={styles.profileModal}
                        onClick={() => setShowProfile(false)}
                      >
                        <ul
                          className={styles.profileLinks}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* <li className="border-bottom">
                            <div className="d-flex flex-column">
                              <h4 className="text-capitalize">
                                {userAuth?.name || 'User'}
                              </h4>
                              <p>{userAuth?.phoneNo}</p>
                            </div>
                          </li> */}
                          <li>
                            <Link href={"/find-doctors"} onClick={() => setShowProfile(false)}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="8.5" cy="7" r="4" />
                                <path d="m15 11 2 2 4-4" />
                              </svg>
                              Doctors
                            </Link>
                          </li>
                          <li>
                            <Link href={"/profile"} onClick={() => setShowProfile(false)}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                                <path d="M12 14c-4.42 0-8 2.69-8 6v2h16v-2c0-3.31-3.58-6-8-6z" />
                              </svg>
                              Profile
                            </Link>
                          </li>
                          <li>
                            <Link href={"/appointments"} onClick={() => setShowProfile(false)}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                              </svg>
                              Appointments
                            </Link>
                          </li>
                          {/* <li>
                            <Link href={"/orders"}>
                              Orders
                            </Link>
                          </li>
                          <li>
                            <Link href={"/medicalrecords"}>
                              Medical Records
                            </Link>
                          </li>
                          <li>
                            <Link href={"/eprescription"}>
                              Eprescription
                            </Link>
                          </li>
                          <li>
                            <Link href={"/privacy-policy"}>
                              Privacy Policy
                            </Link>
                          </li> */}
                          <li className="border-top">
                            <Button
                              onClick={() => { setShowProfile(false); logout(); }}
                              className="w-100 text-start"
                            >
                              <FiLogOut style={{ fontSize: 16, marginRight: 8 }} />
                              Logout
                            </Button>
                          </li>
                        </ul>
                      </div>,
                      document.body
                    )}
                </>
              )}

            </>
          )}

          {/* Hamburger */}
          <button
            className={`${styles.navbar__hamburger} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className={styles.navbar__menuMobile}>
          {navbarItems.map((item, idx) => (
            <li key={idx}>
              {item.dropdown ? (
                <details>
                  <summary>
                    <span>{item.title}</span>
                    <svg
                      className={styles.dropdownArrow}
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M3 4.5L6 7.5L9 4.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </summary>
                  <div className={styles.mobileDropdown}>
                    {item.dropdown.map((sub, i) => (
                      <a key={i} href={sub.href} onClick={() => setMenuOpen(false)}>
                        {sub.icon && <Image src={sub.icon} alt={sub.name} width={20} height={20} />}
                        {sub.name}
                      </a>
                    ))}
                  </div>
                </details>
              ) : (
                <a href={item.href} onClick={() => setMenuOpen(false)}>{item.title}</a>
              )}
            </li>
          ))}

          {/* Mobile Authentication */}
          {!userAuth?.uuid ? (
            <li className="p-2">
              <Button variant="outlined" onClick={handleModal} className="w-100">
                Login/Sign Up
              </Button>
            </li>
          ) : (
            <>
              <li className="p-2">
                <Link href={"/profile"} className="w-100 d-flex">
                  <FaUser style={{ fontSize: 20, marginRight: 8 }} />
                  Profile
                </Link>
              </li>
              <li className="p-2">
                <Link href={"/appointments"} className="w-100 d-flex">
                  Appointments
                </Link>
              </li>
              <li className="p-2">
                <Button onClick={logout} className="w-100 text-start">
                  <FiLogOut style={{ fontSize: 20, marginRight: 8 }} />
                  Logout
                </Button>
              </li>
            </>
          )}
        </ul>
      )}

      {/* Login Modal */}
      {modalValue && <Model page="header" />}
    </nav>
  );
};

export default Navbar;