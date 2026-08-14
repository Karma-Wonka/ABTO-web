const LOCAL_PHOTOS = [
  { n: "punakha-twilight-lit", t: "Punakha Dzong", loc: "Punakha · Twilight" },
  { n: "memorial-chorten", t: "National Memorial Chorten", loc: "Thimphu · Dawn" },
  { n: "big-buddha", t: "Buddha Dordenma", loc: "Thimphu" },
  { n: "lhakhang-karpo", t: "Lhakhang Karpo", loc: "Haa Valley" },
  { n: "punakha-twilight", t: "Punakha Dzong", loc: "Punakha · Blue hour" },
  { n: "road-trees", t: "Mountain switchbacks", loc: "Central Bhutan" },
  { n: "red-car-bumthang", t: "The road east", loc: "Bumthang" },
  { n: "rbf-panel3-title", t: "Regenerative Bhutan Forum", loc: "Dungkar Dzong · 2025" },
  { n: "rbf-panel-discussion", t: "Panel discussion, RBF 2025", loc: "Dungkar Dzong" },
  { n: "rbf-keynote-audience", t: "Keynote address, RBF 2025", loc: "Dungkar Dzong" }
];

export default function FrameStrip() {
  const frames = [...LOCAL_PHOTOS, ...LOCAL_PHOTOS];

  return (
    <section className="pad-s paper" id="frames">
      <div className="wrap">
        <div className="rv" style={{ maxWidth: 660, marginBottom: "clamp(1.8rem,3.5vw,2.8rem)" }}>
          <div className="eyebrow">Bhutan, in Frames</div>
          <h2 className="display-m">The Kingdom our members show the world.</h2>
          <p className="lead" style={{ marginTop: "1rem" }}>
            Dzongs at twilight, monastery courtyards, and roads that thread the mountains, photographed across Bhutan
            by our member operators.
          </p>
        </div>
      </div>
      <div className="framestrip rv">
        <div className="frametrack">
          {frames.map((photo, i) => (
            <figure className="frame" key={`${photo.n}-${i}`}>
              <img src={`/img/${photo.n}.webp`} alt={photo.t} loading="lazy" decoding="async" />
              <figcaption>
                <b>{photo.t}</b>
                {photo.loc}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="wrap">
        <p className="small" style={{ color: "var(--stone)", marginTop: "1.3rem" }}>
          Photography courtesy of Original Bhutan Travels, an ABTO member{" "}
          <span className="hoverhint">· hover to pause</span>
          <span className="touchhint">· swipe to explore</span>
        </p>
      </div>
    </section>
  );
}
