import PageHead from "@/components/site/page-head";
import RidgeSvg from "@/components/site/ridge-svg";
import { unsplashUrl } from "@/lib/unsplash";
import ContactForm from "./contact-form";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="page on page-in">
      <PageHead
        crumb="Contact"
        title={<>Talk to the<br />secretariat</>}
        intro="The ABTO office is in Thimphu. For membership, training, policy or media enquiries, use the form or the details below."
      />
      <section className="pad-s">
        <div className="wrap split" style={{ alignItems: "start" }}>
          <div>
            <div className="eyebrow">Send a Message</div>
            <ContactForm />
          </div>
          <aside className="sticky-side">
            <div style={{ background: "var(--forest)", color: "var(--ivory)", padding: "clamp(1.6rem,3vw,2.2rem)", marginBottom: "1rem" }}>
              <div className="eyebrow on-dark">ABTO Secretariat</div>
              <div style={{ display: "flex", gap: ".8rem", alignItems: "flex-start", marginBottom: "1rem" }}>
                <span style={{ color: "var(--gold)", flex: "none", marginTop: 4 }}><svg width="14" height="16" aria-hidden="true"><use href="#i-pin" /></svg></span>
                <span>Drimey Lam, Thimphu <em style={{ fontSize: ".82em", opacity: 0.7 }}>(street address to be confirmed)</em><br />PO Box 938<br />Kingdom of Bhutan</span>
              </div>
              <div style={{ display: "flex", gap: ".8rem", alignItems: "center", marginBottom: ".6rem" }}>
                <span style={{ color: "var(--gold)", flex: "none" }}><svg width="15" height="15" aria-hidden="true"><use href="#i-phone" /></svg></span>
                <span>+975 2 322 862</span>
              </div>
              <div style={{ display: "flex", gap: ".8rem", alignItems: "center" }}>
                <span style={{ color: "var(--gold)", flex: "none" }}><svg width="15" height="14" aria-hidden="true"><use href="#i-mail" /></svg></span>
                <span>info@abto.org.bt</span>
              </div>
            </div>
            <div style={{ border: "1px solid rgba(20,28,24,.12)", padding: "clamp(1.6rem,3vw,2.2rem)" }}>
              <div className="eyebrow">Office Hours</div>
              <dl style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: ".5rem 1rem", fontSize: ".9rem" }}>
                <dt style={{ color: "var(--stone)" }}>Monday – Friday</dt><dd style={{ margin: 0 }}>09:00 – 17:00</dd>
                <dt style={{ color: "var(--stone)" }}>Saturday</dt><dd style={{ margin: 0 }}>09:00 – 13:00</dd>
                <dt style={{ color: "var(--stone)" }}>Sunday</dt><dd style={{ margin: 0 }}>Closed</dd>
              </dl>
              <p className="small" style={{ color: "var(--stone)", marginTop: "1rem" }}>
                Membership registration in person is handled during office hours. Bring a copy of your tour operation
                licence.
              </p>
            </div>
            <div style={{ marginTop: "1rem", position: "relative", aspectRatio: "4/3", background: "var(--forest-deep)", overflow: "hidden" }}>
              <RidgeSvg id="mp" height={300} />
              <img src={unsplashUrl("photo-1650747857310-c359fd3ee5c5")} alt="Thimphu, Bhutan" loading="lazy" decoding="async" referrerPolicy="no-referrer" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(20,28,24,.15),rgba(20,28,24,.55))" }} />
              <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "var(--gold-pale)", textAlign: "center" }}>
                <div>
                  <svg width="24" height="28" style={{ margin: "0 auto .5rem" }} aria-hidden="true"><use href="#i-pin" /></svg>
                  <div style={{ fontFamily: "var(--f-util)", fontSize: ".62rem", letterSpacing: ".16em", textTransform: "uppercase" }}>Thimphu, Bhutan</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
