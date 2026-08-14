import Link from "next/link";
import { DESTS } from "@/data/site-data";

const DEST_LOCAL: Record<string, string> = {
  Thimphu: "big-buddha",
  Punakha: "punakha-twilight-lit",
  Bumthang: "red-car-bumthang",
  "Haa Valley": "lhakhang-karpo"
};

function ridgeSVG(id: string) {
  return (
    <svg viewBox="0 0 400 132" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id={`rg${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2C5243" /><stop offset="1" stopColor="#132119" />
        </linearGradient>
      </defs>
      <rect width="400" height="132" fill={`url(#rg${id})`} />
      <path d="M0,73 L67,53 L133,74 L207,48 L280,77 L347,56 L400,71 L400,132 L0,132 Z" fill="#1B3227" opacity=".85" />
    </svg>
  );
}

export default function TravelSection() {
  return (
    <section className="pad paper" id="travelSec">
      <div className="wrap">
        <div className="rv" style={{ maxWidth: 700, marginBottom: "clamp(2.2rem,4vw,3.2rem)" }}>
          <div className="eyebrow">Travel Information</div>
          <h2 className="display-l">Getting to Bhutan, and getting around it.</h2>
          <p className="lead" style={{ marginTop: "1.3rem" }}>
            Paro International Airport is served by two carriers. Overland entry is possible at Phuentsholing,
            Gelephu and Samdrup Jongkhar.
          </p>
        </div>
        <div className="grid-2" style={{ marginBottom: "1.6rem" }}>
          <Link href="/travel#drukair" className="card rv" style={{ display: "flex", gap: "1.4rem", alignItems: "flex-start" }}>
            <span style={{ color: "var(--kemar)", flex: "none", marginTop: 4 }}>
              <svg width="26" height="26" aria-hidden="true"><use href="#i-plane" /></svg>
            </span>
            <span>
              <span className="num">National Carrier</span>
              <h3>Druk Air, Royal Bhutan Airlines</h3>
              <p>
                Bhutan&rsquo;s flag carrier, operating from Paro to Delhi, Kathmandu, Bangkok, Singapore, Dhaka,
                Kolkata, Guwahati, Bagdogra and Gaya. Domestic service to Bumthang, Gelephu and Yonphula.
              </p>
            </span>
          </Link>
          <Link href="/travel#tashiair" className="card rv" style={{ display: "flex", gap: "1.4rem", alignItems: "flex-start" }}>
            <span style={{ color: "var(--kemar)", flex: "none", marginTop: 4 }}>
              <svg width="26" height="26" aria-hidden="true"><use href="#i-plane" /></svg>
            </span>
            <span>
              <span className="num">Private Carrier</span>
              <h3>Bhutan Airlines, Tashi Air</h3>
              <p>
                Bhutan&rsquo;s first private international airline, connecting Paro with Bangkok, Kathmandu, Delhi
                and Kolkata. Schedules are seasonal, confirm with your operator.
              </p>
            </span>
          </Link>
        </div>
        <div className="grid-4" style={{ marginBottom: "1.6rem" }}>
          {DESTS.slice(0, 4).map((d, i) => (
            <Link href="/travel#places" key={d.t} className="card rv" style={{ padding: 0, overflow: "hidden" }}>
              <span style={{ display: "block", height: 132, position: "relative" }}>
                {ridgeSVG(`d${i}`)}
                {DEST_LOCAL[d.t] && (
                  <img
                    src={`/img/${DEST_LOCAL[d.t]}.webp`}
                    alt={`${d.t}, Bhutan`}
                    loading="lazy"
                    decoding="async"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />
                )}
              </span>
              <span style={{ display: "block", padding: "1.2rem" }}>
                <span className="tag t-green" style={{ marginBottom: ".6rem" }}>{d.tag}</span>
                <h3 style={{ fontSize: "1.28rem", margin: ".5rem 0 .4rem" }}>{d.t}</h3>
                <p style={{ fontSize: ".85rem" }}>{d.x}</p>
              </span>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: "2rem" }} className="rv">
          <Link href="/travel" className="txtlink">
            Full travel resource centre <svg className="arw" width="16" height="12" aria-hidden="true"><use href="#i-arw" /></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
