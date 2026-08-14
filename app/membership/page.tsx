import Link from "next/link";
import PageHead from "@/components/site/page-head";
import Accordion from "@/components/site/accordion";
import { FAQS } from "@/data/site-data";
import { getLiveData } from "@/lib/live-data";
import RenewCertButtons from "./renew-cert-modals";
import ApplicationWizard from "./application-wizard";

export const metadata = { title: "Membership" };
export const revalidate = 60;

const BENEFITS = [
  { num: "Representation", title: "A voice in policy", body: "ABTO is consulted on regulation affecting tour operations. Member positions are consolidated and carried to the Department of Tourism and other agencies." },
  { num: "Visibility", title: "National directory listing", body: "A public profile in the member directory used by foreign agents, travel media and prospective visitors researching Bhutan." },
  { num: "Recognition", title: "Digital Membership Certificate", body: "Download a digital Membership Certificate every year once your annual fee is confirmed, official recognition of active, licensed ABTO membership." },
  { num: "Capability", title: "Training and certification", body: "Subsidised in-country and overseas training, service standards programmes and sustainability certification initiatives, delivered through national and international partnerships." },
  { num: "Markets", title: "Collective trade presence", body: "Shared association stands at travel marts give smaller operators cost-effective access to international buyers." },
  { num: "Trade", title: "Classifieds and notices", body: "Post and find vehicles, equipment, staff and partnership opportunities across the membership." },
  { num: "Support", title: "Administrative facilitation", body: "Faster processing of formalities and assistance with matters no single operator can pursue alone." }
];

