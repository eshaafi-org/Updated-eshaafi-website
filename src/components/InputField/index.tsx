import React from "react";
import style from "./Input.module.scss";
interface inputProps {
  className?: string;
  placeHolder?: string;
  type?: string;
  name?: string;
  onChange?: any;
  maxLength?: number;
  value?: any;
  required?: boolean;
  onBlur?: any;
  onFocus?: any;
  min?: any;
  max?: any;
  readOnly?: boolean;
  disabled?: boolean;
}
export const InputField: React.FC<inputProps> = ({
  className,
  placeHolder,
  type = "text",
  name,
  onChange,
  maxLength,
  value,
  required,
  onBlur,
  onFocus,
  min,
  max,
  disabled = false,
  readOnly = false,
}) => {
  return (
    <input
      type={type}
      className={style.inputField + " " + className}
      placeholder={placeHolder}
      name={name}
      onChange={onChange}
      maxLength={maxLength}
      value={value}
      required={required}
      onBlur={onBlur}
      onFocus={onFocus}
      min={type === "date" && min}
      max={type === "date" && max}
      readOnly={readOnly}
      disabled={disabled}
    />
  );
};
