"use client";

import MonoButton from "@/components/ui/MonoButton";
import MonoCard from "@/components/ui/MonoCard";
import MonoInput from "@/components/ui/MonoInput";
import MonoSelect from "@/components/ui/MonoSelect";
import WalletConnect from "@/components/wallet/WalletConnect";
import { motion } from "framer-motion";
import { LogOut, Save, Trash2, Wallet } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [walletConnected, setWalletConnected] = useState(true);
  const [walletAddress] = useState("3k8X9mP2nQ1sf9vR7tY5wE6uH4jK8L");
  const [network, setNetwork] = useState<"mainnet" | "devnet">("devnet");
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
  });

  const handleSave = () => {
    console.log("Saving profile:", profile);
    // In production, this would save to backend
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      console.log("Deleting account...");
      // In production, this would delete the account
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account settings and preferences</p>
      </motion.div>

      {/* Wallet Connection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <MonoCard>
          <h2 className="text-xl font-semibold mb-4">Wallet Connection</h2>
          <div className="space-y-4">
            {walletConnected ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                    <Wallet size={20} />
                  </div>
                  <div>
                    <p className="font-medium">Connected Wallet</p>
                    <p className="text-sm text-gray-400 font-mono">{walletAddress}</p>
                  </div>
                </div>
                <MonoButton
                  variant="secondary"
                  onClick={() => setWalletConnected(false)}
                  icon={<LogOut size={16} />}
                >
                  Disconnect
                </MonoButton>
              </div>
            ) : (
              <div>
                <p className="text-gray-400 mb-4">Connect your Solana wallet to receive payments</p>
                <MonoButton
                  onClick={() => setShowWalletModal(true)}
                  icon={<Wallet size={16} />}
                >
                  Connect Wallet
                </MonoButton>
              </div>
            )}
            {walletConnected && (
              <div className="pt-4 border-t border-[#2A2A2A]">
                <p className="text-sm text-gray-400 mb-2">Wallet Balance</p>
                <p className="text-2xl font-bold">125.4 SOL</p>
              </div>
            )}
          </div>
        </MonoCard>
      </motion.div>

      {/* Network Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <MonoCard>
          <h2 className="text-xl font-semibold mb-4">Network Settings</h2>
          <div className="space-y-4">
            <MonoSelect
              label="Network"
              options={[
                { value: "devnet", label: "Devnet" },
                { value: "mainnet", label: "Mainnet" },
              ]}
              value={network}
              onChange={(e) => setNetwork(e.target.value as "mainnet" | "devnet")}
            />
            <p className="text-sm text-gray-400">
              Switch between Solana Devnet (for testing) and Mainnet (for production)
            </p>
          </div>
        </MonoCard>
      </motion.div>

      {/* Profile Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <MonoCard>
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          <div className="space-y-4">
            <MonoInput
              label="Name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
            <MonoInput
              label="Email"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
            <MonoButton onClick={handleSave} icon={<Save size={16} />}>
              Save Changes
            </MonoButton>
          </div>
        </MonoCard>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <MonoCard className="border-red-500/50">
          <h2 className="text-xl font-semibold mb-4 text-red-400">Danger Zone</h2>
          <p className="text-gray-400 mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <MonoButton
            variant="secondary"
            onClick={handleDeleteAccount}
            icon={<Trash2 size={16} />}
            className="border-red-500/50 text-red-400 hover:bg-red-500/10"
          >
            Delete Account
          </MonoButton>
        </MonoCard>
      </motion.div>

      <WalletConnect
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onConnect={(wallet) => {
          console.log("Connecting to", wallet);
          setWalletConnected(true);
          setShowWalletModal(false);
        }}
      />
    </div>
  );
}

