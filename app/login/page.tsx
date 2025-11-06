"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Chrome, Lock, Mail, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!isLogin) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"

      if (!formData.email.trim()) newErrors.email = "Email is required"
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = "Please enter a valid email address"

      if (!formData.password) newErrors.password = "Password is required"
      else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters"

      if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password"
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"

      if (!formData.acceptTerms) newErrors.acceptTerms = "You must accept the terms and conditions"
    } else {
      if (!formData.email.trim()) newErrors.email = "Email is required"
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = "Please enter a valid email address"

      if (!formData.password) newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      const endpoint = isLogin ? "/api/login" : "/api/signup"
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : {
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            acceptTerms: formData.acceptTerms,
          }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        // Set error message
        if (data.error) {
          if (isLogin) {
            setErrors({ email: data.error, password: data.error })
          } else {
            // Set appropriate field error
            if (data.error.includes("email")) {
              setErrors({ email: data.error })
            } else if (data.error.includes("password")) {
              setErrors({ password: data.error, confirmPassword: data.error })
            } else if (data.error.includes("terms")) {
              setErrors({ acceptTerms: data.error })
            } else {
              setErrors({ email: data.error })
            }
          }
        }
        setIsLoading(false)
        return
      }

      // Success - redirect to dashboard
      if (data.user) {
        // Store session if needed
        if (data.session) {
          // You can store the session in localStorage or cookies here
          localStorage.setItem("supabase_session", JSON.stringify(data.session))
        }
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Authentication error:", error)
      setErrors({
        email: "An error occurred. Please try again later.",
      })
      setIsLoading(false)
    }
  }

  const handleSSO = (method: string) => {
    console.log(`Logging in with ${method}`)
    alert(`Redirecting to ${method} authentication...`)
  }

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
            <h1 className="text-3xl font-bold mb-2">{isLogin ? "Welcome back" : "Create account"}</h1>
            <p className="text-muted-foreground">
              {isLogin ? "Sign in to your account to continue" : "Get started in seconds"}
            </p>
          </div>

          <Button variant="outline" className="w-full bg-red-500 mb-6 h-11 " onClick={() => handleSSO("google")}>
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
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-sm font-medium mb-2 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="pl-10"
                  />
                </div>
                {errors.fullName && <p className="text-sm text-destructive mt-1">{errors.fullName}</p>}
              </div>
            )}

            <div>
              <label className="text-sm font-medium mb-2 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10"
                />
              </div>
              {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10"
                />
              </div>
              {errors.password && <p className="text-sm text-destructive mt-1">{errors.password}</p>}
            </div>

            {!isLogin && (
              <>
                <div>
                  <label className="text-sm font-medium mb-2 block">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="pl-10"
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-sm text-destructive mt-1">{errors.confirmPassword}</p>}
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <input
                    id="acceptTerms"
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        acceptTerms: e.target.checked,
                      })
                    }
                    className="w-4 h-4 mt-1 rounded border-border bg-background"
                  />
                  <label htmlFor="acceptTerms" className="text-sm text-muted-foreground">
                    I agree to the{" "}
                    <Link href="/terms" className="text-foreground hover:underline font-medium">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-foreground hover:underline font-medium">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                {errors.acceptTerms && <p className="text-sm text-destructive mt-1">{errors.acceptTerms}</p>}
              </>
            )}

            {isLogin && (
              <div className="flex justify-end pt-1">
                <Link
                  href="/forgot-password"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            )}

             <Button type="submit" className="w-full h-11 mt-6" disabled={isLoading}>
               {isLoading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
             </Button>
          </form>

          {/* Sign up / Sign in toggle */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => {
                  setIsLogin(!isLogin)
                  setFormData({
                    fullName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    acceptTerms: false,
                  })
                  setErrors({})
                }}
                className="text-foreground hover:underline font-medium transition-colors"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
