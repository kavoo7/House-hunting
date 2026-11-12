"use client";

import Link from "next/link";

type EmptyStateAction = {
  label: string;
  href?: string;
  onClick?: () => void;
};

type EmptyStateProps = {
  title: string;
  description: string;
  action?: EmptyStateAction;
  className?: string;
};

export function EmptyState({ title, description, action, className = "" }: EmptyStateProps) {
  return (
    <section className={`rounded-[12px] border border-[#e5ded2] bg-white p-8 text-center shadow-subtle ${className}`}>
      <h2 className="font-[family-name:var(--font-lora)] text-[28px] font-normal text-charcoal">{title}</h2>
      <p className="mx-auto mt-3 max-w-md font-[family-name:var(--font-inter)] text-sm leading-[1.6] text-grey">{description}</p>
      {action?.href && <Link href={action.href} className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-black px-5 py-3 font-[family-name:var(--font-inter)] text-sm font-medium text-white hover:bg-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">{action.label}</Link>}
      {action?.onClick && <button type="button" onClick={action.onClick} className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-black px-5 py-3 font-[family-name:var(--font-inter)] text-sm font-medium text-white hover:bg-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">{action.label}</button>}
    </section>
  );
}
