"use client";

import { clsx } from "clsx";
import { SelectHTMLAttributes, forwardRef } from "react";

interface MonoSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

const MonoSelect = forwardRef<HTMLSelectElement, MonoSelectProps>(
  ({ label, error, className, options, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium mb-2 text-gray-300">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={clsx(
            "w-full px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl text-white",
            "focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all duration-200",
            error && "border-red-500 focus:ring-red-500/20",
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-[#1A1A1A]">
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

MonoSelect.displayName = "MonoSelect";

export default MonoSelect;

