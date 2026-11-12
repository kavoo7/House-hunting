"use client";

import { RetryButton } from "@/components/ui/retry-button";

type ErrorContext = "general" | "unavailable" | "content";

type ErrorStateProps = {
  context?: ErrorContext;
  title?: string;
  description?: string;
  onRetry?: () => void | Promise<void>;
  retrying?: boolean;
  action?: { label: string; onClick: () => void };
  className?: string;
};

const contextCopy: Record<ErrorContext, { title: string; description: string }> = {
  general: { title: "Something went wrong.", description: "We could not complete that request. Please try again." },
  unavailable: { title: "This service is unavailable.", description: "The service is not responding right now. Please try again shortly." },
  content: { title: "We could not load this content.", description: "Please try again, or come back a little later." },
};

export function ErrorState({ context = "general", title, description, onRetry, retrying = false, action, className = "" }: ErrorStateProps) {
  const copy = contextCopy[context];

  return (
    <section role="alert" className={`rounded-[12px] border border-[#e5ded2] bg-white p-8 text-center shadow-subtle ${className}`}>
      <h2 className="font-[family-name:var(--font-lora)] text-[28px] font-normal text-charcoal">{title ?? copy.title}</h2>
      <p className="mx-auto mt-3 max-w-md font-[family-name:var(--font-inter)] text-sm leading-[1.6] text-grey">{description ?? copy.description}</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {onRetry && <RetryButton onRetry={onRetry} loading={retrying} />}
        {action && <button type="button" onClick={action.onClick} className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#e5ded2] px-5 py-3 font-[family-name:var(--font-inter)] text-sm font-medium text-charcoal hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">{action.label}</button>}
      </div>
    </section>
  );
}
