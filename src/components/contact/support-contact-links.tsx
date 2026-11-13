"use client";

import { useEffect, useState } from "react";
import { getSupportContactActions, type SupportContactActions } from "@/data/support-contacts";

type SupportContactLinksProps = {
  variant: "contact" | "footer";
};

const channelLabels = {
  phone: "Phone",
  whatsapp: "WhatsApp",
  email: "Email",
} as const;

export function SupportContactLinks({ variant }: SupportContactLinksProps) {
  const [contacts, setContacts] = useState<SupportContactActions | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setContacts(getSupportContactActions()));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (variant === "footer") {
    if (!contacts) return null;
    const available = Object.entries(contacts).filter(([, contact]) => contact !== null);
    if (available.length === 0) return null;

    return (
      <div className="mt-5">
        <h3 className="font-[family-name:var(--font-inter)] text-xs font-semibold text-white">Platform support</h3>
        <ul className="mt-2 flex flex-col gap-2">
          {available.map(([channel, contact]) => contact && (
            <li key={channel}>
              <a href={contact.href} className="break-all font-[family-name:var(--font-inter)] text-[13px] text-sand underline-offset-4 hover:text-cream hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                {channelLabels[channel as keyof typeof channelLabels]}: {contact.display}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (!contacts) {
    return <p role="status" className="mt-8 text-sm text-grey">Loading platform support channels…</p>;
  }

  const channels = Object.entries(contacts) as [keyof SupportContactActions, SupportContactActions[keyof SupportContactActions]][];

  return (
    <section aria-labelledby="support-channels-heading" className="mt-9">
      <h2 id="support-channels-heading" className="font-[family-name:var(--font-lora)] text-[28px] font-normal text-charcoal">Platform support channels</h2>
      <p className="mt-2 text-sm leading-6 text-grey">Use these channels for general assistance, platform issues, complaints or suspicious listings.</p>
      <ul className="mt-5 grid gap-4 sm:grid-cols-3">
        {channels.map(([channel, contact]) => (
          <li key={channel} className="rounded-[12px] border border-[#e5ded2] bg-white p-5">
            <h3 className="text-sm font-semibold text-charcoal">{channelLabels[channel]}</h3>
            {contact ? (
              <a href={contact.href} target={channel === "whatsapp" ? "_blank" : undefined} rel={channel === "whatsapp" ? "noreferrer" : undefined} className="mt-3 inline-flex min-h-11 items-center break-all text-sm font-medium text-charcoal underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                {channel === "phone" ? "Call support · " : channel === "whatsapp" ? "Message on WhatsApp · " : "Email support · "}{contact.display}
              </a>
            ) : (
              <p className="mt-3 text-sm leading-6 text-grey">This support channel is not currently available.</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
