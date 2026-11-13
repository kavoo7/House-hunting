"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PropertyRepresentativeContact } from "@/components/properties/property-representative-contact";
import { PropertyEnquiryDialog } from "@/components/properties/property-enquiry-dialog";
import { PropertyCard, toDemoPropertyCard } from "@/components/properties/property-card";
import { SaveButton } from "@/components/favorites/save-button";
import { ReportPropertyForm } from "@/components/reports/report-property-form";
import { getPublishedContributorProperties, getPublishedContributorProperty, type ContributorProperty } from "@/data/demo-contributor-properties";
import { getPhoneAction, getWhatsAppAction } from "@/data/contact-links";

export default function PropertyDetail({ propertyId }: { propertyId: string }) {
  const [property, setProperty] = useState<ContributorProperty>();
  const [related, setRelated] = useState<ContributorProperty[]>([]);
  const [contactOpen, setContactOpen] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setProperty(getPublishedContributorProperty(propertyId));
      setRelated(getPublishedContributorProperties().filter((item) => item.publicPropertyId !== propertyId));
    });
    return () => cancelAnimationFrame(frame);
  }, [propertyId]);
  if (!property) return <main className="min-h-[50vh] bg-cream px-6 py-16"><div className="mx-auto max-w-3xl rounded-xl bg-white p-8 text-center"><h1 className="font-[family-name:var(--font-lora)] text-3xl text-charcoal">This property is not available</h1><p className="mt-3 text-sm text-grey">It may be awaiting review or no longer published.</p><Link href="/properties" className="mt-5 inline-block text-sm font-medium text-charcoal underline">Browse available homes</Link></div></main>;
  const gallery = property.gallery?.length ? property.gallery : [property.image];
  const card = toDemoPropertyCard(property);
  const amenities = property.amenities?.split(",").map((item) => item.trim()).filter(Boolean) ?? [];
  const hasPhone = Boolean(getPhoneAction(property.phone || ""));
  const hasWhatsApp = Boolean(getWhatsAppAction(property.whatsapp || ""));
  return <main className="bg-cream px-6 py-10 sm:px-10 lg:px-20 lg:py-14"><div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12">
    <section aria-labelledby="property-title"><div className="grid gap-3 lg:grid-cols-[1.55fr_1fr] lg:grid-rows-2 lg:gap-4"><div className="relative h-[300px] overflow-hidden rounded-[12px] sm:h-[420px] lg:row-span-2 lg:h-[560px]"><Image src={gallery[0]} alt={property.title} fill priority sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover"/><SaveButton label={property.title} propertyId={property.publicPropertyId}/></div>{gallery.slice(1, 3).map((image, index) => <div key={`${image}-${index}`} className="relative hidden h-[270px] overflow-hidden rounded-[12px] sm:block"><Image src={image} alt={`${property.title} view ${index + 2}`} fill sizes="(min-width: 1024px) 40vw, 50vw" className="object-cover"/></div>)}</div>
    <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start"><div><div className="flex flex-wrap items-center gap-3"><span className="rounded-[5px] bg-sand px-2.5 py-1.5 text-[11px] font-medium text-charcoal">{property.availability || "Available now"}</span><span className="text-sm text-grey">{property.location}</span></div><h1 id="property-title" className="mt-4 max-w-3xl font-[family-name:var(--font-lora)] text-[38px] font-normal leading-tight text-charcoal sm:text-[48px]">{property.title}</h1><p className="mt-5 text-[28px] font-semibold text-charcoal">{card.price} <span className="text-sm font-normal text-grey">/ month</span></p><div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-charcoal"><span>{property.bedrooms ?? 0} bedrooms</span><span>{property.bathrooms ?? 0} bathrooms</span><span>{property.area ? `${property.area} m²` : "Area not specified"}</span></div><div className="mt-10 max-w-2xl"><h2 className="text-xl font-semibold text-charcoal">About this home</h2><p className="mt-3 text-[15px] leading-[1.7] text-grey">{property.description || "No description supplied in this demo listing."}</p></div><div className="mt-10"><h2 className="text-xl font-semibold text-charcoal">Amenities</h2>{amenities.length ? <ul className="mt-4 grid gap-3 sm:grid-cols-2">{amenities.map((amenity) => <li key={amenity} className="rounded-md bg-white px-4 py-3 text-sm text-charcoal shadow-subtle">{amenity}</li>)}</ul> : <p className="mt-3 text-sm text-grey">No amenities supplied.</p>}</div></div>
    <aside className="rounded-[12px] bg-white p-6 shadow-subtle"><p className="text-[11px] font-semibold tracking-[0.08em] text-grey">AVAILABILITY</p><p className="mt-2 text-sm font-medium text-charcoal">{property.availability || "Available now"}</p><h2 className="mt-7 font-[family-name:var(--font-lora)] text-[26px] text-charcoal">Interested in this home?</h2><p className="mt-3 text-sm leading-[1.6] text-grey">Contact the property representative directly to learn more about this listing.</p><button type="button" onClick={() => setContactOpen(true)} className="mt-5 h-12 w-full rounded-md bg-black px-5 text-sm font-medium text-white hover:bg-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal">Send an enquiry</button><p className="mt-2 text-center text-xs text-grey">No payment is required to enquire.</p><PropertyRepresentativeContact contactName={property.contactName} hasContactMethod={hasPhone || hasWhatsApp} onContact={() => setContactOpen(true)}/><ReportPropertyForm propertyId={property.publicPropertyId || property.id} propertyTitle={property.title}/></aside></div></section>
    <section className="grid gap-8 lg:grid-cols-2" aria-label="Location information"><div className="rounded-[12px] bg-[#eee6d8] p-6 sm:p-8"><p className="text-[11px] font-semibold tracking-[0.08em] text-grey">LOCATION</p><h2 className="mt-3 font-[family-name:var(--font-lora)] text-[30px] text-charcoal">Live close to what matters.</h2><p className="mt-3 text-sm leading-[1.6] text-charcoal">{property.locationDescription || property.location}. Explore nearby cafés, shops, green spaces and convenient routes around Nairobi.</p></div><div className="flex min-h-[220px] items-center justify-center rounded-[12px] border border-[#e5ded2] bg-[#e8e1d5] p-6"><div className="text-center"><span className="mx-auto flex size-12 items-center justify-center rounded-full bg-black text-xl text-white">⌖</span><p className="mt-3 text-sm font-medium text-charcoal">{property.location}</p><p className="mt-1 text-xs text-grey">Static location preview</p></div></div></section>
    {related.length > 0 && <section aria-labelledby="related-properties-heading"><h2 id="related-properties-heading" className="font-[family-name:var(--font-lora)] text-[30px] text-charcoal">You may also like</h2><div className="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{related.slice(0, 3).map((item) => <PropertyCard key={item.id} property={toDemoPropertyCard(item)}/>)}</div></section>}
  </div><PropertyEnquiryDialog open={contactOpen} onClose={() => setContactOpen(false)} contactName={property.contactName} phone={property.phone} whatsapp={property.whatsapp} propertyTitle={property.title} location={property.location}/></main>;
}
