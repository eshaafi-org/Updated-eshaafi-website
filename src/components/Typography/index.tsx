import React, { ReactNode } from "react";
import styles from "./Typography.module.scss";
interface TypoProps {
  children?: ReactNode | string;
  style?: any;
  className?: string;
}
const PageHeading: React.FC<TypoProps> = ({ children, style, className }) => {
  return <h2 style={style}>{children}</h2>;
};
const SectionHeading: React.FC<TypoProps> = ({ children, className }) => {
  return (
    <h6 className={styles.sectionHeading + " " + className}>{children}</h6>
  );
};
// heading 40 px
const Heading40: React.FC<TypoProps> = ({ children, className }) => {
  return <h2 className={styles.heading1 + " " + className}>{children}</h2>;
};
// heading 40 px
const Heading24: React.FC<TypoProps> = ({ children, className }) => {
  return <h2 className={styles.heading24 + " " + className}>{children}</h2>;
};
// texting components////////////////////////////
// text 24px
const Text28: React.FC<TypoProps> = ({ children, style, className }) => {
  return (
    <p className={styles.text28 + " " + className} style={style}>
      {children}
    </p>
  );
};
const Text24: React.FC<TypoProps> = ({ children, style, className }) => {
  return (
    <p className={styles.text24 + " " + className} style={style}>
      {children}
    </p>
  );
};
// text 22px
const Text22: React.FC<TypoProps> = ({ children, style, className }) => {
  return (
    <p className={styles.text22 + " " + className} style={style}>
      {children}
    </p>
  );
};
// text 20px
const Text20: React.FC<TypoProps> = ({ children, style, className }) => {
  return (
    <p className={styles.text20 + " " + className} style={style}>
      {children}
    </p>
  );
};
// text 18 px
const Text18: React.FC<TypoProps> = ({ children, style, className }) => {
  return (
    <p className={styles.text18 + " " + className} style={style}>
      {children}
    </p>
  );
};
// text 16 px
const Text16: React.FC<TypoProps> = ({ children, className }) => {
  return <p className={styles.text16 + " " + className}>{children}</p>;
};
// text 14 px
const Text14: React.FC<TypoProps> = ({ children, style, className }) => {
  return (
    <p className={styles.text14 + " " + className} style={style}>
      {children}
    </p>
  );
};
// text 12 px
const Text12: React.FC<TypoProps> = ({ children, className }) => {
  return <p className={styles.text12 + " " + className}>{children}</p>;
};
// text 11 px
const Text11: React.FC<TypoProps> = ({ children, className }) => {
  return <p className={styles.text11 + " " + className}>{children}</p>;
};

export {
  PageHeading,
  SectionHeading,
  Heading40,
  Text16,
  Text18,
  Text14,
  Heading24,
  Text20,
  Text22,
  Text11,
  Text28,
  Text24,
  Text12,
};
