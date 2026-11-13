export function PropertyRepresentativeContact({ contactName, hasContactMethod, onContact }: { contactName?: string; hasContactMethod: boolean; onContact: () => void }) {

  return (
    <section aria-labelledby="representative-contact-heading" className="mt-7 border-t border-border pt-5">
      <h3 id="representative-contact-heading" className="text-sm font-semibold text-charcoal">Property representative</h3>
      {contactName && <p className="mt-2 text-sm text-grey">{contactName}</p>}
      {hasContactMethod ? (
        <button type="button" onClick={onContact} className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-md border border-[#d8c5a5] bg-white px-4 py-2 text-sm font-medium text-charcoal hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal">Contact representative</button>
      ) : (
        <p className="mt-2 text-sm leading-6 text-grey">Representative contact details are not available for this listing.</p>
      )}
    </section>
  );
}
