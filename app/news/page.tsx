import PageHead from "@/components/site/page-head";
import { getLiveData } from "@/lib/live-data";
import NewsList from "./news-list";

export const metadata = { title: "Tourism News" };
export const revalidate = 60;

export default async function NewsPage() {
  const { news } = await getLiveData();

  return (
    <div className="page on page-in">
      <PageHead
        crumb="Tourism News"
        title={<>What&rsquo;s moving in<br />Bhutanese tourism</>}
        intro="Policy changes, association business, aviation updates and market intelligence for member operators and the trade."
      />
      <section className="pad-s">
        <NewsList news={news} />
      </section>
    </div>
  );
}
