type LoadingStateProps = {
  message?: string;
  compact?: boolean;
  className?: string;
};

export function LoadingState({ message = "Loading", compact = false, className = "" }: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={`${compact ? "py-6" : "flex min-h-[240px] items-center justify-center py-16"} ${className}`}
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <span aria-hidden="true" className="size-7 animate-spin motion-reduce:animate-none rounded-full border-2 border-sand border-t-charcoal" />
        <span className="font-[family-name:var(--font-inter)] text-sm text-grey">{message}</span>
      </div>
    </div>
  );
}
