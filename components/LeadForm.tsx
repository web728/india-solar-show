"use client";

import {
  useState,
} from "react";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import {
  leadSchema,
  type LeadFormValues,
} from "@/lib/validation";

import {
  INTEREST_TYPES,
} from "@/data/siteData";

import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/* =========================================================
   Motion
   ========================================================= */

const EASE =
  [0.16, 1, 0.3, 1] as const;

/* =========================================================
   Inputs
   ========================================================= */

const inputClass = `
  w-full
  rounded-xl
  border
  border-ink/[0.1]
  bg-paper
  px-3.5
  py-2.5
  text-[13px]
  leading-5
  text-ink

  placeholder:text-ink/30

  transition-[border-color,box-shadow,background-color]
  duration-300

  hover:border-ink/20

  focus-visible:border-blue
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-blue/10

  disabled:cursor-not-allowed
  disabled:opacity-60
`;

/* =========================================================
   Lead Form
   ========================================================= */

export function LeadForm() {
  const [
    status,
    setStatus,
  ] =
    useState<
      "idle" |
      "loading" |
      "success" |
      "error"
    >("idle");

  const {
    register,
    handleSubmit,
    reset,

    formState: {
      errors,
    },
  } =
    useForm<LeadFormValues>({
      resolver:
        zodResolver(
          leadSchema,
        ),

      defaultValues: {
        fullName: "",
        company: "",
        email: "",
        phone: "",
        designation: "",
        country: "",
        interestType:
          "General Enquiry",
        message: "",
      },
    });

  /* =======================================================
     Submit
     ======================================================= */

  async function onSubmit(
    values:
      LeadFormValues,
  ) {
    setStatus(
      "loading",
    );

    try {
      const res =
        await fetch(
          "/api/leads",
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(
                values,
              ),
          },
        );

      const data =
        await res.json();

      if (
        !res.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Something went wrong.",
        );
      }

      setStatus(
        "success",
      );

      reset();
    } catch {
      setStatus(
        "error",
      );
    }
  }

  /* =======================================================
     Success State
     ======================================================= */

  if (
    status ===
    "success"
  ) {
    return (
      <motion.div
        initial={{
          opacity: 0,
          y: 12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          ease: EASE,
        }}
        role="status"
        className="
          relative
          flex
          min-h-[390px]
          flex-col
          items-center
          justify-center
          overflow-hidden
          rounded-2xl
          border
          border-blue/10
          bg-blue/[0.025]
          px-6
          py-9
          text-center
        "
      >
        {/* glow */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-16
            -top-16
            size-48
            rounded-full
            bg-solar/[0.08]
            blur-[70px]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -bottom-20
            -left-16
            size-44
            rounded-full
            bg-blue/[0.055]
            blur-[75px]
          "
        />

        <span
          className="
            relative
            flex
            size-12
            items-center
            justify-center
            rounded-full
            bg-solar
            text-ink
          "
        >
          <CheckCircle2
            aria-hidden="true"
            className="size-5"
            strokeWidth={
              1.9
            }
          />
        </span>

        <span
          className="
            relative
            mt-5
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.14em]
            text-blue
          "
        >
          Enquiry Received
        </span>

        <h3
          className="
            relative
            mt-2
            font-display
            text-[1.4rem]
            font-semibold
            tracking-[-0.025em]
            text-ink
          "
        >
          Thank You for Getting in Touch
        </h3>

        <p
          className="
            relative
            mt-3
            max-w-[410px]
            text-[12px]
            leading-6
            text-ink/48

            sm:text-[13px]
          "
        >
          Your enquiry has been submitted successfully.
          Our event team will review your requirement
          and contact you with the relevant information.
        </p>

        <Button
          variant="outline"
          size="md"
          onClick={() =>
            setStatus(
              "idle",
            )
          }
          className="
            relative
            mt-6
            border-ink/10
            bg-paper
            text-ink

            hover:border-blue
            hover:bg-blue
            hover:text-paper
          "
        >
          Send Another Enquiry
        </Button>
      </motion.div>
    );
  }

  /* =======================================================
     Form
     ======================================================= */

  return (
    <form
      onSubmit={
        handleSubmit(
          onSubmit,
        )
      }
      noValidate
      className="
        flex
        h-full
        flex-col
      "
    >
      {/* ===================================================
          Basic Details
          =================================================== */}

      <div
        className="
          grid
          grid-cols-1
          gap-x-4
          gap-y-3.5

          sm:grid-cols-2
        "
      >
        <FormField
          label="Full Name"
          htmlFor="fullName"
          required
          error={
            errors.fullName
              ?.message
          }
        >
          <input
            id="fullName"
            autoComplete="name"
            className={
              inputClass
            }
            placeholder="Your full name"
            aria-invalid={
              !!errors.fullName
            }
            {...register(
              "fullName",
            )}
          />
        </FormField>

        <FormField
          label="Company Name"
          htmlFor="company"
          error={
            errors.company
              ?.message
          }
        >
          <input
            id="company"
            autoComplete="organization"
            className={
              inputClass
            }
            placeholder="Your company"
            {...register(
              "company",
            )}
          />
        </FormField>

        <FormField
          label="Email"
          htmlFor="email"
          required
          error={
            errors.email
              ?.message
          }
        >
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={
              inputClass
            }
            placeholder="you@company.com"
            aria-invalid={
              !!errors.email
            }
            {...register(
              "email",
            )}
          />
        </FormField>

        <FormField
          label="Phone"
          htmlFor="phone"
          required
          error={
            errors.phone
              ?.message
          }
        >
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            className={
              inputClass
            }
            placeholder="+91 00000 00000"
            aria-invalid={
              !!errors.phone
            }
            {...register(
              "phone",
            )}
          />
        </FormField>

        <FormField
          label="Designation"
          htmlFor="designation"
          error={
            errors.designation
              ?.message
          }
        >
          <input
            id="designation"
            autoComplete="organization-title"
            className={
              inputClass
            }
            placeholder="Your designation"
            {...register(
              "designation",
            )}
          />
        </FormField>

        <FormField
          label="Country"
          htmlFor="country"
          error={
            errors.country
              ?.message
          }
        >
          <input
            id="country"
            autoComplete="country-name"
            className={
              inputClass
            }
            placeholder="Your country"
            {...register(
              "country",
            )}
          />
        </FormField>
      </div>

      {/* ===================================================
          Interest
          =================================================== */}

      <div className="mt-3.5">
        <FormField
          label="Interest Type"
          htmlFor="interestType"
          required
          error={
            errors.interestType
              ?.message
          }
        >
          <select
            id="interestType"
            className={cn(
              inputClass,
              `
                cursor-pointer
                pr-10
              `,
            )}
            aria-invalid={
              !!errors.interestType
            }
            {...register(
              "interestType",
            )}
          >
            {INTEREST_TYPES.map(
              (
                type,
              ) => (
                <option
                  key={
                    type
                  }
                  value={
                    type
                  }
                >
                  {type}
                </option>
              ),
            )}
          </select>
        </FormField>
      </div>

      {/* ===================================================
          Message
          =================================================== */}

      <div className="mt-3.5">
        <FormField
          label="Message"
          htmlFor="message"
          error={
            errors.message
              ?.message
          }
        >
          <textarea
            id="message"
            rows={3}
            className={cn(
              inputClass,
              `
                min-h-[96px]
                resize-none
              `,
            )}
            placeholder="Tell us a bit about your requirement (optional)"
            {...register(
              "message",
            )}
          />
        </FormField>
      </div>

      {/* ===================================================
          Error
          =================================================== */}

      <AnimatePresence
        initial={false}
      >
        {status ===
          "error" && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
              y: -4,
            }}
            animate={{
              opacity: 1,
              height: "auto",
              y: 0,
            }}
            exit={{
              opacity: 0,
              height: 0,
              y: -4,
            }}
            transition={{
              duration:
                0.25,
            }}
            className="
              mt-3.5
              flex
              items-start
              gap-2.5
              overflow-hidden
              rounded-xl
              border
              border-red-500/15
              bg-red-500/[0.05]
              px-3.5
              py-2.5
              text-[11px]
              font-medium
              leading-5
              text-red-700
            "
            role="alert"
          >
            <AlertCircle
              aria-hidden="true"
              className="
                mt-0.5
                size-3.5
                shrink-0
              "
              strokeWidth={
                1.8
              }
            />

            <span>
              Something went wrong. Please try again
              or contact our team directly.
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================================================
          Submit
          =================================================== */}

      <div
        className="
          mt-5
          border-t
          border-ink/[0.07]
          pt-4
        "
      >
        <div
          className="
            flex
            flex-col
            gap-4

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p
            className="
              max-w-[330px]
              text-[9px]
              leading-4
              text-ink/30
            "
          >
            Submit your details and our team will connect
            you with the right event information.
          </p>

          <Button
            type="submit"
            size="md"
            disabled={
              status ===
              "loading"
            }
            className="
              group/submit
              w-full
              justify-center
              gap-2.5

              sm:w-auto
              sm:min-w-[190px]
            "
          >
            {status ===
            "loading" ? (
              <>
                <Loader2
                  aria-hidden="true"
                  className="
                    size-4
                    animate-spin
                  "
                  strokeWidth={
                    1.8
                  }
                />

                Submitting...
              </>
            ) : (
              <>
                Submit Enquiry

                <ArrowUpRight
                  aria-hidden="true"
                  className="
                    size-4

                    transition-transform
                    duration-300

                    group-hover/submit:translate-x-0.5
                    group-hover/submit:-translate-y-0.5
                  "
                  strokeWidth={
                    1.8
                  }
                />
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}