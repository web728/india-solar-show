import { Phone, Mail, MessageCircle, UserRound } from "lucide-react";
import { CONTACTS } from "@/data/siteData";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Button } from "@/components/ui/Button";

export function ContactCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
      {CONTACTS.map((person, i) => (
        <AnimatedCard key={person.name} delay={i * 0.1} tilt={false} className="p-6">
          <div className="flex items-center gap-3.5">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF9F1C] via-[#F7941D] to-[#D97D0A] text-white border border-[color:var(--color-gold)]/20 shadow-[0_0_25px_rgba(247,148,29,0.55),0_10px_30px_rgba(247,148,29,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(247,148,29,0.75)]">
              <UserRound size={26} strokeWidth={2.2} />
            </span>
            <div>
              <h3 className="text-base font-bold text-[color:var(--color-black)]">{person.name}</h3>
              <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-gold)]">
                Event Team
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-4">
            <p className="flex items-center gap-2 text-sm text-slate-600">
              <Phone size={14} className="text-slate-400" aria-hidden="true" />
              {person.phone}
            </p>
            <p className="flex items-center gap-2 text-sm text-slate-600">
              <Mail size={14} className="text-slate-400" aria-hidden="true" />
              {person.email}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button href={person.phoneHref} size="sm" aria-label={`Call ${person.name}`}>
              <Phone size={14} aria-hidden="true" />
              Call
            </Button>
            <Button
              href={`mailto:${person.email}`}
              size="sm"
              variant="outline"
              className="!text-[color:var(--color-black)] !border-slate-300 hover:!bg-slate-100"
              aria-label={`Email ${person.name}`}
            >
              <Mail size={14} aria-hidden="true" />
              Email
            </Button>
            <Button
              href={person.whatsapp}
              external
              size="sm"
              className="!bg-emerald-500 hover:!bg-emerald-600"
              aria-label={`WhatsApp ${person.name}`}
            >
              <MessageCircle size={14} aria-hidden="true" />
              WhatsApp
            </Button>
          </div>
        </AnimatedCard>
      ))}
    </div>
  );
}
