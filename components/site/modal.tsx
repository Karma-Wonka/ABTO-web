"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

type ModalContextValue = (content: React.ReactNode) => void;

const ModalContext = createContext<ModalContextValue>(() => {});

export function useModal() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<React.ReactNode>(null);
  const [open, setOpen] = useState(false);
  const lastFocus = useRef<HTMLElement | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const openModal = useCallback((node: React.ReactNode) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setContent(node);
    setOpen(true);
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      const f = boxRef.current?.querySelector<HTMLElement>("input,select,textarea,button:not(.mclose)");
      f?.focus();
    }, 120);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = "";
    lastFocus.current?.focus();
  }, []);

  return (
    <ModalContext.Provider value={openModal}>
      {children}
      <div
        id="modal"
        className={open ? "on" : ""}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <div className="mbox" ref={boxRef}>
          <button className="mclose" aria-label="Close" onClick={closeModal}>
            <svg width="18" height="18"><use href="#i-x" /></svg>
          </button>
          <CloseModalContext.Provider value={closeModal}>{content}</CloseModalContext.Provider>
        </div>
      </div>
    </ModalContext.Provider>
  );
}

const CloseModalContext = createContext<() => void>(() => {});
export function useCloseModal() {
  return useContext(CloseModalContext);
}
