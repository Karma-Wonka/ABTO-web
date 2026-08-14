"use client";

import { useState } from "react";
import Link from "next/link";

const STEPS = [
  { n: "Step 01", title: "Check eligibility", body: "Hold a valid tour operation licence issued by the Department of Tourism." },
  { n: "Step 02", title: "Complete the form", body: "Company details, contact person, specialties and languages served." },
  { n: "Step 03", title: "Attach documents", body: "Scanned licence and proof of the Nu. 3,000 registration fee deposit." },
  { n: "Step 04", title: "Listed in the directory", body: "Once verified, your company appears in the public member directory." }
];

export default function MembershipTeaser() {
  const [active, setActive] = useState(0);

  return (
    <section className="pad" id="join">
      <div className="wrap">
        <div className="split" style={{ alignItems: "end", marginBottom: "clamp(2.4rem,4vw,3.4rem)" }}>
          <div className="rv">
            <div className="eyebrow">Membership</div>
            <h2 className="display-l">Join Bhutan&rsquo;s leading tourism network.</h2>
          </div>
          <div className="rv">
            <p className="lead">
              Membership is open to every licensed tour operator in Bhutan. Membership is{" "}
              <strong>Nu. 3,000 per year</strong>. You can complete the whole process online.
            </p>
            <Link href="/membership" className="txtlink" style={{ marginTop: ".8rem" }}>
              See all benefits <svg className="arw" width="16" height="12" aria-hidden="true"><use href="#i-arw" /></svg>
            </Link>
          </div>
        </div>
        <div className="steps rv">
          {STEPS.map((step, i) => (
            <div
              key={step.n}
              className={`step ${active === i ? "active" : ""}`}
              onMouseEnter={() => setActive(i)}
            >
              <span className="n">{step.n}</span>
              <h4>{step.title}</h4>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
        <div className="rv" style={{ marginTop: "2.2rem", display: "flex", flexWrap: "wrap", gap: ".85rem" }}>
          <Link href="/membership#apply" className="btn">
            <span>Start Your Application</span>
            <svg className="arw" width="16" height="12" aria-hidden="true"><use href="#i-arw" /></svg>
          </Link>
          <Link href="/downloads" className="btn btn-outline-dark"><span>Download Paper Form</span></Link>
        </div>
      </div>
    </section>
  );
}
