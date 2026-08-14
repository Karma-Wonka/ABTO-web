import PageHead from "@/components/site/page-head";
import PolicyList from "./policy-list";

export const metadata = { title: "Policy & Regulations" };

export default function PolicyPage() {
  return (
    <div className="page on page-in">
      <PageHead
        crumb="Policy & Regulations"
        title={<>The rules that govern<br />the industry</>}
        intro="Acts, rules, notifications and standards affecting tour operations in Bhutan. Search, filter and download."
      />
      <section className="pad-s">
        <PolicyList />
      </section>
    </div>
  );
}
