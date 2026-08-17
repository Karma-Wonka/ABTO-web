"use client";

import { useRef, useState } from "react";
import { SPECS, REGIONS, LANGS } from "@/data/site-data";
import { useModal, useCloseModal } from "@/components/site/modal";
import { useToast } from "@/components/site/toast";

const STEPS = ["Company", "Contact", "Documents", "Review"];

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

type UploadState = { status: "idle" | "uploading" | "done" | "error"; key?: string; name?: string; message?: string };
const emptyUpload: UploadState = { status: "idle" };

function FileDropzone({
  label,
  accept,
  state,
  onFile
}: {
  label: string;
  accept: string;
  state: UploadState;
  onFile: (file: File) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      className={`dropzone ${state.status === "done" ? "on" : ""}`}
      tabIndex={0}
      role="button"
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); inputRef.current?.click(); }
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const f = e.dataTransfer.files?.[0];
        if (f) onFile(f);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
          e.target.value = "";
        }}
      />
      <div style={{ color: "var(--stone)" }}>
        <svg width="20" height="20" style={{ margin: "0 auto .5rem" }} aria-hidden="true"><use href="#i-dl" /></svg>
        {state.status === "uploading" ? "Uploading…" : label}
      </div>
      <div className="fname" style={{ color: state.status === "error" ? "var(--kemar)" : undefined }}>
        {state.status === "done" && `Attached: ${state.name}`}
        {state.status === "error" && (state.message || "Upload failed. Try again.")}
      </div>
    </div>
  );
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
  const [maxStep, setMaxStep] = useState(1);
  const [specs, setSpecs] = useState<string[]>([]);
  const [langs, setLangs] = useState<string[]>([]);
  const [licenceFile, setLicenceFile] = useState<UploadState>(emptyUpload);
  const [feeFile, setFeeFile] = useState<UploadState>(emptyUpload);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [review, setReview] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
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
    setMaxStep((m) => Math.max(m, n));
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
    const passwordValue = pane.querySelector<HTMLInputElement>('input[name="password"]')?.value ?? "";
    pane.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("[required]").forEach((f) => {
      let bad = !String(f.value).trim();
      if (f instanceof HTMLInputElement && f.type === "email" && f.value.trim()) bad = !isValidEmail(f.value);
      if (f instanceof HTMLInputElement && f.name === "password" && f.value) bad = f.value.length < 8;
      if (f instanceof HTMLInputElement && f.name === "confirmPassword" && f.value) bad = f.value !== passwordValue;
      if (bad) ok = false;
      nextErrors[f.name] = bad;
    });
    if (n === 3) {
      if (licenceFile.status !== "done") { ok = false; nextErrors.licenceFile = true; }
      if (feeFile.status !== "done") { ok = false; nextErrors.feeFile = true; }
    }
    setErrors((prev) => ({ ...prev, ...nextErrors }));
    if (!ok) toast("Please complete the highlighted fields before continuing.");
    return ok;
  };

  const next = (to: number) => {
    if (validatePane(to - 1)) goto(to);
  };

  const uploadFile = async (file: File, setState: (s: UploadState) => void) => {
    setState({ status: "uploading" });
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body });
      const result = await res.json().catch(() => ({ success: false, message: "" }));
      if (!res.ok || !result.success) {
        setState({ status: "error", message: result.message || "Upload failed. Try again." });
        return;
      }
      setState({ status: "done", key: result.key, name: file.name });
    } catch {
      setState({ status: "error", message: "Upload failed. Check your connection." });
    }
  };

  // The header stepper lets people jump straight to a pane by clicking its
  // number. Steps already reached can be revisited freely, but jumping
  // ahead still has to pass validation for every pane in between —
  // otherwise it was a back door around required fields (the form itself
  // has noValidate, so nothing else was enforcing this).
  const headerNav = (n: number) => {
    if (n <= maxStep) { goto(n); return; }
    for (let i = step; i < n; i++) {
      if (!validatePane(i)) return;
    }
    goto(n);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const company = String(data.get("company") || "Your company");
    const password = String(data.get("password") || "");

    setSubmitting(true);
    try {
      const res = await fetch("/api/membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "membership",
          company,
          name: String(data.get("person") || ""),
          email: String(data.get("email") || ""),
          phone: String(data.get("mobile") || ""),
          message: String(data.get("desc") || ""),
          password,
          payload: {
            licence: String(data.get("licence") || ""),
            year: String(data.get("year") || ""),
            region: String(data.get("region") || ""),
            website: String(data.get("web") || ""),
            position: String(data.get("position") || ""),
            address: String(data.get("address") || ""),
            specialties: specs,
            languages: langs,
            licenceFileKey: licenceFile.key,
            licenceFileName: licenceFile.name,
            feeFileKey: feeFile.key,
            feeFileName: feeFile.name
          }
        })
      });
      const result = await res.json().catch(() => ({ success: false, message: "" }));
      if (!res.ok || !result.success) {
        toast(result.message || "Unable to submit your application. Please try again.");
        return;
      }

      const reference = Date.now().toString().slice(-6);
      openModal(<ConfirmationModal company={company} reference={reference} />);
      form.reset();
      setSpecs([]);
      setLangs([]);
      setLicenceFile(emptyUpload);
      setFeeFile(emptyUpload);
      setErrors({});
      setReview({});
      setMaxStep(1);
      goto(1);
    } catch {
      toast("Unable to reach the server. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const row = (label: string, value?: string) =>
    value ? <><dt>{label}</dt><dd>{value}</dd></> : null;

  return (
    <div>
      <div className="stepper" id="stepper">
        {STEPS.map((label, i) => {
          const n = i + 1;
          return (
            <button key={label} className={`s ${step === n ? "on" : ""} ${step > n ? "done" : ""}`} onClick={() => headerNav(n)} type="button">
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
          <div className="frow">
            <div className={`fgroup ${errors.password ? "err" : ""}`}>
              <label>Password <span className="req">*</span></label>
              <div style={{ position: "relative" }}>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  style={{ paddingRight: "3.6rem" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  style={{
                    position: "absolute", right: ".9rem", top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer",
                    fontFamily: "var(--f-util)", fontSize: ".64rem", letterSpacing: ".1em",
                    textTransform: "uppercase", color: "var(--stone)"
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div className="errmsg">Enter a password with at least 8 characters.</div>
            </div>
            <div className={`fgroup ${errors.confirmPassword ? "err" : ""}`}>
              <label>Confirm password <span className="req">*</span></label>
              <div style={{ position: "relative" }}>
                <input
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  style={{ paddingRight: "3.6rem" }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  style={{
                    position: "absolute", right: ".9rem", top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer",
                    fontFamily: "var(--f-util)", fontSize: ".64rem", letterSpacing: ".1em",
                    textTransform: "uppercase", color: "var(--stone)"
                  }}
                >
                  {showConfirm ? "Hide" : "Show"}
                </button>
              </div>
              <div className="errmsg">Passwords do not match.</div>
            </div>
          </div>
          <div className="hint" style={{ marginTop: "-.6rem", marginBottom: "1.2rem" }}>
            This becomes the login for your ABTO member account once your application is approved.
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
            <FileDropzone
              label="Click to attach, or drag a PDF, JPG or PNG"
              accept=".pdf,.jpg,.jpeg,.png,.webp"
              state={licenceFile}
              onFile={(f) => uploadFile(f, setLicenceFile)}
            />
            <div className="errmsg">Attach a copy of your licence.</div>
          </div>
          <div className={`fgroup ${errors.feeFile ? "err" : ""}`}>
            <label>Proof of Nu. 3,000 registration fee deposit <span className="req">*</span></label>
            <FileDropzone
              label="Click to attach, or drag the deposit slip"
              accept=".pdf,.jpg,.jpeg,.png,.webp"
              state={feeFile}
              onFile={(f) => uploadFile(f, setFeeFile)}
            />
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
            <button
              type="button"
              className="btn"
              onClick={() => next(4)}
              disabled={licenceFile.status === "uploading" || feeFile.status === "uploading"}
            >
              <span>Review Application</span>
            </button>
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
              {row("Licence document", licenceFile.name)}
              {row("Fee deposit slip", feeFile.name)}
              <dt>Membership fee</dt><dd>Nu. 3,000 (annual)</dd>
            </dl>
          </div>
          <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginTop: "1.6rem" }}>
            <button type="button" className="btn btn-outline-dark" onClick={() => goto(3)} disabled={submitting}><span>Back</span></button>
            <button type="submit" className="btn" disabled={submitting}>
              <span>{submitting ? "Submitting…" : "Submit Application"}</span>
              <svg className="arw" width="16" height="12" aria-hidden="true"><use href="#i-arw" /></svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
