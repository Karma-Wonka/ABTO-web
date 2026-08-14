"use client";

import { useState } from "react";
import Link from "next/link";
import { POLICIES } from "@/data/site-data";

export default function PolicySection() {
  const [q, setQ] = useState("");
  const list = POLICIES.filter((p) => !q || (p.t + p.cat).toLowerCase().includes(q.toLowerCase())).slice(0, 4);

  return (
    <section className="deep pad" id="policySec">
      <div className="wrap">
        <div className="split" style={{ alignItems: "end", marginBottom: "2.6rem" }}>
          <div className="rv">
            <div className="eyebrow on-dark">Policy &amp; Regulations</div>
            <h2 className="display-l">The rules that govern the industry, in one library.</h2>
          </div>
          <div className="rv">
            <p className="lead">
              Acts, rules, notifications and tariff orders affecting tour operations, searchable, categorised and
              downloadable.
            </p>
          </div>
        </div>
        <div className="rv" style={{ background: "rgba(246,242,233,.05)", padding: "clamp(1.4rem,3vw,2.2rem)", border: "1px solid rgba(246,242,233,.11)" }}>
          <div className="field has-icon" style={{ marginBottom: "1.2rem" }}>
            <span className="ic"><svg width="18" height="18" aria-hidden="true"><use href="#i-search" /></svg></span>
            <input
              type="search"
              placeholder="Search the policy library…"
              style={{ background: "rgba(246,242,233,.07)", borderColor: "rgba(246,242,233,.2)", color: "var(--ivory)" }}
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div>
            {list.length ? (
              list.map((p) => (
                <div
                  key={p.t}
                  style={{ display: "flex", gap: "1rem", alignItems: "center", padding: ".85rem 0", borderBottom: "1px solid rgba(246,242,233,.1)" }}
                >
                  <span style={{ color: "var(--gold)", flex: "none" }}>
                    <svg width="22" height="28" aria-hidden="true"><use href="#i-doc" /></svg>
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "var(--f-display)", fontSize: "1.1rem" }}>{p.t}</div>
                    <div style={{ fontFamily: "var(--f-util)", fontSize: ".61rem", letterSpacing: ".14em", textTransform: "uppercase", opacity: 0.55, marginTop: ".2rem" }}>
                      {p.cat} · {p.yr} · {p.type} {p.size}
                    </div>
                  </div>
                  <button className="btn btn-sm btn-ghost" style={{ flex: "none" }}><span>Get</span></button>
                </div>
              ))
            ) : (
              <p style={{ opacity: 0.6, padding: "1rem 0" }}>
                Nothing matches that search. Try &ldquo;levy&rdquo;, &ldquo;guide&rdquo; or &ldquo;licensing&rdquo;.
              </p>
            )}
          </div>
          <Link href="/policy" className="txtlink on-dark" style={{ marginTop: "1.5rem" }}>
            Open the full library <svg className="arw" width="16" height="12" aria-hidden="true"><use href="#i-arw" /></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
