import Link from "next/link";
import { PropertyCard, type PropertyCardData } from "@/components/properties/property-card";

export const instant = false;

type SearchProperty = PropertyCardData & { monthlyRent: number };

const properties: SearchProperty[] = [
  { image: "/featured-home-kilimani.png", status: "New listing", price: "KSh 85,000", monthlyRent: 85000, title: "Bright & airy 2-bedroom apartment", location: "Kilimani · near Yaya Centre", bedrooms: 2, bathrooms: 2, size: "110 m²" },
  { image: "/featured-home-westlands.png", status: "Available now", price: "KSh 65,000", monthlyRent: 65000, title: "Modern living in Westlands", location: "Westlands · near Sarit Centre", bedrooms: 2, bathrooms: 2, size: "95 m²" },
  { image: "/featured-home-kileleshwa.png", status: "Available now", price: "KSh 45,000", monthlyRent: 45000, title: "Your own peaceful city retreat", location: "Kileleshwa · Oloitoktok Road", bedrooms: 1, bathrooms: 1, size: "68 m²" },
  { image: "/featured-home-westlands.png", price: "KSh 110,000", monthlyRent: 110000, title: "Sunlit family home near the city", location: "Lavington · near Junction Mall", bedrooms: 3, bathrooms: 2, size: "145 m²" },
  { image: "/featured-home-kilimani.png", price: "KSh 55,000", monthlyRent: 55000, title: "Calm one-bedroom in a central spot", location: "Hurlingham · near Nairobi Hospital", bedrooms: 1, bathrooms: 1, size: "62 m²" },
  { image: "/featured-home-kileleshwa.png", price: "KSh 72,000", monthlyRent: 72000, title: "Quiet modern apartment with balcony", location: "Kileleshwa · near Kasuku Centre", bedrooms: 2, bathrooms: 2, size: "102 m²" },
];

const neighbourhoods = ["Kilimani", "Westlands", "Kileleshwa", "Lavington", "Hurlingham", "Karen", "Runda"];
const rentRanges = [
  { value: "under-60000", label: "Under KSh 60,000" },
  { value: "60000-100000", label: "KSh 60,000–100,000" },
  { value: "over-100000", label: "Over KSh 100,000" },
];

function firstQueryValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function matchesRent(property: SearchProperty, rent: string) {
  if (rent === "under-60000") return property.monthlyRent < 60000;
  if (rent === "60000-100000") return property.monthlyRent >= 60000 && property.monthlyRent <= 100000;
  if (rent === "over-100000") return property.monthlyRent > 100000;
  return true;
}

