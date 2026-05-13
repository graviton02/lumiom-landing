"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import RequestDemoDialog from "@/components/RequestDemoDialog";
import ContactDialog from "@/components/ContactDialog";

const differentiators = [
  "Living Enterprise Model",
  "Enterprise-Wide Visibility",
  "Harvest-to-Invest Flywheel",
  "AI Only Where It Moves the P&L",
  "Compounding Organizational Knowledge",
  "Built by Operators",
];

const methodology = [
  "Absorb",
  "Continuous Intelligence",
  "Rationalize, Optimize & Modernize",
  "Execute",
  "Value Realization",
];

const valueLevers = [
  "Revenue Growth",
  "Operating Margin",
  "Asset Efficiency",
  "Strategic Prioritization",
];

export default function Short() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const openDemo = () => setDemoOpen(true);
  const openContact = () => setContactOpen(true);

  return (
    <>
      <main className="min-h-screen bg-cream">
        {/* Top nav */}
        <div className="absolute top-6 right-6 sm:top-8 sm:right-8 lg:top-10 lg:right-12 z-40 flex items-center gap-3 sm:gap-4">
          <Link
            href="/ceo-and-founder"
            className="hidden md:inline-flex text-[12px] font-medium tracking-wide text-navy/70 hover:text-navy transition-colors"
          >
            CEO &amp; Founder
          </Link>
          <button
            type="button"
            onClick={openContact}
            className="hidden sm:inline-flex text-[12px] font-medium tracking-wide text-navy/70 hover:text-navy transition-colors"
          >
            Contact
          </button>
          <button
            type="button"
            onClick={openDemo}
            className="inline-flex items-center gap-1.5 rounded-full border border-navy/15 px-3.5 py-1.5 text-[12px] font-semibold tracking-wide text-navy hover:bg-navy/[0.04] transition-colors"
          >
            Request Demo
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Logo */}
        <div className="absolute top-8 left-8 sm:left-12 md:left-16 lg:left-24 z-30">
          <Image
            src="/lumiom-ai-logo.png"
            alt="Lumiom AI"
            width={150}
            height={38}
            priority
          />
          <p className="mt-2 font-mono text-[10px] tracking-[0.24em] uppercase text-navy/55">
            Enterprise Intelligence Platform
          </p>
        </div>

        <div className="hero-accent absolute left-0 top-0 bottom-0 w-[3px] bg-orange z-20 hidden lg:block" />

        <div className="max-w-4xl mx-auto px-8 sm:px-12 md:px-16 lg:px-24 pt-40 lg:pt-44 pb-24">
          {/* Hero */}
          <p className="font-mono text-[11px] font-semibold tracking-[0.3em] text-orange uppercase mb-6">
            A New Category
          </p>
          <h1 className="font-serif text-[40px] sm:text-[52px] md:text-[60px] lg:text-[68px] leading-[1.02] text-navy mb-7">
            The Enterprise
            <br className="hidden sm:block" /> Intelligence{" "}
            <em>Platform.</em>
          </h1>
          <p className="text-[17px] md:text-[18px] text-text-secondary leading-relaxed max-w-xl mb-10">
            Lumiom reads your business as one connected system — translating
            signals into decisions, execution, and measurable P&amp;L
            outcomes.
          </p>

          {/* Mamatha condensed quote */}
          <div className="border-l-2 border-orange pl-5 mb-12 max-w-xl">
            <p className="font-serif text-[20px] md:text-[22px] italic text-navy/85 leading-[1.35] mb-3">
              &ldquo;This is about improving business performance — not
              deploying more technology.&rdquo;
            </p>
            <p className="text-[13px] text-text-secondary">
              <span className="font-semibold text-navy">
                Mamatha Chamarthi
              </span>{" "}
              · Founder &amp; CEO, Lumiom AI
            </p>
          </div>

          {/* Problem (compact) */}
          <div className="mb-14">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-orange mb-3">
              The Problem
            </p>
            <p className="text-[16px] text-navy/82 leading-relaxed max-w-2xl">
              <span className="font-serif text-navy">$250B</span> spent on
              transformation each year.{" "}
              <span className="font-serif text-navy">70–88%</span> fails.{" "}
              <span className="font-serif text-navy">$1.6T</span> in
              enterprise value lost. The problem is structural — fragmented
              systems, disconnected data, siloed decisions.
            </p>
          </div>

          {/* What Lumiom Is */}
          <div className="mb-14">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-orange mb-3">
              What Lumiom Is
            </p>
            <p className="text-[17px] text-navy/82 leading-relaxed max-w-2xl">
              The first platform that continuously reassembles enterprise
              intelligence into a connected operational model with measurable
              P&amp;L impact.
            </p>
          </div>

          {/* Why Lumiom — chip row */}
          <div className="mb-14">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-orange mb-4">
              Why Lumiom
            </p>
            <div className="flex flex-wrap gap-2">
              {differentiators.map((d) => (
                <span
                  key={d}
                  className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white border border-navy/[0.08] text-[13px] font-medium text-navy/85"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* The Loop — diagram placeholder + step list */}
          <div className="mb-14">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-orange mb-4">
              The Loop
            </p>
            <div className="relative w-full aspect-[16/9] rounded-xl bg-white border border-navy/[0.06] mb-5 overflow-hidden">
              <Image
                src="/lumiom-methodology-loop.png"
                alt="The Lumiom five-step continuous methodology loop."
                fill
                className="object-contain"
                sizes="(min-width: 1024px) 800px, 90vw"
              />
            </div>
            <p className="text-[15px] text-text-secondary leading-relaxed">
              {methodology.join(" → ")}.
            </p>
          </div>

          {/* Value Acceleration — 4-up */}
          <div className="mb-14">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-orange mb-4">
              Value Acceleration
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {valueLevers.map((v) => (
                <div
                  key={v}
                  className="bg-white rounded-lg p-4 border border-navy/[0.06] text-center"
                >
                  <p className="text-[13px] font-semibold text-navy leading-tight">
                    {v}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4">
            <button
              type="button"
              onClick={openDemo}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-orange text-white text-[15px] font-semibold rounded-lg hover:bg-orange-light transition-all duration-300 shadow-[0_2px_16px_rgba(232,108,58,0.25)] hover:shadow-[0_4px_24px_rgba(232,108,58,0.35)] hover:-translate-y-px"
            >
              Request a Demo Customized to Your Enterprise
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Footer */}
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
