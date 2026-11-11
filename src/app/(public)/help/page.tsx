import Link from "next/link";

export default function HelpPage() {
  return (
    <main className="bg-cream px-6 py-12 sm:px-10 lg:px-20 lg:py-16">
      <div className="mx-auto w-full max-w-3xl">
        <p className="font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.08em] text-charcoal">HELP CENTRE</p>
        <h1 className="mt-4 font-[family-name:var(--font-lora)] text-[42px] font-normal leading-[1.18] text-charcoal sm:text-[54px]">A clearer way to get started.</h1>
        <p className="mt-5 font-[family-name:var(--font-inter)] text-base leading-[1.7] text-charcoal">Start with the Rental Guide for practical steps on searching, viewing a home and checking details before payment.</p>
        <div className="mt-10 rounded-[12px] bg-white p-6 shadow-subtle sm:p-8">
          <h2 className="font-[family-name:var(--font-lora)] text-[28px] font-normal text-charcoal">Looking for something specific?</h2>
          <p className="mt-3 font-[family-name:var(--font-inter)] text-sm leading-[1.7] text-grey">Use the platform support channel when it becomes available to ask a question or report a problem. House Hunting is still being prepared, so account and enquiry support options are not connected yet.</p>
          <Link href="/guide" className="mt-6 inline-flex rounded-md bg-black px-5 py-3 font-[family-name:var(--font-inter)] text-sm font-medium text-white hover:bg-charcoal">Read the Rental Guide</Link>
        </div>
      </div>
    </main>
  );
}
