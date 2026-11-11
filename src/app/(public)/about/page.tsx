import Image from "next/image";
import Link from "next/link";

const values = [
  {
    title: "Transparency",
    description: "Clear rent, useful details and honest expectations from the start.",
  },
  {
    title: "Trust and safety",
    description: "Practical guidance to help you verify a home before making a commitment.",
  },
  {
    title: "Convenience",
    description: "A simpler way to compare homes and narrow your search around Nairobi.",
  },
  {
    title: "Local insight",
    description: "Neighbourhood context that helps you choose a place that fits your everyday life.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-cream px-6 py-12 sm:px-10 lg:px-20 lg:py-16">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-20">
        <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16" aria-labelledby="about-heading">
          <div className="max-w-2xl">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.08em] text-charcoal">
              ABOUT HOUSE HUNTING
            </p>
            <h1 id="about-heading" className="mt-4 font-[family-name:var(--font-lora)] text-[42px] font-normal leading-[1.18] tracking-[-0.02em] text-charcoal sm:text-[54px]">
              Finding a home should feel a little easier.
            </h1>
            <p className="mt-6 max-w-xl font-[family-name:var(--font-inter)] text-base leading-[1.7] text-charcoal">
              We help people discover rental homes in Nairobi with clearer information, neighbourhood context and a calmer way to search.
            </p>
          </div>
          <div className="relative h-[300px] overflow-hidden rounded-[12px] sm:h-[400px]">
            <Image src="/neighbourhood-lavington.png" alt="A leafy Nairobi neighbourhood" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-2 lg:gap-20" aria-labelledby="problem-heading">
          <div>
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.08em] text-grey">THE SEARCH CAN BE HARD</p>
            <h2 id="problem-heading" className="mt-3 font-[family-name:var(--font-lora)] text-[32px] font-normal leading-[1.2] text-charcoal">Too much guesswork, too little context.</h2>
          </div>
          <div className="space-y-5 font-[family-name:var(--font-inter)] text-[15px] leading-[1.7] text-charcoal">
            <p>Finding a rental in Nairobi often means sorting through scattered listings, unclear costs and photos that do not tell the whole story.</p>
            <p>It can be difficult to understand how a home fits into a neighbourhood, whether the details are current or what to check before arranging a viewing.</p>
          </div>
        </section>

        <section className="rounded-[12px] bg-[#eee6d8] p-6 sm:p-10 lg:p-14" aria-labelledby="approach-heading">
          <div className="max-w-3xl">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.08em] text-grey">OUR APPROACH</p>
            <h2 id="approach-heading" className="mt-3 font-[family-name:var(--font-lora)] text-[32px] font-normal leading-[1.2] text-charcoal">A clearer way to look for home.</h2>
            <p className="mt-5 font-[family-name:var(--font-inter)] text-[15px] leading-[1.7] text-charcoal">House Hunting brings rental property information together in one focused place. Explore homes by neighbourhood, compare the details that matter and get the context you need to make a more informed decision.</p>
          </div>
        </section>

        <section aria-labelledby="values-heading">
          <div className="max-w-2xl">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.08em] text-grey">WHAT MATTERS TO US</p>
            <h2 id="values-heading" className="mt-3 font-[family-name:var(--font-lora)] text-[32px] font-normal text-charcoal">Built around the way people really search.</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <article key={value.title} className="rounded-[12px] bg-white p-6 shadow-subtle">
                <h3 className="font-[family-name:var(--font-inter)] text-lg font-semibold text-charcoal">{value.title}</h3>
                <p className="mt-3 font-[family-name:var(--font-inter)] text-sm leading-[1.6] text-grey">{value.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="flex flex-col items-start justify-between gap-6 rounded-[12px] bg-charcoal p-7 sm:p-10 lg:flex-row lg:items-center" aria-labelledby="about-cta-heading">
          <div>
            <h2 id="about-cta-heading" className="font-[family-name:var(--font-lora)] text-[30px] font-normal text-cream">Ready to find your next home?</h2>
            <p className="mt-2 font-[family-name:var(--font-inter)] text-sm text-sand">Start with the neighbourhoods and homes that fit your life.</p>
          </div>
          <Link href="/properties" className="shrink-0 rounded-md bg-cream px-5 py-3 font-[family-name:var(--font-inter)] text-sm font-medium text-charcoal transition-colors hover:bg-white">Explore homes</Link>
        </section>
      </div>
    </main>
  );
}
