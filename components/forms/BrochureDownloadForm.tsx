"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowDownToLine,
  CheckCircle2,
  Download,
  FileText,
  Loader2,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

import { brochureSchema, type BrochureFormValues } from "@/lib/validation";
import { COUNTRIES } from "@/lib/countries";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { getRecaptcha, loadRecaptcha } from "@/lib/recaptcha";

const BROCHURE_URL = "/India-Solar-International-Show-Brochure.pdf";
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";
const EASE = [0.16, 1, 0.3, 1] as const;

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
          aria-labelledby="brochure-success-title"
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
              Access Granted
            </span>

            <h3
              id="brochure-success-title"
              className="mt-2 font-display text-[24px] font-semibold leading-[1.08] tracking-[-0.035em] text-ink sm:text-[28px]"
            >
              Your Brochure is Ready
            </h3>

            <p className="mx-auto mt-4 max-w-[410px] text-[12px] leading-6 text-ink/48 sm:text-[13px]">
              Your details have been submitted successfully. Download the official India International Solar Show brochure below.
            </p>

            <a
              href={BROCHURE_URL}
              download
              className="group mt-6 inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full bg-solar px-5 text-[12px] font-semibold text-ink transition hover:bg-solar/90 hover:shadow-[0_12px_34px_rgba(251,178,22,0.22)]"
            >
              <Download className="size-4" />
              Download Brochure
              <ArrowDownToLine className="size-3.5 transition-transform group-hover:translate-y-0.5" />
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function BrochureDownloadForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [apiError, setApiError] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [captchaLoading, setCaptchaLoading] = useState(true);

  const captchaRef = useRef<HTMLDivElement | null>(null);
  const captchaWidgetId = useRef<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BrochureFormValues>({
    resolver: zodResolver(brochureSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      designation: "",
      country: "",
    },
  });

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY || !captchaRef.current || captchaWidgetId.current !== null) {
      setCaptchaLoading(false);
      return;
    }

    let cancelled = false;

    async function renderCaptcha() {
      try {
        const grecaptcha = await loadRecaptcha();

        if (
          cancelled ||
          !captchaRef.current ||
          captchaWidgetId.current !== null ||
          !grecaptcha.render
        ) {
          return;
        }

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

        setCaptchaLoading(false);
      } catch (error) {
        console.error("[Brochure Form] reCAPTCHA load/render failed:", error);

        if (!cancelled) {
          setCaptchaLoading(false);
          setCaptchaError(
            "reCAPTCHA failed to load. Please check your connection.",
          );
        }
      }
    }

    void renderCaptcha();

    return () => {
      cancelled = true;
    };
  }, []);

  function resetCaptcha() {
    setCaptchaToken("");

    const grecaptcha = getRecaptcha();

    if (grecaptcha?.reset && captchaWidgetId.current !== null) {
      grecaptcha.reset(captchaWidgetId.current);
    }
  }

  async function onSubmit(values: BrochureFormValues) {
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
      const response = await fetch("/api/brochure-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          recaptchaToken: captchaToken,
        }),
      });

      const data = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Something went wrong while processing your request.",
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
              <FileText className="size-[18px]" />
            </span>

            <div>
              <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-solar">
                Official Event Brochure
              </span>

              <h2 className="mt-1.5 font-display text-[22px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[27px]">
                Download the Show Brochure
              </h2>

              <p className="mt-3 max-w-[650px] text-[11px] leading-5 text-paper/48 sm:text-[12px]">
                Share your details to access the official India International Solar Show brochure and event information.
              </p>
            </div>
          </div>
        </motion.div>

        <section className={cardClass}>
          <div className="mb-5 flex items-start gap-3 border-b border-ink/[0.065] pb-4">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-blue/10 bg-blue/[0.055] text-blue">
              <Download className="size-4" />
            </span>

            <div>
              <h3 className="font-display text-[15px] font-semibold tracking-[-0.02em] text-ink sm:text-[17px]">
                Your Details
              </h3>

              <p className="mt-1 text-[10px] leading-5 text-ink/40 sm:text-[11px]">
                Complete the form below to unlock the brochure download.
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
                Complete the security check before accessing the brochure.
              </p>
            </div>
          </div>

          <div className="max-w-full overflow-x-auto rounded-xl border border-ink/[0.08] bg-paper p-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {!RECAPTCHA_SITE_KEY ? (
              <div className="flex min-h-[78px] items-center gap-2 text-[11px] text-red-600">
                <AlertCircle className="size-4" />
                reCAPTCHA key is missing.
              </div>
            ) : (
              <div className="relative min-h-[78px] min-w-[304px]">
                {captchaLoading && (
                  <div className="absolute inset-0 flex items-center gap-2 text-[11px] text-ink/40">
                    <Loader2 className="size-4 animate-spin" />
                    Loading verification...
                  </div>
                )}

                <div
                  ref={captchaRef}
                  className="min-h-[78px] min-w-[304px]"
                />
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
                Submit your details once to unlock the official event brochure PDF.
              </p>
            </div>

            <Button
              type="submit"
              size="md"
              disabled={status === "loading" || !RECAPTCHA_SITE_KEY}
              className="group w-full justify-center gap-2.5 sm:w-auto sm:min-w-[200px]"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Download Brochure
                  <Download className="size-4 transition-transform group-hover:translate-y-0.5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
