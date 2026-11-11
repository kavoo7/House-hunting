import { PropertyCard, type PropertyCardData } from "@/components/properties/property-card";

const properties: PropertyCardData[] = [
  {
    image: "/featured-home-kilimani.png",
    status: "New listing",
    price: "KSh 85,000",
    title: "Bright & airy 2-bedroom apartment",
    location: "Kilimani · near Yaya Centre",
    bedrooms: 2,
    bathrooms: 2,
    size: "110 m²",
  },
  {
    image: "/featured-home-westlands.png",
    status: "Available now",
    price: "KSh 65,000",
    title: "Modern living in Westlands",
    location: "Westlands · near Sarit Centre",
    bedrooms: 2,
    bathrooms: 2,
    size: "95 m²",
  },
  {
    image: "/featured-home-kileleshwa.png",
    status: "Available now",
    price: "KSh 45,000",
    title: "Your own peaceful city retreat",
    location: "Kileleshwa · Oloitoktok Road",
    bedrooms: 1,
    bathrooms: 1,
    size: "68 m²",
  },
  {
    image: "/featured-home-westlands.png",
    price: "KSh 110,000",
    title: "Sunlit family home near the city",
    location: "Lavington · near Junction Mall",
    bedrooms: 3,
    bathrooms: 2,
    size: "145 m²",
  },
  {
    image: "/featured-home-kilimani.png",
    price: "KSh 55,000",
    title: "Calm one-bedroom in a central spot",
    location: "Hurlingham · near Nairobi Hospital",
    bedrooms: 1,
    bathrooms: 1,
    size: "62 m²",
  },
  {
    image: "/featured-home-kileleshwa.png",
    price: "KSh 72,000",
    title: "Quiet modern apartment with balcony",
    location: "Kileleshwa · near Kasuku Centre",
    bedrooms: 2,
    bathrooms: 2,
    size: "102 m²",
  },
];

const filters = [
  { label: "Location or estate", options: ["All Nairobi", "Kilimani", "Westlands", "Kileleshwa", "Lavington"] },
  { label: "Monthly rent", options: ["Any budget", "Under KSh 60,000", "KSh 60,000–100,000", "Over KSh 100,000"] },
  { label: "House type", options: ["Any type", "Apartment", "Townhouse", "House"] },
  { label: "Bedrooms", options: ["Any bedrooms", "1 bedroom", "2 bedrooms", "3+ bedrooms"] },
];

export default function PropertiesPage() {
  return (
    <main className="bg-cream px-6 py-12 sm:px-10 lg:px-20 lg:py-16">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10">
        <header className="max-w-2xl">
          <p className="font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.08em] text-charcoal">
            FIND YOUR NEXT HOME
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-lora)] text-[40px] font-normal leading-[1.18] tracking-[-0.02em] text-charcoal sm:text-[48px]">
            Homes that fit your life in Nairobi.
          </h1>
          <p className="mt-4 max-w-xl font-[family-name:var(--font-inter)] text-base leading-[1.6] text-grey">
            Explore rental homes across Nairobi and find a place that feels right for your next chapter.
          </p>
        </header>

        <form className="grid gap-4 rounded-[12px] bg-white p-5 shadow-subtle sm:grid-cols-2 lg:grid-cols-5 lg:items-end lg:gap-5 lg:p-6" aria-label="Property filters">
          {filters.map((filter) => (
            <label key={filter.label} className="flex flex-col gap-2">
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.06em] text-grey">
                {filter.label}
              </span>
              <select
                defaultValue={filter.options[0]}
                className="h-12 w-full rounded-md border border-[#e5ded2] bg-white px-3 font-[family-name:var(--font-inter)] text-sm text-charcoal outline-none focus:border-charcoal"
              >
                {filter.options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          ))}
          <button
            type="button"
            className="h-12 rounded-md bg-black px-5 font-[family-name:var(--font-inter)] text-sm font-medium text-white transition-colors hover:bg-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Apply filters
          </button>
        </form>

        <section aria-labelledby="property-results-heading">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 id="property-results-heading" className="font-[family-name:var(--font-lora)] text-[30px] font-normal text-charcoal">
                Rental homes in Nairobi
              </h2>
              <p className="mt-2 font-[family-name:var(--font-inter)] text-sm text-grey">6 sample properties found</p>
            </div>
            <label className="flex items-center gap-3 font-[family-name:var(--font-inter)] text-sm text-grey">
              Sort by
              <select defaultValue="recommended" className="rounded-md border border-[#e5ded2] bg-white px-3 py-2 text-sm text-charcoal">
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
              </select>
            </label>
          </div>

          <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.title} property={property} />
            ))}
          </div>

          <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Property results pages">
            <span className="flex size-10 items-center justify-center rounded-md bg-black font-[family-name:var(--font-inter)] text-sm text-white" aria-current="page">
              1
            </span>
            <span className="flex size-10 items-center justify-center rounded-md border border-[#e5ded2] bg-white font-[family-name:var(--font-inter)] text-sm text-grey">
              2
            </span>
            <span className="px-2 font-[family-name:var(--font-inter)] text-sm text-grey">of 2</span>
          </nav>
        </section>
      </div>
    </main>
  );
}
