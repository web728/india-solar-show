"use client";

import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  glow?: boolean;
}

interface ButtonAsLink extends BaseProps {
  href: string;
  external?: boolean;
  onClick?: () => void;
  type?: never;
  disabled?: never;
  "aria-label"?: string;
}

interface ButtonAsButton extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: undefined;
  external?: never;
}

type ButtonProps = ButtonAsLink | ButtonAsButton;

const variants: Record<Variant, string> = {
  primary:
    "bg-[color:var(--color-carrot)] hover:bg-[color:var(--color-carrot-light)] text-white border-transparent shadow-[0_8px_30px_-8px_rgba(247,148,29,0.55)]",
  secondary:
    "bg-[color:var(--color-twilight)] hover:bg-[color:var(--color-twilight-light)] text-white border-transparent",
  outline:
    "bg-transparent border-white/30 text-white hover:bg-white/10 backdrop-blur-sm",
  ghost:
    "bg-transparent border-transparent text-[color:var(--color-navy)] hover:bg-black/5",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm md:text-base",
  lg: "px-8 py-4 text-base md:text-lg",
};

export function Button({ children, variant = "primary", size = "md", className, glow, ...props }: ButtonProps) {
  const cls = cn(
    "relative inline-flex items-center justify-center gap-2 font-semibold rounded-full border transition-all duration-300 will-change-transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-carrot)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0",
    variants[variant],
    sizes[size],
    glow && "animate-glow-pulse",
    className
  );

  if ("href" in props && props.href) {
    const { href, external, onClick, ...linkRest } = props;
    return (
      <Link
        href={href}
        className={cls}
        onClick={onClick}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...linkRest}
      >
        {children}
      </Link>
    );
  }

  const { type = "button", ...rest } = props as ButtonAsButton;
  return (
    <button type={type} className={cls} {...rest}>
      {children}
    </button>
  );
}
