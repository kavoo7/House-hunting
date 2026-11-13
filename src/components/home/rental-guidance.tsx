import Image from "next/image";
import Link from "next/link";

export function RentalGuidance() {
  return (
    <section className="bg-white px-6 py-12 sm:px-10 lg:px-20" aria-labelledby="rental-guidance-heading">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 rounded-[12px] bg-sand px-6 py-9 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-[720px]">
          <h2
            id="rental-guidance-heading"
            className="font-[family-name:var(--font-lora)] text-[28px] font-normal leading-[1.2] tracking-[-0.02em] text-charcoal"
          >
            A fresh start, with peace of mind.
          </h2>
          <p className="mt-2.5 font-[family-name:var(--font-inter)] text-sm font-normal leading-[1.5] text-charcoal">
            Always view a home in person. Confirm the agent&apos;s identity and never pay before you have verified the property and tenancy terms.
          </p>
        </div>

        <Link
          href="/guide"
          className="flex w-fit shrink-0 items-center gap-3 rounded-lg bg-black px-5 py-[13px] font-[family-name:var(--font-inter)] text-sm font-medium text-white transition-colors hover:bg-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label="Read our rental guide"
        >
          Read our rental guide
          <Image
            src="/arrow-right-rental-guide.svg"
            alt=""
            width={20}
            height={20}
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
}
