import { generateToken } from "@/lib/jwt";
import { supabase } from "@/utils/Database_client";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, password, confirmPassword, acceptTerms } = body as {
      fullName?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
      acceptTerms?: boolean;
    };

    // Validate input
    if (!fullName || !email || !password || !confirmPassword) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long." }, { status: 400 });
    }
    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });
    }
    if (!acceptTerms) {
      return NextResponse.json({ error: "You must accept the terms and conditions." }, { status: 400 });
    }

    // Sanitize and validate email
    const sanitizedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    // Check if user already exists
    const { data: existing, error: existsErr } = await supabase
      .from("users")
      .select("id")
      .eq("email", sanitizedEmail)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 400 });
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Insert user record into custom users table
    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert([
        {
          full_name: fullName,
          email: sanitizedEmail,
          password_hash,
          email_verified: false,
        },
      ])
      .select("id, email, full_name, email_verified, created_at")
      .single();

    if (insertError || !newUser) {
      console.error("Signup insert error:", insertError);
      return NextResponse.json({ error: "Failed to create account." }, { status: 500 });
    }

    // Generate JWT and set httpOnly cookie
    const token = generateToken({ userId: newUser.id, email: newUser.email });
    const res = NextResponse.json(
      {
        message: "Account created successfully.",
        user: newUser,
        token,
        redirect: "/dashboard",
      },
      { status: 201 }
    );

    res.cookies.set("auth_token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err: any) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred during signup." },
      { status: 500 }
    );
  }
}
