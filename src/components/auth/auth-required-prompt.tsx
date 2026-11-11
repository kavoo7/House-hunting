"use client";

import Link from "next/link";

export function AuthRequiredPrompt({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-5" role="presentation" onClick={onClose}>
      <section role="dialog" aria-modal="true" aria-labelledby="auth-required-heading" className="w-full max-w-md rounded-[12px] bg-white p-6 shadow-card sm:p-8" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.08em] text-grey">SAVE YOUR FAVOURITES</p>
            <h2 id="auth-required-heading" className="mt-2 font-[family-name:var(--font-lora)] text-[28px] font-normal text-charcoal">Keep the homes you love close.</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-grey hover:bg-cream hover:text-charcoal" aria-label="Close sign-in prompt">×</button>
        </div>
        <p className="mt-4 font-[family-name:var(--font-inter)] text-sm leading-[1.6] text-grey">Create an account or log in to save homes and return to them later.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/signup" onClick={onClose} className="flex h-11 flex-1 items-center justify-center rounded-md bg-black px-4 font-[family-name:var(--font-inter)] text-sm font-medium text-white hover:bg-charcoal">Create an account</Link>
          <Link href="/login" onClick={onClose} className="flex h-11 flex-1 items-center justify-center rounded-md border border-[#e5ded2] px-4 font-[family-name:var(--font-inter)] text-sm font-medium text-charcoal hover:bg-cream">Log in</Link>
        </div>
      </section>
    </div>
  );
}
