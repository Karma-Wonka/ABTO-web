"use client";

import { useState } from "react";
import Link from "next/link";
import { useModal, useCloseModal } from "@/components/site/modal";
import { useToast } from "@/components/site/toast";
import { validateForm } from "@/lib/validate";
import type { LiveData } from "@/lib/live-data";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function normalizeDetailHref(detail?: string) {
  if (!detail) return null;
  return detail.startsWith("#") ? detail.slice(1) : detail;
}

function RegisterModal({ title, event }: { title: string; event?: LiveData["events"][number] }) {
  const close = useCloseModal();
  const toast = useToast();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(e.currentTarget)) return;
    close();
    toast(`Registered for ${title}. A confirmation has been emailed to you.`);
  };

  return (
    <div>
      <div className="mhead">
        <div className="eyebrow">Event Registration</div>
        <h2 className="display-m">{title}</h2>
        {event && <p className="small" style={{ color: "var(--stone)", marginTop: ".8rem" }}>{event.d} · {event.loc}</p>}
      </div>
      <div className="mbody">
        <form onSubmit={onSubmit} noValidate>
          <div className="frow">
            <div className="fgroup"><label>Member company <span className="req">*</span></label><input name="company" required /><div className="errmsg">Enter your company name.</div></div>
            <div className="fgroup"><label>Attendee name <span className="req">*</span></label><input name="who" required /><div className="errmsg">Enter the attendee&rsquo;s name.</div></div>
          </div>
          <div className="frow">
            <div className="fgroup"><label>Email <span className="req">*</span></label><input type="email" name="email" required /><div className="errmsg">Enter a valid email.</div></div>
            <div className="fgroup"><label>Mobile</label><input name="mobile" placeholder="+975 17 000000" /></div>
          </div>
          <div className="fgroup"><label>Notes for the organiser</label><textarea name="notes" placeholder="Dietary requirements, accessibility needs, anything else" /></div>
          <div className="fgroup">
            <label className="checkline"><input type="checkbox" name="ok" required /><span>I confirm this registration on behalf of a member operator in good standing.</span></label>
            <div className="errmsg">Please confirm to register.</div>
          </div>
          <button className="btn" type="submit" style={{ width: "100%", justifyContent: "center" }}><span>Confirm Registration</span></button>
        </form>
      </div>
    </div>
  );
}

function GalleryModal({ title }: { title: string }) {
  const close = useCloseModal();
  return (
    <div className="mbody" style={{ padding: "2rem" }}>
      <div className="eyebrow">Event Gallery</div>
      <h2 className="display-m">{title}</h2>
      <p style={{ color: "var(--stone)", marginTop: "1rem" }}>Photos from this event will appear here once the gallery is populated.</p>
      <button className="btn btn-sm btn-outline-dark" onClick={close} style={{ marginTop: "1rem" }}><span>Close</span></button>
    </div>
  );
}

export default function EventsList({ events }: { events: LiveData["events"] }) {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const openModal = useModal();
  const list = events
    .filter((e) => (tab === "upcoming" ? !e.past : e.past))
    .sort((a, b) => (tab === "upcoming" ? a.d.localeCompare(b.d) : b.d.localeCompare(a.d)));

  return (
    <div className="wrap">
      <div className="chips" style={{ marginBottom: "1.8rem" }}>
        <button className={`chip ${tab === "upcoming" ? "on" : ""}`} onClick={() => setTab("upcoming")}>Upcoming</button>
        <button className={`chip ${tab === "past" ? "on" : ""}`} onClick={() => setTab("past")}>Past events</button>
      </div>
      <div>
        {list.map((e) => {
          const d = new Date(e.d + "T00:00:00");
          const detailHref = normalizeDetailHref(e.detail);
          return (
            <article className="ev" key={e.t}>
              <div className="evdate"><b>{d.getDate()}</b><span>{MONTHS[d.getMonth()]} {d.getFullYear()}</span></div>
              <div>
                <h4>{e.t}</h4>
                <p style={{ fontSize: ".9rem", color: "#57625B", marginBottom: ".5rem", maxWidth: "62ch" }}>{e.x}</p>
                <div className="evmeta">
                  <span><svg width="14" height="16" style={{ verticalAlign: "-3px", color: "var(--kemar)" }} aria-hidden="true"><use href="#i-pin" /></svg> {e.loc}</span>
                  <span>{e.type}</span>
                  <span>Capacity {e.cap}</span>
                </div>
              </div>
              <div className="evact" style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
                {detailHref && <Link href={detailHref} className="btn btn-sm btn-outline-dark"><span>Learn More</span></Link>}
                {e.past ? (
                  <button className="btn btn-sm btn-outline-dark" onClick={() => openModal(<GalleryModal title={e.t} />)}>
                    <span>View Gallery</span>
                  </button>
                ) : (
                  <button className="btn btn-sm" onClick={() => openModal(<RegisterModal title={e.t} event={e} />)}>
                    <span>Register</span>
                  </button>
                )}
              </div>
            </article>
          );
        })}
        {list.length === 0 && <p style={{ padding: "2rem 0", color: "var(--stone)" }}>No {tab} events right now.</p>}
      </div>
    </div>
  );
}
