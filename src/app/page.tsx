"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Play, ArrowDown, ArrowRight, Lightbulb, Blocks, Globe, Server, Building2 } from "lucide-react";

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
  { label: "Strategy Consultants", line: "Intelligence built, presented — then leaves.", color: "#E86C3A", icon: Lightbulb },
  { label: "System Integrators", line: "Transformation knowledge lives in their methodology, not yours.", color: "#8B6CC1", icon: Blocks },
  { label: "BPO & Outsourcing", line: "Process execution knowledge dispersed to offshore centers.", color: "#4A7DC7", icon: Globe },
  { label: "IT Services", line: "Systems knowledge held by the outsourcer, not the owner.", color: "#2A9D8F", icon: Server },
  { label: "The Enterprise", line: "Holds the bill. Doesn't own the intelligence. Calls them again.", color: "#0F1729", icon: Building2 },
];

const functions = ["Operations", "Supply Chain", "Finance", "Commercial"];

/* ═════════════════════════════════════════════════════════════════
   PAGE
   ═════════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <main className="overflow-x-hidden">
      {/* ═══════════════════════════════════════════
          SECTION 1 — HERO: Founder + Thesis
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]">
        {/* Left accent line */}
        <div className="hero-accent absolute left-0 top-0 bottom-0 w-[3px] bg-orange z-20 hidden lg:block" />

        {/* ── Left panel: Copy ── */}
        <div className="relative z-10 flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-24 py-32 lg:py-20 order-2 lg:order-1 bg-cream">
          {/* Logo */}
          <div className="hero-logo absolute top-8 left-8 sm:left-12 md:left-16 lg:left-24">
            <Image
              src="/lumiom-ai-logo.png"
              alt="Lumiom AI"
              width={150}
              height={38}
              priority
            />
          </div>

          {/* Eyebrow */}
          <p className="hero-eyebrow text-[11px] font-semibold tracking-[0.3em] text-text-secondary uppercase mb-5">
            A perspective by Mamatha Chamarthi
          </p>

          {/* Headline */}
          <h1 className="hero-headline font-serif text-[36px] sm:text-[44px] md:text-[50px] lg:text-[56px] leading-[1.08] text-navy mb-7">
            The Way Companies
            <br className="hidden sm:block" /> Make Decisions
            <br className="hidden sm:block" /> Is <em>Broken</em>
          </h1>

          {/* Subheadline */}
          <p className="hero-subhead text-base md:text-[17px] text-text-secondary leading-relaxed max-w-md mb-10">
            $1.6 trillion lost annually to failed transformations. 70&ndash;88%
            of programs never deliver. A perspective on why&nbsp;&mdash; and
            what needs to change.
          </p>

          {/* CTAs */}
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

        {/* ── Right panel: Photo placeholder + Quote ── */}
        <div className="relative order-1 lg:order-2 flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-16 xl:px-20 py-16 lg:py-20 bg-cream">
          <div className="hero-photo flex flex-col items-start gap-10 max-w-lg lg:max-w-xl">
            {/* Image placeholder */}
            <div className="w-full aspect-[4/3] rounded-2xl bg-navy/[0.05] border-2 border-dashed border-navy/[0.1] flex items-center justify-center">
              <span className="text-navy/20 text-sm font-medium tracking-wide uppercase">
                Photo / Video
              </span>
            </div>

            {/* Quote + attribution */}
            <div className="flex flex-col gap-5 w-full">
              <div className="w-10 h-[3px] bg-orange rounded-full" />
              <blockquote className="font-serif text-[26px] sm:text-[30px] lg:text-[32px] leading-[1.3] text-navy/80 italic">
                &ldquo;Industrial enterprises have spent 25 years dispersing
                their intelligence&nbsp;&mdash; to consultants, integrators, and
                outsourcers. They hold the bill. They don&apos;t own the
                intelligence.&rdquo;
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

        {/* Grain */}
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
            <h2 className="font-serif text-[32px] sm:text-[40px] md:text-[44px] lg:text-[48px] leading-[1.1] text-navy mb-16 max-w-3xl">
              25 Years of Dispersed Intelligence.
              <br />
              No One Owns the <em>Outcome.</em>
            </h2>
          </Reveal>

          {/* Silo cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-4">
            {silos.map((silo, i) => {
              const Icon = silo.icon;
              return (
                <Reveal key={silo.label} delay={200 + i * 120}>
                  <div className="relative bg-white rounded-xl p-7 pb-8 min-h-[220px] lg:min-h-[240px] flex flex-col justify-between border border-black/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
                    <div
                      className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl"
                      style={{ backgroundColor: silo.color }}
                    />
                    <div
                      className="w-11 h-11 rounded-lg flex items-center justify-center mt-1"
                      style={{ backgroundColor: silo.color + "10" }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: silo.color }}
                        strokeWidth={1.8}
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-navy text-[17px] mb-1.5">
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
          SECTION 3 — THE INSIGHT
          ═══════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 lg:py-40 px-8 sm:px-12 md:px-16 lg:px-24 bg-navy overflow-hidden">
        {/* Orange accent bar */}
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
              70&ndash;88% of programs fail to achieve their stated goals. $1.6
              trillion wasted every year. The systems were never built to help
              leaders make connected, real-time decisions across the business.
            </p>
          </Reveal>
        </div>

        {/* Subtle decorative glow */}
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
            <h2 className="font-serif text-[32px] sm:text-[40px] md:text-[44px] lg:text-[48px] leading-[1.1] text-navy mb-6">
              Efficiency First. Then Transformation.
              <br />
              <em>Intelligence That Never Leaves.</em>
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-base md:text-[17px] text-text-secondary leading-relaxed max-w-xl mx-auto mb-20">
              Lumiom is the first platform that reassembles your enterprise
              intelligence&nbsp;&mdash; continuous, horizontal, and
              outcome-linked. Not another consultant. Not another vendor. The
              first partner fully accountable for transformation outcomes.
            </p>
          </Reveal>

          {/* ── System diagram ── */}
          <Reveal delay={300}>
            <div className="flex flex-col items-center">
              {/* Top: 4 function boxes */}
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

              {/* Convergence lines (desktop) */}
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
              {/* Simple connector (mobile) */}
              <div className="lg:hidden flex justify-center">
                <div className="w-px h-8 bg-navy/12" />
              </div>

              {/* Lumiom layer */}
              <div className="w-full max-w-md py-5 px-6 bg-navy text-white rounded-xl font-semibold text-[15px] md:text-base ring-2 ring-orange/20 shadow-[0_4px_32px_rgba(15,23,41,0.25)]">
                Lumiom &middot; Continuous Horizontal Intelligence
              </div>

              {/* Arrow down */}
              <div className="flex flex-col items-center">
                <div className="w-px h-7 bg-orange/30" />
                <ArrowDown className="w-4 h-4 text-orange -mt-0.5" />
              </div>

              {/* Outcome */}
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

          {/* End CTA */}
          <Reveal delay={400}>
            <div className="mt-20">
              <a
                href="#"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-navy text-white text-[15px] font-semibold rounded-lg hover:bg-navy-light transition-all duration-300 shadow-[0_2px_16px_rgba(15,23,41,0.18)] hover:shadow-[0_4px_24px_rgba(15,23,41,0.28)] hover:-translate-y-px"
              >
                Let&apos;s Talk
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════ */}
      <footer className="py-10 px-8 sm:px-12 md:px-16 lg:px-24 bg-navy">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <Image
            src="/lumiom-ai-logo.png"
            alt="Lumiom AI"
            width={110}
            height={28}
            className="opacity-40 brightness-[3]"
          />
          <p className="text-white/30 text-sm">
            &copy; 2026 Lumiom AI. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
