import type { ReactNode } from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <div className="flex-1">{children}</div>
      <footer className="border-t border-border bg-white px-6 py-5 sm:px-10 lg:px-20" aria-label="Authentication footer">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 text-xs text-grey">
          <p>© 2026 [APP NAME]. Frontend demonstration.</p>
          <nav aria-label="Legal links" className="flex gap-4">
            <Link href="/privacy" className="underline underline-offset-4 hover:text-charcoal">Privacy policy</Link>
            <Link href="/terms" className="underline underline-offset-4 hover:text-charcoal">Terms of use</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
