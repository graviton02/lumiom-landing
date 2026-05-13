"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Cog,
  Database,
  Users,
  FileText,
  ExternalLink,
} from "lucide-react";
import RequestDemoDialog from "@/components/RequestDemoDialog";
import ContactDialog from "@/components/ContactDialog";

/* ─────────────────────────────────────────────
   Scroll reveal
   ───────────────────────────────────────────── */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("revealed"), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

/* ────────────────── Wordmark ────────────────── */
function Wordmark() {
  return (
    <Link
      href="/"
      className="inline-flex items-center"
      aria-label="Lumiom home"
    >
      <Image
        src="/lumiom-ai-logo.png"
        alt="Lumiom AI"
        width={140}
        height={36}
        priority
      />
    </Link>
  );
}

/* ────────────────── Data ────────────────── */
const stats = [
  {
    num: "$23B",
    label: "software business scaled across 14 brands at Stellantis",
  },
  {
    num: "$100M",
    label: "in measurable value captured in 90 days at a Tier 1 supplier",
  },
  {
    num: "Enterprise AI",
    label:
      "embedded into Goodyear's operating model — not bolted onto it",
  },
];

const timeline = [
  {
    when: "2024 →",
    role: "Founder & CEO",
    org: "Lumiom AI",
    line: "Productizing the operating method she has refined across three decades.",
  },
  {
    when: "2023 – 2024",
    role: "SVP, Strategy & Transformation",
    org: "Goodyear Tire & Rubber",
    line: "Led the tire industry's first enterprise-scale AI transformation.",
  },
  {
    when: "2019 – 2023",
    role: "SVP, Software Business & Product Planning",
    org: "Stellantis",
    line: "Built a new $23B software entity across 14 brands and three continents — targeting 20–40% software margins versus the 9–12% automotive band.",
  },
  {
    when: "2016 – 2019",
    role: "SVP & Chief Digital Officer",
    org: "ZF Friedrichshafen AG",
    line: "Digitalized a $43B supplier — 137,000 employees across 40 countries. Built ZF's innovation hubs in Silicon Valley and Hyderabad.",
  },
  {
    when: "2013 – 2016",
    role: "VP & Chief Information Officer",
    org: "Consumers Energy",
    line: "The utility's first CIO. Helped reframe a regulated energy company as a customer-value enterprise.",
  },
  {
    when: "2003 – 2013",
    role: "Successive transformation roles",
    org: "Chrysler · DaimlerChrysler · Daimler Financial",
    line: "The American foundation. The decade that built the operating instinct she would later scale.",
  },
];

const traps = [
  {
    icon: Cog,
    title: "The Technology Trap",
    body: "Automating broken processes faster — instead of fixing them.",
  },
  {
    icon: Database,
    title: "The Data Trap",
    body: "Boiling the ocean with data-hygiene programs that never end — instead of focusing on the few signals that move outcomes.",
  },
  {
    icon: Users,
    title: "The Human Trap",
    body: "Ignoring the 20–60–20 dynamics of change, where the middle 60% decides whether transformation lands.",
  },
  {
    icon: FileText,
    title: "The Consulting Trap",
    body: "Relying on advisors who drop a strategy deck and walk away from execution and risk.",
  },
];

const recognitions = [
  {
    source: "Crain's Detroit Business",
    award: "Most Influential Women",
    year: "2021",
  },
  {
    source: "Automotive News",
    award: "100 Leading Women in NA Auto Industry",
    year: "2020",
  },
  {
    source: "MichiganCIO",
    award: "CIO of the Year",
    year: "2020",
  },
];

/* ═════════════════════════════════════════════════════════════════
   PAGE
   ═════════════════════════════════════════════════════════════════ */
