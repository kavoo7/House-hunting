const searchFields = [
  { label: "WHERE", value: "Neighbourhood or landmark" },
  { label: "MONTHLY RENT", value: "Any budget" },
  { label: "BEDROOMS", value: "Any bedrooms" },
];

function ChevronDownIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4 shrink-0 text-grey"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path strokeLinecap="round" d="m16 16 4 4" />
    </svg>
  );
}

export function SearchPanel() {
  return (
    <section className="bg-cream px-6 pb-10 sm:px-10 lg:px-20" aria-label="Find a home">
      <form
        className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 rounded-[12px] bg-white p-5 shadow-subtle sm:p-6 lg:flex-row lg:items-center lg:gap-[26px]"
      >
        {searchFields.map((field) => (
          <div key={field.label} className="min-w-0 flex-1">
            <div className="block font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.06em] text-grey">
              {field.label}
              <button
                type="button"
                className="mt-1 flex w-full items-center justify-between gap-3 text-left font-[family-name:var(--font-inter)] text-sm font-normal tracking-normal text-charcoal"
                aria-label={`${field.label.toLowerCase()}: ${field.value}`}
              >
                <span className="truncate">{field.value}</span>
                <ChevronDownIcon />
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="flex h-12 shrink-0 items-center justify-center gap-3 rounded-pill bg-black px-7 font-[family-name:var(--font-inter)] text-sm font-medium text-white transition-colors hover:bg-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:w-44"
          aria-label="Search homes"
        >
          <SearchIcon />
          Search homes
        </button>
      </form>
    </section>
  );
}
