"use client";

import { useEffect, useRef, useState } from "react";

import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { AnimatePresence, motion } from "framer-motion";

import {
  AlertCircle,
  ArrowUpRight,
  Building2,
  Check,
  CheckCircle2,
  Globe2,
  Loader2,
  MapPin,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import { exhibitorSchema, type ExhibitorFormValues } from "@/lib/validation";

import { COUNTRIES } from "@/lib/countries";

import { getRecaptcha, loadRecaptcha } from "@/lib/recaptcha";

import { FormField } from "@/components/ui/FormField";

import { Button } from "@/components/ui/Button";

import { cn } from "@/lib/utils";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

const EASE = [0.16, 1, 0.3, 1] as const;

const BOOTH_SIZE_OPTIONS = [
  "9 Sqmtr",

  "18 Sqmtr",

  "27 Sqmtr",

  "36 Sqmtr",

  "45 Sqmtr",

  "More than 45 Sqmtr",
] as const;

const SPONSORSHIP_OPTIONS = ["Yes", "No", "Maybe"] as const;

const inputClass =
  "w-full min-h-11 rounded-xl border border-ink/10 bg-paper px-3.5 py-2.5 text-[13px] text-ink placeholder:text-ink/30 transition-all duration-200 hover:border-ink/20 focus-visible:border-blue focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue/10 disabled:cursor-not-allowed disabled:opacity-60";

const cardClass =
  "rounded-2xl border border-ink/10 bg-paper p-4 shadow-sm sm:p-5 lg:p-6";

type SectionTitleProps = {
  number: string;

  title: string;

  description: string;

  icon: LucideIcon;
};

function SectionTitle({
  number,

  title,

  description,

  icon: Icon,
}: SectionTitleProps) {
  return (
    <div className="mb-5 flex items-start justify-between gap-4 border-b border-ink/10 pb-4">
      <div className="flex min-w-0 items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-blue/10 bg-blue/5 text-blue">
          <Icon className="size-4" strokeWidth={1.8} />
        </span>

        <div>
          <h3 className="font-display text-[15px] font-semibold tracking-tight text-ink sm:text-[17px]">
            {title}
          </h3>

          <p className="mt-1 max-w-[580px] text-[10px] leading-5 text-ink/40 sm:text-[11px]">
            {description}
          </p>
        </div>
      </div>

      <span className="shrink-0 pt-1 text-[9px] font-semibold tracking-[0.16em] text-ink/20">
        {number}
      </span>
    </div>
  );
}

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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 px-4 py-8 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="exhibitor-success-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="relative w-full max-w-[520px] overflow-hidden rounded-3xl bg-paper p-7 text-center shadow-2xl sm:p-10"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close success message"
              className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border border-ink/10 text-ink/50 transition hover:text-ink"
            >
              <X className="size-4" />
            </button>

            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-solar text-ink">
              <CheckCircle2 className="size-6" />
            </div>

            <span className="mt-5 block text-[9px] font-bold uppercase tracking-[0.16em] text-blue">
              Registration Received
            </span>

            <h3
              id="exhibitor-success-title"
              className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink sm:text-[28px]"
            >
              Thank You for Your Exhibitor Interest
            </h3>

            <p className="mx-auto mt-4 max-w-[420px] text-[12px] leading-6 text-ink/50 sm:text-[13px]">
              Your exhibitor registration has been submitted successfully. Our
              team will contact you regarding stall availability and
              participation details.
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

export function ExhibitorRegistrationForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [apiError, setApiError] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");

  const [captchaError, setCaptchaError] = useState("");

  const captchaElementRef = useRef<HTMLDivElement | null>(null);

  const captchaWidgetIdRef = useRef<number | null>(null);

  const {
    register,

    control,

    handleSubmit,

    reset,

    formState: { errors },
  } = useForm<ExhibitorFormValues>({
    resolver: zodResolver(exhibitorSchema),

    defaultValues: {
      fullName: "",

      designation: "",

      company: "",

      website: "",

      addressLine1: "",

      city: "",

      state: "",

      postalCode: "",

      country: "India",

      phone: "",

      email: "",

      boothSize: "",

      productsServices: "",

      sponsorshipInterest: "",

      termsAgreed: false,

      declaration: false,
    },
  });

  useEffect(() => {
    if (
      !RECAPTCHA_SITE_KEY ||
      !captchaElementRef.current ||
      captchaWidgetIdRef.current !== null
    ) {
      return;
    }

    let cancelled = false;

    async function renderCaptcha() {
      try {
        const grecaptcha = await loadRecaptcha();

        if (
          cancelled ||
          !captchaElementRef.current ||
          captchaWidgetIdRef.current !== null ||
          !grecaptcha.render
        ) {
          return;
        }

        captchaWidgetIdRef.current = grecaptcha.render(
          captchaElementRef.current,
          {
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
              setCaptchaError(
                "reCAPTCHA could not be loaded. Please try again.",
              );
            },
          },
        );
      } catch (error) {
        console.error("[Exhibitor Form] reCAPTCHA load/render failed:", error);

        if (!cancelled) {
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

    if (grecaptcha?.reset && captchaWidgetIdRef.current !== null) {
      grecaptcha.reset(captchaWidgetIdRef.current);
    }
  }

  async function onSubmit(values: ExhibitorFormValues) {
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

    setStatus("loading");

    setCaptchaError("");

    try {
      const response = await fetch("/apihttps://app.warpbay.com/E2yy0Klq", {
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
            "Something went wrong while submitting the registration.",
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
          transition={{ duration: 0.45, ease: EASE }}
          className="relative overflow-hidden rounded-[22px] bg-ink px-5 py-6 text-paper shadow-lg sm:px-6 sm:py-7"
        >
          <div className="absolute -right-20 -top-24 size-56 rounded-full bg-blue/25 blur-[85px]" />

          <div className="relative z-10 flex items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-paper/10 bg-paper/5 text-solar">
              <Building2 className="size-[18px]" />
            </span>

            <div>
              <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-solar">
                Exhibitor Registration
              </span>

              <h2 className="mt-1.5 font-display text-[22px] font-semibold tracking-tight sm:text-[27px]">
                Book Your Exhibition Space
              </h2>

              <p className="mt-3 max-w-[650px] text-[11px] leading-5 text-paper/50 sm:text-[12px]">
                Share your company and participation details. Our team will
                contact you regarding stall availability, positioning and
                commercial terms.
              </p>
            </div>
          </div>
        </motion.div>

        <section className={cardClass}>
          <SectionTitle
            number="01"
            title="Contact & Company Details"
            description="Primary contact information for your exhibitor registration."
            icon={Building2}
          />

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
              label="Designation"
              htmlFor="designation"
              required
              error={errors.designation?.message}
            >
              <input
                id="designation"
                autoComplete="organization-title"
                className={inputClass}
                placeholder="Director, Manager, Founder..."
                {...register("designation")}
              />
            </FormField>

            <FormField
              label="Company"
              htmlFor="company"
              required
              error={errors.company?.message}
            >
              <input
                id="company"
                autoComplete="organization"
                className={inputClass}
                placeholder="Company name"
                {...register("company")}
              />
            </FormField>

            <FormField
              label="Company Website"
              htmlFor="website"
              error={errors.website?.message}
            >
              <div className="relative">
                <Globe2 className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink/25" />

                <input
                  id="website"
                  autoComplete="url"
                  className={cn(inputClass, "pl-10")}
                  placeholder="yourcompany.com"
                  {...register("website")}
                />
              </div>
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
              label="Business Email"
              htmlFor="email"
              required
              error={errors.email?.message}
            >
              <input
                id="email"
                type="email"
                autoComplete="email"
                className={inputClass}
                placeholder="you@company.com"
                {...register("email")}
              />
            </FormField>
          </div>
        </section>

        <section className={cardClass}>
          <SectionTitle
            number="02"
            title="Business Address"
            description="Company location and regional information."
            icon={MapPin}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <FormField
                label="Address Line 1"
                htmlFor="addressLine1"
                required
                error={errors.addressLine1?.message}
              >
                <input
                  id="addressLine1"
                  autoComplete="street-address"
                  className={inputClass}
                  placeholder="Street address"
                  {...register("addressLine1")}
                />
              </FormField>
            </div>

            <FormField label="City" htmlFor="city" error={errors.city?.message}>
              <input
                id="city"
                autoComplete="address-level2"
                className={inputClass}
                placeholder="City"
                {...register("city")}
              />
            </FormField>

            <FormField
              label="State / Province"
              htmlFor="state"
              error={errors.state?.message}
            >
              <input
                id="state"
                autoComplete="address-level1"
                className={inputClass}
                placeholder="State / Province"
                {...register("state")}
              />
            </FormField>

            <FormField
              label="Postal Code"
              htmlFor="postalCode"
              error={errors.postalCode?.message}
            >
              <input
                id="postalCode"
                autoComplete="postal-code"
                className={inputClass}
                placeholder="Postal code"
                {...register("postalCode")}
              />
            </FormField>

            <FormField
              label="Country"
              htmlFor="country"
              required
              error={errors.country?.message}
            >
              <select
                id="country"
                className={cn(inputClass, "cursor-pointer")}
                {...register("country")}
              >
                <option value="">Select country</option>

                {COUNTRIES.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </FormField>
          </div>
        </section>

        <section className={cardClass}>
          <SectionTitle
            number="03"
            title="Participation Requirement"
            description="Tell us about the space and solutions you plan to showcase."
            icon={Sparkles}
          />

          <FormField
            label="Booth Size Requirement"
            htmlFor="boothSize"
            required
            error={errors.boothSize?.message}
          >
            <Controller
              control={control}
              name="boothSize"
              render={({ field }) => (
                <div
                  id="boothSize"
                  className="grid grid-cols-2 gap-2 sm:grid-cols-3"
                >
                  {BOOTH_SIZE_OPTIONS.map((option) => {
                    const active = field.value === option;

                    return (
                      <label
                        key={option}
                        className={cn(
                          "relative flex min-h-[46px] cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 text-[11px] font-medium transition",

                          active
                            ? "border-blue bg-blue/5 text-ink"
                            : "border-ink/10 text-ink/50 hover:border-blue/20 hover:text-ink",
                        )}
                      >
                        <input
                          type="radio"
                          className="sr-only"
                          checked={active}
                          onChange={() => field.onChange(option)}
                        />

                        <span
                          className={cn(
                            "flex size-4 shrink-0 items-center justify-center rounded-full border",

                            active ? "border-blue bg-blue" : "border-ink/15",
                          )}
                        >
                          {active && (
                            <span className="size-1.5 rounded-full bg-paper" />
                          )}
                        </span>

                        {option}
                      </label>
                    );
                  })}
                </div>
              )}
            />
          </FormField>

          <div className="mt-5">
            <FormField
              label="Products / Services to Display"
              htmlFor="productsServices"
              required
              error={errors.productsServices?.message}
            >
              <textarea
                id="productsServices"
                rows={4}
                className={cn(inputClass, "min-h-[110px] resize-y")}
                placeholder="Describe the technologies, products or services you plan to showcase"
                {...register("productsServices")}
              />
            </FormField>
          </div>

          <div className="mt-5">
            <FormField
              label="Interested in Sponsorship / Branding Opportunities?"
              htmlFor="sponsorshipInterest"
              required
              error={errors.sponsorshipInterest?.message}
            >
              <Controller
                control={control}
                name="sponsorshipInterest"
                render={({ field }) => (
                  <div
                    id="sponsorshipInterest"
                    className="grid grid-cols-3 gap-2"
                  >
                    {SPONSORSHIP_OPTIONS.map((option) => {
                      const active = field.value === option;

                      return (
                        <label
                          key={option}
                          className={cn(
                            "flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-[11px] font-semibold transition",

                            active
                              ? "border-blue bg-blue text-paper"
                              : "border-ink/10 text-ink/50 hover:border-blue/20 hover:text-blue",
                          )}
                        >
                          <input
                            type="radio"
                            className="sr-only"
                            checked={active}
                            onChange={() => field.onChange(option)}
                          />

                          {active && <Check className="size-3" />}

                          {option}
                        </label>
                      );
                    })}
                  </div>
                )}
              />
            </FormField>
          </div>
        </section>

        <section className={cn(cardClass, "bg-blue/[0.02]")}>
          <SectionTitle
            number="04"
            title="Confirmation & Security"
            description="Review the declarations and complete human verification before submitting."
            icon={ShieldCheck}
          />

          <div className="space-y-3">
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-ink/10 bg-paper px-3.5 py-3 text-[11px] leading-5 text-ink/50">
              <input
                type="checkbox"
                className="mt-0.5 size-4 shrink-0 accent-blue"
                {...register("termsAgreed")}
              />

              <span>
                I agree to the{" "}
                <a
                  href="/terms-conditions"
                  target="\_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue underline underline-offset-2"
                >
                  exhibitor terms and conditions
                </a>
                .
              </span>
            </label>

            {errors.termsAgreed && (
              <p className="text-[10px] font-medium text-red-600">
                {errors.termsAgreed.message}
              </p>
            )}

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-ink/10 bg-paper px-3.5 py-3 text-[11px] leading-5 text-ink/50">
              <input
                type="checkbox"
                className="mt-0.5 size-4 shrink-0 accent-blue"
                {...register("declaration")}
              />

              <span>
                I declare that the information provided above is true and
                accurate to the best of my knowledge.
              </span>
            </label>

            {errors.declaration && (
              <p className="text-[10px] font-medium text-red-600">
                {errors.declaration.message}
              </p>
            )}
          </div>

          <div className="mt-5 border-t border-ink/10 pt-5">
            <div className="mb-3 flex items-start justify-between gap-4">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-blue">
                  Human Verification
                </span>

                <p className="mt-1 text-[10px] text-ink/40">
                  Complete the security check before submitting.
                </p>
              </div>

              <ShieldCheck className="size-4 text-solar" />
            </div>

            <div className="max-w-full overflow-x-auto rounded-xl border border-ink/10 bg-paper p-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {RECAPTCHA_SITE_KEY ? (
                <div
                  ref={captchaElementRef}
                  className="min-h-[78px] min-w-[304px]"
                />
              ) : (
                <div className="flex min-h-[78px] items-center gap-2 text-[11px] text-red-600">
                  <AlertCircle className="size-4" />
                  NEXT_PUBLIC_RECAPTCHA_SITE_KEY is missing.
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
          </div>
        </section>

        <AnimatePresence initial={false}>
          {status === "error" && apiError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              role="alert"
              className="flex items-start gap-2.5 overflow-hidden rounded-xl border border-red-500/15 bg-red-500/5 px-4 py-3 text-[11px] font-medium text-red-700"
            >
              <AlertCircle className="mt-0.5 size-4 shrink-0" />

              {apiError}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="rounded-2xl border border-ink/10 bg-paper p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[440px] text-[10px] leading-4 text-ink/40">
              Your information will be reviewed by the India International Solar
              Show team before stall confirmation.
            </p>

            <Button
              type="submit"
              size="md"
              disabled={status === "loading" || !RECAPTCHA_SITE_KEY}
              className="group w-full justify-center gap-2 sm:w-auto sm:min-w-[220px]"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Registration
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
