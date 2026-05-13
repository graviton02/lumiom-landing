"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Activity,
  Eye,
  RefreshCw,
  Target,
  Layers,
  Users,
  TrendingUp,
  Gauge,
  Box,
  Compass,
  Database,
  HelpCircle,
  AlertCircle,
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
const problemCallouts = [
  {
    icon: Database,
    title: "Data without context.",
    body: "Every system has its own view. None has the whole picture.",
  },
  {
    icon: HelpCircle,
    title: "Insight without ownership.",
    body: "Intelligence produced, presented — then lost to the next slide deck.",
  },
  {
    icon: AlertCircle,
    title: "Action without accountability.",
    body: "Decisions made in silos. Outcomes no one owns.",
  },
];

const differentiators = [
  {
    icon: Activity,
    title: "Living Enterprise System Model",
    body: "A continuous, contextual model of how your business actually runs — not a static map.",
  },
  {
    icon: Eye,
    title: "Enterprise-Wide Visibility",
    body: "One connected view across financial, operational, and commercial performance.",
  },
  {
    icon: RefreshCw,
    title: "Harvest-to-Invest Modernization Flywheel",
    body: "Self-funding transformation. Savings harvested in one cycle fund the next.",
  },
  {
    icon: Target,
    title: "AI Applied Only Where It Improves the P&L",
    body: "No experiments. AI is deployed against measurable financial outcomes — or not at all.",
  },
  {
    icon: Layers,
    title: "Compounding Organizational Knowledge",
    body: "Intelligence stays inside your enterprise and gets sharper with every decision.",
  },
  {
    icon: Users,
    title: "Built by Experienced Enterprise Operators",
    body: "Designed by people who have run global businesses — not built one for tech-buyers.",
  },
];

const methodology = [
  {
    title: "Absorb",
    body: "Connect systems into a contextual enterprise graph.",
  },
  {
    title: "Continuous Intelligence",
    body: "Identify hidden risks and opportunities in real time.",
  },
  {
    title: "Rationalize, Optimize & Modernize",
    body: "Harvest savings and reinvest strategically.",
  },
  {
    title: "Execute",
    body: "Drive operational and organizational action.",
  },
  {
    title: "Value Realization",
    body: "Deliver measurable business outcomes.",
  },
];

const valueLevers = [
  {
    icon: TrendingUp,
    title: "Revenue Growth",
    body: "Invest toward scalable growth, not scattered bets.",
  },
  {
    icon: Gauge,
    title: "Operating Margin",
    body: "Reduce friction and waste across the operating model.",
  },
  {
    icon: Box,
    title: "Asset Efficiency",
    body: "Improve utilization of technology, process, and people.",
  },
  {
    icon: Compass,
    title: "Strategic Prioritization",
    body: "Evidence-based decisions. Stronger board narratives.",
  },
];

/* ─────────────────────────────────────────────
   Unified wordmark
   ───────────────────────────────────────────── */
function Wordmark() {
  return (
    <Image
      src="/lumiom-ai-logo.png"
      alt="Lumiom AI"
      width={150}
      height={38}
      priority
    />
  );
}

/* ─────────────────────────────────────────────
   Top-right nav
   ───────────────────────────────────────────── */
