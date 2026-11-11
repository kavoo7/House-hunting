import Link from "next/link";

const viewingChecks = [
  "Water supply and electricity",
  "Security and access",
  "Plumbing and drainage",
  "Doors, windows and general property condition",
  "Mobile network and internet availability",
  "The surrounding neighbourhood",
];

const paymentChecks = [
  "Verify the identity and authority of the agent or landlord",
  "Confirm the property and tenancy terms",
  "Understand deposits, rent and any additional charges",
  "Obtain written proof of any payment",
  "Avoid sending money before verifying the property and the person receiving payment",
];

const movingInChecks = [
  "Inspect the property",
  "Record existing damage",
  "Confirm keys and access",
  "Understand utility arrangements",
  "Keep copies of agreements and payment records",
];

function GuideList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 flex flex-col gap-4">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 font-[family-name:var(--font-inter)] text-sm leading-[1.6] text-charcoal">
          <span aria-hidden="true" className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-sand text-xs text-charcoal">✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function GuidePage() {
  return (
    <main className="bg-cream px-6 py-12 sm:px-10 lg:px-20 lg:py-16">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-16">
        <header className="max-w-3xl">
          <p className="font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.08em] text-charcoal">RENTAL GUIDE</p>
          <h1 className="mt-4 font-[family-name:var(--font-lora)] text-[42px] font-normal leading-[1.18] tracking-[-0.02em] text-charcoal sm:text-[54px]">Rent with confidence.</h1>
          <p className="mt-6 max-w-2xl font-[family-name:var(--font-inter)] text-base leading-[1.7] text-charcoal">A practical guide to help you make informed rental decisions, from your first enquiry to moving into a home in Nairobi.</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-[12px] bg-white p-6 shadow-subtle sm:p-8" aria-labelledby="before-viewing-heading">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.08em] text-grey">01</p>
            <h2 id="before-viewing-heading" className="mt-3 font-[family-name:var(--font-lora)] text-[30px] font-normal text-charcoal">Before arranging a viewing</h2>
            <p className="mt-4 font-[family-name:var(--font-inter)] text-sm leading-[1.6] text-grey">A few questions upfront can save time and help you prepare for a useful visit.</p>
            <GuideList items={["Confirm the property's location", "Ask about rent and additional charges", "Confirm whether the property is still available", "Arrange a physical viewing"]} />
          </section>

          <section className="rounded-[12px] bg-[#eee6d8] p-6 sm:p-8" aria-labelledby="during-viewing-heading">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.08em] text-grey">02</p>
            <h2 id="during-viewing-heading" className="mt-3 font-[family-name:var(--font-lora)] text-[30px] font-normal text-charcoal">During the viewing</h2>
            <p className="mt-4 font-[family-name:var(--font-inter)] text-sm leading-[1.6] text-charcoal">Take your time and look beyond the first impression of the home.</p>
            <GuideList items={viewingChecks} />
          </section>

          <section className="rounded-[12px] bg-charcoal p-6 sm:p-8 lg:col-span-2" aria-labelledby="before-payment-heading">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.08em] text-sand">03</p>
            <h2 id="before-payment-heading" className="mt-3 font-[family-name:var(--font-lora)] text-[30px] font-normal text-cream">Before making payment</h2>
            <p className="mt-4 max-w-2xl font-[family-name:var(--font-inter)] text-sm leading-[1.6] text-sand">Take a moment to verify the person, property and terms before any money changes hands.</p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {paymentChecks.map((item) => (
                <li key={item} className="flex items-start gap-3 font-[family-name:var(--font-inter)] text-sm leading-[1.6] text-cream">
                  <span aria-hidden="true" className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-sand text-xs text-charcoal">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[12px] border border-[#e5ded2] bg-white p-6 sm:p-8 lg:col-span-2" aria-labelledby="moving-in-heading">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <p className="font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.08em] text-grey">04</p>
                <h2 id="moving-in-heading" className="mt-3 font-[family-name:var(--font-lora)] text-[30px] font-normal text-charcoal">Moving-in checklist</h2>
                <p className="mt-4 font-[family-name:var(--font-inter)] text-sm leading-[1.6] text-grey">Keep the first day simple by confirming the practical details that make a home work.</p>
              </div>
              <GuideList items={movingInChecks} />
            </div>
          </section>
        </div>

        <section className="flex flex-col items-start justify-between gap-6 rounded-[12px] bg-sand p-7 sm:p-10 lg:flex-row lg:items-center" aria-labelledby="guide-cta-heading">
          <div>
            <h2 id="guide-cta-heading" className="font-[family-name:var(--font-lora)] text-[30px] font-normal text-charcoal">Ready to start looking?</h2>
            <p className="mt-2 font-[family-name:var(--font-inter)] text-sm text-charcoal">Explore available homes and find a place that feels right.</p>
          </div>
          <Link href="/properties" className="shrink-0 rounded-md bg-black px-5 py-3 font-[family-name:var(--font-inter)] text-sm font-medium text-white transition-colors hover:bg-charcoal">Explore homes</Link>
        </section>
      </div>
    </main>
  );
}
