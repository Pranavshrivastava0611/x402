import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { supabaseAdmin } from "@/utils/Database_client_api";

let nodemailer: any = null;
try {
  nodemailer = require("nodemailer");
} catch (e) {
  nodemailer = null;
}
let sgMail: any = null;
try {
  sgMail = require("@sendgrid/mail");
} catch (e) {
  sgMail = null;
}

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body as { email?: string };

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const sanitizedEmail = email.trim().toLowerCase();

    // Check user exists
    const { data: user, error: fetchError } = await supabaseAdmin
      .from("users")
      .select("id, email, full_name")
      .eq("email", sanitizedEmail)
      .maybeSingle();

    if (fetchError) {
      console.error("Error fetching user for password reset:", fetchError);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

    if (!user) {
      return NextResponse.json(
        { error: "No account found with this email. Please check the email address or create a new account." },
        { status: 404 }
      );
    }

    // Generate numeric OTP (4 digits)
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Create a short-lived reset token that embeds the OTP
    const resetToken = jwt.sign({ userId: user.id, email: user.email, otp }, JWT_SECRET, {
      expiresIn: "15m",
    });

    // Prefer SendGrid when configured, otherwise try SMTP nodemailer, otherwise log OTP (dev)
    const sendGridKey = process.env.SENDGRID_API_KEY || process.env.SENDGRID_KEY;
    let sent = false;
    if (sgMail && sendGridKey) {
      try {
        sgMail.setApiKey(sendGridKey);
        await sgMail.send({
          to: sanitizedEmail,
          from: process.env.SENDGRID_FROM || process.env.SMTP_FROM || process.env.SMTP_USER,
          subject: "Your password reset code",
          text: `Your password reset code is: ${otp}`,
          html: `<p>Your password reset code is: <strong>${otp}</strong></p>`,
        });
        console.log(`Sent reset OTP to ${sanitizedEmail} via SendGrid`);
        sent = true;
      } catch (sgErr) {
        console.error("SendGrid send error, will try SMTP fallback:", sgErr);
      }
    }

    if (!sent) {
      // Use Gmail SMTP with provided credentials
      if (nodemailer && process.env.EMAIL_ID && process.env.EMAIL_PASSWORD) {
        try {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_ID,
              pass: process.env.EMAIL_PASSWORD,
            },
          });

          await transporter.sendMail({
            from: process.env.SMTP_FROM || process.env.EMAIL_ID,
            to: sanitizedEmail,
            subject: "Your password reset code",
            text: `Your password reset code is: ${otp}`,
            html: `<p>Your password reset code is: <strong>${otp}</strong></p>`,
          });
          console.log(`Sent reset OTP to ${sanitizedEmail} via SMTP`);
          sent = true;
        } catch (mailErr) {
          console.error("Failed to send reset email via SMTP, falling back to console:", mailErr);
        }
      }
    }

    if (!sent) {
      // If neither SendGrid nor SMTP sent successfully, log OTP for development
      console.log(`Password reset OTP for ${sanitizedEmail}: ${otp}`);
    }

    // Return resetToken to the frontend for dev/testing (remove in production)
    return NextResponse.json({ success: true, resetToken }, { status: 200 });
  } catch (err) {
    console.error("Request reset error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
