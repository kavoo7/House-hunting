import Image from "next/image";

export function HeroSection() {
  return (
    <section className="bg-cream px-6 py-10 sm:px-10 lg:px-20">
      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-10 lg:grid-cols-2 lg:gap-[60px]">
        <div className="flex flex-col gap-6">
          <p className="font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.08em] text-charcoal">
            RENT IN NAIROBI. FEEL AT HOME.
          </p>

          <h1 className="max-w-[560px] font-[family-name:var(--font-lora)] text-[42px] font-normal leading-[1.18] tracking-[-0.02em] text-charcoal sm:text-[50px] lg:text-[58px]">
            Your next chapter
            <br />
            starts at home.
          </h1>

          <p className="max-w-[460px] font-[family-name:var(--font-inter)] text-[17px] font-normal leading-[1.5] text-charcoal">
            Discover rental homes that fit your life, your budget and your favourite corner of Nairobi.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 font-[family-name:var(--font-inter)] text-xs font-medium text-charcoal">
            <span>Local neighbourhoods</span>
            <span>Transparent monthly rent</span>
          </div>
        </div>

        <div className="relative h-[300px] overflow-hidden rounded-[12px] sm:h-[380px] lg:h-[426px]">
          <Image
            src="/hero-property.png"
            alt="Bright rental home interior with a view of greenery"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
