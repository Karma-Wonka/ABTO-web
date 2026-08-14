import Reveal from "@/components/site/rv";
import Counter from "@/components/site/counter";

export default function Stats({ memberCount }: { memberCount: number }) {
  const years = new Date().getFullYear() - 2000;

  return (
    <section className="dark pad-s" id="numbers">
      <div className="wrap">
        <Reveal style={{ maxWidth: 640, marginBottom: "clamp(2rem,4vw,3.2rem)" }}>
          <div className="eyebrow on-dark">Bhutan Through Tourism</div>
          <h2 className="display-m">A high-value, low-volume model, measured in more than arrivals.</h2>
        </Reveal>
        <Reveal as="div" className="stats">
          <div className="stat">
            <Counter target={memberCount} />
            <span>Licensed Members</span>
            <small>Tour operators in good standing across all twenty dzongkhags</small>
          </div>
          <div className="stat">
            <Counter target={years} />
            <span>Years of Service</span>
            <small>Continuously representing the industry since March 2000</small>
          </div>
          <div className="stat">
            <Counter target={20} />
            <span>Dzongkhags Served</span>
            <small>Every district in the Kingdom reachable through our members</small>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
