"use client";

import { Eye, EyeOff, Chrome, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Signup response:', response.status, data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to create account");
      }

      if (response.status === 201) {
        // Full reload to ensure login page mounts cleanly
        window.location.assign('/login');
        return;
      }

      throw new Error("Unexpected response from server");
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
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
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Create your account</h1>
            <p className="text-muted-foreground">Welcome! Please fill in the details to get started.</p>
          </div>

          <Button
            variant="outline"
            className="w-full bg-red-500 mb-6 h-11 text-white hover:bg-red-600"
            onClick={() => alert('Redirecting to Google auth...')}
          >
            <Chrome className="mr-2 h-5 w-5" />
            Continue with Google
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-background text-muted-foreground">Or use email</span>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 p-5">
            <div>
              <label className="text-sm font-medium mb-2 block">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="pl-10 text-base"
                  style={{ paddingLeft: "2.75rem" }}
                />
              </div>
            </div>

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
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="pl-10 text-base"
                  style={{ paddingLeft: "2.75rem" }}
                />
                <Button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" variant="link">
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input
                id="acceptTerms"
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                className="w-4 h-4 mt-1 rounded border-border bg-background"
              />
              <label htmlFor="acceptTerms" className="text-sm text-muted-foreground">
                I agree to the{' '}
                <Link href="/terms" className="text-foreground hover:underline font-medium">Terms of Service</Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-foreground hover:underline font-medium">Privacy Policy</Link>
              </label>
            </div>

            <Button type="submit" className="w-full h-11 mt-6" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">Already have an account?{' '}
              <Link href="/login" className="text-foreground hover:underline font-medium">Sign in</Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}