"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/site/toast";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const result = await res.json().catch(() => ({ success: false, message: "" }));
      if (!res.ok || !result.success) {
        toast(result.message || "Incorrect email or password.");
        return;
      }
      const next = searchParams.get("next") || "/";
      router.push(next);
      router.refresh();
    } catch {
      toast("Unable to reach the server. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate style={{ maxWidth: 440 }}>
      <div className="fgroup">
        <label>Email <span className="req">*</span></label>
        <input
          type="email"
          required
          autoComplete="email"
          placeholder="office@yourcompany.bt"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="fgroup">
        <label>Password <span className="req">*</span></label>
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
      </div>
      <button type="submit" className="btn" disabled={submitting} style={{ width: "100%", justifyContent: "center", marginTop: ".6rem" }}>
        <span>{submitting ? "Signing in…" : "Sign In"}</span>
      </button>
      <p className="small" style={{ color: "#5A655E", marginTop: "1.4rem", textAlign: "center" }}>
        Not a member yet? <Link href="/membership#apply">Apply for membership</Link>
      </p>
    </form>
  );
}
