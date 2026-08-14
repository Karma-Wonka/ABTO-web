import PageHead from "@/components/site/page-head";
import ClassifiedsList from "./classifieds-list";

export const metadata = { title: "ABTO Classifieds" };

export default function ClassifiedsPage() {
  return (
    <div className="page on page-in">
      <PageHead
        crumb="ABTO Classifieds"
        title={<>Trade notices across<br />the membership</>}
        intro="Vehicles, equipment, staff, property and partnership opportunities. Listings are posted by member operators and run for sixty days."
      />
      <section className="pad-s">
        <ClassifiedsList />
      </section>
    </div>
  );
}
