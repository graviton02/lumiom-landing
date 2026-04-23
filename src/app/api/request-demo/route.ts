import { NextResponse } from "next/server";

/**
 * Demo request handler.
 *
 * Placeholder: logs the submission to the server console until a real
 * delivery mechanism (Resend/SendGrid to hello@lumiom.com, or CRM push
 * pending Karan's recommendation) is wired in.
 *
 * TODO: once the CRM / transactional email service is chosen, replace the
 * console.log with the actual delivery call. Keep the response contract
 * (200 + { ok: true }) so the client dialog doesn't need to change.
 */

type DemoPayload = {
  name: string;
  title: string;
  organization: string;
  email: string;
  message: string;
};

function isValidPayload(v: unknown): v is DemoPayload {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.name === "string" &&
    typeof o.title === "string" &&
    typeof o.organization === "string" &&
    typeof o.email === "string" &&
    typeof o.message === "string"
  );
}

export async function POST(request: Request) {
  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  if (!isValidPayload(data)) {
    return NextResponse.json(
      { ok: false, error: "missing required fields" },
      { status: 400 }
    );
  }

  const { name, title, organization, email, message } = data;

  if (!name.trim() || !email.trim()) {
    return NextResponse.json(
      { ok: false, error: "name and email required" },
      { status: 400 }
    );
  }

  console.log("[request-demo] new submission", {
    name,
    title,
    organization,
    email,
    messagePreview: message.slice(0, 160),
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
