"use client";

import { useState } from "react";
import {
  ACCOM_DEFS,
  ACTIVITY_DEFS,
  DESTINATIONS,
  FLIGHT_KG_PER_PAX_KM,
  FLIGHT_KM,
  FOOD_DEFS,
  ROAD_DEFS,
  ROAD_KG_PER_KM,
  ACCOM_KG_PER_NIGHT,
  FOOD_KG_PER_DAY,
  ACTIVITY_KG,
  accomKgHelper,
  defaultState,
  flightCityMatch,
  flightDistanceKm,
  loadState,
  saveState,
  totalKg,
  type Cabin,
  type Activity,
  type CalcState
} from "@/lib/carbon-calculator";
import Results from "./results";

function OptCard({
  active,
  icon,
  title,
  body,
  meta,
  onClick,
}: {
  active: boolean;
  icon: string;
  title: string;
  body: string;
  meta?: string;
  onClick: () => void;
}) {
  return (
    <button type="button" className={`cc-opt ${active ? "sel" : ""}`} onClick={onClick}>
      <span className="ic"><svg width={18} height={18} aria-hidden="true"><use href={`#${icon}`} /></svg></span>
      <h4>{title}</h4>
      <p>{body}</p>
      {meta && <span className="kg">{meta}</span>}
    </button>
  );
}

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="cc-progress" role="progressbar" aria-valuemin={1} aria-valuemax={5} aria-valuenow={step} aria-label={`Calculator step ${step} of 5`}>
      {[1, 2, 3, 4, 5].map((n) => <i key={n} className={n < step ? "done" : n === step ? "now" : ""} />)}
    </div>
  );
}

