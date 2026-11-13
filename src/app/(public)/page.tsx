import { FeaturedHomes } from "@/components/home/featured-homes";
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { NeighbourhoodsSection } from "@/components/home/neighbourhoods-section";
import { RentalGuidance } from "@/components/home/rental-guidance";
import { SearchPanel } from "@/components/home/search-panel";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SearchPanel />
      <FeaturedHomes />
      <div className="hidden lg:block">
        <NeighbourhoodsSection />
        <HowItWorks />
        <RentalGuidance />
      </div>
    </>
  );
}
