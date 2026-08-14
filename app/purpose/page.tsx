import Link from "next/link";
import PageHead from "@/components/site/page-head";

export const metadata = { title: "Purpose & Objectives" };

export default function PurposePage() {
  return (
    <div className="page on page-in">
      <PageHead
        crumb="Purpose & Objectives"
        title={<>Why the association<br />exists</>}
        intro="Two short statements sit behind every programme ABTO runs: a purpose that sets the standard, and an objective that sets the mandate."
      />
      <section className="pad-s">
        <div className="wrap">
          <div className="split" style={{ alignItems: "start", gap: "clamp(2rem,4vw,4rem)" }}>
            <div>
              <div className="card" style={{ marginBottom: "1.2rem" }}>
                <span className="num">Our Vision</span>
                <p style={{ fontFamily: "var(--f-display)", fontSize: "1.5rem", lineHeight: 1.45, color: "var(--ink)" }}>
                  To foster a vibrant, dynamic, and resilient private tourism sector that aligns with Bhutan&rsquo;s
                  Gross National Happiness (GNH) philosophy while contributing to environmental conservation, cultural
                  preservation, and sustainable socio-economic development.
                </p>
              </div>
              <div className="card" style={{ marginBottom: "1.2rem" }}>
                <span className="num">Our Mission</span>
                <ul style={{ margin: ".6rem 0 0", paddingLeft: "1.1rem", fontSize: ".95rem", lineHeight: 1.6, color: "var(--ink)" }}>
                  <li>Serve as the official voice and representative of Bhutan&rsquo;s licensed local tour operators.</li>
                  <li>Advocate for the collective interests of members through constructive engagement with the Royal Government, industry stakeholders, and international partners.</li>
                  <li>Promote sustainable tourism development while advancing excellence, professionalism, and high standards of hospitality across Bhutan.</li>
                </ul>
              </div>
              <div className="card">
                <span className="num">Our Objective</span>
                <p style={{ fontFamily: "var(--f-display)", fontSize: "1.5rem", lineHeight: 1.45, color: "var(--ink)" }}>
                  To effectively represent and promote the general interests of tour operators in the national,
                  regional and international travel and tourism industry.
                </p>
              </div>
            </div>
            <aside>
              <div className="eyebrow">How This Guides Us</div>
              <h3 className="display-s" style={{ marginBottom: "1rem" }}>Purpose into practice</h3>
              <p style={{ fontSize: ".94rem", color: "#4F5A53" }}>
                These two statements are not a slogan. They are the test ABTO applies to its own work. Every
                programme, from guide certification to festival-season logistics coordination, is measured against
                whether it raises the standard of service or strengthens the industry&rsquo;s collective voice.
              </p>
              <p style={{ fontSize: ".94rem", color: "#4F5A53" }}>
                Gross National Happiness is Bhutan&rsquo;s own framework for development, weighing wellbeing and
                environment alongside economic activity. ABTO&rsquo;s purpose is written in those terms deliberately:
                tourism growth that serves people and place, not just visitor numbers.
              </p>
            </aside>
          </div>
          <div className="grid-3" style={{ marginTop: "clamp(2.6rem,5vw,4rem)" }}>
            <article className="card"><span className="num">Service</span><h3>Highest standards</h3><p>Consistent, professional delivery across guiding, logistics and guest care: the baseline every member is expected to meet.</p></article>
            <article className="card"><span className="num">Ethics</span><h3>Professionalism</h3><p>Transparent dealings with guests, partners and government: the conduct that keeps Bhutan&rsquo;s tourism reputation intact.</p></article>
            <article className="card"><span className="num">Representation</span><h3>One mandate</h3><p>A single, coordinated voice for the industry at every level: national policy, regional cooperation, international markets.</p></article>
          </div>
          <div style={{ marginTop: "2.2rem" }}>
            <Link href="/about" className="txtlink">
              Back to About ABTO <svg className="arw" width="16" height="12" aria-hidden="true"><use href="#i-arw" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
