"use client";

import MonoCard from "@/components/ui/MonoCard";
import { motion } from "framer-motion";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const apiUsageData = [
  { api: "Data API", calls: 4520, revenue: 226 },
  { api: "User API", calls: 3200, revenue: 320 },
  { api: "Analytics API", calls: 1800, revenue: 36 },
];

const pieData = [
  { name: "Data API", value: 4520 },
  { name: "User API", value: 3200 },
  { name: "Analytics API", value: 1800 },
];

const COLORS = ["#ffffff", "#888888", "#444444"];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-gray-400">Detailed insights into your API performance</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <MonoCard>
            <h2 className="text-xl font-semibold mb-6">API Usage by Endpoint</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={apiUsageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                <XAxis dataKey="api" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1A1A1A",
                    border: "1px solid #2A2A2A",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="calls" fill="#ffffff" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </MonoCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <MonoCard>
            <h2 className="text-xl font-semibold mb-6">API Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1A1A1A",
                    border: "1px solid #2A2A2A",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </MonoCard>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <MonoCard>
          <h2 className="text-xl font-semibold mb-6">Revenue by API</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={apiUsageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
              <XAxis dataKey="api" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1A1A1A",
                  border: "1px solid #2A2A2A",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="revenue" fill="#4ade80" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </MonoCard>
      </motion.div>
    </div>
  );
}

