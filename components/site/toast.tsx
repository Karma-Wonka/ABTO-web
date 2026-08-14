"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

const ToastContext = createContext<(msg: string) => void>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback((msg: string) => {
    setMessage(msg);
    setOpen(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(false), 4200);
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div id="toast" className={open ? "on" : ""} role="status" aria-live="polite">
        <svg width="16" height="16" style={{ color: "var(--gold)", flex: "none" }} aria-hidden="true">
          <use href="#i-check" />
        </svg>
        <span>{message}</span>
      </div>
    </ToastContext.Provider>
  );
}
