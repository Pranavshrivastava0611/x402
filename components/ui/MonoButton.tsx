"use client";

import { clsx } from "clsx";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MonoButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function MonoButton({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className,
  icon,
  disabled = false,
  type = "button",
}: MonoButtonProps) {
  const baseStyles = "font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-white text-black hover:bg-gray-200 active:scale-[0.98] shadow-lg shadow-black/40 hover:shadow-xl hover:shadow-black/50",
    secondary: "bg-[#1A1A1A] text-white border border-[#2A2A2A] hover:bg-[#2A2A2A] active:scale-[0.98]",
    ghost: "bg-transparent text-white hover:bg-[#1A1A1A] active:scale-[0.98]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(baseStyles, variants[variant], sizes[size], className, disabled && "opacity-50 cursor-not-allowed")}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  );
}

