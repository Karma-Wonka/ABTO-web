import PageHead from "@/components/site/page-head";
import RidgeSvg from "@/components/site/ridge-svg";
import { GALLERY_ITEMS, PHOTO_CREDITS } from "@/data/site-data";
import { unsplashUrl } from "@/lib/unsplash";
import GalleryFigure from "./gallery-figure";

export const metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <div className="page on page-in">
      <PageHead
        crumb="Gallery"
        title={<>Bhutan, as members<br />show it</>}
        intro="Images from festivals, treks, association events and member operations across the Kingdom."
      />
      <section className="pad-s">
        <div className="wrap">
          <div className="grid-4" style={{ gap: ".6rem" }}>
            {GALLERY_ITEMS.map((item, i) => (
              <GalleryFigure key={item.title} item={item} tall={i % 5 === 0}>
                <RidgeSvg id={`gl${i}`} height={300} />
                {item.photo && (
                  <img
                    src={item.local ? `/img/${item.photo}.webp` : unsplashUrl(item.photo)}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />
                )}
              </GalleryFigure>
            ))}
          </div>
          <p className="small" style={{ color: "var(--stone)", marginTop: "1.4rem" }}>
            Member-submitted photography and illustrated placeholders sit side by side above while the full library
            is populated. To submit images for the gallery, contact the secretariat.
          </p>
          <div style={{ marginTop: "2rem", paddingTop: "1.4rem", borderTop: "1px solid rgba(20,28,24,.1)" }}>
            <div className="eyebrow">Photo Credits</div>
            <p className="small" style={{ color: "var(--stone)", maxWidth: "70ch" }}>
              Real photography on this page is sourced from Unsplash, free to use under the Unsplash License.
              Credited here as good practice:
            </p>
            <ul style={{ fontSize: ".78rem", color: "var(--stone)", lineHeight: 1.9, paddingLeft: "1.1rem", marginTop: ".4rem", columns: 2, columnGap: "2rem" }}>
              {PHOTO_CREDITS.map(([t, who]) => <li key={t}>{t}, {who} on Unsplash</li>)}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
