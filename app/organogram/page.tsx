import Link from "next/link";
import PageHead from "@/components/site/page-head";

export const metadata = { title: "Organogram" };

const ORG_DIVISIONS = [
  { name: "Programme Division", icon: "i-globe", color: "var(--forest-mid)", roles: ["Programme Officer", "Research Officer"] },
  { name: "Administration", icon: "i-user", color: "var(--kemar-light)", roles: ["Administration Officer", "Office Assistant"] },
  { name: "Finance Division", icon: "i-doc", color: "var(--gold)", roles: ["Finance Officer"] }
];

export default function OrganogramPage() {
  return (
    <div className="page on page-in">
      <PageHead
        crumb="Organogram"
        title={<>Structure of<br />the association</>}
        intro="From the Board of Directors down to the secretariat's working departments: how authority and day-to-day responsibility are organised at ABTO."
      />
      <section className="pad-s">
        <div className="wrap">
          <div style={{ background: "var(--paper)", border: "1px solid rgba(20,28,24,.1)", padding: "clamp(2rem,5vw,4rem) clamp(1.2rem,5vw,3.6rem)" }}>
            <div className="orgchart">
              <div className="onode" style={{ background: "var(--kemar)", color: "var(--ivory)", boxShadow: "0 14px 34px -16px rgba(140,43,35,.5)" }}>Board of Directors</div>
              <div className="ostem" />
              <div className="onode" style={{ background: "var(--paper)", border: "1px solid var(--forest)", color: "var(--forest)" }}>Executive Director</div>
              <div className="obranch"><i /><i /><i /></div>
              <div className="grid-3" style={{ width: "100%", maxWidth: 820 }}>
                {ORG_DIVISIONS.map((d) => (
                  <article className="card divcard" key={d.name}>
                    <span className="dbadge" style={{ background: d.color }}>
                      <svg width="22" height="22" aria-hidden="true"><use href={`#${d.icon}`} /></svg>
                    </span>
                    <h4>{d.name}</h4>
                    <ul>{d.roles.map((r) => <li key={r}>{r}</li>)}</ul>
                  </article>
                ))}
              </div>
            </div>
          </div>
          <div className="grid-3" style={{ marginTop: "clamp(2.4rem,4vw,3.4rem)" }}>
            <article className="card"><span className="num">Board</span><h3>Governance</h3><p>Elected office bearers who set policy and oversee the association between Annual General Meetings.</p></article>
            <article className="card"><span className="num">Executive Director</span><h3>Operations</h3><p>Heads the secretariat and runs day-to-day operations within the association&rsquo;s articles.</p></article>
            <article className="card"><span className="num">Departments</span><h3>Delivery</h3><p>The three divisions, programme, administration and finance, carry out the association&rsquo;s day-to-day work.</p></article>
          </div>
          <div style={{ marginTop: "2.2rem" }}>
            <Link href="/board" className="txtlink">
              Back to Board of Directors <svg className="arw" width="16" height="12" aria-hidden="true"><use href="#i-arw" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