export default function CeoFounderPage() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const openDemo = () => setDemoOpen(true);
  const openContact = () => setContactOpen(true);

  return (
    <>
      <main className="min-h-screen bg-cream overflow-x-hidden">
        {/* ── Top nav ── */}
        <header className="px-6 sm:px-10 md:px-16 lg:px-24 pt-8 pb-4 flex items-center justify-between">
          <Wordmark />
          <div className="flex items-center gap-4 sm:gap-5">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[12px] font-medium text-navy/70 hover:text-navy transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Home
            </Link>
            <button
              type="button"
              onClick={openContact}
              className="hidden sm:inline-flex text-[12px] font-medium text-navy/70 hover:text-navy transition-colors"
            >
              Contact
            </button>
            <button
              type="button"
              onClick={openDemo}
              className="inline-flex items-center gap-1.5 rounded-full border border-navy/15 px-3.5 py-1.5 text-[12px] font-semibold text-navy hover:bg-navy/[0.04] transition-colors"
            >
              Request Demo
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </header>

        {/* ═══════════════════════════════════════════
            TITLE BLOCK
            ═══════════════════════════════════════════ */}
        <section className="px-6 sm:px-10 md:px-16 lg:px-24 pt-12 md:pt-20 pb-16 md:pb-20">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-orange mb-5">
                Leadership Profile · 2026
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-serif text-[44px] sm:text-[60px] md:text-[76px] lg:text-[88px] leading-[1.0] text-navy mb-7">
                Mamatha <em>Chamarthi.</em>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[17px] md:text-[18px] text-text-secondary leading-relaxed max-w-2xl mb-3">
                Currently Founder &amp; CEO,{" "}
                <em className="text-navy not-italic font-semibold">
                  Lumiom AI.
                </em>
              </p>
            </Reveal>

            <Reveal delay={280}>
              <p className="text-[14px] md:text-[15px] text-navy/55 leading-relaxed max-w-3xl">
                Previously SVP Strategy &amp; Transformation, Goodyear · SVP
                Software Business, Stellantis · Chief Digital Officer, ZF
                Friedrichshafen · CIO, Consumers Energy.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            01 · THE OPENING (photo + body + stats + quote)
            ═══════════════════════════════════════════ */}
        <section className="relative py-20 md:py-28 px-6 sm:px-10 md:px-16 lg:px-24 bg-warm-white">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-orange mb-5">
                01 · The Opening
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-serif text-[32px] sm:text-[40px] md:text-[44px] lg:text-[48px] leading-[1.1] text-navy mb-12 max-w-3xl">
                The operator who refuses <em>theater.</em>
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-[0.5fr_1.5fr] gap-10 lg:gap-14 items-center mb-16">
              {/* Photo */}
              <Reveal delay={180}>
                <div className="relative w-full max-w-[280px]">
                  <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-white ring-1 ring-navy/[0.06]">
                    <Image
                      src="/chamarthi-mamatha.jpg"
                      alt="Mamatha Chamarthi, Founder & CEO of Lumiom AI"
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 280px, 60vw"
                    />
                  </div>
                  <div className="absolute -top-5 -right-5 w-[100px] h-[100px] rounded-full bg-orange/[0.1] -z-10 hidden sm:block" />
                </div>
              </Reveal>

              {/* Body */}
              <Reveal delay={260}>
                <div className="flex flex-col gap-5">
                  <p className="text-[17px] md:text-[18px] text-navy/82 leading-[1.65]">
                    Mamatha Chamarthi spent three decades inside Stellantis,
                    Goodyear, ZF Friedrichshafen, and Consumers Energy doing
                    what most executives only promise — translating
                    technology into outcomes that show up in the P&amp;L, on
                    the timeline she committed to, in the language the board
                    can read.
                  </p>
                  <p className="text-[16px] md:text-[17px] text-navy/65 leading-[1.7]">
                    Her reputation was built on the operating floor, not in
                    the boardroom. The work doesn&apos;t begin with a
                    strategy deck — it begins with a forensic diagnosis of
                    where money is being lost, and ends with the kind of
                    operating impact that moves quarterly earnings.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Stat block */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-navy/10 rounded-2xl overflow-hidden border border-navy/10 mb-14">
              {stats.map((s, i) => (
                <Reveal key={s.num} delay={340 + i * 120}>
                  <div className="bg-white p-7 md:p-9 h-full">
                    <p className="font-serif text-[36px] md:text-[44px] lg:text-[52px] leading-none text-navy mb-4">
                      {s.num}
                    </p>
                    <p className="text-[14px] md:text-[15px] text-text-secondary leading-relaxed">
                      {s.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Pull quote */}
            <Reveal delay={720}>
              <div className="max-w-3xl">
                <div className="w-10 h-[3px] bg-orange rounded-full mb-5" />
                <blockquote className="font-serif text-[26px] sm:text-[32px] md:text-[36px] leading-[1.25] text-navy/85 italic mb-4">
                  &ldquo;Transformation is not PowerPoint. It is operational.
                  It is financial. It is <em>behavioral.</em>&rdquo;
                </blockquote>
                <p className="text-[14px] text-text-secondary">
                  <span className="font-semibold text-navy">
                    Mamatha Chamarthi
                  </span>
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            02 · LUMIOM
            ═══════════════════════════════════════════ */}
        <section className="relative py-24 md:py-32 px-6 sm:px-10 md:px-16 lg:px-24 bg-cream">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-orange mb-5">
                02 · Lumiom
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-serif text-[32px] sm:text-[40px] md:text-[44px] lg:text-[48px] leading-[1.1] text-navy mb-10 max-w-3xl">
                Where everything <em>led.</em>
              </h2>
            </Reveal>

            <div className="flex flex-col gap-6 text-[17px] md:text-[18px] text-navy/82 leading-[1.65]">
              <Reveal delay={180}>
                <p>
                  Lumiom is the platform Mamatha built to do at scale what
                  she has spent her career doing one industrial at a time.
                </p>
              </Reveal>

              <Reveal delay={260}>
                <p>
                  Her diagnosis: enterprises don&apos;t lack ambition or
                  talent — they lack a connected, real-time view of the
                  business they are running. By the time the action lands,
                  the business has already moved.
                </p>
              </Reveal>

              <Reveal delay={340}>
                <p>
                  Lumiom is the inversion. Real-time enterprise intelligence,
                  read as one connected, living system. AI applied only where
                  it moves the P&amp;L. A value-attribution layer that makes
                  every gain audit-ready. A{" "}
                  <em className="text-navy">Harvest-to-Invest</em> flywheel
                  that funds transformation from savings captured inside the
                  existing operating base.
                </p>
              </Reveal>

              <Reveal delay={420}>
                <p className="font-mono text-[12px] tracking-[0.24em] uppercase text-orange mt-3">
                  Already engaged with enterprise clients.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            03 · TRACK RECORD
            ═══════════════════════════════════════════ */}
        <section className="relative py-24 md:py-32 px-6 sm:px-10 md:px-16 lg:px-24 bg-warm-white">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-orange mb-5">
                03 · The Track Record
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-serif text-[32px] sm:text-[40px] md:text-[44px] lg:text-[48px] leading-[1.1] text-navy mb-14 max-w-3xl">
                A career built in <em>industrial systems.</em>
              </h2>
            </Reveal>

            <div className="flex flex-col">
              {timeline.map((t, i) => (
                <Reveal key={t.when + t.org} delay={180 + i * 90}>
                  <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-3 md:gap-10 py-7 border-t border-navy/[0.08] first:border-t-0">
                    <div>
                      <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-orange">
                        {t.when}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-navy text-[17px] md:text-[18px] mb-1 leading-tight">
                        {t.role}
                        <span className="font-normal text-text-secondary">
                          {" · "}
                          {t.org}
                        </span>
                      </p>
                      <p className="text-[15px] text-text-secondary leading-relaxed mt-2 max-w-2xl">
                        {t.line}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={900}>
              <p className="font-serif text-[18px] md:text-[20px] italic text-navy/65 leading-[1.5] max-w-3xl mt-14 pt-10 border-t border-navy/[0.08]">
                The work doesn&apos;t begin with a strategy deck. It begins
                with a forensic diagnosis of where money is being lost.
                Transformation funds itself from what&apos;s harvested. The
                intelligence stays inside the enterprise when she leaves.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            04 · THE THESIS (navy section, 4 traps)
            ═══════════════════════════════════════════ */}
        <section className="relative py-24 md:py-32 px-6 sm:px-10 md:px-16 lg:px-24 bg-navy overflow-hidden">
          <div className="absolute top-0 left-6 sm:left-10 md:left-16 lg:left-24 w-[3px] h-20 bg-orange" />

          <div className="max-w-6xl mx-auto">
            <Reveal>
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-orange mb-5">
                04 · The Thesis
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-serif text-[32px] sm:text-[40px] md:text-[46px] lg:text-[52px] leading-[1.08] text-white mb-7 max-w-3xl">
                Why Most AI Programs Fail
                <br />
                Before They <em className="text-orange">Start.</em>
              </h2>
            </Reveal>

            <Reveal delay={180}>
              <p className="text-[17px] md:text-lg text-white/55 leading-relaxed max-w-2xl mb-14">
                Four traps every enterprise AI program walks into — and the
                discipline that breaks them.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 mb-14">
              {traps.map((trap, i) => {
                const Icon = trap.icon;
                return (
                  <Reveal key={trap.title} delay={260 + i * 100}>
                    <div className="relative bg-navy-light/40 backdrop-blur-sm rounded-xl p-7 h-full border border-white/[0.08]">
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-orange/[0.12] flex-shrink-0">
                          <Icon
                            className="w-5 h-5 text-orange"
                            strokeWidth={1.8}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-orange/85 mb-2">
                            Trap 0{i + 1}
                          </p>
                          <p className="font-semibold text-white text-[17px] mb-3 leading-tight">
                            {trap.title}
                          </p>
                          <p className="text-white/60 text-[14px] leading-relaxed">
                            {trap.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={720}>
              <div className="bg-gradient-to-r from-orange/[0.08] via-white/[0.02] to-orange/[0.08] rounded-2xl border border-white/10 p-8 md:p-10 max-w-4xl">
                <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-orange mb-4">
                  Harvest-to-Invest
                </p>
                <p className="text-[16px] md:text-[17px] text-white/80 leading-[1.65]">
                  The prescription is operational, not theoretical. AI
                  deployed only where it moves the P&amp;L. Every initiative
                  measured against the financial outcome it produced. The
                  financial engine is the{" "}
                  <em className="text-orange not-italic font-semibold">
                    Harvest-to-Invest flywheel
                  </em>{" "}
                  — identify inefficiencies in the existing operating base,
                  capture savings deliberately, use them to fund the next
                  stage. The CFO becomes an ally, not a brake.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-orange/[0.03] blur-3xl pointer-events-none" />
        </section>

        {/* ═══════════════════════════════════════════
            05 · BEYOND THE BOARDROOM
            ═══════════════════════════════════════════ */}
        <section className="relative py-24 md:py-32 px-6 sm:px-10 md:px-16 lg:px-24 bg-cream">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-orange mb-5">
                05 · Beyond the Boardroom
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-serif text-[32px] sm:text-[40px] md:text-[44px] lg:text-[48px] leading-[1.1] text-navy mb-10 max-w-3xl">
                The work beyond the <em>operating role.</em>
              </h2>
            </Reveal>

            <Reveal delay={180}>
              <p className="text-[17px] md:text-[18px] text-navy/82 leading-[1.65] max-w-2xl mb-12">
                Co-founder of{" "}
                <em className="text-navy not-italic font-semibold">T200</em>,
                a nonprofit elevating women in technology leadership — now
                spanning hundreds of CXOs across major enterprises.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
              <Reveal delay={260}>
                <div>
                  <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-navy/50 mb-4">
                    Board Service
                  </p>
                  <ul className="flex flex-col gap-2">
                    {[
                      "Champion X",
                      "Health Alliance Plan of Michigan",
                      "Gartner Research",
                    ].map((b) => (
                      <li
                        key={b}
                        className="text-[16px] text-navy/85 font-medium"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={340}>
                <div>
                  <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-navy/50 mb-4">
                    Recognition
                  </p>
                  <ul className="flex flex-col gap-3">
                    {recognitions.map((r) => (
                      <li
                        key={r.source + r.year}
                        className="flex items-baseline justify-between gap-4 border-b border-navy/[0.08] pb-2 last:border-b-0"
                      >
                        <span className="flex-1">
                          <span className="text-[15px] text-navy font-semibold">
                            {r.source}
                          </span>
                          <span className="block text-[13px] text-text-secondary italic mt-0.5">
                            {r.award}
                          </span>
                        </span>
                        <span className="font-mono text-[11px] tracking-[0.2em] text-orange">
                          {r.year}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            06 · A PERSONAL NOTE
            ═══════════════════════════════════════════ */}
        <section className="relative py-24 md:py-32 px-6 sm:px-10 md:px-16 lg:px-24 bg-warm-white">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-orange mb-5">
                06 · A Personal Note
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-serif text-[32px] sm:text-[40px] md:text-[44px] lg:text-[48px] leading-[1.1] text-navy mb-10 max-w-3xl">
                Two Suitcases. Three Decades.
                <br />
                One <em>arc.</em>
              </h2>
            </Reveal>

            <div className="flex flex-col gap-6 text-[17px] md:text-[18px] text-navy/82 leading-[1.65] max-w-3xl">
              <Reveal delay={180}>
                <p>
                  Educated in psychology, sociology, and English literature
                  in India, Mamatha taught briefly before deciding the work
                  was too narrow. She picked up an MBA, learned computer
                  programming, and immigrated to the United States at 24
                  with two suitcases. She earned a master&apos;s in computer
                  science from Oakland University and an MBA from
                  Northwestern&apos;s{" "}
                  <em className="text-navy">Kellogg School of Management.</em>
                </p>
              </Reveal>

              <Reveal delay={260}>
                <p>
                  Her mother founded India&apos;s first daycare center. The
                  entrepreneurial lineage runs deep — and so does the
                  conviction that you can do well and do good in the same
                  career.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            CTA / CONTACT
            ═══════════════════════════════════════════ */}
        <section className="relative py-24 md:py-28 px-6 sm:px-10 md:px-16 lg:px-24 bg-cream">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-orange mb-5">
                Let&apos;s Connect
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-serif text-[36px] sm:text-[44px] md:text-[52px] leading-[1.08] text-navy mb-7">
                Talk to <em>Mamatha.</em>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[16px] md:text-[17px] text-text-secondary leading-relaxed max-w-xl mx-auto mb-10">
                For Lumiom inquiries, board appointments, speaking
                engagements, and conversations on AI-led business outcomes.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={openDemo}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-orange text-white text-[15px] font-semibold rounded-lg hover:bg-orange-light transition-all duration-300 shadow-[0_2px_16px_rgba(232,108,58,0.25)] hover:shadow-[0_4px_24px_rgba(232,108,58,0.35)] hover:-translate-y-px"
                >
                  Request a Demo
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="https://www.linkedin.com/in/mamathachamarthi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-navy/15 text-navy text-[15px] font-semibold rounded-lg hover:bg-navy/[0.04] transition-all duration-300"
                >
                  LinkedIn
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={openContact}
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-navy/15 text-navy text-[15px] font-semibold rounded-lg hover:bg-navy/[0.04] transition-all duration-300"
                >
                  Contact
                </button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            FOOTER
            ═══════════════════════════════════════════ */}
        <footer className="py-10 px-6 sm:px-10 md:px-16 lg:px-24 bg-navy">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-white/30 text-sm">
              &copy; 2026 Lumiom AI. All rights reserved.
            </p>
            <div className="flex items-center gap-5 text-[13px]">
              <Link
                href="/"
                className="text-white/55 hover:text-white transition-colors"
              >
                Home
              </Link>
              <span className="text-white/20">·</span>
              <button
                type="button"
                onClick={openContact}
                className="text-white/55 hover:text-white transition-colors"
              >
                Contact
              </button>
              <span className="text-white/20">·</span>
              <button
                type="button"
                onClick={openDemo}
                className="text-white/55 hover:text-white transition-colors"
              >
                Request a Demo
              </button>
            </div>
          </div>
        </footer>
      </main>

      <RequestDemoDialog open={demoOpen} onClose={() => setDemoOpen(false)} />
      <ContactDialog open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
