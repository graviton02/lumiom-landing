# Launch Checklist — Pending Items

Last updated: 2026-04-27
Target launch: 2026-05-04

This file tracks everything we've identified during feedback rounds that
isn't yet shipped. Each item lists what's blocking and the rough owner so
nothing slips before launch day. Live status is in the codebase / repo;
this list is the running backlog.

---

## 1. Demo form backend (highest priority)

The Request Demo dialog UI and `/api/request-demo` route handler are live,
but submissions only `console.log` on the server. Before launch we need to
wire it to a real destination so leads aren't lost.

- **Decision pending**: HubSpot integration is the chosen path
  (see HubSpot setup steps in the conversation / forthcoming PR).
- **Blocked on**: HubSpot Portal ID + Form GUID + access token from Kara /
  Karan.
- **Owner**: Tejus (code), Karan (account access).
- **Acceptance**: a test submission from the live site appears as a new
  HubSpot contact + form submission, and Kara is notified.

## 2. Real customer testimonial

The testimonial card carries placeholder name / title / organization
tokens and a quote framed around "my enterprise."

- **Blocked on**: Mamatha confirming Darlene Taylor's go-ahead and the
  exact title + company line.
- **Owner**: Mamatha (approval), Tejus (drop in once approved).
- **Acceptance**: real name, title, company, and signed-off quote replace
  the bracketed placeholders.

## 3. CEO & Founder bio content

The `/ceo-and-founder` page renders structure + section headings
(In Brief, Career, Boards & Advisory, Speaking & Writing) but the body
copy is bracketed placeholders.

- **Blocked on**: Ascendant 2-page bio document.
- **Owner**: Vishakha (sourcing), Tejus (drop in).
- **Acceptance**: each section reads as final copy with no `[ ... ]`
  tokens remaining.

## 4. CEO photo

The bio page shows a dashed-border placeholder tile noting "Mamatha
speaking at microphone — Option 3, T200 logo & background to be edited
out."

- **Blocked on**: Ambili requesting the high-quality Option 3 photo from
  Ascendant; NRJ or Nasha editing T200 logo + background out.
- **Owner**: Ambili (request), NRJ / Nasha (edit), Tejus (place).
- **Acceptance**: a clean, HD photo of Mamatha at the microphone replaces
  the placeholder; T200 branding is gone.

## 5. CEO video brief (2-min)

The Home hero has a "Watch 2-Min Brief" button with an empty `href="#"`
placeholder. Mamatha needs to record the brief on camera with Lumiom
branding.

- **Blocked on**: Vishakha coordinating with Ascendant to film, Mamatha's
  recording slot.
- **Owner**: Vishakha (coordination), Mamatha (record), Tejus (embed +
  link).
- **Acceptance**: button opens an HD video (hosted somewhere stable —
  YouTube unlisted, Vimeo, or self-host) in a modal or new tab.

## 6. Formal name for the network-nodes graphic

The dots-and-lines image is referenced internally as
`hero-network-nodes.jpg`. Team needs to brainstorm a formal name.

- **Blocked on**: group brainstorm.
- **Owner**: The group.
- **Acceptance**: name decided, used consistently across website, social,
  and pitch materials. Filenames updated for consistency.

## 7. Additional placements for the network-nodes graphic

Currently used only in the Home hero right panel.

- **Blocked on**: design decision (problem section? solution header?
  footer? bio page?).
- **Owner**: Tejus (after group input).
- **Acceptance**: graphic appears in at least one secondary touchpoint
  with intentional placement.

## 8. Animation upgrade for network-nodes graphic

The image currently floats as a block. If we want the dots / lines
inside to animate, we need an SVG version (the JPG can't be animated
internally).

- **Blocked on**: design call (is the current ambient float enough?).
- **Owner**: Tejus, with design input from Ascendant.
- **Acceptance**: either confirm "current motion is enough" or ship the
  SVG-based version with internal node motion.

## 9. Mamatha's personal website cross-link

Per the marketing meeting, Mamatha's personal site needs:
- Reference to Lumiom AI
- Updated CEO title
- Redirect / link to lumiom.ai

- **Blocked on**: access to Mamatha's personal site (separate property /
  repo).
- **Owner**: Ambili (timeline plan), whoever owns Mamatha's site (changes).
- **Acceptance**: visitors landing on Mamatha's personal site see the
  Lumiom mention and can click through.

## 10. Site review pass — internal stakeholders

- Vishakha to review the development site
- Raul to review the website
- Mamatha buy-in before engaging Ascendant

- **Blocked on**: scheduling.
- **Owner**: Vishakha (coordinate).
- **Acceptance**: written sign-off (or list of changes) from each.

## 11. Quote graphic decision (low priority)

Ascendant suggested: if keeping both decorative elements, put the
quotation mark on top (aligned with image) and the orange line on the
bottom (separating quote from name). We currently use orange line only,
which the team accepted. Re-open if Mamatha wants both back.

- **Status**: deprioritised in 2026-04-23 round; revisit only if needed.

## 12. Headline weight contrast (cross-check)

Ascendant asked for stronger contrast via bold + italic. Now shipped:
"Make **Decisions**" bold + "Is *Broken*" italic. Worth a visual
confirmation that the synthesised bold of Instrument Serif reads cleanly
at all viewport sizes (Instrument Serif ships only at weight 400, so
browsers fake the bold).

- **Owner**: design QA on real devices.
- **Acceptance**: looks correct on macOS Safari, Chrome, mobile Safari.
  If the synthesised bold reads too thin / smeared, pair with a
  multi-weight serif (e.g., Fraunces) for the bold word.

---

## Reference: emails to provision

Two new mailboxes were planned in the earlier feedback round:
- `ask@lumiom.ai` — currently routed via `mailto:` from the Contact links
- `demo@lumiom.ai` — was the original demo CTA target; now superseded by
  the form (HubSpot will route leads instead)

If we move fully to the form, `demo@lumiom.ai` may no longer be needed.
Decide before launch and update footer + nav links if it's deprecated.

---

## Out of scope for this checklist

- Mktg meeting personal updates (health, travel, technology issues).
- Yamaha customer meeting status.
- LinkedIn pre-launch posts and hashtag strategy (tracked in the
  marketing folder, not here).
- Ascendant strategic working session.

These belong in the marketing project plan, not the website launch
checklist.
