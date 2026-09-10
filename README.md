# India Solar International Show 2026 — Website

A single-page, animated marketing site for the **India Solar International Show 2026**
(02–04 Oct 2026, Auto Cluster Exhibition Center, Pune). Built with Next.js (App
Router), React, TypeScript, Tailwind CSS v4, and Framer Motion.

No database, no login, no paid services required. It runs anywhere Node.js runs.

---

## 1. Requirements

- **Node.js 20 or later** (Node 22 LTS recommended)
- npm (comes with Node) — the project uses `package-lock.json`, so stick with npm
  rather than yarn/pnpm unless you regenerate the lockfile

## 2. Local setup

```bash
# 1. Install dependencies
npm install

# 2. (Optional) copy the env template — the site works without it
cp .env.example .env.local

# 3. Run the dev server
npm run dev
```

Open **http://localhost:3000** in your browser.

## 3. Production build

```bash
npm run build   # compiles and type-checks the site
npm run start   # runs the production build on port 3000
```

`npm run build` must complete with no TypeScript errors before every deploy —
if it doesn't, do not ship it; something is broken.

## 4. Deploying

This is a standard Next.js App Router project, so any Next.js-compatible host works:

- **Vercel** (recommended, made by the Next.js team — zero config):
  1. Push this folder to a GitHub/GitLab repo.
  2. Import the repo at vercel.com → it auto-detects Next.js.
  3. Add the environment variables from `.env.example` in the Vercel project
     settings (optional, but recommended for `NEXT_PUBLIC_SITE_URL`).
  4. Deploy.
- **Netlify**, **Railway**, **Render**, or any Node host: run `npm run build`
  then `npm run start`, exposing whatever port the platform assigns via `PORT`.
- **Self-hosted server**: `npm ci && npm run build && npm run start`, put it
  behind Nginx/Caddy with a process manager like `pm2`.

Do **not** deploy this as a static export (`next export`) — the `/api/leads`
route needs a Node server to run.

## 5. Where to edit content

Almost everything on the page is data-driven — you should rarely need to
touch component files just to change text.

| What you want to change | Where |
|---|---|
| Event dates, venue, tagline, contacts, organiser, brochure path | `data/siteData.ts` → `EVENT`, `CONTACTS` |
| Nav menu items | `data/siteData.ts` → `NAV_ITEMS` |
| Any card content (market scope, exhibitor/visitor segments, show highlights, why-participate, workshop themes, value chain) | `data/siteData.ts` — each section has its own exported array |
| Logos (India Solar / Battery / EV / Futurex) | `public/logos/` — replace the PNG files, keep the same filenames referenced in `data/siteData.ts` |
| Downloadable brochure PDF | `public/india-solar-brochure.pdf` — replace with an updated PDF, same filename |
| Colors / fonts / animations | `app/globals.css` (`:root` custom properties at the top hold the brand palette) |
| Page layout / which sections appear and in what order | `app/page.tsx` |
| SEO title/description/OG image | `app/layout.tsx` and `app/opengraph-image.tsx` |

Icons throughout the site are referenced by name (e.g. `"BatteryCharging"`)
and rendered via `components/ui/Icon.tsx`, which maps the string to a
[lucide-react](https://lucide.dev/icons/) icon component. Any icon name from
that library can be used — just make sure the string matches exactly.

## 6. Lead / enquiry form

The contact form (`components/LeadForm.tsx`) posts to `app/api/leads/route.ts`.
There is **no database** wired up. Out of the box, submissions are logged to
the server console/logs. To connect it to a real CRM, email service, or
spreadsheet:

1. Set `LEADS_WEBHOOK_URL` (see `.env.example`) to any webhook endpoint
   (Zapier, Make.com, a Google Apps Script web app, HubSpot inbound webhook,
   etc). The full lead payload (name, company, email, phone, interest type,
   message, timestamp) is POSTed there as JSON automatically — no code
   changes needed.
2. Or, for a custom integration (e.g. sending email via Resend/SendGrid,
   writing to a database), edit `app/api/leads/route.ts` directly — the
   validated lead object is available as the `lead` variable right before
   the webhook call.

Form validation is handled client-side with React Hook Form + Zod
(`lib/validation.ts`) and re-validated server-side in the same route.

## 7. Tech stack reference

- **Next.js 16** (App Router, Turbopack)
- **React 19** / **TypeScript**
- **Tailwind CSS v4** (config lives inline in `app/globals.css` via `@theme`, not a `tailwind.config.js`)
- **Framer Motion** for animation
- **lucide-react** for icons
- **react-hook-form** + **zod** for form validation

## 8. Project structure

```
app/                Next.js routes, layout, metadata, API route
  api/leads/         POST endpoint for the contact form
components/         All UI sections and reusable components
  ui/                Small reusable primitives (Button, Icon, Container, etc.)
data/siteData.ts     Single source of truth for all event content/copy
lib/                 Validation schema, className helper, small hooks
public/              Logos, brochure PDF, static assets
```

## 9. Notes for whoever picks this up

- The countdown timer targets `EVENT.dates.start` in `data/siteData.ts` —
  update this if the show date ever changes.
- All animations respect `prefers-reduced-motion` automatically (see the
  media query at the bottom of `app/globals.css`).
- No fake/placeholder statistics are used anywhere on the site by design —
  if you add new stat-style content, keep that policy.
- Event name is used consistently as **India Solar International Show**;
  "India International Solar Show" only appears as an SEO keyword variant.
