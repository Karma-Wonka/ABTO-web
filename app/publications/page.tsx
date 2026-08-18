import PageHead from "@/components/site/page-head";
import RidgeSvg from "@/components/site/ridge-svg";
import { getLiveData } from "@/lib/live-data";

export const metadata = { title: "Publications" };
export const revalidate = 60;

export default async function PublicationsPage() {
  const { publications } = await getLiveData();

  return (
    <div className="page on page-in">
      <PageHead
        crumb="Publications"
        title={<>What the association<br />publishes</>}
        intro="Annual reporting, statistical review, handbooks and field references produced by ABTO and its partners."
      />
      <section className="pad-s">
        <div className="wrap">
          <div className="grid-3">
            {publications.map((p, i) => (
              <article className="card" key={p.t} style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ height: 170, position: "relative" }}>
                  <RidgeSvg id={`pb${i}`} height={170} />
                  <span className="tag" style={{ position: "absolute", top: ".8rem", left: ".8rem", color: "var(--gold-pale)", background: "rgba(20,28,24,.55)" }}>{p.type}</span>
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <span className="num">{p.yr}</span><h3>{p.t}</h3><p style={{ fontSize: ".87rem" }}>{p.x}</p>
                  {p.url ? (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-dark" style={{ marginTop: "1rem" }}><span>Download</span></a>
                  ) : (
                    <button className="btn btn-sm btn-outline-dark" style={{ marginTop: "1rem" }} disabled title="Not yet uploaded"><span>Download</span></button>
                  )}
                </div>
              </article>
            ))}
          </div>
          {publications.length === 0 && <p style={{ color: "var(--stone)" }}>No publications have been added yet.</p>}
        </div>
      </section>
    </div>
  );
}
