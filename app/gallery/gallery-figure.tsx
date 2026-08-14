"use client";

import { useModal, useCloseModal } from "@/components/site/modal";
import type { GalleryItem } from "@/data/site-data";

function GalleryModal({ title }: { title: string }) {
  const close = useCloseModal();
  return (
    <div className="mbody" style={{ padding: "2rem" }}>
      <div className="eyebrow">Gallery</div>
      <h2 className="display-m">{title}</h2>
      <p style={{ color: "var(--stone)", marginTop: "1rem" }}>
        The full-resolution image and caption for this item will appear here once the gallery library is populated.
      </p>
      <button className="btn btn-sm btn-outline-dark" onClick={close} style={{ marginTop: "1rem" }}>
        <span>Close</span>
      </button>
    </div>
  );
}

export default function GalleryFigure({
  item,
  tall,
  children,
}: {
  item: GalleryItem;
  tall: boolean;
  children: React.ReactNode;
}) {
  const openModal = useModal();

  return (
    <figure
      style={{ margin: 0, position: "relative", aspectRatio: tall ? "3/4" : "1/1", overflow: "hidden", cursor: "pointer" }}
      onClick={() => openModal(<GalleryModal title={item.title} />)}
    >
      {children}
      <figcaption
        style={{
          position: "absolute",
          inset: "auto 0 0 0",
          padding: ".9rem",
          background: "linear-gradient(transparent,rgba(20,28,24,.85))",
          color: "var(--ivory)",
          fontFamily: "var(--f-util)",
          fontSize: ".63rem",
          letterSpacing: ".13em",
          textTransform: "uppercase"
        }}
      >
        {item.title}
      </figcaption>
    </figure>
  );
}
