"use client";

import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, Code, DollarSign, LayoutDashboard, Menu, Settings, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menuItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/apis", label: "My APIs", icon: Code },
  { href: "/dashboard/payments", label: "Payments", icon: DollarSign },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? "80px" : "260px" }}
        className="fixed left-0 top-0 h-full bg-[#0A0A0A] border-r border-[#2A2A2A] z-30 transition-all duration-300 hidden md:block"
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-[#2A2A2A] flex items-center justify-between">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-bold"
              >
                MonoPay
              </motion.div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 hover:bg-[#1A1A1A] rounded-lg transition-colors"
            >
              {isCollapsed ? <Menu size={20} /> : <X size={20} />}
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className={clsx(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                      isActive
                        ? "bg-[#1A1A1A] text-white border border-[#2A2A2A]"
                        : "text-gray-400 hover:bg-[#1A1A1A] hover:text-white"
                    )}
                  >
                    <Icon size={20} />
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="font-medium"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>
        </div>
      </motion.aside>

      <div style={{ width: isCollapsed ? "80px" : "260px" }} className="transition-all duration-300 hidden md:block" />

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed left-0 top-0 h-full w-[260px] bg-[#0A0A0A] border-r border-[#2A2A2A] z-50"
            >
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-[#2A2A2A] flex items-center justify-between">
                  <div className="text-xl font-bold">MonoPay</div>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="p-2 hover:bg-[#1A1A1A] rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileOpen(false)}
                      >
                        <div
                          className={clsx(
                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                            isActive
                              ? "bg-[#1A1A1A] text-white border border-[#2A2A2A]"
                              : "text-gray-400 hover:bg-[#1A1A1A] hover:text-white"
                          )}
                        >
                          <Icon size={20} />
                          <span className="font-medium">{item.label}</span>
                        </div>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

