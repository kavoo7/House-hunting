import Image from "next/image";
import { notFound } from "next/navigation";
import { PropertyCard, type PropertyCardData } from "@/components/properties/property-card";

type PropertyDetails = PropertyCardData & {
  description: string;
  amenities: string[];
  availability: string;
  gallery: string[];
};

const properties: Record<string, PropertyDetails> = {
  "bright-airy-apartment": {
    image: "/featured-home-kilimani.png",
    gallery: ["/featured-home-kilimani.png", "/featured-home-westlands.png", "/featured-home-kileleshwa.png"],
    status: "New listing",
    price: "KSh 85,000",
    title: "Bright & airy 2-bedroom apartment",
    location: "Kilimani · near Yaya Centre",
    bedrooms: 2,
    bathrooms: 2,
    size: "110 m²",
    availability: "Available now",
    description: "A bright, comfortable apartment in the heart of Kilimani, with generous living spaces and easy access to cafés, shops and everyday essentials. The home is designed for relaxed city living, with plenty of natural light throughout the day.",
    amenities: ["Fitted kitchen", "Balcony", "24-hour security", "Parking space"],
  },
  "modern-westlands-home": {
    image: "/featured-home-westlands.png",
    gallery: ["/featured-home-westlands.png", "/featured-home-kilimani.png", "/featured-home-kileleshwa.png"],
    status: "Available now",
    price: "KSh 65,000",
    title: "Modern living in Westlands",
    location: "Westlands · near Sarit Centre",
    bedrooms: 2,
    bathrooms: 2,
    size: "95 m²",
    availability: "Available now",
    description: "Set close to the energy of Westlands, this modern apartment offers a practical layout, welcoming finishes and a convenient base for work, weekends and everything in between.",
    amenities: ["Open-plan living", "Gym access", "Backup generator", "Secure parking"],
  },
  "peaceful-city-retreat": {
    image: "/featured-home-kileleshwa.png",
    gallery: ["/featured-home-kileleshwa.png", "/featured-home-kilimani.png", "/featured-home-westlands.png"],
    status: "Available now",
    price: "KSh 45,000",
    title: "Your own peaceful city retreat",
    location: "Kileleshwa · Oloitoktok Road",
    bedrooms: 1,
    bathrooms: 1,
    size: "68 m²",
    availability: "Available now",
    description: "A calm one-bedroom home in leafy Kileleshwa, with a warm, welcoming feel and a location that keeps Nairobi's best neighbourhoods within easy reach.",
    amenities: ["Natural light", "Quiet compound", "Water storage", "On-site caretaker"],
  },
};

const relatedProperties: PropertyCardData[] = Object.values(properties).map((property) => ({
  image: property.image,
  title: property.title,
  location: property.location,
  price: property.price,
  bedrooms: property.bedrooms,
  bathrooms: property.bathrooms,
  size: property.size,
  status: property.status,
}));

export function generateStaticParams() {
  return Object.keys(properties).map((propertyId) => ({ propertyId }));
}

