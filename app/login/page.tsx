"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Chrome, Lock, Mail, User } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const email = formData.email.trim();
    const password = formData.password.trim();

    if (!email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Please enter a valid email address";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email.trim(), password: formData.password }),
      });

      const data = await response.json();
      console.log('Login: Response status:', response.status);
      console.log('Login: Response data:', data);

      if (!response.ok) {
        setErrors({ general: data.error || "Authentication failed" });
        setIsLoading(false);
        return;
      }

      // Store session/token if provided
      const sessionFromResponse = data.session ?? (data.token ? { token: data.token, user: data.user } : null);
      if (sessionFromResponse) {
        localStorage.setItem("supabase_session", JSON.stringify(sessionFromResponse));
        const tokenToSet = data.token ?? sessionFromResponse.token;
        if (tokenToSet) document.cookie = `auth_token=${tokenToSet}; path=/`;
      }

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      console.error("Authentication error:", err);
      setErrors({ general: "An unexpected error occurred. Please try again later." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSSO = (method: string) => {
    alert(`Redirecting to ${method} authentication...`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Sign in to MonoPay</h1>
            <p className="text-muted-foreground">Welcome back! Please sign in to continue</p>
          </div>

          {/* Google Auth */}
          <Button
            variant="outline"
            className="w-full bg-red-500 mb-6 h-11 text-white hover:bg-red-600"
            onClick={() => handleSSO("Google")}
          >
            <Chrome className="mr-2 h-5 w-5" />
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-background text-muted-foreground">Or use email</span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-4 p-5">
            <div>
              <label className="text-sm font-medium mb-2 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 text-base"
                  style={{ paddingLeft: "2.75rem" }}
                />
              </div>
              {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 text-base"
                  style={{ paddingLeft: "2.75rem" }}
                />
                <Button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" variant="link">
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </div>
              {errors.password && <p className="text-sm text-destructive mt-1">{errors.password}</p>}
            </div>

            <div className="flex justify-end pt-1">
              <Link href="/login/forgot" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Forgot password?</Link>
            </div>

            {errors.general && <p className="text-sm text-destructive mt-2 text-center">{errors.general}</p>}

            <Button type="submit" className="w-full h-11 mt-6" disabled={isLoading}>
              {isLoading ? "Please wait..." : "Sign In"}
            </Button>
          </form>

          {/* Link to Signup page */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account? <Link href="/signup" className="text-foreground hover:underline font-medium">Sign up</Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
