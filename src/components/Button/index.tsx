import React from "react";
import styles from "./Button.module.scss";

// Props Interface
interface Props {
  type?: "button" | "submit";
  className?: string;
  variant?: "outlined" | "contained" | "text";
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  style?: any;
}

export default function Button({
  type = "button",
  className,
  variant = "text",
  onClick,
  children,
  disabled,
  style,
}: Props) {
  return (
    <button
      type={type}
      className={`${
        variant === "text"
          ? styles.text
          : variant === "outlined"
          ? styles.outlined
          : styles.contained
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
}
