"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { contactSchema, type ContactFormValues } from "@/lib/validation";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-[color:var(--color-black)] placeholder:text-slate-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-gold)] focus-visible:border-transparent";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
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
        <h3 className="text-lg font-bold text-[color:var(--color-black)]">Message Sent!</h3>
        <p className="text-sm text-slate-600">Thank you for reaching out. Our team will get back to you shortly.</p>
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
      </div>

      <FormField label="Subject" htmlFor="subject" required error={errors.subject?.message}>
        <input
          id="subject"
          className={inputClass}
          placeholder="Subject of your enquiry"
          aria-invalid={!!errors.subject}
          {...register("subject")}
        />
      </FormField>

      <FormField label="Message" htmlFor="message" required error={errors.message?.message}>
        <textarea
          id="message"
          rows={4}
          className={cn(inputClass, "resize-none")}
          placeholder="How can we help you?"
          aria-invalid={!!errors.message}
          {...register("message")}
        />
      </FormField>

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
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
