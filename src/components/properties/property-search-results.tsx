"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PropertyCard, toDemoPropertyCard } from "@/components/properties/property-card";
import { getPublishedContributorProperties } from "@/data/demo-contributor-properties";

export function PropertySearchResults({ location, rent, bedrooms, sort, type }: { location: string; rent: string; bedrooms: string; sort: string; type: string }) {
  const [records, setRecords] = useState<ReturnType<typeof getPublishedContributorProperties>>([]);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setRecords(getPublishedContributorProperties()));
    return () => cancelAnimationFrame(frame);
  }, []);
  const properties = useMemo(() => records.map(toDemoPropertyCard)
    .filter((p) => !location || p.location.toLowerCase().includes(location.toLowerCase()))
    .filter((p) => !type || (type === "apartment" ? /apartment|studio|bedsitter/i.test(p.title) : type === "townhouse" ? /townhouse/i.test(p.title) : /house/i.test(p.title)))
    .filter((p) => rent === "under-60000" ? p.monthlyRent < 60000 : rent === "60000-100000" ? p.monthlyRent >= 60000 && p.monthlyRent <= 100000 : rent === "over-100000" ? p.monthlyRent > 100000 : true)
    .filter((p) => !bedrooms || (bedrooms === "4+" ? p.bedrooms >= 4 : p.bedrooms === Number(bedrooms)))
    .sort((a, b) => sort === "price-low" ? a.monthlyRent - b.monthlyRent : sort === "price-high" ? b.monthlyRent - a.monthlyRent : 0), [records, location, rent, bedrooms, sort, type]);
  return <>
    <p className="mt-2 font-[family-name:var(--font-inter)] text-sm text-grey">{properties.length} sample {properties.length === 1 ? "property" : "properties"} found</p>
    {properties.length ? <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{properties.map((p) => <PropertyCard key={p.propertyId} property={p} />)}</div> : <div className="mt-7 rounded-[12px] bg-white p-10 text-center shadow-subtle"><h3 className="font-[family-name:var(--font-lora)] text-[28px] font-normal text-charcoal">No homes match those filters.</h3><p className="mx-auto mt-3 max-w-md font-[family-name:var(--font-inter)] text-sm leading-[1.6] text-grey">Try a different neighbourhood, rent range or bedroom count to see more sample listings.</p><Link href="/properties" className="mt-6 inline-flex rounded-md bg-black px-5 py-3 font-[family-name:var(--font-inter)] text-sm font-medium text-white hover:bg-charcoal">Clear all filters</Link></div>}
  </>;
}
