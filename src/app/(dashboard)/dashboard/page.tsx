"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDemoAuth } from "@/components/auth/demo-auth";
import { PropertyCard, toDemoPropertyCard } from "@/components/properties/property-card";
import { getPublishedContributorProperties } from "@/data/demo-contributor-properties";
import { demoEnquiries } from "@/data/demo-enquiries";

export default function DashboardPage() {
  const { session, favoritePropertyIds } = useDemoAuth();
  const [records, setRecords] = useState<ReturnType<typeof getPublishedContributorProperties>>([]);
  useEffect(() => { const frame = requestAnimationFrame(() => setRecords(getPublishedContributorProperties())); return () => cancelAnimationFrame(frame); }, []);
  const savedHomes = records.map(toDemoPropertyCard).filter((property) => property.propertyId && favoritePropertyIds.includes(property.propertyId)).slice(0, 3);

  return (
    <main className="min-h-screen bg-cream px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10">
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-grey">Registered user dashboard</p>
          <h1 className="mt-3 font-[family-name:var(--font-lora)] text-[40px] font-normal leading-tight text-charcoal sm:text-[48px]">Welcome back, {session?.name}.</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-grey">Keep exploring Nairobi homes and pick up where you left off.</p>
          <p className="mt-3 inline-flex rounded-full bg-sand px-3 py-1.5 text-xs font-medium text-charcoal">Demo mode · Registered user</p>
        </header>

        <section aria-labelledby="overview-heading"><h2 id="overview-heading" className="sr-only">Dashboard overview</h2><div className="grid gap-4 sm:grid-cols-3"><OverviewCard label="Saved homes" value={String(favoritePropertyIds.length)} note="Demo saved properties" /><OverviewCard label="Active enquiries" value="2" note="Sample activity" /><OverviewCard label="Viewed properties" value="5" note="Demo browsing history" /></div></section>

        <section aria-labelledby="saved-heading"><div className="flex flex-wrap items-end justify-between gap-4"><div><h2 id="saved-heading" className="font-[family-name:var(--font-lora)] text-[30px] font-normal text-charcoal">Recently saved homes</h2><p className="mt-2 text-sm text-grey">A few sample homes you may want to revisit.</p></div><Link href="/dashboard/favorites" className="text-sm font-medium text-charcoal underline underline-offset-4">View all saved homes</Link></div><div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{savedHomes.map((property) => <PropertyCard key={property.title} property={property} />)}</div></section>

        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]"><section aria-labelledby="enquiries-heading" className="rounded-[12px] bg-white p-6 shadow-subtle sm:p-8"><div className="flex items-center justify-between gap-4"><h2 id="enquiries-heading" className="font-[family-name:var(--font-lora)] text-[28px] font-normal text-charcoal">Recent enquiry activity</h2><Link href="/dashboard/enquiries" className="text-xs font-medium text-charcoal underline underline-offset-4">View all</Link></div><div className="mt-5 divide-y divide-border">{demoEnquiries.map((enquiry) => <article key={enquiry.id} className="flex flex-col gap-2 py-4 first:pt-0 sm:flex-row sm:items-center sm:justify-between"><div><h3 className="text-sm font-medium text-charcoal">{enquiry.propertyName}</h3><p className="mt-1 text-xs text-grey">{enquiry.date}</p></div><span className="w-fit rounded-full bg-cream px-3 py-1.5 text-xs font-medium text-charcoal">{enquiry.status}</span></article>)}</div><p className="mt-4 text-xs text-grey">These enquiries are demonstration records and have not been sent to property representatives.</p></section>

          <section aria-labelledby="actions-heading" className="rounded-[12px] bg-sand p-6 sm:p-8"><h2 id="actions-heading" className="font-[family-name:var(--font-lora)] text-[28px] font-normal text-charcoal">Quick actions</h2><nav className="mt-5 flex flex-col gap-3" aria-label="Dashboard actions"><Link href="/properties" className="rounded-md bg-black px-4 py-3 text-center text-sm font-medium text-white hover:bg-charcoal">Browse properties</Link><Link href="/dashboard/favorites" className="rounded-md border border-charcoal/20 bg-white px-4 py-3 text-center text-sm font-medium text-charcoal hover:bg-cream">View saved homes</Link><Link href="/dashboard/enquiries" className="rounded-md border border-charcoal/20 bg-white px-4 py-3 text-center text-sm font-medium text-charcoal hover:bg-cream">View enquiries</Link><Link href="/dashboard/profile" className="rounded-md border border-charcoal/20 bg-white px-4 py-3 text-center text-sm font-medium text-charcoal hover:bg-cream">Profile &amp; settings</Link></nav></section></div>
      </div>
    </main>
  );
}

function OverviewCard({ label, value, note }: { label: string; value: string; note: string }) {
  return <article className="rounded-[12px] border border-border bg-white p-5 shadow-subtle"><p className="text-sm text-grey">{label}</p><p className="mt-3 font-[family-name:var(--font-lora)] text-[38px] leading-none text-charcoal">{value}</p><p className="mt-3 text-xs text-grey">{note}</p></article>;
}
