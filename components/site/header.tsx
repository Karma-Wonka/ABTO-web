"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { POLICIES } from "@/data/site-data";
import { BRAND_MARK } from "@/data/brand-mark";
import type { LiveData } from "@/lib/live-data";

type SearchHit = { t: string; ty: string; h: string };
type Session = { email: string; name: string | null } | null;

function buildSearchIndex(liveData: LiveData): SearchHit[] {
  return [
    ...liveData.members.map((m) => ({ t: m.name, ty: "Member", h: `/members?q=${encodeURIComponent(m.name)}` })),
    ...liveData.news.map((n) => ({ t: n.t, ty: "News", h: "/news" })),
    ...POLICIES.map((p) => ({ t: p.t, ty: "Policy", h: "/policy" })),
    ...liveData.events.map((e) => ({ t: e.t, ty: "Event", h: "/events" })),
    ...liveData.festivals.map((f) => ({ t: f.n, ty: "Festival", h: "/festivals" })),
    ...liveData.publications.map((p) => ({ t: p.t, ty: "Publication", h: "/publications" })),
    ...liveData.downloads.map((d) => ({ t: d.t, ty: "Download", h: "/downloads" })),
    { t: "About ABTO", ty: "Page", h: "/about" },
    { t: "Board of Directors", ty: "Page", h: "/board" },
    { t: "Purpose & Objectives", ty: "Page", h: "/purpose" },
    { t: "Organogram", ty: "Page", h: "/organogram" },
    { t: "Membership Benefits & Application", ty: "Page", h: "/membership" },
    { t: "Gross National Happiness", ty: "Page", h: "/bhutan" },
    { t: "Getting to Bhutan", ty: "Page", h: "/travel" },
    { t: "Contact the Secretariat", ty: "Page", h: "/contact" },
    { t: "Gallery", ty: "Page", h: "/gallery" },
    { t: "Classifieds", ty: "Page", h: "/classifieds" }
  ];
}

type NavLink = { href: string; label: string; small?: string };
type NavGroup = { heading: string; links: NavLink[] };
type NavItem = { label: string; groups: NavGroup[] };

const NAV_BASE: NavItem[] = [
  {
    label: "The Association",
    groups: [
      {
        heading: "About",
        links: [
          { href: "/about", label: "About ABTO", small: "Who we are and what we do" },
          { href: "/purpose", label: "Purpose & Objectives" },
          { href: "/board", label: "Board of Directors" },
          { href: "/organogram", label: "Organogram" },
          { href: "/contact", label: "Contact the Secretariat" }
        ]
      }
    ]
  },
  {
    label: "Members",
    groups: [
      {
        heading: "Directory",
        links: [
          { href: "/members", label: "Member Directory", small: "Search all licensed operators" },
          { href: "/members?f=trekking", label: "By Specialty" },
          { href: "/members?f=az", label: "Browse A–Z" }
        ]
      },
      {
        heading: "Membership",
        links: [
          { href: "/membership", label: "Benefits of Membership" },
          { href: "/membership#apply", label: "Apply Online", small: "Registration fee Nu. 3,000" },
          { href: "/membership#faq", label: "Requirements & FAQ" }
        ]
      }
    ]
  },
  {
    label: "Bhutan",
    groups: [
      {
        heading: "The Country",
        links: [
          { href: "/bhutan", label: "Tourism in Bhutan" },
          { href: "/bhutan#gnh", label: "Gross National Happiness" },
          { href: "/bhutan#sustainable", label: "Sustainable Tourism" },
          { href: "/bhutan#biodiversity", label: "Biodiversity" },
          { href: "/festivals", label: "Festival Calendar" }
        ]
      },
      {
        heading: "Travel Information",
        links: [
          { href: "/travel", label: "Getting to Bhutan" },
          { href: "/travel#drukair", label: "Druk Air" },
          { href: "/travel#tashiair", label: "Bhutan Airlines (Tashi Air)" },
          { href: "/travel#places", label: "Places of Interest" },
          { href: "/travel#experiences", label: "Explore Bhutan" },
          { href: "/horses", label: "Horse Contractors" }
        ]
      }
    ]
  },
  {
    label: "Resources",
    groups: [
      {
        heading: "Industry",
        links: [
          { href: "/policy", label: "Policy & Regulations" },
          { href: "/horses", label: "Horse Contractors" },
          { href: "/classifieds", label: "ABTO Classifieds" },
          { href: "/downloads", label: "Downloads" }
        ]
      },
      {
        heading: "Media",
        links: [
          { href: "/news", label: "Tourism News" },
          { href: "/events", label: "Events" },
          { href: "/publications", label: "Publications" },
          { href: "/gallery", label: "Gallery" }
        ]
      }
    ]
  }
];

