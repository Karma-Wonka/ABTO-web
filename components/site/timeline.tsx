"use client";

import { useEffect, useRef } from "react";

export type TimelineItem = { y: string; h: string; x: string };

export default function Timeline({ items }: { items: TimelineItem[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const bar = el.querySelector<HTMLElement>(".tl-progress");
    const nodes = Array.from(el.querySelectorAll<HTMLElement>(".tl-item"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) entry.target.classList.toggle("tl-in", entry.isIntersecting);
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.35 }
    );
    nodes.forEach((n) => observer.observe(n));

    if (reduced || !bar) return () => observer.disconnect();

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
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="timeline" ref={ref}>
      <div className="tl-progress" aria-hidden="true" />
      {items.map((it) => (
        <div className="tl-item" key={it.y + it.h}>
          <span className="yr">{it.y}</span>
          <h4>{it.h}</h4>
          <p>{it.x}</p>
        </div>
      ))}
    </div>
  );
}