function matchesBedrooms(property: SearchProperty, bedrooms: string) {
  if (!bedrooms) return true;
  if (bedrooms === "4+") return property.bedrooms >= 4;
  return property.bedrooms === Number(bedrooms);
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const location = firstQueryValue(query.location).trim();
  const rent = firstQueryValue(query.rent);
  const bedrooms = firstQueryValue(query.bedrooms);
  const sort = firstQueryValue(query.sort) || "recommended";
  const normalizedLocation = location.toLowerCase();

  const filteredProperties = properties
    .filter((property) => !normalizedLocation || property.location.toLowerCase().includes(normalizedLocation))
    .filter((property) => matchesRent(property, rent))
    .filter((property) => matchesBedrooms(property, bedrooms));

  if (sort === "price-low") filteredProperties.sort((a, b) => a.monthlyRent - b.monthlyRent);
  if (sort === "price-high") filteredProperties.sort((a, b) => b.monthlyRent - a.monthlyRent);

  return (
    <main className="bg-cream px-6 py-12 sm:px-10 lg:px-20 lg:py-16">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10">
        <header className="max-w-2xl">
          <p className="font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.08em] text-charcoal">FIND YOUR NEXT HOME</p>
          <h1 className="mt-3 font-[family-name:var(--font-lora)] text-[40px] font-normal leading-[1.18] tracking-[-0.02em] text-charcoal sm:text-[48px]">Homes that fit your life in Nairobi.</h1>
          <p className="mt-4 max-w-xl font-[family-name:var(--font-inter)] text-base leading-[1.6] text-grey">Explore rental homes across Nairobi and find a place that feels right for your next chapter.</p>
        </header>

        <form action="/properties" method="get" className="grid gap-4 rounded-[12px] bg-white p-5 shadow-subtle sm:grid-cols-2 lg:grid-cols-5 lg:items-end lg:gap-5 lg:p-6" aria-label="Property filters">
          <label className="flex flex-col gap-2">
            <span className="font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.06em] text-grey">Location or estate</span>
            <input name="location" list="property-neighbourhoods" defaultValue={location} placeholder="All Nairobi" className="h-12 w-full rounded-md border border-[#e5ded2] bg-white px-3 font-[family-name:var(--font-inter)] text-sm text-charcoal outline-none focus:border-charcoal" />
            <datalist id="property-neighbourhoods">{neighbourhoods.map((neighbourhood) => <option key={neighbourhood} value={neighbourhood} />)}</datalist>
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.06em] text-grey">Monthly rent</span>
            <select name="rent" defaultValue={rent} className="h-12 w-full rounded-md border border-[#e5ded2] bg-white px-3 font-[family-name:var(--font-inter)] text-sm text-charcoal outline-none focus:border-charcoal"><option value="">Any budget</option>{rentRanges.map((range) => <option key={range.value} value={range.value}>{range.label}</option>)}</select>
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.06em] text-grey">House type</span>
            <select name="type" defaultValue={firstQueryValue(query.type)} className="h-12 w-full rounded-md border border-[#e5ded2] bg-white px-3 font-[family-name:var(--font-inter)] text-sm text-charcoal outline-none focus:border-charcoal"><option value="">Any type</option><option value="apartment">Apartment</option><option value="townhouse">Townhouse</option><option value="house">House</option></select>
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.06em] text-grey">Bedrooms</span>
            <select name="bedrooms" defaultValue={bedrooms} className="h-12 w-full rounded-md border border-[#e5ded2] bg-white px-3 font-[family-name:var(--font-inter)] text-sm text-charcoal outline-none focus:border-charcoal"><option value="">Any bedrooms</option><option value="1">1 bedroom</option><option value="2">2 bedrooms</option><option value="3">3 bedrooms</option><option value="4+">4+ bedrooms</option></select>
          </label>
          <button type="submit" className="h-12 rounded-md bg-black px-5 font-[family-name:var(--font-inter)] text-sm font-medium text-white transition-colors hover:bg-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">Apply filters</button>
        </form>

        <section aria-labelledby="property-results-heading">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div><h2 id="property-results-heading" className="font-[family-name:var(--font-lora)] text-[30px] font-normal text-charcoal">Rental homes in Nairobi</h2><p className="mt-2 font-[family-name:var(--font-inter)] text-sm text-grey">{filteredProperties.length} sample {filteredProperties.length === 1 ? "property" : "properties"} found</p></div>
            <form action="/properties" method="get" className="flex items-center gap-3 font-[family-name:var(--font-inter)] text-sm text-grey">
              <input type="hidden" name="location" value={location} /><input type="hidden" name="rent" value={rent} /><input type="hidden" name="bedrooms" value={bedrooms} /><input type="hidden" name="type" value={firstQueryValue(query.type)} />
              <label htmlFor="sort">Sort by</label><select id="sort" name="sort" defaultValue={sort} className="rounded-md border border-[#e5ded2] bg-white px-3 py-2 text-sm text-charcoal"><option value="recommended">Recommended</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select><button type="submit" className="rounded-md border border-[#e5ded2] bg-white px-3 py-2 text-sm font-medium text-charcoal hover:bg-[#fbfaf7]">Apply</button>
            </form>
          </div>

          {filteredProperties.length > 0 ? <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{filteredProperties.map((property) => <PropertyCard key={property.title} property={property} />)}</div> : <div className="mt-7 rounded-[12px] bg-white p-10 text-center shadow-subtle"><h3 className="font-[family-name:var(--font-lora)] text-[28px] font-normal text-charcoal">No homes match those filters.</h3><p className="mx-auto mt-3 max-w-md font-[family-name:var(--font-inter)] text-sm leading-[1.6] text-grey">Try a different neighbourhood, rent range or bedroom count to see more sample listings.</p><Link href="/properties" className="mt-6 inline-flex rounded-md bg-black px-5 py-3 font-[family-name:var(--font-inter)] text-sm font-medium text-white hover:bg-charcoal">Clear all filters</Link></div>}

          <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Property results pages"><span className="flex size-10 items-center justify-center rounded-md bg-black font-[family-name:var(--font-inter)] text-sm text-white" aria-current="page">1</span><span className="px-2 font-[family-name:var(--font-inter)] text-sm text-grey">of 1</span></nav>
        </section>
      </div>
    </main>
  );
}
