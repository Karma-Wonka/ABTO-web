import Link from "next/link";
import PageHead from "@/components/site/page-head";
import Timeline, { type TimelineItem } from "@/components/site/timeline";

export type EventDetailData = {
  title: string;
  kicker: React.ReactNode;
  intro: string;
  items: TimelineItem[];
  photo?: React.ReactNode;
  caption?: string;
  side: React.ReactNode;
  cards: { n: string; h: string; x: string }[];
};

export default function EventDetail({ title, kicker, intro, items, photo, caption, side, cards }: EventDetailData) {
  return (
    <div className="page on page-in">
      <PageHead crumb={title} title={kicker} intro={intro} />
      <section className="pad-s">
        <div className="wrap">
          {photo && (
            <div className="sp-media" style={{ aspectRatio: "16/9", marginBottom: "clamp(2.4rem,5vw,3.6rem)" }}>
              {photo}
              {caption && <div className="cap">{caption}</div>}
            </div>
          )}
          <div className="split" style={{ alignItems: "start", gap: "clamp(2rem,4vw,4rem)" }}>
            <Timeline items={items} />
            <aside className="sticky-side">{side}</aside>
          </div>
          <div style={{ marginTop: "clamp(2.6rem,5vw,4rem)" }} className="grid-4">
            {cards.map((c) => (
              <article className="card" key={c.n}>
                <span className="num">{c.n}</span><h3>{c.h}</h3><p style={{ fontSize: ".87rem" }}>{c.x}</p>
              </article>
            ))}
          </div>
          <div style={{ marginTop: "2.2rem" }}>
            <Link href="/events" className="txtlink">
              Back to Events <svg className="arw" width="16" height="12" aria-hidden="true"><use href="#i-arw" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
