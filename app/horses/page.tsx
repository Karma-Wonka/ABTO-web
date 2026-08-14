import Link from "next/link";
import PageHead from "@/components/site/page-head";
import { HORSE_CONTRACTORS } from "@/data/site-data";

export const metadata = { title: "Horse Contractors" };

export default function HorsesPage() {
  return (
    <div className="page on page-in">
      <PageHead
        crumb="Horse Contractors"
        title={<>Pack support for<br />trekking routes</>}
        intro="Horse contractors provide pack animals and handlers for multi-day treks. ABTO maintains this list for members planning routes that require pack support."
      />
      <section className="pad-s">
        <div className="wrap">
          <div className="card" style={{ background: "var(--paper)", borderLeft: "3px solid var(--gold)", marginBottom: "clamp(2rem,4vw,3rem)" }}>
            <span className="num">Awaiting Official List</span>
            <p style={{ fontSize: ".92rem", margin: 0 }}>
              The entries below are placeholders. ABTO will publish the confirmed contractor list, with verified
              regions and contact details, once supplied by the secretariat. Members should confirm pack-animal
              availability directly until then.
            </p>
          </div>
          <div className="grid-3">
            {HORSE_CONTRACTORS.map((h, i) => (
              <article className="card" key={i}>
                <span className="tag t-stone" style={{ marginBottom: ".9rem" }}>{h.sample ? "Placeholder" : "Confirmed"}</span>
                <h3 style={{ fontSize: "1.15rem" }}>{h.name}</h3>
                <p style={{ fontSize: ".87rem", color: "#5A655E" }}>{h.region}</p>
                <p style={{ fontSize: ".87rem", color: "#5A655E", marginTop: ".4rem" }}>Contact: {h.contact}</p>
              </article>
            ))}
          </div>
          <div style={{ marginTop: "2.2rem" }}>
            <Link href="/travel#guides" className="txtlink">
              Back to Travel Information <svg className="arw" width="16" height="12" aria-hidden="true"><use href="#i-arw" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
