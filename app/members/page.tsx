import { Suspense } from "react";
import PageHead from "@/components/site/page-head";
import { getLiveData } from "@/lib/live-data";
import MemberDirectory from "./member-directory";

export const metadata = { title: "Member Directory" };
export const revalidate = 60;

export default async function MembersPage() {
  const { members } = await getLiveData();

  return (
    <div className="page on page-in">
      <PageHead
        crumb="Member Directory"
        title={<>Find a licensed<br />Bhutanese operator</>}
        intro="Every company listed here holds a valid tour operation licence and is a member in good standing of the association. Search by name, browse alphabetically, or filter by specialty and base."
      />
      <section className="pad-s">
        <Suspense>
          <MemberDirectory members={members} />
        </Suspense>
      </section>
    </div>
  );
}
