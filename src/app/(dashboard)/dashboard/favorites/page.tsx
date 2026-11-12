"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useDemoAuth } from "@/components/auth/demo-auth";
import { EmptyState } from "@/components/ui/empty-state";
import { PropertyCard } from "@/components/properties/property-card";
import { sampleProperties } from "@/app/(public)/properties/page";

type SortOption = "newest" | "price-low" | "price-high";

export default function FavoritesPage() {
  const { favoritePropertyIds } = useDemoAuth();
  const [sort, setSort] = useState<SortOption>("newest");
  const savedProperties = useMemo(() => {
    const saved = sampleProperties.filter((property) => property.propertyId && favoritePropertyIds.includes(property.propertyId));
    if (sort === "price-low") return [...saved].sort((a, b) => a.monthlyRent - b.monthlyRent);
    if (sort === "price-high") return [...saved].sort((a, b) => b.monthlyRent - a.monthlyRent);
    return saved;
  }, [favoritePropertyIds, sort]);

  return <main className="min-h-screen bg-cream px-6 py-10 sm:px-10 lg:px-12 lg:py-14"><div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8"><header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-grey">Your collection</p><h1 className="mt-3 font-[family-name:var(--font-lora)] text-[40px] font-normal leading-tight text-charcoal sm:text-[48px]">Saved homes.</h1><p className="mt-4 max-w-xl text-base leading-7 text-grey">Keep track of properties you like and return to them when you are ready.</p></div><div className="flex items-center gap-3"><label htmlFor="favorites-sort" className="text-sm text-grey">Sort by</label><select id="favorites-sort" value={sort} onChange={(event) => setSort(event.target.value as SortOption)} className="rounded-md border border-border bg-white px-3 py-2.5 text-sm text-charcoal outline-none focus:border-charcoal"><option value="newest">Newest saved</option><option value="price-low">Lowest rent</option><option value="price-high">Highest rent</option></select></div></header><p className="text-sm text-grey"><span className="font-medium text-charcoal">{savedProperties.length}</span> {savedProperties.length === 1 ? "saved property" : "saved properties"} <span aria-hidden="true">·</span> demo selections are stored for this browser tab only.</p>{savedProperties.length > 0 ? <section aria-labelledby="saved-properties-heading"><h2 id="saved-properties-heading" className="sr-only">Saved property listings</h2><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{savedProperties.map((property) => <PropertyCard key={property.propertyId} property={property} />)}</div></section> : <EmptyState title="No saved homes yet." description="When a home catches your eye, select its heart icon and it will appear here for this demo session." action={{ label: "Browse properties", href: "/properties" }} />}<Link href="/properties" className="w-fit text-sm font-medium text-charcoal underline underline-offset-4">Continue exploring Nairobi homes</Link></div></main>;
}
