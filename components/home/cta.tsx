import Link from "next/link";

export default function Cta() {
  return (
    <section className="pad deep" style={{ textAlign: "center", overflow: "hidden", position: "relative" }}>
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <div className="eyebrow on-dark no-rule rv" style={{ justifyContent: "center" }}>Membership</div>
        <h2 className="display-l rv" style={{ maxWidth: 900, marginInline: "auto" }}>
          Join Bhutan&rsquo;s leading tourism network.
        </h2>
        <p className="lead rv" style={{ maxWidth: 560, margin: "1.5rem auto 2.4rem" }}>
          Nu. 3,000 a year. A permanent listing in the national directory. A seat at the table on every policy that
          affects your business.
        </p>
        <div className="rv" style={{ display: "flex", gap: ".85rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/membership#apply" className="btn btn-gold">
            <span>Become a Member</span>
            <svg className="arw" width="16" height="12" aria-hidden="true"><use href="#i-arw" /></svg>
          </Link>
          <Link href="/contact" className="btn btn-ghost"><span>Talk to the Secretariat</span></Link>
        </div>
        <div
          className="rv"
          style={{
            display: "flex",
            gap: "clamp(1.2rem,3vw,2.4rem)",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "2.2rem",
            paddingTop: "1.6rem",
            borderTop: "1px solid rgba(255,255,255,.12)"
          }}
        >
          {["Nu. 3,000 annual fee", "Licensed by the Department of Tourism", "Digital certificate on renewal"].map((label) => (
            <span
              key={label}
              style={{ display: "flex", alignItems: "center", gap: ".5rem", fontFamily: "var(--f-util)", fontSize: ".68rem", letterSpacing: ".08em", color: "rgba(246,242,233,.6)" }}
            >
              <svg width="13" height="13" style={{ color: "var(--gold-pale)", flex: "none" }} aria-hidden="true"><use href="#i-check" /></svg>
              {label}
            </span>
          ))}
        </div>
      </div>
      <svg
        viewBox="0 0 1400 300"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 180, opacity: 0.28 }}
      >
        <path d="M0,200 L160,140 L320,190 L480,130 L660,196 L840,142 L1020,198 L1200,146 L1400,200 L1400,300 L0,300 Z" fill="#0E1A14" />
      </svg>
    </section>
  );
}
