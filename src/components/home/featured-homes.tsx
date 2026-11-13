"use client";

import Image from "next/image";
import Link from "next/link";
import { SaveButton } from "@/components/favorites/save-button";
import { useEffect, useState } from "react";
import { getPublishedContributorProperties } from "@/data/demo-contributor-properties";

type FeaturedHome = { propertyId?: string; image: string; status: string; price: string; title: string; location: string; details: string };


export function FeaturedHomes() {
  const [homes, setHomes] = useState<FeaturedHome[]>([]);
  useEffect(() => { const frame = requestAnimationFrame(() => setHomes(getPublishedContributorProperties().slice(0, 3).map((property) => ({ propertyId: property.publicPropertyId, image: property.image, status: property.availability || "Available now", price: `KSh ${property.monthlyRent.toLocaleString("en-KE")}`, title: property.title, location: property.location, details: `${property.bedrooms ?? 0} beds     ${property.bathrooms ?? 0} baths     ${property.area ? `${property.area} m²` : "Area not specified"}` })))); return () => cancelAnimationFrame(frame); }, []);
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
                  <SaveButton label={home.title} propertyId={home.propertyId} />
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
