"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SPECS, REGIONS } from "@/data/site-data";
import { useModal, useCloseModal } from "@/components/site/modal";
import { useToast } from "@/components/site/toast";
import { validateForm } from "@/lib/validate";
import type { LiveData } from "@/lib/live-data";

type Member = LiveData["members"][number];
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const PER_PAGE = 12;

function EnquiryModal({ name }: { name: string }) {
  const close = useCloseModal();
  const toast = useToast();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(e.currentTarget)) return;
    close();
    toast(`Enquiry sent to ${name}. Most members reply within two working days.`);
  };

  return (
    <div>
      <div className="mhead"><div className="eyebrow">Enquiry</div><h2 className="display-m">Contact {name}</h2></div>
      <div className="mbody">
        <form onSubmit={onSubmit} noValidate>
          <div className="frow">
            <div className="fgroup"><label>Your name <span className="req">*</span></label><input name="name" required /><div className="errmsg">Please enter your name.</div></div>
            <div className="fgroup"><label>Email <span className="req">*</span></label><input type="email" name="email" required /><div className="errmsg">Please enter a valid email.</div></div>
          </div>
          <div className="frow">
            <div className="fgroup"><label>Country</label><input name="country" placeholder="e.g. Germany" /></div>
            <div className="fgroup"><label>Approximate travel dates</label><input name="dates" placeholder="e.g. Oct 2025, 10 nights" /></div>
          </div>
          <div className="fgroup"><label>Your enquiry <span className="req">*</span></label><textarea name="msg" required placeholder="Party size, interests, any trekking or festival preferences…" /><div className="errmsg">Please tell the operator what you are looking for.</div></div>
          <button className="btn" type="submit" style={{ width: "100%", justifyContent: "center" }}><span>Send Enquiry</span></button>
          <p className="small" style={{ color: "var(--stone)", marginTop: ".9rem" }}>Your enquiry is routed to the operator and copied to the ABTO secretariat for quality monitoring.</p>
        </form>
      </div>
    </div>
  );
}

function MemberModal({ member }: { member: Member }) {
  const openModal = useModal();
  return (
    <div>
      <div className="mhead">
        <div className="eyebrow">Member Operator</div>
        <h2 className="display-m">{member.name}</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem", marginTop: "1rem" }}>
          {member.specs.map((s) => <span className="tag t-green" key={s}>{s}</span>)}
        </div>
      </div>
      <div className="mbody">
        <p style={{ color: "#4A554E" }}>{member.desc || "Licensed Bhutanese tour operator and member of the association."}</p>
        <dl style={{ display: "grid", gridTemplateColumns: "130px 1fr", gap: ".6rem 1rem", margin: "1.6rem 0", fontSize: ".9rem" }}>
          <dt style={{ fontFamily: "var(--f-util)", fontSize: ".62rem", letterSpacing: ".15em", textTransform: "uppercase", color: "var(--stone)" }}>Base</dt><dd style={{ margin: 0 }}>{member.region}</dd>
          <dt style={{ fontFamily: "var(--f-util)", fontSize: ".62rem", letterSpacing: ".15em", textTransform: "uppercase", color: "var(--stone)" }}>Member since</dt><dd style={{ margin: 0 }}>{member.since}</dd>
          <dt style={{ fontFamily: "var(--f-util)", fontSize: ".62rem", letterSpacing: ".15em", textTransform: "uppercase", color: "var(--stone)" }}>Languages</dt><dd style={{ margin: 0 }}>{member.langs.join(", ")}</dd>
          {member.phone && <><dt style={{ fontFamily: "var(--f-util)", fontSize: ".62rem", letterSpacing: ".15em", textTransform: "uppercase", color: "var(--stone)" }}>Telephone</dt><dd style={{ margin: 0 }}>{member.phone}</dd></>}
          {member.email && <><dt style={{ fontFamily: "var(--f-util)", fontSize: ".62rem", letterSpacing: ".15em", textTransform: "uppercase", color: "var(--stone)" }}>Email</dt><dd style={{ margin: 0 }}>{member.email}</dd></>}
          {member.web && <><dt style={{ fontFamily: "var(--f-util)", fontSize: ".62rem", letterSpacing: ".15em", textTransform: "uppercase", color: "var(--stone)" }}>Website</dt><dd style={{ margin: 0 }}>{member.web}</dd></>}
        </dl>
        <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginTop: "1.4rem" }}>
          <button className="btn btn-sm" onClick={() => openModal(<EnquiryModal name={member.name} />)}><span>Send an Enquiry</span></button>
        </div>
      </div>
    </div>
  );
}

