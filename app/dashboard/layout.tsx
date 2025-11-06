"use client";

import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [walletAddress, setWalletAddress] = useState<string | undefined>(
    "3k8X9mP2nQ1sf9vR7tY5wE6uH4jK8L"
  );
  const [network, setNetwork] = useState<"mainnet" | "devnet">("devnet");

  return (
    <div className="min-h-screen bg-black">
      <Sidebar />
      <div className="ml-0 md:ml-[260px] transition-all duration-300">
        <Navbar
          walletAddress={walletAddress}
          network={network}
          onWalletConnect={() => {
            setWalletAddress("3k8X9mP2nQ1sf9vR7tY5wE6uH4jK8L");
          }}
          onWalletDisconnect={() => {
            setWalletAddress(undefined);
          }}
        />
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

