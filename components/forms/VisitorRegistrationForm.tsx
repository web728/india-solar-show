"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import Script from "next/script";

import {
  Controller,
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
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  X,
} from "lucide-react";

import type {
  LucideIcon,
} from "lucide-react";

import {
  visitorSchema,
  type VisitorFormValues,
} from "@/lib/validation";

import {
  COUNTRIES,
} from "@/lib/countries";

import {
  FormField,
} from "@/components/ui/FormField";

import {
  Button,
} from "@/components/ui/Button";

import {
  cn,
} from "@/lib/utils";

import {
  getRecaptcha,
} from "@/lib/recaptcha";

/* =========================================================
   CONSTANTS
========================================================= */

const RECAPTCHA_SITE_KEY =
  process.env
    .NEXT_PUBLIC_RECAPTCHA_SITE_KEY ??
  "";

const EASE =
  [0.16, 1, 0.3, 1] as const;

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

/* =========================================================
   CLASSES
========================================================= */

const inputClass = `
  w-full
  min-h-11
  rounded-xl
  border
  border-ink/[0.09]
  bg-paper
  px-3.5
  py-2.5
  text-[13px]
  leading-5
  text-ink

  placeholder:text-ink/28

  transition-all
  duration-300

  hover:border-ink/20

  focus-visible:border-blue
  focus-visible:outline-none
  focus-visible:ring-4
  focus-visible:ring-blue/[0.07]

  disabled:cursor-not-allowed
  disabled:opacity-60
`;

const cardClass = `
  rounded-[20px]
  border
  border-ink/[0.075]
  bg-paper
  p-4
  shadow-[0_12px_38px_rgba(9,25,31,0.035)]

  sm:p-5
  lg:p-6
`;

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  number,
  title,
  description,
  icon: Icon,
}: {
  number: string;

  title: string;

  description?: string;

  icon: LucideIcon;
}) {
  return (
    <div
      className="
        mb-5
        flex
        items-start
        justify-between
        gap-4
        border-b
        border-ink/[0.065]
        pb-4
      "
    >
      <div
        className="
          flex
          min-w-0
          items-start
          gap-3
        "
      >
        <span
          className="
            flex
            size-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-blue/10
            bg-blue/[0.055]
            text-blue
          "
        >
          <Icon
            className="size-4"
            strokeWidth={1.8}
          />
        </span>

        <div className="min-w-0">
          <h3
            className="
              font-display
              text-[15px]
              font-semibold
              leading-tight
              tracking-[-0.02em]
              text-ink

              sm:text-[17px]
            "
          >
            {title}
          </h3>

          {description && (
            <p
              className="
                mt-1
                max-w-[560px]
                text-[10px]
                leading-5
                text-ink/40

                sm:text-[11px]
              "
            >
              {description}
            </p>
          )}
        </div>
      </div>

      <span
        aria-hidden="true"
        className="
          shrink-0
          pt-1
          font-display
          text-[9px]
          font-semibold
          tracking-[0.16em]
          text-ink/20
        "
      >
        {number}
      </span>
    </div>
  );
}

/* =========================================================
   SUCCESS MODAL
========================================================= */

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
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-ink/60
            px-4
            py-8
            backdrop-blur-[6px]
          "
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 18,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 10,
              scale: 0.98,
            }}
            transition={{
              duration: 0.35,
              ease: EASE,
            }}
            className="
              relative
              w-full
              max-w-[500px]
              overflow-hidden
              rounded-[24px]
              border
              border-paper/10
              bg-paper
              shadow-[0_28px_100px_rgba(0,0,0,0.28)]
            "
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="
                absolute
                right-4
                top-4
                z-20
                flex
                size-9
                items-center
                justify-center
                rounded-full
                border
                border-ink/[0.08]
                bg-paper
                text-ink/40
                transition

                hover:text-ink
              "
            >
              <X className="size-4" />
            </button>

            <div
              className="
                relative
                px-6
                py-9
                text-center

                sm:px-9
              "
            >
              <div
                className="
                  mx-auto
                  flex
                  size-14
                  items-center
                  justify-center
                  rounded-full
                  bg-solar
                  text-ink
                "
              >
                <CheckCircle2 className="size-6" />
              </div>

              <span
                className="
                  mt-5
                  block
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-blue
                "
              >
                Registration Received
              </span>

              <h3
                className="
                  mt-2
                  font-display
                  text-[24px]
                  font-semibold
                  leading-[1.08]
                  tracking-[-0.035em]
                  text-ink

                  sm:text-[28px]
                "
              >
                You’re Registered as a Visitor
              </h3>

              <p
                className="
                  mx-auto
                  mt-4
                  max-w-[400px]
                  text-[12px]
                  leading-6
                  text-ink/48

                  sm:text-[13px]
                "
              >
                Thank you for registering for India Solar
                International Show. Our team has received your
                visitor details successfully.
              </p>

              <Button
                type="button"
                size="md"
                onClick={onClose}
                className="
                  mt-6
                  min-w-[170px]
                  justify-center
                "
              >
                Done
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* =========================================================
   COMPONENT
