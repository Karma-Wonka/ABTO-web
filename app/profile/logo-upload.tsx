"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function LogoUpload({ memberId, hasLogo }: { memberId: number; hasLogo: boolean }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [version, setVersion] = useState(0); // busts the browser cache of the logo redirect

  const send = async (init: RequestInit) => {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/member-logo", init);
      const result = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(result.message || "Something went wrong. Try again.");
        return;
      }
      setVersion((v) => v + 1);
      router.refresh();
    } catch {
      setError("Upload failed. Check your connection.");
    } finally {
      setBusy(false);
    }
  };

  const onFile = (file: File) => {
    const body = new FormData();
    body.append("file", file);
    send({ method: "POST", body });
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "1.2rem", alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ width: 96, height: 96, border: "1px solid rgba(20,28,24,.12)", background: "#fff", display: "grid", placeItems: "center", overflow: "hidden" }}>
          {hasLogo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={`/api/member-logo/${memberId}?v=${version}`} alt="Your company logo" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
          ) : (
            <span style={{ fontSize: ".75rem", color: "var(--stone)" }}>No logo</span>
          )}
        </div>
        <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap" }}>
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onFile(f);
              e.target.value = "";
            }}
          />
          <button className="btn btn-sm" onClick={() => inputRef.current?.click()} disabled={busy}>
            <span>{busy ? "Working…" : hasLogo ? "Replace logo" : "Upload logo"}</span>
          </button>
          {hasLogo && (
            <button className="btn btn-sm btn-outline-dark" onClick={() => send({ method: "DELETE" })} disabled={busy}>
              <span>Remove</span>
            </button>
          )}
        </div>
      </div>
      <p className="small" style={{ color: "var(--stone)", marginTop: ".9rem" }}>
        PNG, JPEG or WEBP, up to 2MB. Shown next to your company in the Member Directory.
      </p>
      {error && <p className="small" role="alert" style={{ color: "var(--kemar)", marginTop: ".5rem" }}>{error}</p>}
    </div>
  );
}
