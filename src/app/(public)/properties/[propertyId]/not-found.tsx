import Link from "next/link";

export default function PropertyNotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-cream px-6 py-16 sm:px-10 lg:px-20">
      <div className="max-w-lg text-center">
        <p className="font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.08em] text-grey">PROPERTY NOT FOUND</p>
        <h1 className="mt-3 font-[family-name:var(--font-lora)] text-[38px] font-normal text-charcoal">This home is no longer available.</h1>
        <p className="mt-4 font-[family-name:var(--font-inter)] text-sm leading-[1.6] text-grey">Try exploring our available Nairobi homes to find another place that feels right.</p>
        <Link href="/properties" className="mt-7 inline-flex rounded-md bg-black px-5 py-3 font-[family-name:var(--font-inter)] text-sm font-medium text-white hover:bg-charcoal">Explore homes</Link>
      </div>
    </main>
  );
}