export default async function PropertyPage({ params }: { params: Promise<{ propertyId: string }> }) {
  const { propertyId } = await params;
  const property = properties[propertyId];

  if (!property) {
    notFound();
  }

  return (
    <main className="bg-cream px-6 py-10 sm:px-10 lg:px-20 lg:py-14">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12">
        <section aria-labelledby="property-title">
          <div className="grid gap-3 lg:grid-cols-[1.55fr_1fr] lg:grid-rows-2 lg:gap-4">
            <div className="relative h-[300px] overflow-hidden rounded-[12px] sm:h-[420px] lg:row-span-2 lg:h-[560px]">
              <Image src={property.gallery[0]} alt={property.title} fill priority sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
            </div>
            {property.gallery.slice(1).map((image, index) => (
              <div key={image} className="relative hidden h-[270px] overflow-hidden rounded-[12px] sm:block">
                <Image src={image} alt={`${property.title} view ${index + 2}`} fill sizes="(min-width: 1024px) 40vw, 50vw" className="object-cover" />
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-[5px] bg-sand px-2.5 py-1.5 font-[family-name:var(--font-inter)] text-[11px] font-medium leading-none text-charcoal">{property.status}</span>
                <span className="font-[family-name:var(--font-inter)] text-sm text-grey">{property.location}</span>
              </div>
              <h1 id="property-title" className="mt-4 max-w-3xl font-[family-name:var(--font-lora)] text-[38px] font-normal leading-[1.2] tracking-[-0.02em] text-charcoal sm:text-[48px]">{property.title}</h1>
              <p className="mt-5 font-[family-name:var(--font-inter)] text-[28px] font-semibold leading-tight text-charcoal">{property.price} <span className="text-sm font-normal text-grey">/ month</span></p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-[family-name:var(--font-inter)] text-sm text-charcoal"><span>{property.bedrooms} bedrooms</span><span>{property.bathrooms} bathrooms</span><span>{property.size}</span></div>

              <div className="mt-10 max-w-2xl"><h2 className="font-[family-name:var(--font-inter)] text-xl font-semibold text-charcoal">About this home</h2><p className="mt-3 font-[family-name:var(--font-inter)] text-[15px] leading-[1.7] text-grey">{property.description}</p></div>
              <div className="mt-10"><h2 className="font-[family-name:var(--font-inter)] text-xl font-semibold text-charcoal">Amenities</h2><ul className="mt-4 grid gap-3 sm:grid-cols-2">{property.amenities.map((amenity) => <li key={amenity} className="rounded-md bg-white px-4 py-3 font-[family-name:var(--font-inter)] text-sm text-charcoal shadow-subtle">{amenity}</li>)}</ul></div>
            </div>

            <aside className="rounded-[12px] bg-white p-6 shadow-subtle" aria-labelledby="enquiry-heading">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.08em] text-grey">AVAILABILITY</p>
              <p className="mt-2 font-[family-name:var(--font-inter)] text-sm font-medium text-charcoal">{property.availability}</p>
              <h2 id="enquiry-heading" className="mt-7 font-[family-name:var(--font-lora)] text-[26px] font-normal text-charcoal">Interested in this home?</h2>
              <p className="mt-3 font-[family-name:var(--font-inter)] text-sm leading-[1.6] text-grey">Send an enquiry to arrange a viewing and learn more about the tenancy terms.</p>
              <button type="button" className="mt-6 h-12 w-full rounded-md bg-black px-5 font-[family-name:var(--font-inter)] text-sm font-medium text-white transition-colors hover:bg-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">Send an enquiry</button>
              <p className="mt-3 text-center font-[family-name:var(--font-inter)] text-xs text-grey">No payment is required to enquire.</p>
            </aside>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2" aria-label="Location information">
          <div className="rounded-[12px] bg-[#eee6d8] p-6 sm:p-8"><p className="font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.08em] text-grey">LOCATION</p><h2 className="mt-3 font-[family-name:var(--font-lora)] text-[30px] font-normal text-charcoal">Live close to what matters.</h2><p className="mt-3 font-[family-name:var(--font-inter)] text-sm leading-[1.6] text-charcoal">{property.location}. Explore nearby cafés, shops, green spaces and convenient routes around Nairobi.</p></div>
          <div className="flex min-h-[220px] items-center justify-center rounded-[12px] border border-[#e5ded2] bg-[#e8e1d5] p-6" aria-label={`Static map showing ${property.location}`}><div className="text-center"><span className="mx-auto flex size-12 items-center justify-center rounded-full bg-black text-xl text-white">⌖</span><p className="mt-3 font-[family-name:var(--font-inter)] text-sm font-medium text-charcoal">{property.location}</p><p className="mt-1 font-[family-name:var(--font-inter)] text-xs text-grey">Static location preview</p></div></div>
        </section>

        <section aria-labelledby="related-properties-heading"><h2 id="related-properties-heading" className="font-[family-name:var(--font-lora)] text-[30px] font-normal text-charcoal">You may also like</h2><div className="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{relatedProperties.map((relatedProperty) => <PropertyCard key={relatedProperty.title} property={relatedProperty} />)}</div></section>
      </div>
    </main>
  );
}
