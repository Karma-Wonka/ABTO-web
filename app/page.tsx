import Hero from "@/components/home/hero";
import WhoWeAre from "@/components/home/who-we-are";
import Stats from "@/components/home/stats";
import FrameStrip from "@/components/home/frame-strip";
import WhyMatters from "@/components/home/why-matters";
import MembershipTeaser from "@/components/home/membership-teaser";
import NewsSection from "@/components/home/news-section";
import PolicySection from "@/components/home/policy-section";
import TravelSection from "@/components/home/travel-section";
import Partners from "@/components/home/partners";
import Cta from "@/components/home/cta";
import { getLiveData } from "@/lib/live-data";

export const revalidate = 60;

export default async function Home() {
  const liveData = await getLiveData();

  return (
    <div className="page on page-in" id="p-home">
      <Hero memberCount={liveData.members.length} />
      <WhoWeAre />
      <Stats memberCount={liveData.members.length} />
      <FrameStrip />
      <WhyMatters />
      <MembershipTeaser />
      <NewsSection news={liveData.news} events={liveData.events} />
      <PolicySection />
      <TravelSection />
      <Partners />
      <Cta />
    </div>
  );
}
