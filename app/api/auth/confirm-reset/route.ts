import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/utils/Database_client_api";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, otp, resetToken, newPassword } = body as {
      email?: string;
      otp?: string;
      resetToken?: string;
      newPassword?: string;
    };

    if (!email || !otp || !resetToken) {
      return NextResponse.json({ error: "Email, OTP and reset token are required." }, { status: 400 });
    }

    // If newPassword is provided, we're in the password update phase
    if (newPassword !== undefined) {
      if (newPassword.length < 8) {
        return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
      }
    }

    // Verify token
    try {
      const decoded = jwt.verify(resetToken, JWT_SECRET) as any;
      if (!decoded || decoded.email !== email || decoded.otp !== otp) {
        return NextResponse.json({ error: "Invalid or expired token/OTP." }, { status: 401 });
      }

      // If we're just verifying OTP
      if (newPassword === undefined) {
        return NextResponse.json({ success: true, message: "OTP verified successfully" }, { status: 200 });
      }

      // If we're updating the password
      const password_hash = await bcrypt.hash(newPassword, 10);

      const { error: updateError } = await supabaseAdmin
        .from("users")
        .update({ password_hash })
        .eq("email", email)
        .select("id, email");

      if (updateError) {
        console.error("Password update error:", updateError);
        return NextResponse.json({ error: "Failed to update password." }, { status: 500 });
      }

      return NextResponse.json({ 
        success: true, 
        message: "Password updated successfully" 
      }, { status: 200 });
    } catch (err) {
      console.error("Token verify error:", err);
      return NextResponse.json({ error: "Invalid or expired token/OTP." }, { status: 401 });
    }
  } catch (err) {
    console.error("Confirm reset error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
