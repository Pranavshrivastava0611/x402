"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ForgotPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    if (!email.trim()) {
      setMessage("Please enter your email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/auth/request-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.status === 404) {
        // Email not found in database
        setMessage(data.error || "No account found with this email address");
      } else if (!res.ok) {
        setMessage(data.error || "Failed to request reset");
      } else {
        setMessage("OTP has been sent to your email");
        // Redirect to reset page with email and token
        router.push(`/login/reset?token=${data.resetToken}&email=${encodeURIComponent(email)}`);
      }
    } catch (err) {
      setMessage("Network error. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleRequest} className="w-full max-w-md p-6 bg-card rounded">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Forgot password</h2>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/login')}
            className="text-sm"
          >
            Back to Login
          </Button>
        </div>
        <label className="block mb-2 text-sm">Email</label>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" />

        {/* 4-digit OTP placeholder boxes */}
        <label className="block mb-2 text-sm mt-4">OTP</label>
        <div className="flex gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-12 h-12 flex items-center justify-center border border-[#2A2A2A] rounded bg-transparent text-xl text-muted-foreground"
            >
              &times;
            </div>
          ))}
        </div>

        <div className="mt-4">
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Sending..." : "Send OTP"}
          </Button>
        </div>
        {message && (
          <p className={`mt-3 text-sm ${message.includes('sent') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
