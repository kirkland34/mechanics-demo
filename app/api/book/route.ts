import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function POST(req: Request) {
  try {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      console.error("RESEND_API_KEY missing");
      return NextResponse.json({ ok: false, error: "Server missing RESEND_API_KEY" }, { status: 500 });
    }

    const from = process.env.MAIL_FROM || "onboarding@resend.dev";
    const owners = (process.env.OWNER_EMAILS || "")
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    const body = await req.json();
    const { name, email, phone, vehicle, issue, date, mechanicId, mechanicName } = body || {};

    if (!name || !email || !phone) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    const resend = new Resend(key);

    const ownerHtml = `
      <h2>New booking request</h2>
      <ul>
        <li><b>Customer:</b> ${name} (${email}, ${phone})</li>
        <li><b>Vehicle:</b> ${vehicle || "-"}</li>
        <li><b>Issue:</b> ${issue || "-"}</li>
        <li><b>Date:</b> ${date || "-"}</li>
        <li><b>Shop:</b> ${mechanicName || mechanicId || "-"}</li>
      </ul>`;

    const customerHtml = `
      <p>Thanks, ${name}! We’ve received your request for ${mechanicName || "a mechanic"}.</p>
      <p>We’ll follow up at ${phone} and ${email}.</p>
    `;

    if (owners.length) {
      await resend.emails.send({
        from,
        to: owners,
        subject: `New booking — ${mechanicName || "Mechanic"}`,
        html: ownerHtml
      });
    }

    await resend.emails.send({
      from,
      to: email,
      subject: "We received your request",
      html: customerHtml
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
