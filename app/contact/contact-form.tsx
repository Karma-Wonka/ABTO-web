"use client";

import { useRef, useState } from "react";
import { useToast } from "@/components/site/toast";
import { validateForm } from "@/lib/validate";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(e.currentTarget)) {
      toast("Please complete the highlighted fields.");
      return;
    }

    const data = new FormData(e.currentTarget);
    setSubmitting(true);
    try {
      const res = await fetch("/api/membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "contact",
          name: String(data.get("name") || ""),
          email: String(data.get("email") || ""),
          company: String(data.get("org") || ""),
          message: String(data.get("msg") || ""),
          payload: { subject: String(data.get("subject") || "") }
        })
      });
      const result = await res.json().catch(() => ({ success: false, message: "" }));
      if (!res.ok || !result.success) {
        toast(result.message || "Unable to send your message. Please try again.");
        return;
      }
      formRef.current?.reset();
      toast("Message sent. The secretariat will respond within two working days.");
    } catch {
      toast("Unable to reach the server. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate>
      <div className="frow">
        <div className="fgroup"><label>Your name <span className="req">*</span></label><input name="name" required /><div className="errmsg">Please enter your name.</div></div>
        <div className="fgroup"><label>Email <span className="req">*</span></label><input type="email" name="email" required /><div className="errmsg">Please enter a valid email.</div></div>
      </div>
      <div className="frow">
        <div className="fgroup"><label>Organisation</label><input name="org" /></div>
        <div className="fgroup">
          <label>Subject <span className="req">*</span></label>
          <select name="subject" required defaultValue="">
            <option value="">Select…</option>
            <option>Membership enquiry</option>
            <option>Training and certification</option>
            <option>Policy and regulation</option>
            <option>Classifieds</option>
            <option>Media and press</option>
            <option>Partnership</option>
            <option>Other</option>
          </select>
          <div className="errmsg">Choose a subject.</div>
        </div>
      </div>
      <div className="fgroup"><label>Message <span className="req">*</span></label><textarea name="msg" required /><div className="errmsg">Please write your message.</div></div>
      <button className="btn" type="submit" disabled={submitting}>
        <span>{submitting ? "Sending…" : "Send Message"}</span>
        <svg className="arw" width="16" height="12" aria-hidden="true"><use href="#i-arw" /></svg>
      </button>
    </form>
  );
}
