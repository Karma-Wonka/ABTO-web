import Link from "next/link";
import { BRAND_MARK } from "@/data/brand-mark";

export default function Footer() {
  return (
    <footer>
      <div className="flags-strip" aria-hidden="true">
        <i style={{ background: "var(--pf-blue)" }} /><i style={{ background: "var(--pf-white)" }} />
        <i style={{ background: "var(--pf-red)" }} /><i style={{ background: "var(--pf-green)" }} />
        <i style={{ background: "var(--pf-yellow)" }} />
      </div>
      <div className="wrap">
        <div className="fmain">
          <div>
            <Link href="/" className="brand" style={{ marginBottom: "1.3rem" }}>
              <img className="brand-mark" src={BRAND_MARK} alt="ABTO logo" width={76} height={65} />
              <span className="brand-txt"><b>ABTO</b><em>Bhutanese Tour Operators</em></span>
            </Link>
            <p style={{ fontSize: ".9rem", maxWidth: 330, lineHeight: 1.75 }}>
              The mutual and official voice of all Bhutanese tour operators. A not-for-profit organisation founded in 2000.
            </p>
            <div style={{ marginTop: "1.5rem", fontSize: ".875rem", lineHeight: 2 }}>
              <div style={{ display: "flex", gap: ".7rem", alignItems: "flex-start" }}>
                <span style={{ color: "var(--kemar)", flex: "none", marginTop: 6 }}>
                  <svg width="14" height="16" aria-hidden="true"><use href="#i-pin" /></svg>
                </span>
                <span>
                  Drimey Lam, Thimphu <em style={{ fontSize: ".82em", opacity: 0.7 }}>(street address to be confirmed)</em>
                  <br />PO Box 938<br />Kingdom of Bhutan
                </span>
              </div>
              <div style={{ display: "flex", gap: ".7rem", alignItems: "center", marginTop: ".5rem" }}>
                <span style={{ color: "var(--kemar)", flex: "none" }}><svg width="15" height="15" aria-hidden="true"><use href="#i-phone" /></svg></span>
                <a href="tel:+9752322862" style={{ padding: 0 }}>+975 2 322 862</a>
              </div>
              <div style={{ display: "flex", gap: ".7rem", alignItems: "center" }}>
                <span style={{ color: "var(--kemar)", flex: "none" }}><svg width="15" height="14" aria-hidden="true"><use href="#i-mail" /></svg></span>
                <a href="mailto:info@abto.org.bt" style={{ padding: 0 }}>info@abto.org.bt</a>
              </div>
            </div>
          </div>
          <div>
            <h6>The Association</h6>
            <Link href="/about">About ABTO</Link><Link href="/purpose">Purpose &amp; Objectives</Link>
            <Link href="/board">Board of Directors</Link><Link href="/organogram">Organogram</Link>
            <Link href="/membership">Membership Benefits</Link><Link href="/membership#apply">Join ABTO</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div>
            <h6>Resources</h6>
            <Link href="/members">Member Directory</Link><Link href="/policy">Policy &amp; Regulations</Link>
            <Link href="/horses">Horse Contractors</Link><Link href="/classifieds">Classifieds</Link>
            <Link href="/downloads">Downloads</Link><Link href="/publications">Publications</Link>
            <Link href="/gallery">Gallery</Link>
          </div>
          <div>
            <h6>Visiting Bhutan</h6>
            <Link href="/bhutan">Tourism in Bhutan</Link><Link href="/bhutan#gnh">Gross National Happiness</Link>
            <Link href="/travel">Getting to Bhutan</Link><Link href="/travel#places">Places of Interest</Link>
            <Link href="/festivals">Festival Calendar</Link><Link href="/horses">Horse Contractors</Link>
            <Link href="/news">Tourism News</Link>
          </div>
        </div>
        <div className="fbot">
          <div>© {new Date().getFullYear()} Association of Bhutanese Tour Operators. All rights reserved.</div>
          <div className="socials">
            <a href="#" aria-label="Facebook"><svg width="14" height="14" aria-hidden="true"><use href="#i-fb" /></svg></a>
            <a href="#" aria-label="X"><svg width="14" height="14" aria-hidden="true"><use href="#i-x2" /></svg></a>
            <a href="#" aria-label="Instagram"><svg width="14" height="14" aria-hidden="true"><use href="#i-ig" /></svg></a>
            <a href="#" aria-label="YouTube"><svg width="16" height="13" aria-hidden="true"><use href="#i-yt" /></svg></a>
            <a href="#" aria-label="LinkedIn"><svg width="14" height="14" aria-hidden="true"><use href="#i-in" /></svg></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
