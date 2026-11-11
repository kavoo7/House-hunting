import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="bg-cream px-6 py-12 sm:px-10 lg:px-20 lg:py-16">
      <div className="mx-auto w-full max-w-3xl">
        <p className="font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.08em] text-charcoal">CONTACT HOUSE HUNTING</p>
        <h1 className="mt-4 font-[family-name:var(--font-lora)] text-[42px] font-normal leading-[1.18] text-charcoal sm:text-[54px]">We’re here to help you find your way.</h1>
        <p className="mt-5 font-[family-name:var(--font-inter)] text-base leading-[1.7] text-charcoal">The platform’s contact and support channel will be made available as the service develops. For now, explore the available homes and use the Rental Guide for practical search and viewing advice.</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/properties" className="rounded-md bg-black px-5 py-3 font-[family-name:var(--font-inter)] text-sm font-medium text-white hover:bg-charcoal">Explore homes</Link>
          <Link href="/guide" className="rounded-md border border-[#e5ded2] bg-white px-5 py-3 font-[family-name:var(--font-inter)] text-sm font-medium text-charcoal hover:bg-[#fbfaf7]">Read the Rental Guide</Link>
        </div>
      </div>
    </main>
  );
}
