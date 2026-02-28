import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { PACKAGES, getDeliveryCharge, type PackageKey } from "@/data/districts";

function validatePhone(phone: string): boolean {
  return /^01[3-9]\d{8}$/.test(phone.trim());
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, address, district, packageKey } = body;

    // Server-side validation
    if (!name?.trim()) {
      return NextResponse.json({ error: "নাম অবশ্যই দিতে হবে" }, { status: 400 });
    }
    if (!phone?.trim() || !validatePhone(phone)) {
      return NextResponse.json(
        { error: "সঠিক ফোন নম্বর দিন" },
        { status: 400 }
      );
    }
    if (!address?.trim()) {
      return NextResponse.json(
        { error: "ঠিকানা অবশ্যই দিতে হবে" },
        { status: 400 }
      );
    }
    if (!district?.trim()) {
      return NextResponse.json(
        { error: "জেলা নির্বাচন করুন" },
        { status: 400 }
      );
    }
    if (!packageKey || !PACKAGES[packageKey as PackageKey]) {
      return NextResponse.json(
        { error: "সঠিক প্যাকেজ নির্বাচন করুন" },
        { status: 400 }
      );
    }

    const pkg = PACKAGES[packageKey as PackageKey];
    const deliveryCharge = getDeliveryCharge(district);
    const total = pkg.price + deliveryCharge;
    const orderTime = new Date().toLocaleString("bn-BD", {
      timeZone: "Asia/Dhaka",
    });

    const toEmail = process.env.ORDER_EMAIL;
    if (!toEmail) {
      console.error("ORDER_EMAIL environment variable is not set");
      return NextResponse.json(
        { error: "সার্ভার কনফিগারেশন সমস্যা" },
        { status: 500 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY environment variable is not set");
      return NextResponse.json(
        { error: "সার্ভার কনফিগারেশন সমস্যা" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const emailHtml = `
<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: Arial, sans-serif; background: #09090b; color: #fafafa; padding: 24px; }
    .card { background: #1a1a1a; border: 1px solid #2e2e2e; border-radius: 12px; padding: 24px; max-width: 500px; margin: 0 auto; }
    h2 { color: #f59e0b; margin: 0 0 16px; }
    table { width: 100%; border-collapse: collapse; }
    td { padding: 8px 0; vertical-align: top; }
    .label { color: #888; width: 130px; font-size: 14px; }
    .value { color: #fafafa; font-weight: bold; font-size: 14px; }
    .divider { border-top: 1px solid #2e2e2e; margin: 12px 0; }
    .total { color: #f59e0b; font-size: 18px; font-weight: bold; }
    .badge { background: #f59e0b; color: #09090b; padding: 2px 10px; border-radius: 99px; font-size: 12px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="card">
    <h2>🛒 নতুন অর্ডার!</h2>
    <table>
      <tr><td class="label">অর্ডারের সময়</td><td class="value">${orderTime}</td></tr>
      <tr><td class="label">নাম</td><td class="value">${name.trim()}</td></tr>
      <tr><td class="label">ফোন</td><td class="value">${phone.trim()}</td></tr>
      <tr><td class="label">জেলা</td><td class="value">${district}</td></tr>
      <tr><td class="label">ঠিকানা</td><td class="value">${address.trim()}</td></tr>
      <tr><td class="label">প্যাকেজ</td><td class="value">${pkg.label}</td></tr>
    </table>
    <div class="divider"></div>
    <table>
      <tr><td class="label">পণ্যের মূল্য</td><td class="value">${pkg.price} টাকা</td></tr>
      <tr><td class="label">ডেলিভারি চার্জ</td><td class="value">${deliveryCharge} টাকা</td></tr>
      <tr><td class="label">মোট পরিশোধ</td><td class="total">${total} টাকা</td></tr>
    </table>
    <div class="divider"></div>
    <p style="color: #888; font-size: 12px; margin: 0;">পেমেন্ট: ক্যাশ অন ডেলিভারি (COD)</p>
  </div>
</body>
</html>`;

    await resend.emails.send({
      from: "Orders <onboarding@resend.dev>",
      to: [toEmail],
      subject: `নতুন অর্ডার — ${pkg.label} — ${name.trim()} (${district})`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Order API error:", err);
    return NextResponse.json(
      { error: "সার্ভার সমস্যা হয়েছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}
