// "use client";

// import { clsx } from "clsx";
// import { AnimatePresence, motion } from "framer-motion";
// import { BarChart3, Code, DollarSign, LayoutDashboard, Menu, Settings, X } from "lucide-react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useState } from "react";

// const menuItems = [
//   { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
//   { href: "/dashboard/apis", label: "My APIs", icon: Code },
//   { href: "/dashboard/payments", label: "Payments", icon: DollarSign },
//   { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
//   { href: "/dashboard/settings", label: "Settings", icon: Settings },
// ];

// export default function Sidebar() {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const pathname = usePathname();

//   return (
//     <>
//       <motion.aside
//         initial={false}
//         animate={{ width: isCollapsed ? "80px" : "260px" }}
//         className="fixed left-0 top-0 h-full bg-[#0A0A0A] border-r border-[#2A2A2A] z-30 transition-all duration-300 hidden md:block"
//       >
//         <div className="flex flex-col h-full">
//           <div className="p-6 border-b border-[#2A2A2A] flex items-center justify-between">
//             {!isCollapsed && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="text-xl font-bold"
//               >
//                 MonoPay
//               </motion.div>
//             )}
//             <button
//               onClick={() => setIsCollapsed(!isCollapsed)}
//               className="p-2 hover:bg-[#1A1A1A] rounded-lg transition-colors"
//             >
//               {isCollapsed ? <Menu size={20} /> : <X size={20} />}
//             </button>
//           </div>

//           <nav className="flex-1 p-4 space-y-2">
//             {menuItems.map((item) => {
//               const Icon = item.icon;
//               const isActive = pathname === item.href;

//               return (
//                 <Link key={item.href} href={item.href}>
//                   <motion.div
//                     whileHover={{ x: 4 }}
//                     className={clsx(
//                       "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
//                       isActive
//                         ? "bg-[#1A1A1A] text-white border border-[#2A2A2A]"
//                         : "text-gray-400 hover:bg-[#1A1A1A] hover:text-white"
//                     )}
//                   >
//                     <Icon size={20} />
//                     {!isCollapsed && (
//                       <motion.span
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         className="font-medium"
//                       >
//                         {item.label}
//                       </motion.span>
//                     )}
//                   </motion.div>
//                 </Link>
//               );
//             })}
//           </nav>
//         </div>
//       </motion.aside>

//       <div style={{ width: isCollapsed ? "80px" : "260px" }} className="transition-all duration-300 hidden md:block" />

//       {/* Mobile Menu Button */}
//       <button
//         onClick={() => setIsMobileOpen(!isMobileOpen)}
//         className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg"
//       >
//         <Menu size={24} />
//       </button>

//       {/* Mobile Sidebar */}
//       <AnimatePresence>
//         {isMobileOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsMobileOpen(false)}
//               className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
//             />
//             <motion.aside
//               initial={{ x: -260 }}
//               animate={{ x: 0 }}
//               exit={{ x: -260 }}
//               transition={{ duration: 0.3 }}
//               className="md:hidden fixed left-0 top-0 h-full w-[260px] bg-[#0A0A0A] border-r border-[#2A2A2A] z-50"
//             >
//               <div className="flex flex-col h-full">
//                 <div className="p-6 border-b border-[#2A2A2A] flex items-center justify-between">
//                   <div className="text-xl font-bold">MonoPay</div>
//                   <button
//                     onClick={() => setIsMobileOpen(false)}
//                     className="p-2 hover:bg-[#1A1A1A] rounded-lg transition-colors"
//                   >
//                     <X size={20} />
//                   </button>
//                 </div>
//                 <nav className="flex-1 p-4 space-y-2">
//                   {menuItems.map((item) => {
//                     const Icon = item.icon;
//                     const isActive = pathname === item.href;

//                     return (
//                       <Link
//                         key={item.href}
//                         href={item.href}
//                         onClick={() => setIsMobileOpen(false)}
//                       >
//                         <div
//                           className={clsx(
//                             "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
//                             isActive
//                               ? "bg-[#1A1A1A] text-white border border-[#2A2A2A]"
//                               : "text-gray-400 hover:bg-[#1A1A1A] hover:text-white"
//                           )}
//                         >
//                           <Icon size={20} />
//                           <span className="font-medium">{item.label}</span>
//                         </div>
//                       </Link>
//                     );
//                   })}
//                 </nav>
//               </div>
//             </motion.aside>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

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
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? "80px" : "260px" }}
        className="fixed left-0 top-0 h-full bg-[#0A0A0A] border-r border-[#2A2A2A] z-30 transition-all duration-300 hidden md:block"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="h-[60px] sm:h-[68px] p-4 sm:p-6 border-b border-[#2A2A2A] flex items-center justify-between gap-2">
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-lg sm:text-xl font-bold truncate"
                >
                  MonoPay
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 hover:bg-[#1A1A1A] rounded-lg transition-colors flex-shrink-0"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? <Menu size={18} className="sm:w-5 sm:h-5" /> : <X size={18} className="sm:w-5 sm:h-5" />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 sm:p-4 space-y-1 sm:space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className={clsx(
                      "flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-200",
                      isActive
                        ? "bg-[#1A1A1A] text-white border border-[#2A2A2A]"
                        : "text-gray-400 hover:bg-[#1A1A1A] hover:text-white"
                    )}
                  >
                    <Icon size={18} className="sm:w-5 sm:h-5 flex-shrink-0" />
                    <AnimatePresence mode="wait">
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                          className="font-medium text-sm sm:text-base truncate"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Link>
              );
            })}
          </nav>
        </div>
      </motion.aside>

      {/* Desktop Spacer */}
      <div 
        style={{ width: isCollapsed ? "80px" : "260px" }} 
        className="transition-all duration-300 hidden md:block flex-shrink-0" 
      />

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg shadow-lg hover:bg-[#2A2A2A] transition-colors"
        aria-label="Toggle mobile menu"
      >
        <Menu size={20} />
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            
            {/* Sidebar */}
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden fixed left-0 top-0 h-full w-[260px] max-w-[80vw] bg-[#0A0A0A] border-r border-[#2A2A2A] z-50 shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-4 border-b border-[#2A2A2A] flex items-center justify-between">
                  <div className="text-xl font-bold">MonoPay</div>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="p-2 hover:bg-[#1A1A1A] rounded-lg transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
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
                              : "text-gray-400 hover:bg-[#1A1A1A] hover:text-white active:scale-95"
                          )}
                        >
                          <Icon size={20} className="flex-shrink-0" />
                          <span className="font-medium">{item.label}</span>
                        </div>
                      </Link>
                    );
                  })}
                </nav>

                {/* Footer Info (Optional) */}
                <div className="p-4 border-t border-[#2A2A2A]">
                  <div className="text-xs text-gray-500 text-center">
                    MonoPay Dashboard
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
