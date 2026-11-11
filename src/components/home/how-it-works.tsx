const steps = [
  {
    number: "01",
    title: "Make it your search",
    description: "Choose your neighbourhood, budget and the little things that matter.",
  },
  {
    number: "02",
    title: "Get the full picture",
    description: "Explore photos, amenities and costs before you arrange a viewing.",
  },
  {
    number: "03",
    title: "Meet your next home",
    description: "Contact the agent, visit in person and find the right fit for you.",
  },
];

export function HowItWorks() {
  return (
    <section
      className="bg-white px-6 py-16 sm:px-10 lg:px-20"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10">
        <h2
          id="how-it-works-heading"
          className="font-[family-name:var(--font-lora)] text-[30px] font-normal leading-[1.2] tracking-[-0.02em] text-charcoal sm:text-[34px]"
        >
          Less searching. More settling in.
        </h2>

        <div className="grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          {steps.map((step) => (
            <article key={step.number} className="flex flex-col gap-4">
              <span className="font-[family-name:var(--font-inter)] text-[13px] font-medium text-grey">
                {step.number}
              </span>
              <h3 className="font-[family-name:var(--font-inter)] text-xl font-semibold leading-tight text-charcoal">
                {step.title}
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-sm font-normal leading-[1.5] text-charcoal">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
