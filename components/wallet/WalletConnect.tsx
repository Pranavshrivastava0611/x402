// "use client";

// import { motion } from "framer-motion";
// import { Check, Copy, Wallet } from "lucide-react";
// import { useState } from "react";
// import MonoButton from "../ui/MonoButton";
// import MonoModal from "../ui/MonoModal";

// interface WalletConnectProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onConnect: (wallet: "phantom" | "solflare") => void;
//   connectedAddress?: string;
//   onDisconnect?: () => void;
// }

// export default function WalletConnect({
//   isOpen,
//   onClose,
//   onConnect,
//   connectedAddress,
//   onDisconnect,
// }: WalletConnectProps) {
//   const [copied, setCopied] = useState(false);

//   const copyAddress = () => {
//     if (connectedAddress) {
//       navigator.clipboard.writeText(connectedAddress);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };

//   const formatAddress = (address: string) => {
//     return `${address.slice(0, 4)}...${address.slice(-4)}`;
//   };

//   if (connectedAddress) {
//     return (
//       <div className="flex items-center gap-3">
//         <div className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl">
//           <Wallet size={16} />
//           <span className="text-sm font-mono">{formatAddress(connectedAddress)}</span>
//           <button
//             onClick={copyAddress}
//             className="ml-2 p-1 hover:bg-[#2A2A2A] rounded transition-colors"
//             title="Copy address"
//           >
//             {copied ? <Check size={14} /> : <Copy size={14} />}
//           </button>
//         </div>
//         {onDisconnect && (
//           <MonoButton variant="ghost" size="sm" onClick={onDisconnect}>
//             Disconnect
//           </MonoButton>
//         )}
//       </div>
//     );
//   }

//   return (
//     <MonoModal isOpen={isOpen} onClose={onClose} title="Connect Wallet" size="sm">
//       <div className="space-y-3">
//         <motion.div
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//         >
//           <MonoButton
//             variant="secondary"
//             className="w-full justify-start"
//             onClick={() => onConnect("phantom")}
//           >
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
//                 <Wallet size={20} />
//               </div>
//               <div className="text-left">
//                 <div className="font-semibold">Phantom</div>
//                 <div className="text-xs text-gray-400">Connect with Phantom wallet</div>
//               </div>
//             </div>
//           </MonoButton>
//         </motion.div>
//         <motion.div
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//         >
//           <MonoButton
//             variant="secondary"
//             className="w-full justify-start"
//             onClick={() => onConnect("solflare")}
//           >
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
//                 <Wallet size={20} />
//               </div>
//               <div className="text-left">
//                 <div className="font-semibold">Solflare</div>
//                 <div className="text-xs text-gray-400">Connect with Solflare wallet</div>
//               </div>
//             </div>
//           </MonoButton>
//         </motion.div>
//       </div>
//     </MonoModal>
//   );
// }

"use client";

import { motion } from "framer-motion";
import { Check, Copy, Wallet } from "lucide-react";
import { useState } from "react";
import MonoButton from "../ui/MonoButton";
import MonoModal from "../ui/MonoModal";

interface WalletConnectProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (wallet: "phantom" | "solflare") => void;
  connectedAddress?: string;
  onDisconnect?: () => void;
}

export default function WalletConnect({
  isOpen,
  onClose,
  onConnect,
  connectedAddress,
  onDisconnect,
}: WalletConnectProps) {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    if (connectedAddress) {
      navigator.clipboard.writeText(connectedAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (connectedAddress) {
    return (
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
        <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl min-w-0 flex-shrink">
          <Wallet size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-mono truncate">{formatAddress(connectedAddress)}</span>
          <button
            onClick={copyAddress}
            className="ml-1 sm:ml-2 p-1 hover:bg-[#2A2A2A] rounded transition-colors flex-shrink-0"
            title="Copy address"
            aria-label="Copy wallet address"
          >
            {copied ? <Check size={12} className="sm:w-[14px] sm:h-[14px] text-green-400" /> : <Copy size={12} className="sm:w-[14px] sm:h-[14px]" />}
          </button>
        </div>
        {onDisconnect && (
          <MonoButton 
            variant="ghost" 
            size="sm" 
            onClick={onDisconnect}
            className="text-xs sm:text-sm whitespace-nowrap"
          >
            <span className="hidden sm:inline">Disconnect</span>
            <span className="sm:hidden">Disconnect</span>
          </MonoButton>
        )}
      </div>
    );
  }

  return (
    <MonoModal isOpen={isOpen} onClose={onClose} title="Connect Wallet" size="sm">
      <div className="space-y-3 sm:space-y-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <MonoButton
            variant="secondary"
            className="w-full justify-start p-3 sm:p-4"
            onClick={() => onConnect("phantom")}
          >
            <div className="flex items-center gap-3 w-full min-w-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Wallet size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div className="text-left min-w-0 flex-1">
                <div className="font-semibold text-sm sm:text-base">Phantom</div>
                <div className="text-xs sm:text-sm text-gray-400 truncate">Connect with Phantom wallet</div>
              </div>
            </div>
          </MonoButton>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <MonoButton
            variant="secondary"
            className="w-full justify-start p-3 sm:p-4"
            onClick={() => onConnect("solflare")}
          >
            <div className="flex items-center gap-3 w-full min-w-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Wallet size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div className="text-left min-w-0 flex-1">
                <div className="font-semibold text-sm sm:text-base">Solflare</div>
                <div className="text-xs sm:text-sm text-gray-400 truncate">Connect with Solflare wallet</div>
              </div>
            </div>
          </MonoButton>
        </motion.div>

        <div className="pt-2 sm:pt-3 border-t border-[#2A2A2A]">
          <p className="text-xs sm:text-sm text-gray-400 text-center">
            By connecting your wallet, you agree to our{" "}
            <a href="/terms" className="text-white hover:underline">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </MonoModal>
  );
}