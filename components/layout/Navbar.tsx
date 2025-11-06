"use client";

import { motion } from "framer-motion";
import { LogOut, Settings, User, Wallet } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import MonoButton from "../ui/MonoButton";
import MonoDropdown from "../ui/MonoDropdown";
import WalletConnect from "../wallet/WalletConnect";

interface NavbarProps {
  walletAddress?: string;
  network?: "mainnet" | "devnet";
  onWalletConnect?: () => void;
  onWalletDisconnect?: () => void;
}

export default function Navbar({
  walletAddress,
  network = "devnet",
  onWalletConnect,
  onWalletDisconnect,
}: NavbarProps) {
  const [showWalletModal, setShowWalletModal] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
            >
              MonoPay
            </motion.div>
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg">
              <div className={`w-2 h-2 rounded-full ${network === "mainnet" ? "bg-green-500" : "bg-yellow-500"}`} />
              <span className="text-xs font-medium">{network === "mainnet" ? "Mainnet" : "Devnet"}</span>
            </div>

            {walletAddress ? (
              <WalletConnect
                isOpen={false}
                onClose={() => {}}
                onConnect={() => {}}
                connectedAddress={walletAddress}
                onDisconnect={onWalletDisconnect}
              />
            ) : (
              <MonoButton
                variant="primary"
                size="sm"
                onClick={() => {
                  setShowWalletModal(true);
                  onWalletConnect?.();
                }}
                icon={<Wallet size={16} />}
              >
                Connect Wallet
              </MonoButton>
            )}

            <MonoDropdown
              trigger={
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white to-gray-400 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                  <User size={18} className="text-black" />
                </div>
              }
              align="right"
            >
              <div className="py-2">
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-[#2A2A2A] transition-colors"
                >
                  <Settings size={16} />
                  <span>Settings</span>
                </Link>
                <button
                  onClick={onWalletDisconnect}
                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[#2A2A2A] transition-colors text-red-400"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </MonoDropdown>
          </div>
        </div>
      </div>

      <WalletConnect
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onConnect={(wallet) => {
          console.log("Connecting to", wallet);
          setShowWalletModal(false);
          onWalletConnect?.();
        }}
      />
    </nav>
  );
}

