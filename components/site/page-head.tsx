import Link from "next/link";

export default function PageHead({
  crumb,
  title,
  intro,
  extra,
}: {
  crumb: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  extra?: React.ReactNode;
}) {
  return (
    <>
      <section id="pageHead" className="deep">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link> &nbsp;/&nbsp; {crumb}
          </div>
          <h1 className="display-l" style={{ maxWidth: "16ch" }}>{title}</h1>
          {intro && <p className="lead" style={{ maxWidth: "64ch", marginTop: "1.4rem" }}>{intro}</p>}
          {extra}
        </div>
      </section>
      <div className="kemar-rule" />
    </>
  );
}
