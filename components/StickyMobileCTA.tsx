"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 500);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-white/10 bg-[color:var(--color-black)]/95 p-3 backdrop-blur-md transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <Button href="/exhibitor" size="md" className="flex-1">
        Book Your Stall
      </Button>
      <Button href="tel:+919871839040" variant="outline" size="md" aria-label="Call event team">
        Call
      </Button>
    </div>
  );
}
