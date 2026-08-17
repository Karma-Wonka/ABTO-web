# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: licensed Bhutanese tour operators who are (or are applying to be) ABTO
members, using the site to do association business — check policy/regulatory
updates, renew or apply for membership, confirm their own directory listing,
and reach the secretariat.

Secondary: international travelers and travel trade researching Bhutan (visa
rules, the Sustainable Development Fee, festival dates) and using the member
directory to verify a tour operator is genuinely licensed. Design and content
priority goes to the primary audience when the two are in tension.

## Product Purpose

The official public presence of ABTO (Association of Bhutanese Tour
Operators): representing the licensed tour-operator sector to government and
international bodies, publishing policy/regulatory updates, hosting the
official member directory, and processing membership registration/renewal.
Success means a member can do what they need (renew, find policy, confirm
their listing) without going through the physical office, and the directory
functions as a credible public record of who is actually licensed.

## Positioning

Not a marketing differentiator in the usual sense — ABTO is the sole
recognized association fulfilling this representative/regulatory role for
Bhutan's licensed tour operators (self-described as "the official voice of
Bhutan's licensed tour operators since 2000"). Its claim to legitimacy is
associational and statutory, not competitive.

## Operating Context

- Content (news, events, members, committee, travel destinations, homepage/
  about/membership/contact copy, nav, footer, SEO) is fetched at request time
  from the `admin` dashboard's Postgres database via `web/lib/cms*.ts` — not
  hardcoded in `web/content/*.ts` (those files were removed once content was
  seeded into the DB as defaults).
- Site IA was deliberately consolidated from 20 legacy routes to 7 core pages
  (`/`, `/about`, `/membership`, `/members`, `/news`, `/travel`, `/contact`,
  plus `/news/[slug]`), modeled on JATA's flat nav (About / Join Us / Roster /
  Surveys / Topics / Contact List) — a national tour-operator association
  site does not need a sprawling page set.
- Contact and Membership Apply forms are wired to a real backend
  (`web/app/api/{contact,membership}/route.ts`), storing submissions in the
  admin's `submissions` table.
- A separate, older static site (`index.html` / `abto-website.html`, GSAP +
  ScrollTrigger + Lenis) is what's currently deployed live on GitHub Pages.
  This Next.js app (`abto-redesign`) is a distinct, in-progress build. There
  is **no confirmed cutover plan** between them — treat them as independent
  systems, not as "old vs. new version of the same deployment," until the
  user says otherwise.
- `abto.org.bt`, ABTO's real domain, is currently DNS-hijacked and redirecting
  to gambling content — a registrar/DNS-level compromise outside this
  codebase. It doesn't block redesign work, but don't assume the domain is a
  safe link target until this is confirmed resolved.

## Capabilities and Constraints

- Next.js 16 (App Router), React 19, Tailwind v4, Radix UI primitives,
  framer-motion — an existing, working codebase, not greenfield.
- Deployed separately from `admin` (own Vercel deployment), on port 3001 in
  dev.
- No confirmed accessibility standard — open decision, general good practice
  only (no binding WCAG level or similar mandate).
- Placeholder vs. verified content must stay distinguishable in the data/DB
  layer (an `isPlaceholder`-style convention existed in the old `content/*.ts`
  files) even though nothing is labeled as placeholder in the rendered UI.

## Brand Commitments

- Name: ABTO — Association of Bhutanese Tour Operators.
- Tagline / self-description used in hero copy: "Unite, Represent & Advance";
  "the official voice of Bhutan's licensed tour operators since 2000."
- Visual identity (palette, typography, etc.) is not recorded here — that's
  DESIGN.md's territory, not established as binding in this session.

## Evidence on Hand

- Real member roster: 25 verified operators (name, region, contact,
  specialties, founding year) plus illustrative sample entries — sample/
  placeholder records must not be presented as verified.
- Executive Committee: only Chairman (Kinley Gyeltshen) and Vice Chairman
  (Chencho Wangdi) are verified; Secretary General, Treasurer, and Executive
  Member seats are placeholders pending ABTO confirmation.
- Homepage stats ("1,200+ Member Operators", "35+ Years of Service",
  "150,000+ Visitors Supported Annually" in this redesign; different
  placeholder figures on the legacy static site) are illustrative, not
  verified.
- Partner logos (TCB, ABTO, HRAB, GAB, Dept. of Tourism) are text wordmarks —
  no real logo assets yet. Social links and footer partner links are `href="#"`
  placeholders.
- All photography is Unsplash stock (travel/mountain/culture-themed, not
  necessarily Bhutan-specific) — needs real Bhutan photography before launch.
- `/travel` visa/SDF/destination facts were sourced from third-party
  travel-industry sites (drukasia.com, odynovotours.com, bhutanvistatour.com,
  Lonely Planet), not from ABTO's own site (inaccessible due to the domain
  hijack) — must be verified against the Tourism Council of Bhutan /
  Department of Immigration before publishing.
- No PRODUCT.md existed before this file.

## Product Principles

1. **Members first.** When member and traveler/public needs conflict,
   prioritize what a licensed tour-operator member needs to do (renew, find
   policy/news, confirm their listing).
2. **Never let placeholder read as fact.** Invented figures, committee seats,
   logos, and links must stay structurally distinguishable from real
   ABTO-supplied content until replaced with verified data.
3. **Consolidation over sprawl.** Resist re-adding routes beyond the
   deliberate 7-page IA unless a real member need can't be served within it.
4. **Legacy and redesign are independent until told otherwise.** Don't assume
   this Next.js app supersedes, mirrors, or must stay in sync with the static
   site currently live on GitHub Pages.
5. **The domain hijack is a standing external constraint.** Don't block
   redesign work on it, but don't treat `abto.org.bt` as a safe or working
   link target until the user confirms it's resolved.

## Accessibility & Inclusion

No specific standard confirmed. Treat as general good practice only (semantic
HTML, keyboard access, `prefers-reduced-motion`) until a binding requirement
is given.
