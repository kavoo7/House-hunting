import Link from "next/link";
import { EmptyState } from "@/components/ui/empty-state";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-cream px-6 py-16 sm:px-10 lg:px-20">
      <div className="w-full max-w-xl">
        <EmptyState
          title="We couldn’t find that page."
          description="The page you requested may have moved or may not exist. Try returning home or explore the available Nairobi homes."
          action={{ label: "Explore homes", href: "/properties" }}
        />
        <div className="mt-4 text-center">
          <Link href="/" className="font-[family-name:var(--font-inter)] text-sm font-medium text-charcoal underline underline-offset-4 hover:text-grey">Return to homepage</Link>
        </div>
      </div>
    </main>
  );
}
