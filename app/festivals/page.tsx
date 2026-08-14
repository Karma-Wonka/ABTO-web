import PageHead from "@/components/site/page-head";
import FestivalsList from "./festivals-list";

export const metadata = { title: "Festival Calendar" };

export default function FestivalsPage() {
  return (
    <div className="page on page-in">
      <PageHead
        crumb="Festival Calendar"
        title={<>Tshechu dates for<br />2025 and 2026</>}
        intro="Mask dance festivals across the dzongkhags. Dates are tentative until confirmed by the respective dzong. Always reconfirm with your operator before committing a group."
      />
      <section className="pad-s">
        <FestivalsList />
      </section>
    </div>
  );
}
