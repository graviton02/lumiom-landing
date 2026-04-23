"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import RequestDemoDialog from "@/components/RequestDemoDialog";

/* ────────────────── Shared wordmark ────────────────── */
function Wordmark({ variant = "light" }: { variant?: "light" | "dark" }) {
  const textColor = variant === "dark" ? "text-white" : "text-navy";
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2 ${textColor}`}
      aria-label="Lumiom home"
    >
      <svg viewBox="0 0 28 10" className="w-6 h-2.5" aria-hidden="true">
        <path
          d="M1 6 Q 5 1, 9 5 T 17 5 T 27 5"
          stroke="currentColor"
          fill="none"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-serif text-[22px] tracking-tight leading-none">
        Lumiom
      </span>
    </Link>
  );
}

export default function CeoFounderPage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <main className="min-h-screen bg-cream">
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
          <a
            href="mailto:ask@lumiom.ai"
            className="hidden sm:inline-flex text-[12px] font-medium text-navy/70 hover:text-navy transition-colors"
          >
            Contact
          </a>
          <button
            type="button"
            onClick={() => setDemoOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-full border border-navy/15 px-3.5 py-1.5 text-[12px] font-semibold text-navy hover:bg-navy/[0.04] transition-colors"
          >
            Request Demo
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </header>

      {/* ── Content ── */}
      <section className="px-6 sm:px-10 md:px-16 lg:px-24 py-16 md:py-20 lg:py-24">
        <div className="max-w-5xl mx-auto">
          {/* Eyebrow */}
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-orange mb-5">
            CEO &amp; Founder
          </p>

          {/* Headline */}
          <h1 className="font-serif text-[36px] sm:text-[48px] md:text-[58px] lg:text-[66px] leading-[1.05] text-navy mb-10 max-w-3xl">
            Mamatha <em>Chamarthi.</em>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">
            {/* Photo placeholder */}
            <div className="relative">
              <div className="relative w-full aspect-[4/5] rounded-2xl bg-navy/[0.05] border-2 border-dashed border-navy/15 flex flex-col items-center justify-center p-6 text-center">
                <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-navy/40 mb-2">
                  Photo pending
                </span>
                <p className="text-[13px] text-navy/50 leading-relaxed max-w-[220px]">
                  Mamatha speaking at microphone — Option 3, T200 logo &amp;
                  background to be edited out.
                </p>
              </div>
              {/* Decorative peach circle */}
              <div className="absolute -top-6 -right-6 w-[120px] h-[120px] rounded-full bg-orange/[0.1] -z-10 hidden sm:block" />
            </div>

            {/* Bio placeholder */}
            <div className="flex flex-col gap-5 text-navy/80">
              <div className="rounded-xl border border-dashed border-navy/15 bg-white/55 p-6">
                <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-orange/90 mb-2">
                  Bio · placeholder
                </p>
                <p className="text-[14px] leading-relaxed text-navy/65">
                  The full two-page bio will drop in here once the version
                  from Ascendant is finalized. Structure below is a
                  placeholder for the sections we expect to include.
                </p>
              </div>

              <section>
                <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-navy/50 mb-2">
                  In brief
                </p>
                <p className="font-serif text-[20px] sm:text-[22px] leading-[1.35] text-navy italic">
                  &ldquo;Founder &amp; CEO of Lumiom AI. Building the first
                  Industrial AI Operating Platform so enterprise intelligence
                  finally stays with the enterprise.&rdquo;
                </p>
              </section>

              <section>
                <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-navy/50 mb-2">
                  Career
                </p>
                <p className="text-[15px] leading-relaxed text-navy/70">
                  [ Prior roles, industries, and leadership positions — pulled
                  from the Ascendant 2-page bio ]
                </p>
              </section>

              <section>
                <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-navy/50 mb-2">
                  Boards &amp; advisory
                </p>
                <p className="text-[15px] leading-relaxed text-navy/70">
                  [ Board seats, advisory roles, recognitions ]
                </p>
              </section>

              <section>
                <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-navy/50 mb-2">
                  Speaking &amp; writing
                </p>
                <p className="text-[15px] leading-relaxed text-navy/70">
                  [ Keynotes, published articles, notable talks ]
                </p>
              </section>

              <div className="mt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setDemoOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-orange text-white text-[14px] font-semibold rounded-lg hover:bg-orange-light transition-all duration-300 shadow-[0_2px_16px_rgba(232,108,58,0.25)] hover:shadow-[0_4px_24px_rgba(232,108,58,0.35)]"
                >
                  Request a Demo
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-navy/15 text-navy text-[14px] font-semibold rounded-lg hover:bg-navy/[0.03] transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 px-6 sm:px-10 md:px-16 lg:px-24 bg-navy">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-white/30 text-sm">
            &copy; 2026 Lumiom AI. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-[13px]">
            <a
              href="mailto:ask@lumiom.ai"
              className="text-white/55 hover:text-white transition-colors"
            >
              ask@lumiom.ai
            </a>
            <span className="text-white/20">·</span>
            <a
              href="mailto:demo@lumiom.ai"
              className="text-white/55 hover:text-white transition-colors"
            >
              demo@lumiom.ai
            </a>
          </div>
        </div>
      </footer>

      <RequestDemoDialog open={demoOpen} onClose={() => setDemoOpen(false)} />
    </main>
  );
}
