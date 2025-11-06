import { supabase } from "@/utils/Database_client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, password, confirmPassword, acceptTerms } = body;

    // Validate input
    if (!fullName || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    // Validate password match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    // Validate terms acceptance
    if (!acceptTerms) {
      return NextResponse.json(
        { error: "You must accept the terms and conditions" },
        { status: 400 }
      );
    }

    // Create user with Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      return NextResponse.json(
        { error: error.message || "Failed to create account" },
        { status: 400 }
      );
    }

    // Return user data
    return NextResponse.json(
      {
        message: "Account created successfully",
        user: {
          id: data.user?.id,
          email: data.user?.email,
          full_name: fullName,
          created_at: data.user?.created_at,
        },
        session: data.session,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "An error occurred during signup" },
      { status: 500 }
    );
  }
}

