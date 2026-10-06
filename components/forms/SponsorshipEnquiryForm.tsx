"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowUpRight,
  BadgeDollarSign,
  CheckCircle2,
  Handshake,
  Loader2,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

import {
  sponsorshipSchema,
  type SponsorshipFormValues,
} from "@/lib/validation";
import { COUNTRIES } from "@/lib/countries";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { getRecaptcha } from "@/lib/recaptcha";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";
const EASE = [0.16, 1, 0.3, 1] as const;

const SPONSORSHIP_TIER_OPTIONS = [
  "Platinum Partner",
  "Gold Partner",
  "Silver Partner",
  "Innovation Partner",
  "Media Partner",
  "Custom",
] as const;

const inputClass =
  "w-full rounded-xl border border-ink/10 bg-paper px-3.5 py-2.5 text-[13px] leading-5 text-ink placeholder:text-ink/30 transition-all duration-300 hover:border-ink/20 focus-visible:border-blue focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue/[0.07] disabled:cursor-not-allowed disabled:opacity-60";

const cardClass =
  "rounded-[20px] border border-ink/[0.075] bg-paper p-4 shadow-[0_12px_38px_rgba(9,25,31,0.035)] sm:p-5 lg:p-6";

function SuccessModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 px-4 py-8 backdrop-blur-[6px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sponsorship-success-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="relative w-full max-w-[520px] overflow-hidden rounded-[24px] border border-paper/10 bg-paper px-6 py-9 text-center shadow-[0_28px_100px_rgba(0,0,0,0.28)] sm:px-9"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close success message"
              className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border border-ink/[0.08] bg-paper text-ink/40 transition hover:text-ink"
            >
              <X className="size-4" />
            </button>

            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-solar text-ink">
              <CheckCircle2 className="size-6" />
            </div>

            <span className="mt-5 block text-[9px] font-bold uppercase tracking-[0.16em] text-blue">
              Enquiry Received
            </span>

            <h3
              id="sponsorship-success-title"
              className="mt-2 font-display text-[24px] font-semibold leading-[1.08] tracking-[-0.035em] text-ink sm:text-[28px]"
            >
              Thank You for Your Interest
            </h3>

            <p className="mx-auto mt-4 max-w-[410px] text-[12px] leading-6 text-ink/48 sm:text-[13px]">
              Your sponsorship enquiry has been submitted successfully. Our
              partnership team will review your requirements and contact you
              with suitable options.
            </p>

            <Button
              type="button"
              size="md"
              onClick={onClose}
              className="mt-6 min-w-[170px] justify-center"
            >
              Done
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function SponsorshipEnquiryForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [apiError, setApiError] = useState("");
  const [captchaReady, setCaptchaReady] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  const captchaRef = useRef<HTMLDivElement | null>(null);
  const captchaWidgetId = useRef<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SponsorshipFormValues>({
    resolver: zodResolver(sponsorshipSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      designation: "",
      country: "",
      sponsorshipTier: "",
      message: "",
    },
  });

  useEffect(() => {
    if (
      !captchaReady ||
      !RECAPTCHA_SITE_KEY ||
      !captchaRef.current ||
      captchaWidgetId.current !== null
    )
      return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const renderCaptcha = () => {
      if (cancelled) return;

      const grecaptcha = getRecaptcha();
      if (!grecaptcha?.render) {
        timer = setTimeout(renderCaptcha, 150);
        return;
      }

      if (!captchaRef.current || captchaWidgetId.current !== null) return;

      try {
        captchaWidgetId.current = grecaptcha.render(captchaRef.current, {
          sitekey: RECAPTCHA_SITE_KEY,
          theme: "light",
          size: "normal",
          callback: (token) => {
            setCaptchaToken(token);
            setCaptchaError("");
          },
          "expired-callback": () => {
            setCaptchaToken("");
            setCaptchaError("Verification expired. Please verify again.");
          },
          "error-callback": () => {
            setCaptchaToken("");
            setCaptchaError("reCAPTCHA could not be loaded. Please try again.");
          },
        });
      } catch (error) {
        console.error("[Sponsorship Form] reCAPTCHA render failed:", error);
        setCaptchaError(
          "Verification could not be initialized. Please refresh the page.",
        );
      }
    };

    renderCaptcha();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [captchaReady]);

  function resetCaptcha() {
    setCaptchaToken("");
    const grecaptcha = getRecaptcha();
    if (grecaptcha?.reset && captchaWidgetId.current !== null) {
      grecaptcha.reset(captchaWidgetId.current);
    }
  }

  async function onSubmit(values: SponsorshipFormValues) {
    if (status === "loading") return;

    setApiError("");

    if (!RECAPTCHA_SITE_KEY) {
      setCaptchaError("reCAPTCHA is not configured.");
      return;
    }

    if (!captchaToken) {
      setCaptchaError("Please confirm that you are not a robot.");
      return;
    }

    setCaptchaError("");
    setStatus("loading");

    try {
      const response = await fetch("/api/sponsorship", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, recaptchaToken: captchaToken }),
      });

      const data = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Something went wrong while submitting your sponsorship enquiry.",
        );
      }

      reset();
      resetCaptcha();
      setStatus("success");
    } catch (error) {
      setApiError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
      setStatus("error");
      resetCaptcha();
    }
  }

  return (
    <>
      <Script
        id="google-recaptcha-sponsorship"
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setCaptchaReady(true)}
        onError={() => {
          setCaptchaReady(false);
          setCaptchaError(
            "reCAPTCHA failed to load. Please check your connection.",
          );
        }}
      />

      <SuccessModal
        open={status === "success"}
        onClose={() => setStatus("idle")}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="w-full space-y-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative overflow-hidden rounded-[22px] bg-ink px-5 py-6 text-paper sm:px-6 sm:py-7"
        >
          <div
            className="absolute -right-20 -top-24 size-56 rounded-full bg-blue/25 blur-[85px]"
            aria-hidden="true"
          />
          <div className="relative z-10 flex items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-paper/10 bg-paper/[0.05] text-solar">
              <Handshake className="size-[18px]" />
            </span>

            <div>
              <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-solar">
                Sponsorship Opportunities
              </span>
              <h2 className="mt-1.5 font-display text-[22px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[27px]">
                Become a Show Partner
              </h2>
              <p className="mt-3 max-w-[650px] text-[11px] leading-5 text-paper/48 sm:text-[12px]">
                Explore sponsorship and branding opportunities at the India
                International Solar Show and position your brand in front of the
                industry.
              </p>
            </div>
          </div>
        </motion.div>

        <section className={cardClass}>
          <div className="mb-5 flex items-start gap-3 border-b border-ink/[0.065] pb-4">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-blue/10 bg-blue/[0.055] text-blue">
              <BadgeDollarSign className="size-4" />
            </span>
            <div>
              <h3 className="font-display text-[15px] font-semibold tracking-[-0.02em] text-ink sm:text-[17px]">
                Partnership Details
              </h3>
              <p className="mt-1 text-[10px] leading-5 text-ink/40 sm:text-[11px]">
                Share your contact details and preferred sponsorship
                opportunity.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Full Name"
              htmlFor="fullName"
              required
              error={errors.fullName?.message}
            >
              <input
                id="fullName"
                autoComplete="name"
                className={inputClass}
                placeholder="Your full name"
                {...register("fullName")}
              />
            </FormField>

            <FormField
              label="Email"
              htmlFor="email"
              required
              error={errors.email?.message}
            >
              <input
                id="email"
                type="email"
                autoComplete="email"
                className={inputClass}
                placeholder="you@email.com"
                {...register("email")}
              />
            </FormField>

            <FormField
              label="Phone"
              htmlFor="phone"
              required
              error={errors.phone?.message}
            >
              <input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className={inputClass}
                placeholder="+91 98765 43210"
                {...register("phone")}
              />
            </FormField>

            <FormField
              label="Company"
              htmlFor="company"
              error={errors.company?.message}
            >
              <input
                id="company"
                autoComplete="organization"
                className={inputClass}
                placeholder="Company name (optional)"
                {...register("company")}
              />
            </FormField>

            <FormField
              label="Designation"
              htmlFor="designation"
              error={errors.designation?.message}
            >
              <input
                id="designation"
                autoComplete="organization-title"
                className={inputClass}
                placeholder="Designation (optional)"
                {...register("designation")}
              />
            </FormField>

            <FormField
              label="Country"
              htmlFor="country"
              error={errors.country?.message}
            >
              <select
                id="country"
                className={cn(inputClass, "cursor-pointer")}
                {...register("country")}
              >
                <option value="">Select country (optional)</option>
                {COUNTRIES.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </FormField>
          </div>

          <div className="mt-4">
            <FormField
              label="Sponsorship Tier"
              htmlFor="sponsorshipTier"
              error={errors.sponsorshipTier?.message}
            >
              <select
                id="sponsorshipTier"
                className={cn(inputClass, "cursor-pointer")}
                {...register("sponsorshipTier")}
              >
                <option value="">Select sponsorship tier (optional)</option>
                {SPONSORSHIP_TIER_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </FormField>
          </div>

          <div className="mt-4">
            <FormField
              label="Message"
              htmlFor="message"
              error={errors.message?.message}
            >
              <textarea
                id="message"
                rows={4}
                className={cn(inputClass, "min-h-[110px] resize-y")}
                placeholder="Tell us about your sponsorship goals (optional)"
                {...register("message")}
              />
            </FormField>
          </div>
        </section>

        <section className={cn(cardClass, "bg-blue/[0.018]")}>
          <div className="mb-4 flex items-start gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-blue/10 bg-blue/[0.055] text-blue">
              <ShieldCheck className="size-4" />
            </span>
            <div>
              <h3 className="font-display text-[15px] font-semibold tracking-[-0.02em] text-ink sm:text-[17px]">
                Human Verification
              </h3>
              <p className="mt-1 text-[10px] leading-5 text-ink/40 sm:text-[11px]">
                Complete the security check before submitting your enquiry.
              </p>
            </div>
          </div>

          <div className="max-w-full overflow-x-auto rounded-xl border border-ink/[0.08] bg-paper p-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {RECAPTCHA_SITE_KEY ? (
              <div ref={captchaRef} className="min-h-[78px] min-w-[304px]" />
            ) : (
              <div className="flex min-h-[78px] items-center gap-2 text-[11px] text-red-600">
                <AlertCircle className="size-4" />
                reCAPTCHA key is missing.
              </div>
            )}
          </div>

          {captchaError && (
            <p
              className="mt-2 flex items-center gap-2 text-[10px] font-medium text-red-600"
              role="alert"
            >
              <AlertCircle className="size-3.5" />
              {captchaError}
            </p>
          )}
        </section>

        <AnimatePresence initial={false}>
          {status === "error" && apiError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-start gap-2.5 overflow-hidden rounded-xl border border-red-500/15 bg-red-500/[0.045] px-4 py-3 text-[11px] font-medium text-red-700"
              role="alert"
            >
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              {apiError}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="rounded-[20px] border border-ink/[0.075] bg-paper p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex max-w-[420px] items-start gap-2.5">
              <Sparkles className="mt-0.5 size-4 shrink-0 text-solar" />
              <p className="text-[9px] leading-4 text-ink/35 sm:text-[10px]">
                Submit your details once and our partnership team will contact
                you regarding suitable sponsorship options.
              </p>
            </div>

            <Button
              type="submit"
              size="md"
              disabled={status === "loading" || !RECAPTCHA_SITE_KEY}
              className="group w-full justify-center gap-2.5 sm:w-auto sm:min-w-[210px]"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Enquiry
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
