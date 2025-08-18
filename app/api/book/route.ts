import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

// Read the key once at module load (more reliable across invocations)
const RESEND_KEY = process.env.RESEND_API_KEY;
console.log("BOOK ROUTE boot: hasKey=", !!RESEND_KEY, "runtime=", process.env.NEXT_RUNTIME);

export async function GET() {
  return new Response(JSON.stringify({ hasKey: !!RESEND_KEY }), {
    headers: { "content-type": "application/json" }
  });
}

export async function POST(req: Request) {
  try {
    if (!RESEND_KEY) {
      console.error("RESEND_API_KEY missing at POST");
      return NextResponse.json({ ok: false, error: "Server missing RESEND_API_KEY" }, { status: 500 });
    }

    const body = await req.json();
    const { name, email, phone, vehicle, issue, date, mechanicId, mechanicName } = body || {};
    if (!name || !email || !phone) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    const resend = new Resend(RESEND_KEY);

    const html = `
      <h2>New Booking Request</h2>
      <p><b>Mechanic:</b> ${mechanicName || mechanicId || "N/A"}</p>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Vehicle:</b> ${vehicle || "N/A"}</p>
      <p><b>Preferred date:</b> ${date || "N/A"}</p>
      <p><b>Issue:</b> ${issue || "N/A"}</p>
    `;

    await resend.emails.send({
      from: "Mechanics Demo <onboarding@resend.dev>",
      to: ["legacywealthfinancial19@gmail.com"],
      subject: `New booking request – ${name}`,
      html
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ ok: false, error: err?.message || "Server error" }, { status: 500 });
  }
}
