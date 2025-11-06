"use client";

import MonoButton from "@/components/ui/MonoButton";
import MonoCard from "@/components/ui/MonoCard";
import MonoDropdown from "@/components/ui/MonoDropdown";
import MonoInput from "@/components/ui/MonoInput";
import MonoModal from "@/components/ui/MonoModal";
import { motion } from "framer-motion";
import { Code, DollarSign, Edit, MoreVertical, Plus, Shield, Trash2 } from "lucide-react";
import { useState } from "react";

const mockApis = [
  {
    id: 1,
    name: "Data API",
    price: 0.05,
    routes: ["/api/data", "/api/data/:id"],
    status: "active",
    wallet: "3k8X...1sf9",
  },
  {
    id: 2,
    name: "User API",
    price: 0.1,
    routes: ["/api/users", "/api/users/:id"],
    status: "active",
    wallet: "3k8X...1sf9",
  },
  {
    id: 3,
    name: "Analytics API",
    price: 0.02,
    routes: ["/api/analytics"],
    status: "disabled",
    wallet: "3k8X...1sf9",
  },
];

export default function APIsPage() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    routes: "",
    wallet: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating API:", formData);
    setShowModal(false);
    setFormData({ name: "", price: "", routes: "", wallet: "" });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">My APIs</h1>
          <p className="text-gray-400">Manage and monitor your registered APIs</p>
        </div>
        <MonoButton onClick={() => setShowModal(true)} icon={<Plus size={20} />}>
          Register New API
        </MonoButton>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockApis.map((api, index) => (
          <motion.div
            key={api.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <MonoCard>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{api.name}</h3>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        api.status === "active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {api.status}
                    </span>
                  </div>
                </div>
                <MonoDropdown
                  trigger={
                    <button className="p-2 hover:bg-[#2A2A2A] rounded-lg transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  }
                  align="right"
                >
                  <div className="py-2">
                    <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[#2A2A2A] transition-colors">
                      <Edit size={16} />
                      <span>Edit</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[#2A2A2A] transition-colors text-red-400">
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </button>
                  </div>
                </MonoDropdown>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign size={16} className="text-gray-400" />
                  <span className="text-gray-400">Price per call:</span>
                  <span className="font-semibold">{api.price} SOL</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <Shield size={16} className="text-gray-400 mt-0.5" />
                  <div>
                    <span className="text-gray-400">Routes protected:</span>
                    <div className="mt-1 space-y-1">
                      {api.routes.map((route, i) => (
                        <div key={i} className="font-mono text-xs bg-[#1A1A1A] px-2 py-1 rounded">
                          {route}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Code size={16} className="text-gray-400" />
                  <span className="text-gray-400">Wallet:</span>
                  <span className="font-mono text-xs">{api.wallet}</span>
                </div>
              </div>
            </MonoCard>
          </motion.div>
        ))}
      </div>

      <MonoModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Register New API"
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <MonoInput
            label="API Name"
            placeholder="e.g., Data API"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <MonoInput
            label="Price per Call (SOL)"
            type="number"
            step="0.01"
            placeholder="0.05"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
          <MonoInput
            label="Allowed Routes (comma-separated)"
            placeholder="/api/data, /api/data/:id"
            value={formData.routes}
            onChange={(e) => setFormData({ ...formData, routes: e.target.value })}
            required
          />
          <MonoInput
            label="Wallet Address"
            placeholder="Your Solana wallet address"
            value={formData.wallet}
            onChange={(e) => setFormData({ ...formData, wallet: e.target.value })}
            required
          />
          <div className="flex gap-3 pt-4">
            <MonoButton type="submit" className="flex-1">
              Register API
            </MonoButton>
            <MonoButton
              type="button"
              variant="secondary"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </MonoButton>
          </div>
        </form>
      </MonoModal>
    </div>
  );
}

