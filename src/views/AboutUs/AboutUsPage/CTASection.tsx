import React from "react";
import styles from "@/styles/aboutPage.module.scss";
// import { Link } from "lucide-react";
import Link from "next/link";


const CTASection = () => {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaWrapper}>
        <h2 className={styles.ctaTitle}>
          Ready to Shape the Future of Health?
        </h2>

        <div className={styles.ctaButtonGroup}>
          <Link href="/joinUs">
            <button className={styles.ctaPrimaryBtn}>View Open Careers</button>
          </Link>
          <Link href="/partnerwithus">
            <button className={styles.ctaSecondaryBtn}>
              Explore Corporate Partnerships
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
