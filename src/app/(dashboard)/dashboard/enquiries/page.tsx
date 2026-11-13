"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toDemoPropertyCard } from "@/components/properties/property-card";
import { getAllContributorProperties } from "@/data/demo-contributor-properties";
import { useDemoAuth } from "@/components/auth/demo-auth";
import { EmptyState } from "@/components/ui/empty-state";
import { demoEnquiries, type DemoEnquiryStatus } from "@/data/demo-enquiries";

type StatusFilter = "All statuses" | DemoEnquiryStatus;

export default function EnquiriesPage() {
  const { session } = useDemoAuth();
  const [status, setStatus] = useState<StatusFilter>("All statuses");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [records, setRecords] = useState<ReturnType<typeof getAllContributorProperties>>([]);
  useEffect(() => { const frame = requestAnimationFrame(() => setRecords(getAllContributorProperties())); return () => cancelAnimationFrame(frame); }, []);
  const enquiries = useMemo(() => {
    const filtered = status === "All statuses" ? [...demoEnquiries] : demoEnquiries.filter((enquiry) => enquiry.status === status);
    return sort === "oldest" ? filtered.reverse() : filtered;
  }, [sort, status]);

  return <main className="min-h-screen bg-cream px-6 py-10 sm:px-10 lg:px-12 lg:py-14"><div className="mx-auto flex w-full max-w-[1100px] flex-col gap-8"><header><p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-grey">Registered user dashboard</p><h1 className="mt-3 font-[family-name:var(--font-lora)] text-[40px] font-normal leading-tight text-charcoal sm:text-[48px]">My Enquiries.</h1><p className="mt-4 max-w-xl text-base leading-7 text-grey">Track the sample property enquiries in your demonstration account.</p><p className="mt-3 inline-flex rounded-full bg-sand px-3 py-1.5 text-xs font-medium text-charcoal">{session?.name} · Demo mode</p></header><div className="flex flex-col gap-4 rounded-[12px] bg-white p-5 shadow-subtle sm:flex-row sm:items-center sm:justify-between"><p className="text-sm text-grey"><span className="font-medium text-charcoal">{enquiries.length}</span> of {demoEnquiries.length} demo enquiries shown</p><div className="flex flex-wrap items-center gap-3"><label htmlFor="enquiry-status" className="text-sm text-grey">Status</label><select id="enquiry-status" value={status} onChange={(event) => setStatus(event.target.value as StatusFilter)} className="rounded-md border border-border bg-white px-3 py-2.5 text-sm text-charcoal outline-none focus:border-charcoal"><option>All statuses</option><option>Sent</option><option>Awaiting response</option><option>Responded</option><option>Closed</option></select><label htmlFor="enquiry-sort" className="sr-only">Sort enquiries</label><select id="enquiry-sort" value={sort} onChange={(event) => setSort(event.target.value as "newest" | "oldest")} className="rounded-md border border-border bg-white px-3 py-2.5 text-sm text-charcoal outline-none focus:border-charcoal"><option value="newest">Newest first</option><option value="oldest">Oldest first</option></select></div></div>{enquiries.length > 0 ? <section aria-labelledby="enquiry-list-heading"><h2 id="enquiry-list-heading" className="sr-only">Enquiry list</h2><div className="flex flex-col gap-5">{enquiries.map((enquiry) => { const record = records.find((item) => item.publicPropertyId === enquiry.propertyId); const property = record ? toDemoPropertyCard(record) : undefined; if (!property) return null; return <article key={enquiry.id} className="grid gap-5 rounded-[12px] border border-border bg-white p-5 shadow-subtle sm:grid-cols-[180px_1fr_auto] sm:items-center"><div className="relative h-40 overflow-hidden rounded-lg sm:h-28"><Image src={property.image} alt={property.title} fill sizes="(min-width: 640px) 180px, 100vw" className="object-cover" /></div><div><Link href={`/properties/${property.propertyId}`} className="font-[family-name:var(--font-inter)] text-lg font-medium text-charcoal hover:underline">{property.title}</Link><p className="mt-1 text-sm text-grey">{property.location}</p><p className="mt-3 text-sm font-medium text-charcoal">{property.price} <span className="font-normal text-grey">/ month</span></p><p className="mt-1 text-xs text-grey">{property.bedrooms} {property.bedrooms === 1 ? "bed" : "beds"} · {property.bathrooms} {property.bathrooms === 1 ? "bath" : "baths"} · Enquiry made {enquiry.date}</p></div><span className="w-fit rounded-full bg-cream px-3 py-1.5 text-xs font-medium text-charcoal">{enquiry.status}</span></article>; })}</div><p className="mt-5 text-xs text-grey">Demonstration records only. No enquiry has been sent and no representative response is real.</p></section> : <EmptyState title="No enquiries match this filter." description="Try another status to view the available demonstration activity." action={{ label: "Show all enquiries", onClick: () => setStatus("All statuses") }} />}</div></main>;
}
