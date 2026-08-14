"use client";

import { useState } from "react";

export default function Accordion({ items }: { items: [string, string][] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      {items.map(([question, answer], i) => (
        <div className={`acc ${open === i ? "open" : ""}`} key={question}>
          <button onClick={() => setOpen(open === i ? null : i)}>
            {question}
            <span className="plus" />
          </button>
          <div className="abody">
            <div>{answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
