import { NextResponse } from "next/server";
import { pushSubmissionToHubSpot, type SubmissionPayload } from "@/lib/hubspot";

function isValidPayload(v: unknown): v is SubmissionPayload {
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
    return NextResponse.json(
      { ok: false, error: "invalid json" },
      { status: 400 }
    );
  }

  if (!isValidPayload(data)) {
    return NextResponse.json(
      { ok: false, error: "missing required fields" },
      { status: 400 }
    );
  }

  if (!data.name.trim() || !data.email.trim()) {
    return NextResponse.json(
      { ok: false, error: "name and email required" },
      { status: 400 }
    );
  }

  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) {
    console.error("[contact] HUBSPOT_ACCESS_TOKEN not set");
    return NextResponse.json(
      { ok: false, error: "server not configured" },
      { status: 500 }
    );
  }

  try {
    const { contactId } = await pushSubmissionToHubSpot(
      token,
      data,
      "Contact Inquiry"
    );
    console.log("[contact] HubSpot push ok", {
      contactId,
      email: data.email,
      receivedAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] HubSpot push failed", err);
    return NextResponse.json(
      { ok: false, error: "could not record submission" },
      { status: 502 }
    );
  }
}
