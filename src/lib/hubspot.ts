const HUBSPOT_API = "https://api.hubapi.com";

export type SubmissionKind = "Demo Request" | "Contact Inquiry";

export type SubmissionPayload = {
  name: string;
  title: string;
  organization: string;
  email: string;
  message: string;
};

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
  token: string,
  path: string,
  init: RequestInit = {}
) {
  const { headers, ...rest } = init;
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
  payload: SubmissionPayload
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

  const create = await hubspotFetch(token, "/crm/v3/objects/contacts", {
    method: "POST",
    body: JSON.stringify({ properties }),
  });

  if (create.ok) {
    const json = (await create.json()) as { id: string };
    return json.id;
  }

  // HubSpot returns 409 when a contact with this email already exists.
  // Fall back to looking the contact up so we can still attach a Note.
  if (create.status === 409) {
    const lookup = await hubspotFetch(
      token,
      `/crm/v3/objects/contacts/${encodeURIComponent(
        payload.email.trim()
      )}?idProperty=email`,
      { method: "GET" }
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
  payload: SubmissionPayload,
  kind: SubmissionKind
) {
  const lines: (string | null)[] = [
    `${kind} from lumiom.ai`,
    "",
    `Name: ${payload.name}`,
    payload.title.trim() ? `Title: ${payload.title}` : null,
    payload.organization.trim() ? `Organization: ${payload.organization}` : null,
    `Email: ${payload.email}`,
  ];
  if (payload.message.trim()) {
    lines.push("", "Message:", payload.message);
  }
  const noteBody = lines.filter((l): l is string => l !== null).join("\n");

  const res = await hubspotFetch(token, "/crm/v3/objects/notes", {
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
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`HubSpot note attach failed (${res.status}): ${errBody}`);
  }
}

export async function pushSubmissionToHubSpot(
  token: string,
  payload: SubmissionPayload,
  kind: SubmissionKind
): Promise<{ contactId: string }> {
  const contactId = await createOrFindContact(token, payload);
  await attachNote(token, contactId, payload, kind);
  return { contactId };
}
