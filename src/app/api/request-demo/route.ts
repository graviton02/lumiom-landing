import { NextResponse } from "next/server";

const HUBSPOT_API = "https://api.hubapi.com";

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

function splitName(full: string): { firstname: string; lastname: string } {
  const trimmed = full.trim().replace(/\s+/g, " ");
  const space = trimmed.indexOf(" ");
  if (space === -1) return { firstname: trimmed, lastname: "" };
  return {
    firstname: trimmed.slice(0, space),
    lastname: trimmed.slice(space + 1),
  };
}

async function hubspotFetch(
  path: string,
  init: RequestInit & { token: string }
) {
  const { token, headers, ...rest } = init;
  return fetch(`${HUBSPOT_API}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(headers ?? {}),
    },
  });
}

async function createOrFindContact(
  token: string,
  payload: DemoPayload
): Promise<string> {
  const { firstname, lastname } = splitName(payload.name);
  const properties: Record<string, string> = {
    email: payload.email.trim(),
    firstname,
    hs_lead_status: "NEW",
  };
  if (lastname) properties.lastname = lastname;
  if (payload.title.trim()) properties.jobtitle = payload.title.trim();
  if (payload.organization.trim()) properties.company = payload.organization.trim();

  const create = await hubspotFetch("/crm/v3/objects/contacts", {
    method: "POST",
    body: JSON.stringify({ properties }),
    token,
  });

  if (create.ok) {
    const json = (await create.json()) as { id: string };
    return json.id;
  }

  // HubSpot returns 409 when a contact with this email already exists.
  // Fall back to looking the contact up so we can still attach a Note.
  if (create.status === 409) {
    const lookup = await hubspotFetch(
      `/crm/v3/objects/contacts/${encodeURIComponent(
        payload.email.trim()
      )}?idProperty=email`,
      { method: "GET", token }
    );
    if (lookup.ok) {
      const json = (await lookup.json()) as { id: string };
      return json.id;
    }
  }

  const errBody = await create.text();
  throw new Error(
    `HubSpot contact create failed (${create.status}): ${errBody}`
  );
}

async function attachNote(
  token: string,
  contactId: string,
  payload: DemoPayload
) {
  const lines = [
    "Demo request from lumiom.ai",
    "",
    `Name: ${payload.name}`,
    payload.title.trim() ? `Title: ${payload.title}` : null,
    payload.organization.trim() ? `Organization: ${payload.organization}` : null,
    `Email: ${payload.email}`,
  ];
  if (payload.message.trim()) {
    lines.push("", "Message:", payload.message);
  }
  const noteBody = lines.filter((l) => l !== null).join("\n");

  const res = await hubspotFetch("/crm/v3/objects/notes", {
    method: "POST",
    body: JSON.stringify({
      properties: {
        hs_note_body: noteBody,
        hs_timestamp: Date.now(),
      },
      associations: [
        {
          to: { id: contactId },
          // 202 = HubSpot-defined association from Note → Contact.
          types: [
            { associationCategory: "HUBSPOT_DEFINED", associationTypeId: 202 },
          ],
        },
      ],
    }),
    token,
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`HubSpot note attach failed (${res.status}): ${errBody}`);
  }
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
    console.error("[request-demo] HUBSPOT_ACCESS_TOKEN not set");
    return NextResponse.json(
      { ok: false, error: "server not configured" },
      { status: 500 }
    );
  }

  try {
    const contactId = await createOrFindContact(token, data);
    await attachNote(token, contactId, data);
    console.log("[request-demo] HubSpot push ok", {
      contactId,
      email: data.email,
      receivedAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[request-demo] HubSpot push failed", err);
    return NextResponse.json(
      { ok: false, error: "could not record submission" },
      { status: 502 }
    );
  }
}
