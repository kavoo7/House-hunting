"use client";

type RetryButtonProps = {
  onRetry: () => void | Promise<void>;
  disabled?: boolean;
  loading?: boolean;
  children?: string;
};

export function RetryButton({ onRetry, disabled = false, loading = false, children = "Try again" }: RetryButtonProps) {
  return (
    <button
      type="button"
      onClick={onRetry}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      className="inline-flex min-h-11 items-center justify-center rounded-md bg-black px-5 py-3 font-[family-name:var(--font-inter)] text-sm font-medium text-white transition-colors hover:bg-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "Trying again…" : children}
    </button>
  );
}
