"use client";

import MonoButton from "@/components/ui/MonoButton";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, BookOpen, CheckCircle, Github, Lock, Shield, TrendingUp, Twitter, Wallet, Zap } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              initial={{
                x: Math.random() * 1000,
                y: Math.random() * 1000,
              }}
              animate={{
                y: [null, Math.random() * 1000],
                x: [null, Math.random() * 1000],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent px-4">
              Monetize Your APIs
              <br />
              Seamlessly on Solana
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto px-4">
              Protect routes, manage payments, and earn directly in crypto. The easiest way to monetize your API infrastructure on the Solana blockchain.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap px-4">
              <Link href="/login">
                <MonoButton size="lg" icon={<ArrowRight size={20} />}>
                  Get Started
                </MonoButton>
              </Link>
              <Link href="/docs">
                <MonoButton variant="secondary" size="lg" icon={<BookOpen size={20} />}>
                  Documentation
                </MonoButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400 text-base sm:text-lg">Get started in three simple steps</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Register",
                description: "Create your account and connect your Solana wallet to start receiving payments",
                icon: CheckCircle,
              },
              {
                step: "02",
                title: "Integrate SDK",
                description: "Add our lightweight SDK to your API endpoints in minutes with just a few lines of code",
                icon: Shield,
              },
              {
                step: "03",
                title: "Get Paid",
                description: "Start receiving payments directly in SOL with instant settlement and zero fees",
                icon: Wallet,
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-[#111111] rounded-2xl p-8 border border-[#2A2A2A] hover:border-[#3A3A3A] transition-all"
                >
                  <div className="text-6xl font-bold text-gray-800 mb-4">{item.step}</div>
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Features</h2>
            <p className="text-gray-400 text-base sm:text-lg">Everything you need to monetize your APIs</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "API Protection",
                description: "Secure your endpoints with wallet-based authentication and intelligent rate limiting",
                icon: Lock,
              },
              {
                title: "Wallet Payments",
                description: "Accept payments directly in SOL with instant settlement and transparent transactions",
                icon: Wallet,
              },
              {
                title: "Real-time Dashboard",
                description: "Monitor your API usage, revenue, and transactions in real-time with beautiful analytics",
                icon: BarChart3,
              },
              {
                title: "Lightning Fast",
                description: "Built for performance with sub-millisecond latency and 99.9% uptime guarantee",
                icon: Zap,
              },
              {
                title: "Easy Integration",
                description: "Get started in minutes with our simple SDK and comprehensive documentation",
                icon: CheckCircle,
              },
              {
                title: "Scalable Revenue",
                description: "Grow your revenue as your API usage scales with automatic payment processing",
                icon: TrendingUp,
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -8 }}
                  className="bg-[#111111] rounded-2xl p-8 shadow-lg shadow-black/40 hover:shadow-xl hover:shadow-black/50 transition-all"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-white/10 to-white/5 rounded-xl flex items-center justify-center mb-6">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-gray-400 text-lg mb-8">
              Join thousands of developers monetizing their APIs on Solana
            </p>
            <Link href="/login">
              <MonoButton size="lg" icon={<ArrowRight size={20} />}>
                Create Your Account
              </MonoButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] border-t border-[#2A2A2A] py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">MonoPay</h3>
              <p className="text-gray-400 text-sm">
                Monetize your APIs seamlessly on Solana
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/docs" className="hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <Github size={16} />
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <Twitter size={16} />
                    Twitter
                  </a>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#2A2A2A] pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} MonoPay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
