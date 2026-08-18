"use client";

import { useState } from "react";
import type { Festival } from "@/data/site-data";

export default function FestivalsList({ festivals, hasCalendarPdf }: { festivals: Festival[]; hasCalendarPdf: boolean }) {
  const [q, setQ] = useState("");
  const [year, setYear] = useState<"both" | "25" | "26">("both");
  const list = festivals.filter((f) => !q || (f.n + f.p + f.dz).toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="wrap">
      <div className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1.2rem", flexWrap: "wrap", background: "var(--forest)", color: "var(--ivory)", marginBottom: "clamp(2rem,4vw,3rem)" }}>
        <div>
          <span className="num" style={{ color: "var(--gold-pale)" }}>Official Record</span>
          <h3 style={{ marginBottom: ".3rem" }}>Signed Festival Calendar (PDF)</h3>
          <p style={{ fontSize: ".9rem", color: "rgba(246,242,233,.72)", margin: 0, maxWidth: "58ch" }}>
            Uploaded by authorised ABTO staff and carrying the signature and approval of the responsible officer.
            This PDF is the official record of festival dates, not the table below, which is a searchable
            convenience view for planning only.
          </p>
        </div>
        {hasCalendarPdf ? (
          <a href="/api/festival-calendar" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-gold" style={{ flex: "none" }}>
            <span>Download Signed PDF</span>
          </a>
        ) : (
          <button className="btn btn-sm btn-gold" style={{ flex: "none" }} disabled title="Not yet uploaded">
            <span>Download Signed PDF</span>
          </button>
        )}
      </div>
      <div className="toolbar">
        <div className="field has-icon">
          <span className="ic"><svg width="18" height="18" aria-hidden="true"><use href="#i-search" /></svg></span>
          <input type="search" placeholder="Search festival or dzongkhag…" aria-label="Search festivals" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="chips">
          <button className={`chip ${year === "both" ? "on" : ""}`} onClick={() => setYear("both")}>Both years</button>
          <button className={`chip ${year === "25" ? "on" : ""}`} onClick={() => setYear("25")}>2025</button>
          <button className={`chip ${year === "26" ? "on" : ""}`} onClick={() => setYear("26")}>2026</button>
        </div>
      </div>
      <div className="result-count" style={{ marginBottom: "1rem" }}>{list.length} {list.length === 1 ? "festival" : "festivals"}</div>
      <div className="tbl-scroll">
        <table className="tbl">
          <thead>
            <tr>
              <th>Festival</th><th>Place</th><th>Dzongkhag</th>
              {year !== "26" && <th>2025</th>}
              {year !== "25" && <th>2026</th>}
            </tr>
          </thead>
          <tbody>
            {list.length ? (
              list.map((f) => (
                <tr key={f.n}>
                  <td className="tname">{f.n}</td><td>{f.p}</td><td>{f.dz}</td>
                  {year !== "26" && <td>{f.d25}</td>}
                  {year !== "25" && <td>{f.d26}</td>}
                </tr>
              ))
            ) : (
              <tr><td colSpan={5} style={{ padding: "2rem", textAlign: "center", color: "var(--stone)" }}>No festival matches that search.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="small" style={{ color: "var(--stone)", marginTop: "1.2rem" }}>
        This table mirrors the signed PDF above for convenient searching. If the two ever disagree, the signed PDF
        governs. Photography inside temples and during certain dances is restricted; your guide will advise on site.
      </p>
    </div>
  );
}
