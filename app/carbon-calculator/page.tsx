import PageHead from "@/components/site/page-head";
import CarbonCalculator from "./calculator";

export const metadata = { title: "Carbon Footprint Calculator" };

export default function CarbonCalculatorPage() {
  return (
    <div className="page on page-in">
      <PageHead
        crumb="Carbon Footprint Calculator"
        title={<>How much will your<br />trip cost the climate?</>}
        intro="A quick, Bhutan-specific estimate of your trip's carbon footprint, with practical ways to lower it — hydropower EVs, eco-lodges and more. Illustrative planning estimates, not a certified lifecycle assessment."
      />
      <section className="pad-s">
        <div className="wrap">
          <CarbonCalculator />
        </div>
      </section>
    </div>
  );
}
