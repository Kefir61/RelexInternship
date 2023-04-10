import React, { LegacyRef } from "react";
import "./index.scss";

type InputProps = {
  placeholder: string;
  name: string;
  type: string;
  isRequired: boolean;
  value: string;
  onChange: (value: string) => void;
  onBlur: (value: boolean) => void;
  inputRef?: LegacyRef<HTMLInputElement>;
};

/*
 * Basic component input
 */
const Input: React.FC<InputProps> = ({
  placeholder,
  inputRef,
  name,
  type,
  isRequired,
  value,
  onChange,
  onBlur,
}) => {
  return (
    <input
      className="input"
      ref={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      name={name}
      type={type}
      required={isRequired}
      onBlur={() => onBlur(true)}
    />
  );
};

export default Input;
