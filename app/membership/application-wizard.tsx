"use client";

import { useRef, useState } from "react";
import { SPECS, REGIONS, LANGS } from "@/data/site-data";
import { useModal, useCloseModal } from "@/components/site/modal";
import { useToast } from "@/components/site/toast";

const STEPS = ["Company", "Contact", "Documents", "Review"];

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function ConfirmationModal({ company, reference }: { company: string; reference: string }) {
  const close = useCloseModal();
  return (
    <div>
      <div className="mhead"><div className="eyebrow">Application Received</div><h2 className="display-m">Thank you, we have your application.</h2></div>
      <div className="mbody">
        <p>{company} has been submitted to the ABTO secretariat with reference <strong>ABTO-{reference}</strong>.</p>
        <p>Your licence and deposit slip will be verified. Once confirmed, your company is added to the public member directory and you will receive access to member services.</p>
        <p className="small" style={{ background: "var(--paper)", borderLeft: "2px solid var(--gold)", padding: ".9rem 1rem", color: "#5A655E" }}>
          Questions about your application: <strong>+975 2 322 862</strong> or <strong>info@abto.org.bt</strong>
        </p>
        <button className="btn" onClick={close} style={{ width: "100%", justifyContent: "center", marginTop: ".6rem" }}><span>Done</span></button>
      </div>
    </div>
  );
}