function TopNav({
  onRequestDemo,
  onContact,
}: {
  onRequestDemo: () => void;
  onContact: () => void;
}) {
  return (
    <div className="absolute top-6 right-6 sm:top-8 sm:right-8 lg:top-10 lg:right-12 z-40 flex items-center gap-3 sm:gap-4">
      <Link
        href="/ceo-and-founder"
        className="hidden md:inline-flex text-[12px] font-medium tracking-wide text-navy/70 hover:text-navy transition-colors"
      >
        CEO &amp; Founder
      </Link>
      <button
        type="button"
        onClick={onContact}
        className="hidden sm:inline-flex text-[12px] font-medium tracking-wide text-navy/70 hover:text-navy transition-colors"
      >
        Contact
      </button>
      <button
        type="button"
        onClick={onRequestDemo}
        className="inline-flex items-center gap-1.5 rounded-full border border-navy/15 px-3.5 py-1.5 text-[12px] font-semibold tracking-wide text-navy hover:bg-navy/[0.04] transition-colors"
      >
        Request Demo
        <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════════
   PAGE
   ═════════════════════════════════════════════════════════════════ */
export default function Home() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const openDemo = () => setDemoOpen(true);
  const openContact = () => setContactOpen(true);

  return (
    <>
      <main className="overflow-x-hidden">
        {/* ═══════════════════════════════════════════
            SECTION 1 — HERO (unified, declarative)
            ═══════════════════════════════════════════ */}
        <section className="relative min-h-screen grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]">
          <TopNav onRequestDemo={openDemo} onContact={openContact} />

          <div className="hero-accent absolute left-0 top-0 bottom-0 w-[3px] bg-orange z-20 hidden lg:block" />

          {/* Left panel */}
          <div className="relative z-10 flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-24 py-32 lg:py-24 order-2 lg:order-1 bg-cream">
            <div className="hero-logo absolute top-8 left-8 sm:left-12 md:left-16 lg:left-24">
              <Wordmark />
              <p className="mt-2 font-mono text-[10px] tracking-[0.24em] uppercase text-navy/55">
                Enterprise Intelligence Platform
              </p>
            </div>

            <p className="hero-eyebrow font-mono text-[11px] font-semibold tracking-[0.3em] text-orange uppercase mb-6 mt-8">
              A New Category
            </p>

            <h1 className="hero-headline font-serif text-[40px] sm:text-[52px] md:text-[60px] lg:text-[68px] leading-[1.02] text-navy mb-7">
              The Enterprise
              <br className="hidden sm:block" /> Intelligence{" "}
              <em>Platform.</em>
            </h1>

            <p className="hero-subhead text-base md:text-[17px] text-text-secondary leading-relaxed max-w-md mb-10">
              Lumiom reads your business as one connected system —
              translating enterprise signals into decisions, execution, and
              measurable P&amp;L outcomes. Built by operators, for operators.
            </p>

            <div className="hero-ctas flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={openDemo}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-orange text-white text-[15px] font-semibold rounded-lg hover:bg-orange-light transition-all duration-300 shadow-[0_2px_16px_rgba(232,108,58,0.25)] hover:shadow-[0_4px_24px_rgba(232,108,58,0.35)] hover:-translate-y-px"
              >
                Request a Demo Customized to Your Enterprise
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#problem"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-navy/10 text-navy text-[15px] font-semibold rounded-lg hover:bg-navy/[0.03] transition-all duration-300"
              >
                <ArrowDown className="w-4 h-4" />
                Point of View
              </a>
            </div>
          </div>

          {/* Right panel — Mamatha photo + quote */}
          <div className="relative order-1 lg:order-2 flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-16 xl:px-20 py-16 lg:py-24 bg-cream overflow-hidden">
            <div className="hero-ambient-drift absolute -right-16 top-[10%] w-[240px] h-[240px] rounded-full bg-orange/[0.08] hidden lg:block pointer-events-none" />
            <div className="hero-ambient-pulse absolute -left-16 bottom-[18%] w-[180px] h-[180px] rounded-full bg-orange/[0.05] blur-2xl pointer-events-none hidden lg:block" />

            <div className="hero-photo relative flex flex-col items-start gap-5 max-w-lg lg:max-w-xl">
              <div className="hero-image-float relative w-[70%] aspect-square rounded-2xl overflow-hidden bg-white/50 ring-1 ring-navy/[0.06]">
                <Image
                  src="/chamarthi-mamatha.jpg"
                  alt="Mamatha Chamarthi, Founder & CEO, Lumiom AI"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 28vw, 65vw"
                  priority
                />
              </div>

              <div className="relative flex flex-col gap-5 w-full">
                <div className="w-10 h-[3px] bg-orange rounded-full" />
                <blockquote className="font-serif text-[22px] sm:text-[26px] lg:text-[28px] leading-[1.32] text-navy/82 italic">
                  &ldquo;Most companies still approach AI as experimentation.
                  We built Lumiom to make transformation measurable,
                  self-funding, and continuous — directly connected to
                  P&amp;L outcomes.&rdquo;
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
              <h2 className="font-serif text-[32px] sm:text-[40px] md:text-[44px] lg:text-[48px] leading-[1.1] text-navy mb-7 max-w-3xl">
                Fragmented Systems. Disconnected Data.
                <br />
                Siloed <em>Decisions.</em>
              </h2>
            </Reveal>

            <Reveal delay={180}>
              <p className="text-[17px] md:text-lg text-text-secondary leading-relaxed max-w-2xl mb-16">
                Enterprises operate through fragmented systems, disconnected
                data, and siloed decision-making. Transformation efforts
                don&apos;t fail from lack of ambition or talent — they fail
                because organizations lack continuous visibility, coordinated
                execution, and measurable accountability. The problem is
                structural.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="relative w-full aspect-[16/9] rounded-2xl bg-white border border-black/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.03)] mb-12 overflow-hidden">
                <Image
                  src="/lumiom-problem-diagram.png"
                  alt="The fragmented enterprise: five operating systems on the bottom, board-view outcomes on the top, with the enterprise intelligence layer missing in between."
                  fill
                  className="object-contain"
                  sizes="(min-width: 1024px) 1000px, 90vw"
                />
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
              {problemCallouts.map((c, i) => {
                const Icon = c.icon;
                return (
                  <Reveal key={c.title} delay={340 + i * 120}>
                    <div className="relative bg-white rounded-xl p-7 h-full flex flex-col border border-black/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
                      <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-orange/[0.08] mb-5">
                        <Icon
                          className="w-5 h-5 text-orange"
                          strokeWidth={1.8}
                        />
                      </div>
                      <p className="font-semibold text-navy text-[17px] mb-2 leading-tight">
                        {c.title}
                      </p>
                      <p className="text-text-secondary text-[14px] leading-relaxed">
                        {c.body}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 3 — THE IMPERATIVE (stat block)
            ═══════════════════════════════════════════ */}
        <section className="relative py-24 md:py-32 lg:py-40 px-8 sm:px-12 md:px-16 lg:px-24 bg-navy overflow-hidden">
          <div className="absolute top-0 left-8 sm:left-12 md:left-16 lg:left-24 w-[3px] h-20 bg-orange" />

          <div className="max-w-5xl mx-auto">
            <Reveal>
              <p className="text-[11px] font-semibold tracking-[0.3em] text-orange uppercase mb-6">
                The Imperative
              </p>
            </Reveal>

            <Reveal delay={150}>
              <h2 className="font-serif text-[32px] sm:text-[40px] md:text-[48px] lg:text-[54px] leading-[1.08] text-white mb-14 max-w-3xl">
                This Isn&apos;t a Data Problem.
                <br />
                It&apos;s a <em className="text-orange">Decision</em> Problem.
              </h2>
            </Reveal>

            {/* Stat block */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10 mb-12">
              {[
                {
                  num: "$250B",
                  label: "spent annually on enterprise transformation",
                },
                {
                  num: "70–88%",
                  label: "of transformation programs fail to deliver stated goals",
                },
                {
                  num: "$1.6T",
                  label: "lost in enterprise value every year",
                },
              ].map((s, i) => (
                <Reveal key={s.num} delay={300 + i * 120}>
                  <div className="bg-navy-light/40 backdrop-blur-sm p-8 md:p-10 h-full">
                    <p className="font-serif text-[44px] md:text-[56px] lg:text-[64px] leading-none text-white mb-4">
                      {s.num}
                    </p>
                    <p className="text-[14px] md:text-[15px] text-white/55 leading-relaxed">
                      {s.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={650}>
              <p className="text-[17px] md:text-lg text-white/55 leading-relaxed max-w-2xl">
                The systems were never built to help leaders make connected,
                real-time decisions across the business.
              </p>
            </Reveal>
          </div>

          <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-orange/[0.03] blur-3xl" />
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 4 — WHY LUMIOM (6 differentiators)
            ═══════════════════════════════════════════ */}
        <section className="relative py-24 md:py-32 lg:py-36 px-8 sm:px-12 md:px-16 lg:px-24 bg-warm-white">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <p className="text-[11px] font-semibold tracking-[0.3em] text-orange uppercase mb-5">
                Why Lumiom
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-serif text-[32px] sm:text-[40px] md:text-[44px] lg:text-[48px] leading-[1.1] text-navy mb-16 max-w-3xl">
                Six Things No Stack
                <br />
                Has Done <em>Together.</em>
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {differentiators.map((d, i) => {
                const Icon = d.icon;
                return (
                  <Reveal key={d.title} delay={200 + i * 90}>
                    <div className="relative bg-white rounded-xl p-7 h-full flex flex-col border border-black/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
                      <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-orange/[0.08] mb-5">
                        <Icon
                          className="w-5 h-5 text-orange"
                          strokeWidth={1.8}
                        />
                      </div>
                      <p className="font-semibold text-navy text-[17px] mb-3 leading-tight">
                        {d.title}
                      </p>
                      <p className="text-text-secondary text-[14px] leading-relaxed">
                        {d.body}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 5 — THE RADICAL SHIFT
            ═══════════════════════════════════════════ */}
        <section className="relative py-24 md:py-32 lg:py-36 px-8 sm:px-12 md:px-16 lg:px-24 bg-cream">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <p className="text-[11px] font-semibold tracking-[0.3em] text-orange uppercase mb-5">
                The Radical Shift
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-serif text-[32px] sm:text-[40px] md:text-[46px] lg:text-[52px] leading-[1.08] text-navy mb-8">
                Beyond Dashboards.
                <br />
                Beyond <em>Reports.</em>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-base md:text-[17px] text-text-secondary leading-relaxed max-w-xl mx-auto mb-8">
                The future enterprise moves past static dashboards and
                periodic reporting. Lumiom is a living, always-on intelligence
                system that continuously connects insight, decisions, and
                execution in real time — so organizations can act faster,
                align better, and modernize continuously.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <p className="font-mono text-[11px] sm:text-xs tracking-[0.28em] uppercase text-orange/90">
                Continuous · Horizontal · Outcome-Linked
              </p>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 6 — THE METHODOLOGY (diagram + 5 steps)
            ═══════════════════════════════════════════ */}
        <section className="relative py-24 md:py-32 lg:py-36 px-8 sm:px-12 md:px-16 lg:px-24 bg-warm-white">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <p className="text-[11px] font-semibold tracking-[0.3em] text-orange uppercase mb-5">
                The Methodology
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-serif text-[32px] sm:text-[40px] md:text-[44px] lg:text-[48px] leading-[1.1] text-navy mb-7 max-w-3xl">
                Five Steps.
                <br />
                One <em>Continuous</em> Loop.
              </h2>
            </Reveal>

            <Reveal delay={180}>
              <p className="text-[17px] md:text-lg text-text-secondary leading-relaxed max-w-2xl mb-14">
                Lumiom runs as a continuous loop across your enterprise —
                absorbing signal, surfacing intelligence, modernizing
                operations, executing change, and realizing value.
              </p>
            </Reveal>

            <Reveal delay={260}>
              <div className="relative w-full aspect-[16/9] rounded-2xl bg-white border border-black/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.03)] mb-12 overflow-hidden">
                <Image
                  src="/lumiom-methodology-loop.png"
                  alt="The Lumiom five-step continuous methodology loop: Absorb, Continuous Intelligence, Rationalize Optimize and Modernize, Execute, Value Realization."
                  fill
                  className="object-contain"
                  sizes="(min-width: 1024px) 1000px, 90vw"
                />
              </div>
            </Reveal>

            {/* ── 5-step legend ── */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {methodology.map((step, i) => (
                <Reveal key={step.title} delay={340 + i * 90}>
                  <div className="bg-white rounded-xl p-5 h-full border border-black/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
                    <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-orange mb-3">
                      Step {i + 1}
                    </p>
                    <p className="font-semibold text-navy text-[15px] mb-2 leading-tight">
                      {step.title}
                    </p>
                    <p className="text-text-secondary text-[13px] leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 7 — VALUE ACCELERATION (4 P&L levers)
            ═══════════════════════════════════════════ */}
        <section className="relative py-24 md:py-32 lg:py-36 px-8 sm:px-12 md:px-16 lg:px-24 bg-navy overflow-hidden">
          <div className="absolute top-0 left-8 sm:left-12 md:left-16 lg:left-24 w-[3px] h-20 bg-orange" />

          <div className="max-w-6xl mx-auto">
            <Reveal>
              <p className="text-[11px] font-semibold tracking-[0.3em] text-orange uppercase mb-6">
                Value Acceleration
              </p>
            </Reveal>

            <Reveal delay={150}>
              <h2 className="font-serif text-[32px] sm:text-[40px] md:text-[46px] lg:text-[52px] leading-[1.08] text-white mb-14 max-w-3xl">
                Four Levers.
                <br />
                One <em className="text-orange">P&amp;L.</em>
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {valueLevers.map((lever, i) => {
                const Icon = lever.icon;
                return (
                  <Reveal key={lever.title} delay={250 + i * 100}>
                    <div className="relative bg-navy-light/40 backdrop-blur-sm rounded-xl p-7 h-full border border-white/[0.08]">
                      <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-orange/[0.12] mb-5">
                        <Icon
                          className="w-5 h-5 text-orange"
                          strokeWidth={1.8}
                        />
                      </div>
                      <p className="font-semibold text-white text-[17px] mb-3 leading-tight">
                        {lever.title}
                      </p>
                      <p className="text-white/55 text-[14px] leading-relaxed">
                        {lever.body}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 9 — FINAL CTA
            ═══════════════════════════════════════════ */}
        <section className="relative py-24 md:py-28 px-8 sm:px-12 md:px-16 lg:px-24 bg-warm-white">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-orange mb-5">
                What&apos;s Next
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-serif text-[32px] sm:text-[40px] md:text-[44px] leading-[1.1] text-navy mb-6">
                See Lumiom Mapped to <em>Your</em> Enterprise.
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[16px] text-text-secondary leading-relaxed max-w-xl mx-auto mb-10">
                Your systems. Your P&amp;L. One connected operating model.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <button
                type="button"
                onClick={openDemo}
                className="inline-flex items-center gap-2.5 px-9 py-4 bg-orange text-white text-[16px] font-semibold rounded-lg hover:bg-orange-light transition-all duration-300 shadow-[0_4px_24px_rgba(232,108,58,0.32)] hover:shadow-[0_6px_32px_rgba(232,108,58,0.45)] hover:-translate-y-px"
              >
                Request a Demo
                <ArrowRight className="w-4 h-4" />
              </button>
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
