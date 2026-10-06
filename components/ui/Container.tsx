import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide" | "full";
};

export function Container({
  children,
  className,
  size = "default",
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10",
        size === "default" && "max-w-site",
        size === "wide" && "max-w-wide",
        size === "full" && "max-w-none",
        className
      )}
    >
      {children}
    </div>
  );
}