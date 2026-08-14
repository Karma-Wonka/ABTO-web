"use client";

import { useEffect, useState } from "react";

export default function ScrollChrome() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrollable = h.scrollHeight - h.clientHeight;
      setProgress(scrollable > 0 ? h.scrollTop / scrollable : 0);
      setShowTop(h.scrollTop > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        id="progress"
        aria-hidden="true"
        style={{ transform: `scaleX(${progress})` }}
      />
      <button
        id="toTop"
        type="button"
        aria-label="Back to top"
        className={showTop ? "show" : ""}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg width="16" height="16" aria-hidden="true">
          <use href="#i-chev" />
        </svg>
      </button>
    </>
  );
}
