import Link from "next/link";
import PageHead from "@/components/site/page-head";
import { BOARD, SECRETARIAT, type BoardMember } from "@/data/site-data";

export const metadata = { title: "Board of Directors" };

function BoardCard({ member, accent }: { member: BoardMember; accent: string }) {
  return (
    <article className="card">
      <span style={{ width: 52, height: 52, background: accent, color: accent === "var(--kemar)" ? "var(--ivory)" : "var(--gold-pale)", display: "grid", placeItems: "center", marginBottom: "1.1rem" }}>
        <svg width="26" height="26" aria-hidden="true"><use href="#i-user" /></svg>
      </span>
      <h3 style={{ fontSize: "1.25rem" }}>{member.r}</h3>
      <p style={{ fontSize: ".87rem" }}>{member.x}</p>
      <p style={{ fontSize: ".8rem", color: "var(--stone)", marginTop: ".6rem", lineHeight: 1.6 }}>
        {member.email}<br />{member.phone}
      </p>
    </article>
  );
}

export default function BoardPage() {
  return (
    <div className="page on page-in">
      <PageHead
        crumb="Board of Directors"
        title={<>How the association<br />is governed</>}
        intro="ABTO is guided by a Board elected by the membership at the Annual General Meeting and headed operationally by an Executive Director."
      />
      <section className="pad-s">
        <div className="wrap">
          <div className="grid-4">
            {BOARD.map((b) => <BoardCard key={b.r} member={b} accent="var(--forest)" />)}
          </div>
          <p className="small" style={{ color: "var(--stone)", marginTop: "1.4rem" }}>
            Board members are elected by the membership at the Annual General Meeting for a three-year term.
          </p>
          <div className="eyebrow" style={{ marginTop: "clamp(2.6rem,5vw,4rem)" }}>Secretariat Staff</div>
          <div className="grid-4" style={{ marginTop: "1rem" }}>
            {SECRETARIAT.map((b) => <BoardCard key={b.r} member={b} accent="var(--kemar)" />)}
          </div>
          <div className="card" style={{ marginTop: "clamp(2.6rem,5vw,4rem)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1.2rem", flexWrap: "wrap" }}>
            <div>
              <span className="num">Organogram</span>
              <h3 style={{ marginBottom: ".3rem" }}>Structure of the association</h3>
              <p style={{ fontSize: ".9rem", color: "#5A655E", margin: 0 }}>How the Board, Executive Director and secretariat departments fit together.</p>
            </div>
            <Link href="/organogram" className="btn btn-sm btn-outline-dark" style={{ flex: "none" }}>
              <span>View Organogram</span>
              <svg className="arw" width="16" height="12" aria-hidden="true"><use href="#i-arw" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
