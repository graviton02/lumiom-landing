"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Play,
  ArrowDown,
  ArrowRight,
  Lightbulb,
  Blocks,
  Globe,
  Server,
  Building2,
} from "lucide-react";
import RequestDemoDialog from "@/components/RequestDemoDialog";
import ContactDialog from "@/components/ContactDialog";

/* ─────────────────────────────────────────────
   Scroll reveal wrapper
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

/* ─────────────────────────────────────────────
   Data
   ───────────────────────────────────────────── */
const silos = [
  {
    label: "Strategy Consultants",
    line: "Intelligence built, presented — then leaves.",
    color: "#E86C3A",
    icon: Lightbulb,
  },
  {
    label: "System Integrators",
    line: "Transformation knowledge lives in their methodology, not yours.",
    color: "#8B6CC1",
    icon: Blocks,
  },
  {
    label: "Business Process Outsourcing",
    line: "Process execution knowledge dispersed to offshore centers.",
    color: "#4A7DC7",
    icon: Globe,
  },
  {
    label: "IT Services",
    line: "Systems knowledge held by the outsourcer, not the owner.",
    color: "#2A9D8F",
    icon: Server,
  },
  {
    label: "The Enterprise",
    line: "Holds the bill. Doesn't own the intelligence. Calls them again.",
    color: "#0F1729",
    icon: Building2,
  },
];

const functions = ["Operations", "Supply Chain", "Finance", "Commercial"];

/* ─────────────────────────────────────────────
   Unified wordmark — uses the Lumiom PNG logo
   (RGBA, transparent). Variant="dark" applies an
   invert filter so the navy ink reads as cream on
   the Platform view's dark background. Transparent
   pixels stay transparent under `invert`.
   ───────────────────────────────────────────── */
function Wordmark({
  variant = "light",
  size = "md",
}: {
  variant?: "light" | "dark";
  size?: "md" | "lg";
}) {
  const dims =
    size === "lg"
      ? { w: 170, h: 44 }
      : { w: 150, h: 38 };
  return (
    <Image
      src="/lumiom-ai-logo.png"
      alt="Lumiom AI"
      width={dims.w}
      height={dims.h}
      priority
      className={variant === "dark" ? "invert" : undefined}
    />
  );
}

/* ─────────────────────────────────────────────
   Hero view toggle (small, top-right, theme-aware)
   ───────────────────────────────────────────── */
type HeroView = "home" | "platform";

