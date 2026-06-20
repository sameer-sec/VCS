# Visual Content Solution — Agency Website

A premium, conversion-focused Next.js 15 website built for Visual Content Solution.

## Tech Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- React Icons + Lucide React
- Resend (contact form email delivery)
- Zod (server-side form validation)
- Vimeo embed (VSL) + Calendly embed (booking)

## Getting Started

```bash
npm install
cp .env.example .env.local   # then add your Resend API key
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Before You Deploy

1. **Resend API key (required for the contact form)** — sign up free at [resend.com](https://resend.com), grab an API key, and add it to `.env.local`:
   ```
   RESEND_API_KEY=re_your_key_here
   ```
   On Vercel, add the same variable under Project → Settings → Environment Variables. Without this, the contact form returns a clear "email service not configured" error instead of failing silently.
2. **Verify a sending domain (recommended)** — by default, emails send from `onboarding@resend.dev`, which works immediately but looks less professional. To send from your own domain, verify it in the Resend dashboard, then set `CONTACT_FORM_FROM` in your env vars (see `.env.example`).
3. **Calendly URL** — open `src/lib/content.ts` and replace `calendlyUrl` with your real Calendly link.
4. **VSL video** — `siteConfig.vimeoId` in `src/lib/content.ts` is set to your Vimeo video (`1039024157`). To swap it for a different video, just replace that ID.
5. **Domain** — update `siteConfig.url` in `src/lib/content.ts` to your live domain once connected (used for SEO metadata, sitemap, canonical URL, and Open Graph tags).
6. **Team photos** — drop real photos into `public/team/` named `member1.jpg` through `member4.jpg` (see `public/team/README.md`). No code changes needed. Missing files automatically fall back to a professional avatar icon.
7. **Testimonial photos** — same pattern in `src/components/sections/Testimonials.tsx` if you want real client photos instead of initials.

## The Logo

`public/logo-transparent.png` is your **exact uploaded logo** — cropped tightly to its bounding box and with the black canvas around it made transparent. No pixels inside the mark were redrawn, recolored, or recreated. This single file drives every logo placement on the site:

- Navbar (`src/components/ui/Logo.tsx`)
- Footer (via the same `Logo` component)
- Mobile menu (via the same `Logo` component)
- Loading state (`src/app/loading.tsx`)
- Contact section (`src/components/sections/Contact.tsx`)
- Favicon / browser tab (`src/app/icon.png`, `public/favicon.ico`, `public/favicon-*.png`)
- Open Graph / social preview image (`public/og-image.png` — your logo composited onto a branded background, logo pixels untouched)

`public/logo-master.png` is the same exact crop without the transparency pass (opaque lime square), kept in case you need it for a context where transparency isn't wanted.

If you ever need to regenerate the favicon/OG sizes from a *new* logo file, replace `public/logo-transparent.png` and re-run the same crop/resize steps — the rest of the site reads from that one file.

## Contact Form

`src/app/api/contact/route.ts` is a Next.js API route that:

- Validates name, email, and message server-side with Zod (rejects invalid emails, too-short messages, oversized input)
- Sends the submission to **visualcontentsolution@gmail.com** via Resend, with the sender's email set as `reply-to` so you can just hit reply
- Includes name, email, company, and message in both plain-text and styled HTML email formats
- Has two layers of spam protection:
  - A honeypot field (`website`) that's invisible to real users but visible to most bots — any submission with it filled is silently dropped
  - A minimum-time check that rejects submissions completed in under 3 seconds (faster than a human can plausibly fill the form)
- Returns a real success/error JSON response, which the form uses to show an inline success state or a specific error message — no more fake "simulated" submission

To change the recipient without touching code, set `CONTACT_FORM_RECIPIENT` in your environment variables.

## Booking (Calendly)

`src/components/sections/Booking.tsx` embeds your real Calendly calendar directly on the page — not a popup, not an image, not a redirect:

```html
<div class="calendly-inline-widget" data-url="https://calendly.com/visualcontentsolution/30min" style="min-width:320px;height:700px"></div>
```

The widget script (`https://assets.calendly.com/assets/external/widget.js`) loads via `next/script` with `strategy="lazyOnload"`, which is functionally the same as a plain `<script async>` tag — it just integrates properly with Next.js's loading lifecycle. Desktop height is fixed at exactly 700px per spec; a scoped media query shortens it to 560px/650px on mobile/tablet so it doesn't force excessive scroll on short viewports, without touching the desktop spec.

If you change your Calendly event link, update `calendlyUrl` in `src/lib/content.ts`.

## VSL (Video Sales Letter)

The hero's video lives inside the laptop mockup's screen, matching the reference design:

