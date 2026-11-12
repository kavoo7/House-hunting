"use client";

import Image from "next/image";
import { useState } from "react";
import { AuthRequiredPrompt } from "@/components/auth/auth-required-prompt";
import { useDemoAuth } from "@/components/auth/demo-auth";

export function SaveButton({ label, propertyId }: { label: string; propertyId?: string }) {
  const { session, favoritePropertyIds, toggleFavorite } = useDemoAuth();
  const [localIsSaved, setLocalIsSaved] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);

  function handleClick() {
    if (!session || session.role !== "user") {
      setShowPrompt(true);
      return;
    }

    if (propertyId) {
      if (isSaved) {
        setShowRemoveConfirmation(true);
        return;
      }
      toggleFavorite(propertyId);
    }
    else setLocalIsSaved((current) => !current);
  }

  const isSaved = propertyId ? favoritePropertyIds.includes(propertyId) : localIsSaved;

  return (
    <>
      <button type="button" onClick={handleClick} className={`absolute right-3 top-3 flex size-11 items-center justify-center rounded-full p-2.5 shadow-subtle transition-transform hover:scale-105 ${isSaved ? "bg-charcoal" : "bg-white"}`} aria-label={isSaved ? `Remove ${label} from saved homes` : `Save ${label}`} aria-pressed={isSaved}>
        <Image src="/heart.svg" alt="" width={20} height={20} aria-hidden="true" className={isSaved ? "invert" : ""} />
      </button>
      {showPrompt && <AuthRequiredPrompt onClose={() => setShowPrompt(false)} />}
      {showRemoveConfirmation && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-5" role="presentation" onClick={() => setShowRemoveConfirmation(false)}><section role="dialog" aria-modal="true" aria-labelledby="remove-saved-heading" className="w-full max-w-md rounded-[12px] bg-white p-6 shadow-card sm:p-8" onClick={(event) => event.stopPropagation()}><h2 id="remove-saved-heading" className="font-[family-name:var(--font-lora)] text-[28px] font-normal text-charcoal">Remove saved home?</h2><p className="mt-3 text-sm leading-6 text-grey">Remove this property from your saved homes?</p><div className="mt-6 flex gap-3"><button type="button" onClick={() => setShowRemoveConfirmation(false)} className="h-11 flex-1 rounded-md border border-[#e5ded2] px-4 text-sm font-medium text-charcoal hover:bg-cream">Cancel</button><button type="button" onClick={() => { if (propertyId) toggleFavorite(propertyId); setShowRemoveConfirmation(false); }} className="h-11 flex-1 rounded-md bg-black px-4 text-sm font-medium text-white hover:bg-charcoal">Remove</button></div></section></div>}
    </>
  );
}
