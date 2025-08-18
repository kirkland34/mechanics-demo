export const runtime = "nodejs";
export async function GET() {
  const hasKey = !!process.env.RESEND_API_KEY;
  return new Response(JSON.stringify({ hasKey }), {
    headers: { "content-type": "application/json" }
  });
}
