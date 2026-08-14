"use client";

import { useEffect, useRef } from "react";
import {
  breakdown,
  comparisons,
  offset as calcOffset,
  rating,
  recommendations,
  type CalcState
} from "@/lib/carbon-calculator";
import Counter from "@/components/site/counter";
import { useModal, useCloseModal } from "@/components/site/modal";
import { useToast } from "@/components/site/toast";
import { validateForm } from "@/lib/validate";

function RingSvg({ total }: { total: number }) {
  const rawPct = (total / 650) * 100;
  const fillPct = Math.max(4, Math.min(100, rawPct));
  const labelPct = Math.round(rawPct);
  const r = 54;
  const c = 2 * Math.PI * r;
  const ref = useRef<SVGCircleElement>(null);
  const targetOffset = c * (1 - fillPct / 100);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    void el.getBoundingClientRect();
    el.style.strokeDashoffset = String(targetOffset);
  }, [targetOffset]);

  return (
    <svg width={140} height={140} viewBox="0 0 140 140" role="img" aria-label={`${labelPct} percent of a typical week-long Bhutan trip's footprint`}>
      <circle cx={70} cy={70} r={r} fill="none" stroke="rgba(20,28,24,.1)" strokeWidth={10} />
      <circle
        ref={ref}
        className="cc-ring-fg"
        cx={70}
        cy={70}
        r={r}
        fill="none"
        stroke="var(--kemar)"
        strokeWidth={10}
        strokeLinecap="round"
        strokeDasharray={c.toFixed(2)}
        strokeDashoffset={c.toFixed(2)}
        transform="rotate(-90 70 70)"
      />
      <text x={70} y={66} textAnchor="middle" fontSize={labelPct >= 1000 ? 15 : labelPct >= 100 ? 18 : 22} fill="var(--ink)" style={{ fontFamily: "var(--f-display)" }}>{labelPct}%</text>
      <text x={70} y={84} textAnchor="middle" fontSize={7.5} letterSpacing={1} fill="var(--stone)" style={{ fontFamily: "var(--f-util)" }}>OF TYPICAL TRIP</text>
    </svg>
  );
}

function DonutSvg({ segs, total }: { segs: { label: string; kg: number; color: string }[]; total: number }) {
  const r = 58;
  const c = 2 * Math.PI * r;
  const arcs = segs.reduce<{ label: string; kg: number; color: string; len: number; rotation: number }[]>((acc, sg) => {
    const cumulative = acc.reduce((sum, prev) => sum + prev.kg, 0);
    const frac = total > 0 ? sg.kg / total : 0;
    const len = frac * c;
    const rotation = -90 + (cumulative / (total || 1)) * 360;
    return [...acc, { ...sg, len, rotation }];
  }, []);

  return (
    <svg width={150} height={150} viewBox="0 0 150 150" role="img" aria-label="Emissions breakdown by category">
      {arcs.map((sg) => (
        <circle
          key={sg.label}
          className="cc-donut-seg"
          cx={75}
          cy={75}
          r={r}
          fill="none"
          stroke={sg.color}
          strokeWidth={16}
          strokeDasharray={`${sg.len.toFixed(2)} ${(c - sg.len).toFixed(2)}`}
          strokeDashoffset={0}
          transform={`rotate(${sg.rotation.toFixed(2)} 75 75)`}
        />
      ))}
    </svg>
  );
}

function OffsetModal({ kg }: { kg: number }) {
  const close = useCloseModal();
  const toast = useToast();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(e.currentTarget)) return;
    close();
    toast("Thanks — the secretariat will email verified offset options shortly.");
  };
  return (
    <div>
      <div className="mhead"><div className="eyebrow">Carbon Offset</div><h2 className="display-m">Offset this trip</h2></div>
      <div className="mbody">
        <p style={{ color: "var(--stone)", marginBottom: "1.2rem" }}>
          Register your interest and the ABTO secretariat will follow up with verified offset options matched to
          your {Math.round(kg).toLocaleString()} kg CO&#8322;e recommended offset.
        </p>
        <form onSubmit={onSubmit} noValidate>
          <div className="fgroup"><label>Full name <span className="req">*</span></label><input name="name" required /><div className="errmsg">Enter your name.</div></div>
          <div className="fgroup"><label>Email <span className="req">*</span></label><input type="email" name="email" required /><div className="errmsg">Enter a valid email.</div></div>
          <button className="btn" type="submit" style={{ width: "100%", justifyContent: "center" }}><span>Request Offset Options</span></button>
        </form>
      </div>
    </div>
  );
}

