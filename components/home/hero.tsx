import Link from "next/link";
import Counter from "@/components/site/counter";

export default function Hero({ memberCount }: { memberCount: number }) {
  const years = new Date().getFullYear() - 2000;

  return (
    <section id="hero">
      <img
        className="hero-photo"
        src="/img/punakha-twilight-lit-lg.webp"
        alt="Punakha Dzong at twilight"
        loading="eager"
        decoding="async"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background: "linear-gradient(rgba(10,18,14,.34),rgba(10,18,14,.2) 42%,rgba(10,18,14,.82))"
        }}
      />

      <div className="hero-inner wrap-wide">
        <div className="hero-flags" aria-hidden="true">
          <i style={{ background: "var(--pf-blue)" }} /><i style={{ background: "var(--pf-white)" }} />
          <i style={{ background: "var(--pf-red)" }} /><i style={{ background: "var(--pf-green)" }} />
          <i style={{ background: "var(--pf-yellow)" }} />
        </div>
        <div className="eyebrow on-dark">Unite, Represent &amp; Advance</div>
        <h1 className="display-xl hero-title">
          Association of Bhutanese <span className="l2">Tour Operators</span>
        </h1>
        <p className="hero-sub">
          Supporting sustainable tourism. Connecting Bhutan to the world. The official voice of Bhutan&rsquo;s licensed
          tour operators since 2000.
        </p>
        <div className="hero-cta">
          <Link href="/membership#apply" className="btn">
            <span>Become a Member</span>
            <svg className="arw" width="16" height="12" aria-hidden="true"><use href="#i-arw" /></svg>
          </Link>
          <Link href="/members" className="btn btn-ghost on-dark"><span>Find an Operator</span></Link>
        </div>
        <div className="hero-meta">
          <div><Counter target={2000} plain /><span>Founded</span></div>
          <div><Counter target={memberCount} /><span>Licensed Members</span></div>
          <div><Counter target={years} /><span>Years of Service</span></div>
          <div><b>GNH</b><span>Guiding Vision</span></div>
        </div>
      </div>
      <div className="scrollcue" aria-hidden="true"><span>Scroll</span><i /></div>
    </section>
  );
}
