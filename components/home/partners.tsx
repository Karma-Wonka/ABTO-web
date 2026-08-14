import { PARTNERS } from "@/data/site-data";

export default function Partners() {
  const track = [...PARTNERS, ...PARTNERS];

  return (
    <section className="dark pad-s">
      <div className="wrap" style={{ textAlign: "center", marginBottom: ".6rem" }}>
        <div className="eyebrow on-dark no-rule rv" style={{ justifyContent: "center" }}>Working With</div>
      </div>
      <div className="marquee">
        <div className="mtrack">
          {track.map((p, i) => (
            <span className="plogo" key={`${p}-${i}`}>{p}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
