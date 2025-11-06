"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

interface MonoDropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: "left" | "right";
}

export default function MonoDropdown({
  trigger,
  children,
  align = "left",
}: MonoDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className={`absolute top-full mt-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl shadow-2xl shadow-black/60 min-w-[200px] z-50 ${
              align === "right" ? "right-0" : "left-0"
            }`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

