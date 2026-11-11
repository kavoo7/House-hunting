"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const neighbourhoods = ["Kilimani", "Westlands", "Kileleshwa", "Lavington", "Hurlingham", "Karen", "Runda"];
const rentRanges = [
  { value: "under-60000", label: "Under KSh 60,000" },
  { value: "60000-100000", label: "KSh 60,000–100,000" },
  { value: "over-100000", label: "Over KSh 100,000" },
];
const bedroomOptions = ["1", "2", "3", "4+"];

function ChevronDownIcon() {
  return (
    <svg aria-hidden="true" className="size-4 shrink-0 text-grey" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="6.5" />
      <path strokeLinecap="round" d="m16 16 4 4" />
    </svg>
  );
}

export function SearchPanel() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [rent, setRent] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();

    if (location.trim()) params.set("location", location.trim());
    if (rent) params.set("rent", rent);
    if (bedrooms) params.set("bedrooms", bedrooms);

    const query = params.toString();
    router.push(query ? `/properties?${query}` : "/properties");
  }

  return (
    <section className="bg-cream px-6 pb-10 sm:px-10 lg:px-20" aria-label="Find a home">
      <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 rounded-[12px] bg-white p-5 shadow-subtle sm:p-6 lg:flex-row lg:items-center lg:gap-[26px]">
        <div className="min-w-0 flex-1">
          <label htmlFor="home-location" className="block font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.06em] text-grey">WHERE</label>
          <div className="relative mt-1">
            <input id="home-location" list="nairobi-neighbourhoods" value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Neighbourhood or landmark" autoComplete="off" className="h-8 w-full truncate bg-transparent pr-7 font-[family-name:var(--font-inter)] text-sm font-normal text-charcoal outline-none placeholder:text-charcoal" />
            <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2"><ChevronDownIcon /></span>
            <datalist id="nairobi-neighbourhoods">{neighbourhoods.map((neighbourhood) => <option key={neighbourhood} value={neighbourhood} />)}</datalist>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <label htmlFor="home-rent" className="block font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.06em] text-grey">MONTHLY RENT</label>
          <div className="relative mt-1">
            <select id="home-rent" value={rent} onChange={(event) => setRent(event.target.value)} className="h-8 w-full appearance-none bg-transparent pr-7 font-[family-name:var(--font-inter)] text-sm font-normal text-charcoal outline-none">
              <option value="">Any budget</option>
              {rentRanges.map((range) => <option key={range.value} value={range.value}>{range.label}</option>)}
            </select>
            <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2"><ChevronDownIcon /></span>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <label htmlFor="home-bedrooms" className="block font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.06em] text-grey">BEDROOMS</label>
          <div className="relative mt-1">
            <select id="home-bedrooms" value={bedrooms} onChange={(event) => setBedrooms(event.target.value)} className="h-8 w-full appearance-none bg-transparent pr-7 font-[family-name:var(--font-inter)] text-sm font-normal text-charcoal outline-none">
              <option value="">Any bedrooms</option>
              {bedroomOptions.map((option) => <option key={option} value={option}>{option} {option === "1" ? "bedroom" : "bedrooms"}</option>)}
            </select>
            <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2"><ChevronDownIcon /></span>
          </div>
        </div>

        <button type="submit" className="flex h-12 shrink-0 items-center justify-center gap-3 rounded-pill bg-black px-7 font-[family-name:var(--font-inter)] text-sm font-medium text-white transition-colors hover:bg-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" aria-label="Search homes">
          <SearchIcon />
          Search homes
        </button>
      </form>
    </section>
  );
}