export default async function MembershipPage() {
  const { members } = await getLiveData();

  return (
    <div className="page on page-in">
      <PageHead
        crumb="Membership"
        title={<>Join Bhutan&rsquo;s leading<br />tourism network</>}
        intro="Membership is open to every licensed tour operator in Bhutan, for an annual fee of Nu. 3,000. Members are listed in the national directory and have a voice in shaping the policies and decisions that affect Bhutan's tourism industry."
      />
      <section className="pad-s">
        <div className="wrap">
          <ul style={{ listStyle: "none", margin: "0 0 clamp(2rem,4vw,3rem)", padding: 0, display: "grid", gap: ".7rem", maxWidth: "70ch" }}>
            <li style={{ display: "flex", gap: ".7rem", alignItems: "flex-start", fontSize: ".98rem" }}><svg width="15" height="15" style={{ color: "var(--kemar)", flex: "none", marginTop: ".3rem" }} aria-hidden="true"><use href="#i-check" /></svg>Membership is open to all licensed tour operators in Bhutan.</li>
            <li style={{ display: "flex", gap: ".7rem", alignItems: "flex-start", fontSize: ".98rem" }}><svg width="15" height="15" style={{ color: "var(--kemar)", flex: "none", marginTop: ".3rem" }} aria-hidden="true"><use href="#i-check" /></svg>Annual membership fee: <strong>Nu. 3,000</strong>.</li>
            <li style={{ display: "flex", gap: ".7rem", alignItems: "flex-start", fontSize: ".98rem" }}><svg width="15" height="15" style={{ color: "var(--kemar)", flex: "none", marginTop: ".3rem" }} aria-hidden="true"><use href="#i-check" /></svg>Members are listed in the national directory on the ABTO website.</li>
            <li style={{ display: "flex", gap: ".7rem", alignItems: "flex-start", fontSize: ".98rem" }}><svg width="15" height="15" style={{ color: "var(--kemar)", flex: "none", marginTop: ".3rem" }} aria-hidden="true"><use href="#i-check" /></svg>Members have a voice in shaping the tourism policies and decisions that affect Bhutan&rsquo;s tourism industry.</li>
          </ul>

          <div style={{ display: "flex", flexWrap: "wrap", gap: ".85rem", marginBottom: "clamp(2.6rem,5vw,4rem)" }}>
            <Link href="/membership#apply" className="btn"><span>Become a Member</span><svg className="arw" width="16" height="12" aria-hidden="true"><use href="#i-arw" /></svg></Link>
            <RenewCertButtons members={members} />
          </div>

          <div className="eyebrow">What Membership Gives You</div>
          <div className="grid-3" style={{ marginBottom: "clamp(2.6rem,5vw,4rem)" }}>
            {BENEFITS.map((b) => (
              <article className="card" key={b.num}><span className="num">{b.num}</span><h3>{b.title}</h3><p>{b.body}</p></article>
            ))}
          </div>

          <div id="apply" />
          <div className="split" style={{ alignItems: "start", gap: "clamp(2rem,5vw,4.5rem)" }}>
            <div>
              <div className="eyebrow">Apply Online</div>
              <h2 className="display-m" style={{ marginBottom: "2rem" }}>Membership application</h2>
              <ApplicationWizard />
            </div>

            <aside className="sticky-side">
              <div style={{ position: "relative", overflow: "hidden", borderRadius: 18, padding: "clamp(1.7rem,3vw,2.3rem)", marginBottom: "1rem", background: "linear-gradient(115deg,var(--kemar) 0%,#A8382D 48%,var(--gold) 100%)", color: "var(--ivory)", boxShadow: "0 18px 40px -22px rgba(140,43,35,.45)" }}>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ fontFamily: "var(--f-util)", fontSize: ".62rem", letterSpacing: ".22em", textTransform: "uppercase", opacity: 0.85, marginBottom: "1.6rem" }}>ABTO · Membership</div>
                  <div style={{ fontFamily: "var(--f-util)", fontWeight: 700, fontSize: "clamp(2.4rem,4vw,3.1rem)", lineHeight: 1, letterSpacing: "-.02em", marginBottom: ".3rem" }}>Nu. 3,000</div>
                  <div style={{ fontFamily: "var(--f-util)", fontSize: ".68rem", letterSpacing: ".14em", textTransform: "uppercase", opacity: 0.85, marginBottom: "1.8rem" }}>Annual membership fee</div>
                  <dl style={{ display: "grid", gap: ".7rem", fontSize: ".85rem", borderTop: "1px solid rgba(255,255,255,.22)", paddingTop: "1.1rem", margin: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}><dt style={{ opacity: 0.75 }}>Eligibility</dt><dd style={{ margin: 0 }}>Valid TO licence</dd></div>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}><dt style={{ opacity: 0.75 }}>Apply by</dt><dd style={{ margin: 0 }}>Online or in person</dd></div>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}><dt style={{ opacity: 0.75 }}>Renewal</dt><dd style={{ margin: 0 }}>Annually, before expiry</dd></div>
                  </dl>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: ".55rem", padding: "1rem 0 1.3rem", borderBottom: "1px solid rgba(20,28,24,.1)", marginBottom: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: ".6rem", fontSize: ".78rem", color: "#5A655E" }}><svg width="14" height="14" style={{ color: "var(--kemar)", flex: "none" }} aria-hidden="true"><use href="#i-check" /></svg>Licensed by the Department of Tourism</div>
                <div style={{ display: "flex", alignItems: "center", gap: ".6rem", fontSize: ".78rem", color: "#5A655E" }}><svg width="14" height="14" style={{ color: "var(--kemar)", flex: "none" }} aria-hidden="true"><use href="#i-check" /></svg>Public listing in the national directory</div>
                <div style={{ display: "flex", alignItems: "center", gap: ".6rem", fontSize: ".78rem", color: "#5A655E" }}><svg width="14" height="14" style={{ color: "var(--kemar)", flex: "none" }} aria-hidden="true"><use href="#i-check" /></svg>Digital certificate issued on each renewal</div>
              </div>
              <div style={{ border: "1px solid rgba(20,28,24,.12)", padding: "clamp(1.5rem,3vw,2rem)", marginBottom: "1rem" }}>
                <div className="eyebrow">Prefer Paper?</div>
                <p className="small" style={{ color: "#5A655E", marginBottom: "1rem" }}>Download the registration form, complete it, and email it with your scanned licence and deposit slip to the secretariat.</p>
                <button className="btn btn-sm btn-outline-dark" style={{ width: "100%", justifyContent: "center" }}><span>Download Form</span></button>
              </div>
              <div style={{ border: "1px solid rgba(20,28,24,.12)", padding: "clamp(1.5rem,3vw,2rem)" }}>
                <div className="eyebrow">Need Help?</div>
                <p className="small" style={{ color: "#5A655E" }}>ABTO Secretariat<br />Drimey Lam, Thimphu (address to be confirmed)<br />PO Box 938<br />+975 2 322 862<br />info@abto.org.bt</p>
              </div>
            </aside>
          </div>

          <div id="faq" style={{ marginTop: "clamp(3.4rem,6vw,5.4rem)" }}>
            <div className="eyebrow">Requirements &amp; FAQ</div>
            <h2 className="display-m" style={{ marginBottom: "2rem" }}>Common questions</h2>
            <div style={{ maxWidth: 900 }}><Accordion items={FAQS} /></div>
          </div>
        </div>
      </section>
    </div>
  );
}
