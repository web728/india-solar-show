"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { exhibitorSchema, type ExhibitorFormValues } from "@/lib/validation";
import { COUNTRIES } from "@/lib/countries";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-[color:var(--color-black)] placeholder:text-slate-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-gold)] focus-visible:border-transparent";

const BOOTH_SIZE_OPTIONS = [
  "9 Sqmtr",
  "18 Sqmtr",
  "27 Sqmtr",
  "36 Sqmtr",
  "45 Sqmtr",
  "More than 45 Sqmtr",
] as const;

const SPONSORSHIP_OPTIONS = ["Yes", "No", "Maybe"] as const;

export function ExhibitorRegistrationForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ExhibitorFormValues>({
    resolver: zodResolver(exhibitorSchema),
    defaultValues: {
      fullName: "",
      designation: "",
      company: "",
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

  async function onSubmit(values: ExhibitorFormValues) {
    setStatus("loading");
    try {
      const res = await fetch("/api/exhibitor-registration", {
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
        <h3 className="text-lg font-bold text-[color:var(--color-black)]">Application Received!</h3>
        <p className="text-sm text-slate-600">
          Thank you for your interest in exhibiting. Our team will reach out with stall details shortly.
        </p>
        <Button variant="secondary" onClick={() => setStatus("idle")}>
          Send Another
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div>
        <h3 className="text-base font-bold text-[color:var(--color-black)]">Book Your Stall</h3>
        <p className="mt-1 text-sm text-slate-500">
          Please fill out the following details to register as an exhibitor.
        </p>
      </div>

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

        <FormField label="Designation" htmlFor="designation" required error={errors.designation?.message}>
          <input
            id="designation"
            className={inputClass}
            placeholder="Your designation"
            aria-invalid={!!errors.designation}
            {...register("designation")}
          />
        </FormField>

        <FormField label="Company" htmlFor="company" required error={errors.company?.message}>
          <input
            id="company"
            className={inputClass}
            placeholder="Your company name"
            aria-invalid={!!errors.company}
            {...register("company")}
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
      </div>

      {/* Address block */}
      <div className="rounded-xl border border-slate-200 p-5">
        <h4 className="text-sm font-bold text-[color:var(--color-black)]">Address</h4>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <FormField label="Address Line 1" htmlFor="addressLine1" required error={errors.addressLine1?.message}>
              <input
                id="addressLine1"
                className={inputClass}
                placeholder="Street address"
                aria-invalid={!!errors.addressLine1}
                {...register("addressLine1")}
              />
            </FormField>
          </div>

          <FormField label="City" htmlFor="city" error={errors.city?.message}>
            <input id="city" className={inputClass} placeholder="City" {...register("city")} />
          </FormField>

          <FormField label="State / Province / Region" htmlFor="state" error={errors.state?.message}>
            <input id="state" className={inputClass} placeholder="State / Province / Region" {...register("state")} />
          </FormField>

          <FormField label="Postal Code" htmlFor="postalCode" error={errors.postalCode?.message}>
            <input id="postalCode" className={inputClass} placeholder="Postal code" {...register("postalCode")} />
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
      </div>

      <FormField label="Booth Size Requirement" htmlFor="boothSize" required error={errors.boothSize?.message}>
        <Controller
          control={control}
          name="boothSize"
          render={({ field }) => (
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {BOOTH_SIZE_OPTIONS.map((opt) => (
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

      <FormField
        label="Products/Services to Display"
        htmlFor="productsServices"
        required
        error={errors.productsServices?.message}
      >
        <textarea
          id="productsServices"
          rows={4}
          className={cn(inputClass, "resize-none")}
          placeholder="Describe the products and services you plan to showcase"
          aria-invalid={!!errors.productsServices}
          {...register("productsServices")}
        />
      </FormField>

      <FormField
        label="Sponsorship/Branding Opportunities Interest"
        htmlFor="sponsorshipInterest"
        required
        error={errors.sponsorshipInterest?.message}
      >
        <Controller
          control={control}
          name="sponsorshipInterest"
          render={({ field }) => (
            <div className="flex flex-wrap gap-2.5">
              {SPONSORSHIP_OPTIONS.map((opt) => (
                <label
                  key={opt}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-sm transition-colors",
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

      <div className="space-y-3 rounded-xl border border-slate-200 p-5">
        <label className="flex items-start gap-2.5 text-sm text-slate-600">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 shrink-0 accent-[color:var(--color-gold)]"
            {...register("termsAgreed")}
          />
          <span>
            I have read and agree to the{" "}
            <a href="/terms" target="_blank" className="font-semibold text-[color:var(--color-black)] underline">
              exhibitor terms and conditions
            </a>
            . *
          </span>
        </label>
        {errors.termsAgreed && (
          <p className="text-xs font-medium text-red-600">{errors.termsAgreed.message}</p>
        )}

        <label className="flex items-start gap-2.5 text-sm text-slate-600">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 shrink-0 accent-[color:var(--color-gold)]"
            {...register("declaration")}
          />
          <span>
            I hereby declare that the information provided above is true and accurate to the best of my
            knowledge. *
          </span>
        </label>
        {errors.declaration && (
          <p className="text-xs font-medium text-red-600">{errors.declaration.message}</p>
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
          "Register"
        )}
      </Button>
    </form>
  );
}