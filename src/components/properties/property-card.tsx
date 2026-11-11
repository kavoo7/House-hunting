import Image from "next/image";

export type PropertyCardData = {
  image: string;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  size: string;
  status?: string;
};

export function PropertyCard({ property }: { property: PropertyCardData }) {
  return (
    <article className="overflow-hidden rounded-[12px] border border-[#e5ded2] bg-white shadow-subtle">
      <div className="relative h-[220px] w-full">
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        {property.status && (
          <span className="absolute left-4 top-4 rounded-[5px] bg-cream px-2.5 py-1.5 font-[family-name:var(--font-inter)] text-[11px] font-medium leading-none text-charcoal">
            {property.status}
          </span>
        )}
        <button
          type="button"
          className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-full bg-white p-2.5 shadow-subtle transition-transform hover:scale-105"
          aria-label={`Save ${property.title}`}
        >
          <Image src="/heart.svg" alt="" width={20} height={20} aria-hidden="true" />
        </button>
      </div>

      <div className="flex flex-col gap-2 p-5">
        <p className="font-[family-name:var(--font-inter)] text-[22px] font-semibold leading-tight text-charcoal">
          {property.price} <span className="text-xs font-normal text-grey">/ month</span>
        </p>
        <h2 className="font-[family-name:var(--font-inter)] text-base font-medium leading-snug text-charcoal">
          {property.title}
        </h2>
        <p className="font-[family-name:var(--font-inter)] text-[13px] leading-snug text-grey">
          {property.location}
        </p>
        <p className="font-[family-name:var(--font-inter)] text-xs text-charcoal">
          {property.bedrooms} {property.bedrooms === 1 ? "bed" : "beds"} · {property.bathrooms} {property.bathrooms === 1 ? "bath" : "baths"} · {property.size}
        </p>
      </div>
    </article>
  );
}
