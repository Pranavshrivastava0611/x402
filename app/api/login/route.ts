import { generateToken } from "@/lib/jwt";
import { supabase } from "@/utils/Database_client";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log('Login API: Received login request');
  try {
    const body = await request.json();
    const { email, password } = body as { email?: string; password?: string };
    console.log('Login API: Validating email:', email);

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const sanitizedEmail = email.trim().toLowerCase();
    if (!emailRegex.test(sanitizedEmail)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    // ✅ Fetch user securely
    const { data: user, error: fetchError } = await supabase
      .from("users")
      .select("id, email, password_hash, full_name, email_verified, created_at")
      .eq("email", sanitizedEmail)
      .maybeSingle();

    if (fetchError || !user) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    // ✅ Compare password
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    // ✅ Generate JWT
    const token = generateToken({ userId: user.id, email: user.email });
    console.log('Login API: Generated token');

    // ✅ Prepare response with session data
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
        session: {
          token,
          user: {
            id: user.id,
            email: user.email
          }
        },
        redirect: "/dashboard",
      },
      { status: 200 }
    );

    // ✅ Set JWT cookie (very important for middleware)
    response.cookies.set("auth_token", token, {
      httpOnly: false, // Allow JavaScript access
      secure: false, // ✅ important for localhost
      sameSite: "lax", // ✅ safer in dev, "none" for production
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    console.log('Login API: Set auth_token cookie');
    console.log('Login API: Sending successful response');
    return response;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
