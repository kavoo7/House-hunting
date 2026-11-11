import Image from "next/image";
import Link from "next/link";

const homes = [
  {
    image: "/featured-home-kilimani.png",
    status: "New listing",
    price: "KSh 85,000",
    title: "Bright & airy 2-bedroom apartment",
    location: "Kilimani · near Yaya Centre",
    details: "2 beds     2 baths     110 m²",
  },
  {
    image: "/featured-home-westlands.png",
    status: "Available now",
    price: "KSh 65,000",
    title: "Modern living in Westlands",
    location: "Westlands · near Sarit Centre",
    details: "2 beds     2 baths     95 m²",
  },
  {
    image: "/featured-home-kileleshwa.png",
    status: "Available now",
    price: "KSh 45,000",
    title: "Your own peaceful city retreat",
    location: "Kileleshwa · Oloitoktok Road",
    details: "1 bed     1 bath     68 m²",
  },
];

export function FeaturedHomes() {
  return (
    <section className="bg-cream px-6 py-16 sm:px-10 lg:px-20" aria-labelledby="featured-homes-heading">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="flex flex-col gap-5 sm:gap-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2
              id="featured-homes-heading"
              className="font-[family-name:var(--font-lora)] text-[30px] font-normal leading-[1.2] tracking-[-0.02em] text-charcoal sm:text-[34px]"
            >
              A few places you’ll love.
            </h2>
            <Link
              href="/properties"
              className="hidden w-fit items-center gap-3 rounded-lg border border-[#e5ded2] bg-white px-5 py-[13px] font-[family-name:var(--font-inter)] text-sm font-medium text-charcoal transition-colors hover:bg-[#fbfaf7] sm:flex"
              aria-label="Explore all homes"
            >
              Explore all homes
              <Image src="/arrow-right.svg" alt="" width={16} height={16} aria-hidden="true" />
            </Link>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[15px] font-normal text-grey">
            Good spaces. Great neighbourhoods. Find a home that feels right.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {homes.map((home, index) => (
              <article
                key={home.title}
                className={`${index === 2 ? "hidden sm:block" : ""} overflow-hidden rounded-[12px] border border-[#e5ded2] bg-white`}
              >
                <div className="relative h-[235px] w-full">
                  <Image
                    src={home.image}
                    alt={home.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-full bg-white p-2.5 shadow-subtle transition-transform hover:scale-105"
                    aria-label={`Save ${home.title}`}
                  >
                    <Image src="/heart.svg" alt="" width={20} height={20} aria-hidden="true" />
                  </button>
                </div>

                <div className="flex flex-col gap-2 p-5">
                  <span className="w-fit rounded-[5px] bg-cream px-2.5 py-1.5 font-[family-name:var(--font-inter)] text-[11px] font-medium leading-none text-charcoal">
                    {home.status}
                  </span>
                  <p className="font-[family-name:var(--font-inter)] text-[22px] font-semibold leading-tight text-charcoal">
                    {home.price} <span className="text-xs font-normal text-grey">/ month</span>
                  </p>
                  <h3 className="font-[family-name:var(--font-inter)] text-base font-medium leading-snug text-charcoal">
                    {home.title}
                  </h3>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] font-normal leading-snug text-grey">
                    {home.location}
                  </p>
                  <p className="font-[family-name:var(--font-inter)] text-xs font-normal text-charcoal">
                    {home.details}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <Link
            href="/properties"
            className="flex w-fit items-center gap-3 rounded-lg border border-[#e5ded2] bg-white px-5 py-[13px] font-[family-name:var(--font-inter)] text-sm font-medium text-charcoal transition-colors hover:bg-[#fbfaf7] sm:hidden"
            aria-label="Explore all homes"
          >
            Explore all homes
            <Image src="/arrow-right.svg" alt="" width={16} height={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
