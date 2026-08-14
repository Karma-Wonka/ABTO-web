"use client";

import { useEffect, useRef } from "react";

const PILLARS = [
  { num: "Representation", title: "One voice at the table", body: "We represent the general interests of Bhutanese tour operators at national, regional and international levels, from policy consultation with the Department of Tourism to global trade platforms." },
  { num: "Standards", title: "Ethics and professionalism", body: "Membership signals a licensed, accountable operator. We work to raise service standards across guiding, logistics, safety and client care." },
  { num: "Services", title: "What no operator can do alone", body: "Collective marketing, trade fair presence, group negotiation, training delivery and administrative facilitation, undertaken on behalf of the whole membership." },
  { num: "Sustainability", title: "Tourism that gives back", body: "Through programmes such as EU SUSTOUR, we help members measure and reduce impact while strengthening the value that tourism returns to Bhutanese communities." }
];

const MILESTONES = [
  { yr: "2000", title: "ABTO is founded", body: "Bhutanese tour operators formally organise to give the industry a single, mutual voice." },
  { yr: "2011", title: "Eleventh AGM", body: "The Board of Directors is elected for a three-year term, formalising the governance structure that continues today." },
  { yr: "2020–22", title: "The closure years", body: "ABTO coordinates the sector's response through the pandemic border closure and the reopening that followed." },
  { yr: "2023", title: "EU SUSTOUR Bhutan", body: "ABTO joins the European sustainable tourism programme, bringing structured sustainability training to member operators." },
  { yr: "Today", title: "A maturing industry", body: "Members deliver ground-breaking, distinctly Bhutanese tourism experiences under the high-value, low-volume policy." }
];

function useTimelineProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const bar = el.querySelector<HTMLElement>(".tl-progress");
    const items = Array.from(el.querySelectorAll<HTMLElement>(".tl-item"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const itemObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle("tl-in", entry.isIntersecting);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.35 }
    );
    items.forEach((item) => itemObserver.observe(item));

    if (reduced || !bar) return () => itemObserver.disconnect();

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.75;
      const end = vh * 0.55 - rect.height;
      const raw = (start - rect.top) / (start - end);
      bar.style.transform = `scaleY(${Math.min(1, Math.max(0, raw))})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      itemObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return ref;
}

export default function WhyMatters() {
  const timelineRef = useTimelineProgress();

  return (
    <section className="pad paper" id="why">
      <div className="wrap">
        <div className="rv" style={{ maxWidth: 700, marginBottom: "clamp(2.4rem,4vw,3.6rem)" }}>
          <div className="eyebrow">Why ABTO Matters</div>
          <h2 className="display-l">Four ways the association works on behalf of its members.</h2>
        </div>
        <div className="stackwrap">
          {PILLARS.map((pillar, i) => (
            <div className="stack-item" key={pillar.num} style={{ "--i": i } as React.CSSProperties}>
              <article className="card stack-card">
                <span className="num">{pillar.num}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </article>
            </div>
          ))}
        </div>

        <div className="split" style={{ marginTop: "clamp(3.4rem,6vw,6rem)", alignItems: "start" }}>
          <div className="rv">
            <div className="eyebrow">Milestones</div>
            <h3 className="display-m">Twenty-five years of the association</h3>
            <p className="lead" style={{ marginTop: "1.2rem" }}>
              From a handful of founding operators to the recognised representative body of the entire sector.
            </p>
          </div>
          <div className="timeline" ref={timelineRef}>
            <div className="tl-progress" aria-hidden="true" />
            {MILESTONES.map((m) => (
              <div className="tl-item" key={m.yr}>
                <span className="yr">{m.yr}</span>
                <h4>{m.title}</h4>
                <p>{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
