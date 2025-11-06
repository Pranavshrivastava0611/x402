"use client";

import MonoCard from "@/components/ui/MonoCard";
import MonoSelect from "@/components/ui/MonoSelect";
import { motion } from "framer-motion";
import { CheckCircle, Clock, ExternalLink, XCircle } from "lucide-react";
import { useState } from "react";

const mockPayments = [
  {
    id: 1,
    payer: "3k8X...1sf9",
    tx: "5j8K9mP2nQ1sf9vR7tY5wE6uH4jK8L",
    amount: 0.05,
    timestamp: "2024-01-15 14:30:00",
    status: "successful",
  },
  {
    id: 2,
    payer: "7nQ1...vR7t",
    tx: "9mP2nQ1sf9vR7tY5wE6uH4jK8L3k8X",
    amount: 0.1,
    timestamp: "2024-01-14 10:15:00",
    status: "successful",
  },
  {
    id: 3,
    payer: "2nQ1...sf9v",
    tx: "8K9mP2nQ1sf9vR7tY5wE6uH4jK8L",
    amount: 0.05,
    timestamp: "2024-01-14 09:00:00",
    status: "failed",
  },
  {
    id: 4,
    payer: "5wE6...uH4j",
    tx: "2nQ1sf9vR7tY5wE6uH4jK8L3k8X",
    amount: 0.02,
    timestamp: "2024-01-13 16:45:00",
    status: "pending",
  },
];

export default function PaymentsPage() {
  const [filter, setFilter] = useState("all");

  const filteredPayments =
    filter === "all"
      ? mockPayments
      : mockPayments.filter((p) => p.status === filter);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "successful":
        return <CheckCircle size={16} className="text-green-400" />;
      case "failed":
        return <XCircle size={16} className="text-red-400" />;
      case "pending":
        return <Clock size={16} className="text-yellow-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "successful":
        return "bg-green-500/20 text-green-400";
      case "failed":
        return "bg-red-500/20 text-red-400";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400";
      default:
        return "";
    }
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
          <h1 className="text-3xl font-bold mb-2">Payments</h1>
          <p className="text-gray-400">View and manage all your payment transactions</p>
        </div>
        <MonoSelect
          options={[
            { value: "all", label: "All Payments" },
            { value: "successful", label: "Successful" },
            { value: "failed", label: "Failed" },
            { value: "pending", label: "Pending" },
          ]}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-48"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <MonoCard>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2A2A2A]">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Payer Wallet</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Tx Signature</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Timestamp</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment, index) => (
                  <motion.tr
                    key={payment.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    className="border-b border-[#2A2A2A] hover:bg-[#1A1A1A] transition-colors"
                  >
                    <td className="py-3 px-4 text-sm font-mono">{payment.payer}</td>
                    <td className="py-3 px-4 text-sm">
                      <a
                        href={`https://solscan.io/tx/${payment.tx}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline font-mono flex items-center gap-1"
                      >
                        {payment.tx.slice(0, 8)}...{payment.tx.slice(-8)}
                        <ExternalLink size={14} />
                      </a>
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold">{payment.amount} SOL</td>
                    <td className="py-3 px-4 text-sm text-gray-400">{payment.timestamp}</td>
                    <td className="py-3 px-4 text-sm">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(payment.status)}
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </MonoCard>
      </motion.div>
    </div>
  );
}