export default function CarbonCalculator() {
  const [state, setState] = useState<CalcState>(() => (typeof window === "undefined" ? defaultState() : loadState()));
  const [fading, setFading] = useState(false);

  const update = (patch: (s: CalcState) => CalcState) => {
    setState((prev) => {
      const next = patch(prev);
      saveState(next);
      return next;
    });
  };

  const advance = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const doAdvance = () => {
      update((s) => (s.step < 5 ? { ...s, step: s.step + 1 } : { ...s, done: true }));
      setFading(false);
    };
    if (reduced) { doAdvance(); return; }
    setFading(true);
    setTimeout(doAdvance, 220);
  };
  const back = () => update((s) => ({ ...s, step: Math.max(1, s.step - 1) }));
  const startOver = () => {
    const fresh = defaultState();
    saveState(fresh);
    setState(fresh);
  };

  return (
    <div className={`cc-shell ${fading ? "cc-fade-out" : ""}`} id="ccShell">
      {state.done ? (
        <Results state={state} onStartOver={startOver} />
      ) : (
        <>
          <div className="cc-livebar"><span>Running estimate</span><span><b>{Math.round(totalKg(state)).toLocaleString()}</b>kg CO&#8322;e</span></div>
          <ProgressBar step={state.step} />
          {state.step === 1 && (
            <div>
              <div className="cc-steplabel">Step 1 of 5</div>
              <h3 className="cc-steptitle">Your trip</h3>
              <div className="grid-2">
                <div className="fgroup">
                  <label>Travelling from</label>
                  <input list="ccOriginList" value={state.trip.origin} placeholder="e.g. Delhi, India" onChange={(e) => update((s) => ({ ...s, trip: { ...s.trip, origin: e.target.value } }))} />
                  <datalist id="ccOriginList">{Object.keys(FLIGHT_KM).map((c) => <option key={c} value={c} />)}</datalist>
                </div>
                <div className="fgroup">
                  <label>Where in Bhutan</label>
                  <select value={state.trip.destination} onChange={(e) => update((s) => ({ ...s, trip: { ...s.trip, destination: e.target.value } }))}>
                    {DESTINATIONS.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div className="fgroup">
                  <label>Number of travellers</label>
                  <input type="number" min={1} max={20} value={state.trip.travelers} onChange={(e) => update((s) => ({ ...s, trip: { ...s.trip, travelers: Math.max(1, Math.min(20, +e.target.value || 1)) } }))} />
                </div>
                <div className="fgroup">
                  <label>Trip length (nights)</label>
                  <input type="number" min={1} max={60} value={state.trip.nights} onChange={(e) => update((s) => ({ ...s, trip: { ...s.trip, nights: Math.max(1, Math.min(60, +e.target.value || 1)) } }))} />
                </div>
                <div className="fgroup">
                  <label>Season (optional)</label>
                  <select value={state.trip.season} onChange={(e) => update((s) => ({ ...s, trip: { ...s.trip, season: e.target.value } }))}>
                    <option value="">Not sure yet</option>
                    {["Spring", "Summer", "Autumn", "Winter"].map((x) => <option key={x}>{x}</option>)}
                  </select>
                </div>
              </div>
              <div className="cc-nav"><span /><button type="button" className="btn btn-sm" onClick={advance}><span>Next</span></button></div>
            </div>
          )}

          {state.step === 2 && (
            <div>
              <div className="cc-steplabel">Step 2 of 5</div>
              <h3 className="cc-steptitle">Getting there, and around</h3>
              <div className="fgroup">
                <label>Departure city</label>
                <input list="ccOriginList2" value={state.trip.origin} placeholder="e.g. Bangkok, Thailand" onChange={(e) => update((s) => ({ ...s, trip: { ...s.trip, origin: e.target.value } }))} />
                <datalist id="ccOriginList2">{Object.keys(FLIGHT_KM).map((c) => <option key={c} value={c} />)}</datalist>
                <div className="hint">
                  Approx. {flightDistanceKm(state.trip.origin).toLocaleString()} km to Paro
                  {flightCityMatch(state.trip.origin) ? "" : " (estimated — city not matched)"}
                </div>
              </div>
              <label className="checkline" style={{ margin: "1rem 0" }}>
                <input type="checkbox" checked={state.flight.roundTrip} onChange={(e) => update((s) => ({ ...s, flight: { ...s.flight, roundTrip: e.target.checked } }))} />
                <span>Round trip</span>
              </label>
              <div className="cc-opts">
                {(["economy", "premium", "business", "first"] as Cabin[]).map((c) => (
                  <OptCard
                    key={c}
                    active={state.flight.cabin === c}
                    icon="i-plane"
                    title={c[0].toUpperCase() + c.slice(1)}
                    body={c === "economy" ? "The lowest-impact cabin." : `${Math.round((FLIGHT_KG_PER_PAX_KM[c] / FLIGHT_KG_PER_PAX_KM.economy) * 100)}% of economy's emissions per seat.`}
                    onClick={() => update((s) => ({ ...s, flight: { ...s.flight, cabin: c } }))}
                  />
                ))}
              </div>
              <div className="cc-steplabel" style={{ marginTop: "1.8rem" }}>Local transport</div>
              <div className="cc-opts">
                {ROAD_DEFS.map((r) => (
                  <OptCard
                    key={r.v}
                    active={state.road.mode === r.v}
                    icon={r.icon}
                    title={r.t}
                    body={r.x}
                    meta={`${ROAD_KG_PER_KM[r.v]} kg/km per traveller`}
                    onClick={() => update((s) => ({ ...s, road: { ...s.road, mode: r.v } }))}
                  />
                ))}
              </div>
              <div className="fgroup" style={{ marginTop: "1.2rem" }}>
                <label>Estimated in-country driving distance (km)</label>
                <input type="number" min={0} max={3000} value={state.road.distanceKm} onChange={(e) => update((s) => ({ ...s, road: { ...s.road, distanceKm: Math.max(0, Math.min(3000, +e.target.value || 0)) } }))} />
                <div className="hint">A rough guide is 30–50 km per touring day; adjust if you know your route.</div>
              </div>
              <div className="cc-nav">
                <button type="button" className="btn btn-sm btn-outline-dark" onClick={back}><span>Back</span></button>
                <button type="button" className="btn btn-sm" onClick={advance}><span>Next</span></button>
              </div>
            </div>
          )}

          {state.step === 3 && (
            <div>
              <div className="cc-steplabel">Step 3 of 5</div>
              <h3 className="cc-steptitle">Where you&rsquo;ll stay</h3>
              <div className="cc-opts">
                {ACCOM_DEFS.map((a) => (
                  <OptCard
                    key={a.v}
                    active={state.accommodation.type === a.v}
                    icon={a.icon}
                    title={a.t}
                    body={a.x}
                    meta={`${ACCOM_KG_PER_NIGHT[a.v]} kg/night per traveller`}
                    onClick={() => update((s) => ({ ...s, accommodation: { ...s.accommodation, type: a.v } }))}
                  />
                ))}
              </div>
              <div className="fgroup" style={{ marginTop: "1.2rem" }}>
                <label>Number of nights</label>
                <input type="number" min={1} max={60} value={state.accommodation.nights} onChange={(e) => update((s) => ({ ...s, accommodation: { ...s.accommodation, nights: Math.max(1, Math.min(60, +e.target.value || 1)) } }))} />
              </div>
              <div className="hint" style={{ marginTop: "-.4rem" }}>
                Estimated accommodation footprint: <b>{Math.round(accomKgHelper(state)).toLocaleString()} kg CO&#8322;e</b>
              </div>
              <div className="cc-nav">
                <button type="button" className="btn btn-sm btn-outline-dark" onClick={back}><span>Back</span></button>
                <button type="button" className="btn btn-sm" onClick={advance}><span>Next</span></button>
              </div>
            </div>
          )}

          {state.step === 4 && (
            <div>
              <div className="cc-steplabel">Step 4 of 5</div>
              <h3 className="cc-steptitle">What you&rsquo;ll do</h3>
              <p className="hint" style={{ marginBottom: "1rem" }}>Select everything you&rsquo;re planning — you can pick more than one.</p>
              <div className="cc-opts">
                {ACTIVITY_DEFS.map((a) => {
                  const selected = state.activities.includes(a.v);
                  return (
                    <button
                      type="button"
                      key={a.v}
                      className={`cc-opt ${selected ? "sel" : ""}`}
                      aria-pressed={selected}
                      onClick={() => update((s) => ({
                        ...s,
                        activities: s.activities.includes(a.v) ? s.activities.filter((x) => x !== a.v) : [...s.activities, a.v]
                      }))}
                    >
                      <span className="ic"><svg width={18} height={18} aria-hidden="true"><use href={`#${a.icon}`} /></svg></span>
                      <h4>{a.t}</h4>
                      <p>{a.x}</p>
                      <span className="kg">~{ACTIVITY_KG[a.v as Activity]} kg per traveller</span>
                    </button>
                  );
                })}
              </div>
              <div className="cc-nav">
                <button type="button" className="btn btn-sm btn-outline-dark" onClick={back}><span>Back</span></button>
                <button type="button" className="btn btn-sm" onClick={advance}><span>Next</span></button>
              </div>
            </div>
          )}

          {state.step === 5 && (
            <div>
              <div className="cc-steplabel">Step 5 of 5</div>
              <h3 className="cc-steptitle">How you&rsquo;ll eat</h3>
              <div className="cc-opts">
                {FOOD_DEFS.map((f) => (
                  <OptCard
                    key={f.v}
                    active={state.food === f.v}
                    icon={f.icon}
                    title={f.t}
                    body={f.x}
                    meta={`${FOOD_KG_PER_DAY[f.v]} kg/day per traveller`}
                    onClick={() => update((s) => ({ ...s, food: f.v }))}
                  />
                ))}
              </div>
              <div className="cc-nav">
                <button type="button" className="btn btn-sm btn-outline-dark" onClick={back}><span>Back</span></button>
                <button type="button" className="btn btn-sm" onClick={advance}><span>See My Results</span></button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