export default function Results({ state, onStartOver }: { state: CalcState; onStartOver: () => void }) {
  const openModal = useModal();
  const b = breakdown(state);
  const total = b.flights + b.transport + b.accommodation + b.activities + b.food;
  const perTraveler = total / Math.max(1, state.trip.travelers);
  const grade = rating(perTraveler);
  const cmp = comparisons(total);
  const off = calcOffset(total);
  const recos = recommendations(state);
  const segs = [
    { label: "Flights", kg: b.flights, color: "var(--kemar)" },
    { label: "Accommodation", kg: b.accommodation, color: "var(--gold)" },
    { label: "Food", kg: b.food, color: "var(--forest-mid)" },
    { label: "Local Transport", kg: b.transport, color: "var(--stone-light)" },
    { label: "Activities", kg: b.activities, color: "var(--forest)" }
  ];

  return (
    <div>
      <div className="cc-hero">
        <div className="eyebrow">Your Estimated Footprint</div>
        <div className="kg"><Counter target={Math.round(total)} /><small> kg CO&#8322;e</small></div>
        <p className="lead" style={{ maxWidth: "56ch", margin: ".8rem auto 0" }}>
          for {state.trip.travelers} traveller{state.trip.travelers > 1 ? "s" : ""} over {state.trip.nights} night{state.trip.nights > 1 ? "s" : ""} in
          Bhutan — about {Math.round(perTraveler).toLocaleString()} kg CO&#8322;e each.
        </p>
        <div className={`cc-rating cc-rating--${grade.tone}`}>{grade.grade}</div>
      </div>
      <div className="cc-ring-wrap"><RingSvg total={total} /></div>
      <div className="cc-donut-wrap">
        <DonutSvg segs={segs} total={total} />
        <div className="cc-legend">
          {segs.map((sg) => (
            <div key={sg.label}><span className="sw" style={{ background: sg.color }} />{sg.label} — {Math.round(sg.kg).toLocaleString()} kg</div>
          ))}
        </div>
      </div>

      <div className="eyebrow" style={{ marginTop: "2.4rem" }}>What That&rsquo;s Roughly Equal To</div>
      <div className="grid-4 cc-compare-grid">
        <article className="card"><span className="ic"><svg width="22" height="22" aria-hidden="true"><use href="#i-leaf" /></svg></span><div className="cc-cmpval"><Counter target={Math.ceil(cmp.trees)} /></div><p>Trees needed for a year to absorb this</p></article>
        <article className="card"><span className="ic"><svg width="22" height="22" aria-hidden="true"><use href="#i-car" /></svg></span><div className="cc-cmpval"><Counter target={Math.round(cmp.carKm)} /></div><p>Km driven in an average petrol car</p></article>
        <article className="card"><span className="ic"><svg width="22" height="22" aria-hidden="true"><use href="#i-bolt" /></svg></span><div className="cc-cmpval"><Counter target={Math.round(cmp.elecKwh)} /></div><p>kWh of household electricity</p></article>
        <article className="card"><span className="ic"><svg width="22" height="22" aria-hidden="true"><use href="#i-phone" /></svg></span><div className="cc-cmpval"><Counter target={Math.round(cmp.phoneCharges)} /></div><p>Smartphone charges</p></article>
      </div>

      <div className="eyebrow" style={{ marginTop: "2.4rem" }}>Ways To Lower It</div>
      <div className="grid-2 cc-reco-grid">
        {recos.map((r) => (
          <article className="card" key={r.t} style={r.gnh ? { background: "var(--forest)", color: "var(--ivory)" } : undefined}>
            <h3 style={{ fontSize: "1.05rem" }}>{r.t}</h3>
            <p style={r.gnh ? { color: "rgba(246,242,233,.75)" } : undefined}>{r.x}</p>
          </article>
        ))}
      </div>

      <div className="cc-offset">
        <div className="eyebrow on-dark">Carbon Offset</div>
        <h3 className="display-m" style={{ color: "var(--ivory)", margin: ".4rem 0 1.4rem" }}>Offset this trip</h3>
        <div className="grid-3" style={{ marginBottom: "1.6rem" }}>
          <div><div className="cc-offstat">{Math.round(total).toLocaleString()} kg</div><span>Estimated footprint</span></div>
          <div><div className="cc-offstat">{Math.round(off.kg).toLocaleString()} kg</div><span>Recommended offset</span></div>
          <div><div className="cc-offstat">~${off.costUsd.toFixed(0)}</div><span>Estimated cost</span></div>
        </div>
        <button type="button" className="btn btn-gold" onClick={() => openModal(<OffsetModal kg={off.kg} />)}><span>Offset My Trip</span></button>
      </div>
      <div style={{ marginTop: "1.6rem", textAlign: "center" }}>
        <button type="button" className="txtlink" onClick={onStartOver} style={{ background: "none", border: 0, cursor: "pointer" }}>
          Start over <svg className="arw" width="16" height="12" aria-hidden="true"><use href="#i-arw" /></svg>
        </button>
      </div>
    </div>
  );
}
