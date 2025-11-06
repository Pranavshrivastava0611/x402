"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { ReactNode, useEffect } from "react";

interface MonoModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function MonoModal({
  isOpen,
  onClose,
  children,
  title,
  size = "md",
}: MonoModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className={`bg-[#1A1A1A] rounded-2xl shadow-2xl shadow-black/60 ${sizes[size]} w-full max-h-[90vh] overflow-y-auto`}
              onClick={(e) => e.stopPropagation()}
            >
              {title && (
                <div className="flex items-center justify-between p-6 border-b border-[#2A2A2A]">
                  <h2 className="text-xl font-semibold">{title}</h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-[#2A2A2A] rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
              <div className="p-6">{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

