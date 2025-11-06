"use client";

import { clsx } from "clsx";
import { forwardRef, InputHTMLAttributes, ReactNode } from "react";

interface MonoInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

const MonoInput = forwardRef<HTMLInputElement, MonoInputProps>(
  ({ label, error, className, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium mb-2 text-gray-300">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={clsx(
              "w-full px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl text-white placeholder-gray-500",
              "focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all duration-200",
              error && "border-red-500 focus:ring-red-500/20",
              icon && "pl-12",
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

MonoInput.displayName = "MonoInput";

export default MonoInput;

