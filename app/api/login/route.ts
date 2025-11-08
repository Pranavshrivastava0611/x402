import { generateToken } from "@/lib/jwt";
import { supabase } from "@/utils/Database_client";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body as { email?: string; password?: string };

    // ✅ Input validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    // ✅ Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const sanitizedEmail = email.trim().toLowerCase();
    if (!emailRegex.test(sanitizedEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // ✅ Fetch user securely from Supabase
    const { data: user, error: fetchError } = await supabase
      .from("users")
      .select("id, email, password_hash, full_name, email_verified, created_at")
      .eq("email", email.toLowerCase().trim())
      .maybeSingle(); // ✅ safer than `.single()` (avoids throw if not found)

    if (fetchError || !user) {
      console.error("User fetch error:", fetchError);
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // ✅ Compare password
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // ✅ Generate JWT
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    // ✅ Prepare response
    const response = NextResponse.json(
      {
        message: "Login successful.",
        user: {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          email_verified: user.email_verified,
          created_at: user.created_at,
        },
        token,
        redirect: "/dashboard",
      },
      { status: 200 }
    );

    // ✅ Set JWT cookie (secure & httpOnly)
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err: any) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred during login." },
      { status: 500 }
    );
  }
}
