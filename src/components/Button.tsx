import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  full?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  full = false,
  ...props
}: ButtonProps) {
  const base =
    "px-4 py-2 rounded-lg font-semibold transition-colors focus:outline-none";
  const variants = {
    primary: "bg-slasherRed text-white hover:bg-red-700",
    secondary: "bg-gray-700 text-white hover:bg-gray-600",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      {...props} // aqui vão só props válidas do HTML
      className={`${base} ${variants[variant]} ${full ? "w-full" : ""} ${
        props.className || ""
      }`}
    >
      {children}
    </button>
  );
}