========================================================= */

export function VisitorRegistrationForm() {
  const [
    status,
    setStatus,
  ] =
    useState<
      | "idle"
      | "loading"
      | "success"
      | "error"
    >("idle");

  const [
    apiError,
    setApiError,
  ] =
    useState("");

  const [
    captchaReady,
    setCaptchaReady,
  ] =
    useState(false);

  const [
    captchaToken,
    setCaptchaToken,
  ] =
    useState("");

  const [
    captchaError,
    setCaptchaError,
  ] =
    useState("");

  const captchaElementRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const captchaWidgetIdRef =
    useRef<number | null>(
      null,
    );

  const {
    register,
    handleSubmit,
    control,
    reset,

    formState: {
      errors,
    },
  } =
    useForm<VisitorFormValues>({
      resolver:
        zodResolver(
          visitorSchema,
        ),

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

  /* =======================================================
     CAPTCHA RENDER
  ======================================================= */

  useEffect(() => {
    if (
      !captchaReady ||
      !RECAPTCHA_SITE_KEY ||
      !captchaElementRef.current
    ) {
      return;
    }

    if (
      captchaWidgetIdRef.current !==
      null
    ) {
      return;
    }

    let cancelled =
      false;

    let timer:
      | ReturnType<
          typeof setTimeout
        >
      | null = null;

    const renderCaptcha =
      () => {
        if (cancelled) {
          return;
        }

        const grecaptcha =
          getRecaptcha();

        if (
          !grecaptcha ||
          typeof grecaptcha.render !==
            "function"
        ) {
          timer =
            setTimeout(
              renderCaptcha,
              150,
            );

          return;
        }

        if (
          !captchaElementRef.current ||
          captchaWidgetIdRef.current !==
            null
        ) {
          return;
        }

        try {
          captchaWidgetIdRef.current =
            grecaptcha.render(
              captchaElementRef.current,
              {
                sitekey:
                  RECAPTCHA_SITE_KEY,

                theme:
                  "light",

                size:
                  "normal",

                callback:
                  (
                    token,
                  ) => {
                    setCaptchaToken(
                      token,
                    );

                    setCaptchaError(
                      "",
                    );
                  },

                "expired-callback":
                  () => {
                    setCaptchaToken(
                      "",
                    );

                    setCaptchaError(
                      "Verification expired. Please verify again.",
                    );
                  },

                "error-callback":
                  () => {
                    setCaptchaToken(
                      "",
                    );

                    setCaptchaError(
                      "reCAPTCHA could not be loaded. Please try again.",
                    );
                  },
              },
            );
        } catch (error) {
          console.error(
            "[Visitor Form] Failed to render reCAPTCHA:",
            error,
          );

          setCaptchaError(
            "Verification could not be initialized. Please refresh the page and try again.",
          );
        }
      };

    renderCaptcha();

    return () => {
      cancelled =
        true;

      if (timer) {
        clearTimeout(
          timer,
        );
      }
    };
  }, [
    captchaReady,
  ]);

  /* =======================================================
     RESET CAPTCHA
  ======================================================= */

  function resetCaptcha() {
    setCaptchaToken("");

    const grecaptcha =
      getRecaptcha();

    if (
      typeof grecaptcha?.reset ===
        "function" &&
      captchaWidgetIdRef.current !==
        null
    ) {
      grecaptcha.reset(
        captchaWidgetIdRef.current,
      );
    }
  }

  /* =======================================================
     SUBMIT
  ======================================================= */

  async function onSubmit(
    values:
      VisitorFormValues,
  ) {
    if (
      status ===
      "loading"
    ) {
      return;
    }

    setApiError("");

    if (
      !RECAPTCHA_SITE_KEY
    ) {
      setCaptchaError(
        "reCAPTCHA is not configured.",
      );

      return;
    }

    if (!captchaToken) {
      setCaptchaError(
        "Please confirm that you are not a robot.",
      );

      return;
    }

    setCaptchaError("");

    setStatus(
      "loading",
    );

    try {
      const response =
        await fetch(
          "/api/visitor-registration",
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                ...values,

                recaptchaToken:
                  captchaToken,
              }),
          },
        );

      const data =
        (await response.json()) as {
          success?: boolean;

          message?: string;
        };

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Something went wrong while submitting your registration.",
        );
      }

      reset({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        designation: "",
        country: "India",
        industry: "",
        visitPurpose: "",
        termsAgreed: false,
      });

      resetCaptcha();

      setStatus(
        "success",
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      setApiError(
        message,
      );

      setStatus(
        "error",
      );

      resetCaptcha();
    }
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <>
      <Script
        id="google-recaptcha-visitor"
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => {
          setCaptchaReady(
            true,
          );
        }}
        onError={() => {
          setCaptchaReady(
            false,
          );

          setCaptchaError(
            "reCAPTCHA failed to load. Please check your connection.",
          );
        }}
      />

      <SuccessModal
        open={
          status ===
          "success"
        }
        onClose={() => {
          setStatus(
            "idle",
          );
        }}
      />

      <form
        onSubmit={
          handleSubmit(
            onSubmit,
          )
        }
        noValidate
        className="
          w-full
          space-y-4
        "
      >
        {/* =================================================
            INTRO
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            ease: EASE,
          }}
          className="
            relative
            overflow-hidden
            rounded-[22px]
            bg-ink
            px-5
            py-6
            text-paper

            sm:px-6
            sm:py-7
          "
        >
          <div
            aria-hidden="true"
            className="
              absolute
              -right-20
              -top-24
              size-56
              rounded-full
              bg-blue/25
              blur-[85px]
            "
          />

          <div
            className="
              relative
              z-10
              flex
              items-start
              gap-4
            "
          >
            <span
              className="
                flex
                size-11
                shrink-0
                items-center
                justify-center
                rounded-2xl
                border
                border-paper/10
                bg-paper/[0.05]
                text-solar
              "
            >
              <UserRoundCheck
                className="size-[18px]"
              />
            </span>

            <div>
              <span
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-solar
                "
              >
                Visitor Registration
              </span>

              <h2
                className="
                  mt-1.5
                  font-display
                  text-[22px]
                  font-semibold
                  leading-[1.08]
                  tracking-[-0.035em]

                  sm:text-[27px]
                "
              >
                Register Your Visit
              </h2>

              <p
                className="
                  mt-3
                  max-w-[650px]
                  text-[11px]
                  leading-5
                  text-paper/48

                  sm:text-[12px]
                "
              >
                Register your details to attend the India Solar
                International Show and connect with exhibitors,
                suppliers and industry leaders.
              </p>
            </div>
          </div>
        </motion.div>

        {/* =================================================
            VISITOR DETAILS
        ================================================= */}

        <section className={cardClass}>
          <SectionHeading
            number="01"
            title="Visitor Details"
            description="Tell us who you are and how our team can reach you."
            icon={
              UserRoundCheck
            }
          />

          <div
            className="
              grid
              grid-cols-1
              gap-4

              sm:grid-cols-2
            "
          >
            <FormField
              label="Full Name"
              htmlFor="fullName"
              required
              error={
                errors
                  .fullName
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
              label="Email"
              htmlFor="email"
              required
              error={
                errors
                  .email
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
                placeholder="you@email.com"
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
                errors
                  .phone
                  ?.message
              }
            >
              <input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className={
                  inputClass
                }
                placeholder="+91 98765 43210"
                aria-invalid={
                  !!errors.phone
                }
                {...register(
                  "phone",
                )}
              />
            </FormField>

            <FormField
              label="Company"
              htmlFor="company"
              error={
                errors
                  .company
                  ?.message
              }
            >
              <input
                id="company"
                autoComplete="organization"
                className={
                  inputClass
                }
                placeholder="Company name (optional)"
                {...register(
                  "company",
                )}
              />
            </FormField>

            <FormField
              label="Designation"
              htmlFor="designation"
              error={
                errors
                  .designation
                  ?.message
              }
            >
              <input
                id="designation"
                autoComplete="organization-title"
                className={
                  inputClass
                }
                placeholder="Designation (optional)"
                {...register(
                  "designation",
                )}
              />
            </FormField>

            <FormField
              label="Country"
              htmlFor="country"
              required
              error={
                errors
                  .country
                  ?.message
              }
            >
              <select
                id="country"
                className={cn(
                  inputClass,
                  "cursor-pointer",
                )}
                aria-invalid={
                  !!errors.country
                }
                {...register(
                  "country",
                )}
              >
                <option value="">
                  Select country
                </option>

                {COUNTRIES.map(
                  (
                    country,
                  ) => (
                    <option
                      key={
                        country
                      }
                      value={
                        country
                      }
                    >
                      {country}
                    </option>
                  ),
                )}
              </select>
            </FormField>
          </div>
        </section>

        {/* =================================================
            VISIT PROFILE
        ================================================= */}

        <section className={cardClass}>
          <SectionHeading
            number="02"
            title="Visit Profile"
            description="Help us understand your industry and primary purpose of attending."
            icon={
              BriefcaseBusiness
            }
          />

          <FormField
            label="Industry"
            htmlFor="industry"
            required
            error={
              errors
                .industry
                ?.message
            }
          >
            <select
              id="industry"
              className={cn(
                inputClass,
                "cursor-pointer",
              )}
              aria-invalid={
                !!errors.industry
              }
              {...register(
                "industry",
              )}
            >
              <option value="">
                Select your industry
              </option>

              {INDUSTRY_OPTIONS.map(
                (
                  option,
                ) => (
                  <option
                    key={
                      option
                    }
                    value={
                      option
                    }
                  >
                    {option}
                  </option>
                ),
              )}
            </select>
          </FormField>

          <div className="mt-5">
            <FormField
              label="Purpose of Visit"
              htmlFor="visitPurpose"
              required
              error={
                errors
                  .visitPurpose
                  ?.message
              }
            >
              <Controller
                control={
                  control
                }
                name="visitPurpose"
                render={({
                  field,
                }) => (
                  <div
                    id="visitPurpose"
                    className="
                      grid
                      grid-cols-1
                      gap-2

                      sm:grid-cols-2
                    "
                  >
                    {VISIT_PURPOSE_OPTIONS.map(
                      (
                        option,
                      ) => {
                        const active =
                          field.value ===
                          option;

                        return (
                          <label
                            key={
                              option
                            }
                            className={cn(
                              `
                                relative
                                flex
                                min-h-[46px]
                                cursor-pointer
                                items-center
                                gap-2.5
                                rounded-xl
                                border
                                px-3
                                py-2.5
                                text-[11px]
                                font-medium
                                transition-all
                              `,

                              active
                                ? `
                                    border-blue
                                    bg-blue/[0.055]
                                    text-ink
                                  `
                                : `
                                    border-ink/[0.08]
                                    text-ink/48

                                    hover:border-blue/20
                                    hover:text-ink
                                  `,
                            )}
                          >
                            <input
                              type="radio"
                              className="sr-only"
                              checked={
                                active
                              }
                              onChange={() =>
                                field.onChange(
                                  option,
                                )
                              }
                            />

                            <span
                              className={cn(
                                `
                                  flex
                                  size-4
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-full
                                  border
                                `,
                                active
                                  ? "border-blue bg-blue"
                                  : "border-ink/15",
                              )}
                            >
                              {active && (
                                <Check
                                  className="
                                    size-2.5
                                    text-paper
                                  "
                                />
                              )}
                            </span>

                            {option}
                          </label>
                        );
                      },
                    )}
                  </div>
                )}
              />
            </FormField>
          </div>
        </section>

        {/* =================================================
            TERMS + CAPTCHA
        ================================================= */}

        <section
          className={cn(
            cardClass,
            "bg-blue/[0.018]",
          )}
        >
          <SectionHeading
            number="03"
            title="Confirmation & Security"
            description="Accept the terms and complete verification before registering."
            icon={
              ShieldCheck
            }
          />

          <label
            className="
              flex
              cursor-pointer
              items-start
              gap-3
              rounded-xl
              border
              border-ink/[0.07]
              bg-paper
              px-3.5
              py-3
              text-[11px]
              leading-5
              text-ink/50
            "
          >
            <input
              type="checkbox"
              className="
                mt-0.5
                size-4
                shrink-0
                accent-blue
              "
              {...register(
                "termsAgreed",
              )}
            />

            <span>
              I agree to the{" "}

              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  font-semibold
                  text-blue
                  underline
                  decoration-blue/20
                  underline-offset-2
                "
              >
                terms and conditions
              </a>
              .
            </span>
          </label>

          {errors
            .termsAgreed && (
            <p
              className="
                mt-2
                text-[10px]
                font-medium
                text-red-600
              "
            >
              {
                errors
                  .termsAgreed
                  .message
              }
            </p>
          )}

          <div
            className="
              mt-5
              border-t
              border-ink/[0.07]
              pt-5
            "
          >
            <div
              className="
                mb-3
                flex
                items-start
                justify-between
              "
            >
              <div>
                <span
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    text-blue
                  "
                >
                  Human Verification
                </span>

                <p
                  className="
                    mt-1
                    text-[10px]
                    text-ink/38
                  "
                >
                  Complete the security check before submitting.
                </p>
              </div>

              <ShieldCheck
                className="
                  size-4
                  text-solar
                "
              />
            </div>

            <div
              className="
                max-w-full
                overflow-x-auto
                rounded-xl
                border
                border-ink/[0.08]
                bg-paper
                p-3

                [scrollbar-width:none]

                [&::-webkit-scrollbar]:hidden
              "
            >
              {RECAPTCHA_SITE_KEY ? (
                <div
                  ref={
                    captchaElementRef
                  }
                  className="
                    min-h-[78px]
                    min-w-[304px]
                  "
                />
              ) : (
                <div
                  className="
                    flex
                    min-h-[78px]
                    items-center
                    gap-2
                    text-[11px]
                    text-red-600
                  "
                >
                  <AlertCircle className="size-4" />

                  reCAPTCHA key is missing.
                </div>
              )}
            </div>

            <AnimatePresence
              initial={false}
            >
              {captchaError && (
                <motion.p
                  initial={{
                    opacity: 0,
                    y: -4,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  role="alert"
                  className="
                    mt-2
                    flex
                    items-center
                    gap-2
                    text-[10px]
                    font-medium
                    text-red-600
                  "
                >
                  <AlertCircle
                    className="size-3.5"
                  />

                  {captchaError}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* =================================================
            API ERROR
        ================================================= */}

        <AnimatePresence
          initial={false}
        >
          {status ===
            "error" &&
            apiError && (
              <motion.div
                initial={{
                  opacity: 0,
                  height: 0,
                }}
                animate={{
                  opacity: 1,
                  height:
                    "auto",
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                }}
                role="alert"
                className="
                  flex
                  items-start
                  gap-2.5
                  overflow-hidden
                  rounded-xl
                  border
                  border-red-500/15
                  bg-red-500/[0.045]
                  px-4
                  py-3
                  text-[11px]
                  font-medium
                  text-red-700
                "
              >
                <AlertCircle
                  className="
                    mt-0.5
                    size-4
                    shrink-0
                  "
                />

                {apiError}
              </motion.div>
            )}
        </AnimatePresence>

        {/* =================================================
            SUBMIT
        ================================================= */}

        <div
          className="
            rounded-[20px]
            border
            border-ink/[0.075]
            bg-paper
            p-4

            sm:p-5
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
            <div
              className="
                flex
                max-w-[420px]
                items-start
                gap-2.5
              "
            >
              <Sparkles
                className="
                  mt-0.5
                  size-4
                  shrink-0
                  text-solar
                "
              />

              <p
                className="
                  text-[9px]
                  leading-4
                  text-ink/35

                  sm:text-[10px]
                "
              >
                Submit your visitor details once. Our team will
                keep your registration on record for the event.
              </p>
            </div>

            <Button
              type="submit"
              size="md"
              disabled={
                status ===
                  "loading" ||
                !RECAPTCHA_SITE_KEY
              }
              className="
                group
                w-full
                justify-center
                gap-2.5

                sm:w-auto
                sm:min-w-[210px]
              "
            >
              {status ===
              "loading" ? (
                <>
                  <Loader2
                    className="
                      size-4
                      animate-spin
                    "
                  />

                  Submitting...
                </>
              ) : (
                <>
                  Register as Visitor

                  <ArrowUpRight
                    className="
                      size-4
                      transition-transform

                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                    "
                  />
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}