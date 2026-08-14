"use client";

import { useMemo, useState } from "react";
import { useModal, useCloseModal } from "@/components/site/modal";
import { POLICIES, type Policy } from "@/data/site-data";
import { useToast } from "@/components/site/toast";

function PreviewModal({ policy }: { policy: Policy }) {
  const close = useCloseModal();
  const toast = useToast();
  return (
    <div>
      <div className="mhead"><div className="eyebrow">{policy.cat} · {policy.yr}</div><h2 className="display-m">{policy.t}</h2></div>
      <div className="mbody">
        <div style={{ background: "var(--forest-deep)", color: "var(--ivory)", padding: "2.4rem", textAlign: "center", marginBottom: "1.4rem" }}>
          <svg width="42" height="53" style={{ margin: "0 auto 1rem", color: "var(--gold)" }} aria-hidden="true"><use href="#i-doc" /></svg>
          <div style={{ fontFamily: "var(--f-util)", fontSize: ".66rem", letterSpacing: ".18em", textTransform: "uppercase", opacity: 0.7 }}>{policy.type} · {policy.size}</div>
          <p className="small" style={{ opacity: 0.6, marginTop: ".8rem" }}>Inline PDF preview renders here from the document CMS collection.</p>
        </div>
        <p>{policy.x}</p>
        <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginTop: "1.2rem" }}>
          <button className="btn btn-sm" onClick={() => { toast(`Downloading ${policy.t}`); close(); }}><span>Download {policy.type}</span></button>
          <button className="btn btn-sm btn-outline-dark" onClick={close}><span>Close</span></button>
        </div>
      </div>
    </div>
  );
}

function DocRow({ policy, onPreview }: { policy: Policy; onPreview: () => void }) {
  const toast = useToast();
  return (
    <div className="doc">
      <span className="dicon" style={{ color: "var(--kemar)" }}><svg width="30" height="38" aria-hidden="true"><use href="#i-doc" /></svg></span>
      <div className="dinfo">
        <h5>{policy.t}</h5>
        <p className="small" style={{ color: "#5A655E", margin: ".15rem 0 .4rem" }}>{policy.x}</p>
        <div className="dm"><span>{policy.cat}</span><span>{policy.yr}</span><span>{policy.type} · {policy.size}</span></div>
      </div>
      <div className="dact">
        <button className="btn btn-sm btn-outline-dark" onClick={onPreview}><span>Preview</span></button>
        <button className="btn btn-sm" onClick={() => toast(`Downloading ${policy.t}`)}><span>Download</span></button>
      </div>
    </div>
  );
}

export default function PolicyList() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const openModal = useModal();
  const cats = useMemo(() => [...new Set(POLICIES.map((p) => p.cat))], []);
  const list = POLICIES.filter((p) => {
    if (cat && p.cat !== cat) return false;
    if (q && !(p.t + p.x + p.cat).toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="wrap">
      <div className="split split-sidebar" style={{ alignItems: "start", gap: "clamp(2rem,4vw,3.6rem)" }}>
        <aside className="sticky-side">
          <div className="eyebrow">Category</div>
          <div className="side-nav">
            <a className={cat === "" ? "on" : ""} onClick={() => setCat("")}>All documents</a>
            {cats.map((c) => (
              <a key={c} className={cat === c ? "on" : ""} onClick={() => setCat(c)}>{c}</a>
            ))}
          </div>
          <div style={{ marginTop: "2rem", background: "var(--paper)", padding: "1.3rem", border: "1px solid rgba(20,28,24,.1)" }}>
            <div className="eyebrow">Notice</div>
            <p className="small" style={{ color: "#5A655E" }}>
              Documents are published as issued by the relevant authority. Where a document has been superseded it
              is retained for reference and marked accordingly.
            </p>
          </div>
        </aside>
        <div>
          <div className="field has-icon" style={{ marginBottom: "1.2rem" }}>
            <span className="ic"><svg width="18" height="18" aria-hidden="true"><use href="#i-search" /></svg></span>
            <input type="search" placeholder="Search titles and descriptions…" aria-label="Search policy library" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <div className="result-count" style={{ marginBottom: "1rem" }}>{list.length} {list.length === 1 ? "document" : "documents"}</div>
          <div>
            {list.length ? (
              list.map((p) => <DocRow key={p.t} policy={p} onPreview={() => openModal(<PreviewModal policy={p} />)} />)
            ) : (
              <p style={{ padding: "2rem 0", color: "var(--stone)" }}>No documents match. Try &ldquo;levy&rdquo;, &ldquo;guide&rdquo; or &ldquo;trekking&rdquo;.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
