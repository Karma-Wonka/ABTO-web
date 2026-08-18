import PageHead from "@/components/site/page-head";
import { getLiveData } from "@/lib/live-data";

export const metadata = { title: "Downloads" };
export const revalidate = 60;

export default async function DownloadsPage() {
  const { downloads } = await getLiveData();
  const cats = [...new Set(downloads.map((d) => d.cat))];

  return (
    <div className="page on page-in">
      <PageHead
        crumb="Downloads"
        title={<>Forms, templates<br />and assets</>}
        intro="Registration forms, operating templates and association documents for member use."
      />
      <section className="pad-s">
        <div className="wrap">
          {cats.map((cat) => (
            <div key={cat} style={{ marginBottom: "2.4rem" }}>
              <div className="eyebrow">{cat}</div>
              {downloads.filter((d) => d.cat === cat).map((d) => (
                <div className="doc" key={d.t}>
                  <span className="dicon" style={{ color: "var(--kemar)" }}><svg width="30" height="38" aria-hidden="true"><use href="#i-doc" /></svg></span>
                  <div className="dinfo"><h5>{d.t}</h5><div className="dm"><span>{d.type} · {d.size}</span></div></div>
                  <div className="dact">
                    {d.url ? (
                      <a href={d.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm"><span>Download</span></a>
                    ) : (
                      <button className="btn btn-sm" disabled title="Not yet uploaded"><span>Download</span></button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
          {downloads.length === 0 && <p style={{ color: "var(--stone)" }}>No downloads have been published yet.</p>}
        </div>
      </section>
    </div>
  );
}
