export const runtime = "nodejs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { phone } = await req.json();

    if (!phone || phone.length < 5) {
      return NextResponse.json({ message: "Valid phone number required" }, { status: 400 });
    }

    // 🔁 Replace this with actual DB lookup
    const user = await getUserByPhone(phone);
    if (!user) {
      return NextResponse.json({
        message: "Phone number does not exist. Sign up to create an account."
      }, { status: 404 });
    }

    if (user.status !== 1) {
      return NextResponse.json({
        message: "Account temporarily disabled. Please contact support."
      }, { status: 403 });
    }

    const otp = generateOTP(6); // e.g., "654321"

    // Save OTP in DB (encrypted)
    const encryptedOTP = encryptOTP(otp); // Replace with real encryption
    const saved = await storeOTP(user.id, encryptedOTP);

    if (!saved) {
      return NextResponse.json({
        message: "Failed to generate OTP. Please contact support."
      }, { status: 500 });
    }

    // Send SMS
    const smsSent = await sendSMS(phone, `Your OTP code is ${otp}`);

    if (!smsSent) {
      return NextResponse.json({
        message: "Failed to send OTP. Please contact support."
      }, { status: 500 });
    }

    // Optional: Save temp session to identify user during reset
    // You can use cookies, NextAuth session, or Supabase session
    return NextResponse.json({ success: true, redirectTo: "/password-reset" });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Unexpected error" }, { status: 500 });
  }
}
