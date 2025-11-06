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
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl">
          <Wallet size={16} />
          <span className="text-sm font-mono">{formatAddress(connectedAddress)}</span>
          <button
            onClick={copyAddress}
            className="ml-2 p-1 hover:bg-[#2A2A2A] rounded transition-colors"
            title="Copy address"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
        {onDisconnect && (
          <MonoButton variant="ghost" size="sm" onClick={onDisconnect}>
            Disconnect
          </MonoButton>
        )}
      </div>
    );
  }

  return (
    <MonoModal isOpen={isOpen} onClose={onClose} title="Connect Wallet" size="sm">
      <div className="space-y-3">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <MonoButton
            variant="secondary"
            className="w-full justify-start"
            onClick={() => onConnect("phantom")}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Wallet size={20} />
              </div>
              <div className="text-left">
                <div className="font-semibold">Phantom</div>
                <div className="text-xs text-gray-400">Connect with Phantom wallet</div>
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
            className="w-full justify-start"
            onClick={() => onConnect("solflare")}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Wallet size={20} />
              </div>
              <div className="text-left">
                <div className="font-semibold">Solflare</div>
                <div className="text-xs text-gray-400">Connect with Solflare wallet</div>
              </div>
            </div>
          </MonoButton>
        </motion.div>
      </div>
    </MonoModal>
  );
}

