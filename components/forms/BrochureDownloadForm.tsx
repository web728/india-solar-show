"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, AlertCircle, Download } from "lucide-react";
import { brochureSchema, type BrochureFormValues } from "@/lib/validation";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-[color:var(--color-black)] placeholder:text-slate-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-gold)] focus-visible:border-transparent";

export function BrochureDownloadForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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

  async function onSubmit(values: BrochureFormValues) {
    setStatus("loading");
    try {
      const res = await fetch("/api/brochure-download", {
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
        <h3 className="text-lg font-bold text-[color:var(--color-black)]">Your Brochure is Ready!</h3>
        <p className="text-sm text-slate-600">Click below to download the India Solar International Show brochure.</p>
        <a
          href="/India-Solar-International-Show-Brochure.pdf"
          download
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-transparent px-6 py-3 text-sm font-semibold text-white transition-all duration-300 md:text-base",
            "bg-[color:var(--color-gold)] hover:brightness-110 shadow-[0_8px_30px_-8px_rgba(247,148,29,0.55)]"
          )}
        >
          <Download size={18} aria-hidden="true" />
          Download Brochure (PDF)
        </a>
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

        <FormField label="Company" htmlFor="company" error={errors.company?.message}>
          <input
            id="company"
            className={inputClass}
            placeholder="Your company"
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

        <FormField label="Country" htmlFor="country" error={errors.country?.message}>
          <input
            id="country"
            className={inputClass}
            placeholder="Your country"
            {...register("country")}
          />
        </FormField>
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
            Processing...
          </>
        ) : (
          "Download Brochure"
        )}
      </Button>
    </form>
  );
}
