import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const hasKey = !!process.env.RESEND_API_KEY;
  const hasFrom = !!process.env.MAIL_FROM;
  const owners = (process.env.OWNER_EMAILS || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  return NextResponse.json({
    hasKey,
    hasFrom,
    ownersCount: owners.length,
  });
}
