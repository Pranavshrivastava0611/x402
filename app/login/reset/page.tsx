"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tokenFromQuery = searchParams.get("token") || "";
  const emailFromQuery = searchParams.get("email") || "";

  const [email] = useState(emailFromQuery);
  const [otp, setOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [resetToken] = useState(tokenFromQuery);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [otpAttempts, setOtpAttempts] = useState(0);

  const redirectToForgotPassword = () => {
    setMessage("Too many failed attempts. Please request a new OTP.");
    setTimeout(() => {
      router.push("/login/forgot");
    }, 2000);
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 4) {
      setMessage("Please enter a 4-digit OTP");
      return;
    }

    if (otpAttempts >= 4) { // Check before the 5th attempt
      redirectToForgotPassword();
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      // First verify the OTP
      const verifyRes = await fetch("/api/auth/confirm-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, resetToken }), // Don't send newPassword for verification
      });

      const verifyData = await verifyRes.json();

      if (!verifyRes.ok) {
        const newAttempts = otpAttempts + 1;
        setOtpAttempts(newAttempts);
        
        if (newAttempts >= 5) {
          redirectToForgotPassword();
        } else {
          setMessage(`Invalid OTP. ${5 - newAttempts} attempts remaining.`);
        }
      } else {
        setIsOtpVerified(true);
        setMessage("OTP verified successfully. Please enter your new password.");
      }
    } catch (err) {
      setMessage("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleSavePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) {
      setMessage("Please enter a new password");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/auth/confirm-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, resetToken, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Failed to update password");
      } else {
        setMessage("Password updated successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    } catch (err) {
      setMessage("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-card rounded">
        <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
        
        {!isOtpVerified ? (
          <form onSubmit={verifyOtp}>
            <div className="mb-4">
              <label className="block mb-2 text-sm">Your Email</label>
              <Input value={email} disabled type="email" className="bg-gray-100" />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm">Enter OTP</label>
              <Input 
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="XXXX"
                maxLength={4}
                className="text-center text-lg tracking-widest"
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading || otp.length !== 4} 
              className="w-full"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSavePassword}>
            <div className="mb-4">
              <label className="block mb-2 text-sm">New Password</label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading || !newPassword} 
              className="w-full"
            >
              {loading ? "Saving..." : "Save New Password"}
            </Button>
          </form>
        )}

        {message && (
          <p className={`mt-3 text-sm ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
