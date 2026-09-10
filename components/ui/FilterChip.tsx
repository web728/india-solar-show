"use client";

import { cn } from "@/lib/utils";

interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border-2 px-5 py-2.5 text-sm font-bold whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-carrot)]",
        active
          ? "scale-105 border-transparent bg-gradient-to-r from-[color:var(--color-carrot)] to-[color:var(--color-carrot-light)] text-white shadow-[0_8px_24px_-6px_rgba(247,148,29,0.65)]"
          : "border-slate-200 text-slate-600 hover:border-[color:var(--color-carrot)]/50 hover:text-[color:var(--color-carrot)] hover:bg-[color:var(--color-carrot)]/5"
      )}
    >
      {label}
    </button>
  );
}
