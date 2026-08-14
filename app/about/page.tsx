import Link from "next/link";
import PageHead from "@/components/site/page-head";
import RidgeSvg from "@/components/site/ridge-svg";
import { unsplashUrl } from "@/lib/unsplash";

export const metadata = { title: "About ABTO" };

export default function AboutPage() {
  return (
    <div className="page on page-in">
      <PageHead
        crumb="About ABTO"
        title={<>The mutual and official<br />voice of the industry</>}
        intro="The Association of Bhutanese Tour Operators, founded in 2000, is the recognised representative of the tour operators in Bhutan."
      />
      <section className="pad-s">
        <div className="wrap split" style={{ alignItems: "start" }}>
          <div>
            <p className="lead">
              ABTO is the mutual and official voice of all Bhutanese tour operators, who constitute our primary
              members. We represent and protect the collective interests of the country&rsquo;s tourism industry.
            </p>
            <p>
              Since its founding in 2000, our priority has been to bring about positive change for the effective
              function, administration and operation of tour operators. As a service-providing organisation we
              render every support and assistance in undertaking activities and seeking ways and means to advance
              the cause of member tour operators.
            </p>
            <p>
              With significant growth in the number of tour operators and a drastic increase in tourism activities,
              our aim is to promote Bhutan as a top tourist destination with the collective effort of our tour
              operators. We also develop and implement a wide range of measures and instruments that help make the
              Bhutanese market more attractive and improve the environment for both consumers and agents, in line
              with the government&rsquo;s vision of high value, low volume tourism policy.
            </p>
            <p>
              Headed by the Executive Director, the organisation works within the framework of the rules specified
              in the association&rsquo;s articles and is guided by a Board. ABTO is a not-for-profit organisation.
            </p>
            <div className="card" style={{ marginTop: "clamp(2.4rem,4vw,3.4rem)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1.2rem", flexWrap: "wrap" }}>
              <div>
                <span className="num">Purpose &amp; Objectives</span>
                <h3 style={{ marginBottom: ".3rem" }}>Why the association exists</h3>
                <p style={{ fontSize: ".9rem", color: "#5A655E", margin: 0 }}>
                  Our founding purpose and the objective that guides everything ABTO does.
                </p>
              </div>
              <Link href="/purpose" className="btn btn-sm btn-outline-dark" style={{ flex: "none" }}>
                <span>Read More</span>
                <svg className="arw" width="16" height="12" aria-hidden="true"><use href="#i-arw" /></svg>
              </Link>
            </div>
          </div>
          <aside className="sticky-side">
            <div className="sp-media" style={{ aspectRatio: "4/5", marginBottom: "1rem" }}>
              <RidgeSvg id="ab" height={500} />
              <img
                src={unsplashUrl("photo-1590580673100-ee7ee687bfa6")}
                alt="Bhutanese temple on the mountainside"
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div className="cap">The Himalayan backdrop to Bhutanese tourism</div>
            </div>
            <div style={{ background: "var(--forest)", color: "var(--ivory)", padding: "1.6rem" }}>
              <div className="eyebrow on-dark">Fast Facts</div>
              <dl style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: ".6rem 1rem", fontSize: ".88rem" }}>
                <dt style={{ opacity: 0.6 }}>Founded</dt><dd style={{ margin: 0 }}>2000</dd>
                <dt style={{ opacity: 0.6 }}>Status</dt><dd style={{ margin: 0 }}>Not-for-profit</dd>
                <dt style={{ opacity: 0.6 }}>Governance</dt><dd style={{ margin: 0, textAlign: "right" }}>Board + Executive Director</dd>
                <dt style={{ opacity: 0.6 }}>Members</dt><dd style={{ margin: 0 }}>Licensed operators</dd>
                <dt style={{ opacity: 0.6 }}>Office</dt><dd style={{ margin: 0 }}>Thimphu</dd>
              </dl>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
