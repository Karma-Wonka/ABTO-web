"use client";

import { useState } from "react";
import { CLASSIFIEDS, REGIONS } from "@/data/site-data";
import { useModal, useCloseModal } from "@/components/site/modal";
import { useToast } from "@/components/site/toast";
import { validateForm } from "@/lib/validate";

const CATS = [...new Set(CLASSIFIEDS.map((c) => c.cat))];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fmtDate = (iso: string) => {
  const d = new Date(iso + "T00:00:00");
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
};

function PostAdModal() {
  const close = useCloseModal();
  const toast = useToast();
  const [attached, setAttached] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(e.currentTarget)) return;
    const title = new FormData(e.currentTarget).get("t");
    close();
    toast(`Listing submitted for review: ${title}`);
  };

  return (
    <div>
      <div className="mhead">
        <div className="eyebrow">Classifieds</div>
        <h2 className="display-m">Post a listing</h2>
        <p className="small" style={{ color: "var(--stone)", marginTop: ".7rem" }}>
          Listings run for sixty days and are visible to all members and site visitors.
        </p>
      </div>
      <div className="mbody">
        <form onSubmit={onSubmit} noValidate>
          <div className="fgroup"><label>Listing title <span className="req">*</span></label><input name="t" required placeholder="e.g. Toyota Hiace 2021, tourist-licensed" /><div className="errmsg">Give your listing a title.</div></div>
          <div className="frow">
            <div className="fgroup">
              <label>Category <span className="req">*</span></label>
              <select name="cat" required defaultValue="">
                <option value="">Select…</option>
                {CATS.map((c) => <option key={c}>{c}</option>)}
              </select>
              <div className="errmsg">Choose a category.</div>
            </div>
            <div className="fgroup"><label>Location</label><select name="loc" defaultValue={REGIONS[0]}>{REGIONS.map((r) => <option key={r}>{r}</option>)}</select></div>
          </div>
          <div className="frow">
            <div className="fgroup"><label>Price or rate</label><input name="price" placeholder="Amount, or 'Negotiable'" /></div>
            <div className="fgroup"><label>Your member company <span className="req">*</span></label><input name="by" required /><div className="errmsg">Enter your company name.</div></div>
          </div>
          <div className="fgroup"><label>Description <span className="req">*</span></label><textarea name="x" required placeholder="Condition, history, what is included, how to view" /><div className="errmsg">Add a description.</div></div>
          <div className="fgroup">
            <label>Photographs</label>
            <div className={`dropzone ${attached ? "on" : ""}`} tabIndex={0} role="button" onClick={() => setAttached(true)}>
              <div style={{ color: "var(--stone)" }}>Click to attach up to six images</div>
              <div className="fname">{attached ? "Attached: 3 images" : ""}</div>
            </div>
          </div>
          <button className="btn" type="submit" style={{ width: "100%", justifyContent: "center" }}><span>Submit for Review</span></button>
          <p className="small" style={{ color: "var(--stone)", marginTop: ".8rem" }}>Listings are checked by the secretariat before publication.</p>
        </form>
      </div>
    </div>
  );
}

export default function ClassifiedsList() {
  const [cat, setCat] = useState("");
  const openModal = useModal();
  const toast = useToast();
  const list = CLASSIFIEDS
    .filter((c) => !cat || c.cat === cat)
    .sort((a, b) => (b.feat ? 1 : 0) - (a.feat ? 1 : 0) || b.d.localeCompare(a.d));

  return (
    <div className="wrap">
      <div className="toolbar">
        <div className="chips">
          <button className={`chip ${cat === "" ? "on" : ""}`} onClick={() => setCat("")}>All</button>
          {CATS.map((c) => <button key={c} className={`chip ${cat === c ? "on" : ""}`} onClick={() => setCat(c)}>{c}</button>)}
        </div>
        <button className="btn btn-sm" style={{ marginLeft: "auto" }} onClick={() => openModal(<PostAdModal />)}>
          <span>Post a Listing</span>
        </button>
      </div>
      <div className="grid-3">
        {list.map((c) => (
          <article className={`clf ${c.feat ? "feat" : ""}`} key={c.t}>
            {c.feat && <span className="fbadge">Featured</span>}
            <span className="tag t-blue">{c.cat}</span>
            <h4>{c.t}</h4>
            <p style={{ fontSize: ".87rem", color: "#57625B" }}>{c.x}</p>
            <div className="price">{c.price}</div>
            <div style={{ fontSize: ".78rem", color: "var(--stone)", display: "flex", justifyContent: "space-between", gap: ".6rem", paddingTop: ".6rem", borderTop: "1px solid rgba(20,28,24,.08)" }}>
              <span>{c.loc} · {c.by}</span><span>{fmtDate(c.d)}</span>
            </div>
            <button className="btn btn-sm btn-outline-dark" onClick={() => toast(`Your message has been forwarded to ${c.by}.`)}>
              <span>Contact Advertiser</span>
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
