import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-300">{label}</label>
      )}
      <input
        {...props}
        className={`w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slasherRed ${
          error ? "border border-red-500" : ""
        }`}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}