- Lazy-mounts the Vimeo iframe only once it scrolls into view (zero network cost above the fold until it's actually about to be seen)
- Autoplays muted once in view, satisfying browser autoplay policies
- Compact unmute control bottom-right of the screen
- Falls back to a click-to-play poster if a person scrolls past quickly or prefers to start it manually

To change the video, update `vimeoId` in `src/lib/content.ts`.

**Important — Vimeo embed domains:** if the video shows "domain not in allowlist" instead of playing, go to your video's Privacy settings on vimeo.com and add your live domain (and `localhost` for local dev) to the list of domains allowed to embed it. This is a setting on Vimeo's side, not a code issue.

## Deploying to Vercel

```bash
npm install -g vercel
vercel
```

Or connect the GitHub repo directly in the Vercel dashboard. Be sure to add `RESEND_API_KEY` (and optionally `CONTACT_FORM_RECIPIENT` / `CONTACT_FORM_FROM`) under Project → Settings → Environment Variables before the contact form will work in production.

Once deployed, connect your Namecheap domain:
1. In Vercel → Project → Settings → Domains, add your domain.
2. In Namecheap → Domain → Advanced DNS, add the records Vercel gives you (typically an `A` record to `76.76.21.21` and a `CNAME` for `www`).
3. Wait for DNS propagation (usually under an hour).

## Project Structure

```
src/
  app/
    layout.tsx           — root layout, fonts, SEO metadata, JSON-LD (LocalBusiness + Organization schema)
    page.tsx              — assembles all sections
    loading.tsx            — logo loading state
    icon.png / apple-icon.png — Next.js auto-detected favicon sources (your exact logo)
    robots.ts / sitemap.ts — auto-generated from siteConfig
    globals.css            — design tokens, utility classes
    api/
      contact/route.ts     — Resend email handler with Zod validation + spam protection
  components/
    sections/              — Navbar, Hero, TrustStats, Services, Results,
                              Process, Pricing, ClientsAndTeam (testimonials +
                              team side-by-side), Booking, FAQ, Contact, Footer
    ui/                     — Logo, VSLPlayer, ServiceIcons (custom 3D SVGs),
                              TeamPhoto (with fallback avatar), CustomCursor,
                              Reveal, SectionHeading, Counter
  lib/
    content.ts              — all copy/data/SEO config in one place
    utils.ts
public/
  logo-transparent.png       — your exact uploaded logo, transparent background
  logo-master.png            — same exact logo, opaque background
  favicon.ico, favicon-16/32/48.png, apple-touch-icon.png, icon-192/512.png
  og-image.png                — Open Graph / social share image
  site.webmanifest
  team/                        — drop-in team photo folder (see public/team/README.md)
```

## SEO

- Exact title: **Visual Content Solution | Branding, Content Creation & eCommerce Growth**
- Exact meta description and keyword set as specified, all centralized in `siteConfig` (`src/lib/content.ts`)
- Open Graph + Twitter Card tags with your logo-based social preview image
- Canonical URL set via `alternates.canonical`
- `robots.txt` and `sitemap.xml` auto-generated from `siteConfig.url`
- Structured data: combined `LocalBusiness` + `ProfessionalService` schema with your exact business name, email, country (United Kingdom), service areas (UK, US, Canada, Australia), and business types (Marketing/Branding/Content Creation/eCommerce Agency), plus a separate `Organization` schema — both in `src/app/layout.tsx`

## Design System

Colors, spacing, and animation tokens are defined in `tailwind.config.ts`:

- Background `#050505`, card `#0C0C0C`
- Accent (your logo's lime) `#D9FF00` — drives buttons, glows, hover states, chart lines, and icon accents throughout
- Text white `#FFFFFF`, muted `#A0A0A0`

To adjust the palette, edit `tailwind.config.ts` — every component references these tokens rather than hardcoded colors, so a palette change propagates everywhere.

## Custom Cursor (Desktop Only)

`src/components/ui/CustomCursor.tsx` replaces the native cursor on desktop with a small lime dot, a soft trailing glow, and a very subtle large ambient spotlight — all driven by a single `requestAnimationFrame` loop with independently-eased layers (no CSS transitions on position, which can stutter under load).

**Automatically disabled** — checked once on mount, before anything renders — on:
- Touch devices (`ontouchstart` / `navigator.maxTouchPoints`)
- Coarse pointers / non-hover-capable devices (`pointer: coarse`, `hover: none` media queries)
- `prefers-reduced-motion: reduce` (both at the JS mount level and as a CSS backstop)

On qualifying desktops, the cursor reacts to what's underneath it:
- **Buttons** (`.btn-primary`, `.btn-secondary`, any `<button>`) — dot expands, glow intensifies
- **Links** (`<a>` not styled as a button) — dot hollows into a ring
- **Cards** (service, results, pricing, testimonial, team — tagged `data-cursor="card"`) — dot scales up slightly
- **VSL poster** (tagged `data-cursor="video"`) — dot grows into a "Play" label

Buttons and links are detected automatically from the element/class, so new buttons or links added later don't need manual tagging. For anything else you want a custom cursor reaction on, add `data-cursor="card"` (or `"video"`, `"button"`, `"link"`) to that element.

## Mobile-First Notes

- Hero headline, buttons, and VSL all scale/stack correctly from narrow phones up
- Service cards: 1 column mobile → 2 columns tablet (`sm:`) → grid stays 2-wide through desktop (matches the 4-service content set)
- Results section: horizontal swipe carousel on mobile/tablet, 3-column grid on desktop (`lg:`)
- Team section: 1 column mobile → 2 columns tablet (`sm:`) → 4 columns desktop (`lg:`)
- Pricing: vertical stack on mobile, 3-column grid from `sm:` up
- Footer: single column on mobile, multi-column from `sm:` up
- Calendly embed height is responsive (560px mobile → 650px tablet → 700px desktop) to avoid awkward scroll on short viewports like iPhone SE
- `overflow-x: hidden` is set globally as a safety net against any unexpected horizontal scroll

## Notes

- All copy and SEO config lives in `src/lib/content.ts` — update stats, services, pricing, FAQs, team bios, and meta info there without touching component code.
- LinkedIn is intentionally excluded from every social link, icon set, and structured data block — only Instagram, Facebook, TikTok, and YouTube are used.
- Lighthouse performance depends partly on your hosting/CDN config post-deploy; the app itself ships static-optimized pages with no client-side data fetching on initial load, lazy-loaded below-the-fold images via `next/image`, and a lazy-mounted VSL/Calendly embed.