export default function Header({ liveData }: { liveData: LiveData }) {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [openMega, setOpenMega] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openDrawerGroup, setOpenDrawerGroup] = useState<number | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);
  // Session lives client-side (fetched below) rather than being read via
  // cookies() in the root layout — that would force every page on the
  // site to render dynamically just to gate one nav link. undefined
  // means "not checked yet"; treated the same as logged-out so the
  // members-only link never flashes into view before we know.
  const [session, setSession] = useState<Session | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => { if (!cancelled) setSession(data.session ?? null); })
      .catch(() => { if (!cancelled) setSession(null); });
    return () => { cancelled = true; };
  }, [pathname]);

  const searchIndex = useMemo(() => buildSearchIndex(liveData), [liveData]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const lastPathname = useRef(pathname);
  const NAV = NAV_BASE;

  const logout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setSession(null);
      router.push("/");
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (lastPathname.current === pathname) return;
    lastPathname.current = pathname;
    setDrawerOpen(false);
    setOpenMega(null);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", drawerOpen);
  }, [drawerOpen]);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchInputRef.current?.focus(), 160);
  }, [searchOpen]);

  useEffect(() => {
    if (openMega === null) return;
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenMega(null);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [openMega]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setSearchOpen(false);
      setDrawerOpen(false);
      setOpenMega(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const solid = pathname !== "/" && !scrolled;
  const hits = query.trim().length >= 2
    ? searchIndex.filter((h) => h.t.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 12)
    : [];

  return (
    <>
      <header id="nav" className={[scrolled ? "scrolled" : "", solid ? "solid" : ""].filter(Boolean).join(" ")}>
        <div className="navbar">
          <Link href="/" className="brand">
            <img className="brand-mark" src={BRAND_MARK} alt="ABTO logo" width={76} height={65} />
            <span className="brand-txt">
              <b>ABTO</b>
              <em>Bhutanese Tour Operator Association</em>
            </span>
          </Link>

          <nav ref={navRef} className="navlinks" aria-label="Primary">
            {NAV.map((item, i) => (
              <div key={item.label} className={`navitem ${openMega === i ? "open" : ""}`}>
                <button
                  aria-expanded={openMega === i}
                  onClick={() => setOpenMega(openMega === i ? null : i)}
                >
                  {item.label} <svg className="chev" aria-hidden="true"><use href="#i-chev" /></svg>
                </button>
                <div className={item.groups.length > 1 ? "mega wide" : "mega"}>
                  {item.groups.map((group) => (
                    <div key={group.heading}>
                      <h6>{group.heading}</h6>
                      {group.links.map((link) => (
                        <Link key={link.href} href={link.href} onClick={() => setOpenMega(null)}>
                          {link.label}
                          {"small" in link && link.small ? <small>{link.small}</small> : null}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="navitem"><Link href="/news">News</Link></div>
          </nav>

          <div className="navtools">
            <Link href="/carbon-calculator" className="icon-btn" aria-label="Carbon Footprint Calculator">
              <img src="/img/icon-carbon-footprint.png" alt="" width={20} height={20} style={{ display: "block", objectFit: "contain" }} />
              <span className="navtip">Carbon Footprint Calculator</span>
            </Link>
            <button className="icon-btn" aria-label="Search the site" onClick={() => setSearchOpen(true)}>
              <svg width="18" height="18" aria-hidden="true"><use href="#i-search" /></svg>
            </button>
            {session ? (
              <>
                <Link href="/profile" className="btn btn-sm btn-ghost on-dark" style={{ marginLeft: ".3rem" }}>
                  <span>{session.name || session.email}</span>
                </Link>
                <button
                  className="btn btn-sm btn-ghost on-dark"
                  onClick={logout}
                  disabled={loggingOut}
                >
                  <span>{loggingOut ? "Signing out…" : "Sign Out"}</span>
                </button>
              </>
            ) : (
              <Link href="/login" className="btn btn-sm btn-ghost on-dark" style={{ marginLeft: ".3rem" }}>
                <span>Member Login</span>
              </Link>
            )}
            <button
              className="burger"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen((v) => !v)}
            >
              <i /><i /><i />
            </button>
          </div>
        </div>
      </header>

      <div id="drawer" aria-hidden={!drawerOpen}>
        {NAV.map((item, i) => (
          <div key={item.label} className={`dgroup ${openDrawerGroup === i ? "open" : ""}`}>
            <button className="dhead" onClick={() => setOpenDrawerGroup(openDrawerGroup === i ? null : i)}>
              {item.label} <svg className="chev" width="12" height="12" aria-hidden="true"><use href="#i-chev" /></svg>
            </button>
            <div className="dbody">
              {item.groups.flatMap((g) => g.links).map((link) => (
                <Link key={link.href} href={link.href}>{link.label}</Link>
              ))}
            </div>
          </div>
        ))}
        <div className="dgroup"><button className="dhead" onClick={() => router.push("/news")}>News &amp; Events</button></div>
        <div className="dactions">
          <Link href="/membership#apply" className="btn btn-gold"><span>Become a Member</span></Link>
          <Link href="/members" className="btn btn-ghost on-dark"><span>Find an Operator</span></Link>
        </div>
      </div>

      <div id="searchOverlay" className={searchOpen ? "on" : ""} role="dialog" aria-modal="true" aria-label="Site search">
        <button
          className="icon-btn"
          style={{ position: "absolute", top: 22, right: "var(--gut)" }}
          aria-label="Close search"
          onClick={() => setSearchOpen(false)}
        >
          <svg width="18" height="18"><use href="#i-x" /></svg>
        </button>
        <div className="searchbox">
          <div className="eyebrow on-dark">Search ABTO</div>
          <input
            ref={searchInputRef}
            type="search"
            placeholder="Members, policies, training, news…"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div id="searchResults">
            {query.trim().length >= 2 && hits.length === 0 && (
              <p style={{ color: "rgba(246,242,233,.5)", paddingTop: "1rem" }}>
                No match for &ldquo;{query.trim()}&rdquo;. Try a company name, a policy title, or a festival.
              </p>
            )}
            {hits.map((hit) => (
              <Link key={hit.ty + hit.t} href={hit.h} onClick={() => setSearchOpen(false)}>
                <span>{hit.t}</span>
                <span className="rtype">{hit.ty}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
