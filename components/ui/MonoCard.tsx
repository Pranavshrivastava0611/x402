"use client";

import { clsx } from "clsx";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MonoCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function MonoCard({
  children,
  className,
  hover = true,
  onClick,
  
}: MonoCardProps) {
  return (
    <motion.div
      onClick={onClick}
      className={clsx(
        "bg-[#111111] rounded-2xl p-6 shadow-lg shadow-black/40",
        hover && "hover:scale-[1.01] transition-all duration-300 cursor-pointer",
        className
      )}
      whileHover={hover ? { y: -2, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)" } : {}}
    >
      {children}
    </motion.div>
  );
}

