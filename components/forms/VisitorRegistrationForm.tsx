"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { visitorSchema, type VisitorFormValues } from "@/lib/validation";
import { COUNTRIES } from "@/lib/countries";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-[color:var(--color-black)] placeholder:text-slate-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-gold)] focus-visible:border-transparent";

const INDUSTRY_OPTIONS = [
  "Solar",
  "Storage",
  "EV",
  "Manufacturing",
  "IT",
  "Government",
  "Finance",
  "Other",
] as const;

const VISIT_PURPOSE_OPTIONS = [
  "Sourcing New Products/Suppliers",
  "Business Networking",
  "Exploring Investment Opportunities",
  "Market Research",
  "Media/Press",
  "Other",
] as const;

export function VisitorRegistrationForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<VisitorFormValues>({
    resolver: zodResolver(visitorSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      designation: "",
      country: "India",
      industry: "",
      visitPurpose: "",
      termsAgreed: false,
    },
  });

  async function onSubmit(values: VisitorFormValues) {
    setStatus("loading");
    try {
      const res = await fetch("/api/visitor-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Something went wrong.");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-10 text-center"
        role="status"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white">
          <CheckCircle2 size={28} aria-hidden="true" />
        </span>
        <h3 className="text-lg font-bold text-[color:var(--color-black)]">Registration Successful!</h3>
        <p className="text-sm text-slate-600">
          Thank you for registering. We will send you a confirmation email shortly.
        </p>
        <Button variant="secondary" onClick={() => setStatus("idle")}>
          Send Another
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Full Name" htmlFor="fullName" required error={errors.fullName?.message}>
          <input
            id="fullName"
            className={inputClass}
            placeholder="Your full name"
            aria-invalid={!!errors.fullName}
            {...register("fullName")}
          />
        </FormField>

        <FormField label="Email" htmlFor="email" required error={errors.email?.message}>
          <input
            id="email"
            type="email"
            className={inputClass}
            placeholder="you@company.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </FormField>

        <FormField label="Phone" htmlFor="phone" required error={errors.phone?.message}>
          <input
            id="phone"
            type="tel"
            className={inputClass}
            placeholder="+91 00000 00000"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
        </FormField>

        <FormField label="Company" htmlFor="company" required error={errors.company?.message}>
          <input
            id="company"
            className={inputClass}
            placeholder="Your company"
            aria-invalid={!!errors.company}
            {...register("company")}
          />
        </FormField>

        <FormField label="Designation" htmlFor="designation" error={errors.designation?.message}>
          <input
            id="designation"
            className={inputClass}
            placeholder="Your designation"
            {...register("designation")}
          />
        </FormField>

        <FormField label="Country" htmlFor="country" required error={errors.country?.message}>
          <select
            id="country"
            className={cn(inputClass, "cursor-pointer")}
            aria-invalid={!!errors.country}
            {...register("country")}
          >
            <option value="">Select country</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <FormField label="Industry" htmlFor="industry" required error={errors.industry?.message}>
        <select
          id="industry"
          className={cn(inputClass, "cursor-pointer")}
          aria-invalid={!!errors.industry}
          {...register("industry")}
        >
          <option value="">Select your industry</option>
          {INDUSTRY_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="Purpose of Visit" htmlFor="visitPurpose" required error={errors.visitPurpose?.message}>
        <Controller
          control={control}
          name="visitPurpose"
          render={({ field }) => (
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {VISIT_PURPOSE_OPTIONS.map((opt) => (
                <label
                  key={opt}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition-colors",
                    field.value === opt
                      ? "border-[color:var(--color-gold)] bg-[color:var(--color-gold)]/10 font-semibold text-[color:var(--color-black)]"
                      : "border-slate-300 text-slate-600 hover:border-slate-400"
                  )}
                >
                  <input
                    type="radio"
                    className="h-4 w-4 accent-[color:var(--color-gold)]"
                    checked={field.value === opt}
                    onChange={() => field.onChange(opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          )}
        />
      </FormField>

      <div className="rounded-xl border border-slate-200 p-5">
        <label className="flex items-start gap-2.5 text-sm text-slate-600">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 shrink-0 accent-[color:var(--color-gold)]"
            {...register("termsAgreed")}
          />
          <span>
            I agree to the{" "}
            <a href="/terms" target="_blank" className="font-semibold text-[color:var(--color-black)] underline">
              terms and conditions
            </a>
            . *
          </span>
        </label>
        {errors.termsAgreed && (
          <p className="mt-2 text-xs font-medium text-red-600">{errors.termsAgreed.message}</p>
        )}
      </div>

      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
            role="alert"
          >
            <AlertCircle size={16} aria-hidden="true" />
            Something went wrong. Please try again or contact us directly.
          </motion.div>
        )}
      </AnimatePresence>

      <Button type="submit" size="lg" disabled={status === "loading"} className="w-full sm:w-auto" glow>
        {status === "loading" ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden="true" />
            Submitting...
          </>
        ) : (
          "Register as Visitor"
        )}
      </Button>
    </form>
  );
}