export default function MemberDirectory({ members }: { members: Member[] }) {
  const params = useSearchParams();
  const openModal = useModal();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [letter, setLetter] = useState("");
  const [spec, setSpec] = useState(() => {
    const f = params.get("f");
    return f && f !== "az" ? f.replace(/^./, (c) => c.toUpperCase()) : "";
  });
  const [region, setRegion] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return members
      .filter((m) => {
        if (q && !m.name.toLowerCase().includes(q.toLowerCase())) return false;
        if (letter && m.name[0].toUpperCase() !== letter) return false;
        if (spec && !m.specs.includes(spec)) return false;
        if (region && m.region !== region) return false;
        return true;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [members, q, letter, spec, region]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, pages);
  const slice = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const reset = () => {
    setQ("");
    setLetter("");
    setSpec("");
    setRegion("");
    setPage(1);
  };

  return (
    <div className="wrap">
      <div className="toolbar">
        <div className="field has-icon">
          <span className="ic"><svg width="18" height="18" aria-hidden="true"><use href="#i-search" /></svg></span>
          <input type="search" placeholder="Search by company name…" aria-label="Search members by name" value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} />
        </div>
        <div className="field" style={{ maxWidth: 210, flex: "none", minWidth: 170 }}>
          <select aria-label="Filter by specialty" value={spec} onChange={(e) => { setSpec(e.target.value); setPage(1); }}>
            <option value="">All specialties</option>
            {SPECS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="field" style={{ maxWidth: 190, flex: "none", minWidth: 150 }}>
          <select aria-label="Filter by base" value={region} onChange={(e) => { setRegion(e.target.value); setPage(1); }}>
            <option value="">All locations</option>
            {REGIONS.map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>
        <button className="btn btn-sm btn-outline-dark" onClick={reset}><span>Reset</span></button>
      </div>

      <div className="az" style={{ marginBottom: "1.4rem" }}>
        <button className={letter === "" ? "on" : ""} onClick={() => { setLetter(""); setPage(1); }}>All</button>
        {LETTERS.map((l) => (
          <button key={l} className={letter === l ? "on" : ""} onClick={() => { setLetter(l); setPage(1); }}>{l}</button>
        ))}
      </div>

      <div className="result-count" style={{ marginBottom: "1rem" }}>
        {filtered.length} {filtered.length === 1 ? "operator" : "operators"}
        {filtered.length > PER_PAGE ? ` · page ${currentPage} of ${pages}` : ""}
      </div>

      <div className="mgrid">
        {slice.length ? (
          slice.map((m) => (
            <article
              className="mcard"
              key={m.id}
              tabIndex={0}
              role="button"
              aria-label={`View ${m.name}`}
              onClick={() => openModal(<MemberModal member={m} />)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openModal(<MemberModal member={m} />);
                }
              }}
            >
              <div style={{ display: "flex", gap: ".9rem", alignItems: "flex-start" }}>
                <span className="init">{m.name[0]}</span>
                <h4>{m.name}</h4>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: ".3rem" }}>
                {m.specs.slice(0, 2).map((s) => <span className="tag t-green" key={s}>{s}</span>)}
              </div>
              <div className="m-meta"><span>{m.region}</span><span>Member since {m.since}</span></div>
            </article>
          ))
        ) : (
          <div style={{ gridColumn: "1/-1", background: "var(--paper)", padding: "3rem 1.5rem", textAlign: "center" }}>
            <p className="display-s" style={{ marginBottom: ".6rem" }}>No operators match those filters</p>
            <p className="small" style={{ color: "var(--stone)" }}>Clear a filter or search a different company name.</p>
          </div>
        )}
      </div>

      {pages > 1 && (
        <div className="pager">
          <button disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>Prev</button>
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => {
            if (n === 1 || n === pages || Math.abs(n - currentPage) <= 1) {
              return <button key={n} className={n === currentPage ? "on" : ""} onClick={() => setPage(n)}>{n}</button>;
            }
            if (Math.abs(n - currentPage) === 2) return <button key={n} disabled>…</button>;
            return null;
          })}
          <button disabled={currentPage === pages} onClick={() => setPage(currentPage + 1)}>Next</button>
        </div>
      )}
    </div>
  );
}
