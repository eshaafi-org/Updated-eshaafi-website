'use client';
import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.scss';
import Image from "next/image";
import Link from 'next/link';


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
    dropdown: [
      { name: "General Practitioners", href: "/find-doctors?specialty=General%20Physician", icon: "/images/suppor.png" },
      { name: "Specialists", href: "/find-doctors?specialty=Specialist", icon: "/images/suppor.png" },
      { name: "Psychiatrists", href: "/find-doctors?specialty=Psychiatrist", icon: "/images/suppor.png" },
      { name: "Care Plans", href: "/find-doctors#subscription-plans", icon: "/images/suppor.png" },
    ],
  },

  {
    title: "Mental Health",
    dropdown: [
      { name: "Counselors", href: "/find-doctors?specialty=Counselor", icon: "/images/suppor.png" },
      { name: "Psychologists", href: "/find-doctors?specialty=Psychologist", icon: "/images/suppor.png" },
      { name: "Psychiatrists", href: "/find-doctors?specialty=Psychiatrist", icon: "/images/suppor.png" },
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
    title: "Care Plans",
    dropdown: [
      { name: "Essential Care Plan", href: "/find-doctors#subscription-plans", icon: "/images/suppor.png" },
      { name: "Family Care Plan", href: "/find-doctors#subscription-plans", icon: "/images/suppor.png" },
      { name: "Total Health Protection", href: "/find-doctors#subscription-plans", icon: "/images/suppor.png" },
    ],
  },

  {
    title: "Wellness Sessions",
    dropdown: [
      { name: "Mind Wellness", href: "/mind-wellness", icon: "/images/suppor.png" },
      { name: "Nutritional Wellness", href: "/partnerwithus#wellness-section", icon: "/images/suppor.png" },
      { name: "Physical Wellness", href: "/partnerwithus#wellness-section", icon: "/images/suppor.png" },
      { name: "Preventive Care", href: "/partnerwithus#wellness-section", icon: "/images/suppor.png" },
    ],
  },

  {
    title: "Corporate Care",
    dropdown: [
      { name: "Schedule a Meeting", href: "/partnerwithus#schedule", icon: "/images/suppor.png" },
      { name: "Our Services", href: "/partnerwithus#services", icon: "/images/suppor.png" },
      { name: "Wellness Sessions", href: "partnerwithus#wellness-section", icon: "/images/suppor.png" },
      { name: "Testimonials", href: "/partnerwithus#testimonials", icon: "/images/suppor.png" },
    ],
  },

  {
    title: "THUs",
    dropdown: [
      { name: "What are THUs", href: "/thus#what-are-thus", icon: "/images/suppor.png" },
      { name: "Journey", href: "/thus#journey", icon: "/images/suppor.png" },
      { name: "Join the Mission", href: "/thus#join", icon: "/images/suppor.png" },
    ],
  },

  {
    title: "Blogs",
    dropdown: [
      { name: "Mind Wellness", href: "/mind-wellness", icon: "/images/suppor.png" },
      { name: "Preventive Care", href: "/blog", icon: "/images/suppor.png" },
      { name: "Everyday Health", href: "/blog", icon: "/images/suppor.png" },
      { name: "About Telehealth", href: "/blog", icon: "/images/suppor.png" },
    ],
  },

  {
    title: "Impact",
    dropdown: [
      { name: "Our Story", href: "/aboutus", icon: "/images/suppor.png" },
      { name: "Careers", href: "/joinUs", icon: "/images/suppor.png" },
      { name: "Media Gallery", href: "/media-gallery", icon: "/images/suppor.png" },
    ],
  },
];


const allPages = navbarItems.flatMap(item => {
  const mainPage = item.href
    ? [{ name: item.title, href: item.href }]
    : [];

  const dropdownPages = item.dropdown
    ? item.dropdown.map(sub => ({ name: sub.name, href: sub.href }))
    : [];

  return [...mainPage, ...dropdownPages];
});


const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
    } else {
      const filtered = allPages.filter(page => page.name.toLowerCase().includes(query));
      setSearchResults(filtered);
    }
  };

  const handleSearchResultClick = (href: string) => {
    setSearchQuery("");
    setSearchResults([]);
    setSearchOpen(false);
    window.location.href = href;
  };

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
                      <a key={i} href={sub.href} className={styles.dropdownItem}>
                        {sub.icon && <Image src={sub.icon} alt={sub.name} width={20} height={20} />}
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
                <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
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
              <a href="#login" className={styles.loginLink}>Login</a>
              <span className={styles.divider}>/</span>
              <a href="#signup" className={styles.signupLink}>Signup</a>
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
                      <a key={i} href={sub.href}>
                        {sub.icon && <Image src={sub.icon} alt={sub.name} width={20} height={20} />}
                        {sub.name}
                      </a>
                    ))}
                  </div>
                </details>
              ) : (
                <a href={item.href}>{item.title}</a>
              )}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;