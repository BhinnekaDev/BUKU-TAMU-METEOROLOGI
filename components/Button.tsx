import React from "react";
import { ButtonProps } from "@/interfaces/ButtonProps";

export default function Button({
  text,
  stylebutton = "",
  onClick,
  className = "",
  title,
  disabled,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${stylebutton} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      title={title}
    >
      {text}
    </button>
  );
}
