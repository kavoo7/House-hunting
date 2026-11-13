"use client";

import Image from "next/image";
import Link from "next/link";
import { useDemoAuth } from "@/components/auth/demo-auth";
import { EmptyState } from "@/components/ui/empty-state";
import { demoContributorProperties, getContributorProperties, type ContributorProperty, type ContributorPropertyStatus } from "@/data/demo-contributor-properties";
import { useEffect, useState } from "react";

const statusCopy: Record<ContributorPropertyStatus, { label: string; className: string }> = {
  pending: { label: "Pending review", className: "bg-[#f5ead1] text-[#795d26]" },
  approved: { label: "Approved / Published", className: "bg-[#e3eee3] text-[#35623b]" },
  rejected: { label: "Rejected", className: "bg-[#f5e2df] text-[#8a423b]" },
  "changes-requested": { label: "Changes Requested", className: "bg-[#e7e1f2] text-[#5c487e]" },
  draft: { label: "Draft", className: "bg-cream text-grey" },
};

const formatRent = (rent: number) => `KSh ${rent.toLocaleString("en-KE")}`;

export default function ContributorPropertiesPage() {
  const { session } = useDemoAuth();
  const [properties, setProperties] = useState<ContributorProperty[]>(demoContributorProperties);
  useEffect(() => { const frame = window.requestAnimationFrame(() => setProperties(getContributorProperties(session?.email, session?.name))); return () => window.cancelAnimationFrame(frame); }, [session?.email, session?.name]);
  const counts = {
    total: properties.length,
    approved: properties.filter((property) => property.status === "approved").length,
    pending: properties.filter((property) => property.status === "pending").length,
    rejected: properties.filter((property) => property.status === "rejected").length,
  };

  return (
    <main className="min-h-screen bg-cream px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-grey">Contributor / Agent dashboard</p>
            <h1 className="mt-3 font-[family-name:var(--font-lora)] text-[38px] font-normal leading-tight text-charcoal sm:text-[48px]">Welcome back, {session?.name}.</h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-grey">This is your space to manage property submissions and keep track of their review progress.</p>
            <p className="mt-3 inline-flex rounded-full bg-sand px-3 py-1.5 text-xs font-medium text-charcoal">Demo mode · Sample records only</p>
          </div>
          <Link href="/contributor/properties/new" className="inline-flex min-h-11 items-center justify-center rounded-md bg-black px-5 py-3 text-sm font-medium text-white hover:bg-charcoal">Add a new property</Link>
        </header>

        <section aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="sr-only">Listing overview</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <OverviewCard label="Total properties" value={counts.total} note="Sample submissions" />
            <OverviewCard label="Published" value={counts.approved} note="Approved listings" />
            <OverviewCard label="Pending review" value={counts.pending} note="Awaiting admin review" />
            <OverviewCard label="Rejected" value={counts.rejected} note="Needs attention" />
          </div>
        </section>

        <section id="submissions" aria-labelledby="submissions-heading">
          <div className="flex flex-wrap items-end justify-between gap-4"><div><h2 id="submissions-heading" className="font-[family-name:var(--font-lora)] text-[30px] font-normal text-charcoal">Recent submissions</h2><p className="mt-2 text-sm text-grey">Your latest demo property records, newest first.</p></div><Link href="/contributor/properties/manage" className="text-sm font-medium text-charcoal underline underline-offset-4">View all my properties</Link></div>
          {properties.length ? <div className="mt-6 overflow-hidden rounded-[12px] bg-white shadow-subtle"><div className="divide-y divide-border">{properties.map((property) => <SubmissionRow key={property.id} property={property} />)}</div></div> : <EmptyState className="mt-6" title="No properties yet" description="When you add a property, it will appear here for tracking." action={{ label: "Add a new property", href: "/contributor/properties/new" }} />}
        </section>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section aria-labelledby="actions-heading" className="rounded-[12px] bg-sand p-6 sm:p-8"><h2 id="actions-heading" className="font-[family-name:var(--font-lora)] text-[28px] font-normal text-charcoal">Quick actions</h2><nav className="mt-5 grid gap-3 sm:grid-cols-3" aria-label="Contributor actions"><Link href="/contributor/properties/new" className="rounded-md bg-black px-4 py-3 text-center text-sm font-medium text-white hover:bg-charcoal">Add a new property</Link><Link href="/contributor/properties/manage" className="rounded-md border border-charcoal/20 bg-white px-4 py-3 text-center text-sm font-medium text-charcoal hover:bg-cream">View all my properties</Link><Link href="/contributor/properties/manage?status=pending" className="rounded-md border border-charcoal/20 bg-white px-4 py-3 text-center text-sm font-medium text-charcoal hover:bg-cream">View pending submissions</Link></nav></section>
          <section aria-labelledby="process-heading" className="rounded-[12px] border border-border bg-white p-6 shadow-subtle sm:p-8"><p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-grey">How it works</p><h2 id="process-heading" className="mt-2 font-[family-name:var(--font-lora)] text-[28px] font-normal text-charcoal">From submission to visibility</h2><ol className="mt-5 space-y-4 text-sm text-grey"><li className="flex gap-3"><span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-cream text-xs font-semibold text-charcoal">1</span><span>Submit property details and photos.</span></li><li className="flex gap-3"><span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-cream text-xs font-semibold text-charcoal">2</span><span>An administrator reviews the submission.</span></li><li className="flex gap-3"><span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-cream text-xs font-semibold text-charcoal">3</span><span>Approved properties become publicly visible.</span></li></ol><p className="mt-5 border-t border-border pt-4 text-xs leading-5 text-grey">Approval is controlled by administrators. These are demonstration records and do not represent real submissions or approvals.</p></section>
        </div>
      </div>
    </main>
  );
}

function OverviewCard({ label, value, note }: { label: string; value: number; note: string }) { return <article className="rounded-[12px] border border-border bg-white p-5 shadow-subtle"><p className="text-sm text-grey">{label}</p><p className="mt-3 font-[family-name:var(--font-lora)] text-[38px] leading-none text-charcoal">{value}</p><p className="mt-3 text-xs text-grey">{note}</p></article>; }

function SubmissionRow({ property }: { property: ContributorProperty }) { const status = statusCopy[property.status]; return <article className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5"><div className="relative h-28 w-full shrink-0 overflow-hidden rounded-md sm:h-20 sm:w-28"><Image src={property.image} alt="" fill sizes="112px" className="object-cover" /></div><div className="min-w-0 flex-1"><h3 className="text-base font-medium text-charcoal">{property.title}</h3><p className="mt-1 text-sm text-grey">{property.location}</p><p className="mt-2 text-sm font-medium text-charcoal">{formatRent(property.monthlyRent)} <span className="font-normal text-grey">/ month</span></p></div><div className="flex flex-wrap items-center gap-3 sm:justify-end"><div className="text-left sm:text-right"><p className={`inline-flex rounded-full px-3 py-1.5 text-xs font-medium ${status.className}`}>{status.label}</p><p className="mt-2 text-xs text-grey">Submitted {property.submittedOn}</p></div>{property.publicPropertyId && <Link href={`/properties/${property.publicPropertyId}`} className="text-xs font-medium text-charcoal underline underline-offset-4">View listing</Link>}</div></article>; }
