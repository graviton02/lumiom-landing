"use client";

import { useEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    title: "",
    organization: "",
    email: "",
    message: "",
  });
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setStatus("idle");
    setErrorMsg("");
    requestAnimationFrame(() => firstFieldRef.current?.focus());
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleChange =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json?.error || "Request failed");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-dialog-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close contact form"
        onClick={onClose}
        className="absolute inset-0 bg-navy/55 backdrop-blur-sm"
      />

      {/* Panel */}
      <div className="relative w-full max-w-lg bg-cream rounded-2xl shadow-[0_24px_80px_-20px_rgba(15,23,41,0.45)] overflow-hidden border border-navy/[0.06]">
        {/* Top accent bar — navy to differentiate from the demo dialog */}
        <div className="h-[3px] bg-navy" />

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 inline-flex items-center justify-center w-8 h-8 rounded-full text-navy/50 hover:text-navy hover:bg-navy/[0.05] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-7 sm:p-9">
          <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-navy/65 mb-3">
            Get in Touch
          </p>
          <h2
            id="contact-dialog-title"
            className="font-serif text-[26px] sm:text-[30px] leading-[1.12] text-navy mb-2"
          >
            Let&apos;s start a conversation.
          </h2>
          <p className="text-[14px] text-text-secondary mb-7">
            We&apos;ll reply within one business day.
          </p>

          {status === "success" ? (
            <div className="rounded-xl border border-navy/15 bg-navy/[0.04] p-5">
              <p className="font-semibold text-navy mb-1">
                Got it — thank you.
              </p>
              <p className="text-sm text-text-secondary">
                Your message is in. The Lumiom team will reach out to you
                shortly.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-navy hover:text-navy-light transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <Field
                  ref={firstFieldRef}
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange("name")}
                  required
                  autoComplete="name"
                />
                <Field
                  label="Title"
                  name="title"
                  value={form.title}
                  onChange={handleChange("title")}
                  autoComplete="organization-title"
                />
              </div>
              <Field
                label="Organization"
                name="organization"
                value={form.organization}
                onChange={handleChange("organization")}
                autoComplete="organization"
              />
              <Field
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                required
                autoComplete="email"
              />
              <FieldTextarea
                label="Message"
                name="message"
                value={form.message}
                onChange={handleChange("message")}
                rows={4}
                placeholder="How can we help?"
              />

              {status === "error" && (
                <p className="text-[13px] text-orange font-medium">
                  {errorMsg || "Something went wrong. Please try again."}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-navy text-white text-[14px] font-semibold rounded-lg hover:bg-navy-light transition-all duration-300 shadow-[0_2px_16px_rgba(15,23,41,0.28)] hover:shadow-[0_4px_24px_rgba(15,23,41,0.38)] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? "Sending…" : "Send Message"}
                {status !== "submitting" && <Send className="w-4 h-4" />}
              </button>

              <p className="mt-1 text-[11px] text-text-secondary/80">
                We&apos;ll only use this to respond to your message.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

type BaseFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
  autoComplete?: string;
};

const Field = ({
  ref,
  label,
  name,
  value,
  onChange,
  required,
  type = "text",
  autoComplete,
}: BaseFieldProps & { ref?: React.Ref<HTMLInputElement> }) => (
  <label className="flex flex-col gap-1.5">
    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-navy/55">
      {label}
      {required && <span className="text-orange"> *</span>}
    </span>
    <input
      ref={ref}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      autoComplete={autoComplete}
      className="bg-white border border-navy/[0.1] rounded-md px-3 py-2.5 text-[14px] text-navy placeholder:text-navy/30 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/15 transition-all"
    />
  </label>
);

const FieldTextarea = ({
  label,
  name,
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  placeholder?: string;
}) => (
  <label className="flex flex-col gap-1.5">
    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-navy/55">
      {label}
    </span>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      className="bg-white border border-navy/[0.1] rounded-md px-3 py-2.5 text-[14px] text-navy placeholder:text-navy/30 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/15 transition-all resize-none"
    />
  </label>
);
