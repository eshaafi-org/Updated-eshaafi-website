import React from "react";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import styles from "./finalfooter.module.scss";
import Link from "next/link";
import { trackEvent } from "@/lib/ga";

export default function Finalfooter() {
  // GA4 tracking helper
  const handleLinkClick = (section: string, action: string, label: string) => {
    trackEvent('footer_link_clk', {
      section,
      action,
      label
    });
  };
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        {/* Left Section - Brand & Info */}
        <div className={styles.footer__brand}>
          <div className={styles.footer__logo}>
            <Image src="/images/eShaafilogo.svg" alt="eShaafi" width={42} height={48} />
            <span className={styles.footer__logoText}>eShaafi</span>
          </div>
          <p className={styles.footer__address}>
            7th Floor, Business Hub Broadway<br />
            Commercial, DHA Phase 8, Lahore,<br />
            54792
          </p>
          <p className={styles.footer__availability}>Availability: 24/7</p>

          <div className={styles.footer__social}>
            <a href="https://www.instagram.com/eshaaficares/" className={styles.footer__socialLink} aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="https://www.facebook.com/eshaaficare/" className={styles.footer__socialLink} aria-label="Facebook">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href=" https://www.linkedin.com/company/eshaafi/" className={styles.footer__socialLink} aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            {/* <a href="#" className={styles.footer__socialLink} aria-label="Twitter">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a> */}
            <a href="https://www.tiktok.com/@eshaaficares/" className={styles.footer__socialLink} aria-label="TikTok">
              <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M168,106a95.9,95.9,0,0,0,56,18V84a56,56,0,0,1-56-56H128V156a28,28,0,1,1-40-25.3V89.1A68,68,0,1,0,168,156Z" />
              </svg>
            </a>

            <a href=" https://www.youtube.com/@eshaaficares " className={styles.footer__socialLink} aria-label="YouTube">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>

          <p className={styles.footer__tagline}>
            Nurturing healthier, kinder &<br />
            connected lives.
          </p>
        </div>

        {/* Solution Column */}
        <div className={styles.footer__column}>
          <h3 className={styles.footer__columnTitle}>Individual Care</h3>
          <ul className={styles.footer__links}>
            <li><Link href="/find-doctors" onClick={() => handleLinkClick('footer_individual', 'navigate', 'Doctors')}>Doctors</Link></li>
            <li><Link href="mind-wellness#therapists-section" onClick={() => handleLinkClick('footer_individual', 'navigate', 'Mental Health')}>Mental Health</Link></li>
            <li><Link href="/labs" onClick={() => handleLinkClick('footer_individual', 'navigate', 'Labs')}>Labs</Link></li>
            <li><Link href="/medicines" onClick={() => handleLinkClick('footer_individual', 'navigate', 'Medicines')}>Medicines</Link></li>
            <li><Link href="/healthwebinars" onClick={() => handleLinkClick('footer_individual', 'navigate', 'Webinars')}>Health Webinars</Link></li>
            <li><Link href="/find-doctors#subscription-plans" onClick={() => handleLinkClick('footer_individual', 'navigate', 'Subscription Plans')}>Subscription Plans</Link></li>
            <li><Link href="/blog" onClick={() => handleLinkClick('footer_individual', 'navigate', 'Blogs')}>Blogs</Link></li>
          </ul>
        </div>

        {/* Coporate Care Column */}
        <div className={styles.footer__column}>
          <h3 className={styles.footer__columnTitle}>Corporate Care</h3>
          <ul className={styles.footer__links}>
            <li><Link href="/partnerwithus#services" onClick={() => handleLinkClick('footer_corporate', 'navigate', 'Our Services')}>Our Services</Link></li>
            <li><Link href="partnerwithus#wellness-section" onClick={() => handleLinkClick('footer_corporate', 'navigate', 'Wellness Sessions')}>Wellness Sessions</Link></li>
            <li><Link href="/partnerwithus#testimonials" onClick={() => handleLinkClick('footer_corporate', 'navigate', 'Testimonials')}>Testimonials</Link></li>
          </ul>
        </div>

        {/*  Impact Column */}
        <div className={styles.footer__column}>
          <h3 className={styles.footer__columnTitle}>Impact</h3>
          <ul className={styles.footer__links}>
            <li><Link href="/aboutus#our-journey" onClick={() => handleLinkClick('footer_story', 'navigate', 'Our Story')}>Our Story</Link></li>
            <li><Link href="/joinUs" onClick={() => handleLinkClick('footer_story', 'navigate', 'Careers')}>Careers</Link></li>
            <li><Link href="/media-gallery" onClick={() => handleLinkClick('footer_story', 'navigate', 'Media Gallery')}>Media Gallery</Link></li>
            <li><Link href="/thus" onClick={() => handleLinkClick('footer_story', 'navigate', 'Telehealth Unit')}>Telehealth Units</Link></li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div className={styles.footer__column}>
          <h3 className={styles.footer__columnTitle}>Contact info</h3>
          <ul className={styles.footer__contact}>
            <li>
              <Phone size={16} />
              <a href="tel:+92 311 115 1161" onClick={() => handleLinkClick('footer_contact', 'call', '+92 311 115 1161')}>+92 311 115 1161</a>
            </li>
            <li>
              <Mail size={16} />
              <a href="mailto:careers@eshaafi.com" onClick={() => handleLinkClick('footer_contact', 'email', 'careers@eshaafi.com')}>careers@eshaafi.com</a>
            </li>
          </ul>
        </div>

        {/* Legal Column */}
        <div className={styles.footer__column}>
          <h3 className={styles.footer__columnTitle}>Legal</h3>
          <ul className={styles.footer__links}>
            <li><Link href="/privacy-policy" onClick={() => handleLinkClick('footer_legal', 'navigate', 'Privacy Policy')}>Privacy Policy</Link></li>
            <li><Link href="/terms-and-conditions" onClick={() => handleLinkClick('footer_legal', 'navigate', 'Terms & Conditions')}>Term & Condition</Link></li>
          </ul>
        </div>
      </div>
      {/* PMDC Row */}
      <div className={styles.footer__pmdcRow}>
        <div className={styles.footer__pmdcItem}>
          <Image src="/images/pmdc.svg" alt="PMDC Verified Doctors" width={32} height={32} />
          <div className={styles.footer__pmdcText}>
            <span>PMDC Verified Doctors</span>

            <p>Authentic & updated information</p>
          </div>
        </div>
        <div className={styles.footer__pmdcItem}>
          <Image src="/images/support.svg" alt="Reliable Support" width={32} height={32} />
          <div className={styles.footer__pmdcText}>
            <span>Reliable Customer Support</span>
            <p>7 days a week</p>
          </div>
        </div>
        <div className={styles.footer__pmdcItem}>
          <Image src="/images/secure.svg" alt="Secure Online Payment" width={32} height={32} />
          <div className={styles.footer__pmdcText}>
            <span>Secure Online Payment</span>
            <p>Secure checkout using SSL Certificate</p>
          </div>
        </div>
      </div>

      {/* Divider line */}
      <hr className={styles.footer__divider} />

      {/* Bottom Section */}
      <div className={styles.footer__bottom}>
        <div className={styles.footer__bottomContainer}>
          <p className={styles.footer__copyright}>
            © 2026 eShaafi. All rights reserved.
          </p>
          <div className={styles.footer__apps}>
            <a 
              href="https://apps.apple.com/pk/app/eshaafi-health-telemedicine/id6739331112" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackEvent('footer_link_clk', { section: 'app', platform: 'ios' })}
            >
              <Image src="/images/appstore.png" alt="Download on the App Store" width={135} height={40} />
            </a>
            <a 
              href="https://play.google.com/store/apps/details?id=com.eshaafi.patient.consultation" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackEvent('footer_link_clk', { section: 'app', platform: 'android' })}
            >
              <Image src="/images/playstore.png" alt="Get it on Google Play" width={135} height={40} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

