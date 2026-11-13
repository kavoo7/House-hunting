"use client";

import { useEffect, useRef } from "react";
import { getPhoneAction, getWhatsAppAction } from "@/data/contact-links";

type Props = {
  open: boolean;
  onClose: () => void;
  contactName?: string;
  phone?: string;
  whatsapp?: string;
  propertyTitle: string;
  location: string;
};

export function PropertyEnquiryDialog({ open, onClose, contactName, phone, whatsapp, propertyTitle, location }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const call = getPhoneAction(phone || "");
  const message = getWhatsAppAction(whatsapp || "");
  const prefilledMessage = `Hello, I'm interested in the ${propertyTitle} in ${location}. Is it still available, and could I arrange a viewing?`;
  const whatsappHref = message ? `${message.href}?text=${encodeURIComponent(prefilledMessage)}` : undefined;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="property-enquiry-heading"
      onClose={onClose}
      onClick={(event) => { if (event.target === dialogRef.current) onClose(); }}
      className="w-[calc(100%-2rem)] max-w-lg rounded-xl border border-[#e5ded2] bg-white p-0 text-charcoal shadow-2xl backdrop:bg-charcoal/50"
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-grey">Contact the property representative</p>
            <h2 id="property-enquiry-heading" className="mt-2 font-[family-name:var(--font-lora)] text-2xl">Ask about this home</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close contact panel" className="flex size-10 shrink-0 items-center justify-center rounded-md text-xl text-charcoal hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal">×</button>
        </div>
        <p className="mt-5 text-sm font-medium">{propertyTitle}</p>
        <p className="mt-1 text-sm text-grey">{location}</p>
        <div className="mt-5 border-t border-border pt-5">
          <p className="text-sm font-semibold">{contactName || "Property representative"}</p>
          {call && <p className="mt-1 text-sm text-grey">Phone: {call.display}</p>}
          {message && <p className="mt-1 text-sm text-grey">WhatsApp: {message.display}</p>}
        </div>
        {call || whatsappHref ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {call && <a href={call.href} className="inline-flex min-h-12 items-center justify-center rounded-md bg-charcoal px-4 py-3 text-center text-sm font-medium text-white hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal">Call representative</a>}
            {whatsappHref && <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-md border border-[#d8c5a5] bg-white px-4 py-3 text-center text-sm font-medium text-charcoal hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal">WhatsApp representative</a>}
          </div>
        ) : (
          <p className="mt-6 rounded-md bg-cream p-4 text-sm leading-6 text-grey">The representative&apos;s contact details are currently unavailable for this listing.</p>
        )}
        <p className="mt-4 text-xs leading-5 text-grey">Choose a contact method to continue. No call or message will be started automatically.</p>
      </div>
    </dialog>
  );
}