export default function ApplicationWizard() {
  const [step, setStep] = useState(1);
  const [specs, setSpecs] = useState<string[]>([]);
  const [langs, setLangs] = useState<string[]>([]);
  const [licenceFile, setLicenceFile] = useState(false);
  const [feeFile, setFeeFile] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [review, setReview] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const openModal = useModal();
  const toast = useToast();

  const goto = (n: number) => {
    if (n === 4 && formRef.current) {
      const data = new FormData(formRef.current);
      setReview({
        company: String(data.get("company") || ""),
        licence: String(data.get("licence") || ""),
        year: String(data.get("year") || ""),
        region: String(data.get("region") || ""),
        web: String(data.get("web") || ""),
        person: String(data.get("person") || ""),
        position: String(data.get("position") || ""),
        email: String(data.get("email") || ""),
        mobile: String(data.get("mobile") || ""),
        address: String(data.get("address") || ""),
        desc: String(data.get("desc") || "")
      });
    }
    setStep(n);
    setTimeout(() => {
      document.getElementById("stepper")?.scrollIntoView({ block: "start", behavior: "smooth" });
    }, 0);
  };

  const validatePane = (n: number) => {
    if (!formRef.current) return true;
    const pane = formRef.current.querySelector<HTMLElement>(`[data-pane="${n}"]`);
    if (!pane) return true;
    let ok = true;
    const nextErrors: Record<string, boolean> = {};
    pane.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("[required]").forEach((f) => {
      let bad = !String(f.value).trim();
      if (f instanceof HTMLInputElement && f.type === "email" && f.value.trim()) bad = !isValidEmail(f.value);
      if (bad) ok = false;
      nextErrors[f.name] = bad;
    });
    if (n === 3) {
      if (!licenceFile) { ok = false; nextErrors.licenceFile = true; }
      if (!feeFile) { ok = false; nextErrors.feeFile = true; }
    }
    setErrors((prev) => ({ ...prev, ...nextErrors }));
    if (!ok) toast("Please complete the highlighted fields before continuing.");
    return ok;
  };

  const next = (to: number) => {
    if (validatePane(to - 1)) goto(to);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const company = String(data.get("company") || "Your company");
    const reference = Date.now().toString().slice(-6);
    openModal(<ConfirmationModal company={company} reference={reference} />);
    e.currentTarget.reset();
    setSpecs([]);
    setLangs([]);
    setLicenceFile(false);
    setFeeFile(false);
    setErrors({});
    setReview({});
    goto(1);
  };

  const row = (label: string, value?: string) =>
    value ? <><dt>{label}</dt><dd>{value}</dd></> : null;

  return (
    <div>
      <div className="stepper" id="stepper">
        {STEPS.map((label, i) => {
          const n = i + 1;
          return (
            <button key={label} className={`s ${step === n ? "on" : ""} ${step > n ? "done" : ""}`} onClick={() => goto(n)} type="button">
              <span className="sn">{n}</span><span className="st">{label}</span>
            </button>
          );
        })}
      </div>
      <form ref={formRef} onSubmit={onSubmit} noValidate>
        <div className="pane" data-pane="1" style={{ display: step === 1 ? "block" : "none" }}>
          <div className={`fgroup ${errors.company ? "err" : ""}`}>
            <label>Registered company name <span className="req">*</span></label>
            <input name="company" required placeholder="As shown on your tour operation licence" />
            <div className="errmsg">Enter your registered company name.</div>
          </div>
          <div className="frow">
            <div className={`fgroup ${errors.licence ? "err" : ""}`}>
              <label>Tour operation licence no. <span className="req">*</span></label>
              <input name="licence" required placeholder="e.g. TO-2019-0142" />
              <div className="errmsg">Enter your licence number.</div>
            </div>
            <div className={`fgroup ${errors.year ? "err" : ""}`}>
              <label>Year established <span className="req">*</span></label>
              <input name="year" required type="number" min={1970} max={2026} placeholder="2019" />
              <div className="errmsg">Enter the year established.</div>
            </div>
          </div>
          <div className="frow">
            <div className={`fgroup ${errors.region ? "err" : ""}`}>
              <label>Base / dzongkhag <span className="req">*</span></label>
              <select name="region" required defaultValue="">
                <option value="">Select…</option>
                {REGIONS.map((r) => <option key={r}>{r}</option>)}
              </select>
              <div className="errmsg">Select your base.</div>
            </div>
            <div className="fgroup"><label>Website</label><input name="web" placeholder="www.yourcompany.bt" /></div>
          </div>
          <div className="fgroup">
            <label>Specialties (select all that apply)</label>
            <div className="chips">
              {SPECS.map((s) => (
                <button
                  type="button"
                  key={s}
                  className={`chip ${specs.includes(s) ? "on" : ""}`}
                  onClick={() => setSpecs((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]))}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="fgroup">
            <label>Languages your guides work in</label>
            <div className="chips">
              {LANGS.map((l) => (
                <button
                  type="button"
                  key={l}
                  className={`chip ${langs.includes(l) ? "on" : ""}`}
                  onClick={() => setLangs((prev) => (prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l]))}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
          <button type="button" className="btn" onClick={() => next(2)}>
            <span>Continue</span><svg className="arw" width="16" height="12" aria-hidden="true"><use href="#i-arw" /></svg>
          </button>
        </div>

        <div className="pane" data-pane="2" style={{ display: step === 2 ? "block" : "none" }}>
          <div className="frow">
            <div className={`fgroup ${errors.person ? "err" : ""}`}>
              <label>Contact person <span className="req">*</span></label>
              <input name="person" required />
              <div className="errmsg">Enter the contact person&rsquo;s name.</div>
            </div>
            <div className="fgroup"><label>Position</label><input name="position" placeholder="e.g. Managing Director" /></div>
          </div>
          <div className="frow">
            <div className={`fgroup ${errors.email ? "err" : ""}`}>
              <label>Email <span className="req">*</span></label>
              <input type="email" name="email" required placeholder="office@yourcompany.bt" />
              <div className="errmsg">Enter a valid email address.</div>
            </div>
            <div className={`fgroup ${errors.mobile ? "err" : ""}`}>
              <label>Mobile <span className="req">*</span></label>
              <input name="mobile" required placeholder="+975 17 000000" />
              <div className="errmsg">Enter a contact number.</div>
            </div>
          </div>
          <div className="fgroup"><label>Office address</label><textarea name="address" placeholder="Building, street, town" /></div>
          <div className="fgroup">
            <label>Short description for your directory listing</label>
            <textarea name="desc" placeholder="What your company does, in two or three sentences. This appears publicly." />
            <div className="hint">Shown on your public profile. You can update it any time via the secretariat.</div>
          </div>
          <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap" }}>
            <button type="button" className="btn btn-outline-dark" onClick={() => goto(1)}><span>Back</span></button>
            <button type="button" className="btn" onClick={() => next(3)}><span>Continue</span></button>
          </div>
        </div>

        <div className="pane" data-pane="3" style={{ display: step === 3 ? "block" : "none" }}>
          <div className={`fgroup ${errors.licenceFile ? "err" : ""}`}>
            <label>Scanned tour operation licence <span className="req">*</span></label>
            <div className={`dropzone ${licenceFile ? "on" : ""}`} tabIndex={0} role="button" onClick={() => setLicenceFile(true)}>
              <div style={{ color: "var(--stone)" }}>
                <svg width="20" height="20" style={{ margin: "0 auto .5rem" }} aria-hidden="true"><use href="#i-dl" /></svg>
                Click to attach a PDF, JPG or PNG
              </div>
              <div className="fname">{licenceFile ? "Attached: licence-scan.pdf" : ""}</div>
            </div>
            <div className="errmsg">Attach a copy of your licence.</div>
          </div>
          <div className={`fgroup ${errors.feeFile ? "err" : ""}`}>
            <label>Proof of Nu. 3,000 registration fee deposit <span className="req">*</span></label>
            <div className={`dropzone ${feeFile ? "on" : ""}`} tabIndex={0} role="button" onClick={() => setFeeFile(true)}>
              <div style={{ color: "var(--stone)" }}>
                <svg width="20" height="20" style={{ margin: "0 auto .5rem" }} aria-hidden="true"><use href="#i-dl" /></svg>
                Click to attach the deposit slip
              </div>
              <div className="fname">{feeFile ? "Attached: deposit-slip.jpg" : ""}</div>
            </div>
            <div className="errmsg">Attach your deposit slip.</div>
            <div className="hint">Deposit the annual membership fee of Nu. 3,000 to the ABTO account, then attach the slip. You may also pay in person at the ABTO office during office hours.</div>
          </div>
          <div className={`fgroup ${errors.terms ? "err" : ""}`}>
            <label className="checkline">
              <input type="checkbox" name="terms" required />
              <span>I confirm the information given is accurate and that my company holds a valid tour operation licence issued by the Department of Tourism.</span>
            </label>
            <div className="errmsg">You must confirm this to continue.</div>
          </div>
          <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap" }}>
            <button type="button" className="btn btn-outline-dark" onClick={() => goto(2)}><span>Back</span></button>
            <button type="button" className="btn" onClick={() => next(4)}><span>Review Application</span></button>
          </div>
        </div>

        <div className="pane review" data-pane="4" style={{ display: step === 4 ? "block" : "none" }}>
          <p className="lead" style={{ marginBottom: "1.6rem" }}>Check your details before submitting.</p>
          <div style={{ background: "var(--paper)", border: "1px solid rgba(20,28,24,.1)", padding: "1.6rem" }}>
            <dl>
              {row("Company", review.company)}
              {row("Licence no.", review.licence)}
              {row("Established", review.year)}
              {row("Base", review.region)}
              {row("Website", review.web)}
              {row("Specialties", specs.join(", "))}
              {row("Languages", langs.join(", "))}
              {row("Contact", review.person)}
              {row("Position", review.position)}
              {row("Email", review.email)}
              {row("Mobile", review.mobile)}
              {row("Address", review.address)}
              {row("Listing text", review.desc)}
              {row("Licence document", licenceFile ? "licence-scan.pdf" : "")}
              {row("Fee deposit slip", feeFile ? "deposit-slip.jpg" : "")}
              <dt>Membership fee</dt><dd>Nu. 3,000 (annual)</dd>
            </dl>
          </div>
          <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginTop: "1.6rem" }}>
            <button type="button" className="btn btn-outline-dark" onClick={() => goto(3)}><span>Back</span></button>
            <button type="submit" className="btn"><span>Submit Application</span><svg className="arw" width="16" height="12" aria-hidden="true"><use href="#i-arw" /></svg></button>
          </div>
        </div>
      </form>
    </div>
  );
}
