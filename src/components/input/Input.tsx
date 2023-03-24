import React from "react";
import "./index.scss";

type InputProps = {
  placeholder: string;
  name: string;
  type: string;
  isRequired: boolean;
  value: string;
  onChange: (value: string) => void;
};

/*
 * Basic component input
 */
const Input: React.FC<InputProps> = ({
  placeholder,
  name,
  type,
  isRequired,
  value,
  onChange,
}) => {
  return (
    <input
      className="input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      name={name}
      type={type}
      required={isRequired}
    />
  );
};

export default Input;
