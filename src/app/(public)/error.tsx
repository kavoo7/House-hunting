"use client";

import { useRouter } from "next/navigation";
import { ErrorState } from "@/components/ui/error-state";

type PublicErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function PublicError({ reset }: PublicErrorProps) {
  const router = useRouter();

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-cream px-6 py-16 sm:px-10 lg:px-20">
      <div className="w-full max-w-xl">
        <ErrorState
          context="content"
          onRetry={reset}
          action={{ label: "Back to homepage", onClick: () => router.push("/") }}
        />
      </div>
    </main>
  );
}
