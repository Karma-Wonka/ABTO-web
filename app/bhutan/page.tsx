import PageHead from "@/components/site/page-head";
import RidgeSvg from "@/components/site/ridge-svg";
import { unsplashUrl } from "@/lib/unsplash";

export const metadata = { title: "Tourism in Bhutan" };

export default function BhutanPage() {
  return (
    <div className="page on page-in">
      <PageHead
        crumb="Tourism in Bhutan"
        title={<>High value.<br />Low volume.</>}
        intro="Bhutan's tourism policy is unlike anywhere else. It is designed to protect what visitors come to see, and to make sure tourism returns value to Bhutanese communities."
      />
      <section className="pad-s">
        <div className="wrap">
          <div className="grid-2" style={{ marginBottom: "clamp(3rem,5vw,4.4rem)" }}>
            <div id="gnh">
              <div className="eyebrow">Gross National Happiness</div>
              <h2 className="display-m" style={{ marginBottom: "1.2rem" }}>A development philosophy, not a slogan</h2>
              <p>
                Gross National Happiness is Bhutan&rsquo;s guiding framework for development. It holds that progress
                should be measured by the wellbeing of people and the health of the environment and culture, not by
                economic output alone.
              </p>
              <p>
                For tourism, this shapes everything: the scale of visitation, how operators behave, the protection
                of sacred sites, and the expectation that the industry contributes back to the communities it passes
                through. ABTO&rsquo;s own purpose is written in these terms.
              </p>
            </div>
            <div className="sp-media" style={{ aspectRatio: "4/3" }}>
              <RidgeSvg id="gn" height={380} />
              <img src={unsplashUrl("photo-1608659377506-3b4fec4f7634")} alt="Buddhist statue, Bhutan" loading="lazy" decoding="async" referrerPolicy="no-referrer" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <div className="cap">Four pillars: sustainable development, culture, environment, good governance</div>
            </div>
          </div>
          <div className="grid-2" style={{ marginBottom: "clamp(3rem,5vw,4.4rem)" }}>
            <div className="sp-media" style={{ aspectRatio: "4/3" }}>
              <RidgeSvg id="st" height={380} />
              <img src={unsplashUrl("photo-1597658333270-8c0d8f0eb845")} alt="Green valley, Bhutan" loading="lazy" decoding="async" referrerPolicy="no-referrer" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <div className="cap">Constitutionally protected forest cover, a minimum of 60%</div>
            </div>
            <div id="sustainable">
              <div className="eyebrow">Sustainable Tourism</div>
              <h2 className="display-m" style={{ marginBottom: "1.2rem" }}>Protecting what visitors come for</h2>
              <p>
                The high value, low volume policy limits pressure on sites, communities and infrastructure while
                ensuring the sector generates meaningful revenue. The Sustainable Development Fee funds free
                healthcare, free education and conservation.
              </p>
              <p>
                Through EU SUSTOUR, member operators build measurable sustainability action plans covering waste,
                energy, procurement, community benefit and carbon reporting.
              </p>
            </div>
          </div>
          <div id="biodiversity">
            <div className="eyebrow">Biodiversity</div>
            <h2 className="display-m" style={{ marginBottom: "1.6rem" }}>One of the world&rsquo;s ten biodiversity hotspots</h2>
            <div className="grid-4">
              <div className="card"><span className="num">Forest</span><h3>Over 70% forested</h3><p>The Constitution requires a minimum of 60% forest cover for all time. Bhutan remains carbon negative.</p></div>
              <div className="card"><span className="num">Corridors</span><h3>Protected network</h3><p>National parks and biological corridors cover more than half the country, linked so wildlife can move freely.</p></div>
              <div className="card"><span className="num">Species</span><h3>Takin to snow leopard</h3><p>From subtropical foothills to alpine peaks: tiger, red panda, black-necked crane and the takin, the national animal.</p></div>
              <div className="card"><span className="num">Birding</span><h3>Over 700 species</h3><p>A major draw for specialist birding groups, with endemic and migratory species across every altitude band.</p></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
