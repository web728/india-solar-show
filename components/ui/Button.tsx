"use client";

import Link from "next/link";
import type {
  ReactNode,
  ButtonHTMLAttributes,
} from "react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import { cn } from "@/lib/utils";

type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost";

type Size =
  | "sm"
  | "md"
  | "lg";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  fullWidth?: boolean;
}

interface ButtonAsLink
  extends BaseProps {
  href: string;
  external?: boolean;
  onClick?: () => void;
  type?: never;
  disabled?: never;
  "aria-label"?: string;
}

interface ButtonAsButton
  extends BaseProps,
    Omit<
      ButtonHTMLAttributes<HTMLButtonElement>,
      "className" | "children"
    > {
  href?: undefined;
  external?: never;
}

type ButtonProps =
  | ButtonAsLink
  | ButtonAsButton;

const variants: Record<Variant, string> = {
  primary:
    "border-solar bg-solar text-ink hover:bg-solar-hover hover:border-solar-hover",

  secondary:
    "border-ink bg-ink text-white hover:bg-ink-soft hover:border-ink-soft",

  outline:
    "border-white/25 bg-transparent text-white hover:border-white/45 hover:bg-white/[0.07]",

  ghost:
    "border-transparent bg-transparent text-white/70 hover:bg-white/[0.06] hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "min-h-10 px-4 text-[13px]",
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-6 text-sm sm:px-7 sm:text-[15px]",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  fullWidth = false,
  ...props
}: ButtonProps) {
  const reduceMotion = useReducedMotion();

  const classes = cn(
    "relative inline-flex items-center justify-center gap-2.5 overflow-hidden",
    "rounded-[6px] border font-semibold leading-none whitespace-nowrap",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solar",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
    "disabled:pointer-events-none disabled:opacity-45",
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );

  if ("href" in props && props.href) {
    const {
      href,
      external,
      onClick,
      ...linkRest
    } = props;

    return (
      <motion.div
        className={
          fullWidth
            ? "w-full"
            : "inline-flex"
        }
        whileHover={
          reduceMotion
            ? undefined
            : { y: -2 }
        }
        whileTap={
          reduceMotion
            ? undefined
            : {
                y: 0,
                scale: 0.985,
              }
        }
        transition={{
          duration: 0.18,
          ease: [
            0.22,
            1,
            0.36,
            1,
          ] as const,
        }}
      >
        <Link
          href={href}
          className={classes}
          onClick={onClick}
          {...(external
            ? {
                target: "_blank",
                rel:
                  "noopener noreferrer",
              }
            : {})}
          {...linkRest}
        >
          {children}
        </Link>
      </motion.div>
    );
  }

  const {
    type = "button",
    ...rest
  } = props as ButtonAsButton;

  return (
    <motion.button
      type={type}
      className={classes}
      whileHover={
        reduceMotion
          ? undefined
          : { y: -2 }
      }
      whileTap={
        reduceMotion
          ? undefined
          : {
              y: 0,
              scale: 0.985,
            }
      }
      transition={{
        duration: 0.18,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ] as const,
      }}
      {...(rest as any)}
    >
      {children}
    </motion.button>
  );
}