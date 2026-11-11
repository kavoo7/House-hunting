"use client";

import Image from "next/image";
import { useState } from "react";
import { AuthRequiredPrompt } from "@/components/auth/auth-required-prompt";

export function SaveButton({ label, isAuthenticated = false }: { label: string; isAuthenticated?: boolean }) {
  const [isSaved, setIsSaved] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  function handleClick() {
    if (!isAuthenticated) {
      setShowPrompt(true);
      return;
    }

    setIsSaved((current) => !current);
  }

  return (
    <>
      <button type="button" onClick={handleClick} className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-full bg-white p-2.5 shadow-subtle transition-transform hover:scale-105" aria-label={isSaved ? `Remove ${label} from saved homes` : `Save ${label}`} aria-pressed={isSaved}>
        <Image src="/heart.svg" alt="" width={20} height={20} aria-hidden="true" />
      </button>
      {showPrompt && <AuthRequiredPrompt onClose={() => setShowPrompt(false)} />}
    </>
  );
}
