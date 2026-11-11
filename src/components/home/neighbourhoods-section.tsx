import Image from "next/image";

const neighbourhoods = [
  {
    image: "/neighbourhood-kilimani.png",
    name: "Kilimani",
    description: "Connected, convenient, full of life.",
  },
  {
    image: "/neighbourhood-westlands.png",
    name: "Westlands",
    description: "City energy, right on your doorstep.",
  },
  {
    image: "/neighbourhood-lavington.png",
    name: "Lavington",
    description: "A little greener. A little quieter.",
  },
];

export function NeighbourhoodsSection() {
  return (
    <section
      className="bg-[#eee6d8] px-6 py-16 sm:px-10 lg:px-20"
      aria-labelledby="neighbourhoods-heading"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2
            id="neighbourhoods-heading"
            className="font-[family-name:var(--font-lora)] text-[30px] font-normal leading-[1.2] tracking-[-0.02em] text-charcoal sm:text-[34px]"
          >
            Find your kind of Nairobi.
          </h2>
          <button
            type="button"
            className="flex w-fit items-center gap-3 rounded-lg border border-[#e5ded2] bg-white px-5 py-[13px] font-[family-name:var(--font-inter)] text-sm font-medium text-charcoal transition-colors hover:bg-[#fbfaf7]"
            aria-label="Explore neighbourhoods"
          >
            Explore neighbourhoods
            <Image
              src="/arrow-right-neighbourhood.svg"
              alt=""
              width={16}
              height={16}
              aria-hidden="true"
            />
          </button>
        </div>

        <p className="font-[family-name:var(--font-inter)] text-[15px] font-normal text-grey">
          From lively city living to quiet, tree-lined streets.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {neighbourhoods.map((neighbourhood) => (
            <article key={neighbourhood.name}>
              <div className="relative h-[210px] overflow-hidden rounded-[12px]">
                <Image
                  src={neighbourhood.image}
                  alt={`${neighbourhood.name} neighbourhood`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-4 flex items-center justify-between gap-4">
                <h3 className="font-[family-name:var(--font-inter)] text-xl font-semibold leading-tight text-charcoal">
                  {neighbourhood.name}
                </h3>
                <Image
                  src="/arrow-right-neighbourhood.svg"
                  alt=""
                  width={20}
                  height={20}
                  aria-hidden="true"
                />
              </div>
              <p className="mt-2 font-[family-name:var(--font-inter)] text-[13px] font-normal text-charcoal">
                {neighbourhood.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
