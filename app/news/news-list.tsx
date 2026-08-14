"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import RidgeSvg from "@/components/site/ridge-svg";
import { unsplashUrl } from "@/lib/unsplash";
import { useModal, useCloseModal } from "@/components/site/modal";
import type { LiveData } from "@/lib/live-data";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fmtDate = (iso: string) => {
  const d = new Date(iso + "T00:00:00");
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
};

type NewsItem = LiveData["news"][number];

function NewsModal({ item }: { item: NewsItem }) {
  const close = useCloseModal();
  return (
    <div>
      <div className="mhead"><div className="eyebrow">{item.cat} · {fmtDate(item.d)}</div><h2 className="display-m">{item.t}</h2></div>
      <div className="mbody">
        <p className="lead">{item.x}</p>
        <p>
          Members are encouraged to review the detail and submit comments to the secretariat before the consultation
          window closes. Where a coordinated position is required, ABTO will circulate a draft to the membership for
          endorsement ahead of submission.
        </p>
        <p>Supporting documents, where applicable, are published in the Policy &amp; Regulations library.</p>
        <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginTop: "1.4rem" }}>
          <Link href="/policy" className="btn btn-sm" onClick={close}><span>Policy Library</span></Link>
          <button className="btn btn-sm btn-outline-dark" onClick={close}><span>Close</span></button>
        </div>
      </div>
    </div>
  );
}

export default function NewsList({ news }: { news: LiveData["news"] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const openModal = useModal();
  const cats = useMemo(() => [...new Set(news.map((n) => n.cat))], [news]);
  const featured = news[0];
  const list = news.filter((n) => {
    if (cat && n.cat !== cat) return false;
    if (q && !(n.t + n.x).toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="wrap">
      {featured && (
        <article className="feature" style={{ marginBottom: "2.6rem" }}>
          <div className="fmedia">
            <RidgeSvg id="nf" height={460} />
            <img src={unsplashUrl("photo-1635134873780-4ffac86376e4")} alt="Thimphu, Bhutan" loading="lazy" decoding="async" referrerPolicy="no-referrer" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div className="fbody">
            <div className="meta">Featured · {featured.cat} · {fmtDate(featured.d)}</div>
            <h2>{featured.t}</h2>
            <p style={{ color: "rgba(246,242,233,.72)" }}>{featured.x}</p>
            <div style={{ marginTop: "1.6rem" }}>
              <button className="txtlink on-dark" onClick={() => openModal(<NewsModal item={featured} />)}>
                Read the briefing <svg className="arw" width="16" height="12" aria-hidden="true"><use href="#i-arw" /></svg>
              </button>
            </div>
          </div>
        </article>
      )}

      <div className="toolbar">
        <div className="field has-icon">
          <span className="ic"><svg width="18" height="18" aria-hidden="true"><use href="#i-search" /></svg></span>
          <input type="search" placeholder="Search news…" aria-label="Search news" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="chips">
          <button className={`chip ${cat === "" ? "on" : ""}`} onClick={() => setCat("")}>All</button>
          {cats.map((c) => (
            <button key={c} className={`chip ${cat === c ? "on" : ""}`} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
      </div>
      <div className="result-count" style={{ marginBottom: ".6rem" }}>{list.length} {list.length === 1 ? "article" : "articles"}</div>
      <div>
        {list.length ? (
          list.map((n) => (
            <article className="news-item" key={n.t} onClick={() => openModal(<NewsModal item={n} />)}>
              <div className="row">
                <span className="date">{fmtDate(n.d)}</span>
                <h4>{n.t}</h4>
                <span className={`tag ${n.tag}`}>{n.cat}</span>
              </div>
              <p>{n.x}</p>
            </article>
          ))
        ) : (
          <p style={{ padding: "2.4rem 0", color: "var(--stone)" }}>No articles match. Try a different term or clear the category filter.</p>
        )}
      </div>
    </div>
  );
}
