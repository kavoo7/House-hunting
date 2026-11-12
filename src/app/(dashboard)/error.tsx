"use client";

import { useRouter } from "next/navigation";
import { ErrorState } from "@/components/ui/error-state";

type DashboardErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function DashboardError({ reset }: DashboardErrorProps) {
  const router = useRouter();

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-cream px-6 py-12 sm:px-10 lg:px-20">
      <div className="w-full max-w-xl">
        <ErrorState
          context="content"
          title="We could not load this dashboard area."
          description="Please try again, or return to your dashboard home to continue."
          onRetry={reset}
          action={{ label: "Back to dashboard", onClick: () => router.push("/dashboard") }}
        />
      </div>
    </main>
  );
}
