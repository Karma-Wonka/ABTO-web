"use client";

import { useState } from "react";
import { useModal, useCloseModal } from "@/components/site/modal";
import { useToast } from "@/components/site/toast";
import { validateForm } from "@/lib/validate";
import type { LiveData } from "@/lib/live-data";

type Member = LiveData["members"][number];

function RenewModal({ members }: { members: Member[] }) {
  const close = useCloseModal();
  const toast = useToast();
  const [attached, setAttached] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!attached) {
      toast("Attach your deposit slip before submitting.");
      return;
    }
    if (!validateForm(e.currentTarget)) return;
    const company = new FormData(e.currentTarget).get("company") || "Your company";
    close();
    toast(`Renewal received for ${company}. Your updated Membership Certificate will be ready once the deposit is verified.`);
  };

  return (
    <div>
      <div className="mhead"><div className="eyebrow">Renew Membership</div><h2 className="display-m">Confirm your annual renewal</h2></div>
      <div className="mbody">
        <form onSubmit={onSubmit} noValidate>
          <div className="fgroup">
            <label>Registered company name <span className="req">*</span></label>
            <input name="company" required list="memberlist-renew" />
            <datalist id="memberlist-renew">{members.slice(0, 40).map((m) => <option key={m.id} value={m.name} />)}</datalist>
            <div className="errmsg">Enter your registered company name.</div>
          </div>
          <div className="fgroup"><label>Tour operation licence no. <span className="req">*</span></label><input name="licence" required placeholder="e.g. TO-2019-0142" /><div className="errmsg">Enter your licence number.</div></div>
          <div className="fgroup">
            <label>Proof of Nu. 3,000 annual fee deposit <span className="req">*</span></label>
            <div className={`dropzone ${attached ? "on" : ""}`} tabIndex={0} role="button" onClick={() => setAttached(true)}>
              <div style={{ color: "var(--stone)" }}>
                <svg width="20" height="20" style={{ margin: "0 auto .5rem" }} aria-hidden="true"><use href="#i-dl" /></svg>
                Click to attach the deposit slip
              </div>
              <div className="fname">{attached ? "Attached: deposit-slip.jpg" : ""}</div>
            </div>
            <div className="hint">Deposit the annual fee to the ABTO account, then attach the slip. You may also renew in person at the ABTO office.</div>
          </div>
          <button className="btn" type="submit" style={{ width: "100%", justifyContent: "center" }}><span>Confirm Renewal</span></button>
        </form>
      </div>
    </div>
  );
}

function CertModal({ members }: { members: Member[] }) {
  const close = useCloseModal();
  const toast = useToast();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(e.currentTarget)) return;
    const company = new FormData(e.currentTarget).get("company") || "Your company";
    close();
    toast(`Certificate for ${company} is ready. Check your registered email for the download link.`);
  };

  return (
    <div>
      <div className="mhead"><div className="eyebrow">Download Certificate</div><h2 className="display-m">Retrieve your Membership Certificate</h2></div>
      <div className="mbody">
        <form onSubmit={onSubmit} noValidate>
          <div className="fgroup">
            <label>Registered company name <span className="req">*</span></label>
            <input name="company" required list="memberlist-cert" />
            <datalist id="memberlist-cert">{members.slice(0, 40).map((m) => <option key={m.id} value={m.name} />)}</datalist>
            <div className="errmsg">Enter your registered company name.</div>
          </div>
          <div className="fgroup"><label>Tour operation licence no. <span className="req">*</span></label><input name="licence" required placeholder="e.g. TO-2019-0142" /><div className="errmsg">Enter your licence number.</div></div>
          <p className="small" style={{ color: "var(--stone)" }}>Available once your current-year annual fee is confirmed. The certificate is issued for the membership year it covers.</p>
          <button className="btn" type="submit" style={{ width: "100%", justifyContent: "center" }}><span>Retrieve Certificate</span></button>
        </form>
      </div>
    </div>
  );
}

export default function RenewCertButtons({ members }: { members: Member[] }) {
  const openModal = useModal();
  return (
    <>
      <button className="btn btn-outline-dark" onClick={() => openModal(<RenewModal members={members} />)}><span>Renew Membership</span></button>
      <button className="btn btn-outline-dark" onClick={() => openModal(<CertModal members={members} />)}><span>Download Certificate</span></button>
    </>
  );
}
