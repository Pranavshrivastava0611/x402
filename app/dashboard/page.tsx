"use client";

import MonoCard from "@/components/ui/MonoCard";
import { motion } from "framer-motion";
import { Activity, Code, DollarSign, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const revenueData = [
  { date: "Jan", revenue: 12.5 },
  { date: "Feb", revenue: 18.2 },
  { date: "Mar", revenue: 15.8 },
  { date: "Apr", revenue: 22.4 },
  { date: "May", revenue: 28.6 },
  { date: "Jun", revenue: 35.2 },
];

const recentTransactions = [
  {
    date: "2024-01-15",
    wallet: "3k8X...1sf9",
    route: "/api/data",
    amount: 0.05,
    tx: "5j8K...9mP2",
  },
  {
    date: "2024-01-14",
    wallet: "7nQ1...vR7t",
    route: "/api/users",
    amount: 0.1,
    tx: "9mP2...5wE6",
  },
  {
    date: "2024-01-14",
    wallet: "2nQ1...sf9v",
    route: "/api/data",
    amount: 0.05,
    tx: "8K9m...P2nQ",
  },
];

export default function DashboardPage() {
  const stats = [
    {
      label: "Total Revenue",
      value: "125.4 SOL",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-400",
    },
    {
      label: "Total Calls",
      value: "12,458",
      change: "+8.2%",
      icon: Activity,
      color: "text-blue-400",
    },
    {
      label: "Active APIs",
      value: "8",
      change: "+2",
      icon: Code,
      color: "text-purple-400",
    },
    {
      label: "Avg. per Call",
      value: "0.01 SOL",
      change: "+5.1%",
      icon: TrendingUp,
      color: "text-yellow-400",
    },
  ];

  const router = useRouter();

  useEffect(() => {
  const session = localStorage.getItem("supabase_session");
  if (!session) {
    router.replace(`/login?redirect=${encodeURIComponent("/dashboard")}`);
  }
}, [router]);


  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold mb-2">Overview</h1>
        <p className="text-gray-400">Welcome back! Here's what's happening with your APIs.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <MonoCard>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold mb-2">{stat.value}</p>
                    <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-[#1A1A1A] ${stat.color}`}>
                    <Icon size={24} />
                  </div>
                </div>
              </MonoCard>
            </motion.div>
          );
        })}
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <MonoCard>
          <h2 className="text-xl font-semibold mb-6">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1A1A1A",
                  border: "1px solid #2A2A2A",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#ffffff"
                strokeWidth={2}
                dot={{ fill: "#ffffff", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </MonoCard>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <MonoCard>
          <h2 className="text-xl font-semibold mb-6">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2A2A2A]">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Wallet</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Route</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Tx Signature</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((tx, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="border-b border-[#2A2A2A] hover:bg-[#1A1A1A] transition-colors"
                  >
                    <td className="py-3 px-4 text-sm">{tx.date}</td>
                    <td className="py-3 px-4 text-sm font-mono">{tx.wallet}</td>
                    <td className="py-3 px-4 text-sm">{tx.route}</td>
                    <td className="py-3 px-4 text-sm font-semibold">{tx.amount} SOL</td>
                    <td className="py-3 px-4 text-sm">
                      <a
                        href={`https://solscan.io/tx/${tx.tx}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline font-mono"
                      >
                        {tx.tx}
                      </a>
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