function HeroToggle({
  view,
  setView,
  dark = false,
}: {
  view: HeroView;
  setView: (v: HeroView) => void;
  dark?: boolean;
}) {
  const baseText = dark ? "text-white/55" : "text-navy/55";
  const activeBg = dark ? "bg-white/10 text-white" : "bg-navy/90 text-cream";
  const border = dark ? "border-white/15" : "border-navy/12";

  return (
    <div
      className={`inline-flex items-center gap-0 rounded-full border ${border} p-0.5 font-mono text-[10px] uppercase tracking-[0.18em] backdrop-blur-sm`}
      role="tablist"
      aria-label="Hero view"
    >
      <button
        type="button"
        role="tab"
        aria-selected={view === "home"}
        onClick={() => setView("home")}
        className={`px-3 py-1.5 rounded-full transition-colors ${
          view === "home" ? activeBg : `${baseText} hover:opacity-100`
        }`}
      >
        Home
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={view === "platform"}
        onClick={() => setView("platform")}
        className={`px-3 py-1.5 rounded-full transition-colors ${
          view === "platform" ? activeBg : `${baseText} hover:opacity-100`
        }`}
      >
        Platform
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Top-right nav: CEO · Contact · Request Demo · Toggle
   Theme-aware; rendered inside each hero variant.
   ───────────────────────────────────────────── */
function HeroTopNav({
  view,
  setView,
  dark = false,
  onRequestDemo,
  onContact,
}: {
  view: HeroView;
  setView: (v: HeroView) => void;
  dark?: boolean;
  onRequestDemo: () => void;
  onContact: () => void;
}) {
  const linkBase = dark
    ? "text-white/70 hover:text-white"
    : "text-navy/70 hover:text-navy";
  const demoBase = dark
    ? "border-white/20 text-white hover:bg-white/10"
    : "border-navy/15 text-navy hover:bg-navy/[0.04]";

  return (
    <div className="absolute top-6 right-6 sm:top-8 sm:right-8 lg:top-10 lg:right-12 z-40 flex items-center gap-3 sm:gap-4">
      <Link
        href="/ceo-and-founder"
        className={`hidden md:inline-flex text-[12px] font-medium tracking-wide transition-colors ${linkBase}`}
      >
        CEO &amp; Founder
      </Link>
      <button
        type="button"
        onClick={onContact}
        className={`hidden sm:inline-flex text-[12px] font-medium tracking-wide transition-colors ${linkBase}`}
      >
        Contact
      </button>
      <button
        type="button"
        onClick={onRequestDemo}
        className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12px] font-semibold tracking-wide transition-colors ${demoBase}`}
      >
        Request Demo
        <ArrowRight className="w-3 h-3" />
      </button>
      <HeroToggle view={view} setView={setView} dark={dark} />
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════════
   PAGE
   ═════════════════════════════════════════════════════════════════ */
export default function Home() {
  const [view, setView] = useState<HeroView>("home");
  const [demoOpen, setDemoOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const openDemo = () => setDemoOpen(true);
  const openContact = () => setContactOpen(true);

  return (
    <>
      <main className="overflow-x-hidden">
        {/* ═══════════════════════════════════════════
            SECTION 1 — HERO (with view toggle)
            ═══════════════════════════════════════════ */}
        <div key={view}>
          {view === "home" ? (
            <HeroHome
              view={view}
              setView={setView}
              onRequestDemo={openDemo}
              onContact={openContact}
            />
          ) : (
            <HeroPlatform
              view={view}
              setView={setView}
              onRequestDemo={openDemo}
              onContact={openContact}
            />
          )}
        </div>

        {/* ═══════════════════════════════════════════
            SECTION 2 — THE PROBLEM
            ═══════════════════════════════════════════ */}
        <section
          id="problem"
          className="relative py-24 md:py-32 lg:py-36 px-8 sm:px-12 md:px-16 lg:px-24 bg-cream"
        >
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <p className="text-[11px] font-semibold tracking-[0.3em] text-orange uppercase mb-5">
                The Problem
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-serif text-[32px] sm:text-[40px] md:text-[44px] lg:text-[48px] leading-[1.1] text-navy mb-16 max-w-3xl">
                25 Years of Dispersed Intelligence.
                <br />
                No One Owns the <em>Outcome.</em>
              </h2>
            </Reveal>

            {/* Silo cards — equal icon↔title spacing (flex gap, no justify-between) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-4">
              {silos.map((silo, i) => {
                const Icon = silo.icon;
                return (
                  <Reveal key={silo.label} delay={200 + i * 120}>
                    <div className="relative bg-white rounded-xl p-7 pb-7 min-h-[220px] lg:min-h-[240px] flex flex-col border border-black/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
                      <div
                        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl"
                        style={{ backgroundColor: silo.color }}
                      />
                      <div
                        className="w-11 h-11 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: silo.color + "10" }}
                      >
                        <Icon
                          className="w-5 h-5"
                          style={{ color: silo.color }}
                          strokeWidth={1.8}
                        />
                      </div>
                      <div className="mt-5">
                        <p className="font-semibold text-navy text-[17px] mb-2 leading-tight">
                          {silo.label}
                        </p>
                        <p className="text-text-secondary text-[14px] leading-relaxed">
                          {silo.line}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 3 — THE IMPERATIVE
            ═══════════════════════════════════════════ */}
        <section className="relative py-24 md:py-32 lg:py-40 px-8 sm:px-12 md:px-16 lg:px-24 bg-navy overflow-hidden">
          <div className="absolute top-0 left-8 sm:left-12 md:left-16 lg:left-24 w-[3px] h-20 bg-orange" />

          <div className="max-w-4xl mx-auto">
            <Reveal>
              <p className="text-[11px] font-semibold tracking-[0.3em] text-orange uppercase mb-6">
                The Imperative
              </p>
            </Reveal>

            <Reveal delay={150}>
              <h2 className="font-serif text-[32px] sm:text-[40px] md:text-[48px] lg:text-[54px] leading-[1.08] text-white mb-10 max-w-3xl">
                This Isn&apos;t a Data Problem.
                <br />
                It&apos;s a <em className="text-orange">Decision</em> Problem.
              </h2>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-[17px] md:text-lg text-white/55 leading-relaxed max-w-2xl">
                $250 billion spent annually on enterprise transformation.
                70&ndash;88% of programs fail to achieve their stated goals.
                $1.6 trillion wasted every year. The systems were never built
                to help leaders make connected, real-time decisions across the
                business.
              </p>
            </Reveal>
          </div>

          <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-orange/[0.03] blur-3xl" />
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 4 — THE SOLUTION
            ═══════════════════════════════════════════ */}
        <section className="relative py-24 md:py-32 lg:py-36 px-8 sm:px-12 md:px-16 lg:px-24 bg-warm-white">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <p className="text-[11px] font-semibold tracking-[0.3em] text-orange uppercase mb-5">
                The Solution
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-serif text-[32px] sm:text-[40px] md:text-[46px] lg:text-[52px] leading-[1.08] text-navy mb-5">
                The Industrial AI
                <br />
                Operating <em>Platform.</em>
              </h2>
            </Reveal>

            <Reveal delay={180}>
              <p className="font-mono text-[11px] sm:text-xs tracking-[0.24em] uppercase text-orange/90 mb-8">
                Continuous Horizontal Intelligence
              </p>
            </Reveal>

            <Reveal delay={250}>
              <p className="text-base md:text-[17px] text-text-secondary leading-relaxed max-w-xl mx-auto mb-20">
                Lumiom is the first platform that reassembles your enterprise
                intelligence&nbsp;&mdash; continuous, horizontal, and
                outcome-linked. Not another consultant. Not another vendor.
                The first partner fully accountable for transformation
                outcomes.
              </p>
            </Reveal>

            {/* ── System diagram ── */}
            <Reveal delay={350}>
              <div className="flex flex-col items-center">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full max-w-[620px]">
                  {functions.map((name) => (
                    <div
                      key={name}
                      className="py-4 px-3 bg-white rounded-lg text-sm font-semibold text-navy border border-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                    >
                      {name}
                    </div>
                  ))}
                </div>

                <svg
                  viewBox="0 0 620 32"
                  className="hidden lg:block w-full max-w-[620px] h-8 text-navy/12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <line x1="78" y1="0" x2="310" y2="32" />
                  <line x1="233" y1="0" x2="310" y2="32" />
                  <line x1="388" y1="0" x2="310" y2="32" />
                  <line x1="543" y1="0" x2="310" y2="32" />
                </svg>
                <div className="lg:hidden flex justify-center">
                  <div className="w-px h-8 bg-navy/12" />
                </div>

                <div className="w-full max-w-md py-5 px-6 bg-navy text-white rounded-xl font-semibold text-[15px] md:text-base ring-2 ring-orange/20 shadow-[0_4px_32px_rgba(15,23,41,0.25)]">
                  Lumiom &middot; Continuous Horizontal Intelligence
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-px h-7 bg-orange/30" />
                  <ArrowDown className="w-4 h-4 text-orange -mt-0.5" />
                </div>

                <div className="py-5 px-8 bg-orange/[0.05] border border-orange/12 rounded-xl max-w-xs mt-1">
                  <p className="font-semibold text-navy text-[15px]">
                    Measurable Outcomes
                  </p>
                  <p className="text-sm text-text-secondary mt-1">
                    We only win when you win.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* End CTA — Request Demo, orange, prominent */}
            <Reveal delay={450}>
              <div className="mt-20">
                <button
                  type="button"
                  onClick={openDemo}
                  className="inline-flex items-center gap-2.5 px-9 py-4 bg-orange text-white text-[16px] font-semibold rounded-lg hover:bg-orange-light transition-all duration-300 shadow-[0_4px_24px_rgba(232,108,58,0.32)] hover:shadow-[0_6px_32px_rgba(232,108,58,0.45)] hover:-translate-y-px"
                >
                  Request a Demo
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 5 — TESTIMONIAL PLACEHOLDER
            ═══════════════════════════════════════════ */}
        <section className="relative py-20 md:py-24 lg:py-28 px-8 sm:px-12 md:px-16 lg:px-24 bg-cream">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="relative rounded-2xl border border-dashed border-navy/15 bg-white/60 p-8 md:p-10">
                <span className="absolute top-4 right-4 inline-flex items-center gap-2 rounded-full border border-orange/30 bg-orange/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-orange">
                  <span className="h-1 w-1 rounded-full bg-orange" />
                  Testimonials
                  <span className="h-1 w-1 rounded-full bg-orange" />
                </span>

                <p className="font-mono text-[11px] tracking-[0.28em] text-navy/40 uppercase mb-5">
                  Early Partner
                </p>

                <blockquote className="font-serif text-[22px] sm:text-[26px] md:text-[28px] leading-[1.3] text-navy/85 italic">
                  &ldquo;Lumiom helped me build the first AI strategy for my
                  enterprise&nbsp;&mdash; and we are now piloting v1 of the
                  Lumiom platform together.&rdquo;
                </blockquote>

                <div className="mt-6">
                  <p className="text-[15px] font-semibold text-navy/45">
                    [ Name &mdash; pending approval ]
                  </p>
                  <p className="text-[13px] text-navy/35 mt-0.5">
                    [ Title &middot; Organization &mdash; pending approval ]
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            FOOTER
            ═══════════════════════════════════════════ */}
        <footer className="py-10 px-8 sm:px-12 md:px-16 lg:px-24 bg-navy">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-white/30 text-sm">
              &copy; 2026 Lumiom AI. All rights reserved.
            </p>
            <div className="flex items-center gap-5 text-[13px]">
              <Link
                href="/ceo-and-founder"
                className="text-white/55 hover:text-white transition-colors"
              >
                CEO &amp; Founder
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

/* ═════════════════════════════════════════════════════════════════
   HERO VIEW A — HOME (editorial perspective)
   — Unified wordmark (no PNG), no Mamatha eyebrow, orange-line-only
     quote graphic, animated image area.
   ═════════════════════════════════════════════════════════════════ */
function HeroHome({
  view,
  setView,
  onRequestDemo,
  onContact,
}: {
  view: HeroView;
  setView: (v: HeroView) => void;
  onRequestDemo: () => void;
  onContact: () => void;
}) {
  return (
    <section className="relative min-h-screen grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]">
      <HeroTopNav
        view={view}
        setView={setView}
        dark={false}
        onRequestDemo={onRequestDemo}
        onContact={onContact}
      />

      <div className="hero-accent absolute left-0 top-0 bottom-0 w-[3px] bg-orange z-20 hidden lg:block" />

      {/* ── Left panel: Copy ── */}
      <div className="relative z-10 flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-24 py-32 lg:py-24 order-2 lg:order-1 bg-cream">
        {/* Wordmark + positioning tagline (unified with Platform view) */}
        <div className="hero-logo absolute top-8 left-8 sm:left-12 md:left-16 lg:left-24">
          <Wordmark variant="light" />
          <p className="mt-2 font-mono text-[10px] tracking-[0.24em] uppercase text-navy/55">
            Industrial AI Operating Platform
          </p>
        </div>

        {/* Eyebrow "A perspective by..." REMOVED per feedback #7 */}

        {/* Headline — bold + italic contrast (feedback #5) */}
        <h1 className="hero-headline font-serif text-[36px] sm:text-[44px] md:text-[52px] lg:text-[60px] leading-[1.05] text-navy mb-7 mt-8">
          The Way Companies
          <br className="hidden sm:block" /> Make{" "}
          <strong className="font-bold">Decisions</strong>
          <br className="hidden sm:block" /> Is <em>Broken</em>
        </h1>

        <p className="hero-subhead text-base md:text-[17px] text-text-secondary leading-relaxed max-w-md mb-10">
          $1.6 trillion lost annually to failed transformations. 70&ndash;88%
          of programs never deliver. A perspective on why&nbsp;&mdash; and
          what needs to change.
        </p>

        <div className="hero-ctas flex flex-col sm:flex-row gap-3">
          <a
            href="#problem"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-orange text-white text-[15px] font-semibold rounded-lg hover:bg-orange-light transition-all duration-300 shadow-[0_2px_16px_rgba(232,108,58,0.25)] hover:shadow-[0_4px_24px_rgba(232,108,58,0.35)] hover:-translate-y-px"
          >
            Read the Perspective
            <ArrowDown className="w-4 h-4" />
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-navy/10 text-navy text-[15px] font-semibold rounded-lg hover:bg-navy/[0.03] transition-all duration-300"
          >
            <Play className="w-4 h-4" />
            Watch 2-Min Brief
          </a>
        </div>
      </div>

      {/* ── Right panel: Network-nodes image + Quote ── */}
      <div className="relative order-1 lg:order-2 flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-16 xl:px-20 py-16 lg:py-24 bg-cream overflow-hidden">
        {/* Ambient drifting circle behind image */}
        <div className="hero-ambient-drift absolute -right-16 top-[10%] w-[240px] h-[240px] rounded-full bg-orange/[0.08] hidden lg:block pointer-events-none" />

        {/* Second ambient glow, softer, lower */}
        <div className="hero-ambient-pulse absolute -left-16 bottom-[18%] w-[180px] h-[180px] rounded-full bg-orange/[0.05] blur-2xl pointer-events-none hidden lg:block" />

        <div className="hero-photo relative flex flex-col items-start gap-10 max-w-lg lg:max-w-xl">
          {/* Network-nodes image — gently floating */}
          <div className="hero-image-float relative w-full aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden bg-white/50 ring-1 ring-navy/[0.06]">
            <Image
              src="/hero-network-nodes.jpg"
              alt="Dispersed intelligence, connected"
              fill
              className="object-cover mix-blend-multiply"
              sizes="(min-width: 1024px) 40vw, 90vw"
              priority
            />
            {/* Subtle animated inner glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-orange/[0.05] pointer-events-none" />
          </div>

          {/* Quote + attribution — orange line only (no decorative " per feedback #9) */}
          <div className="relative flex flex-col gap-5 w-full">
            <div className="w-10 h-[3px] bg-orange rounded-full" />
            <blockquote className="font-serif text-[24px] sm:text-[28px] lg:text-[30px] leading-[1.3] text-navy/80 italic">
              &ldquo;Industrial enterprises have spent 25 years dispersing
              their intelligence&nbsp;&mdash; to consultants, integrators, and
              outsourcers. They hold the bill. They don&apos;t own the
              intelligence. They don&apos;t always see results.&rdquo;
            </blockquote>
            <div className="pt-1">
              <p className="text-[16px] font-semibold text-navy">
                Mamatha Chamarthi
              </p>
              <p className="text-[13px] text-text-secondary mt-0.5">
                Founder &amp; CEO, Lumiom AI
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grain absolute inset-0 pointer-events-none z-[15]" />
    </section>
  );
}

/* ═════════════════════════════════════════════════════════════════
   HERO VIEW B — PLATFORM (operator-console aesthetic)
   Unified wordmark on top-left (matches Home).
   ═════════════════════════════════════════════════════════════════ */
function HeroPlatform({
  view,
  setView,
  onRequestDemo,
  onContact,
}: {
  view: HeroView;
  setView: (v: HeroView) => void;
  onRequestDemo: () => void;
  onContact: () => void;
}) {
  return (
    <section className="relative min-h-screen bg-navy overflow-hidden flex flex-col justify-center">
      <div className="platform-grid-bg absolute inset-0 pointer-events-none" />
      <div className="absolute -top-40 -right-32 w-[680px] h-[680px] rounded-full bg-orange/[0.06] blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[680px] h-[680px] rounded-full bg-navy-light/60 blur-[140px] pointer-events-none" />

      <HeroTopNav
        view={view}
        setView={setView}
        dark={true}
        onRequestDemo={onRequestDemo}
        onContact={onContact}
      />

      {/* Wordmark (top-left) — same treatment as Home, dark variant */}
      <div className="platform-kicker absolute top-8 left-8 sm:left-12 md:left-16 lg:left-24">
        <Wordmark variant="dark" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full px-8 sm:px-12 md:px-16 lg:px-24 py-32 lg:py-20">
        <div className="platform-kicker flex items-center gap-3 mb-10">
          <span className="h-1.5 w-1.5 rounded-full bg-orange live-dot" />
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-orange/85">
            MMXXVI · The Platform
          </span>
          <span className="hidden sm:inline-block flex-1 h-px bg-white/10 max-w-[180px]" />
        </div>

        <h1 className="platform-headline font-serif text-[42px] sm:text-[60px] md:text-[76px] lg:text-[92px] leading-[0.98] text-white mb-8 max-w-4xl">
          The Industrial AI
          <br />
          Operating <em className="text-orange">Platform.</em>
        </h1>

        <p className="platform-subhead text-[16px] sm:text-[18px] md:text-[20px] text-white/65 leading-[1.55] max-w-xl mb-12">
          Continuous horizontal intelligence that never leaves your
          enterprise. The first partner fully accountable for transformation
          outcomes.
        </p>

        <div className="platform-ctas flex flex-col sm:flex-row gap-3 mb-20">
          <button
            type="button"
            onClick={onRequestDemo}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-orange text-white text-[15px] font-semibold rounded-lg hover:bg-orange-light transition-all duration-300 shadow-[0_2px_24px_rgba(232,108,58,0.3)] hover:shadow-[0_4px_32px_rgba(232,108,58,0.45)] hover:-translate-y-px"
          >
            Request a Demo
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="#problem"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/15 text-white/90 text-[15px] font-semibold rounded-lg hover:bg-white/[0.04] hover:border-white/25 transition-all duration-300"
          >
            <ArrowDown className="w-4 h-4" />
            Read the Thesis
          </a>
        </div>

        <div className="platform-ticker relative mt-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-orange/50" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/45">
              Operating Layer · Live
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 rounded-xl overflow-hidden border border-white/10">
            {functions.map((name, i) => (
              <div
                key={name}
                className="relative bg-navy-light/40 backdrop-blur-sm px-4 py-5 sm:py-6 flex items-center justify-between"
              >
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/75">
                  {name}
                </span>
                <span
                  className="h-1.5 w-1.5 rounded-full bg-orange live-dot"
                  style={{ animationDelay: `${i * 0.25}s` }}
                />
              </div>
            ))}
          </div>

          <div className="mt-px rounded-b-xl border-x border-b border-white/10 bg-gradient-to-r from-orange/[0.08] via-white/[0.02] to-orange/[0.08] px-5 py-4 flex items-center justify-between">
            <span className="font-mono text-[11px] tracking-[0.28em] uppercase text-orange">
              Lumiom · Continuous Horizontal Intelligence
            </span>
            <span className="hidden sm:inline-block font-mono text-[10px] tracking-[0.2em] uppercase text-white/40">
              4 domains / 1 platform
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
