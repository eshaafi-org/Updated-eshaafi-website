// ============================================
// FILE: Navbar.tsx
// ============================================
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Navbar.module.scss";
import Link from "next/link";


const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Search data with all pages
  const allPages = [
    { name: "Home", href: "/" },
    { name: "Find Doctors", href: "/find-doctors" },
    { name: "About Us", href: "/aboutus" },
    { name: "Media Gallery", href: "/media-gallery" },
    { name: "Health Library", href: "/blog" },
    { name: "Labs", href: "/labs" },
    { name: "Mind Wellness", href: "/mind-wellness" },
    { name: "Appointments", href: "/appointments" },
    { name: "Health Tracker", href: "/healthtracker" },
    { name: "Medical Records", href: "/medicalrecords" },
    { name: "E-Prescription", href: "/eprescription" },
    { name: "Orders", href: "/orders" },
    { name: "Subscriptions", href: "/subscriptions" },
    { name: "Careers", href: "/joinUs" },
    { name: "Partner With Us", href: "/partnerwithus" },
    { name: "Corporate", href: "/corporate" },
    { name: "TeleHealth Units", href: "/thus" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms-and-conditions" },
  ];

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
    } else {
      const filtered = allPages.filter((page) =>
        page.name.toLowerCase().includes(query)
      );
      setSearchResults(filtered);
    }
  };

  // Handle search result click
  const handleSearchResultClick = (href: string) => {
    setSearchQuery("");
    setSearchResults([]);
    setSearchOpen(false);
    window.location.href = href;
  };

  const solutionsDropdown = {
    columns: [
      {
        title: "Wellness & Services",
        items: [
          {
            name: "Doctors",
            icon: "doctors",
            picon: "p1",
            href: "find-doctors",
          },
          {
            name: "Mind Wellness",
            icon: "mind-wellness",
            picon: "p2",
            href: "/mind-wellness",
          },
          { name: "Labs", icon: "labs", picon: "p3", href: "labs" },
          { name: "Medicines", icon: "medicines", picon: "p4", href: "/medicine" },
        ],
      },
      {
        title: "Plans & Access",
        items: [
          {
            name: "Wellness Sessions",
            icon: "wellness-sessions",
            picon: "p5",
            href: "/partnerwithus#wellness-section",
          },
          {
            name: "Corporate Care",
            icon: "corporate-care",
            picon: "p6",
            href: "/partnerwithus",
          },
          {
            name: "Your Care Plans",
            icon: "yourcare-plans",
            picon: "p7",
            href: "/find-doctors#subscription-plans",
          },
          {
            name: "TeleHealth Units",
            icon: "teleHealth-units",
            picon: "p8",
            href: "thus",
          },
        ],
      },
    ],
  };

  const joinUsDropdown = [
    { name: "Careers", icon: "careers", picon: "p9", href: "/joinUs" },
    {
      name: "Partner with us",
      icon: "partner-with-us",
      picon: "p10",
      href: "/partnerwithus",
    },
  ];

  const mainLinks = [
    { name: "Our Story", href: "/aboutus" },
    { name: "Media Gallery", href: "/media-gallery" },
    { name: "Health Library", href: "/blog" },
  ];

  const contactDropdown = {
    columns: [
      {
        title: "General Inquiries",
        items: [
          {
            label: "CSR Number:",
            phone: "+92 311 115 1161",
            picon: "p11",
            href: "tel:+92 311 115 1161",
          },
          {
            label: "Join Our Team:",
            phone: "careers@eshaafi.com",
            picon: "p11",
            href: "tel:18004357669",
          },
          // {
          //   label: "General Inquiries",
          //   phone: "GBR: 1-800-HELP-NOW",
          //   picon: "p11",
          //   href: "tel:18004357669",
          // },
        ],
      },
      {
        title: "Partnership & Media",
        items: [
          {
            label: "For Employers (Wellness Programs):",
            phone: "business@eshaafi.com",
            picon: "emp",
            href: "tel:18004357669",
          },
          {
            label: "For Partnerships & NGOs:",
            email: "growth@eshaafi.com",
            picon: "p12",
            href: "mailto:partner@eshaafi.com",
          },
          {
            label: "Media & PR:",
            email: "social@eshaafi.com ",
            picon: "p13",
            href: "mailto:media@eshaafi.com",
          },
        ],
      },
    ],
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          {/* <Image
            src="/images/Logo11.png"
            alt="eShaafi logo"
            width={140}
            height={40}
            className={styles.logoImg}
          /> */}
            <Link href="/" passHref>
    <Image
      src="/images/Logo11.png"
      alt="eShaafi logo"
      width={140}
      height={40}
      className={styles.logoImg}
    />
  </Link>
        </div>

        {/* Desktop Navigation */}
        <div className={`${styles.navLinks} ${searchOpen ? styles.hidden : ''}`}>
          {/* Solutions Dropdown */}
          <div
            className={styles.dropdown}
            onMouseEnter={() => setOpenDropdown("Solutions")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className={styles.navButton}>
              <span>Solutions</span>
              <svg
                className={styles.icon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {openDropdown === "Solutions" && (
              <div
                className={styles.megaDropdown}
                onMouseEnter={() => setOpenDropdown("Solutions")}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {solutionsDropdown.columns.map((column, idx) => (
                  <div key={idx} className={styles.dropdownColumn}>
                    <h3 className={styles.columnTitle}>{column.title}</h3>
                    <div className={styles.columnItems}>
                      {column.items.map((item) => {
                        const iconSrc = item.picon
                          ? `/images/${item.picon}.svg`
                          : `/images/icons/${item.icon}.svg`;
                        return (
                          <a
                            key={item.name}
                            href={item.href}
                            className={styles.megaItem}
                          >
                            <Image
                              src={iconSrc}
                              alt={item.name}
                              width={20}
                              height={20}
                              className={styles.itemIcon}
                            />
                            <span className={styles.itemName}>{item.name}</span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Join Us Dropdown */}
          <div
            className={styles.dropdown}
            onMouseEnter={() => setOpenDropdown("Join us")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className={styles.navButton}>
              <span>Join us</span>
              <svg
                className={styles.icon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {openDropdown === "Join us" && (
              <div
                className={styles.simpleDropdown}
                onMouseEnter={() => setOpenDropdown("Join us")}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {joinUsDropdown.map((item) => {
                  const iconSrc = item.picon
                    ? `/images/${item.picon}.svg`
                    : `/images/icons/${item.icon}.svg`;

                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className={styles.simpleItem}
                    >
                      <Image
                        src={iconSrc}
                        alt={item.name}
                        width={20}
                        height={20}
                        className={styles.itemIcon}
                      />
                      <span className={styles.itemName}>{item.name}</span>
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {mainLinks.map((item) => (
            <a key={item.name} href={item.href} className={styles.navButton}>
              {item.name}
            </a>
          ))}
        </div>

        {/* Search Bar - Replaces NavLinks */}
        {searchOpen && (
          <>
            <div className={styles.searchBarInline}>
              <input
                type="text"
                placeholder="Search pages..."
                className={styles.searchInputInline}
                autoFocus
                value={searchQuery}
                onChange={handleSearchChange}
              />
              
              {/* Search Results Dropdown */}
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
                      <span>{result.name}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <button 
              className={styles.closeSearchInline}
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery("");
                setSearchResults([]);
              }}
            >
              <svg
                className={styles.icon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </>
        )}

        {/* Desktop Actions */}
        <div className={`${styles.desktopActions} ${searchOpen ? styles.hidden : ''}`}>
          <button 
            className={styles.searchBtn}
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <svg
              className={styles.icon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* Contact Us Dropdown */}
          <div
            className={styles.contactDropdown}
            onMouseEnter={() => setOpenDropdown("Contact")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            {/* Keep your original button — unchanged */}
            <button className={`${styles.actionBtn} ${styles.contactBtn}`}>
              Contact us
            </button>

            {/* Contact Us Dropdown */}
            {openDropdown === "Contact" && (
              <div
                className={styles.contactMegaDropdown}
                onMouseEnter={() => setOpenDropdown("Contact")}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {contactDropdown.columns.map((column, idx) => (
                  <div key={idx} className={styles.contactColumn}>
                    <h3 className={styles.contactColumnTitle}>
                      {column.title}
                    </h3>
                    <div className={styles.contactItems}>
                      {column.items.map((item, itemIdx) => {
                        let iconSrc = "/images/p11.svg"; 
                        if (item.picon === "emp") iconSrc = "/images/emp.svg"; 
                         if (item.picon === "p12") iconSrc = "/images/p12.svg"; 
                        if (item.picon === "p13") iconSrc = "/images/p13.svg"; 

                        return (
                          <div key={itemIdx} className={styles.contactItem}>
                            <Image
                              src={iconSrc}
                              alt={item.label}
                              width={20}
                              height={20}
                              className={styles.contactIcon}
                            />
                            <div className={styles.contactDetails}>
                              <p className={styles.contactLabel}>
                                {item.label}
                              </p>
                              {item.phone && (
                                <a
                                  href={item.href}
                                  className={styles.contactLink}
                                >
                                  {item.phone}
                                </a>
                              )}
                              {item.email && (
                                <a
                                  href={item.href}
                                  className={styles.contactLink}
                                >
                                  {item.email}
                                </a>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className={styles.mobileToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg
              className={styles.icon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className={styles.icon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuInner}>
            {["Solutions", "Join us", ...mainLinks.map((l) => l.name)].map(
              (item) => (
                <div key={item} className={styles.mobileDropdown}>
                  {item === "Solutions" || item === "Join us" ? (
                    <button
                      className={styles.mobileLink}
                      onClick={() =>
                        setOpenDropdown(openDropdown === item ? null : item)
                      }
                    >
                      <span>{item}</span>
                      <svg
                        className={styles.icon}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  ) : (
                    <a
                      className={styles.mobileLink}
                      href={mainLinks.find((l) => l.name === item)?.href || "#"}
                    >
                      <span>{item}</span>
                    </a>
                  )}

                  {item === "Solutions" && openDropdown === item && (
                    <div className={styles.mobileSubmenu}>
                      {solutionsDropdown.columns.flatMap((col) =>
                        col.items.map((sub) => {
                          const iconSrc = sub.picon
                            ? `/images/${sub.picon}.svg`
                            : `/images/icons/${sub.icon}.svg`;
                          return (
                            <a
                              key={sub.name}
                              href={sub.href}
                              className={styles.mobileSubItem}
                            >
                              <Image
                                src={iconSrc}
                                alt={sub.name}
                                width={18}
                                height={18}
                              />
                              <span style={{ marginLeft: "0.5rem" }}>
                                {sub.name}
                              </span>
                            </a>
                          );
                        })
                      )}
                    </div>
                  )}

                  {item === "Join us" && openDropdown === item && (
                    <div className={styles.mobileSubmenu}>
                      {joinUsDropdown.map((sub) => (
                        <a
                          key={sub.name}
                          href={sub.href}
                          className={styles.mobileSubItem}
                        >
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}

            <div className={styles.mobileActions}>
              <button className={`${styles.actionBtn} ${styles.contactBtn}`}>
                Contact us
              </button>
            </div>
          </div>
        </div>
      )}


    </nav>
  );
};

export default Header;
