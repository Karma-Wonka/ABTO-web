"use client";

import { useState } from "react";
import Link from "next/link";
import { useToast } from "@/components/site/toast";
import type { LiveData } from "@/lib/live-data";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fmtDate = (iso: string) => {
  const d = new Date(iso + "T00:00:00");
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
};

export default function NewsSection({ news, events }: { news: LiveData["news"]; events: LiveData["events"] }) {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const upcoming = events.filter((e) => !e.past).slice(0, 3);

  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast("Enter a valid email address to subscribe.");
      return;
    }
    setEmail("");
    toast(`Subscribed. The next ABTO Dispatch will arrive at ${email}.`);
  };

  return (
    <section className="pad-s" id="newsSec" style={{ paddingBottom: "clamp(72px,10vw,140px)" }}>
      <div className="wrap">
        <div className="feature rv">
          <div className="fmedia">
            <img
              src="/img/rbf-panel-lg.webp"
              alt="Panel discussion at the Regenerative Bhutan Forum"
              loading="lazy"
              decoding="async"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 1 }}
            />
          </div>
          <div className="fbody">
            <div className="meta">Featured · Policy</div>
            <h2>Bhutan&rsquo;s tourism strategy enters its next phase under the high-value, low-volume policy</h2>
            <p style={{ color: "rgba(246,242,233,.72)", fontSize: ".98rem" }}>
              ABTO members are being consulted as the Department of Tourism refines the framework governing
              Sustainable Development Fee levels, minimum service standards and guide certification requirements for
              the coming season.
            </p>
            <div style={{ display: "flex", gap: "1.2rem", alignItems: "center", marginTop: "1.4rem", flexWrap: "wrap" }}>
              <span className="tag t-yellow" style={{ color: "var(--gold-pale)" }}>Policy</span>
              <span style={{ fontFamily: "var(--f-util)", fontSize: ".66rem", letterSpacing: ".15em", color: "rgba(246,242,233,.5)" }}>
                6 MIN READ
              </span>
            </div>
            <div style={{ marginTop: "1.8rem" }}>
              <Link href="/news" className="txtlink on-dark">
                Read the briefing <svg className="arw" width="16" height="12" aria-hidden="true"><use href="#i-arw" /></svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="split" style={{ marginTop: "clamp(2.4rem,4vw,3.6rem)", alignItems: "start", gap: "clamp(2rem,4vw,4rem)" }}>
          <div>
            <div className="eyebrow rv">Latest from the Industry</div>
            <div>
              {news.slice(1, 6).map((n) => (
                <article className="news-item rv" key={n.t}>
                  <div className="row">
                    <span className="date">{fmtDate(n.d)}</span>
                    <h4>{n.t}</h4>
                  </div>
                  <p>{n.x}</p>
                </article>
              ))}
            </div>
            <Link href="/news" className="txtlink" style={{ marginTop: "1.6rem" }}>
              All tourism news <svg className="arw" width="16" height="12" aria-hidden="true"><use href="#i-arw" /></svg>
            </Link>
          </div>
          <aside className="rv">
            <div style={{ background: "var(--forest)", color: "var(--ivory)", padding: "clamp(1.6rem,3vw,2.2rem)" }}>
              <div className="eyebrow on-dark">Upcoming</div>
              <div>
                {upcoming.map((e) => {
                  const d = new Date(e.d + "T00:00:00");
                  return (
                    <div
                      key={e.t}
                      style={{ display: "flex", gap: "1rem", padding: ".9rem 0", borderBottom: "1px solid rgba(246,242,233,.12)" }}
                    >
                      <div style={{ textAlign: "center", flex: "none", width: 44 }}>
                        <b style={{ fontFamily: "var(--f-display)", fontSize: "1.5rem", display: "block", lineHeight: 1, color: "var(--gold-pale)" }}>
                          {d.getDate()}
                        </b>
                        <span style={{ fontFamily: "var(--f-util)", fontSize: ".56rem", letterSpacing: ".16em", textTransform: "uppercase", opacity: 0.6 }}>
                          {MONTHS[d.getMonth()]}
                        </span>
                      </div>
                      <div>
                        <div style={{ fontFamily: "var(--f-display)", fontSize: "1.08rem", lineHeight: 1.25 }}>{e.t}</div>
                        <div style={{ fontSize: ".78rem", opacity: 0.6, marginTop: ".2rem" }}>{e.loc} · {e.type}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Link href="/events" className="txtlink on-dark" style={{ marginTop: "1.4rem" }}>
                Full calendar <svg className="arw" width="16" height="12" aria-hidden="true"><use href="#i-arw" /></svg>
              </Link>
            </div>
            <div style={{ border: "1px solid rgba(20,28,24,.12)", padding: "clamp(1.6rem,3vw,2.2rem)", marginTop: "1rem" }}>
              <div className="eyebrow">Newsletter</div>
              <h4 className="display-s" style={{ marginBottom: ".7rem" }}>ABTO Dispatch</h4>
              <p className="small" style={{ color: "#5A655E", marginBottom: "1.1rem" }}>
                Policy changes, festival dates and trade opportunities, sent to members monthly.
              </p>
              <form onSubmit={onSubscribe}>
                <div className="field" style={{ marginBottom: ".6rem" }}>
                  <input
                    type="email"
                    placeholder="you@company.bt"
                    aria-label="Email address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-sm" style={{ width: "100%", justifyContent: "center" }}>
                  <span>Subscribe</span>
                </button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
